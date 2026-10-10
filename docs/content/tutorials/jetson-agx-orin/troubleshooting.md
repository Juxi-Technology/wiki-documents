---
title: Troubleshooting
sidebar_label: Troubleshooting
slug: /support/troubleshooting
description: >-
  Symptom-driven troubleshooting for the Jetson AGX Orin Developer Kit —
  boot and display, power, flashing, and known issues, grounded in NVIDIA's
  official documentation.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Troubleshooting

Issues are grouped by symptom — find yours, then follow the checks in order.
Everything here is grounded in NVIDIA's official documentation (sources at the
bottom). For anything not covered, see *Getting help* at the end.

## The kit does not power on

1. The included USB-C power supply must connect to the **USB-C port above the DC jack** (J24) — not the port next to the 40-pin header.
2. The kit powers on automatically when power is connected; if it does not, press the **Power button**.
3. If you use your own supply through the barrel jack (J41): 5.5 mm OD, 2.5 mm ID, **center positive**.

## No display output / screen stays black

- **DisplayPort is the only display output.** There is no HDMI port and no DisplayPort-over-USB-C. For an HDMI monitor use an **active** DP→HDMI adapter or cable.
- The first boot can take **up to a minute** before the screen appears.
- If you are using a **KVM switch**, connect the monitor directly to the kit instead — KVM devices are a known source of black-screen issues during both normal boot and ISO installation (NVIDIA lists this in the setup guide).
- Booting with a problematic power configuration? See *System crashes on reboot with a display connected* below — try booting **without** the display attached, then reconnect it after boot.

## After the ISO install, the kit boots the old system

Remove the installation USB stick after installation. If the stick stays
inserted, the kit may boot from it again instead of the freshly installed
system. (Official guidance.)

## Flashing — Jetson ISO issues

- **The kit does not boot from the USB stick:** open the **UEFI boot manager** during boot and select the USB drive.
- **A QSPI firmware prompt appears:** press **`Y`**. This capsule update is required for compatibility and runs twice. If you miss the prompt or are unsure it completed, **restart the installation** and confirm it. Skipping this step causes installation problems (NVIDIA release-notes known issue 6266271).
- **My kit is older than L4T r35.5:** the ISO path requires an installed BSP of r35.5 or newer. Use the host-PC methods (SDK Manager or `flash.sh`) to update to r35.5+ first — see [Flashing & Updates](/tutorials/jetson-agx-orin/flashing-and-updates).

## Flashing — SDK Manager issues

- **Device not detected:** check, in order —
  1. Cable plugged into the **USB-C port next to the 40-pin header** (port 10 / J40), not the power port;
  2. The kit entered **Force Recovery mode**: hold the **middle Force Recovery button** while inserting the power plug;
  3. The host meets the requirements: Ubuntu Desktop 20.04/22.04 (x86_64), 8 GB RAM, 25 GB free disk, NVIDIA Developer Program account logged in. (L4T 39.2 release notes list host distributions 24.04/22.04 for flashing — check SDK Manager's system-requirements page for the current list.)
- **I want to flash to NVMe / microSD / USB drive:** the ISO installer covers eMMC and NVMe; other targets require SDK Manager or the flash script (host PC).

## System crashes on reboot with a display connected (AGX Orin 64GB, 15W mode)

NVIDIA release-notes known issue **6236259**: on AGX Orin platforms, lowering
the EMC frequency below maximum (which happens in low-power modes such as 15W)
during systemd initialization can crash the system on reboot — especially with
a display connected. Workaround per NVIDIA:

1. Before rebooting, switch to **MAXN** power mode (restores EMC to Fmax).
2. After the system restarts, apply your desired power mode.
3. If it was rebooted while in the problematic mode: disconnect the display, boot, and reconnect the display after initialization.

## Networking & wireless (post-flash notes)

- **Can't connect to 6 GHz / WPA3 right after flashing:** reset the device and try again (listed as fixed in L4T 39.2.0; the reset note still applies to units flashed with older images).
- **Some Wi-Fi access points missing in scans (busy environments):** increase the scan buffer — `wpa_cli set bss_max_count 500` (from the release notes' fixed-issues section).

## Known issues beyond this page

Before deep-debugging, check the **Known Issues** section of the current
release notes — it covers general system, camera, multimedia, graphics,
connectivity, display, and compute-stack items:

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## Getting help

- **[NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — official community; search before posting, include your `cat /etc/nv_tegra_release` output.
- **Juxi Technology support** — **support@juxitech.com** for technical support, and for order, warranty, and RMA matters. To speed things up, include your order number and the output of `cat /etc/nv_tegra_release`. (Sales: sales@juxitech.com · Product questions: pe@juxitech.com)

## Sources

- [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit User Guide (checked 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (checked 2026-09-23)

*Status: reviewed on 2026-10-11. Hardware-specific behavior reported by
customers may differ; update this page as field reports come in.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
