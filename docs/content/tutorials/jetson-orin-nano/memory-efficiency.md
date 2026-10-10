---
title: Memory Efficiency — Running Models in 8 GB
sidebar_label: Memory Efficiency
slug: /tutorials/memory-efficiency
description: >-
  The documented levers for fitting LLM, VLM, and vision workloads into the
  Jetson Orin Nano Super Developer Kit's 8 GB of unified memory — platform,
  model, and measurement.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# Memory Efficiency — Running Models in 8 GB

On the Orin Nano Super kit, 8 GB of unified memory is a hard limit for everything:
the OS, the desktop, services, and the model itself. The documented levers come in
three layers — **platform**, **model**, and **measurement** — and this page notes where
a technique is documented only for a larger module.

## The 8 GB budget in plain numbers

- Roughly **7.6 GB of the 8 GB is usable** after firmware and kernel reservations — the
  budget NVIDIA's memory-efficiency blog uses for all its "available memory" figures.
- CPU memory and GPU memory (CUDA, multimedia buffers) come from the **same
  physical pool**; reducing one helps the other.
- The blog's flagship demo — a 2B-parameter VLM pipeline — runs at
  **4.5 / 7.6 GB (~60%)**.

## Lever 1 — Platform layer: what the OS and services occupy

The savings below are from NVIDIA's memory-efficiency blog.

| Lever | Documented saving | How |
|---|---|---|
| Disable the graphical desktop (headless) | Up to 865 MB | `sudo systemctl set-default multi-user.target` |
| Disable networking and journaling services | Up to 32 MB | `sudo systemctl disable <service-name>` |
| Display and camera carveouts | About 100 MB total | BSP device-tree edit, then re-flash |
| SWIOTLB reservation | About 4 MB | Kernel argument `swiotlb=2048`, only if DMA issues appear |
| DeepStream-style pipeline | Up to 412 MB | Container to bare metal (70 MB); Python to C++ (84 MB); disable Tiler/OSD and use FakeSink (258 MB) — see [DeepStream](/tutorials/jetson-orin-nano/deepstream) |
| Inference framework choice | Avoid >2.7 GB of overhead | Lean runtimes (C++ runtime, llama.cpp); a heavier framework can add over 2.7 GB at initialization alone |

> **Juxi note:** Carveout edits are BSP source changes: they need a re-flash
> and save little. Change one thing at a time and keep a working flash
> image — see [Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates).

**Swap is not a saving, but a pressure valve.** The vendor RAM-optimization tutorial
replaces ZRAM with a **16 GB swap file on NVMe** (`sudo systemctl disable nvzramconfig`
first); NVIDIA's 8 GB demo assumed about **2 GB of swap used at peak**.

### After stopping a server, free the cache

Memory usage can stay high after you stop a vLLM or SGLang server, or a
Docker container (L4T r39.2.1 known issue 5661165). NVIDIA's command:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

The same fix applies when an Edge-LLM engine build runs out of memory: `sudo sysctl -w vm.drop_caches=3` plus smaller build limits (vendor tutorial).

### Power modes change clocks, not capacity

| Power mode | Mode ID | CPU max clock | GPU max clock | Memory max clock |
|---|---|---|---|---|
| 15W | 0 | 1497.6 MHz | 612 MHz | 2133 MHz |
| 25W (default) | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

The clock maxima above are from NVIDIA's r39.2 Power and Performance tables.
Power modes change clock frequencies, not memory size — a model that does not
fit will not fit in a faster mode. Switch with `sudo nvpmodel -q` (list) and
`sudo nvpmodel -m <mode_id>`; MAXN_SUPER needs the Super flashing configuration
and is experimental (per those tables). If 25W or MAXN SUPER is missing, see [Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting).

> **Attention:** An excessively large CUDA memory allocation can **reboot the
> device** (L4T r39.2.1 known issue 5699079). Guidance in the same release
> notes: ensure CUDA and other applications do not request more memory than is
> physically available, and launch CUDA processes with higher OOM scores so
> system processes are not killed.

## Lever 2 — Model layer: what the model and its cache occupy

### Quantization is the biggest single lever

Orin runs **FP16, INT8, and INT4 engines only**; FP8 and FP4 do not run on
Orin (Thor/Blackwell-class). For TensorRT Edge-LLM, use **INT4 AWQ or INT4
GPTQ** checkpoints, avoid INT8 GPTQ, and never pick FP8, MXFP8, FP4, or
NVFP4 checkpoints. See [Local LLM Inference](/tutorials/jetson-orin-nano/local-llm).

First-party figures: Qwen3 8B from FP16 to W4A16 reclaims about **10 GB**;
Qwen3 4B from BF16 to INT4 reclaims about **5.6 GB**. NVIDIA's chart for
the 4B case is captioned "Jetson Orin NX 16 GB" — a larger module, so
treat the figures as reference, not an 8 GB promise.

With 4-bit quantization and an efficient runtime, NVIDIA's documented
envelope for this budget is **LLMs up to ~10B parameters and VLMs up to
~4B parameters**.

### What NVIDIA actually benchmarks on 8 GB

TensorRT Edge-LLM publishes Orin Nano 8 GB rows for models from 0.6B to 2B
parameters (Qwen3 and Qwen3.5 families); **2B is the largest model NVIDIA
benchmarks on this module**. A 4B INT4 AWQ walkthrough exists as a vendor
tutorial (about 2 GB of weights), but no official 4B numbers are published.

