---
title: Unità pan-tilt servo a 2 DOF
category: accessory
description: "Unità pan-tilt di Juxi Technology — servo bus SCS0009, 180° orizzontale / 90° verticale, fotocamera 2MP, tracking visione AI"
keywords: [gimbal, pan-tilt, 2dof, tracking visione, scs0009]
---

# Unità pan-tilt servo a 2 DOF

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**

## Panoramica

L'unità pan-tilt servo a 2 DOF monta servo bus seriale SCS0009 di alta precisione per 180° orizzontale / 90° verticale. Fotocamera USB 2MP standard (modulo 1080P zoom/fisso opzionale) per riconoscimento volto/colore/codice QR e tracking in tempo reale.

**Caratteristiche principali**:

- 2 gradi di libertà (180° orizzontale / 90° verticale)
- Servo bus SCS0009: coppia 2.5kg.cm, precisione 0.293°, feedback in tempo reale
- Protezioni stallo/sovratemperatura/tensione + scheda driver regolatore TVS
- Fotocamera 2MP, zoom 30FPS / fisso 60FPS
- Design chiuso con cavi nascosti

## Specifiche

| Categoria | Specifica |
|------|------|
| Servo | FEETECH SCS0009 × 2 |
| Range di rotazione | 180° orizzontale, 90° verticale |
| Fotocamera | USB 2MP plug-and-play (zoom/fisso opzionale) |
| Visione | Tracking volto/colore/codice QR |
| Host | Raspberry Pi, Jetson, RDK |

## Avvio rapido
```bash
# Collega la scheda di controllo via USB, la telecamera è plug-and-play
# Controlla il gimbal con l'SDK Python
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```
## Tutorial

- [Tutorial fotocamera pan-tilt 2 DOF](/it/tutorials/accessories/2dof-camera-gimbal)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
