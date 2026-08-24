---
title: SO-ARM101 Entwicklungs-Kit
description: Das Open-Source-Doppelarm-Robotik-Kit von Juxi Technology — 6-DOF-Arme, LeRobot-Ökosystem, Teleoperation/Imitation Learning für KI-Forschung
keywords: [so-arm101, roboterarm, leRobot, teleoperation, doppelarm]
---

# SO-ARM101 Entwicklungs-Kit

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-developers-kit)**

## Produktübersicht

Das SO-ARM101 ist Juxi Technologys Open-Source-6-DOF-Doppelarm-Entwicklungskit, tief integriert in das **LeRobot**-Ökosystem. Schwarzer Leader-Arm + weißer Follower-Arm, sofort einsatzbereit für Teleoperation, Datenerfassung für Imitation Learning und Policy-Training.

**Kernfunktionen**:

- Doppelarme, je 6 DOF, Bus-Servo-Antrieb
- Tiefe LeRobot-Integration (HuggingFace) — ACT/Diffusion/Pi0-Policies
- Jetson / PC (Linux) Unterstützung
- Vollständig Open-Source-Hardware (Schaltpläne/CAD/Firmware)

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Typ | Doppelarm-Teleoperationsroboter |
| DOF | Je Arm 6 DOF |
| Antrieb | Feetech-Bus-Servos |
| Host | PC (Linux) / Jetson |
| Ökosystem | LeRobot, ROS 2, ROS 1 |
| Stromversorgung | Leader 5V6A / Follower 12V5A |
| Nutzlast | 500g |
| Wiederholgenauigkeit | ±0.1mm |
| Arbeitsradius | 520mm |
| Kommunikation | USB-C |

## Schnellstart

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Verwandte Tutorials

- [SO-ARM101-Tutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 Montage](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Roboterarm-Auswahlleitfaden](/de/tutorials/robot-arms/select-guide)
- [Einführung in verkörperte Intelligenz (LeRobot)](/de/topics/embodied-ai-intro)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
