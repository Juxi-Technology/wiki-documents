---
title: Jetson Orin Nano Super Developer Kit (8GB)
category: compute-vision
description: NVIDIA Jetson Orin Nano Super Developer Kit (8GB) — up to 67 INT8 TOPS of edge AI, 8 GB unified memory, microSD and NVMe storage options, with complete JetPack 7.2.1 documentation from Juxi Technology.
keywords: [jetson, orin nano, edge ai, jetpack, nvidia, robotics]
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Jetson Orin Nano Super Developer Kit (8GB)

> **[Buy in Store](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)**

## Overview

The NVIDIA® Jetson Orin Nano™ Super Developer Kit is the compact developer kit
of the Jetson Orin family — a small AI computer for building computer-vision,
robotics and generative-AI projects at the edge. Juxi Technology sells the
official NVIDIA kit in its original box, with a complete documentation series
for the JetPack 7.2.1 / L4T r39.2.1 software baseline.

Highlights:

- **Up to 67 INT8 TOPS** of AI performance (sparse; 33 dense) and up to **1.7x generative-AI improvement** over the original kit *(NVIDIA)*
- **8 GB 128-bit LPDDR5 memory at 102 GB/s** *(NVIDIA)* — unified memory shared by the CPU, GPU and all applications; 8 GB is the hard ceiling for every workload
- **1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores** and a 6-core Arm Cortex-A78AE CPU up to 1.7 GHz *(NVIDIA)*
- **"Super" is a software upgrade, not new silicon** — existing Orin Nano Developer Kits get the higher GPU, memory and CPU clocks by updating JetPack *(NVIDIA)*
- **Configurable 7 W to 25 W power** *(NVIDIA)* — the default power mode is 25 W
- **No eMMC and no storage from NVIDIA** — the microSD slot is on the **underside of the module**, plus two M.2 Key-M slots for NVMe SSDs *(NVIDIA)*; the Juxi bundle adds a 64 GB microSD card
- **Current software: JetPack 7.2.1** (Jetson Linux / L4T r39.2.1) *(NVIDIA)* — installed with the Jetson ISO method from a USB drive; no separate Ubuntu host PC required
- **Official original box, sold by Juxi Technology** — the bundle adds a 19 V power adapter, a power cable, a 64 GB microSD card and the M.2 Wi-Fi module

**Use cases**: small local LLMs and generative AI, DeepStream video analytics,
robotics and ROS 2 development, education and prototyping.

## Specifications

| Category | Spec |
|---|---|
| Kit | NVIDIA Jetson Orin Nano Super Developer Kit — P3767 module + P3768 carrier board; complete kit part number P3766 *(NVIDIA)* |
| AI Performance | Up to 67 INT8 TOPS (sparse) / 33 INT8 TOPS (dense); up to 1.7x generative-AI improvement over the original kit *(NVIDIA)* |
| GPU | NVIDIA Ampere architecture, 1024 CUDA cores + 32 Tensor Cores; up to 1,020 MHz *(NVIDIA)* |
| CPU | 6-core Arm Cortex-A78AE v8.2 64-bit; up to 1.7 GHz; 1.5 MB L2 + 4 MB L3 cache *(NVIDIA)* |
| Memory | 8 GB 128-bit LPDDR5, 102 GB/s *(NVIDIA)* — shared between CPU, GPU and applications |
| Storage | No eMMC. microSD card slot on the underside of the module (main storage) + 2x M.2 Key-M NVMe slots: 2280 (PCIe 3.0 x4) and 2230 (PCIe 3.0 x2) *(NVIDIA)* |
| Video | Decode up to 1x 4K60 (H.265), 2x 4K30, 5x 1080p60 or 11x 1080p30; encode 1080p30 using 1-2 CPU cores (no dedicated hardware encoder) *(NVIDIA)* |
| Display | 1x DisplayPort 1.2 (+MST) — the only display output; the USB-C port does not output a display signal *(NVIDIA)*. Store listing: "DP 1.2, up to 4K@60Hz" — NVIDIA's fetched pages do not state a maximum display resolution |
| Networking | 1x Gigabit Ethernet (RJ45) *(NVIDIA)*; included M.2 Key-E wireless module, described by NVIDIA as an "802.11ac/ab/gn wireless network interface controller" *(NVIDIA)*. Store listing: dual-band 2.4/5 GHz Wi-Fi 5 + Bluetooth 5.0 (NVIDIA's pages do not state a Bluetooth version — treat Bluetooth 5.0 as unverified) |
| I/O | 4x USB 3.2 Type-A (10 Gbps, on two dual-stacked connectors), 1x USB-C (data only; Host, Device and USB Recovery modes), 40-pin header (UART, SPI, I2S, I2C, GPIO), 12-pin button header, 4-pin fan header, DC power jack (5.5 mm x 2.5 mm) *(NVIDIA)* |
| Camera | 2x MIPI CSI connectors (22-position, 0.5 mm pitch, bottom-contact): CAM0 1x2 lanes; CAM1 1x2 or 1x4 lanes *(NVIDIA)* |
| Power | Configurable 7 W – 25 W *(NVIDIA)*. Default mode: 25 W. MAXN SUPER is experimental and available only when the kit is flashed with the `jetson-orin-nano-devkit-super` or `jetson-orin-nano-devkit-super-maxn` configuration *(NVIDIA)* |
| Dimensions | NVIDIA datasheet: 103 x 90.5 x 34.77 mm; NVIDIA family specification table: 100 x 79 x 21 mm (both definitions: height includes feet, carrier board, module and thermal solution). NVIDIA has not reconciled the two figures; the store lists 100 x 79 x 21 mm |
| Software | Current release: JetPack 7.2.1, including Jetson Linux (L4T) r39.2.1, installed with the Jetson ISO method *(NVIDIA)* |
| In the box (Juxi store bundle) | NVIDIA Jetson Orin Nano Super Developer Kit x1 (official original box); 19 V power adapter x1; Type B (US, JP, CA, PH) power cable x1; 64 GB microSD card x1; M.2 Wi-Fi module x1 |
| In the box (NVIDIA) | Developer kit (Orin Nano 8GB module with heat sink + reference carrier board), 19 V power supply, 802.11ac/ab/gn wireless network interface controller, Quick Start Guide *(NVIDIA)*. No removable storage: "Jetson Orin Nano Developer Kit does not include removable storage in the box" *(NVIDIA)* |
| Warranty | 1 year, for development use only (store listing) |

*Full specifications: see NVIDIA's official data sheet for the kit (linked from
nvidia.com).*

