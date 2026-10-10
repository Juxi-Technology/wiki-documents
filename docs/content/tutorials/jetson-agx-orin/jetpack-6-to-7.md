---
title: Migrating from JetPack 6.x to JetPack 7.2
sidebar_label: Migrate from JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  What changes between JetPack 6.x and JetPack 7.2.1 on the Jetson AGX Orin
  Developer Kit, what must be rebuilt, and a recommended migration order.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Migrating from JetPack 6.x to JetPack 7.2

This page is for existing JetPack 6.x users on the AGX Orin Developer Kit.
New kits: start with [Quick Start](/tutorials/jetson-agx-orin/quick-start) instead.

## What changes

| Layer | JetPack 6.x era | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (6.2 used 36.4.x) | **39.2.1** |
| OS / root filesystem | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux kernel | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x (6.x era) | **10.16.2** |

> Values for the JetPack 6.x column are illustrative (JetPack 6.2 era). Check
> **your** exact current versions with `cat /etc/nv_tegra_release` before
> planning, and see NVIDIA's [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive)
> for per-release details.

## What's new for Orin in the 7.2 line

From the Jetson Linux 39.2 release notes:

- The **Jetson Orin family joins the JetPack 7** software line (same generation as Thor).
- **Unified ISO installation** — a USB-stick install path, no host PC required.
- **NemoClaw** single-command installation for agentic AI workflows.
- Official **Yocto/OpenEmbedded recipes** (OE4T) for custom production images.
- Camera stack: **SIPL API v2.0** (GMSL and CoE) — note this release has **ABI changes**: UDDF drivers built for JetPack 7.1 must be rebuilt against JetPack 7.2 headers.
- *(AGX Orin 32GB Super Mode / MAXN_SUPER is 32GB-specific and does not apply to the 64GB kit. SBSA and MIG changes relate to Jetson Thor.)*

## What cannot be carried over — plan to rebuild

- **Out-of-tree kernel modules** — kernel moved to 6.8; modules must be rebuilt against the new headers.
- **Camera drivers and device-tree customizations** — rebuild for 39.2; SIPL 2.0 also brings ABI changes for UDDF drivers.
- **TensorRT engines** — serialized engines are tied to the TensorRT version; rebuild with TensorRT 10.16.2 on target.
- **CUDA binaries** — rebuild with CUDA 13; do not expect 12.x binaries to carry over.
- **Containers** — switch to JetPack 7-compatible images (e.g., updated NGC containers).
- **Python environments and system services** — recreate for Ubuntu 24.04 (package names, repositories, and interpreter versions moved).

## Recommended migration order

1. **Confirm your software stack is supported** on 7.2.1 *before* wiping anything — check each component you depend on against NVIDIA's [JetPack 7.2.1 component list](https://developer.nvidia.com/embedded/jetpack/downloads). That page can lag for independently released SDKs: it still lists Isaac ROS as "coming soon" although Isaac ROS 4.6.0 added Jetson Orin + JetPack 7.2 support (see [Robotics on JetPack 7.2](/tutorials/jetson-agx-orin/robotics)).
2. **Back up:** application data, sensor calibration files, container volumes, device-tree sources, TensorRT build scripts/ONNX models.
3. **Flash JetPack 7.2.1** ([Flash & Updates](/tutorials/jetson-agx-orin/flashing-and-updates)) and validate: boot, storage, networking, and that Force Recovery still works.
4. **Restore peripherals:** Wi-Fi, cameras, CAN, or fieldbus drivers — rebuilt for kernel 6.8.
5. **Rebuild** CUDA applications, TensorRT plugins, and TensorRT engines **on the target**.
6. **Validate your application in its original power mode first**; only then try other performance modes.
7. **Record baselines:** memory use, thermals, power draw, latency, throughput — before moving to production.

## Rollback

- Before wiping, keep a **known-good copy** of your current system (a spare NVMe/eMMC image, or at minimum the data from step 2).
- The ISO installer can install any L4T version for which you hold media — keep the older installer USB if you may need to go back.
- For fleets: stage the rollout, and prefer designs with an independent recovery path (recovery USB + backup image) over in-place upgrades.

## Sources

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*, known issues (checked 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-23) — ⚠️ its component table lags on some rows; for the versions a 7.2.1 system actually installs see [Verify Your System](/tutorials/jetson-agx-orin/verify-your-system)
- [Seeed Studio JetPack 7.2 Resource Hub](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — secondary source; used for migration-topic organization (checked 2026-09-23)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology. The rebuild list describes standard platform consequences
(kernel/TensorRT/CUDA version changes) — validate against your own stack.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
