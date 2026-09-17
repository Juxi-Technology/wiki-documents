---
title: SO-ARM101 Robot Vision Kit
category: robot
description: "Camera kit for SO-ARM101 robot arms: wrist, side or overhead mounts, 60FPS fixed or 30FPS autofocus zoom cameras, compatible with ACT, Smolvla, Pi0 and GR00T."
keywords: [camera mount, vision kit, so-arm101, robot vision]
---

# SO-ARM101 Robot Vision Kit

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-wrist-camera-mount)**

## Overview

A dedicated camera accessory for robot arms with two camera options: **60FPS fixed** and **30FPS autofocus zoom**. Supports SO-ARM101, LeKiwi, and XLerobot platforms, compatible with **ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5** embodied AI training frameworks.

**Key features**:

- Three mounting positions: **wrist / side / overhead**
- Dual camera: 60FPS fixed (fast motion capture) / 30FPS autofocus zoom (flexible vision)
- Perfect match with SO-ARM101, no modifications
- Anti-slip grip pads included

---

## Specifications

| Category | Spec |
|----------|------|
| Compatible Platforms | SO-ARM101, LeKiwi, XLerobot, M3-hole platforms |
| Mounting Positions | Wrist / Side / Overhead |
| Camera Options | 60FPS fixed / 30FPS autofocus zoom |
| Framework Compat | ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 |

## Camera Comparison

| Camera | Use Case |
|--------|----------|
| **60FPS fixed** | High frame rate, stable imaging, fast motion capture |
| **30FPS autofocus zoom** | Flexible focal length, variable-distance vision |

---

## Quick Start

### 1. Choose Mounting Position

- **Wrist**: grasping viewpoint (recommended for manipulation)
- **Side**: global environment view
- **Overhead**: top-down for data collection

### 2. Install

Mount the camera to the bracket, connect via USB to the host (Jetson/Raspberry Pi).

### 3. Framework Integration

```bash
# Find camera
python -m lerobot.find_cameras

# Record with vision
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```

---

## FAQ

**Q: Which camera?**

**A:** 60FPS fixed for fast motion capture (e.g., grasping); 30FPS autofocus zoom for variable-distance vision.

**Q: Which training frameworks?**

**A:** ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 — full coverage of mainstream embodied AI frameworks.

**Q: Other arms?**

**A:** SO-ARM101, LeKiwi, XLerobot, and other M3-hole compatible platforms.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
