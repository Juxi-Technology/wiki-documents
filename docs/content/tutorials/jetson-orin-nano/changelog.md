---
title: Changelog
sidebar_label: Changelog
slug: /appendix/changelog
description: >-
  Updates to this documentation set, and the JetPack release history for the
  NVIDIA Jetson Orin Nano Super Developer Kit.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Changelog

## Documentation updates

| Date | Change |
|---|---|
| 2026-09-26 | Initial documentation set published as draft: Quick Start, Flashing & Updates, Verify Your System, Product Overview, Interfaces & Hardware Layout, FAQ, Troubleshooting, Downloads, the JetPack 6.x → 7.2 migration guide, five tutorials (Local LLM, Memory Efficiency, DeepStream, Robotics, Agentic AI), Glossary, and this Changelog. Written against NVIDIA's official documentation for JetPack 7.2.1; not yet verified on physical hardware. |

## JetPack releases for this kit

| JetPack | Jetson Linux (L4T) | Date | Notes |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Current.** The ISO now flashes the Orin Nano Developer Kit with the Super Mode configuration by default, which addresses the r39.2 issue where ISO-updated units stayed on their previous power profile. |
| 7.2 | 39.2.0 | 2026-06 | First JetPack 7 release for the Orin family (Ubuntu 24.04, kernel 6.8, CUDA 13.x). Known issue on this release: units updated via the Jetson ISO did not default to Super mode — see [Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting). |
| 6.2.x | 36.x | 2025 | JetPack 6 line for this kit (Ubuntu 22.04). This is where the "Super" power mode was introduced — the same hardware, with higher CPU/GPU/memory clocks and the 25 W mode. |
| 6.0 / 6.1 | 36.x | 2024–2025 | Earlier JetPack 6 releases. |
| 5.1.3 | 35.x | 2023–2024 | Oldest firmware line still referenced today: the JetPack 6.x Update Path uses a 5.1.3 bridge image to bring very old kits up to JetPack 6.x-generation firmware before JetPack 7 can be installed. |

Full histories: [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

To update your kit, see **[Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates)**;
to check what you are running, see **[Verify Your System](/tutorials/jetson-orin-nano/verify-your-system)**.

## Sources

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (checked 2026-09-26)
- [NVIDIA JetPack 6.2 announcement — Super mode for Jetson Orin Nano](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (linked as the vendor announcement of the Super power mode)

*Status: draft, pending review by cheny. Grounded in NVIDIA's official
documentation as of the dates listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
