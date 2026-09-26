---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Frequently asked questions about the NVIDIA Jetson AGX Orin Developer Kit
  (64GB) — what's in the box, setup, display and power, software, and support.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# FAQ

## Setup

**What's in the box?**
Jetson AGX Orin module and reference carrier board, Wi-Fi module, USB Type-C
power supply, and a USB Type-C to USB Type-A cable. You supply the monitor
(DisplayPort), keyboard/mouse, and optionally an Ethernet cable — see
[Quick Start](/tutorials/jetson-agx-orin/quick-start).

**Does the kit come with an operating system?**
Yes — the eMMC is pre-flashed and the kit boots straight into the Ubuntu
desktop. Units may ship with an older L4T version; the recommended update path
is the Jetson ISO (no host PC required). See
[Quick Start](/tutorials/jetson-agx-orin/quick-start).

**Do I need a separate PC to set it up?**
No, not for the recommended path — the Jetson ISO installs from a USB stick.
A host PC (Ubuntu) is only needed for the alternative install methods
(SDK Manager / flash script) or for headless first-time setup. See
[Flashing & Updates](/tutorials/jetson-agx-orin/flashing-and-updates).

**Which software version is current?**
JetPack **7.2.1** (Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.2,
TensorRT 10.16.2). Check what your kit runs with
[Verify Your System](/tutorials/jetson-agx-orin/verify-your-system).

## Display & power

**Can I connect my HDMI monitor?**
Only through an **active** DisplayPort→HDMI adapter or cable — the kit has a
DisplayPort output only (no HDMI port, no DP-over-USB-C). MST is supported for
up to two displays. Details: [Interfaces & Hardware Layout](/tutorials/jetson-agx-orin/interfaces).

**How do I power the kit?**
Use the included USB-C power supply in the USB-C port above the DC jack (J24).
If you supply your own power through the barrel jack (J41): 5.5 mm OD,
2.5 mm ID, center positive.

## Using the kit

**Can this developer kit emulate other Jetson modules?**
Yes. The developer kit shares the SoC architecture with all Jetson Orin modules
and can be re-flashed to emulate AGX Orin, Orin NX, or Orin Nano performance
and power characteristics. It ships configured for the AGX Orin series.

**Is this the module I would use in a production product?**
No. Production products are built on Jetson Orin **modules** (64 GB / 32 GB /
Industrial) on your own or a partner carrier board. The developer kit is the
development and prototyping vehicle.

**Can it run large language models / agentic AI?**
Yes — that is a core use case of the Orin platform. With JetPack 7.2, NVIDIA
NemoClaw is installable with a single command on developer kits for local and
cloud model orchestration, and the [Jetson AI Lab](https://www.jetson-ai-lab.com)
publishes hands-on tutorials.

**For robotics: is Isaac ROS available on JetPack 7.2?**
Yes — Isaac ROS has supported Jetson Orin on JetPack 7.2 since release
**4.6.0** (2026-08-18), with an official AGX Orin setup walkthrough. Note that
NVIDIA's JetPack downloads page still shows "coming soon": Isaac ROS is
released independently of JetPack, so its own release notes are the operative
source. For the version and ROS 2 distribution choice (4.6.x = Jazzy,
5.0 = Lyrical) and the known constraints, see
[Robotics on JetPack 7.2](/tutorials/jetson-agx-orin/robotics).

## Support & service

**Where can I get technical help?**
- Platform questions: [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — search first; include your `cat /etc/nv_tegra_release` output.
- Juxi Technology technical support: **support@juxitech.com**
- Order, warranty, and RMA: **support@juxitech.com** (to speed things up, include your order number)
- Sales and quotations: **sales@juxitech.com**
- Product questions (selection, compatibility): **pe@juxitech.com**

**Where can I get accessories (NVMe storage, cameras, power)?**
Browse the Juxi Technology product catalog at **<https://wiki.juxitech.com/products/>** —
it includes Jetson-relevant accessories such as the
[IMX219 CSI camera](https://wiki.juxitech.com/products/imx219-csi-camera)
(built for NVIDIA Jetson), USB auto-focus cameras, and
[RealSense depth cameras](https://wiki.juxitech.com/products/realsense-depth-camera).
For advice, contact sales@juxitech.com.

## Sources

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (checked 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-23)

*Status: draft, pending review by cheny.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
