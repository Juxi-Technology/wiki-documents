---
title: 本地运行 LLM——8GB Orin Nano 上的 TensorRT Edge-LLM
sidebar_label: 本地 LLM 推理
slug: /tutorials/local-llm
description: >-
  在 8GB 的 Jetson Orin Nano 上本地运行大语言模型——TensorRT Edge-LLM
  支持情况、精度限制、能装下什么，以及官方数字。
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

# 本地运行 LLM——8GB Orin Nano 上的 TensorRT Edge-LLM

你的 Jetson Orin Nano Super 开发套件（8GB）可以在本地运行语言模型。
NVIDIA 为此提供的优化路径是 **TensorRT Edge-LLM**，它**正式支持在
JetPack 7.2 系列上运行 Jetson Orin**。本页介绍 8GB 能装下什么、目前哪些
运行时可用；具体操作步骤见 NVIDIA 官方文档（下文给出链接）。

## 先读这里——本套件的四条约束

1. **Orin 只运行 FP16、INT8 和 INT4 引擎。FP8 与 FP4 引擎无法在本设备上运行**——它们
   属于 Thor/Blackwell 级的能力（“Jetson Orin 不运行 FP8 或 FP4 模型引擎”——支持矩阵）。
2. **引擎由 C++ 运行时在设备上构建。** ONNX 导出与量化在 x86-64 Linux 主机上运行——
   不在 Orin 上。引擎与 SM 版本严格对应：在 Thor（SM110）上构建的引擎无法在
   Orin Nano（sm_87）上加载。
3. **JetPack 7.2.1（L4T r39.2.1）是受支持的软件栈**——CUDA 13.2.2、TensorRT 10.16.2。
   Edge-LLM 使用 JetPack 提供的这个平台版 TensorRT。
4. **8GB 统一内存由操作系统与桌面共同占用。** 约 7.6 GB 可用。真正的硬约束是模型
   规模——而不是 TOPS——而且 KV cache 也必须装进同一块内存。

> **重要：** 本套件请选择 **INT4 AWQ** 或 **INT4 GPTQ** 的 checkpoint。不要选择
> FP8、MXFP8、FP4 或 NVFP4 的 checkpoint。INT8 GPTQ 不受支持。

## TensorRT Edge-LLM 覆盖什么

TensorRT Edge-LLM 是 NVIDIA 面向边缘平台上 LLM 与 VLM 的官方运行时。支持矩阵
把 Jetson Orin 在 JetPack 7.2 下列为 “Official（官方支持）”，引擎在设备上构建，
精度为 FP16、INT8、INT4。

- **模型覆盖：** 受支持的 checkpoint 包括 Llama 3.2 1B/3B、Llama 3.1 8B、
  Qwen2.5（0.5B–14B）、Qwen3（0.6B–8B），以及 Qwen2.5-VL 3B/7B、InternVL3/3.5
  （1B–14B）等 VLM——即 30B 参数以下的稠密（dense）checkpoint。它并不是一份
  验证矩阵：“并非列表中的每个 checkpoint 都在每个受支持的平台和精度上经过了
  完整验证。”
- **8GB 构建参数：** 在 Orin Nano 上构建 INT4 引擎时，传入
  `--externalize-weights int4_ffn`（稠密）或 `--externalize-weights
  int4_ffn int4_moe`（MoE），以降低引擎构建时的内存占用。
- **磁盘空间：** 每套模型工作流要为 ONNX 文件和引擎预留约 20–50 GB；本套件没有
  内置存储（[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)）。
- **两条 Quick Start 路径：** 一条 C++ 路径（在主机上导出/量化，在设备上构建
  引擎并运行），还有一条服务端路径——`tensorrt-edgellm-serve
  Qwen/Qwen3.5-0.8B`（首次启动时下载 checkpoint）。

> **钜犀提示：** 权威步骤以 NVIDIA 为准——[Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)、
> [安装](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)、
> [支持的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)。
> 0.10.1 的安装页写道：“在 0.10.1 中，wheel 尚未发布，也不是默认安装路径。”

## 8GB 实际能装下什么

- **NVIDIA 在这个模组上基准测试过的上限是 2B 参数。** Edge-LLM 基准页上 Orin Nano
  （8GB）一栏最大的行是 Qwen3.5-2B，占 4,692 MB：“2B 是 NVIDIA 在 Orin Nano
  8GB 上基准测试过的最大模型。”
- **厂商实操指南跑过 4B 模型。** Jetson AI Lab 的教程报告 Qwen3-4B-Instruct
  INT4 AWQ（权重约 2 GB）能装进“Orin Nano 的 8GB 统一内存”；InternVL3 1B/2B
  用 INT4 AWQ 也能装下，而更大的变体面向 AGX Orin 或 Thor。（厂商内容。）
- **NVIDIA 内存博客给出的实用范围：LLM 最高约 10B、VLM 最高约 4B 参数**——前提是
  4 位量化加高效运行时，且经过调优。
- **文件大小不是装不装得下的判据——KV cache 也必须放得进去。** 社区报告显示，
  12B/26B 级的 GGUF 模型（gemma4:12b 为 7.4 GB，gemma4:26b 为 16 GB）在 8GB
  板卡的 Ollama 上加载失败：`cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache`。（未经确认。）

## 本套件的官方性能数字

NVIDIA 为 **Jetson Orin Nano（8GB）** 发布了基准表——v0.10.0、JetPack 7.2 /
CUDA 13.2 / TensorRT 10.16。数据为 MTBench（LLM）与 COCO（VLM）上的运行时
结果，并给出峰值 GPU 内存：

