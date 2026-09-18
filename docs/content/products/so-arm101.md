---
title: SO-ARM101 Developer Kit
category: robot
description: "Juxi Technology SO-ARM101 dual-arm robot dev kit — 6-DOF open-source arms, LeRobot ecosystem, teleoperation/imitation learning"
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

## 1. Hardware Design: High-Performance, Modular, Easy to Assemble and Customize

- **Structural Materials**: The core structure combines 3D-printed parts with reinforced load-bearing components, optimizing cable routing and joint design to avoid motion interference while balancing lightweight construction and durability. Users can print replacement or extension parts themselves.

- **Drive Configuration**: The follower arm carries **6 × 12V 30KG high-torque magnetic-encoder servos**, combined with 360° magnetic encoder feedback and a PID control algorithm, delivering smooth, jitter-free motion, high repeat positioning accuracy, strong torque, and precise action; the leader arm uses **6 × 7.4V servos**, with different gear ratios allocated according to joint load, making manual drag teaching easy.

- **Vision System**: Supports a dual-camera intelligent vision system, with the end camera capturing close-range grasping details and the global camera covering the working environment; fusing the dual-camera data builds a 3D model, providing rich data support for imitation learning.

- **Control Connection**: Equipped with a servo driver board, connected directly to a computer or Raspberry Pi via a USB-C interface, plug and play, simplifying the hardware connection process and enabling rapid setup of the control environment.

## 2. Software Ecosystem: Deep LeRobot Integration, Zero-Barrier AI Development

- **Core Framework Compatibility**: Deeply adapted to the Hugging Face **LeRobot open-source robot ML framework**, built on PyTorch, with built-in pretrained models, multi-scenario datasets, and a simulation environment, and compatible with well-known open-source datasets such as Stanford ALOHA.

- **Low-Latency Communication**: Uses the **DORA distributed dataflow engine** to achieve low-latency interaction between hardware and algorithms; Python runs 17 times faster than ROS2, supports code hot-reloading, and allows real-time policy adjustment without restarting.

- **Full-Stack Open Source**: The hardware 3D print files, software control code, AI training scripts, and the complete tutorial set are **fully open source**; users can freely modify and further develop them to quickly implement personalized feature extensions.

## 3. Core Application Scenarios: From Entry-Level to Deployment, Full-Scenario Coverage

1. **Robotics Education for Beginners**: Provides an end-to-end tutorial covering robotic arm assembly, basic programming, and AI policy deployment, along with a visual operation interface and example code, so users with zero background can quickly master robot control and AI application skills.

2. **Research Algorithm Validation**: Focused on **imitation learning and reinforcement learning** research, supporting the recording of human operation data via VR to train robots; a typical case: based on 50 fifteen-second operation videos, 2 hours of training is enough to master tasks such as clothes folding, key insertion, and material sorting.

3. **Lightweight Industrial Prototyping**: Low-cost validation of automation solutions, adapted to scenarios such as **material handling, precision assembly, and part sorting**, delivering the core functions of an industrial-grade robotic arm at a cost of around a thousand yuan, enabling rapid prototype validation.

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
| Material | Bambu Lab PLA+ |
| Dimensions (leader / follower) | 111×239×525 mm / 111×173×532 mm |

![Leader and follower arm dimensions](../../public/images/products/so-arm101/dimensions.jpg)

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
