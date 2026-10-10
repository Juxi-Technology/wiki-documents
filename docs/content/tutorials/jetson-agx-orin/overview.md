---
title: Product Overview — Jetson AGX Orin Developer Kit
sidebar_label: Product Overview
slug: /product/overview
description: >-
  What the NVIDIA Jetson AGX Orin Developer Kit (64GB) is, what it is used for,
  and where it sits in the Jetson Orin lineup.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# Product Overview

![Jetson AGX Orin Developer Kit](/images/jetson-agx-orin/jaodk_1024px.png)

The NVIDIA® Jetson AGX Orin™ Developer Kit is the flagship developer kit of the
Jetson Orin family: a compact AI computer for developing and prototyping
robotics, computer-vision, and generative-AI applications at the edge. This
guide covers the **64GB** developer kit.

## Key facts (verified against NVIDIA's documentation)

- The developer kit shares **one SoC architecture with every Jetson Orin
  module**, so it can **emulate the performance and power** of AGX Orin, Orin NX,
  or Orin Nano modules by re-flashing. It ships configured for the **Jetson AGX
  Orin series** by default. *(Developer Kit User Guide)*
- NVIDIA rates the AGX Orin module family at **up to 275 TOPS** for AI
  performance, with power configurable between **15W and 60W**. *(NVIDIA product
  page)*
- The 64GB module's GPU is a **2048-core NVIDIA Ampere architecture GPU with 64
  Tensor Cores**. *(NVIDIA product page, comparison table)*
- The included reference carrier board exposes standard interfaces — DisplayPort,
  10GBASE-T Ethernet, USB 3.2, M.2 (NVMe and Wi-Fi), 40-pin header, PCIe, camera
  connector, and more. See **[Interfaces & Hardware Layout](/tutorials/jetson-agx-orin/interfaces)**.

## What the developer kit is for

- **Development and prototyping** — the kit is the reference platform for
  applications that will eventually run on Jetson Orin modules in production.
- **Performance and power exploration** — because it emulates the other Orin
  modules, one kit lets you test workloads across the module lineup before
  committing to a production part.
- **Edge AI workloads** — computer vision, robotics, and local generative AI
  (see our tutorials section as it grows).

> **Juxi note:** Production products are built on Jetson Orin *modules*
> (64GB / 32GB / Industrial versions) mounted on your own or a partner carrier
> board. The developer kit is the development vehicle, not the production part.

## In the box

Jetson AGX Orin module and reference carrier board, Wi-Fi module, USB Type-C
power supply, and a USB Type-C to USB Type-A cable. For what you need to supply
yourself, see **[Quick Start](/tutorials/jetson-agx-orin/quick-start)**.

## Where to go next

- **[Quick Start](/tutorials/jetson-agx-orin/quick-start)** — from the box to a working JetPack 7.2.1 system
- **[Interfaces & Hardware Layout](/tutorials/jetson-agx-orin/interfaces)** — every port and connector
- **[Downloads](/tutorials/jetson-agx-orin/downloads)** — official images, tools, and documentation links *(page in progress)*

## Sources

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (checked 2026-09-23)
- [NVIDIA Jetson Orin product page](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) (checked 2026-09-23)

*Status: reviewed on 2026-10-11. A complete module specification table
will be added from NVIDIA's official data sheet; until then, treat NVIDIA's
product page as the authoritative source for specifications.*

**Image credits:** Product image from NVIDIA's official *Jetson AGX Orin
Developer Kit User Guide* (downloaded 2026-09-23), © NVIDIA Corporation.

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
