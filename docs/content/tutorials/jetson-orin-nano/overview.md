---
title: Product Overview — Jetson Orin Nano Super Developer Kit
sidebar_label: Product Overview
slug: /product/overview
description: >-
  What the NVIDIA Jetson Orin Nano Super Developer Kit (8GB) is, what it is
  used for, and where it sits in the Jetson Orin family.
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
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Product Overview

![Jetson Orin Nano Super Developer Kit](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

The NVIDIA® Jetson Orin Nano™ Super Developer Kit is the entry kit of the
Jetson Orin family: a small AI computer for prototyping computer-vision,
robotics and local generative-AI applications at the edge. It runs JetPack
7.2.1 (Jetson Linux / L4T r39.2.1), the current release for this kit.

## Key facts (verified against NVIDIA's documentation)

- "Super" is a software configuration, not new hardware: the same module
  (P3767) and carrier board (P3768) as the earlier "Jetson Orin Nano Developer
  Kit", renamed at the Super update. *(Developer Kit User Guide; NVIDIA Super
  Boost announcement)*
- Kit headline numbers: up to **67 INT8 TOPS**, up to **102 GB/s** memory
  bandwidth, power **7W to 25W**, and a **1.7x generative-AI** improvement
  over the previous generation. *(Developer Kit User Guide — Introduction)*
- Ampere GPU with **1,024 CUDA cores and 32 Tensor Cores**; **6-core Arm
  Cortex-A78AE** 64-bit CPU up to 1.7 GHz; **8GB 128-bit LPDDR5**. *(Datasheet;
  Jetson Orin spec page)*
- Storage: a **microSD card slot on the underside of the module** plus
  **external NVMe** support; no eMMC, and no storage in the box. *(Datasheet;
  Quick Start)*
- Runs JetPack **7.2.1** (L4T **r39.2.1**; Ubuntu 24.04, kernel 6.8, CUDA
  13.2.2, TensorRT 10.16.2) via the Jetson ISO method from a USB flash drive.
  Supported range: JetPack 6.x or 7.2/7.2.1 (7.0/7.1 did not support Orin).
  *(Quick Start; JetPack downloads; JetPack archive)*
- Carrier board: DisplayPort, Gigabit Ethernet, four USB 3.2 Type-A ports,
  USB-C, two MIPI CSI connectors, three M.2 slots, 40-pin header. See
  **[Interfaces & Hardware Layout](/tutorials/jetson-orin-nano/interfaces)**. *(Developer Kit User
  Guide — Hardware Layout)*

## What "Super" means

The Super performance boost is delivered by a software power mode that
raises the GPU, memory and CPU clocks on the same hardware, and NVIDIA says
existing kits get it by upgrading JetPack: "Existing Jetson Orin Nano
Developer Kit users can get the 'Super' performance boost with a software
upgrade." *(Developer Kit User Guide; NVIDIA Super Boost announcement)*

The table below compares the original kit with the Super configuration.
*(NVIDIA Super Boost announcement)*

| Item | Original Orin Nano Developer Kit | Super configuration |
|---|---|---|
| GPU clock | 635 MHz | 1,020 MHz |
| CPU clock | 1.5 GHz | 1.7 GHz |
| Memory bandwidth | 68 GB/s | 102 GB/s |
| AI performance (sparse INT8) | 40 TOPS | 67 TOPS |
| FP16 compute | 10 TFLOPs | 17 TFLOPs |
| Power modes | 7W, 15W | 7W, 15W, 25W |
| Price (at Super launch, Dec 2024) | $499 | $249 |

*On one number, NVIDIA's own materials differ: the Super announcement describes
the previous memory bandwidth as "65 GB/s", while NVIDIA's module specification
tables list 68 GB/s for the original 8 GB configuration. The table above uses
the specification figure; both refer to the same pre-Super hardware.*

For current pricing, see the Juxi store
[listing for this kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)
(SKU JX00110).

Starting with JetPack 7.2.1, the Jetson ISO flashes the kit with the Super
configuration by default *(JetPack downloads page)*. Units first installed
with the JetPack 7.2 ISO may keep a non-Super profile; if 25W or MAXN SUPER
is missing, see **[Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting)**.

In the L4T r39.2 power-mode table, the Super configuration lists 15W (mode 0),
25W (mode 1, default) and MAXN SUPER (mode 2, experimental; only on kits
flashed with the Super configuration). MAXN SUPER runs the CPU up to 1.7 GHz,
the GPU up to 1,020 MHz and the memory controller at 3,199 MHz. Read the mode
with `sudo /usr/sbin/nvpmodel -q`; set it with
`sudo /usr/sbin/nvpmodel -m <mode_id>`. NVIDIA's kit pages quote "7W to 25W";
the r39.2 table lists the three modes above — check your unit in **[Verify
Your System](/tutorials/jetson-orin-nano/verify-your-system)**. *(L4T r39.2 Power
and Performance page)*

## Module specifications

