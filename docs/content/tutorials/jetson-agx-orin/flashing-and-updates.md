---
title: Flashing & Updates — BSP Installation Options
sidebar_label: Flashing & Updates
slug: /getting-started/flashing-and-updates
description: >-
  The three official ways to install or update the BSP on the Jetson AGX Orin
  Developer Kit — Jetson ISO (recommended), NVIDIA SDK Manager, and the
  Linux_for_Tegra flash script — plus how to enter Force Recovery mode.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Flashing & Updates — BSP Installation Options

NVIDIA supports three official ways to install or update the BSP on the
developer kit. Pick by situation:

| | 💾 Start with eMMC | 🛠️ SDK Manager | 📜 Flash script |
|---|---|---|---|
| Short summary | Boot the pre-flashed eMMC, update with Jetson ISO | GUI tool on a host PC; flashes BSP and can install JetPack packages | `flash.sh` script on a host PC |
| Ubuntu host PC | **Not required** | Required | Required |
| Typical time | Immediate first boot; ISO update takes ~15 min | ~30 min to flash | Depends on setup |
| Who it's for | Everyone (recommended default) | Anyone with an Ubuntu PC; needed to flash NVMe/microSD/USB or when the kit has no internet | Product developers, advanced users |

> **Juxi note:** the current release is **JetPack 7.2.1 (L4T r39.2.1)**. If your
> kit is new, start with **[Quick Start](/tutorials/jetson-agx-orin/quick-start)** — it walks the
> recommended path end to end.

## Option 1 — Start with eMMC, update with Jetson ISO (recommended)

Your developer kit ships with an L4T BSP pre-flashed on eMMC and boots into the
Ubuntu desktop out of the box. The recommended update path is the **Jetson ISO**
— a bootable USB stick that updates the kit **without an Ubuntu host PC**.

**Prerequisite:** the installed BSP must be **L4T r35.5 or newer** (check with
`cat /etc/nv_tegra_release`). Older kits need a host-PC method first (Option 2
or 3 below).

The full step-by-step procedure (USB creation with Balena Etcher, UEFI boot,
the QSPI capsule prompt, GRUB menu, storage selection, first boot) is in
**[Quick Start → Step 2](/tutorials/jetson-agx-orin/quick-start)**.

Highlights from NVIDIA's documentation:

- At the GRUB menu you choose the installation target: **eMMC** or **NVMe** (recommended if you installed an SSD).
- If prompted, confirm the **QSPI capsule update** with `Y` — it is required for compatibility and runs twice. Skipping it causes installation problems (this is also listed in the L4T release notes as known issue 6266271).
- Re-installing on a system that already runs JetPack 7.2.1 is supported — follow the official instructions carefully.

## Option 2 — NVIDIA SDK Manager (host PC)

Choose SDK Manager when you want to:

- flash the base L4T BSP to a **different storage medium** than eMMC (NVMe SSD, USB drive, or microSD card), or
- flash a kit that **cannot be given a direct internet connection**.

**Host PC requirements** (per NVIDIA's SDK Manager documentation): Ubuntu
Desktop **20.04 or 22.04** on x86_64, 8 GB system memory, 25 GB free disk
space, and an **NVIDIA Developer Program membership** (free) to download the
tool and log in. Note: the L4T 39.2 release notes list the host Linux
distribution for flashing as Ubuntu **24.04 and 22.04** — check NVIDIA's
SDK Manager system-requirements page for the current list, as this area moves.

**Install and log in:**

1. Download the SDK Manager `.deb` package from NVIDIA and install it:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. Launch with `sdkmanager`, click the **NVIDIA DEVELOPER** tab, and log in.

**Hardware setup and Force Recovery mode:**

1. Connect the kit to the host PC with the bundled USB-A↔USB-C cable, plugged into the **USB-C port next to the 40-pin header** (labeled port 10 / J40).
2. While **holding the middle Force Recovery button** (button 2, between Power and Reset), insert the USB-C power supply into the USB-C port above the DC jack. The kit powers on in **Force Recovery mode**.
3. On the host, SDK Manager should detect the kit. *(If not, see [Troubleshooting](/tutorials/jetson-agx-orin/troubleshooting).)*

**Flashing steps in SDK Manager** (summary — follow the on-screen instructions):

1. **Step 01:** select **Jetson** as the product category, deselect "Host Machine", select the **Jetson AGX Orin** module, and continue.
2. **Step 02:** for a base BSP, select **Jetson OS** only (deselect "Jetson SDK Components"). Accept the license.
3. **Step 03:** enter your sudo password; wait for the download. In the flashing dialog choose **"Manual Setup – Jetson AGX Orin"**, ignore OEM configuration, select the **Storage Device** to flash to, and click **Flash**.
4. When flashing finishes, the kit reboots into the new BSP. Complete the Ubuntu `oem-config`, then install JetPack components (see [Quick Start → Step 3](/tutorials/jetson-agx-orin/quick-start)).

## Option 3 — Linux_for_Tegra flash script

For advanced users and product developers: the `flash.sh` (or initrd flash)
scripts from the Jetson Linux package flash a Jetson device from a host PC.
See the **Flashing Support** section of the [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide).

Host and toolchain facts from the L4T 39.2 release notes: host Linux
distribution for flashing — Ubuntu 24.04 / 22.04; cross-compilation toolchain —
GCC 13.2; source release tag — `jetson_39.2_GA`.

## Force Recovery mode — how to enter

Same procedure as above, no host required to perform it:

1. With the kit powered off and the USB-C data cable connected to a host (if you need one),
2. **Hold the middle Force Recovery button**, then connect the USB-C power supply — the kit starts in Force Recovery mode.

To leave recovery mode, power-cycle or reset the kit. On the host, recovery
mode is typically visible as an NVIDIA USB device (`lsusb`).

## After flashing

Verify the result: **[Verify Your System](/tutorials/jetson-agx-orin/verify-your-system)** — version
checks for L4T, CUDA, and the whole JetPack component stack.

## Sources

- [BSP Installation — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (checked 2026-09-23)
- [Quick Start — same guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (checked 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (checked 2026-09-23)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*Status: draft, pending review by cheny. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
