---
title: AmazingHand Open-Source Dexterous Hand
description: Juxi Technology AmazingHand open-source bionic hand — 5-finger multi-joint, TTL bus control, open CAD, embodied AI & HRI research
keywords: [amazinghand, dexterous hand, embodied ai]
---

# AmazingHand Open-Source Dexterous Hand

> **[Buy in Store](https://www.juxitech.com/products/amazinghand)**

## Overview

AmazingHand is Juxi Technology's open-source bionic dexterous hand with 5-finger multi-joint design and TTL serial bus control. Open CAD files allow custom finger designs for dexterous manipulation, grasping strategy, and HRI research.

**Key features**:

- 5-finger multi-joint, human-like proportions
- TTL serial bus control, mainstream controller compatible
- Open CAD/source, customizable
- Pairs with SO-ARM101 for full manipulation platforms
- Real-time hand tracking: track gestures via webcam and control the hand live
- Simulation demos: run hand-tracking demos without hardware (dora-rs ecosystem)
- Individual finger angle control; single (left/right) or dual-hand
- Power: 5V3A servo driver board, USB connection to host

## Specifications

| Category | Spec |
|----------|------|
| Type | 5-finger multi-joint dexterous hand |
| Control | TTL serial bus |
| Ecosystem | Python SDK, ROS |
| Open-source | CAD/source on GitHub |

## Quick Start

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

## Tutorials

- [AmazingHand Interface Control](/en/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [AmazingHand Official Example](/en/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [AmazingHand TTL Debugging](/en/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