| Item | Specification |
|---|---|
| AI performance | Up to 67 sparse INT8 TOPS (33 dense) in the Super configuration |
| GPU | NVIDIA Ampere architecture, 1,024 CUDA cores, 32 Tensor Cores, up to 1,020 MHz |
| CPU | 6-core Arm Cortex-A78AE v8.2 (64-bit), 1.5MB L2 + 4MB L3, up to 1.7 GHz |
| Memory | 8GB 128-bit LPDDR5, 102 GB/s |
| Storage | microSD card slot on the underside of the module; external NVMe SSD support |
| Video decode | 1x 4K60 (H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| Video encode | 1080p30 using 1–2 CPU cores (no dedicated encoder hardware) |
| AI accelerators | No DLA and no PVA — inference runs on the GPU Tensor Cores |
| Module form factor | 260-pin SO-DIMM, 69.6 mm x 45 mm |

*Sources: Jetson Orin Nano Super Developer Kit Datasheet (December 2024);
NVIDIA Jetson Orin spec page; L4T r39.2 Power and Performance page.*

## Part numbers

| Part number | What it designates |
|---|---|
| P3766 | The complete Jetson Orin Nano Developer Kit |
| P3767 | The System on Module (SOM) |
| P3768 | The reference carrier board |
| P3767-0005 | Module SKU in the developer kit (Jetson Orin Nano 8GB, "for development only") |

Other Orin Nano module SKUs: P3767-0003 (8GB, commercial) and P3767-0004
(4GB). The developer kit carrier accepts P3767 modules with SKU 0, 1, 3, 4
and 5. *(L4T r39.2 Developer Guide; L4T r38.2.1 Developer Guide)*

## Where it sits in the Orin family

- **Jetson Orin Nano 8GB — this kit.** The entry point of the Orin family:
  67 INT8 TOPS, 8GB of unified memory, 7W to 25W.
- **Jetson Orin NX.** The same carrier can power, test and develop with Orin
  NX modules (own heat sink and fan required; a factory-fresh module must be
  flashed from an Ubuntu host with SDK Manager). *(Developer Kit User Guide —
  How-To)*
- **Jetson AGX Orin — the flagship tier.** The AGX Orin 32GB module reaches
  241 TOPS in Super Mode *(JetPack 7.2 release highlights)*. See Juxi's
  [Jetson AGX Orin series](/tutorials/jetson-agx-orin/quick-start).

The main constraint to plan for is the **8GB of unified memory**; with no DLA
or PVA, AI workloads run on the GPU alone — see **[Memory
Efficiency](/tutorials/jetson-orin-nano/memory-efficiency)** and **[Local
LLM](/tutorials/jetson-orin-nano/local-llm)**.

## What the developer kit is for

- **Prototyping for production.** JetPack 7.2.1 serves the whole Orin family,
  so work on the kit carries over to Orin modules used in products. *(JetPack
  downloads page)*
- **Computer vision.** Two MIPI CSI camera connectors; DeepStream SDK 9.1 is
  in the JetPack 7.2.1 component matrix — see
  **[DeepStream](/tutorials/jetson-orin-nano/deepstream)**.
- **Local generative AI.** The headline claim is a 1.7x generative-AI
  improvement; the 8GB ceiling shapes what fits — see
  **[Local LLM](/tutorials/jetson-orin-nano/local-llm)**.
- **Robotics.** NVIDIA staff recommend ROS 2 Jazzy for JetPack 7.2.1 — see
  **[Robotics](/tutorials/jetson-orin-nano/robotics)**.

> **Juxi note:** Production products are built on Jetson Orin modules — the
> Orin Nano 8GB or 4GB, or an Orin NX — on a custom carrier board. The
> developer kit is the development vehicle, not the production part.

## In the box

The box contains the developer kit (Orin Nano 8GB module with heat sink, on
the reference carrier board), a 19 V power supply, the included 802.11ac/ab/gn
wireless card, and a quick start and support card. NVIDIA states the kit "does
not include removable storage in the box". *(Datasheet; Quick Start)*

You must supply:

- **Storage** — a microSD card (64GB, UHS-1 or larger) or an NVMe SSD. The
  microSD slot is on the **underside of the module**; insert before power on.
  The Juxi store bundle already includes a 64 GB microSD card, so buy storage
  only if you received the bare NVIDIA box or want an NVMe SSD instead.
- **An installer USB drive** — 16GB or larger. Write the JetPack ISO to this
  USB drive, not to a microSD card: SD-card images were removed in JetPack
  7.2.
- **A host computer** with 25GB or more free space, a DisplayPort monitor and
  USB keyboard/mouse for desktop setup. *(Quick Start; Supported Hardware)*

> **Important** Very old factory firmware must be updated first — JetPack
> 7.2.1 requires JetPack 6.x-generation UEFI/QSPI firmware. See **[Quick
> Start](/tutorials/jetson-orin-nano/quick-start)** and **[Flashing &
> Updates](/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Where to go next

- **[Quick Start](/tutorials/jetson-orin-nano/quick-start)** — from the box to a
  working JetPack 7.2.1 system
- **[Interfaces & Hardware Layout](/tutorials/jetson-orin-nano/interfaces)** — every port, slot and
  connector
- **[Downloads](/tutorials/jetson-orin-nano/downloads)** — official images, tools and documentation
  links

## Sources

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (checked 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (checked 2026-09-26)
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (linked as the announcement of the Super power mode)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (checked 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-26)
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (checked 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (checked 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (checked 2026-09-26)
- [L4T r38.2.1 Developer Guide — Partition Configuration (module SKUs)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (checked 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (checked 2026-09-26)
- [Juxi Technology store listing for this kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (checked 2026-09-26)

*Status: draft, pending review by cheny. Grounded in NVIDIA's official
documentation as of the dates listed; not yet verified on physical hardware by
Juxi Technology.*

**Image credits:** Product image from NVIDIA's official *Jetson Orin Nano
Developer Kit User Guide* (downloaded 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
