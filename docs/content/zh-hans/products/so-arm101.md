---
title: SO-ARM101 开发套件
description: 钜犀科技 SO-ARM101 双臂机器人开发套件——6 DOF 开源机械臂,LeRobot 生态,遥操作/模仿学习/AI 研究首选
keywords: [so-arm101, 机械臂, leRobot, 遥操作, 双臂机器人]
---

# SO-ARM101 开发套件

> **[在商店购买](https://www.juxitech.com/zh-hans/products/so-arm101-developers-kit)**

## 产品概述

SO-ARM101 是钜犀科技开源的 6-DOF 双臂机器人开发套件,深度集成 **LeRobot** 生态,支持 leader-follower 遥操作、模仿学习数据采集与策略训练。黑色主动臂(leader)+ 白色从动臂(follower),开箱即用。

**核心特性**:

- 双臂各 6 DOF,总线舵机驱动
- 深度兼容 LeRobot(HuggingFace),支持 ACT/Diffusion/Pi0 等策略
- 支持 Jetson / PC(Linux)平台
- 完整硬件开源(原理图/CAD/固件)

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