| 模型 | 类型 | 吞吐量 | 峰值 GPU 内存 |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77.0 tok/s | 1,917 MB |
| Qwen3-1.7B | LLM | 36.5 tok/s | 2,992 MB |
| Qwen3-VL-2B | VLM | 36.1 tok/s | 4,486 MB |
| Qwen3.5-0.8B | LLM | 59.1 tok/s | 2,127 MB |
| Qwen3.5-0.8B | VLM | 59.0 tok/s | 2,760 MB |
| Qwen3.5-2B | LLM | 29.6 tok/s | 3,642 MB |
| Qwen3.5-2B | VLM | 29.6 tok/s | 4,692 MB |

Orin 的行使用 batch 1 与外部化 INT4 权重；构建限制：maxInputLen 2048、
maxKVCacheCapacity 2200。“生产环境性能可能随系统级调优（电源模式、内存配置、
散热管理）而变化。”

> **重要：** NVIDIA 为 **AGX Orin 64GB** 公布的 tokens/秒 表格**不适用**于本套件——
> 模组、内存带宽、功耗范围都不同。不要用 AGX Orin 的数字去推算 Orin Nano。
> 这里 Ollama 或 llama.cpp 路径没有任何第一方数据。

## 本套件上的其他运行时

### Ollama

当前状态（经 NVIDIA 员工 2026 年 9 月在开发者论坛针对 JetPack 7.2.1 确认）：
原版安装脚本可用——`curl -fsSL https://ollama.com/install.sh | sh`——`ollama ps`
应显示 `100% GPU`。“Unsupported JetPack version detected” 警告无害。

较早的构建会回退到 CPU，因为它们预编译的 CUDA 库缺少 sm_87——即 Orin 的计算
能力；社区报告指向 Ollama 0.30.11 新增的 “CC 87 for CUDA v13”，NVIDIA 员工
也确认了这一修复。仍有一些社区问题报告（2026 年 8–9 月）——请在你的设备上
用 `ollama ps` 检查；CUDA v13 源码构建仍是后备方案。

### 面向 JetPack 7.2 的 Python wheel

面向 JetPack 7.2 / CUDA 13.2 的 CUDA Python 包（PyTorch 等）来自 Jetson AI Lab
的 SBSA 索引，NVIDIA 员工也在引用它：

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

把它用作 pip 索引（`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`）。
它提供 aarch64 wheel，例如 torch 2.11.0、torchvision 0.25.0 和
vllm 0.20.0+cu130。不存在 `jp7/*` 索引；JetPack 6 时代的索引是 `jp6/cu126`。
CUDA 13.2 把 Orin 统一到 Arm SBSA 工具链（R595+ 驱动）。

### jetson-containers 与 Jetson AI Lab（替代路径）

[jetson-containers](https://github.com/dusty-nv/jetson-containers) 支持
JetPack 6.2（CUDA 12.6）与 JetPack 7（CUDA 13.x）。主要服务路径都有预构建的
`-jetson-orin` 镜像，包括
`ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` 和 `ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`。

厂商材料中的 8GB 提醒：vLLM 示例使用 `--shm-size=16g`（这并不是针对本套件的
容量建议）；推荐配置会把 Docker 数据根目录迁移到 NVMe，并添加一个 16 GB 的
swap 文件（先禁用 ZRAM）。

## 面向 8GB 的调优

当模型装不下时：释放平台内存（无头模式最多可回收约 865 MB）、量化到 4 位，
并审慎设定 KV cache 与上下文大小——见[面向 8GB 的内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)。

## 故障排查

- **加载时内存不足**——`cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache` 意味着模型加上 KV cache 超出了 8GB 统一内存。
  换用更小或量化程度更高的模型，或缩短上下文；对 Edge-LLM 引擎构建，加上
  `--externalize-weights int4_ffn` 并降低 `--maxInputLen` / `--maxKVCacheCapacity`。
- **Ollama 回退到 CPU，或出现 “Unsupported JetPack version detected” 警告**——
  先更新 Ollama（较早的构建缺少 sm_87）；据 NVIDIA 员工，在 7.2.1 上该警告无害。
  用 `ollama ps` 确认（`100% GPU`）。
- **版本或设置问题**——见[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)
  与[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。

## 来源

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/)：[支持矩阵](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)、[支持的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)、[安装](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)、[Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)、[性能基准](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)（已于 2026-09-26 核查）
- [JetPack 7.2.1 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)（已于 2026-09-26 核查）
- [NVIDIA 博客——最大化内存效率，在 NVIDIA Jetson 上运行更大的模型](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——Jetson 上的 Ollama（经员工在 JetPack 7.2.1 上确认）](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)（已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——JetPack 7.2 GPU 加速问题（wheel 索引、sm_87）](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)（已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——能在 Jetson Orin Nano Super 8GB 上运行的 AI 模型（社区）](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412)（已于 2026-09-26 核查）
- [Jetson AI Lab——TensorRT Edge-LLM 教程](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/)（已于 2026-09-26 核查）
- [Jetson AI Lab——完整文档文本（容器镜像表）](https://www.jetson-ai-lab.com/llms-full.txt)（已于 2026-09-26 核查）
- [jetson-containers（GitHub）](https://github.com/dusty-nv/jetson-containers)（已于 2026-09-26 核查）
- [Jetson AI Lab PyPI 索引——sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130)（已于 2026-09-26 核查）

*状态：草稿，待 cheny 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
