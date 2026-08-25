---
title: SO-ARM101 開發套件
description: 鉅犀科技 SO-ARM101 雙臂機器人開發套件——6 DOF 開源機械臂,LeRobot 生態,遙操作/模仿學習/AI 研究首選
keywords: [so-arm101, 機械臂, leRobot, 遙操作, 雙臂機器人]
---

# SO-ARM101 開發套件

> **[淘寶店鋪](https://juxitechnology.taobao.com)**

## 產品概述

SO-ARM101 是鉅犀科技開源的 6-DOF 雙臂機器人開發套件,深度集成 **LeRobot** 生態,支持 leader-follower 遙操作、模仿學習數據採集與策略訓練。黑色主動臂(leader)+ 白色從動臂(follower),開箱即用。

**核心特性**:

- 雙臂各 6 DOF,總線舵機驅動
- 深度兼容 LeRobot(HuggingFace),支持 ACT/Diffusion/Pi0 等策略
- 支持 Jetson / PC(Linux)平台
- 完整硬件開源(原理圖/CAD/固件)

## 產品規格

| 類別 | 規格 |
|------|------|
| 類型 | 雙臂遙操作機器人 |
| 自由度 | 雙臂各 6 DOF |
| 驅動 | Feetech 總線舵機 |
| 主控 | PC(Linux)/ Jetson |
| 生態 | LeRobot,ROS 2,ROS 1 |
| 電源 | 主動臂 5V6A / 從動臂 12V5A |
| 負載 | 500g |
| 重複定位精度 | ±0.1mm |
| 工作半徑 | 520mm |
| 通信方式 | USB-C |

## 快速開始

```bash
# 安裝環境
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

# 校準
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 遙操作
lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## 相關教程

- [SO-ARM101 使用教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 組裝教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [機械臂選型指南](/zh-hant/tutorials/robot-arms/select-guide)
- [具身智能入門(LeRobot)](/zh-hant/topics/embodied-ai-intro)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
