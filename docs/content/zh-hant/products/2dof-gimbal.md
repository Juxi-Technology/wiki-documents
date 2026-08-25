---
title: 2 自由度舵機雲台
description: 鉅犀科技 2 自由度舵機雲台——SCS0009 總線舵機,180° 水平/90° 垂直,200 萬攝像頭,AI 視覺追蹤
keywords: [gimbal, 雲台, 2dof, 視覺追蹤, scs0009]
---

# 2 自由度舵機雲台

> **[淘寶購買](https://item.taobao.com/item.htm?id=1061569321161)**

## 產品概述

2 自由度舵機雲台配備高精度 SCS0009 串口總線舵機,支持水平 180° / 垂直 90° 雙軸電動運動。標配 200 萬高清 USB 攝像頭(可選 1080P 變焦/定焦模組),支持人臉、顏色、二維碼識別與實時追蹤。

**核心特性**:

- 2 自由度(水平 180° / 垂直 90°)
- SCS0009 總線舵機:2.5kg.cm 扭矩,0.293° 精度,實時反饋
- 堵轉/過溫/電壓保護 + TVS 穩壓驅動板
- 200 萬像素攝像頭,可選變焦 30FPS / 定焦 60FPS
- 封閉式隱藏走線設計

## 產品規格

| 類別 | 規格 |
|------|------|
| 舵機 | FEETECH SCS0009 × 2 |
| 旋轉範圍 | 水平 180°,垂直 90° |
| 攝像頭 | 200 萬 USB 即插即用(可選變焦/定焦) |
| 視覺能力 | 人臉/顏色/二維碼識別追蹤 |
| 兼容主控 | 樹莓派、Jetson、RDK |

## 快速開始

```bash
# USB 連接主控,攝像頭即插即用
# Python SDK 控制雲台
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```

## 相關教程

- [2 自由度相機雲台教程](/zh-hant/tutorials/accessories/2dof-camera-gimbal)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