> **Juxi note:** Where the store listing and NVIDIA's official figures differ,
> this page uses NVIDIA's figure and notes the difference. Items the store
> lists that NVIDIA's pages do not confirm: Bluetooth 5.0 and 4K@60Hz display
> output. The bundled 64 GB microSD card arrives **not pre-imaged** (blank);
> NVIDIA recommends a 64 GB UHS-1 or larger card. Plan
> for a full JetPack install — see Getting Started below.

## Getting Started

1. **Check the firmware version first.** JetPack 7.2.1 requires
   JetPack 6.x-generation Jetson UEFI/QSPI firmware (version newer than 36.0).
   If your kit has older factory firmware, run the JetPack 6.x update path
   before installing — see [Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates).
2. **Gather what you must provide**: a PC or laptop (Windows, macOS or Linux)
   with at least 25 GB free space; a USB flash drive of 16 GB or larger; and a
   DisplayPort monitor with USB keyboard and mouse, or a USB-TTL serial cable
   for headless setup.
3. **Choose your storage**: the bundled 64 GB microSD card (insert it into the
   slot on the underside of the module before booting) or your own NVMe SSD in
   an M.2 Key-M slot.
4. **Write the installer**: download the JetPack 7.2.1 Jetson ISO and write it
   to the USB flash drive. Never write the ISO to a microSD card — SD-card
   images are not supported from JetPack 7.2.
5. **Install**: boot the kit from the USB flash drive and select the target
   storage. Confirm the firmware capsule prompt with **Y within 30 seconds** —
   NVIDIA flags this as the most commonly missed step.
6. **First boot**: complete the Ubuntu initial setup, then install the JetPack
   components.
7. Full walkthrough: **[Quick Start](/tutorials/jetson-orin-nano/quick-start)**

## Documentation (Jetson Orin Nano series)

- [Quick Start](/tutorials/jetson-orin-nano/quick-start) · [Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates) · [Verify Your System](/tutorials/jetson-orin-nano/verify-your-system)
- [Product Overview](/tutorials/jetson-orin-nano/overview) · [Interfaces & Hardware Layout](/tutorials/jetson-orin-nano/interfaces) · [Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting) · [FAQ](/tutorials/jetson-orin-nano/faq)
- [Downloads](/tutorials/jetson-orin-nano/downloads) · [Migrate from JetPack 6.x](/tutorials/jetson-orin-nano/jetpack-6-to-7) · [Glossary](/tutorials/jetson-orin-nano/glossary) · [Changelog](/tutorials/jetson-orin-nano/changelog)
- [Local LLM Inference](/tutorials/jetson-orin-nano/local-llm) · [Memory Efficiency](/tutorials/jetson-orin-nano/memory-efficiency) · [DeepStream Video Analytics](/tutorials/jetson-orin-nano/deepstream) · [Robotics — State of Play](/tutorials/jetson-orin-nano/robotics) · [Agentic AI (NemoClaw)](/tutorials/jetson-orin-nano/agentic-ai)

## Recommended accessories

Browse the [Juxi Technology catalog](https://wiki.juxitech.com/products/) —
cameras (IMX219 CSI, USB auto-focus, RealSense depth), the
[Jetson Orin Radiator](https://www.juxitech.com/products/jetson-orin-radiator)
(store-listed for Orin NX / Orin Nano SUPER), robot arms, sensors and more.

## Support

- 📧 Technical support: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 Report documentation issues: [GitHub](https://github.com/Juxi-Technology/wiki-documents/issues)

## Sources

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (checked 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (checked 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (checked 2026-09-26)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (checked 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (checked 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (checked 2026-09-26)
- [Juxi Technology store product page](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (checked 2026-09-26)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official
documentation as of the dates listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
