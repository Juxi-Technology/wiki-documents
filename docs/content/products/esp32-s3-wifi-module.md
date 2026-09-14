---
title: ESP32-S3 WiFi Video Module
category: compute-vision
description: Juxi Technology ESP32-S3 WiFi video module — 2MP camera, real-time WiFi streaming, AI vision (color/face/QR), AP+STA dual mode
keywords: [esp32, wifi, camera, video, ai vision]
---

# ESP32-S3 WiFi Video Module

> **[Buy in Store](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

## Overview

The ESP32-S3 WiFi video module (model **ESP32-NanoCam**) is a compact, cost-effective AI vision solution with a dual-board modular architecture (core processing board + communication expansion board). The core board features the **ESP32-S3** processor and a 2MP HD camera, supporting WiFi video streaming, AI vision recognition, and voice interaction — preinstalled firmware works out of the box.

**Key features**:

- 2MP HD camera (1600×1200@30FPS)
- **AP + STA dual-mode** WiFi real-time streaming
- 8 AI modes: cat face detection, face detection, color recognition, face recognition, QR code scanning, LLM voice chat (XiaoZhi AI), ESP-Claw voice control
- Onboard ES8311 audio (microphone + speaker), supporting voice interaction
- WS2812 RGB status LED
- Type-C one-click firmware upgrade
- Standard PH2.0 I2C / UART interfaces

---

## Specifications

| Category | Spec |
|----------|------|
| MCU | ESP32-S3 N16R8 (Espressif official, dual-core 240MHz) |
| Storage | 16MB Flash + 8MB PSRAM |
| Camera | 2MP CMOS GC2145 (1600×1200@30FPS) |
| FOV | Diagonal 68°, horizontal 49.5° |
| Audio | ES8311 codec + MEMS microphone + class-D amplifier speaker |
| Status LED | WS2812 RGB |
| Wireless | WiFi (dual-mode BT) AP/STA + high-gain antenna |
| Interface | Type-C / I2C / UART (PH2.0) |
| Buttons | Reset + BOOT key |
| Recognition | Cat face, face detection, face recognition, color, QR code, voice chat |

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

Type-C to PC for one-click firmware upgrade; switch AI modes via serial commands (cat face / face detection / color / face recognition / QR code / voice chat). See the complete command reference in the [Serial Protocol Manual](/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol).

---

## Complete Tutorials

- [Quick Start — flash the firmware, connect WiFi and view the live video in 3 minutes](/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
- [Hardware Spec — complete GPIO pin mapping and power design](/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
- [Serial Protocol Manual — complete AT commands for WiFi configuration and AI modes](/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
- [AI Vision Tutorial — 11-chapter progressive hands-on course (face / cat face / color / QR code / voice)](/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
- [ESP32-NanoCam as an SO-ARM101 wireless follower-arm controller](/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)

---

## Applications

- Wireless video streaming (AP/STA)
- AI vision development (color/face/QR)
- IoT AIoT projects
- Robot vision expansion

---

## FAQ

**Q: How to watch live video?**

**A:** The module creates an AP hotspot — connect and open the provided page/App.

**Q: What recognition is supported?**

**A:** Color threshold segmentation + lightweight CNN: color, face, QR code, switchable via commands.

**Q: Can it return detection coordinates?**

**A:** Yes — via I2C/UART interfaces for secondary development.

**Q: How to update firmware?**

**A:** Type-C to PC, one-click upgrade.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
