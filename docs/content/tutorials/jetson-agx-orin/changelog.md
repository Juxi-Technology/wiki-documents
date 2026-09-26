---
title: Changelog
sidebar_label: Changelog
slug: /appendix/changelog
description: >-
  Updates to this documentation set, and the JetPack release history for the
  Jetson AGX Orin Developer Kit.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: source for the CUDA 13.2.2 / VPI 4.1.4 correction
review_owner: cheny
---

# Changelog

## Documentation updates

| Date | Change |
|---|---|
| 2026-09-26 | **Corrected two component versions for JetPack 7.2.1: CUDA 13.2.1 → 13.2.2 and VPI 4.1.3 → 4.1.4.** Both had been taken from NVIDIA's JetPack downloads page, whose summary table still carries JetPack **7.2** values; the versions were verified through the `nvidia-jetpack` 7.2.1 dependency chain in NVIDIA's Jetson apt repository. Updated **Verify Your System** (table source note), **Glossary**, **FAQ**, the **JetPack 6.x → 7.2 migration guide**, and the product page. Also added a "this table lags" caveat wherever that page is cited as a component-version source (**Downloads**, **Glossary**, **DeepStream**, **migration guide**). |
| 2026-09-26 | **Corrected the Isaac ROS status on JetPack 7.2.** Isaac ROS 4.6.0 (2026-08-18) added support for Jetson Orin + JetPack 7.2, superseding the "coming soon" status previously taken from the JetPack downloads page (which still shows it). Updated **Robotics** (new version and ROS 2 distribution guidance), **Verify Your System**, the **JetPack 6.x → 7.2 migration guide**, and the **FAQ**. |
| 2026-09-24 | Added **Glossary** and this **Changelog**. Added Juxi Technology contact information (technical support, sales, product questions) to FAQ, Troubleshooting, and Downloads; linked the Juxi product catalog for accessories. |
| 2026-09-23 | Initial documentation set published as draft: Quick Start, Flashing & Updates, Verify Your System, Product Overview, Interfaces & Hardware Layout, FAQ, Troubleshooting, Downloads, and the JetPack 6.x → 7.2 migration guide. All pages written against NVIDIA's official documentation. |

## JetPack releases for this kit

| JetPack | Jetson Linux (L4T) | Date | Notes |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Current.** Fixes and security updates; T3000 emulation; agent skills for video pipelines. |
| 7.2 | 39.2.0 | 2026-06 | First release bringing the Jetson Orin family into JetPack 7 (Ubuntu 24.04, kernel 6.8, CUDA 13). |
| 6.x | 36.x | 2024–2025 | Previous generation (Ubuntu 22.04, kernel 5.15, CUDA 12) — see the archives if you are still on it, and our [migration guide](/tutorials/jetson-agx-orin/jetpack-6-to-7). |

Full histories: [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

To update your kit, see **[Flashing & Updates](/tutorials/jetson-agx-orin/flashing-and-updates)**;
to check what you're running, see **[Verify Your System](/tutorials/jetson-agx-orin/verify-your-system)**.

## Sources

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-24)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (checked 2026-09-24)

*Status: draft, pending review by cheny.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
