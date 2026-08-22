---
title: 3D RealSense Depth Camera
description: Juxi Technology 3D RealSense depth camera — D435i/D405/D405CB models, high-precision depth perception for XLeRobot & SO-ARM101
keywords: [realsense, depth camera, 3d vision, depth perception, robot vision]
---

# 3D RealSense Depth Camera

> **[Buy in Store](https://www.juxitech.com/products/3d-realsense-depth-camera)**

## Overview

The 3D RealSense Depth Camera is a high-performance visual perception device available in **D435i, D405, and D405CB** models. It supports face analysis, augmented reality, object tracking, 3D scanning, and is specially optimized for embodied intelligence development.

**Key features**:

- Three models covering near-to-far range and precision needs
- High-precision depth, RGB, and infrared output (D435i also provides IMU data)
- Optimized for embodied AI: autonomous navigation, object recognition, manipulation
- Optional adaptation for **XLeRobot** and **SO-ARM101** robot platforms, plug-and-play

---

## Model Comparison

| Model | Range | Best For |
|-------|-------|----------|
| **D435i** | Mid-to-long range | Mobile robot navigation, environment 3D reconstruction |
| **D405** | Short range, high precision | Robot arm grasping, close-range object recognition |
| **D405CB** | Short range (D405 enhanced) | Complex/low-light environments, higher precision |

## Specifications

| Category | Spec |
|----------|------|
| Models | D435i / D405 / D405CB |
| Core Functions | Face analysis, AR, object tracking, 3D scanning, embodied AI perception |
| Compatible Platforms | XLeRobot / SO-ARM101 (optional) |
| Output | Depth, RGB, IR, IMU (D435i) |
| Use Cases | Robotics, AI research, 3D reconstruction, industrial inspection, AR/VR, embodied AI |

---

## Quick Start

### 1. Install Driver

```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```

### 2. Verify Device

```bash
rs-enumerate-devices
```

You should see your RealSense camera and its model.

### 3. Basic Example

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

### 4. LeRobot Integration

For SO-ARM101 / XLeRobot projects:

```bash
# Find camera ID
python -m lerobot.find_cameras realsense

# Enable RealSense during teleoperation
lerobot-teleoperate \\
  --robot.cameras='{ front: {type: realsense} }' \\
  ...
```

---

## Applications

| Scenario | Description |
|----------|-------------|
| **Face Analysis** | Recognition, expression, attribute analysis |
| **Augmented Reality** | Overlay, spatial localization, 3D registration |
| **Object Tracking** | Detection, tracking, counting |
| **3D Scanning** | Model reconstruction, volume measurement, dimension check |
| **Embodied AI** | Environment perception, obstacle avoidance, manipulation |

---

## FAQ

**Q: How to choose a model?**
- Mobile robot navigation / reconstruction → D435i (mid-range, with IMU)
- Robot arm grasping / close-range → D405 (compact, high precision)
- Low-light / complex environments → D405CB (D405 enhanced)

**Q: Does it support Jetson?**
Yes. pyrealsense2 installs directly on Jetson and is compatible with the SO-ARM101 LeRobot workflow.

**Q: Shipping and invoices?**
Free SF Express shipping within mainland China; official VAT invoices supported.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
