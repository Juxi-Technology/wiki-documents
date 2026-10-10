---
title: Verify Your System — Version, Super Mode, and Power Checklist
sidebar_label: Verify Your System
slug: /getting-started/verify-your-system
description: >-
  Check that your Jetson Orin Nano Super Developer Kit runs JetPack 7.2.1 with
  the full component stack, the Super Mode board configuration, and the correct
  power modes.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Verify Your System

After the first boot of your JetPack 7.2.1 system, run this checklist. It confirms the
**L4T release**, the **installed JetPack components**, the **Super Mode board configuration**,
and the **power modes**. If the system is not set up yet, start with **[Quick Start](/tutorials/jetson-orin-nano/quick-start)**.

## Step 1 — Check the L4T (BSP) release

```bash
cat /etc/nv_tegra_release
```

A **JetPack 7.2.1** system reports **R39** with **REVISION: 2.1**:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Juxi note:** NVIDIA does not publish a sample output for this file. The block above is
> a community-observed r39.2.1 output from an Orin device; your `GCID` and `DATE` values
> will differ. The part that matters is `REVISION: 2.1`.

If the output shows an older release (for example R36 from JetPack 6.x), your system is not
running JetPack 7.2.1 — see **[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates)** and the
**[JetPack 6 to 7 Migration](/tutorials/jetson-orin-nano/jetpack-6-to-7)**.

## Step 2 — Check the JetPack components and versions

JetPack components such as CUDA, cuDNN, and TensorRT are installed as Debian packages.
NVIDIA's official list command is:

```bash
apt list --installed | grep nvidia-jetpack
```

The `nvidia-jetpack` metapackage must appear in the output. To spot-check one component, query
`dpkg` directly — for example, cuDNN with `dpkg -l | grep cudnn`. If the metapackage is missing,
run `sudo apt update` then `sudo apt install nvidia-jetpack`, and reboot if prompted.

The table below lists NVIDIA's official component versions for **JetPack 7.2.1 / Jetson
Linux 39.2.1** (checked 2026-09-26 on the JetPack download page):

| Component | Version |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Operating system | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (computer vision) | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (with ISO image) |
| Isaac ROS | **Shipped** — Isaac ROS 4.6.0 (August 2026) added Jetson Orin and JetPack 7.2 support; NVIDIA's component table still says "coming soon" |

> **Juxi note:** NVIDIA's 7.2.1 page lists one matrix for the whole JetPack 7 line (Thor and
> Orin together), not per platform. `dpkg` may show versions with a build suffix — match the
> version number, not the full string. NVIDIA's table does not list OpenCV, DLA, or Python
> versions, so this page does not either.

> **On the VPI version:** NVIDIA's download page has not been fully refreshed for 7.2.1 — its
> VPI row still carries the JetPack 7.2 value (4.1.3). JetPack 7.2.1 actually ships **VPI
> 4.1.4**, confirmed from NVIDIA's own package repository: `nvidia-jetpack-runtime (= 7.2.1-b49)`
> depends on `nvidia-vpi (= 7.2.1-b49)`, which pins `libnvvpi4 (= 4.1.4)`. Both 4.1.3 and 4.1.4
> exist in the package pool, so only the dependency lock is decisive. (checked 2026-09-26)

## Step 3 — Install jtop and read system activity (optional)

`jtop` is part of **jetson-stats**, a community project — not an NVIDIA product. NVIDIA does
not document it for this release, and compatibility with L4T r39 is not verified by NVIDIA.

