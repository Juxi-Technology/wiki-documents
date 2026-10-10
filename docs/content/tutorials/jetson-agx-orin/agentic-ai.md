---
title: Agentic AI — NemoClaw on JetPack 7.2
sidebar_label: Agentic AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Deploy NVIDIA NemoClaw on the AGX Orin Developer Kit — single-command
  install, Jetson agent skills, and practical notes for always-on agents.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# Agentic AI — NemoClaw on JetPack 7.2

JetPack 7.2 makes your kit **agentic-ready**: NVIDIA NemoClaw installs with a
single command, and NVIDIA's agent skills automate much of the platform work
that used to be manual.

## What NemoClaw is

Per NVIDIA: NemoClaw is an open stack/blueprint collection for building
**autonomous agents** — always-on AI systems that reason, plan, and act. It
adds privacy and security controls (via **OpenShell** runtime policy controls)
to the OpenClaw agent ecosystem, and packages NVIDIA components such as
Nemotron models and NeMo. JetPack 7.2 comes **preconfigured with the required
dependencies**, so no manual environment setup is needed on your kit.

- NemoClaw product page: <https://www.nvidia.com/en-us/ai/nemoclaw>
- NemoClaw on GitHub: <https://github.com/NemoClaw> · community examples: <https://github.com/nemoclaw-community>

## Install (single command, official)

On the kit (JetPack 7.2+), run:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **Security note — read before running:** this installs an always-on agent
> framework. Review what the agent is allowed to access and which credentials
> it can use *before* enabling it, prefer scoped/revocable tokens, and use
> OpenShell's policy controls. Don't leave an agent unattended with access you
> can't revoke.

## After install — where to go next

NVIDIA maintains a **Build-a-Claw Resource Hub** with installation guidance,
cloud trials, and learning resources: <https://www.nvidia.com/en-us/ai/build-a-claw>

Also useful:

- NVIDIA Deep Learning Institute course: *Securing Agents With NemoClaw and OpenShell* (see the resource hub)
- NVIDIA Developer Discord — `#nemoclaw` channel
- Third-party walkthroughs (e.g., [Seeed Studio's NemoClaw guide](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/), written for a Jetson Thor robot arm) document post-install flows such as `nemoclaw onboard` — treat these as community guidance and follow NVIDIA's hub for the authoritative flow.

## Jetson agent skills — automate the platform work

JetPack 7.2 ships **agent skills**: repeatable, agent-executable workflows for
Jetson development. Three categories per NVIDIA:

| Skill category | What it automates |
|---|---|
| **Jetson Linux customization** | Building/customizing a BSP for custom carrier boards — I/O config, clocks, fan control, power profiles |
| **Memory optimization** | Auditing bootloader carveouts, kernel reservations, and user-space memory to fit more capable workloads in less memory |
| **Model benchmarking** | Finding the optimal model configuration and diagnostics for your device |

More agent skills in the ecosystem:

- [Jetson device-side skills](https://github.com/jetson-device-skills) · [Jetson BSP skills](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — agent-assisted vision pipeline building (see [our DeepStream tutorial](/tutorials/jetson-agx-orin/deepstream))
- [Metropolis VSS blueprint skills](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — video search and summarization workflows

## Practical notes for the AGX Orin kit

- **Always-on agents need dedicated compute** — that's the point of running
  them on a kit rather than a laptop that sleeps; plan power and thermals
  accordingly (see the power-mode notes in
  [Troubleshooting](/tutorials/jetson-agx-orin/troubleshooting)).
- **Model choice matters for memory** — local models on Orin run well within
  64GB, but always-on agents accumulate context. See
  [Memory Efficiency](/tutorials/jetson-agx-orin/memory-efficiency) for the levers, and
  [Local LLM Inference](/tutorials/jetson-agx-orin/local-llm) for on-device model performance.
- **This space moves fast.** Treat the commands above as the current official
  path; check the resource hub for updates before scripting deployments.

## Sources

- [NVIDIA Technical Blog — JetPack 7.2 agentic AI (install command, agent skills, release features)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (checked 2026-09-24)
- [NVIDIA NemoClaw product page](https://www.nvidia.com/en-us/ai/nemoclaw) (checked 2026-09-24)
- [JetPack 7.2.1 downloads page](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-24)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
