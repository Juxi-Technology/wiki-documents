---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Frequently asked questions about the NVIDIA Jetson Orin Nano Super Developer
  Kit (8GB) — storage, first setup, firmware, power modes, AI workloads, and
  support.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# FAQ

## Before you start

**What's in the box?**
The Jetson Orin Nano Developer Kit, a 19 V power supply, and a quick start and
support card. **There is no storage in the NVIDIA box**: you supply the microSD
card or NVMe SSD, the USB flash drive for the installer, and the monitor and
keyboard — though the Juxi store bundle for this kit adds a 64 GB microSD card
(per the store listing). See [Quick Start](/tutorials/jetson-orin-nano/quick-start).

**Do I need to buy storage?**
Yes — unless you bought the Juxi store bundle, which already includes a 64 GB
microSD card; it covers the target-storage
requirement, so buy an NVMe SSD only if you want more capacity. (The bundled
card ships blank, not pre-imaged — you install the system onto it with the
Jetson ISO.) NVIDIA states:
"Jetson Orin Nano Developer Kit does not include removable storage in the box,
so choose either a microSD card or a NVMe SSD before starting setup." Buy a
microSD card of 64GB UHS-1 or larger (NVIDIA's recommendation) if you received
the bare NVIDIA box, or a PCIe NVMe SSD for one of the carrier board's M.2
Key-M slots. The kit has no eMMC: your card or SSD becomes the system's main
storage. See [Quick Start](/tutorials/jetson-orin-nano/quick-start) and
[Interfaces & Hardware Layout](/tutorials/jetson-orin-nano/interfaces).

**Can I still flash an SD-card image, like on earlier JetPack releases?**
No. Starting with JetPack 7.2, SD-card images are no longer supported. NVIDIA's
instruction: "Do not flash the Jetson ISO to a microSD card — write it to a USB
flash drive, then use it to install Jetson Linux onto your microSD card or NVMe
SSD." The microSD card is still a valid install target; it is just no longer the
medium you write the image to. The ISO USB stick is an installer, not a live
USB — it cannot run a desktop, it only installs the system. See
[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates) and
[JetPack 6 to 7 Migration](/tutorials/jetson-orin-nano/jetpack-6-to-7).

**What exactly do I need before starting?**
You need:

- The kit and its included 19 V power supply.
- A laptop or PC (Windows, Mac, or Linux) with at least 25GB of free space.
- A USB flash drive, 16GB or larger, to hold the installer image.
- Target storage: a microSD card (64GB UHS-1 or larger recommended) and/or an
  NVMe SSD — the Juxi store bundle already includes the 64 GB microSD card.
- A DisplayPort monitor and a USB keyboard and mouse, or a USB-to-TTL serial
  cable for a headless setup.

NVIDIA's guide uses Balena Etcher to write the ISO to the USB stick — copying
the file onto the stick is not enough. Step by step:
[Quick Start](/tutorials/jetson-orin-nano/quick-start).

**Do I need an Ubuntu PC?**
No, not for the recommended path. The Jetson ISO install runs on the kit
itself; your PC only writes the ISO to a USB flash drive, and Windows, Mac, and
Linux all work for that. An Ubuntu x86_64 host PC is only needed for the
alternative methods — SDK Manager or the flash script — for example when you
want to reflash a kit with the Super configuration. Note: the SDK Manager page
documents Ubuntu 20.04 / 22.04 x86_64 hosts, while NVIDIA staff also report
flashing successfully from Windows. See
[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates).

**Where is the microSD slot?**
It is on the underside of the Jetson Orin Nano module, not on the carrier board
edge. Insert the card before you boot the ISO installer; the installer only
offers storage that is already installed. To change the card later: power off,
swap in the new card, and re-run the JetPack 7.2.1 ISO installer with it
inserted — JetPack 7.2 and later have no card image to write. See
[Interfaces & Hardware Layout](/tutorials/jetson-orin-nano/interfaces) and
[Quick Start](/tutorials/jetson-orin-nano/quick-start).

## Setup

**My kit is new — why does the guide say update the firmware first?**
JetPack 7.2 and later installs require JetPack 6.x-generation UEFI/QSPI
firmware on the kit — version 36.x or newer. Kits that shipped with older
factory firmware must complete NVIDIA's "JetPack 6.x Update Path" before the
JetPack 7.2.1 ISO can boot. To check the version: power on with a monitor
attached and press Esc repeatedly at the boot splash; the UEFI menu shows the
firmware version near the top. If it shows 36.x or newer, continue; if it is
older than 36.0, do the update path first. See
[Quick Start](/tutorials/jetson-orin-nano/quick-start),
[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates), and the
[Glossary](/tutorials/jetson-orin-nano/glossary) for terms such as QSPI and capsule update.

**How long does setup take?**
NVIDIA does not publish a total setup time. The official instructions say you
may see white text scrolling on the screen for several minutes, and you should
wait for the installer to complete and reboot when prompted. User reports range
from about 15 minutes to about two hours for a microSD-card install (user
reports, unconfirmed), and first boot then adds the Ubuntu setup screens
(language, network, username). See
[Quick Start](/tutorials/jetson-orin-nano/quick-start).

**What if the installer skips the username/password screens?**
This matches a known report: the QSPI capsule prompt timed out. The installer
asks you to confirm a firmware (QSPI) update and waits only 30 seconds — if the
prompt is missed, later steps can fail, and the language, network, and
username screens may never appear; the next boot can then stop at a black
screen with a cursor. The fix from the official guide: restart the installation
and press Y when the capsule prompt appears. Some users also cleaned leftover
partitions before retrying, or installed with SDK Manager instead (user
reports; NVIDIA staff acknowledged the thread). See
[Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting).

> **Important** When the installer shows the QSPI capsule update prompt, press
> **Y** within 30 seconds. NVIDIA calls this "the most commonly missed step".

**How do I get a serial console?**
Connect a USB-to-TTL serial cable to the Button Header: RXD pin 3 connects to
the adapter's TX wire, TXD pin 4 connects to the adapter's RX wire, and GND pin
7 connects to the adapter's ground wire. Then open a serial console on your PC,
power on, and press Esc during the pre-boot screen to enter UEFI / Boot
Manager — you can complete the whole ISO installation this way. One honest gap:
NVIDIA's pages say "open a serial console on your PC" but do not state a baud
rate or a terminal program. When the kit is connected to a PC over USB-C in
device mode, it also presents a "USB Serial device for serial terminal access".
See [Interfaces & Hardware Layout](/tutorials/jetson-orin-nano/interfaces) and
[Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting).

## Power and performance

**Why is there no 25W / MAXN SUPER option?**
Your kit was flashed with the non-Super boot configuration, so only 7W and 15W
modes appear. This was documented JetPack 7.2 ISO issue 6279443: ISO installs
kept the pre-update profile instead of switching to "Super". JetPack 7.2.1
fixes this for new installs — the ISO "now flashes the Jetson Orin Nano
Developer Kit with Super Mode flashing configuration by default"; NVIDIA does
not say whether a 7.2.1 reinstall converts a 7.2.0-ISO kit. Check
`/etc/nv_boot_control.conf`: a Super configuration shows a `-super` suffix. To
fix an existing 7.2 install, reflash with the Super configuration from an
Ubuntu host (SDK Manager or the flash script); the Power Mode menu then offers
15W, 25W (default), and MAXN SUPER. See
[Verify Your System](/tutorials/jetson-orin-nano/verify-your-system),
[Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting), and
[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates).

> **Juxi note:** A community in-place fix exists (edit
> `/etc/nv_boot_control.conf`, reconfigure the bootloader, remove
> `/etc/nvpmodel.conf`, reboot). Multiple users report success, but NVIDIA has
> not endorsed it and one user reported a boot loop.

## AI workloads

**How big a model can 8 GB run?**
The 8GB of LPDDR5 is unified memory, shared by the CPU, the GPU, and the
operating system — about 7.6GB is usable after firmware and kernel
reservations. NVIDIA's published guidance: with 4-bit quantization and
memory-efficient runtimes, you can fit LLMs up to roughly 10B parameters and
VLMs up to roughly 4B parameters. TensorRT Edge-LLM's official Orin Nano 8GB
benchmarks cover models up to 2B, and that is the largest model class NVIDIA
benchmarks on this kit. A model can fail to load even when the file seems to
fit, because the KV cache also needs memory; 7.4GB and 16GB GGUFs have failed
to load on an 8GB kit (user reports). See
[Local LLMs on 8GB](/tutorials/jetson-orin-nano/local-llm) and
[Memory Efficiency](/tutorials/jetson-orin-nano/memory-efficiency).

## Support and service

**What is the support route?**
Start with NVIDIA's official [Troubleshooting page](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html),
which covers the five common setup problems: the ISO does not boot, no display
output, the installer does not show target storage, a firmware update is
needed, and a Docker permission error. For platform questions, use the NVIDIA
Jetson developer forums, listed on the official [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)
page; search before posting, and include the output of
`cat /etc/nv_tegra_release`. Juxi Technology contacts:

- Technical support: **support@juxitech.com**
- Orders, warranty, and RMA: **support@juxitech.com** (include the order number)
- Sales and quotations: **sales@juxitech.com**
- Product questions (selection, compatibility): **pe@juxitech.com**

Official downloads and reference links: [Downloads](/tutorials/jetson-orin-nano/downloads).

> **Juxi note:** Some forum replies labelled as NVIDIA staff are auto-generated
> AI answers (they begin with "This is an automated AI response"). Treat those
> as non-authoritative and prefer the official documentation.

## Sources

- Jetson Orin Nano Developer Kit User Guide — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (checked 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-26)
- Jetson Linux Release Notes — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (checked 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (checked 2026-09-26)
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (checked 2026-09-26)
- NVIDIA developer forums — [boot hang / skipped username setup thread](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [25W / MAXN SUPER thread](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (checked 2026-09-26)
- [Juxi Technology store listing — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (checked 2026-09-26)

*Status: draft, pending review by cheny.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
