---
title: Jetson Orin NX Super Developer Kit
description: Juxi Technology NVIDIA Jetson Orin NX SUPER dev kit — 117/157 TOPS edge AI platform, preinstalled Ubuntu 22.04 & 256GB NVMe SSD
keywords: [jetson, orin nx, edge ai, edge computing, leRobot, robotics]
---

# Jetson Orin NX Super Developer Kit

> **[Buy in Store](https://www.juxitech.com/products/nvidia-jetson-orin-nx-super-developer-kit)**

## Overview

The NVIDIA Jetson Orin NX SUPER Developer Kit is a high-performance edge AI computing platform built for advanced robotics developers, generative AI researchers, and embedded systems engineers. Powered by the Jetson Orin NX SUPER module, it delivers up to **117 TOPS (8GB) / 157 TOPS (16GB)** of AI performance — 234x / 314x faster than the original Jetson Nano.

Ready to use out of the box:

- Preinstalled **Ubuntu 22.04**
- **256GB NVMe PCIe 3.0 x4 SSD** (up to 2800MB/s read)
- Dual-band 2.4G/5G WiFi 5 + Bluetooth 5.0 (4dBi high-gain antennas)
- PWM ball-bearing fan (50,000-hour lifespan)
- Acrylic enclosure with camera mount holes

**Use cases**: LLM edge deployment, advanced computer vision, LeRobot SO-ARM robotics development.

---

## Specifications

| Category | Spec |
|----------|------|
| Core Module | NVIDIA Jetson Orin NX SUPER |
| AI Performance | 117 TOPS (8GB) / 157 TOPS (16GB) |
| CPU | 6-core NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere, 1792 CUDA cores + 56 Tensor cores + 2 NVDLA engines |
| Memory | 8GB / 16GB LPDDR5 (102.4 GB/s) |
| Storage | 256GB NVMe PCIe 3.0 x4 SSD (up to 2800MB/s) |
| Wireless | Dual-band 2.4G/5G WiFi 5 + BT 5.0, 4dBi dual antennas |
| Cooling | PWM ball-bearing fan (50,000 hrs) + aluminum heatsink |
| Display | DP 1.4, up to 4K@60Hz (H.265) |
| I/O | 4× USB 3.2, DP 4K60Hz, 40-pin GPIO header |
| OS | Preinstalled Ubuntu 22.04 |

## Getting Started

### Quick Start

1. Connect the power adapter (19V 40W)
2. Connect a monitor via DP-to-HDMI cable
3. Connect keyboard and mouse (USB 3.2)
4. Boot into preinstalled Ubuntu 22.04

### Camera Mounting

The acrylic enclosure has camera mount holes supporting dual cameras (CSI / USB).

---

## Software Setup

### Verify PyTorch GPU

```python
import torch
print(torch.cuda.is_available())  # should print True
```

### Install LeRobot (for SO-ARM100/101)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### References

- [PyTorch Compatibility Issues on Jetson Orin](/en/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [SO-ARM101 Tutorial](/en/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

---

## Kit Variants

| Kit Type | Included Add-ons | Use Case |
|----------|-----------------|----------|
| **Standard** | Board + enclosure + 256GB SSD + WiFi/BT + antennas + 19V 40W PSU + DP-to-HDMI + Type-C + screwdriver | General high-performance AI dev |
| **OLED Display Kit** | + 0.91" OLED status display | Real-time system monitoring |
| **USB Audio Kit** | + USB sound card (speaker + mic, noise/echo cancellation) | Voice interaction, LLM voice assistant |
| **IMX219 Camera Kit** | + IMX219 CSI camera (77° FOV, 8MP) + adjustable mount | Native CSI vision |
| **Auto-Focus Camera Kit** | + 86° auto-focus USB camera (1080P) + adjustable mount | General vision, robot arm |
| **SO-ARM100/101 Robot Kit** | + USB 3.0 HUB + auto-focus camera + dedicated mounts | Robot arm vision |

## Version Comparison

| Version | AI Performance | Recommended For |
|---------|---------------|-----------------|
| **8GB** | 117 TOPS | Advanced AI dev, mid-range robotics, LLM edge deployment |
| **16GB** | 157 TOPS | High-performance embodied AI, large model edge inference, complex vision |

---

## FAQ

**Q: How much faster than standard Orin NX?**
1.7x faster (SUPER optimization).

**Q: Do I need to install the OS myself?**
No. Ubuntu 22.04 and 256GB SSD come preconfigured — power on and develop.

**Q: Does it support SO-ARM101?**
Fully compatible, with dedicated robot vision kits (camera + mounts) and seamless LeRobot integration.

**Q: How noisy is the fan?**
PWM ball-bearing fan is stable and quiet even at 40W full load, with 50,000-hour lifespan (10x more durable than hydraulic fans).

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
