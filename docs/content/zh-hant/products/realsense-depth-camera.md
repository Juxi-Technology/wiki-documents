---
title: 3D RealSense 深度相機
description: 鉅犀科技 3D RealSense 深度相機——D435i/D405/D405CB 三型號,高精度深度感知,適配 XLeRobot 與 SO-ARM101
keywords: [realsense, depth camera, 深度相機, 3d vision, 深度感知, 機器人視覺]
---

# 3D RealSense 深度相機

> **[淘寶購買](https://item.taobao.com/item.htm?id=1048905612040)**

## 產品概述

3D RealSense 深度相機是一款高性能視覺感知設備,提供 **D435i、D405、D405CB** 三款型號。支持人臉分析、增強現實、物體追蹤、3D 掃描等應用,並針對具身智能開發場景特別優化。

**核心特性**:

- 三種型號可選,覆蓋遠近距離與精度需求
- 輸出高精度深度圖、RGB 圖像、紅外圖像(D435i 另有 IMU 數據)
- 針對具身智能優化:自主導航、物體識別、交互操作
- 可選適配 **XLeRobot** 和 **SO-ARM101** 機器人平台,即插即用

---

## 型號對比

| 型號 | 適用距離 | 適用場景 |
|------|---------|---------|
| **D435i** | 中遠距離 | 移動機器人導航、環境 3D 重建 |
| **D405** | 近距離高精度 | 機械臂抓取、近距離物體識別 |
| **D405CB** | 近距離(D405 增強版) | 複雜環境、弱光條件,更高精度 |

## 產品規格

| 類別 | 規格 |
|------|------|
| 可選型號 | D435i / D405 / D405CB |
| 核心功能 | 人臉分析、增強現實、物體追蹤、3D 掃描、具身智能視覺感知 |
| 可適配平台 | XLeRobot / SO-ARM101(可選) |
| 輸出數據 | 深度圖、RGB 圖像、紅外圖像、IMU 數據(D435i) |
| 應用場景 | 機器人開發、AI 研究、3D 重建、工業檢測、AR/VR、具身智能 |

---

## 快速開始

### 1. 安裝驅動

```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```

### 2. 驗證設備

```bash
rs-enumerate-devices
```

應能看到連接的 RealSense 相機及其型號。

### 3. 基礎示例

```python
import pyrealsense2 as rs
import numpy as np
import cv2

pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

pipeline.start(config)

try:
    while True:
        frames = pipeline.wait_for_frames()
        depth = frames.get_depth_frame()
        color = frames.get_color_frame()
        if not depth or not color:
            continue
        depth_image = np.asanyarray(depth.get_data())
        color_image = np.asanyarray(color.get_data())
        cv2.imshow('Color', color_image)
        cv2.imshow('Depth', depth_image * 80)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```

### 4. LeRobot 環境集成

在 SO-ARM101 / XLeRobot 項目中使用:

```bash
# 查找相機 ID
python -m lerobot.find_cameras realsense

# 遙操作時啟用 RealSense
lerobot-teleoperate \\
  --robot.cameras='{ front: {type: realsense} }' \\
  ...
```

---

## 應用場景

| 場景 | 說明 |
|------|------|
| **人臉分析** | 人臉識別、表情識別、人臉屬性分析 |
| **增強現實** | AR 疊加、空間定位、3D 註冊 |
| **物體追蹤** | 物體檢測、跟蹤、計數 |
| **3D 掃描** | 3D 模型重建、體積測量、尺寸檢測 |
| **具身智能** | 環境感知、避障、交互操作 |

---

## 常見問題

**Q: 如何選擇型號?**

**A:**

- 移動機器人導航/環境重建 → D435i(中遠距離,含 IMU)
- 機械臂抓取/近距離識別 → D405(超緊湊高精度)
- 弱光/複雜環境 → D405CB(D405 增強版)

**Q: 支持 jetson 嗎?**

**A:** 支持。pyrealsense2 在 Jetson 平台可直接安裝,與 SO-ARM101 教程的 LeRobot 流程兼容。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
