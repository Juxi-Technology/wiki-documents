---
title: XLeRobot Dual-Arm Mobile Robot
category: robot
description: Juxi Technology XLeRobot dual-arm mobile robot — two SO-ARM101 follower arms, omni-wheel base and camera tower, dual servo driver boards on 12V, LeRobot ecosystem, assembled or parts kit
keywords: [xlerobot, dual-arm robot, mobile robot, embodied ai, lerobot, so-arm101, omni-wheel base]
---

# XLeRobot Dual-Arm Mobile Robot

## Overview

XLeRobot is a dual-arm mobile robot platform: an omni-wheel (mecanum-style caster) base cart carries a camera tower with two SO-ARM101 follower arms, driven by two servo driver boards and powered from a PD power bank, with a Raspberry Pi / Jetson as the host. The result is an open-source mobile manipulator aimed at embodied-AI research, household tasks and LeRobot ecosystem development.

**Key features:**

- Dual-arm manipulation plus an omni-directional mobile base for grasping objects around the home
- Built on SO-ARM101 arms with Feetech STS3215-C018 bus servos
- Camera tower plus wrist cameras, ready for data collection and imitation learning
- Two servo driver boards — arms and base driven independently, powered at 12V
- Full LeRobot software ecosystem: environment setup, data collection, training and inference
- Available as an assembled kit or a parts kit with a complete bill of materials
- Lekiwi compatible — an existing Lekiwi base can be reused directly

---

## Specifications

| Category | Specification |
|------|------|
| Arms | 2 × SO-ARM101 follower arms (Feetech STS3215-C018 bus servos, IDs 1-6) |
| Base | Omni-wheel base cart with 3 × STS3215-C018 servos (IDs 7/8/9) |
| Camera tower | Base plate + 2 × STS3215-C018 servos (IDs 7/8) + camera |
| Driver | 2 × servo driver boards (USB-C to USB-A to the host; PD to DC 12V 3A power cables) |
| Power | PD power bank, 12V version (up to 100W per port, tested sufficient) |
| Host | Raspberry Pi (not included) / Jetson |
| Cabling | 2 × 90 cm servo extension cables (base cart and camera tower to the driver boards) |
| Total weight | ~12 kg fully assembled |
| Software | LeRobot ecosystem; servo configuration via Bambot (Windows / macOS / Linux) |

---

## Quick Start

### 1. Set up the LeRobot environment

Follow the environment setup tutorial for your OS (macOS / Ubuntu / Windows) to install LeRobot and its dependencies.

### 2. Move the XLeRobot files

Copy the XLeRobot files into place to finish the software preparation.

### 3. Assemble the robot

- **Assembled kit**: mount the base cart, camera tower base and both arms, then wire everything up following the bill of materials
- **Parts kit**: configure the servos first (scan and rename IDs with [Bambot](https://bambot.org/feetech.js)), then assemble the cart, wheeled base, arm mounts and wiring, and finally install the battery

With the parts kit, connect the power cables last and keep power disconnected while plugging or unplugging other cables to protect the driver boards.

---

## Tutorials

- [XLeRobot Tutorials Overview](/tutorials/robot-arms/xlerobot/)
- [Environment Setup (macOS)](/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [Environment Setup (Ubuntu)](/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [Environment Setup (Windows)](/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [Move the XLeRobot Files](/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [Assembled-Kit Assembly](/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [Parts-Kit Assembly](/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## Applications

- Embodied-AI and imitation learning research (household tasks, object grasping)
- Dual-arm mobile manipulation algorithm development (LeRobot ecosystem)
- Robotics teaching and competitions
- Home service robot prototyping

---

## FAQ

**Q: What is the difference between the assembled kit and the parts kit?**

**A:** The assembled kit arrives put together per the bill of materials. The parts kit needs self-assembly, starting with servo ID configuration in Bambot (arms 1-6, base 7/8/9, camera tower 7/8).

**Q: What else do I need to buy?**

**A:** The power bank, the Raspberry Pi and the PD 5V 5A Raspberry Pi power cable are not included (as noted in the tutorial).

**Q: How are servo IDs configured?**

**A:** Connect a servo to the driver board and the board to your computer, then scan and rename IDs on the [Bambot servo configuration page](https://bambot.org/feetech.js). The official LeRobot codebase does not yet support non-arm servos, which is why Bambot is used instead.

**Q: Can I push the robot around once it is assembled?**

**A:** No. Never push a fully assembled XLeRobot like a cart — it can damage the servo gears. Lift the robot (~12 kg) when you need to move it by hand.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Issue tracker](https://github.com/Juxi-Technology/wiki-documents/issues)
