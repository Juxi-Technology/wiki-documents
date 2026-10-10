---
title: Robotics on JetPack 7.2 — What Works Today
sidebar_label: Robotics (State of Play)
slug: /tutorials/robotics
description: >-
  An honest status page for robotics development on the AGX Orin Developer Kit
  with JetPack 7.2 — ROS 2, Isaac ROS availability, robot-learning stacks, and
  what to check before you commit.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Robotics on JetPack 7.2 — What Works Today

JetPack 7.2 moved Orin to a new platform generation (Ubuntu 24.04, kernel 6.8,
CUDA 13). Robotics is mixed: the core pieces (ROS 2, Isaac ROS) are now in
place on this platform, while parts of the surrounding stack are still
settling — so this page is deliberately a status page, not a tutorial. Check
it before you commit to an architecture.

## Status table (checked 2026-09-24; Isaac ROS row re-checked 2026-09-26)

| What you need | Status on JetPack 7.2 / AGX Orin | Notes |
|---|---|---|
| **ROS 2 (core)** | ✅ Works | Ubuntu 24.04 is the target platform for ROS 2 **Jazzy**; install per the [ROS 2 installation docs](https://docs.ros.org/en/jazzy/Installation.html). Docker-based ROS 2 is also an option. |
| **Isaac ROS** (hardware-accelerated ROS 2 packages) | ✅ **Supported since Isaac ROS 4.6.0** (2026-08-18) | Released for JetPack 7.2 on Jetson Orin, with an official AGX Orin setup walkthrough. Your real decision is the ROS 2 distribution: **4.6.x on Jazzy** vs **5.0 on Lyrical** — see [Isaac ROS on JetPack 7.2](#isaac-ros-on-jetpack-7-2). |
| **Local LLM / VLM / VLA models** | ✅ Works | TensorRT Edge-LLM officially supports Orin on JP7.2, including **Vision-Language-Action** examples — see [Local LLM Inference](/tutorials/jetson-agx-orin/local-llm). |
| **Multi-camera video pipelines** | ✅ Works | DeepStream 9.1 ships with JP7.2 — see [DeepStream Video Analytics](/tutorials/jetson-agx-orin/deepstream). |
| **Agentic behaviors / orchestration** | ✅ Works | NemoClaw + Jetson agent skills — see [Agentic AI](/tutorials/jetson-agx-orin/agentic-ai). |
| **Robot-learning stacks (LeRobot-style Python frameworks)** | ⚠️ Verify before committing | These stacks are Python-heavy; Ubuntu 24.04 moved to Python 3.12 and some dependencies may lag. Test your specific stack on JP7.2 before designing around it — and note **we have not verified this on hardware**. |
| **GR00T (humanoid foundation models)** | ⚠️ Check official sources | Follow NVIDIA's official Isaac GR00T repository and announcements for platform support. A partner-published walkthrough reports a full-weight TensorRT deployment on AGX Orin + JP7.2 *(third-party, not verified by us)*. |
| **Custom carrier boards / BSP work** | ✅ New tooling | JetPack 7.2's **Jetson Linux customization agent skills** automate BSP bring-up tasks — see the [agent skills repos](https://github.com/jetson-bsp-skills). |

## Isaac ROS on JetPack 7.2

The "coming soon" era is over. Isaac ROS release **4.6.0** (2026-08-18) added
support for **Jetson Orin** and **JetPack 7.2**, and the supported-platforms
table pairs *Jetson Orin* with *JetPack 7.2* (128+ GB NVMe SSD). NVIDIA
publishes a dedicated **Jetson AGX Orin** quick-start and Docker setup
walkthrough for this combination — this kit is a first-class target, not an
afterthought.

The decision that actually matters is which **ROS 2 distribution** you adopt:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| Released | 2026-08-18 | 2026-09-21 |
| ROS 2 distribution | **Jazzy** — the standard Ubuntu 24.04 release | **Lyrical Luth** — NVIDIA builds the ROS 2 Noble packages itself and serves them from its buildfarm CDN |
| NITROS packages | Present | **Removed** and rebuilt natively on `rosidl::Buffer`; code that calls NITROS APIs or types directly needs a source-level migration |
| Isaac Sim pairing | 6.0 (5.0/5.1 still supported as legacy) | 6.0 |

- Starting fresh and want the mainstream path: **4.6.x on Jazzy** keeps you on
  the standard ROS 2 release. **5.0** is where NVIDIA is heading and brings the
  Lyrical ecosystem — read the NITROS-to-`rosidl::Buffer` migration guidance
  linked from the [5.0.0 release notes](https://nvidia-isaac-ros.github.io/releases/index.html)
  before upgrading existing node code.
- **Known constraints on Orin** at these versions: RealSense cameras work in
  **Docker mode only**; with `isaac_ros_stereo_image_proc`, selecting
  `backend:=JETSON` on AGX Orin with RGB8/BGR8 input can abort the node with a
  VPI error — keep the default `backend:=CUDA`; Teleop from the Debian package
  needs `ISAAC_TELEOP_CLOUDXR_EXP=0` on Orin; and 5.0's
  `isaac_ros_dnn_image_encoder` preprocessing is slower than 4.6 on AGX Orin —
  if that node is hot in your graph, prefer 4.6.
- **OpenCV:** JetPack 7.2 ships OpenCV **4.8.0**, while Isaac ROS expects
  **4.6.0**. Remove the system packages
  (`sudo apt-get remove -y libopencv* opencv*`) and the Isaac ROS packages
  install their pinned version.

### What NVIDIA's own pages disagree about

NVIDIA's [JetPack downloads page](https://developer.nvidia.com/embedded/jetpack/downloads)
still lists Isaac ROS as **"coming soon"** for this release, while the Isaac
ROS release notes claim support since 4.6.0. The two pages have not been
reconciled — Isaac ROS is released independently of JetPack, and the JetPack
page's component table tracks what ships *with* JetPack. The apt repositories
the Isaac ROS docs point to are the hard evidence for the supported
combination: `…/isaac-ros/release-4.6 noble-jetpack` — *noble* for Ubuntu
24.04, *jetpack* for the JetPack build. When the two disagree, treat the
[Isaac ROS release notes](https://nvidia-isaac-ros.github.io/releases/index.html)
as the operative source, and verify on your own setup before designing around
either.

## Recommendation

- **New projects with no robotics dependency:** build on JetPack 7.2 — you
  get Ubuntu 24.04 LTS support, CUDA 13, DeepStream 9.1, on-device LLMs, and
  the agent tooling.
- **Projects using Isaac ROS:** JetPack 7.2 is a supported target again.
  Choose 4.6.x (Jazzy) or 5.0 (Lyrical) deliberately, and budget for the
  OpenCV swap and Docker-mode-only RealSense support. If you are mid-project
  on JetPack 6.x with a validated stack, there is no forced march — migrate
  when your Isaac ROS version choice is settled (our
  [migration guide](/tutorials/jetson-agx-orin/jetpack-6-to-7) covers the rebuild work).
- **One kit, many modules:** remember your developer kit can emulate the other
  Jetson Orin modules by re-flashing — handy for validating a robot workload
  across the module lineup before choosing a production part
  ([Product Overview](/tutorials/jetson-agx-orin/overview)).

## Sources

- [Isaac ROS releases — 4.6.0 (2026-08-18) and 5.0.0 (2026-09-21) release notes](https://nvidia-isaac-ros.github.io/releases/index.html) (checked 2026-09-26)
- [Isaac ROS 4.6 — Getting Started: supported platforms, Jetson AGX Orin walkthrough, apt install](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (checked 2026-09-26)
- [Isaac ROS 5.0 — Getting Started: supported platforms, Lyrical buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/index.html) (checked 2026-09-26)
- [JetPack 7.2.1 downloads page — component list](https://developer.nvidia.com/embedded/jetpack/downloads) — still carries the stale Isaac ROS "coming soon" row (checked 2026-09-26)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (module emulation; checked 2026-09-24)
- [ROS 2 Jazzy installation documentation](https://docs.ros.org/en/jazzy/Installation.html)

*Status: reviewed on 2026-10-11. Ecosystem availability changes
quickly — re-check the linked NVIDIA pages before relying on this table. Not
yet verified on physical hardware by Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
