---
title: ESP32-S3 WiFi Video Module
description: Juxi Technology ESP32-S3 WiFi video module — 2MP camera, real-time WiFi streaming, AI vision (color/face/QR), AP+STA dual mode
keywords: [esp32, wifi, camera, video, ai vision]
---

# ESP32-S3 WiFi Video Module

> **[Buy in Store](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

## Overview

A compact, cost-effective AI vision solution with a dual-board modular architecture (core processing board + communication expansion board). The core board features the **ESP32-S3** processor and a 2MP HD camera, supporting WiFi video streaming, face recognition, and color recognition — preinstalled firmware works out of the box.

**Key features**:

- 2MP HD camera (1600×1200@30FPS)
- **AP + STA dual-mode** WiFi real-time streaming
- AI vision: color threshold segmentation + lightweight CNN (color/face/QR)
- Type-C one-click firmware upgrade
- Standard PH2.0 I2C / UART interfaces

---

## Specifications

| Category | Spec |
|----------|------|
| MCU | ESP32-S3 (Espressif official, dual-core) |
| Camera | 2MP CMOS (1600×1200@30FPS) |
| FOV | Diagonal 68°, horizontal 49.5° |
| Wireless | WiFi (dual-mode BT) AP/STA + high-gain antenna |
| Interface | Type-C / I2C / UART (PH2.0) |
| Buttons | Reset + programmable custom key |
| Recognition | Color, face, QR code |

## Quick Start

### 1. Power On

Preinstalled firmware — the module creates its own WiFi hotspot on power-up:

- Connect phone/PC to the module's hotspot
- Open the provided page/App for live video

### 2. Two Modes

| Mode | Description |
|------|-------------|
| **AP mode** | Module creates its own hotspot, terminals connect directly |
| **STA mode** | Module joins an existing WiFi router, same network as terminals |

### 3. Host Connection

**UART** (Raspberry Pi / Jetson Orin):

```
ESP32 RX → Host TX
ESP32 TX → Host RX
```

**I2C**: standard PH2.0 I2C — outputs face/color detection **coordinate data**.

### 4. Development

Type-C to PC for one-click firmware upgrade; switch recognition targets via UART/I2C commands.

---

## Applications

- Wireless video streaming (AP/STA)
- AI vision development (color/face/QR)
- IoT AIoT projects
- Robot vision expansion

---

## FAQ

**Q: How to watch live video?**

The module creates an AP hotspot — connect and open the provided page/App.

**Q: What recognition is supported?**

Color threshold segmentation + lightweight CNN: color, face, QR code, switchable via commands.

**Q: Can it return detection coordinates?**

Yes — via I2C/UART interfaces for secondary development.

**Q: How to update firmware?**

Type-C to PC, one-click upgrade.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
