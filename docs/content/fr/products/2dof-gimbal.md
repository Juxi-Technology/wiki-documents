---
title: Unité pan-tilt servo 2 DDL
category: accessory
description: Unité pan-tilt de Juxi Technology — servos bus SCS0009, 180° horizontal / 90° vertical, caméra 2MP, suivi vision IA
keywords: [gimbal, pan-tilt, 2dof, suivi vision, scs0009]
---

# Unité pan-tilt servo 2 DDL

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**

## Présentation

L'unité pan-tilt servo 2 DDL embarque des servos bus série SCS0009 de haute précision pour 180° horizontal / 90° vertical. Caméra USB 2MP standard (module 1080P zoom/fixe optionnel) pour la reconnaissance visage/couleur/QR code et le suivi en temps réel.

**Caractéristiques clés** :

- 2 degrés de liberté (180° horizontal / 90° vertical)
- Servos bus SCS0009 : couple 2.5kg.cm, précision 0.293°, retour temps réel
- Protections blocage/surchauffe/tension + carte driver régulateur TVS
- Caméra 2MP, zoom 30FPS / fixe 60FPS
- Design fermé à câbles dissimulés

## Spécifications

| Catégorie | Spécification |
|------|------|
| Servos | FEETECH SCS0009 × 2 |
| Plage de rotation | 180° horizontal, 90° vertical |
| Caméra | USB 2MP plug-and-play (zoom/fixe optionnel) |
| Vision | Suivi visage/couleur/QR code |
| Hôtes | Raspberry Pi, Jetson, RDK |

## Démarrage rapide
```bash
# USB 连接主控,摄像头即插即用
# Python SDK 控制云台
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```
## Tutoriels

- [Tutoriel caméra pan-tilt 2 DDL](/fr/tutorials/accessories/2dof-camera-gimbal)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
