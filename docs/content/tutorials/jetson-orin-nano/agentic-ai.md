---
title: Agentic AI — NemoClaw on the 8 GB Orin Nano
sidebar_label: Agentic AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Install and run NVIDIA NemoClaw, the always-on agent stack, on the 8 GB
  Jetson Orin Nano Super Developer Kit — official install, honest 8 GB
  expectations, and security notes.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Agentic AI — NemoClaw on the 8 GB Orin Nano

Your kit can run NVIDIA NemoClaw, an always-on autonomous agent, installed with a single command. This page covers what NemoClaw is, the official install, the agent skills around it, honest 8 GB expectations, and the security decisions it requires.

## What NemoClaw is

NVIDIA describes NemoClaw as "a collection of open blueprints for building autonomous agents" — always-on AI systems that reason, plan, and act across real-world workflows. It bundles agent harnesses (OpenClaw, Hermes, LangChain Deep Agents) with NVIDIA Agent Toolkit components: Nemotron models, NeMo, and OpenShell runtime policy controls.

OpenShell is the security layer: "the secure runtime inside it that enforces what the agent can access: files, networks, credentials, and tools."

NemoClaw is alpha software — NVIDIA labels it "Early preview" (since 2026-03-16). Product page: <https://www.nvidia.com/en-us/ai/nemoclaw> · Build-a-Claw hub: <https://www.nvidia.com/en-us/ai/build-a-claw/>

## Install — the official single command

On the kit, run NVIDIA's installer:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

This installs the default harness, **OpenClaw**. Two others are selectable with an environment variable:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

On this kit, the installer auto-detects Jetson (Orin and Thor) and applies JetPack host configuration first; on L4T 39.x it loads the `br_netfilter` module only when missing (without it, the sandbox fails DNS resolution and onboarding hangs at "Setting up OpenClaw inside sandbox"). If you select Ollama, the installer installs it too: "The script also installs ollama (if ollama is selected) so you don't need to manually install it first" (NVIDIA staff). NVIDIA's site documents this device: "Install OpenClaw on Your NVIDIA Jetson Orin Nano" — "a fully local AI personal assistant on Jetson … no cloud APIs needed."

> **Important** — NemoClaw's platform-support matrix (v1.1, 2026-09-04) has no Jetson row; its tested platforms are Linux (Ubuntu 24.04) and DGX OS Spark. Orin Nano support is real in practice — the installer detects the board and NVIDIA documents the flow — but it is not published as formally supported, so expect rough edges.

