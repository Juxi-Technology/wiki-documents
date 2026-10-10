---
title: Running LLMs Locally — TensorRT Edge-LLM on JetPack 7.2
sidebar_label: Local LLM Inference
slug: /tutorials/local-llm
description: >-
  Run large language and multimodal models locally on the AGX Orin Developer
  Kit with NVIDIA TensorRT Edge-LLM — supported models, Orin constraints,
  workflow, and expected performance.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# Running LLMs Locally — TensorRT Edge-LLM on JetPack 7.2

Your AGX Orin 64GB can run large language models locally — no cloud, no
network. NVIDIA's optimized path for this is **TensorRT Edge-LLM**, and it
**officially supports Jetson Orin on JetPack 7.2**. This page gets you oriented:
what your kit can and cannot do, the workflow shape, and what performance to
expect. The authoritative step-by-step lives in NVIDIA's documentation (linked
throughout).

## Read this first — three Orin-specific facts

1. **Orin runs FP16, INT8, and INT4 engines only. FP8 and FP4 are not
   supported on Orin** (they are Thor-class capabilities). NVIDIA's support
   matrix states this explicitly — plan your quantization choices accordingly.
2. **Engines are built on the device** for the Orin deployment path (not
   cross-compiled from a PC).
3. **JetPack 7.2 is the supported stack** — CUDA 13.2 with the platform
   TensorRT (10.16.2 in this release). The aarch64 wheel targets Jetson Orin
   (SM87) with Python 3.10–3.12.

*(Source: TensorRT Edge-LLM Official Support Matrix, checked 2026-09-24.)*

## What TensorRT Edge-LLM covers

Per NVIDIA's documentation, Edge-LLM provides optimized inference for **text,
vision, audio, speech, and action models** on edge platforms:

| Capability | Examples in the docs |
|---|---|
| Text generation | LLM families including Qwen, Gemma, Nemotron |
| Multimodal (VLM) | Phi-4 Multimodal example |
| Speech recognition (ASR) | Dedicated example workflow |
| Speech generation (TTS) | Dedicated example workflow |
| Vision-Language-Action | VLA examples (robotics) |
| Omni (audio + vision + speech I/O) | Dedicated example workflow |

Feature highlights: quantization (INT8/INT4 on Orin), speculative decoding
(EAGLE3, DFlash, and others), **KV-cache reuse**, **vocabulary reduction**,
**DART visual-token pruning** for VLMs, streaming output, and LoRA support.

## The workflow (as documented)

TensorRT Edge-LLM has two documented Quick Start paths:

1. **ONNX + C++ runtime** — export/quantize checkpoints (typically on an x86 host), transfer to the device, build engines on device, run the C++ runtime.
2. **One-line Python server** — the faster path to a serving endpoint.

Start here: **[TensorRT Edge-LLM Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Beyond the Quick Start:

- [Installation options →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html) (source C++ runtime, export/quantization workflow, experimental local wheel)
- [Supported models →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [Quantization guide →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [KV cache reuse →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [DART pruning →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Juxi tip:** export/quantization tooling runs best on an x86 Linux host
> (per the docs' x86 developer rows); the **engine build and inference run on
> your kit**. Budget disk space for model checkpoints — several GB per model
> is typical.

## Serving: OpenAI-compatible endpoint (and Claude Code)

The docs include an **experimental Python API and server** that exposes an
OpenAI-compatible chat interface — with documented examples for OpenAI-style
clients and even an **"Anthropic and Claude Code" integration example**
(pointing Claude Code at your Jetson-hosted endpoint).

- [Experimental Python API and Server →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## Expected performance (AGX Orin 64GB)

NVIDIA published these tokens/sec figures for JetPack 7.2 on the 64GB module
(June 2026; see the source blog for full context and methodology):

| Model | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

Your numbers will differ with model, quantization, context length, and power
mode. Treat these as the vendor's published reference, not a guarantee.

## Simpler alternatives

If Edge-LLM's export/build workflow is more than you need right now, NVIDIA's
[Jetson AI Lab](https://www.jetson-ai-lab.com) publishes hands-on tutorials
for other runtimes (llama.cpp, vLLM, and more) — check its JetPack version
notes before following older tutorials.

## Troubleshooting

- **First run is slow:** engine builds can take several minutes on first launch; later runs reuse the engine (same behavior applies to DeepStream — see [our DeepStream tutorial](/tutorials/jetson-agx-orin/deepstream)).
- **FP8/FP4 instructions not working:** expected — Orin supports FP16/INT8/INT4 engines only.
- **Wrong versions:** confirm JetPack 7.2.1 first — [Verify Your System](/tutorials/jetson-agx-orin/verify-your-system).

## Sources

- [TensorRT Edge-LLM — Official Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (checked 2026-09-24)
- [TensorRT Edge-LLM documentation home](https://nvidia.github.io/TensorRT-Edge-LLM/) (v0.10.1, checked 2026-09-24)
- [NVIDIA Technical Blog — Deploy Agentic-Ready AI at the Edge with Memory Efficiency in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (performance figures; checked 2026-09-24)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
