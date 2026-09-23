---
title: Verify Your System — Version and Component Checklist
sidebar_label: Verify Your System
slug: /getting-started/verify-your-system
description: >-
  Confirm your Jetson AGX Orin Developer Kit runs JetPack 7.2.1 with the full
  component stack — version commands and the expected component list.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
review_owner: cheny
---

# Verify Your System

After setting up or updating your kit, confirm two things: the **BSP version**
and the **installed JetPack component stack**. Both checks take less than a
minute.

## Step 1 — Check the L4T (BSP) version

```bash
cat /etc/nv_tegra_release
```

A **JetPack 7.2.1** system reports:

```
# R39 (release), REVISION: 2.1, ...
```

If the output shows an older release (for example R35), update the BSP first —
see **[Flashing & Updates](/tutorials/jetson-agx-orin/flashing-and-updates)**.

## Step 2 — Check the JetPack components

The JetPack components (CUDA, cuDNN, TensorRT, ...) are installed as Debian
packages. Check that the metapackage is present:

```bash
dpkg -l | grep -i nvidia-jetpack
```

And confirm the CUDA toolkit is available:

```bash
nvcc --version
```

Expected output for this release: **CUDA 13.2**. If `nvcc` is missing or the
metapackage is absent, install the components with:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(This takes about an hour depending on connection speed — see
[Quick Start → Step 3](/tutorials/jetson-agx-orin/quick-start).)

## Step 3 — Expected versions for JetPack 7.2.1

The table below is NVIDIA's official component list for **JetPack 7.2.1 /
Jetson Linux 39.2.1** (checked 2026-09-23 on NVIDIA's JetPack download page):

| Component | Version |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Operating system | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.1 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (computer vision) | 4.1.3 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (with ISO image) |
| Isaac ROS | **Not yet available for JetPack 7** ("coming soon" per NVIDIA) |

> **Juxi note:** `dpkg` may show package versions with build suffixes (for
> example `13.2.1-b48`); that is normal — match the version number, not the
> suffix. Robotics users: check the Isaac ROS row before planning work that
> depends on it.

## Optional — a quick look at system activity

`tegrastats` (included in Jetson Linux) prints live CPU/GPU/memory usage:

```bash
tegrastats
```

Press `Ctrl`+`C` to stop.

## If something is missing

1. Re-run `sudo apt update && sudo apt install nvidia-jetpack`.
2. Make sure the `apt dist-upgrade` + reboot from the setup flow completed (see [Quick Start → Step 3](/tutorials/jetson-agx-orin/quick-start)).
3. Check disk space (`df -h`) and internet connectivity.
4. Still stuck? See **[Troubleshooting](/tutorials/jetson-agx-orin/troubleshooting)**.

## Sources

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (checked 2026-09-23)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-23)

*Status: draft, pending review by cheny. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
