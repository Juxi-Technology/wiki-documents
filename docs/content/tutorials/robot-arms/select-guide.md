---
title: Robot Arm Selection Guide
description: SO-ARM101 vs AmazingHand vs Lekiwi comparison and selection guide
---

# Robot Arm Selection Guide

Juxi Technology offers several robot arm products for different application scenarios. This guide helps you compare and choose the right model.

> Note: Refer to each product's official documentation for detailed specifications. This table is for selection reference.

## Three Robot Arms Compared

| Feature | SO-ARM101 | AmazingHand | Lekiwi |
|---------|-----------|-------------|--------|
| **Type** | Dual-arm teleoperation robot | Dexterous hand | Low-cost teaching arm |
| **DOF** | 6 DOF per arm | 5 fingers, multi-joint | 6 DOF |
| **Control** | LeRobot ecosystem / Python API | TTL serial bus | Servo control |
| **Host Platform** | PC (Linux) / Jetson | Controller board | PC / MCU |
| **Use Cases** | AI imitation learning, teleoperation research | Grasping, gesture replication | Education, beginner learning |
| **Open-Source** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | Official docs |
| **Best For** | Researchers, AI developers | Manipulation researchers | Students, makers |

## How to Choose?

### 🎓 Students / Beginners → Lekiwi

- Simple structure, low cost — ideal for classroom teaching and getting started
- Intuitive servo control

### 🤖 Grasping & Manipulation Research → AmazingHand

- 5-finger dexterous hand for grasping strategy and gesture control research
- TTL serial bus control, compatible with mainstream controllers

### 🧠 AI Imitation Learning / Teleoperation → SO-ARM101

- Dual-arm design with leader-follower teleoperation
- Deep LeRobot ecosystem integration, ideal for imitation learning
- Jetson support for seamless AI workflows

## Recommended Combinations

| Need | Recommended Setup |
|------|-------------------|
| AI teleoperation research | SO-ARM101 + AmazingHand (dexterous manipulation) |
| Teaching lab | Multiple Lekiwi units |
| Full robot system | SO-ARM101 + IMU module + vision accessories |

## Related Tutorials

- [SO-ARM101 Tutorial](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [AmazingHand Interface Control](/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Lekiwi Tutorial](/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Official Website: [www.juxitech.com](https://www.juxitech.com)
