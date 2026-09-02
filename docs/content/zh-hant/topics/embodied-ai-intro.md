---
title: 具身智能入門(LeRobot)
description: 具身智能入門——LeRobot 框架上手,SO-ARM101 數據採集/訓練/評估全流程,ACT/擴散策略/SmolVLA 選型
keywords: [lerobot, 具身智能, 模仿學習, act, so-arm101, 機器人學習]
---

# 具身智能入門(LeRobot)

> 面向第一次做「機器人學習」的開發者。以 HuggingFace LeRobot + 鉅犀科技 SO-ARM101 機械臂為例,走完**數據採集 → 訓練 → 評估**全流程。

## 1. 什麼是具身智能?

具身智能(Embodied AI)讓智能體通過身體傳感器與物理世界交互。機器人模仿學習(Imitation Learning)是其中一條主線:人類遙操作演示 → 採集數據 → 訓練策略模型 → 機器人複現動作。

**為什麼重要**:傳統編程無法覆蓋複雜操作(擰螺絲、疊衣服),而模仿學習只需「演示 + 訓練」。

## 2. 硬件方案

| 組件 | 推薦 | 說明 |
|------|------|------|
| 機械臂 | SO-ARM101(leader + follower) | 雙臂遙操作,6 DOF |
| 計算平台 | Jetson Orin NX Super / 4090 主機 | 訓練用大算力,推理用 Jetson |
| 視覺 | RealSense / USB 攝像頭 | 遙操作時採集環境 |

- [SO-ARM101 使用教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Jetson Orin NX Super 開發套件](/zh-hant/products/jetson-orin-nx-super-kit)

## 3. 環境安裝

```bash
# 克隆(鉅犀科技 fork 的穩定版)
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM 使用 feetech 舵機

# Jetson 用戶:先確認 PyTorch 可用
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. 數據採集(遙操作)

```bash
# 校准機械臂(首次)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm

# 採集數據
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**採集技巧**:

- 每個任務 ≥50 集,位置/手法多樣化
- 攝像頭固定,物體保持一致可見
- 保持一致的操作風格(同一個演示者)

## 5. 訓練

```bash
# ACT 策略(入門推薦)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**策略選型**:

| 策略 | 優點 | 適用 |
|------|------|------|
| **ACT** | 穩定,數據利用率高 | 入門首選,精細操作 |
| **擴散策略** | 複雜多模態動作穩 | 高頻精細任務 |
| **Pi0 / GR00T** | 泛化能力強 | 多任務、跨物體 |

## 6. 評估與復盤

```bash
# 回放數據集(檢查數據質量)
lerobot-dataset-viz --repo-id juxi/pick_cube

# 評估策略
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| 評估指標 | 說明 |
|---------|------|
| 成功率 | 任務完成比例 |
| 軌跡平滑度 | 動作是否抖動 |
| 泛化能力 | 換物體/換位置是否仍成功 |

## 7. 常見問題

**Q: 訓練很慢?**

數據量、steps 與算力成正比;先 50 集 / 100k steps 起步,驗證流程再放大。

**Q: 策略只能做單一動作?**

單任務訓練需要多任務數據集;GR00T/Pi0 類基礎模型可用小數據微調到多任務。

**Q: 訓練後動作抖?**

檢查數據質量(演示穩定)、增加平滑濾波器、降低控制頻率。

**Q: 內存/顯存不足?**

減小 batch_size,降低圖像分辨率,Jetson 用 16GB 版本。

---

## 相關鏈接

- [機械臂選型指南](/zh-hant/tutorials/robot-arms/select-guide)
- [邊緣 AI 部署入門](/zh-hant/topics/edge-ai-intro)
- [SO-ARM101 TPU 柔性夾爪](/zh-hant/products/tpu-flexible-gripper)
- [SO-ARM101 機械臂視覺套件](/zh-hant/products/robot-vision-kit)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
