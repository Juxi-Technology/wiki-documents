---
title: KWS 语音交互模块
description: 钜犀科技 KWS 语音识别交互模块——中英文唤醒词识别,串口/RViz2 可视化,适配 Jetson/树莓派,固件开源
keywords: [kws, 语音识别, 语音交互, 唤醒词, ai voice]
---

# KWS 语音交互模块

> **[在商店购买](https://www.juxitech.com/zh-hans/products/ai-voice-recognition-module)**

## 产品概述

KWS(Keyword Spotting)语音识别交互模块支持中英文识别词下载与烧录,语音芯片到手后**需先烧录出厂固件**。通过串口与主控通信,支持 Jetson、树莓派等平台,提供 ROS2 RViz2 可视化。

**核心特性**:

- 中英文识别词固件(下载与烧录)
- 串口通信(PC/Jetson/树莓派/Jetson Nano)
- ROS2 + RViz2 可视化
- 开源仓库,Python 串口示例

## 产品规格

| 类别 | 规格 |
|------|------|
| 通信 | 串口(UART) |
| 识别 | 中英文唤醒词 |
| 平台 | Jetson,Nano,树莓派,PC |
| 可视化 | ROS2 RViz2 |
| 固件 | 开源烧录工具 |

## 快速开始

```bash
# 烧录固件(参考教程)
# Python 串口通信示例
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"识别结果: {data}")
```

## 相关教程

- [KWS 语音识别模块系列教程](/tutorials/accessories/KWS-speech-recognition-module/)
- [中英文识别词固件下载与烧录](/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2 可视化](/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