### Engine-build memory (TensorRT Edge-LLM)

- `--externalize-weights int4_ffn` (dense) or `--externalize-weights
  int4_ffn int4_moe` (MoE) reduces engine build memory on Orin devices
  with less system memory.
- Orin-Nano-tuned limits from the vendor tutorial:
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  If the build still runs out of memory, free system memory first and
  reduce further, for example `--maxInputLen 256 --maxKVCacheCapacity 512`.
  Engines build on the device and are not portable between modules.

### KV cache: sizing and reuse

The KV cache grows with context length, batch size, and concurrency; it is
part of the memory budget, not an afterthought.

- Build limits bound it: `--maxInputLen` and `--maxKVCacheCapacity`; the Orin
  Nano benchmark builds used maxInputLen 2048 and maxKVCacheCapacity 2200, batch 1.
- **KV cache reuse** is a documented Edge-LLM runtime capability: a
  process-local, content-addressed cache for repeated input prefixes, so
  prefill state from documents, prior turns, generated continuations, and
  repeated image prefixes is reused instead of recomputed.
- A model file that fits can still fail: a community report shows 7.4 GB and
  16 GB GGUF files failing with a KV-cache allocation error on an 8 GB board —
  add KV cache and runtime overhead when you check fit.
- **Vocabulary reduction** (generation restricted to a task-specific token
  subset) and **visual-token pruning (DART)** (duplicated visual tokens
  dropped before prefill) are documented Edge-LLM feature pages. The visual
  engine build also takes image-token limits: `--minImageTokens`,
  `--maxImageTokens`, `--maxImageTokensPerImage`.

> **Important:** FP8 KV cache — the ~50% KV-cache memory saving — requires SM89
> or newer (Ada Lovelace and up). Orin is SM87, so it is **not available on this
> kit**. Use FP16 KV cache.

### A first-party before/after

NVIDIA's 8 GB case study (memory-efficiency blog, Table 7): headless mode
instead of the full GNOME desktop (1.8 GB → 1.1 GB) plus a 4-bit GGUF VLM
(Q4_K_M, 6.6 GB → 2.2 GB). The pipeline did not run on Orin Nano 8 GB
before (the VLM alone used 87% of RAM) and now runs at **4.5 / 7.6 GB
(~60%)** — >5.1 GB saved. The "before" column is on **Orin NX 16 GB**: the
same optimizations moved the workload onto the 8 GB kit.

## Lever 3 — Measurement layer: see where memory goes

| Tool | Shows | Note |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, memory, temperature, power | The dev kit user guide: nvidia-smi is not the primary monitoring tool on Jetson |
| `nvidia-smi dmon` | GPU utilization | Per release note 5406663; GPU utilization in the Jetson Power GUI is "still under evaluation" |
| `free -h` | The OS view of memory | Does not tell you what a GPU workload can allocate |
| procrank | Per-process physical memory (PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| nvmap clients | Processes holding GPU/multimedia buffers | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### "Free memory" is not the budget

`free -h` shows the open system view; GPU allocations come from the same
pool with separate accounting. In a community report on an 8 GB board,
`cudaMalloc` failed for the KV cache while `free -h` still showed 5.7 GiB
"free" [grade B, community report]. Judge fit against the ~7.6 GB budget, not "free".

### Method

1. Confirm the platform basics first — [Verify Your System](/tutorials/jetson-orin-nano/verify-your-system).
2. Record a baseline: memory at idle, then under load (`tegrastats`).
3. Change one lever, measure again. If nothing moved, revert.

## Where to start

By documented size of the win:

1. **Runtime and quantization** — the largest layer in NVIDIA's summary (about 5–10 GB for inferencing frameworks and model quantization, per the blog's Table 5).
2. **Headless** — up to ~865 MB, one command.
3. **Pipeline tuning** — up to ~412 MB (DeepStream-style).
4. **Swap on NVMe** — pressure relief, not a saving.
5. **Carveouts and SWIOTLB** — about 100 MB and 4 MB, and a re-flash. Last.

If a model still does not fit, the model is the problem, not the settings: go
smaller, quantize more, shorten the context, or reduce the batch — see [Local LLM Inference](/tutorials/jetson-orin-nano/local-llm) and the [FAQ](/tutorials/jetson-orin-nano/faq).

## Sources

- [NVIDIA Technical Blog — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (7.6 GB budget, desktop 865 MB, networking/journaling 32 MB, carveouts, SWIOTLB, pipeline savings, quantization and before/after tables, procrank install steps and nvmap clients; checked 2026-09-26)
- TensorRT Edge-LLM docs: [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8 KV Cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [Performance Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Quick Start Guide](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · feature pages: [KV cache reuse](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Vocabulary reduction](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [Visual-token pruning (DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (checked 2026-09-26)
- Jetson Linux docs: [r39.2.1 Release Notes](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (issues 5661165, 5699079, 5406663) · [Power and Performance, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Dev Kit How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (checked 2026-09-26)
- Jetson AI Lab: [TensorRT Edge-LLM tutorial](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [RAM optimization](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (Orin-Nano build limits; NVMe swap; checked 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (community: free -h vs cudaMalloc; grade B; checked 2026-09-26)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
