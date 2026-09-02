---
title: SO-ARM101 TPU Flexible Gripper
description: Juxi Technology SO-ARM101 TPU flexible gripper — soft TPU safely grasps irregular/fragile items, arm camera compatible, 30FPS zoom or 60FPS fixed options
keywords: [gripper, tpu, flexible, so-arm101, grasping]
---

# SO-ARM101 TPU Flexible Gripper

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-tpu-flexible-gripper)**

## Overview

Designed for XLerobot robot arms, this SO-ARM101 TPU flexible gripper supports mounting of the SO-ARM101 arm camera mount/kit. The soft **TPU material** safely grasps irregular and fragile items without damage; optional camera configurations (zoom 30FPS / fixed 60FPS) serve grasping development and vision-guided applications.

**Key features**:

- Direct installation on XLerobot arms, no modifications needed
- Soft TPU: flexible, wear-resistant, non-slip — safe for fragile items
- Compatible with SO-ARM101 arm camera mount/kit (vision-guided grasping)
- Screw-direct mounting, plug and play

---

## Specifications

| Category | Spec |
|----------|------|
| Compatible Arms | SO-ARM101 (XLerobot series) |
| Material | Soft TPU (thermoplastic polyurethane) |
| Drive | Servo-driven |
| Camera Options | Zoom 30FPS / Fixed 60FPS |
| Mounting | Screw-direct, plug and play |

## Kit Contents

| Kit | Contents |
|-----|----------|
| **Base Gripper** | 1× TPU flexible gripper |
| **Zoom Camera Kit** | Gripper + 30FPS zoom camera |
| **Fixed Camera Kit** | Gripper + 60FPS fixed camera |

---

## Quick Start

1. Align gripper screw holes with the arm's end effector
2. Screw-mount directly (no wiring changes)
3. Add the arm camera mount for vision-guided tasks

### Vision Grasping with LeRobot

```bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```

---

## FAQ

**Q: Why can it grasp irregular/fragile items?**

**A:** The flexible TPU adapts to object shapes with even force, avoiding damage.

**Q: How to choose a camera?**

**A:**

- Zoom 30FPS: flexible focal length for variable-distance vision
- Fixed 60FPS: high frame rate for fast motion capture

**Q: Which platforms?**

**A:** SO-ARM101 / XLerobot arms, compatible with ACT, Smolvla, Pi0 LeRobot frameworks.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
