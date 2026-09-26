---
title: Downloads & Official Links
sidebar_label: Downloads
slug: /downloads
description: >-
  Direct links to the official JetPack 7.2.1 / Jetson Linux 39.2.1 resources for
  the Jetson AGX Orin Developer Kit — images, tools, documentation, and
  community resources.
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: component table lags on some rows (VPI/PVA still show 7.2 values) — see the caveat in the body
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: authoritative source for installed component versions
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
review_owner: cheny
---

# Downloads & Official Links

Everything on this page links to **NVIDIA-official resources** and was checked
on **2026-09-23** (a component-version caveat was added 2026-09-26). For
updates, treat the first two links as the canonical starting points.

## JetPack 7.2.1 / Jetson Linux 39.2.1

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) — **canonical hub** for release info and downloads. ⚠️ **Its component table lags row by row**: as of 2026-09-26 it still carries JetPack **7.2** values for VPI and PVA, and its Isaac ROS row still reads "coming soon" (released since 4.6.0). For the versions a JetPack 7.2.1 system actually installs, use NVIDIA's [Jetson apt repository](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — see [Verify Your System](/tutorials/jetson-agx-orin/verify-your-system).
- [JetPack ISO image (r39.2.1)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso) — the USB installation image used in our [Quick Start](/tutorials/jetson-agx-orin/quick-start)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) — host-PC flashing tool
- [Yocto images for Jetson AGX Orin](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/yocto2) — official Yocto/OpenEmbedded recipes and images
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive) — older releases

## Documentation

- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) — the primary reference for this kit
  - [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — what's new and **known issues**
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) — flashing support, security, camera development, OTA
- [Jetson Linux API Reference](https://docs.nvidia.com/jetson/archives/ApiReference/index.html)
- [Camera Development Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide/SD/CameraDevelopment.html)
- Carrier board specification: *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* — listed on NVIDIA's [downloads page](https://developer.nvidia.com/embedded/downloads)

## Tools & accounts

- [Balena Etcher](https://etcher.balena.io) — writes the Jetson ISO to a USB drive (Windows / macOS / Linux)
- [NVIDIA Developer Program](https://developer.nvidia.com/developer-program) — membership (free) required to download SDK Manager
- [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — official community support

## Learning & agentic AI (JetPack 7)

- [Jetson AI Lab](https://www.jetson-ai-lab.com) — hands-on tutorials for running AI models on Jetson
- [NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) — agentic AI on Jetson; single-command install supported since JetPack 7.2
- [Jetson Device-side Skills](https://github.com/jetson-device-skills) · [Jetson BSP Skills](https://github.com/jetson-bsp-skills) — reusable agent skills from NVIDIA

## Juxi Technology

- **Product catalog & accessories:** <https://wiki.juxitech.com/products/> — add-ons for your kit (cameras, robot arms, sensors, and more), with specs and buying links
- **Contacts:** technical support — support@juxitech.com · sales — sales@juxitech.com · product questions — pe@juxitech.com
- Getting-started scripts and example code from Juxi will be added here as they become available.

## Sources

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-23; component table caveat 2026-09-26)
- [NVIDIA Jetson apt repository — Packages index](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — authoritative for installed component versions (checked 2026-09-26)

*Status: draft, pending review by cheny.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
