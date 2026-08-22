---
title: SO-ARM101 Entwickler-Kit
description: 6-DOF Open-Source-Doppelarm, LeRobot-Ökosystem, Teleoperation
keywords: [so-arm101]
---

# SO-ARM101 Entwickler-Kit

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

## Überblick

Deep in LeRobot integriertes 6-DOF Doppelarm-Entwicklungskit. leader-follower Teleoperation, Imitation-Learning-Datensammlung, Policy-Training.

## Spezifikationen

| カテゴリ | 仕様 |
|------|------|
| Typ | Doppelarm-Teleoperationsroboter |
| DOF | 6 DOF pro Arm |
| Antrieb | Feetech-Busservos |
| Host | PC (Linux) / Jetson |
| Ökosystem | LeRobot, ROS 2 |

## Schnellstart

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

---

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