Requirements that matter here (from NVIDIA's NemoClaw prerequisites page):

| Requirement | Min / recommended | On this kit |
|---|---|---|
| RAM | 8 GB / 16 GB | 8 GB total — at the floor |
| Free disk | 20 GB | No built-in storage; use microSD or NVMe ([Quick Start](/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | Install separately |
| Container runtime | Docker Engine / Desktop / Colima | Socket fix: `sudo usermod -aG docker $USER`, then `newgrp docker` |

## After install — first session

NVIDIA staff point to the [Jetson AI Lab walkthrough](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (vendor guide) for the Orin flow:

1. `curl -fsSL https://ollama.com/install.sh | sh` — or skip it; the NemoClaw installer can install Ollama too.
2. Pull a 4B-class tool-calling model, such as Nemotron3 Nano 4B (the guide's `nemotron-3-nano:30b` example targets larger devices).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. Onboard: select Ollama as the model source, and choose the tightest sandbox policy tier that works.
5. `source ~/.bashrc`, then `nemoclaw my-assistant connect`; start the agent with `openclaw tui`.

## Agent skills

NVIDIA also ships **agent skills** — packaged workflows in the open Agent Skills format that extend AI coding assistants (Claude Code, Cursor, Codex) with device-specific automation. Two domains are documented for this era:

- **Physical AI (robotics).** Isaac ROS ships a catalog of agent skills — per NVIDIA, tasks such as activating the Isaac ROS development container and bringing up the Mission Control cloud stack. The catalog is at <https://github.com/nvidia/skills> (the "Physical AI" category), installed with `npx` (Node.js is not part of the standard Isaac ROS environment). Isaac ROS 5.0 adds an `isaac-ros-activate` CLI and an early-access `migrate-node-to-rosidl-buffer` skill. See [Robotics](/tutorials/jetson-orin-nano/robotics).
- **Video pipelines.** The L4T r39.2.1 release notes list "Agent skills for video pipelines" among the What's New items.

One honest gap: the sources for this page document NVIDIA agent skills for Isaac ROS (Physical AI) and for video pipelines; none documents a NemoClaw-specific skill catalog.

## Realistic expectations for 8 GB

An always-on agent, a local model, and the Ubuntu desktop do not all fit comfortably on this kit at the same time. The documented budget:

- **Usable memory is ~7.6 GB, not 8 GB.** NVIDIA: "of the 8 GB physical DRAM, roughly 7.6 GB is usable after firmware and kernel reservations."
- **8 GB is NemoClaw's floor, not a comfort zone.** The prerequisites list 8 GB as the minimum and 16 GB as recommended: "On machines with less than 8 GB of RAM, this combined usage can trigger the OOM killer. If you cannot add memory, configure at least 8 GB of swap to work around the issue at the cost of slower performance." This kit's memory is fixed — plan the swap file ([Memory Efficiency](/tutorials/jetson-orin-nano/memory-efficiency)). The ~2.4 GB sandbox image push has already triggered OOM on an 8 GB Orin Nano.
- **The agent and desktop take memory before the model loads.** A community guide on NVIDIA's forums puts the OpenClaw runtime at up to ~1 GB; disabling the graphical desktop frees up to ~865 MB (NVIDIA's number), and a community measurement puts GNOME at over 600 MB.
- **The oversized-model failure is documented in a community report on NVIDIA's forums.** Ollama on an 8 GB board failed to load a 7.4 GB model and a 16 GB model: `cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache`. File size alone is not the fit test — the KV cache must fit in the same 8 GB.

What fits, per the sources: NVIDIA's validated Ollama defaults (`qwen3.6:35b`, `nemotron-3-nano:30b`, `qwen3.5:9b`) are sized for larger machines; the Jetson AI Lab guide says to start with a 4B-class tool-calling model — "It can work, but do expect weaker performance than the 30B-class models"; and NVIDIA's memory blog puts the tuned 4-bit envelope at LLMs up to ~10B and VLMs up to ~4B parameters — a ceiling for a dedicated setup, not a budget that holds a desktop and agent too.

NVIDIA does not publish tokens-per-second figures for Ollama on this device; treat outside speed claims with care (see [Local LLM Inference](/tutorials/jetson-orin-nano/local-llm)).

> **Juxi note:** for a workable always-on setup here, plan for headless mode, a 4B-class quantized model, and NVMe storage for the 20 GB requirement and the swap file. That matches what the sources support; anything larger is unverified.

## Ollama and agent notes — NVIDIA staff-confirmed

NVIDIA staff debugged the Orin Nano + JetPack 7.2 + Ollama flow on its developer forums, and re-verified Ollama on JetPack 7.2.1 in September 2026.

- **Check the GPU first.** `ollama ps` should show `100% GPU` in the PROCESSOR column; if it shows CPU, the agent will be very slow.
- **Documented failure (June 2026).** With NemoClaw + Ollama on a freshly flashed JetPack 7.2 Orin Nano, `openclaw tui` opened but never answered ("Autocompaction could not recover this turn"). NVIDIA reproduced it: Ollama had skipped GPU discovery (CPU fallback), and the sandbox context window was only 4096 tokens. The staff fix wrote these lines to `/etc/systemd/system/ollama.service.d/override.conf`:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  then `sudo systemctl daemon-reload && sudo systemctl restart ollama`; inside the sandbox (`nemoclaw my-assistant connect`), `contextWindow` was raised to 32768 in `.openclaw/openclaw.json` and the config hash refreshed. The reporter confirmed Ollama then ran on the GPU.
- **Current status: this workaround should not be needed.** Staff, mid-2026: "the issue is fixed in the latest ollama release. The workaround (override.conf) is no longer needed." On JetPack 7.2.1 the upstream installer works and `ollama ps` reports 100% GPU; the "WARNING: Unsupported JetPack version detected" line is harmless. Test the stock install first.
- **If Ollama still falls back to CPU:** update Ollama first. A forum user fixed a persistent fallback by deleting the stale `/usr/local/lib/ollama/cuda_v12` directory (staff-confirmed removal). Keep override.conf as a fallback of last resort — it is what NVIDIA used successfully on this exact kit.

## Security for always-on agents

An always-on agent is a program with credentials and tool access that keeps working while you are not watching. On a device that holds your data, that is a real risk: an agent with tool and shell access here can read, change, or send anything it can reach.

**Use the policy layer.** NVIDIA describes OpenShell as "the secure runtime inside it that enforces what the agent can access: files, networks, credentials, and tools." During onboarding, pick the tightest sandbox policy tier that still does the job (the Jetson AI Lab walkthrough advises the tightest tier).

**Credentials.** Give the agent scoped, revocable credentials — dedicated keys and accounts, never your personal ones. Anything the agent can read, it can copy; anything it can use, it can be tricked into using. Messaging integrations act with your identity: NVIDIA's Orin Nano page shows an OpenClaw + WhatsApp example, so use a dedicated account or number.

**Network exposure.** Keep local services on localhost — NVIDIA's staff configuration for Ollama here binds it to `127.0.0.1` (`OLLAMA_HOST=127.0.0.1:11434`). Do not expose agent dashboards, control APIs, or model servers to the open internet; for remote access, use a tunnel or VPN you control. The install needs Docker (Engine/Desktop/Colima, per the requirements above) plus a sandboxed container cluster (the OpenShell gateway runs k3s internally) and sudo access.

**Operating habits.** Start supervised — watch what the agent does before leaving it unattended. Do not give it access you cannot revoke or undo, and keep backups plus a recovery path (see [Flashing and Updates](/tutorials/jetson-orin-nano/flashing-and-updates)). NemoClaw is alpha software ("Early preview"); treat the sandbox as one layer among several, not the only one.

> **Attention** — because this stack runs locally ("no cloud APIs needed"), the security boundary is your device, your network, and your credentials. Review all three before you leave an agent running.

## Sources

- [NVIDIA NemoClaw product page](https://www.nvidia.com/en-us/ai/nemoclaw) (checked 2026-09-26) — definition, harnesses, install commands, OpenShell.
- [NVIDIA Build-a-Claw resource hub](https://www.nvidia.com/en-us/ai/build-a-claw/) (checked 2026-09-26) — Orin Nano install section.
- [NemoClaw — Prerequisites](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) and [Platform support](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (checked 2026-09-26)
- [NemoClaw — Troubleshooting (Jetson host configuration)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (checked 2026-09-26)
- [NVIDIA Developer Forums — NemoClaw on Jetson Orin Super with JetPack 7.2 (NVIDIA staff fix)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (checked 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson (staff-verified)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) and [JetPack 7.2 GPU acceleration](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (checked 2026-09-26)
- [NVIDIA Technical Blog — Maximizing memory efficiency on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (checked 2026-09-26)
- [NVIDIA Developer Forums — AI models that run on Orin Nano Super 8GB (community guide)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (checked 2026-09-26)
- [Jetson AI Lab — NemoClaw tutorial (vendor guide)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (checked 2026-09-26)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) and [Release notes](https://nvidia-isaac-ros.github.io/releases/index.html) (checked 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (checked 2026-09-26) — the "Agent skills for video pipelines" What's New item.

*Status: draft, pending review by cheny. Grounded in NVIDIA's official documentation, NVIDIA developer forum posts, and the Jetson AI Lab vendor guide, as of the dates listed; not yet verified on physical hardware by Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
