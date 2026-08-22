---
title: 3D RealSense 深度相机
description: 钜犀科技 3D RealSense 深度相机——D435i/D405/D405CB 三型号,高精度深度感知,适配 XLeRobot 与 SO-ARM101
keywords: [realsense, depth camera, 深度相机, 3d vision, 深度感知, 机器人视觉]
---

# 3D RealSense 深度相机

> **[在商店购买](https://www.juxitech.com/zh-hans/products/3d-realsense-depth-camera)**

## 产品概述

3D RealSense 深度相机是一款高性能视觉感知设备,提供 **D435i、D405、D405CB** 三款型号。支持人脸分析、增强现实、物体追踪、3D 扫描等应用,并针对具身智能开发场景特别优化。

**核心特性**:

- 三种型号可选,覆盖远近距离与精度需求
- 输出高精度深度图、RGB 图像、红外图像(D435i 另有 IMU 数据)
- 针对具身智能优化:自主导航、物体识别、交互操作
- 可选适配 **XLeRobot** 和 **SO-ARM101** 机器人平台,即插即用

---

## 型号对比

| 型号 | 适用距离 | 适用场景 |
|------|---------|---------|
| **D435i** | 中远距离 | 移动机器人导航、环境 3D 重建 |
| **D405** | 近距离高精度 | 机械臂抓取、近距离物体识别 |
| **D405CB** | 近距离(D405 增强版) | 复杂环境、弱光条件,更高精度 |

## 产品规格

| 类别 | 规格 |
|------|------|
| 可选型号 | D435i / D405 / D405CB |
| 核心功能 | 人脸分析、增强现实、物体追踪、3D 扫描、具身智能视觉感知 |
| 可适配平台 | XLeRobot / SO-ARM101(可选) |
| 输出数据 | 深度图、RGB 图像、红外图像、IMU 数据(D435i) |
| 应用场景 | 机器人开发、AI 研究、3D 重建、工业检测、AR/VR、具身智能 |

---

## 快速开始

### 1. 安装驱动

```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```

### 2. 验证设备

```bash
rs-enumerate-devices
```

应能看到连接的 RealSense 相机及其型号。

### 3. 基础示例

```python
import pyrealsense2 as rs
import numpy as np
import cv2

# 创建管道
pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

# 开始
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
        cv2.imshow('Depth', depth_image * 80)  # 深度可视化
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```

### 4. LeRobot 环境集成

在 SO-ARM101 / XLeRobot 项目中使用:

```bash
# 查找相机 ID
python -m lerobot.find_cameras realsense

# 遥操作时启用 RealSense
lerobot-teleoperate \\
  --robot.cameras='{ front: {type: realsense} }' \\
  ...
```

---

## 应用场景

| 场景 | 说明 |
|------|------|
| **人脸分析** | 人脸识别、表情识别、人脸属性分析 |
| **增强现实** | AR 叠加、空间定位、3D 注册 |
| **物体追踪** | 物体检测、跟踪、计数 |
| **3D 扫描** | 3D 模型重建、体积测量、尺寸检测 |
| **具身智能** | 环境感知、避障、交互操作 |

---

## 常见问题

**Q: 如何选择型号?**
- 移动机器人导航/环境重建 → D435i(中远距离,含 IMU)
- 机械臂抓取/近距离识别 → D405(超紧凑高精度)
- 弱光/复杂环境 → D405CB(D405 增强版)

**Q: 支持 jetson 吗?**
支持。pyrealsense2 在 Jetson 平台可直接安装,与 SO-ARM101 教程的 LeRobot 流程兼容。

**Q: 有运费和发票吗?**
中国大陆订单顺丰包邮,支持官方增值税发票(3%)。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
