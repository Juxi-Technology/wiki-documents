---
title: 2 自由度舵机云台
category: accessory
description: 钜犀科技 2 自由度舵机云台——SCS0009 总线舵机,180° 水平/90° 垂直,200 万摄像头,AI 视觉追踪
keywords: [gimbal, 云台, 2dof, 视觉追踪, scs0009]
---

# 2 自由度舵机云台

> **[淘宝购买](https://item.taobao.com/item.htm?id=1061569321161)**

## 产品概述

2 自由度舵机云台配备高精度 SCS0009 串口总线舵机,支持水平 180° / 垂直 90° 双轴电动运动。标配 200 万高清 USB 摄像头(可选 1080P 变焦/定焦模组),支持人脸、颜色、二维码识别与实时追踪。

**核心特性**:

- 2 自由度(水平 180° / 垂直 90°)
- SCS0009 总线舵机:2.5kg.cm 扭矩,0.293° 精度,实时反馈
- 堵转/过温/电压保护 + TVS 稳压驱动板
- 200 万像素摄像头,可选变焦 30FPS / 定焦 60FPS
- 封闭式隐藏走线设计

## 产品规格

| 类别 | 规格 |
|------|------|
| 舵机 | FEETECH SCS0009 × 2 |
| 旋转范围 | 水平 180°,垂直 90° |
| 摄像头 | 200 万 USB 即插即用(可选变焦/定焦) |
| 视觉能力 | 人脸/颜色/二维码识别追踪 |
| 兼容主控 | 树莓派、Jetson、RDK |

## 快速开始

```bash
# USB 连接主控,摄像头即插即用
# Python SDK 控制云台
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```

## 相关教程

- [2 自由度相机云台教程](/zh-hans/tutorials/accessories/2dof-camera-gimbal)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
