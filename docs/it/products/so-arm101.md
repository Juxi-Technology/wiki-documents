---
title: Kit sviluppatore SO-ARM101
description: Doppio braccio 6-DOF open source, ecosistema LeRobot, teleoperazione
keywords: [so-arm101]
---

# Kit sviluppatore SO-ARM101

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**

## Panoramica

Kit di sviluppo a doppio braccio 6-DOF profondamente integrato con LeRobot. Teleoperazione leader-follower, raccolta dati per apprendimento imitativo.

## Specifiche

| カテゴリ | 仕様 |
|------|------|
| Tipo | Robot teleoperato a doppio braccio |
| DOF | 6 DOF per braccio |
| Azionamento | Servo bus Feetech |
| Host | PC (Linux) / Jetson |
| Ecosistema | LeRobot, ROS 2 |

## Avvio rapido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

---

## Supporto

- 📧 Email: support@juxitech.com
- 🌐 Sito web: [www.juxitech.com](https://www.juxitech.com)
