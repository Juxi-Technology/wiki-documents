---
title: 2-DOF Servo Pan-Tilt Unit
description: Juxi Technology 2-DOF camera gimbal — SCS0009 bus servos, 180° pan / 90° tilt, 2MP camera, AI vision tracking
keywords: [gimbal, pan tilt, 2dof, vision tracking, scs0009]
---

# 2-DOF Servo Pan-Tilt Unit

> **[Buy in Store](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

## Overview

The 2-DOF servo gimbal uses high-precision SCS0009 serial bus servos with horizontal 180° / vertical 90° motion. Comes with a 2MP HD USB camera (optional 1080P zoom/fixed modules) supporting face, color, and QR detection with real-time tracking.

**Key features**:

- 2 DOF (pan 180° / tilt 90°)
- SCS0009 bus servos: 2.5kg.cm, 0.293° precision, real-time feedback
- Stall/over-temp/voltage protection + TVS driver board
- 2MP camera, optional zoom 30FPS / fixed 60FPS
- Hidden wiring design

## Specifications

| Category | Spec |
|----------|------|
| Servos | FEETECH SCS0009 × 2 |
| Range | Pan 180°, tilt 90° |
| Camera | 2MP USB plug-and-play (zoom/fixed options) |
| Vision | Face/color/QR detection & tracking |
| Hosts | Raspberry Pi, Jetson, RDK |

## Quick Start

```bash
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```

## Tutorials

- [2-DOF Camera Gimbal Tutorial](/tutorials/accessories/2dof-camera-gimbal)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
