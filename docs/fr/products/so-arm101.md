---
title: Kit développeur SO-ARM101
description: Double bras 6-DOF open source, écosystème LeRobot, téléopération
keywords: [so-arm101]
---

# Kit développeur SO-ARM101

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

## Aperçu

Kit de développement à double bras 6-DOF profondément intégré à LeRobot. Téléopération leader-follower, collecte de données d'apprentissage par imitation.

## Spécifications

| カテゴリ | 仕様 |
|------|------|
| Type | Robot téléopéré à double bras |
| DOF | 6 DOF par bras |
| Actionnement | Servos bus Feetech |
| Hôte | PC (Linux) / Jetson |
| Écosystème | LeRobot, ROS 2 |

## Démarrage rapide

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

---

## Support

- 📧 E-mail: support@juxitech.com
- 🌐 Site web: [www.juxitech.com](https://www.juxitech.com)
