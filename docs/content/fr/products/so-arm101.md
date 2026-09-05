---
title: Kit de développement SO-ARM101
category: robot
description: Le kit robotique à deux bras open source de Juxi Technology — bras 6 DOF, écosystème LeRobot, téléopération/apprentissage par imitation
keywords: [so-arm101, bras robotique, leRobot, téléopération, deux bras]
---

# Kit de développement SO-ARM101

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

## Présentation

Le SO-ARM101 est le kit de développement robotique à deux bras 6-DOF open source de Juxi Technology, profondément intégré à l'écosystème **LeRobot**. Bras leader noir + bras follower blanc, prêt à l'emploi pour la téléopération, la collecte de données d'apprentissage par imitation et l'entraînement de politiques.

**Caractéristiques clés** :

- Deux bras, 6 DOF chacun, servos à bus
- Intégration LeRobot (HuggingFace) — politiques ACT/Diffusion/Pi0
- Prise en charge Jetson / PC (Linux)
- Matériel entièrement open source (schémas/CAO/firmware)

## Spécifications

| Catégorie | Spécification |
|------|------|
| Type | Robot de téléopération à deux bras |
| DOF | 6 DOF par bras |
| Actionnement | Servos à bus Feetech |
| Hôte | PC (Linux) / Jetson |
| Écosystème | LeRobot, ROS 2, ROS 1 |
| Alimentation | Leader 5V6A / Follower 12V5A |
| Charge utile | 500g |
| Répétabilité | ±0.1mm |
| Rayon de travail | 520mm |
| Communication | USB-C |

## Démarrage rapide

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutoriels

- [Tutoriel SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montage SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guide de sélection de bras robotique](/fr/tutorials/robot-arms/select-guide)
- [Introduction à l'IA incarnée (LeRobot)](/fr/topics/embodied-ai-intro)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
