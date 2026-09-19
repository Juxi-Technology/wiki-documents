---
title: 2-DOF-Servo-Pan-Tilt-Einheit
category: accessory
description: "Juxi Technology 2-DOF-Servo-Pan-Tilt — SCS0009-Bus-Servos, 180° horizontal / 90° vertikal, 2MP-Kamera, KI-Vision-Tracking"
keywords: [gimbal, pan-tilt, 2dof, vision-tracking, scs0009]
---

# 2-DOF-Servo-Pan-Tilt-Einheit

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**

## Produktübersicht

Die 2-DOF-Servo-Pan-Tilt-Einheit nutzt hochpräzise SCS0009-Serienbus-Servos für 180° horizontal / 90° vertikal. Standardmäßig mit 2MP-USB-Kamera (1080P Zoom/Fixfokus optional) für Gesichts-, Farb- und QR-Code-Erkennung mit Echtzeit-Tracking.

**Kernfunktionen**:

- 2 Freiheitsgrade (180° horizontal / 90° vertikal)
- SCS0009-Bus-Servos: 2.5kg.cm Drehmoment, 0.293° Präzision, Echtzeit-Feedback
- Blockier-/Übertemperatur-/Spannungsschutz + TVS-Regler-Treiberplatine
- 2MP-Kamera, Zoom 30FPS / Fixfokus 60FPS
- Geschlossenes, Kabel verdeckendes Design

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Servos | FEETECH SCS0009 × 2 |
| Drehbereich | Horizontal 180°, vertikal 90° |
| Kamera | 2MP USB Plug-and-Play (Zoom/Fixfokus optional) |
| Vision | Gesicht/Farbe/QR-Code-Tracking |
| Hosts | Raspberry Pi, Jetson, RDK |

## Schnellstart
```bash
# USB mit dem Hauptcontroller verbinden, Kamera ist sofort einsatzbereit
# Gimbal-Steuerung über das Python SDK
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```
## Verwandte Tutorials

- [2-DOF-Kamera-Pan-Tilt-Tutorial](/de/tutorials/accessories/2dof-camera-gimbal)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
