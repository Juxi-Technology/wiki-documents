---
title: 具身智能入门(LeRobot)
description: 具身智能入门——LeRobot 框架上手,SO-ARM101 数据采集/训练/评估全流程,ACT/扩散策略/SmolVLA 选型
keywords: [lerobot, 具身智能, 模仿学习, act, so-arm101, 机器人学习]
---

# 具身智能入门(LeRobot)

> 面向第一次做"机器人学习"的开发者。以 HuggingFace LeRobot + 钜犀科技 SO-ARM101 机械臂为例,走完**数据采集 → 训练 → 评估**全流程。

## 1. 什么是具身智能?

具身智能(Embodied AI)让智能体通过身体传感器与物理世界交互。机器人模仿学习(Imitation Learning)是其中一条主线:人类遥操作演示 → 采集数据 → 训练策略模型 → 机器人复现动作。

**为什么重要**:传统编程无法覆盖复杂操作(拧螺丝、叠衣服),而模仿学习只需"演示 + 训练"。

## 2. 硬件方案

| 组件 | 推荐 | 说明 |
|------|------|------|
| 机械臂 | SO-ARM101(leader + follower) | 双臂遥操作,6 DOF |
| 计算平台 | Jetson Orin NX Super / 4090 主机 | 训练用大算力,推理用 Jetson |
| 视觉 | RealSense / USB 摄像头 | 遥操作时采集环境 |

- [SO-ARM101 使用教程](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Jetson Orin NX Super 开发套件](/products/jetson-orin-nx-super-kit)

## 3. 环境安装

```bash
# 克隆(钜犀科技 fork 的稳定版)
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM 使用 feetech 舵机

# Jetson 用户:先确认 PyTorch 可用
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. 数据采集(遥操作)

```bash
# 校准机械臂(首次)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm

# 采集数据
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**采集技巧**:

- 每个任务 ≥50 集,位置/手法多样化
- 摄像头固定,物体保持一致可见
- 保持一致的操作风格(同一个演示者)

## 5. 训练

```bash
# ACT 策略(入门推荐)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**策略选型**:

| 策略 | 优点 | 适用 |
|------|------|------|
| **ACT** | 稳定,数据利用率高 | 入门首选,精细操作 |
| **扩散策略** | 复杂多模态动作稳 | 高频精细任务 |
| **Pi0 / GR00T** | 泛化能力强 | 多任务、跨物体 |

## 6. 评估与复盘

```bash
# 回放数据集(检查数据质量)
lerobot-dataset-viz --repo-id juxi/pick_cube

# 评估策略
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| 评估指标 | 说明 |
|---------|------|
| 成功率 | 任务完成比例 |
| 轨迹平滑度 | 动作是否抖动 |
| 泛化能力 | 换物体/换位置是否仍成功 |

## 7. 常见问题

**Q: 训练很慢?**
数据量、steps 与算力成正比;先 50 集 / 100k steps 起步,验证流程再放大。

**Q: 策略只能做单一动作?**
单任务训练需要多任务数据集;GR00T/Pi0 类基础模型可用小数据微调到多任务。

**Q: 训练后动作抖?**
检查数据质量(演示稳定)、增加平滑滤波器、降低控制频率。

**Q: 内存/显存不足?**
减小 batch_size,降低图像分辨率,Jetson 用 16GB 版本。

---

## 相关链接

- [机械臂选型指南](/tutorials/robot-arms/select-guide)
- [边缘 AI 部署入门](/topics/edge-ai-intro)
- [SO-ARM101 TPU 柔性夹爪](/products/tpu-flexible-gripper)
- [SO-ARM101 机械臂视觉套件](/products/robot-vision-kit)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
