---
title: SO-ARM101 7-DOF Robotic Arm
category: robot
description: "Juxi Technology SO-ARM101 7-DOF open-source robot arm — 90° wrist roll, 12V 30kg.cm bus servos, deep LeRobot integration, factory assembled with a complete tutorial series"
keywords: [so-arm101, 7-dof, 7-axis, robot arm, leRobot, teleoperation, imitation learning]
---

# SO-ARM101 7-DOF Robotic Arm

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## Overview

The SO-ARM101 is an open-source robotic arm deeply optimized from the SO-ARM100.
Revised cable routing and motor/gear pairings eliminate the joint cable-breakage
problem, and the performance upgrades support real-time leader-follower
following. **This is the 7-DOF version**: it adds a wrist roll (yaw) servo over
the 6-axis model, giving the wrist far greater freedom of posture, more reachable
points and multi-angle precision grasping.

It adapts to the Hugging Face **LeRobot** toolkit and connects directly to
PyTorch models and shared datasets, so imitation learning and reinforcement
learning are easy to put into practice. A complete assembly tutorial and DIY kit
are included — students, researchers and makers can all work with intelligent
robotics for learning, research and creation.

**At a glance**: 7-DOF with 90° wrist roll · 12V high-torque servos at 30kg.cm ·
optional TPU flexible gripper · dual-view data collection · onboard inference on
NVIDIA Jetson and D-Robotics RDK · factory assembled and ready to use · supports
ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5 model training.

## Key Advantages

### 7 Degrees of Freedom with 90° Wrist Roll

The 7-DOF version adds a left/right wrist roll (yaw) servo to the 6-axis design,
so the wrist can approach a target from far more angles and reach more points in
the workspace. That extra freedom is what makes multi-angle, fine-grained
grasping possible.

### Leader-Follower Teleoperation & Imitation Learning

The arm integrates the Hugging Face AI framework. Teleoperate the leader arm to
record demonstration motions, then train an imitation learning model in one pass
and deploy the optimized policy. It can take on complex tasks and adapt to its
environment, closing the automation loop end to end.

### Dual-View Global Coverage

The arm-mounted camera captures the target's spatial position, angle and surface
texture at close range for higher-fidelity data collection, while a desk-stand
scene camera reads the workspace environment in real time. Together they keep
operation precise, respond quickly to changes and prevent drift or stalling.

### 30kg.cm High-Torque 12V Bus Servos

The follower arm is unified at 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) to
guarantee sufficient grasping torque under multi-axis load, while the leader arm
stays at 7.4V to balance hand feel against cost. A 12-bit magnetic encoder
delivers 0.088° precision on every axis.

### Multi-Model Training Support

Train and deploy ACT, SmolVLA, Pi0, Pi0.5 and GR00T N1.5 policies on the same
hardware, and reuse pretrained models such as `lerobot/smolvla_base`,
`lerobot/pi0_base`, `lerobot/pi05_base` and `lerobot/xvla-widowx` directly from
the LeRobot model hub.

### Onboard Inference on NVIDIA and D-Robotics RDK

Connect a single cable to a Raspberry Pi, D-Robotics RDK or NVIDIA Jetson
controller to run inference on the arm itself, with real-time motor control and
encoder feedback.

### Factory Assembled, Ready to Use Out of the Box

Every unit ships assembled, wired and calibrated — connect power and USB and the
platform is ready for teleoperation and data collection.

### Upgradeable Flexible Gripper

The flexible gripper is an upgrade of the standard rigid gripper, 3D printed in a
flexible TPU material. It uses a hollow design with internal reinforcing ribs and
works on a fin-type gripper principle: it conforms to the shape of the object
being grasped, reducing the contact force applied to it — ideal for soft or
easily damaged items (fruit, glassware, eggs, food processing) that a
conventional rigid gripper cannot handle safely.

## Specifications

| Category | Spec |
|----------|------|
| Type | Leader-follower teleoperation robot arm |
| DOF | 7 (adds a wrist roll / yaw axis over the 6-axis model) |
| Follower arm servos | 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) |
| Leader arm servos | 7 × 7.4V STS3215 — damping version: 1 × C001 (1:345) + 2 × C044 (1:191) + 3 × C046 (1:147); zero-damping version: 7 × C066 |
| Encoder | 12-bit magnetic encoder (0.088° precision) |
| Power | Leader arm 5V6A / Follower arm 12V5A |
| Host | PC (Linux) / Raspberry Pi / D-Robotics RDK / NVIDIA Jetson |
| Ecosystem | Hugging Face LeRobot (ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5) |
| Gripper | Rigid PLA (standard) or flexible TPU (upgrade) |
| Assembly | Factory assembled, wired and calibrated |

*Servo layouts and available package configurations are listed on the store page.*

## Tutorials

- **[SO-ARM101 7-DOF Full Course](/tutorials/robot-arms/so-arm101/lerobot-7dof/)** — environment setup, 7-DOF file replacement, calibration, teleoperation, data collection, training and inference, step by step
- [7-DOF File Replacement (adapt an official lerobot clone)](/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [SO-ARM101 Tutorial (6-axis)](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Robot Arm Selection Guide](/tutorials/robot-arms/select-guide)
- [Embodied AI Intro (LeRobot)](/topics/embodied-ai-intro)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
