---
title: Glossary
sidebar_label: Glossary
slug: /appendix/glossary
description: >-
  Key terms for the Jetson AGX Orin Developer Kit — from JetPack and L4T
  versioning to flashing, AI stack, and power terminology.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Glossary

The terms customers most often ask about, grouped by topic. Version numbers
reflect the current release (**JetPack 7.2.1 / L4T 39.2.1**, checked
2026-09-24).

## Platform & hardware

| Term | Meaning |
|---|---|
| **Jetson AGX Orin** | NVIDIA's edge-AI module family; this developer kit carries the **64GB** module. |
| **Module** | The small board with the SoC, memory, and eMMC that does the computing. |
| **Carrier board** | The larger board with all the ports and connectors; the module plugs into it (699-pin connector, J3). |
| **Developer Kit** | Module + reference carrier board + Wi-Fi module + power supply — the prototyping platform. Production products use modules on custom or partner carrier boards. |
| **SoC** | System-on-chip: CPU, GPU, and accelerators integrated on one chip (NVIDIA calls the line "Tegra"). |
| **TOPS** | Trillion operations per second — a measure of AI throughput (the AGX Orin family goes up to 275 TOPS). |
| **Tensor Core** | GPU cores specialized for the matrix math behind neural networks. |
| **eMMC** | Embedded flash storage on the module; the default system storage. |
| **NVMe** | Fast SSD over PCIe, installed in the M.2 M-Key slot (J1); can host the system. |
| **M.2 (M-Key / E-Key)** | Slot types: **M-Key** = NVMe SSD, **E-Key** = Wi-Fi module. |
| **CSI / GMSL** | Camera interfaces (CSI on the camera connector J509; GMSL for automotive-grade cameras). |
| **DisplayPort (DP)** | The **only** display output on the kit; supports MST (up to 2 displays) and DSC. |

## Software & versions

| Term | Meaning |
|---|---|
| **JetPack** | NVIDIA's SDK bundle for Jetson — OS, drivers, CUDA stack, and libraries. **Current: 7.2.1.** |
| **Jetson Linux (L4T)** | The board support package underneath JetPack: bootloader, kernel, drivers, and the Ubuntu root filesystem. **Current: r39.2.1.** |
| **BSP** | "Board support package" — everything needed to boot and run the board. |
| **Root filesystem (rootfs)** | The user-space part of the OS (here: Ubuntu 24.04). |
| **oem-config** | The first-boot setup wizard (language, user account, networking). |
| **UEFI** | The firmware/boot menu on the kit; use its boot manager to pick a boot device. |
| **QSPI** | Small flash holding early boot firmware. During ISO installation, a "**QSPI capsule update**" prompt may appear — press `Y` (required). |
| **Force Recovery mode** | Special boot mode for flashing from a host PC. Enter: hold the middle Force Recovery button while connecting power. |
| **Jetson ISO** | The USB-stick installation image; NVIDIA's recommended update path (no host PC needed). |
| **SDK Manager** | NVIDIA's GUI tool (host PC) to flash the BSP and install JetPack components. |
| **Linux_for_Tegra / flash.sh** | The scripting-based flashing tools, for advanced/product use. |
| **OTA** | Over-the-air update — remote software/security updates for deployed devices. |
| **Device tree** | The data structure that tells the kernel what hardware is attached; customized device trees must be rebuilt for each L4T version. |

**Version mapping** (the single most useful table to memorize):

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (current) | **39.2.1** | **24.04** | **6.8** | **13.2.1** |
| 6.x (previous generation) | 36.x | 22.04 | 5.15 | 12.x |

Always check what a specific system actually runs: `cat /etc/nv_tegra_release`.

## AI stack

| Term | Meaning |
|---|---|
| **CUDA** | NVIDIA's GPU computing toolkit (13.2.1 in this release). |
| **cuDNN** | Library of optimized deep-learning primitives (9.20.0). |
| **TensorRT** | Inference optimizer and runtime (10.16.2). |
| **TensorRT engine** | A compiled, hardware/version-specific model file. Engines do **not** survive version upgrades — rebuild them. |
| **DeepStream** | SDK for multi-stream video analytics (9.1). |
| **VPI** | Vision Programming Interface — hardware-accelerated image processing (4.1.3). |
| **Holoscan** | Streaming AI framework for real-time sensor processing (3.9.0). |
| **NGC** | NVIDIA's catalog of containers and pretrained models (catalog.ngc.nvidia.com). |
| **Container** | Isolated, packaged runtime (Docker); the standard way to ship AI software on Jetson. |

## Power & monitoring

| Term | Meaning |
|---|---|
| **nvpmodel** | Tool to switch power modes. Run `sudo nvpmodel -q` to see the modes on your system. |
| **MAXN** | "Max performance" power mode (no power cap). |
| **jetson_clocks** | Pins clocks to maximum — for benchmarks, not for sustained default use. |
| **tegrastats** | Built-in live monitor for CPU/GPU/memory usage. |

## JetPack 7 era

| Term | Meaning |
|---|---|
| **NemoClaw** | NVIDIA's agentic-AI framework for Jetson; installable with a single command since JetPack 7.2. |
| **Jetson agent skills** | Reusable agent workflows NVIDIA publishes for device-side and BSP tasks. |
| **Yocto / OpenEmbedded (OE4T)** | The build system for custom, reproducible production Linux images — officially supported since 7.2. |
| **SBSA** | Server Base System Architecture — the Arm server model the Jetson **Thor** line aligns with (not this kit). |
| **MIG** | Multi-Instance GPU — partitioning one GPU into isolated instances (Jetson Thor, tech preview). |

## Sources

- [JetPack SDK Downloads — component versions](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (checked 2026-09-24)

*Status: draft, pending review by cheny. Definitions compiled from NVIDIA
documentation and standard industry usage; version numbers checked on the date
listed.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
