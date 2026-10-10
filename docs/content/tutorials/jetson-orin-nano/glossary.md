---
title: Glossary
sidebar_label: Glossary
slug: /appendix/glossary
description: >-
  Key terms for the NVIDIA Jetson Orin Nano Super Developer Kit (8 GB) — from
  JetPack and L4T versioning to flashing, power modes, and the AI stack.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Glossary

The terms a new Jetson user meets first, in alphabetical order. Version numbers
reflect the current release for this kit (**JetPack 7.2.1 / L4T r39.2.1**,
checked 2026-09-26).

## Terms

| Term | Meaning |
|---|---|
| **BSP** | Board support package: the software layer that boots the board — bootloader, kernel, drivers, and the root filesystem. In JetPack, the BSP is Jetson Linux (L4T). During a Jetson ISO install, the installer writes the BSP to the storage device you select. |
| **capsule update** | An update of the QSPI boot firmware. During a Jetson ISO install on a kit with older QSPI firmware, the installer prompts you to run a capsule update: press `Y` within 30 seconds, or the install fails later. The update runs in two passes, and the kit may reboot between them — this is expected. |
| **carveout** | A region of memory that the boot firmware reserves for a specific hardware block, such as the display or camera pipeline. The operating system cannot use it. On Orin Nano these reservations are documented, and you can reduce them by editing the BSP and re-flashing the kit (see [memory-efficiency](/tutorials/jetson-orin-nano/memory-efficiency)). |
| **CUDA** | NVIDIA's parallel-computing platform and toolkit for running code on the GPU. JetPack 7.2.1 ships CUDA 13.2.2. Orin's GPU compute capability is 8.7 (`sm_87`); GPU binaries that do not include `sm_87` fall back to CPU execution (see [local-llm](/tutorials/jetson-orin-nano/local-llm)). |
| **cuDNN** | NVIDIA's library of optimized deep-learning primitives, such as convolution and activation functions. Deep-learning frameworks and TensorRT use it for their core operations. JetPack 7.2.1 ships cuDNN 9.20.0. |
| **DeepStream** | NVIDIA's SDK for multi-stream video analytics: it decodes video, runs inference, tracks objects, and outputs results. DeepStream 9.1 supports the Jetson Orin family on JetPack 7.2. NVIDIA recommends the Docker container as the quickest install path for new users (see [deepstream](/tutorials/jetson-orin-nano/deepstream)). |
| **DLA** | Deep Learning Accelerator: a fixed-function inference engine built into some Jetson modules. The Orin Nano module has no DLA, so inference on this kit runs on the GPU. |
| **Edge-LLM** | TensorRT Edge-LLM: NVIDIA's on-device runtime for large language models (LLMs) and vision-language models (VLMs). On Orin it supports FP16, INT8, and INT4 engines only — FP8 and FP4 engines do not run — and the engines are built on the device itself (see [local-llm](/tutorials/jetson-orin-nano/local-llm)). |
| **eMMC** | Embedded flash storage used as the system disk on some Jetson modules. The developer kit ships without storage: supply a microSD card or an NVMe SSD before you start (see [quick-start](/tutorials/jetson-orin-nano/quick-start)). |
| **Force Recovery mode** | A special boot mode used to flash the kit from a host PC. Enter it from the running system with `sudo reboot --force forced-recovery`, or with the kit powered off by shorting pins 9 and 10 of the Button Header and then connecting power. In this mode the USB-C port carries the flash connection to the host PC. |
| **JetPack** | NVIDIA's SDK bundle for Jetson: the operating system, drivers, the CUDA stack, and libraries. The current release for this kit is JetPack 7.2.1, which includes Jetson Linux (L4T) r39.2.1. |
| **Jetson 6.x Update Path** | The firmware-bridge procedure for kits whose factory UEFI/QSPI firmware is older than 36.0. It boots a JetPack 5.1.3 microSD bridge image and schedules a bootloader (firmware) update; after that, the kit can boot JetPack 6.x or the JetPack 7.2.1 Jetson ISO. Kits with older firmware must complete this path before an ISO install (see [quick-start](/tutorials/jetson-orin-nano/quick-start)). |
| **Jetson ISO** | The unified USB-installer image for JetPack 7.2 and later. Write it to a USB flash drive with a tool such as Balena Etcher — do not write it to a microSD card — and note that it is install-only, not a live USB. During installation you select the target: the microSD card or the NVMe SSD. |
| **L4T** | Jetson Linux: the board support package underneath JetPack — the UEFI bootloader, kernel, drivers, and the Ubuntu root filesystem. For JetPack 7.2.1 it is r39.2.1, with Linux kernel 6.8 and an Ubuntu 24.04 root filesystem. |
| **MAXN SUPER** | The top power mode on the kit (mode 2): CPU 1,728 MHz, GPU 1,020 MHz, memory 3,199 MHz. It is an experimental mode and exists only when the kit was flashed with the Super configuration. Select it in the desktop Power Mode menu, or run `sudo /usr/sbin/nvpmodel -m 2`. |
| **microSD (UHS-1)** | The card format used as the kit's default system storage. UHS-1 is an SD speed class; NVIDIA recommends a 64 GB or larger UHS-1 microSD card. The slot is on the underside of the module, so insert the card before booting the installer. |
| **nv_boot_control.conf / TNSPEC** | The on-device file `/etc/nv_boot_control.conf`, which records the board configuration as a TNSPEC string. NVIDIA staff note that a Super configuration shows a `-super` suffix, for example `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`; if the suffix is missing, the higher power modes are not available. After an ISO install, NVIDIA points to this TNSPEC entry as the reference for the correct board information. |
| **NVMe** | An SSD on the PCIe bus, installed in one of the carrier board's M.2 Key-M slots: 2280-size (PCIe 3.0 x4) or 2230-size (PCIe 3.0 x2). An NVMe SSD can host the system and is recommended when you need more capacity and better storage performance. |
| **nvpmodel** | The power-mode tool on the kit. Run `sudo /usr/sbin/nvpmodel -q` to list the modes available on your system, and `sudo /usr/sbin/nvpmodel -m <mode_id>` to switch modes. The same modes are in the desktop Power Mode menu. |
| **oem-config** | The first-boot setup wizard: license agreement, language and keyboard, network, and the initial user name and password. It runs once, after the first boot of the installed system. |
| **QSPI** | The small NOR flash memory on the kit that stores the UEFI boot firmware. JetPack 7.2 and later require JetPack 6.x-generation QSPI firmware (newer than version 36.0); with older firmware, the installer can fail or the kit can boot to a black screen. See [flashing-and-updates](/tutorials/jetson-orin-nano/flashing-and-updates). |
| **SDK Manager** | NVIDIA's host-PC tool for flashing the BSP and installing JetPack components over USB. The documented host is an x86 PC running Ubuntu. It is the alternative to the on-device Jetson ISO method. |
| **SO-DIMM** | The module's connector form factor: a 260-pin SO-DIMM, 69.6 mm x 45 mm. The module plugs into the carrier board's SO-DIMM socket, and the same socket also accepts a Jetson Orin NX module. |
| **Super Mode** | NVIDIA's software power and clock configuration for the Orin Nano — not different hardware. Existing kits get the "Super" boost with a JetPack software upgrade, and on this kit the higher power modes appear only when it was flashed with the Super configuration. |
| **TensorRT** | NVIDIA's inference optimizer and runtime. It compiles a trained model into a TensorRT engine — a device-specific file built for the target GPU — and runs that engine efficiently. JetPack 7.2.1 ships TensorRT 10.16.2. |
| **TOPS** | Trillion (tera) operations per second, the common unit for AI throughput. This kit is rated at up to 67 sparse INT8 TOPS (33 dense INT8). NVIDIA publishes both a sparse and a dense rating for the same module. |
| **UEFI** | The boot firmware on the kit and its setup menu. Press Esc while the NVIDIA boot splash is shown to enter setup; in the menu, Boot Manager is where you select the USB installer as the boot device. The firmware version is displayed there, and JetPack 7.2 and later need a version newer than 36.0. |
| **unified memory** | The single 8 GB LPDDR5 memory pool shared by the CPU and GPU — the kit has no separate video memory. About 7.6 GB is usable after firmware and kernel reservations, and the operating system, your models, and their KV caches all draw from this one pool. See [memory-efficiency](/tutorials/jetson-orin-nano/memory-efficiency). |
| **VPI** | Vision Programming Interface: NVIDIA's library for hardware-accelerated image processing on Jetson. JetPack 7.2.1 ships VPI 4.1.4. |

## Version map

The most useful version mapping to remember:

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (current) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (last JetPack 6 release) | r36.5.2 | 22.04 | 5.15 | 12.6 |

To check what a specific system actually runs: `cat /etc/nv_tegra_release`
(see [verify-your-system](/tutorials/jetson-orin-nano/verify-your-system)).

## Sources

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (checked 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ its component table lags row by row (the VPI and PVA rows still carry JetPack 7.2 values); use [NVIDIA's package repository](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) for component versions instead (checked 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (checked 2026-09-26)
- [TensorRT Edge-LLM — Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (checked 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (checked 2026-09-26)
- [Jetson Orin Nano Series — Power and Performance (L4T r39.2 Developer Guide)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (checked 2026-09-26)
- [NVIDIA Jetson Orin family — specifications](https://developer.nvidia.com/embedded/jetson-orin) (checked 2026-09-26)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (checked 2026-09-26)
- [NVIDIA forum — "25W and MAXN_SUPER not seen in JetPack 7.2" (NVIDIA staff answer)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (checked 2026-09-26)

*Status: reviewed on 2026-10-11. Definitions compiled from NVIDIA
documentation and standard industry usage; version numbers checked on the dates
listed. Not verified on physical hardware by Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
