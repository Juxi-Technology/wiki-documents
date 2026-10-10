---
title: Running LLMs Locally — TensorRT Edge-LLM on the 8 GB Orin Nano
sidebar_label: Local LLM Inference
slug: /tutorials/local-llm
description: >-
  Running large language models locally on the 8 GB Jetson Orin Nano —
  TensorRT Edge-LLM support, precision limits, what fits, and official figures.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# Running LLMs Locally — TensorRT Edge-LLM on the 8 GB Orin Nano

Your Jetson Orin Nano Super Developer Kit (8 GB) can run language models
locally. NVIDIA's optimized path for this is **TensorRT Edge-LLM**, which
**officially supports Jetson Orin on the JetPack 7.2 line**. This page covers
what fits in 8 GB and which runtimes work today; the instructions live in
NVIDIA's docs, linked below.

## Read this first — four constraints for this kit

1. **Orin runs FP16, INT8, and INT4 engines only. FP8 and FP4 engines do not
   run on this device** — they are Thor/Blackwell-class capabilities ("Jetson
   Orin does not run FP8 or FP4 model engines" — support matrix).
2. **Engines are built on the device** by the C++ runtime. ONNX export and
   quantization run on an x86-64 Linux host — not on Orin. Engines are
   SM-exact: one built on Thor (SM110) will not load on Orin Nano (sm_87).
3. **JetPack 7.2.1 (L4T r39.2.1) is the supported stack** — CUDA 13.2.2,
   TensorRT 10.16.2. Edge-LLM uses this platform TensorRT from JetPack.
4. **8 GB of unified memory is shared with the OS and the desktop.** Roughly
   7.6 GB is usable. Model size — not TOPS — is the binding constraint, and
   the KV cache must fit in the same memory.

> **Important:** choose **INT4 AWQ** or **INT4 GPTQ** checkpoints for this
> kit. Do not select FP8, MXFP8, FP4, or NVFP4 checkpoints. INT8 GPTQ is not
> supported.

## What TensorRT Edge-LLM covers

TensorRT Edge-LLM is NVIDIA's official runtime for LLMs and VLMs on edge
platforms. The support matrix lists Jetson Orin as "Official" for JetPack
7.2, with engines built on the device and FP16, INT8, INT4 precision.

- **Model coverage:** supported checkpoints include Llama 3.2 1B/3B,
  Llama 3.1 8B, Qwen2.5 (0.5B–14B), Qwen3 (0.6B–8B), and VLMs such as
  Qwen2.5-VL 3B/7B and InternVL3/3.5 (1B–14B) — dense checkpoints below 30B
  parameters. It is not a verification matrix: "not every listed checkpoint
  has been fully verified on every supported platform and precision."
- **The 8 GB build flag:** for INT4 engine builds on Orin Nano, pass
  `--externalize-weights int4_ffn` (dense) or `--externalize-weights
  int4_ffn int4_moe` (MoE) to reduce engine build memory.
- **Disk space:** budget ~20–50 GB per model workflow for ONNX files and
  engines; this kit has no built-in storage ([Quick Start](/tutorials/jetson-orin-nano/quick-start)).
- **Two Quick Start paths:** a C++ path (export/quantize on a host, build
  engines on device, run) and a server path — `tensorrt-edgellm-serve
  Qwen/Qwen3.5-0.8B` (downloads the checkpoint on first launch).

> **Juxi tip:** the authoritative steps are NVIDIA's — [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> The 0.10.1 installation page states: "Wheels are not published or the
> default installation path in 0.10.1."

## What actually fits in 8 GB

- **Up to 2B parameters is what NVIDIA has benchmarked on this module.** The
  Edge-LLM benchmark page's largest Orin Nano (8GB) row is Qwen3.5-2B at
  4,692 MB: "2B is the largest model NVIDIA benchmarked on Orin Nano 8 GB."
- **A vendor walkthrough runs a 4B model.** The Jetson AI Lab tutorial
  reports Qwen3-4B-Instruct INT4 AWQ (~2 GB of weights) fitting "within Orin
  Nano's 8 GB unified memory"; InternVL3 1B/2B also fit with INT4 AWQ, while
  larger variants target AGX Orin or Thor. (Vendor content.)
- **A practical envelope from NVIDIA's memory blog: LLMs up to ~10B and VLMs
  up to ~4B parameters** with 4-bit quantization and efficient runtimes —
  for tuned setups.
- **File size is not the fit test — the KV cache must fit too.** Community
  reports show 12B/26B-class GGUF models (gemma4:12b at 7.4 GB, gemma4:26b at
  16 GB) failing in Ollama on the 8 GB board: `cudaMalloc failed: out of
  memory ... failed to allocate buffer for kv cache`. (Unconfirmed.)

## Official performance figures for this kit

NVIDIA publishes benchmark tables for **Jetson Orin Nano (8GB)** — v0.10.0,
JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. Runtime results on MTBench (LLMs)
and COCO (VLMs), with peak GPU memory:

| Model | Type | Throughput | Peak GPU memory |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77.0 tok/s | 1,917 MB |
| Qwen3-1.7B | LLM | 36.5 tok/s | 2,992 MB |
| Qwen3-VL-2B | VLM | 36.1 tok/s | 4,486 MB |
| Qwen3.5-0.8B | LLM | 59.1 tok/s | 2,127 MB |
| Qwen3.5-0.8B | VLM | 59.0 tok/s | 2,760 MB |
| Qwen3.5-2B | LLM | 29.6 tok/s | 3,642 MB |
| Qwen3.5-2B | VLM | 29.6 tok/s | 4,692 MB |

Orin rows use batch 1 and externalized INT4 weights; build limits:
maxInputLen 2048, maxKVCacheCapacity 2200. "Production performance may vary
with system-level tuning (power mode, memory configuration, thermal management)."

> **Important:** NVIDIA's published tokens-per-second tables for the **AGX
> Orin 64 GB** do **not** apply to this kit — different module, memory
> bandwidth, power envelope. Do not estimate Orin Nano numbers from AGX Orin.
> No first-party figures exist for the Ollama or llama.cpp paths here.

## Other runtimes on this kit

### Ollama

Current status, verified by NVIDIA staff on the developer forums for JetPack
7.2.1 (September 2026): the stock installer works —
`curl -fsSL https://ollama.com/install.sh | sh` — and `ollama ps` should
report `100% GPU`. The "Unsupported JetPack version detected" warning is
harmless.

Older builds fell back to CPU because their prebuilt CUDA libraries lacked
sm_87, Orin's compute capability; community reports point to Ollama 0.30.11
adding "CC 87 for CUDA v13", and NVIDIA staff confirmed the fix. Some
community trouble reports remain (August–September 2026) — check `ollama ps`
on your unit; the CUDA v13 source build remains the fallback.

### Python wheels for JetPack 7.2

CUDA-enabled Python packages (PyTorch and others) for JetPack 7.2 / CUDA
13.2 come from the Jetson AI Lab SBSA index, which NVIDIA staff cite:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

Use it as the pip index (`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`).
It serves aarch64 wheels such as torch 2.11.0, torchvision 0.25.0, and
vllm 0.20.0+cu130. There is no `jp7/*` index; the JetPack 6-era index is
`jp6/cu126`. CUDA 13.2 unifies Orin onto the Arm SBSA toolkit (R595+ driver).

### jetson-containers and Jetson AI Lab (alternative path)

[jetson-containers](https://github.com/dusty-nv/jetson-containers) supports
JetPack 6.2 (CUDA 12.6) and JetPack 7 (CUDA 13.x). Prebuilt `-jetson-orin`
images exist for the main serving paths, including
`ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` and `ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`.

8 GB cautions from the vendor material: the vLLM example uses `--shm-size=16g`
(not a size recommendation here), and the recommended setup relocates the
Docker data root to NVMe and adds a 16 GB swap file (disable ZRAM first).

## Tuning for 8 GB

When a model does not fit: free platform memory (headless mode reclaims up
to ~865 MB), quantize to 4-bit, and size the KV cache and context
deliberately — see [Memory Efficiency for 8 GB](/tutorials/jetson-orin-nano/memory-efficiency).

## Troubleshooting

- **Out of memory at load** — `cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache` means the model plus KV cache exceed the 8 GB
  of unified memory. Use a smaller or more quantized model, or shorten the
  context; for Edge-LLM engine builds, add `--externalize-weights int4_ffn`
  and reduce `--maxInputLen` / `--maxKVCacheCapacity`.
- **Ollama CPU fallback, or the "Unsupported JetPack version detected"
  warning** — update Ollama first (older builds lacked sm_87); the warning is
  harmless on 7.2.1 per NVIDIA staff. Confirm with `ollama ps` (`100% GPU`).
- **Version or setup problems** — see [Verify Your System](/tutorials/jetson-orin-nano/verify-your-system)
  and [Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting).

## Sources

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [Performance Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (checked 2026-09-26)
- [JetPack 7.2.1 downloads page](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-26)
- [NVIDIA blog — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (checked 2026-09-26)
- [NVIDIA Developer Forums — Ollama on Jetson (staff-verified on JetPack 7.2.1)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (checked 2026-09-26)
- [NVIDIA Developer Forums — JetPack 7.2 GPU acceleration issue (wheel index, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (checked 2026-09-26)
- [NVIDIA Developer Forums — AI models that run on Jetson Orin Nano Super 8GB (community)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (checked 2026-09-26)
- [Jetson AI Lab — TensorRT Edge-LLM tutorial](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (checked 2026-09-26)
- [Jetson AI Lab — full documentation text (container image table)](https://www.jetson-ai-lab.com/llms-full.txt) (checked 2026-09-26)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (checked 2026-09-26)
- [Jetson AI Lab PyPI index — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (checked 2026-09-26)

*Status: reviewed on 2026-10-11. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
