---
title: Migrating from JetPack 6.x to JetPack 7.2.1
sidebar_label: Migrate from JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  What changes between JetPack 6.x and JetPack 7.2.1 on the Jetson Orin Nano
  Super Developer Kit (8GB): the firmware prerequisite, the Super-mode trap,
  the migration checklist, and rollback.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Migrating from JetPack 6.x to JetPack 7.2.1

This page is for owners of a Jetson Orin Nano (Super) Developer Kit moving
from JetPack 6.x to JetPack 7.2.1. New kits: start with
[Quick Start](/tutorials/jetson-orin-nano/quick-start) instead.

JetPack 7.2.1 is a large jump: plan for a full reflash, a firmware
prerequisite, and some software rebuilds.

## What changes

| Layer | JetPack 6.x era | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| OS / root filesystem | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux kernel | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Juxi note:** The 6.x column uses JetPack 6.2.3, the last production
> release of JetPack 6. Check your own versions with `cat /etc/nv_tegra_release`.
> The 7.2.1 VPI value is taken from NVIDIA's package repository rather than its
> download page, which still shows the JetPack 7.2 value — see the note on
> [Verify Your System](/tutorials/jetson-orin-nano/verify-your-system).

- **No more SD-card images.** "Starting with JetPack 7.2, SD Card images are
  no longer supported." The installer is one ISO for a USB stick; a microSD
  card is still a valid install target.
- **A firmware prerequisite.** JetPack 7.2 and later installations require
  JetPack 6.x-generation Jetson UEFI/QSPI firmware; kits with older factory
  firmware must complete the JetPack 6.x update path first. JetPack 7.0 and
  7.1 list no Orin hardware, so 7.2 is the first 7.x release for the family.
- **A different install flow.** The ISO installs from a USB stick to microSD
  or NVMe on the device. It is install-only, not a "live USB".

## Do not upgrade yet if...

- **Your robot depends on Isaac ROS.** The 7.2.1 component matrix lists
  Isaac ROS as "Coming soon", but NVIDIA staff state Isaac ROS 4.6 supports
  JetPack 7.2 — the sources disagree. See [Robotics](/tutorials/jetson-orin-nano/robotics).
- **Your camera code is pinned to the older SIPL API.** SIPL API v2.0.0 in
  Jetson Linux 39.2.1 ships "breaking changes that affect API, ABI, JSON
  schema, package layout, and driver loading". A community report (not
  confirmed by NVIDIA) says the NITO camera configuration is now the default
  and the legacy `NVCAMERA_NITO_PATH=CONFIG` mode no longer works.
- **You cannot re-validate your stack.** CUDA 13 wheels, Python packages,
  and third-party libraries must exist for Ubuntu 24.04 and CUDA 13.2.
  NVIDIA's 7.2.1 pages list no Python or OpenCV versions; for CUDA 13.2
  wheels, NVIDIA staff point to the Jetson AI Lab SBSA index — see
  [Local LLMs](/tutorials/jetson-orin-nano/local-llm).

## What cannot be carried over — plan to rebuild

- **TensorRT engines.** TensorRT moves from 10.3.0 to 10.16.2. Serialized
  engines are tied to the TensorRT version. Rebuild on the target.
- **CUDA binaries.** CUDA moves from 12.6 to 13.2.2, a major jump. Do not
  expect CUDA 12.x binaries to carry over; rebuild with the new toolkit.
- **Out-of-tree kernel modules.** The kernel moves from 5.15 to 6.8.
  Rebuild modules against the new kernel headers.
- **Camera drivers and device tree.** SIPL 2.0 API and ABI changes apply
  (see above).
- **Containers.** Images built for JetPack 6 / L4T r36 stay on the old
  stack; the ISO ships NVIDIA Container Toolkit 1.19. NVIDIA staff state
  Orin Nano can now run mainstream Arm64 "arm64-SBSA" containers.
- **Python environments.** Ubuntu 24.04 uses a newer Python than 22.04.
  Recreate virtual environments; check `python3 --version`.

## Migration checklist

1. **Back up first.** The install erases the target storage you select.
   Copy off the kit: application data, configuration files, camera
   calibration, container volumes, TensorRT build scripts and ONNX models,
   and custom driver or device-tree sources. Record versions with
   `cat /etc/nv_tegra_release` and `apt list --installed | grep nvidia-jetpack`.