Install it using the community instructions on the
[jetson-stats project page](https://pypi.org/project/jetson-stats/).

Then run `jtop` — an interactive system monitor and process viewer. Watch the shared 8 GB of
unified memory before starting a large AI workload. An official alternative is `sudo tegrastats`
(live CPU, GPU, memory, temperature, and power-related activity; `Ctrl`+`C` stops it). NVIDIA's
How-To page recommends `tegrastats` over `nvidia-smi` for monitoring on Jetson.

## Step 4 — Check the Super Mode board configuration (TNSPEC)

JetPack 7.2.1 ISO installs flash the **Super Mode** configuration by default. Confirm it on the device:

```bash
cat /etc/nv_boot_control.conf
```

On a Super-configured kit, the `TNSPEC` line carries a `-super` suffix. NVIDIA staff posted
this example:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

On a non-Super kit, the same line ends without `-super` — for example, from a user's report
of an affected system: `TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Juxi note:** The characters in the middle of the TNSPEC string vary by unit and firmware
> state. What matters is the `-super` suffix at the end of the TNSPEC line.

Release-note issue **6480645**: after an ISO install, the UEFI variable `TegraPlatformSpec`
may not accurately reflect the board specification. NVIDIA says to read the `TNSPEC` entry
in `/etc/nv_boot_control.conf` for the correct board information.

## Step 5 — Check the power modes

The default power mode is typically **25W**. From the desktop: click the power mode in the
Ubuntu top bar, select **Power Mode**, and choose **MAXN SUPER**. From the command line,
print the active mode and its mode ID:

```bash
sudo /usr/sbin/nvpmodel -q
```

To switch modes, use the ID shown by the query (`sudo /usr/sbin/nvpmodel -m <mode_id>`).
How to tell Super from non-Super:

| | Super configuration | Non-Super configuration |
|---|---|---|
| Available modes | 15W, 25W, **MAXN SUPER** | 7W, 15W only |
| Mode IDs (community-observed) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER; default 25W | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | selects MAXN SUPER | fails: `NVPM ERROR: request for bad power mode 2` |

> **Juxi tip:** The mode IDs come from a community report of the profile files on a 7.2
> system; the desktop power menu lists the available modes directly. After the GPU has been
> used, a power-mode change may ask for a reboot — NVIDIA staff say that prompt is expected.

## If only 7W and 15W appear

This is a known JetPack 7.2 problem, fixed by design in 7.2.1.

- On **JetPack 7.2 (L4T 39.2)**, known issue **6279443** says units updated via the ISO
  installer "will not default to 'Super' mode"; NVIDIA's guidance was to flash the target
  with a Linux host or SDK Manager.
- **JetPack 7.2.1** changes this: "ISO now flashes the Jetson Orin Nano Developer Kit with
  Super Mode flashing configuration by default." Issue 6279443 is not in the 7.2.1
  known-issues list, and NVIDIA staff stated: "This would be fixed in jp7.2.1."

A fresh 7.2.1 ISO install should show 25W and MAXN SUPER. If your kit does not:

1. For a system installed with the 7.2 ISO, reflash with the Super configuration from a
   Linux host or SDK Manager — see **[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates)**.
2. NVIDIA does not state whether a 7.2.1 ISO re-install converts a board that was installed
   with the 7.2 ISO. If Super modes are still missing, use the reflash options in
   **[Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting)**.

The same question is indexed in the **[FAQ](/tutorials/jetson-orin-nano/faq)**.

## What good looks like

| Check | Command | What a correct system shows |
|---|---|---|
| L4T release | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| JetPack packages | `apt list --installed \| grep nvidia-jetpack` | Installed JetPack packages, including the `nvidia-jetpack` metapackage |
| cuDNN spot check | `dpkg -l \| grep cudnn` | Version 9.20.0 |
| Board configuration | `cat /etc/nv_boot_control.conf` | The `TNSPEC` line ends with `jetson-orin-nano-devkit-super-` |
| Power modes | `sudo /usr/sbin/nvpmodel -q` | Active mode is 25W by default; 15W, 25W, and MAXN SUPER are selectable |

## If something is still wrong

Missing components: re-run the two commands in Step 2. For Super configuration or power-mode
problems, see **[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates)** and **[Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting)**.
Before asking for help, collect `cat /etc/nv_tegra_release` and `cat /etc/nv_boot_control.conf`
— NVIDIA staff request this state (plus `sudo /usr/sbin/nvpmodel -q --verbose`) before any
configuration-file workarounds. Juxi support: **support@juxitech.com** with your order number.

## Sources

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (checked 2026-09-26)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (checked 2026-09-26)
- [NVIDIA forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [continuing power-mode issues](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode not unlocking](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (checked 2026-09-26; include NVIDIA staff replies)
- [jetson-stats (jtop) on PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (checked 2026-09-26; community sources for the jtop install)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official documentation and NVIDIA
forum sources as of the dates listed; not yet verified on physical hardware by Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
