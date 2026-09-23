---
title: Robotics on JetPack 7.2 — What Works Today
sidebar_label: Robotics (State of Play)
slug: /tutorials/robotics
description: >-
  An honest status page for robotics development on the AGX Orin Developer Kit
  with JetPack 7.2 — ROS 2, Isaac ROS availability, robot-learning stacks, and
  what to use while the ecosystem catches up.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Robotics on JetPack 7.2 — What Works Today

JetPack 7.2 moved Orin to a new platform generation (Ubuntu 24.04, kernel 6.8,
CUDA 13). Robotics is the one area where the *ecosystem* is still catching up
to the platform — so this page is deliberately a status page, not a tutorial.
Check it before you commit to an architecture.

## Status table (checked 2026-09-24)

| What you need | Status on JetPack 7.2 / AGX Orin | Notes |
|---|---|---|
| **ROS 2 (core)** | ✅ Works | Ubuntu 24.04 is the target platform for ROS 2 **Jazzy**; install per the [ROS 2 installation docs](https://docs.ros.org/en/jazzy/Installation.html). Docker-based ROS 2 is also an option. |
| **Isaac ROS** (hardware-accelerated ROS 2 packages) | ⛔ **Not yet — NVIDIA lists it "coming soon" for JetPack 7** | This is the biggest gap. If Isaac ROS is on your critical path today, stay on **JetPack 6.x** and watch NVIDIA's [downloads page](https://developer.nvidia.com/embedded/jetpack/downloads) for the release. |
| **Local LLM / VLM / VLA models** | ✅ Works | TensorRT Edge-LLM officially supports Orin on JP7.2, including **Vision-Language-Action** examples — see [Local LLM Inference](/tutorials/jetson-agx-orin/local-llm). |
| **Multi-camera video pipelines** | ✅ Works | DeepStream 9.1 ships with JP7.2 — see [DeepStream Video Analytics](/tutorials/jetson-agx-orin/deepstream). |
| **Agentic behaviors / orchestration** | ✅ Works | NemoClaw + Jetson agent skills — see [Agentic AI](/tutorials/jetson-agx-orin/agentic-ai). |
| **Robot-learning stacks (LeRobot-style Python frameworks)** | ⚠️ Verify before committing | These stacks are Python-heavy; Ubuntu 24.04 moved to Python 3.12 and some dependencies may lag. Test your specific stack on JP7.2 before designing around it — and note **we have not verified this on hardware**. |
| **GR00T (humanoid foundation models)** | ⚠️ Check official sources | Follow NVIDIA's official Isaac GR00T repository and announcements for platform support. A partner-published walkthrough reports a full-weight TensorRT deployment on AGX Orin + JP7.2 *(third-party, not verified by us)*. |
| **Custom carrier boards / BSP work** | ✅ New tooling | JetPack 7.2's **Jetson Linux customization agent skills** automate BSP bring-up tasks — see the [agent skills repos](https://github.com/jetson-bsp-skills). |

## Recommendation

- **New projects with no Isaac ROS dependency:** build on JetPack 7.2 — you
  get Ubuntu 24.04 LTS support, CUDA 13, DeepStream 9.1, on-device LLMs, and
  the agent tooling.
- **Projects that depend on Isaac ROS today:** plan on JetPack 6.x for now;
  treat JP7.x as your migration target once Isaac ROS ships for it (our
  [migration guide](/tutorials/jetson-agx-orin/jetpack-6-to-7) covers the rebuild work
  when that day comes).
- **One kit, many modules:** remember your developer kit can emulate the other
  Jetson Orin modules by re-flashing — handy for validating a robot workload
  across the module lineup before choosing a production part
  ([Product Overview](/tutorials/jetson-agx-orin/overview)).

## Sources

- [JetPack 7.2.1 downloads page — Isaac ROS "coming soon" for JetPack 7](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (module emulation; checked 2026-09-24)
- [ROS 2 Jazzy installation documentation](https://docs.ros.org/en/jazzy/Installation.html)

*Status: draft, pending review by cheny. Ecosystem availability changes
quickly — re-check the linked NVIDIA pages before relying on this table. Not
yet verified on physical hardware by Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
