---
title: Unidad pan-tilt de servo de 2 GDL
description: Unidad pan-tilt de Juxi Technology — servos de bus SCS0009, 180° horizontal / 90° vertical, cámara 2MP, seguimiento con visión IA
keywords: [gimbal, pan-tilt, 2dof, seguimiento visual, scs0009]
---

# Unidad pan-tilt de servo de 2 GDL

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**

## Descripción general

La unidad pan-tilt de servo 2 GDL usa servos de bus serie SCS0009 de alta precisión para 180° horizontal / 90° vertical. Incluye cámara USB 2MP estándar (módulo 1080P zoom/fijo opcional) para reconocimiento de rostro/color/código QR y seguimiento en tiempo real.

**Características clave**:

- 2 grados de libertad (180° horizontal / 90° vertical)
- Servos de bus SCS0009: par 2.5kg.cm, precisión 0.293°, retroalimentación en tiempo real
- Protección bloqueo/sobrecalentamiento/tensión + placa driver regulador TVS
- Cámara 2MP, zoom 30FPS / fijo 60FPS
- Diseño cerrado con cables ocultos

## Especificaciones

| Categoría | Especificación |
|------|------|
| Servos | FEETECH SCS0009 × 2 |
| Rango de giro | 180° horizontal, 90° vertical |
| Cámara | USB 2MP plug-and-play (zoom/fijo opcional) |
| Visión | Seguimiento rostro/color/código QR |
| Hosts | Raspberry Pi, Jetson, RDK |

## Inicio rápido
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
## Tutoriales

- [Tutorial de cámara pan-tilt 2 GDL](/es/tutorials/accessories/2dof-camera-gimbal)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
