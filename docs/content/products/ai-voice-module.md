---
title: AI Voice Interaction Module
category: accessory
description: Juxi Technology AI Voice Interaction Module (CI1302) — 110+ offline voice commands, 99% recognition within 5 m, custom Chinese/English command words, serial/IIC communication, works with Arduino/Jetson/RDK/Raspberry Pi/PC
keywords: [ai voice, voice interaction module, ci1302, offline speech recognition, wake word, command words, serial, iic, ros1, ros2]
---

# AI Voice Interaction Module

> **[Buy on Taobao](https://item.taobao.com/item.htm?id=1055967142978)**

## Overview

The AI Voice Interaction Module is built around QINYITECHNOLOGY's **CI1302** high-performance neural-network voice chip with the BNPU V3 neural processor, delivering offline far-field speech recognition. An on-board **STC8H coprocessor** converts recognition results into serial or IIC data, which keeps host-controller integration simple. All recognition runs locally on the module — no network connection is required.

**Key features:**

- 100% offline speech recognition, no internet needed (privacy + low latency)
- **110+ voice commands** pre-loaded at the factory; custom Chinese and English command words supported (up to ~120 entries)
- Wake word “你好，小犀”; automatic sleep after 15 seconds without a command, wake it again to continue
- Built-in high-fidelity speaker and high-performance microphone with noise reduction and echo cancellation; up to 99% recognition within 5 m
- On-board STC8H coprocessor — recognition results output as serial / IIC data
- Active and passive announcement modes
- ROS1 / ROS2 SDK, plus Arduino / Jetson / RDK / Raspberry Pi / PC communication tutorials

---

## Specifications

| Category | Specification |
|------|------|
| Voice chip | QINYITECHNOLOGY CI1302 (BNPU V3 neural processor, up to 220 MHz) |
| Memory | 640 KB SRAM + 2 MB Flash |
| Voice commands | 110+ pre-loaded; custom Chinese/English command words, up to ~120 entries |
| Wake-up | Wake word “你好，小犀” (customizable) |
| Recognition distance | Within 5 m (quiet environment, up to 99% accuracy) |
| Audio | Built-in high-fidelity speaker + high-performance microphone (noise reduction + echo cancellation) |
| Interfaces | Serial / IIC / Type-C (on-board STC8H coprocessor) |
| Power | 5V (Type-C) |
| Supported hosts | Arduino, Jetson, RDK, Raspberry Pi, PC (STM32 / ESP32 / MSPM0 and other MCUs) |
| Software | ROS1 / ROS2 SDK, firmware flashing tool, web tool for custom command words |

---

## Quick Start

The voice recognition firmware is pre-flashed at the factory, so the module works out of the box:

1. Power the module with a Type-C cable (5V)
2. Say the wake word “你好，小犀” — once the module replies “我在” (I'm here), give a command such as “小车前进” (cart forward)
3. If no command is recognized within 15 seconds, the module announces “我去休息了” (I'm going to rest) and goes to sleep; say the wake word again to resume

To add more command words, edit the command list in the web tool to generate new firmware, then flash it to the module from a PC. See [Firmware Flashing](/tutorials/accessories/ai-voice-module/Firmware-Flashing) and [Custom Protocol Entries](/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries).

---

## Tutorials

- [Quick Start — unboxing, wake word and announcements](/tutorials/accessories/ai-voice-module/Quick-Start)
- [Product Info — features, working principle, precautions and hardware interfaces](/tutorials/accessories/ai-voice-module/Product-Info)
- [Firmware Flashing](/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [Editing the Wake Word and Command Words](/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [Creating Custom Protocol Entries](/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [ROS1 Voice Interaction](/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [ROS2 Voice Interaction](/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [Serial Protocol](/tutorials/accessories/ai-voice-module/Serial-Protocol) / [IIC Protocol](/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [PC Communication](/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [Serial Communication](/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [IIC Communication](/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [Serial Communication](/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [IIC Communication](/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [Serial Communication](/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [IIC Communication](/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [Serial Communication](/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [IIC Communication](/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## Applications

- Robot voice interaction and command control (e.g. “cart forward”, “stop”)
- Smart home voice control (lighting, appliances)
- Educational and toy voice products
- Voice control for industrial equipment
- DIY voice interaction projects

---

## FAQ

**Q: Does it need an internet connection?**

**A:** No. The CI1302 is an offline voice chip — recognition runs locally on the module.

**Q: Does it work out of the box?**

**A:** Yes. The voice recognition firmware is pre-flashed, so it works as soon as it is powered over Type-C. Re-flashing is only needed when you add custom command words.

**Q: Can it recognize English?**

**A:** Yes. Both Chinese and English command words are supported; generate the firmware with the web tool and flash it to the module.

**Q: How does it talk to a host controller?**

**A:** The on-board STC8H coprocessor converts recognition results into serial or IIC data. Communication tutorials cover Arduino, Jetson, RDK, Raspberry Pi and PC, and ROS1 / ROS2 SDKs are provided.

**Q: What is the recognition distance?**

**A:** Up to 99% recognition within 5 m in a quiet environment; noisy surroundings will degrade accuracy.

---

## Precautions

- Power the module with 5V — voltages above 5V will damage it
- Use it in a quiet environment; background noise reduces recognition accuracy
- Speak loudly at a moderate pace and stay within 5 m of the module

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Issue tracker](https://github.com/Juxi-Technology/wiki-documents/issues)
