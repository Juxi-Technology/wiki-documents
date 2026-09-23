---
title: Memory Efficiency — Running Bigger Workloads on 64GB
sidebar_label: Memory Efficiency
slug: /tutorials/memory-efficiency
description: >-
  The documented levers for reducing memory use on the AGX Orin Developer Kit
  — platform-level agent skills, model-level optimizations in TensorRT
  Edge-LLM, and how to measure the results.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# Memory Efficiency — Running Bigger Workloads on 64GB

On edge devices, memory — not compute — is usually what limits which models
you can run. JetPack 7.2 shipped with memory efficiency as a headline theme,
and there are three documented layers of optimization: the **platform**, the
**model**, and **measurement**. This page maps the levers; each links to the
authoritative source.

## Lever 1 — Platform level (NVIDIA agent skills)

JetPack 7.2's **memory optimization agent skills** guide an AI agent through
auditing and reducing memory consumption across the stack, per NVIDIA:

- **Bootloader memory carveouts** — reclaim memory reserved before Linux starts
- **Kernel memory reservations** — tune what the kernel holds back
- **User-space overhead** — find and remove redundant processes and services

The goal NVIDIA states: fit more capable workloads into smaller memory
footprints (which is how the same hardware keeps getting more useful across
software releases). Start here:

- [Jetson device-side skills](https://github.com/jetson-device-skills) · [Jetson BSP skills](https://github.com/jetson-bsp-skills)
- Context: [NVIDIA's JetPack 7.2 memory-efficiency blog](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **Caution:** carveout and reservation changes touch boot behavior. Make the
> changes one at a time, keep a recovery path (see
> [Flashing & Updates](/tutorials/jetson-agx-orin/flashing-and-updates)), and
> re-validate before moving to production.

## Lever 2 — Model level (TensorRT Edge-LLM features)

For LLM/VLM workloads, the biggest memory consumers are weights and the
KV cache. TensorRT Edge-LLM documents these levers (Jetson Orin runs
FP16/INT8/INT4 engines — see [Local LLM Inference](/tutorials/jetson-agx-orin/local-llm)):

| Lever | What it does | Docs |
|---|---|---|
| **Quantization** (INT8/INT4 on Orin) | Smaller weights, less bandwidth | [Quantization guide](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **Vocabulary reduction** | Shrinks the output vocabulary / embedding tables | [Reduce vocabulary](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **KV cache reuse** | Reuses cache across related requests instead of recomputing | [KV cache reuse](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **DART visual-token pruning** | Cuts redundant image tokens for VLMs | [DART pruning](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(FP8 KV cache exists in the docs but is Thor-oriented; Orin is limited to
FP16/INT8/INT4 engines per the official support matrix.)*

## Lever 3 — Measure, don't guess

- **System view:** `tegrastats` (built into Jetson Linux) for live CPU/GPU/memory — see [Verify Your System](/tutorials/jetson-agx-orin/verify-your-system).
- **Model view:** TensorRT Edge-LLM includes a [memory monitoring design and tools](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html) and publishes [per-release performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html).
- **Method:** record a baseline (memory used at idle and under load), change **one** lever, measure again. Publish-ready numbers should always come from your own workload.

## What this means in practice

- The 64GB module already runs models in the 30B class (see published figures
  in [Local LLM Inference](/tutorials/jetson-agx-orin/local-llm)); memory optimization is what lets
  you add *more* on top — multi-model pipelines, longer contexts, always-on
  agents ([Agentic AI](/tutorials/jetson-agx-orin/agentic-ai)), video pipelines alongside inference
  ([DeepStream](/tutorials/jetson-agx-orin/deepstream)).
- If your workload fits today but barely, start with Lever 2 (model-level) —
  it's the lowest-risk and best-documented. Use Lever 1 when you need to
  squeeze the platform itself.

## Sources

- [NVIDIA Technical Blog — memory efficiency & agent skills in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (checked 2026-09-24)
- [TensorRT Edge-LLM documentation](https://nvidia.github.io/TensorRT-Edge-LLM/) (features and support matrix; checked 2026-09-24)

*Status: draft, pending review by cheny. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
