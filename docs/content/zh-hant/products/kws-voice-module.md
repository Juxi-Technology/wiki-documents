---
title: KWS 語音交互模組
description: 鉅犀科技 KWS 語音識別交互模組——中英文喚醒詞識別,串口/RViz2 可視化,適配 Jetson/樹莓派,固件開源
keywords: [kws, 語音識別, 語音交互, 喚醒詞, ai voice]
---

# KWS 語音交互模組

> **[在商店購買](https://www.juxitech.com/zh-hant/products/ai-voice-recognition-module)**

## 產品概述

KWS(Keyword Spotting)語音識別交互模組支持中英文識別詞下載與燒錄,語音芯片到手後**需先燒錄出廠固件**。通過串口與主控通信,支持 Jetson、樹莓派等平台,提供 ROS2 RViz2 可視化。

**核心特性**:

- 中英文識別詞固件(下載與燒錄)
- 串口通信(PC/Jetson/樹莓派/Jetson Nano)
- ROS2 + RViz2 可視化
- 開源倉庫,Python 串口示例
- 100% 離線識別，無需聯網（隱私 + 低延遲）
- 正常環境識別準確率 >95%，指令輸入 300ms 內響應
- 支持最多 100 個自定義語音指令，喚醒詞可定製
- 低功耗：平均工作電流 <50mA

## 產品規格

| 類別 | 規格 |
|------|------|
| 通信 | 串口(UART) |
| 識別 | 中英文喚醒詞 |
| 平台 | Jetson,Nano,樹莓派,PC |
| 可視化 | ROS2 RViz2 |
| 固件 | 開源燒錄工具 |

## 快速開始

```bash
# 燒錄固件(參考教程)
# Python 串口通信示例
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"識別結果: {data}")
```

## 相關教程

- [KWS 語音識別模組系列教程](/zh-hant/tutorials/accessories/KWS-speech-recognition-module/)
- [中英文識別詞固件下載與燒錄](/zh-hant/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2 可視化](/zh-hant/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
