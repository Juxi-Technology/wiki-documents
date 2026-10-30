---
title: "AmazingHand 灵巧手使用教程"
description: "AmazingHand 开源灵巧手完整教程：产品资料、相机套件、网页端手势识别、MuJoCo 手势追踪、界面控制、Arduino Nano、TTL 与 PWM 调试。"
---

# AmazingHand 灵巧手使用教程

AmazingHand 是一个成本不到 250 美元的开源仿人手项目，面向机器人爱好者、研究人员与开发者。

## 项目简介

- **机械设计**：8 自由度、4 根手指，每指 2 节指关节联动；手指采用并联机构驱动，无外部线缆，所有驱动器内置手部；3D 打印零件，重量约 400g，成本低于 200 欧元。
- **控制方案**：Python 串口总线驱动（支持 Waveshare 等硬件）；Arduino + Feetech TTL Linker 双方案任选；提供 Python 与 Arduino 示例代码；支持舵机扭矩开关、位置传感、温度监控等反馈。
- **资源齐全**：完整 BOM 物料清单、CAD 文件及 Onshape 在线文档、组装教程与校准脚本、基础与高级演示示例，支持逆向/正向运动学。
- **项目亮点**：适配 Reachy2 等机器人腕部；开放设计、社区驱动；后续规划包括触觉传感、弹性关节、多指长度及 5 指方案。

## 教程目录

| 内容 | 说明 |
|---|---|
| [产品资料](./product-info.md) | 产品参数、BOM、结构与资料下载 |
| [环境相机套件安装](./Camera-Kit-Installation.md) | 相机套件支架安装步骤 |
| [网页端-手势识别](./AmazingHand-Web-Control.md) | 在线网页控制与本地部署 |
| [手势追踪（MuJoCo 仿真）](./gesture-tracking/02-Windows.md) | Windows / Linux / Mac 一键部署运行 |
| [界面控制教程](./AmazingHand-Interface-Control.md) | Python GUI / 命令行控制、左右手标定与协议 |
| [Arduino Nano 使用教程](./Arduino-Nano-Tutorial.md) | Nano 板接线、库安装与演示程序 |
| [TTL 串口舵机调试-组装](./AmazingHand-TTL-Debugging.md) | TTL 串口舵机组装与调试 |
| [PWM 舵机调试](./pwm-debugging/01-GUI-Visual-Control.md) | GUI 可视化、手势追踪与使用手册 |

## 资源下载

- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — 手势追踪一键部署（Windows / Linux / Mac）
- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — 飞特 SCS0009 舵机校准工具
- [AmazingHand 官方仓库](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — PWM 版交付包（GUI / 手势追踪 / 固件 / 文档）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — 本地部署包
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — 舵机调试工具


### 全部页面

- [AmazingHand灵巧手产品资料](./product-info.md)
- [环境相机套件安装](./Camera-Kit-Installation.md)
- [AmazingHand 网页控制](./AmazingHand-Web-Control.md)
- [Windows一键部署运行](./gesture-tracking/02-Windows.md)
- [Linux（Ubuntu）一键部署运行](./gesture-tracking/01-Ubuntu.md)
- [Mac一键部署运行](./gesture-tracking/03-macOS.md)
- [官方示例运行教程](./AmazingHand-Official-Example.md)
- [界面控制教程](./AmazingHand-Interface-Control.md)
- [Arduino Nano 使用教程](./Arduino-Nano-Tutorial.md)
- [TTL 调试教程](./AmazingHand-TTL-Debugging.md)
- [01-GUI可视化控制](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-手势追踪教程](./pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM舵机版本-使用手册](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-串口舵机版本-使用说明](./pwm-debugging/04-Serial-Servo-Guide.md)
- [全流程使用教程](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />
