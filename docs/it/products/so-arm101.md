---
title: Kit di sviluppo SO-ARM101
description: Il kit robotico a doppio braccio open source di Juxi Technology — bracci 6 DOF, ecosistema LeRobot, teleoperazione/apprendimento per imitazione
keywords: [so-arm101, braccio robotico, leRobot, teleoperazione, doppio braccio]
---

# Kit di sviluppo SO-ARM101

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**

## Panoramica

SO-ARM101 è il kit di sviluppo robotico a doppio braccio 6-DOF open source di Juxi Technology, profondamente integrato con l'ecosistema **LeRobot**. Braccio leader nero + braccio follower bianco, pronto all'uso per teleoperazione, raccolta dati di apprendimento per imitazione e addestramento di policy.

**Caratteristiche principali**:

- Doppi bracci, 6 DOF ciascuno, servo a bus
- Integrazione profonda con LeRobot (HuggingFace) — policy ACT/Diffusion/Pi0
- Supporto Jetson / PC (Linux)
- Hardware completamente open source (schemi/CAD/firmware)

## Specifiche

| Categoria | Specifica |
|------|------|
| Tipo | Robot di teleoperazione a doppio braccio |
| DOF | 6 DOF per braccio |
| Azionamento | Servo a bus Feetech |
| Host | PC (Linux) / Jetson |
| Ecosistema | LeRobot, ROS 2, ROS 1 |
| Alimentazione | Leader 5V6A / Follower 12V5A |
| Carico utile | 500g |
| Ripetibilità | ±0.1mm |
| Raggio di lavoro | 520mm |
| Comunicazione | USB-C |

## Avvio rapido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutorial

- [Tutorial SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montaggio SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guida alla scelta del braccio robotico](/it/tutorials/robot-arms/select-guide)
- [Introduzione all'IA incarnata (LeRobot)](/it/topics/embodied-ai-intro)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
