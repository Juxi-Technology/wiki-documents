---
title: SO-ARM101 开发套件
category: robot
description: "钜犀科技 SO-ARM101 双臂机器人开发套件——6 DOF 开源机械臂,LeRobot 生态,遥操作/模仿学习/AI 研究首选"
keywords: [so-arm101, 机械臂, leRobot, 遥操作, 双臂机器人]
---

# SO-ARM101 开发套件

> **[淘宝购买](https://item.taobao.com/item.htm?id=1002551208989)**

## 产品概述

SO-ARM101 是钜犀科技开源的 6-DOF 双臂机器人开发套件,深度集成 **LeRobot** 生态,支持 leader-follower 遥操作、模仿学习数据采集与策略训练。黑色主动臂(leader)+ 白色从动臂(follower),开箱即用。

**核心特性**:

- 双臂各 6 DOF,总线舵机驱动
- 深度兼容 LeRobot(HuggingFace),支持 ACT/Diffusion/Pi0 等策略
- 支持 Jetson / PC(Linux)平台
- 完整硬件开源(原理图/CAD/固件)

## 一、硬件设计：高性能模块化，易组装可定制

- **结构材质**：核心结构采用 3D 打印件与加固承重部件结合，优化走线与关节设计，避免运动干涉，兼顾轻量化与耐用性，用户可自行打印替换或扩展结构件。

- **驱动配置**：从动臂搭载**6 个 12V 30KG 大扭矩磁编码舵机**，配合 360° 磁编码反馈与 PID 控制算法，运动丝滑无抖动，重复定位精度高，动力强劲且动作精准；主动臂则采用**6 个 7.4V 舵机**，按关节负载分配不同减速比，便于手动拖拽示教。

- **视觉系统**：支持双摄智能视觉系统，末端摄像头捕捉近距离抓取细节，全局摄像头覆盖作业环境，双摄数据融合构建立体模型，为模仿学习提供丰富的数据支撑。

- **控制连接**：配备舵机驱动板，通过 USB-C 接口直连电脑或树莓派，即插即用，简化硬件连接流程，快速搭建控制环境。

## 二、软件生态：深度集成 LeRobot，AI 开发零门槛

- **核心框架兼容**：深度适配 Hugging Face **LeRobot 开源机器人 ML 框架**，基于 PyTorch 构建，内置预训练模型、多场景数据集及仿真环境，兼容 Stanford ALOHA 等知名开源数据集。

- **低延迟通信**：采用**DORA 分布式数据流引擎**，实现硬件与算法的低延迟交互，Python 运行性能较 ROS2 快 17 倍，支持代码热重载，无需重启即可实时调整策略。

- **全栈开源**：硬件 3D 打印文件、软件控制代码、AI 训练脚本及全套教程**完全开源**，用户可自由修改、二次开发，快速实现个性化功能扩展。

## 三、核心应用场景：从入门到落地，全场景适配

1. **机器人教育入门**：提供从机械臂组装、基础编程到 AI 策略部署的全流程教程，配套可视化操作界面与案例代码，零基础用户可快速掌握机器人控制与 AI 应用技能。

2. **科研算法验证**：专注**模仿学习、强化学习**研究，支持通过 VR 录制人类操作数据训练机器人；典型案例：基于 50 段 15 秒操作视频，2 小时训练即可掌握叠衣、插钥匙、物料分拣等任务。

3. **轻量工业原型**：低成本验证自动化方案，适配**物料搬运、精密装配、零件分拣**等场景，以千元级成本实现工业级机械臂的核心功能，快速落地原型验证。

## 产品规格

| 类别 | 规格 |
|------|------|
| 类型 | 双臂遥操作机器人 |
| 自由度 | 双臂各 6 DOF |
| 驱动 | Feetech 总线舵机 |
| 主控 | PC(Linux)/ Jetson |
| 生态 | LeRobot,ROS 2,ROS 1 |
| 电源 | 主动臂 5V6A / 从动臂 12V5A |
| 负载 | 500g |
| 重复定位精度 | ±0.1mm |
| 工作半径 | 520mm |
| 通信方式 | USB-C |
| 材质 | 拓竹 PLA+ |
| 尺寸(主动臂 / 从动臂) | 111×239×525 mm / 111×173×532 mm |

![主动臂与从动臂尺寸图](../../../public/images/products/so-arm101/dimensions.jpg)

## 快速开始

```bash
# 安装环境
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

# 校准
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 遥操作
lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## 相关教程

- [SO-ARM101 使用教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 组装教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [机械臂选型指南](/zh-hans/tutorials/robot-arms/select-guide)
- [具身智能入门(LeRobot)](/zh-hans/topics/embodied-ai-intro)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
