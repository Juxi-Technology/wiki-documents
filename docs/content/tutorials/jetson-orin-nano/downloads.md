---
title: Downloads & Official Links
sidebar_label: Downloads
slug: /downloads
description: >-
  A checked index of official NVIDIA downloads and documentation for the
  Jetson Orin Nano Super Developer Kit (8GB) on JetPack 7.2.1 / L4T r39.2.1,
  plus partner resources and the Juxi Technology entry points.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Downloads & Official Links

This page is an index of the NVIDIA-official downloads and documentation for
the **Jetson Orin Nano Super Developer Kit (8GB)** on **JetPack 7.2.1 /
Jetson Linux (L4T) r39.2.1**, plus a few partner resources and the Juxi
Technology entry points. All links were checked on **2026-09-26**.

Two Orin Nano-specific facts matter before you download anything:

- **No SD-card image.** Starting with JetPack 7.2, the kit is installed from the
  Jetson ISO written to a USB flash drive. There is no SD-card image, and the
  ISO must not be written to a microSD card.
- **Firmware gate.** JetPack 7.2.1 requires JetPack 6.x-generation UEFI/QSPI
  firmware on the kit. If your kit still has older factory firmware, complete
  the JetPack 6.x Update Path first.

> **Juxi tip:** The full setup flow is in [Quick Start](/tutorials/jetson-orin-nano/quick-start). The flashing and update options are compared in [Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates).

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — the main JetPack page: release notes, the official component version table, and every JetPack 7.2.1 download link.

> ⚠️ **Do not trust that component table row by row.** NVIDIA has not refreshed it fully for 7.2.1: the CUDA row was updated, but the two rows next to it were not — VPI still shows the JetPack 7.2 value (**4.1.3, while 7.2.1 actually ships 4.1.4**) and the Isaac ROS row still says "coming soon" although Isaac ROS has supported Orin on JetPack 7.2 since its August 2026 release. For component versions, treat NVIDIA's package repository as authoritative: the metapackage pins each component through its dependency chain — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages), where `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` (checked 2026-09-26). Component versions are also listed on [Verify Your System](/tutorials/jetson-orin-nano/verify-your-system).
- [Jetson ISO for r39.2.1 (direct download)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — the installer image for JetPack 7.2.1; the kit's Quick Start page links it as "Direct Download Link: Jetson ISO (r39.2.1)". Write it to a USB flash drive of 16 GB or more. No checksum is published alongside the download.
- [NVIDIA SDK Manager documentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — install and use the host-PC tool for flashing the kit, updating firmware, and installing JetPack components (an NVIDIA Developer Program account is required); the kit workflow is in [BSP Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html).
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) — earlier JetPack releases, including JetPack 7.2 (the first 7.x release that supports the Orin family) and the JetPack 6.x line.

## Documentation

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — the primary reference for this kit.
  - [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — what is new in JetPack 7.2.1, the GA statement, and the known issues list.
- [Jetson Linux r39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — release notes for JetPack 7.2.
- [Jetson Linux Developer Guide (r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — flashing targets, partition configuration, and the platform power and performance tables.
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — NVIDIA's own list of further resources for this kit (JetPack SDK, Developer Guide, SDK Manager documentation, Jetson Download Center, Jetson AI Lab, developer forums, Jetson Ecosystem).
- [Jetson Download Center](https://developer.nvidia.com/embedded/downloads) — NVIDIA's download index for Jetson; the kit guide points here for the Carrier Board Specification and the supported-components list. Parts of it require an NVIDIA login.

## AI frameworks & tutorials

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — NVIDIA's on-device LLM inference stack for Jetson. Orin is an officially supported target with FP16, INT8, and INT4 only ([support matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [supported models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — video analytics on Jetson; DeepStream 9.1 is the release that supports the Orin family on JetPack 7.2 ([Quickstart](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Docker containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — a partner-run hub of hands-on tutorials for running AI models on Jetson, including a [TensorRT Edge-LLM walkthrough for Orin Nano 8 GB](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/).
- [SBSA wheel index (CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — partner-hosted index of aarch64 Python wheels for JetPack 7.2 / CUDA 13.2; NVIDIA staff point to this index for the release's Python wheels.

## Juxi Technology

- **Wiki:** [wiki.juxitech.com](https://wiki.juxitech.com/) — this documentation series; the [product catalog](https://wiki.juxitech.com/products/) lists cameras, sensors, and accessories for Jetson kits.
- **Store:** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — the Juxi store listing for this kit (SKU JX00110).
- **Contacts:** technical support — support@juxitech.com · sales — sales@juxitech.com · product questions — pe@juxitech.com.

## Sources

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (checked 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) and [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (checked 2026-09-26)
- [NVIDIA package repository — r39.2 arm64 Packages index](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — authoritative for component versions, via the dependency locks in the metapackages (checked 2026-09-26)
- Jetson Linux Release Notes — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (checked 2026-09-26)
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (checked 2026-09-26)
- [NVIDIA SDK Manager documentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (checked 2026-09-26)
- [TensorRT Edge-LLM documentation](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA wheel index](https://pypi.jetson-ai-lab.io/sbsa/cu130) (checked 2026-09-26)
- [Juxi Technology store product page](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) and [wiki](https://wiki.juxitech.com/) (checked 2026-09-26)

*Status: draft, pending review by cheny.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
