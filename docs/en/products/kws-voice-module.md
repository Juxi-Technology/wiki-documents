---
title: KWS Voice Interaction Module
description: Juxi Technology KWS voice recognition module — CN/EN wake word recognition, UART, RViz2 visualization, Jetson/Raspberry Pi
keywords: [kws, voice recognition, wake word, ai voice]
---

# KWS Voice Interaction Module

> **[Buy in Store](https://www.juxitech.com/products/ai-voice-recognition-module)**

## Overview

KWS (Keyword Spotting) voice interaction module supports Chinese/English recognition-word firmware flash. Communicates via serial with hosts like Jetson and Raspberry Pi, with ROS2 RViz2 visualization.

**Key features**:

- CN/EN recognition-word firmware (download & burn)
- Serial communication (PC/Jetson/Pi/Jetson Nano)
- ROS2 + RViz2 visualization
- Open-source repo with Python serial examples
- 100% offline recognition, no internet needed (privacy + low latency)
- >95% accuracy in normal environments, response within 300ms
- Up to 100 custom voice commands, customizable wake words
- Low power: average current <50mA

## Specifications

| Category | Spec |
|----------|------|
| Interface | Serial (UART) |
| Recognition | CN/EN wake words |
| Platforms | Jetson, Nano, Raspberry Pi, PC |
| Visualization | ROS2 RViz2 |
| Firmware | Open-source burning tool |

## Quick Start

```bash
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition: {data}")
```

## Tutorials

- [KWS Speech Recognition Series](/en/tutorials/accessories/KWS-speech-recognition-module/)
- [Firmware Download & Burn](/en/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2 Visualization](/en/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
