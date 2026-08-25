---
title: SO-ARM101 Developer Kit
description: Juxi Technology SO-ARM101 dual-arm robot dev kit — 6-DOF open-source arms, LeRobot ecosystem, teleoperation/imitation learning
keywords: [so-arm101, robot arm, leRobot, teleoperation, dual-arm]
---

# SO-ARM101 Developer Kit

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-developers-kit)**

## Overview

The SO-ARM101 is Juxi Technology's open-source 6-DOF dual-arm robot development kit, deeply integrated with the **LeRobot** ecosystem. Black leader arm + white follower arm, ready out of the box for teleoperation, imitation learning data collection, and policy training.

**Key features**:

- Dual arms, 6 DOF each, bus-servo driven
- Deep LeRobot (HuggingFace) integration — ACT/Diffusion/Pi0 policies
- Jetson / PC (Linux) support
- Fully open-source hardware (schematics/CAD/firmware)

## Specifications

| Category | Spec |
|----------|------|
| Type | Dual-arm teleoperation robot |
| DOF | 6 DOF per arm |
| Drive | Feetech bus servos |
| Host | PC (Linux) / Jetson |
| Ecosystem | LeRobot, ROS 2, ROS 1 |
| Power | Leader 5V6A / Follower 12V5A |
| Payload | 500g |
| Repeatability | ±0.1mm |
| Working radius | 520mm |
| Communication | USB-C |

## Quick Start

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutorials

- [SO-ARM101 Tutorial](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 Assembly](/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Robot Arm Selection Guide](/tutorials/robot-arms/select-guide)
- [Embodied AI Intro (LeRobot)](/topics/embodied-ai-intro)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