2. **Pass the firmware gate.** Power on, press Esc repeatedly at the NVIDIA
   splash, and read the firmware version in the UEFI menu. Firmware 36.x or
   newer is ready for 7.2.1. If it is older than 36.0, first complete the
   "JetPack 6.x Update Path": boot the updated JetPack 5.1.3 SD-card image
   (`JP513-orin-nano-sd-card-image_b29.zip`) as a bridge, let it schedule
   the bootloader update, reboot, install the QSPI updater
   (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`), reboot
   again. Expect several reboots; JetPack 6.2.x may schedule one more
   update after first boot. Units on BSP 36.2 / JetPack 5.0 DP must update
   to a later release first. Check the scheduling with
   `sudo systemctl status nv-l4t-bootloader-config`, and the firmware with
   `sudo nvbootctrl dump-slots-info`.
3. **Create the installer USB.** Write the r39.2.1 Jetson ISO to a USB
   flash drive (16 GB or larger) with Balena Etcher. Do not write the ISO
   to a microSD card. Install the target storage (microSD or NVMe) before
   booting — the installer only offers installed devices.
4. **Install JetPack 7.2.1.** Boot via the UEFI Boot Manager: press Esc at
   the splash, select Boot Manager, select the USB disk (NVIDIA recommends
   this explicit selection).

   > **Important** — Press **Y** at the QSPI capsule update prompt within
   > 30 seconds ("the most commonly missed step"). If it times out, the
   > install fails later. The capsule update runs in two passes and may
   > reboot the kit — this is expected.

   At the GRUB menu, select Install Jetson ISO r39.2.1, select the target
   storage, and confirm (the install erases the storage you select). Remove
   the USB stick after the install when prompted, then complete the Ubuntu
   initial setup (license, language, network, user) and run `sudo apt update`
   and `sudo apt install nvidia-jetpack`.
5. **Confirm the Super profile.** `sudo /usr/sbin/nvpmodel -q` lists the
   power modes; on the desktop, use the top bar: Power Mode, MAXN SUPER.
   With Super Mode enabled, `cat /etc/nv_boot_control.conf` shows a `-super`
   suffix in the TNSPEC line. If they are missing, read the next section.
6. **Re-validate your workloads.** Rebuild TensorRT engines and CUDA
   applications on the target. Recreate Python environments, update
   containers, re-test cameras. Run the checks on
   [Verify Your System](/tutorials/jetson-orin-nano/verify-your-system) — for
   r39.2.1, `cat /etc/nv_tegra_release` should show R39, revision 2.1.

## The Super-mode trap (fixed in 7.2.1)

On a 7.2.0 ISO install, the unit kept its existing board configuration: the
25W and MAXN SUPER power modes were missing, and `sudo nvpmodel -m 2`
failed with "bad power mode 2". NVIDIA documented this in the r39.2 release
notes as issue 6279443: "Units will not default to 'Super' mode after the
update. To use 'Super' mode, you must flash the target using a Linux host
or SDKM." NVIDIA staff later called it an ISO bug, fixed in 7.2.1.

JetPack 7.2.1 flashes the Super configuration by default: "ISO now flashes
the Jetson Orin Nano Developer Kit with Super Mode flashing configuration
by default." Issue 6279443 is not in the r39.2.1 known-issues list.

Two caveats remain:

- **Select the right target when flashing from a host.** In SDK Manager,
  the target is "Jetson Orin Nano [8GB developer kit version]". With the
  flash script, use the `jetson-orin-nano-devkit-super` target, not the
  plain target, to enable Super modes. Example (Developer Guide, NVMe):
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **Re-installing 7.2.1 over an existing system.** NVIDIA: "If you're
  re-installing JetPack 7.2.1 using ISO on an already installed system,
  please carefully follow the instructions in the Getting Started Guide."
  NVIDIA does not state whether a 7.2.1 re-install restores Super mode on a
  unit a 7.2.0 ISO left in non-Super; the documented route is a host flash
  with the Super configuration. Community in-place fixes (editing
  `/etc/nv_boot_control.conf`) are not endorsed by NVIDIA; one user
  reported a boot loop. See [Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting).

## Rollback

NVIDIA staff state: "Downgrade: Yes, you can flash back to JP 6.2.2 via
SDK Manager if needed." A user confirmed the round trip (reflash to 6.2.2,
then re-upgrade to 7.2). The cost, stated honestly:

- **No in-place downgrade.** It is a full reflash from an x86 Ubuntu host
  (official pages list Ubuntu hosts; NVIDIA staff also report the Windows
  SDK Manager works).
- **The target storage is erased.** Your backup is the only copy.
- **Nothing more is guaranteed.** NVIDIA publishes no downgrade procedure,
  and no document states that JetPack 6.x boot media is guaranteed to work
  with r39.2.x QSPI firmware. Treat a downgrade as a reinstall of the old
  stack, plus the same rebuild work.

If only the Super power modes are missing, the narrower fix is a host
reflash with the Super configuration — that keeps 7.x. See
[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates).

## Sources

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — component matrix, SD-card removal, Super-mode default, re-install caution (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — ISO install flow, firmware gate, capsule prompt, MAXN SUPER (checked 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — firmware bridge, version checks (checked 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — GA status, SIPL 2.0 breaking changes (checked 2026-09-26)
- [Jetson Linux 39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — issue 6279443, the Super-mode trap (checked 2026-09-26)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — JetPack 6.x baseline versions (checked 2026-09-26)
- [NVIDIA developer forum — JetPack 7.2 GPU acceleration issue](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — NVIDIA staff: downgrade path and CUDA 13.2 wheel index (checked 2026-09-26)
- [NVIDIA developer forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — NVIDIA staff and users: `-super` TNSPEC check, host reflash (checked 2026-09-26)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official
documentation and developer-forum statements as of the date listed; not yet
verified on physical hardware by Juxi Technology. The rebuild list describes
standard platform consequences — validate against your own stack.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
