---
title: 本地运行 LLM——JetPack 7.2 上的 TensorRT Edge-LLM
sidebar_label: 本地 LLM 推理
slug: /tutorials/local-llm
description: >-
  在 AGX Orin 开发者套件上使用 NVIDIA TensorRT Edge-LLM 本地运行大语言与多模态模型——支持的模型、Orin 的限制、工作流与预期性能。
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

# 本地运行 LLM——JetPack 7.2 上的 TensorRT Edge-LLM

你的 AGX Orin 64GB 可以在本地运行大语言模型——无需云端、无需网络。
NVIDIA 为此提供的优化路径是 **TensorRT Edge-LLM**，它**正式支持在
JetPack 7.2 上运行 Jetson Orin**。本页帮你建立整体认识：你的套件能做什么、
不能做什么，工作流的大致形态，以及可以预期的性能。权威的分步操作指南见
NVIDIA 官方文档（文中多处给出链接）。

## 先读这里——三条 Orin 专属事实

1. **Orin 只运行 FP16、INT8 和 INT4 引擎。Orin 不支持 FP8 和 FP4**
   （它们属于 Thor 级平台的能力）。NVIDIA 的支持矩阵对此有明确说明——请据此
   规划你的量化方案。
2. **在 Orin 部署路径中，引擎在设备本身上构建**（并非从 PC 交叉编译）。
3. **JetPack 7.2 是受支持的软件栈**——CUDA 13.2 搭配平台版 TensorRT（本版本
   为 10.16.2）。aarch64 wheel 面向 Jetson Orin（SM87），支持 Python 3.10–3.12。

*(来源：TensorRT Edge-LLM 官方支持矩阵，已于 2026-09-24 核查。)*

## TensorRT Edge-LLM 覆盖的能力

根据 NVIDIA 的文档，Edge-LLM 为边缘平台上的**文本、视觉、音频、语音与动作
模型**提供优化推理：

| 能力 | 文档中的示例 |
|---|---|
| 文本生成 | 包括 Qwen、Gemma、Nemotron 在内的 LLM 系列 |
| 多模态(VLM) | Phi-4 Multimodal 示例 |
| 语音识别(ASR) | 专门的示例工作流 |
| 语音生成(TTS) | 专门的示例工作流 |
| 视觉-语言-动作 | VLA 示例（机器人方向） |
| Omni(音频 + 视觉 + 语音 I/O) | 专门的示例工作流 |

功能亮点：量化（Orin 上的 INT8/INT4）、推测解码（EAGLE3、DFlash 等）、
**KV cache 复用**、**词表缩减**、面向 VLM 的 **DART 视觉 token 剪枝**、
流式输出，以及 LoRA 支持。

## 工作流（文档所述）

TensorRT Edge-LLM 的文档提供了两条 Quick Start 路径：

1. **ONNX + C++ 运行时**——导出/量化 checkpoint（通常在 x86 主机上进行），传输到设备，在设备上构建引擎，运行 C++ 运行时。
2. **单行 Python 服务端**——更快获得可用的服务端点。

从这里开始：**[TensorRT Edge-LLM Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Quick Start 之外：

- [安装选项 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)（源码构建 C++ 运行时、导出/量化工作流、实验性本地 wheel）
- [支持的模型 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [量化指南 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [KV cache 复用 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [DART 剪枝 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **钜犀提示：**导出/量化工具在 x86 Linux 主机上运行效果最佳
> （依据文档中面向 x86 开发者的条目）；**引擎构建与推理都在你的套件上
> 进行**。请为模型 checkpoint 预留磁盘空间——每个模型通常需要数 GB。

## 对外服务：OpenAI 兼容端点（以及 Claude Code）

文档中包含一个**实验性的 Python API 与服务端**，对外暴露 OpenAI 兼容的
对话接口——文档给出了面向 OpenAI 风格客户端的示例，甚至还有一个
**"Anthropic 与 Claude Code" 集成示例**（把 Claude Code 指向你 Jetson 上
托管的端点）。

- [实验性 Python API 与服务端 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## 预期性能（AGX Orin 64GB）

NVIDIA 公布了 64GB 模块在 JetPack 7.2 下的以下 tokens/sec 数据（2026 年
6 月；完整背景与方法说明见来源博客）：

| 模型 | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

实际数据会因模型、量化方式、上下文长度和电源模式而不同。请将其视为厂商公布
的参考值，而非保证。

## 更简单的替代方案

如果目前 Edge-LLM 的导出/构建工作流超出了你的需要，NVIDIA 的
[Jetson AI Lab](https://www.jetson-ai-lab.com) 发布了面向其他运行时
（llama.cpp、vLLM 等）的实操教程——在照着较旧的教程操作之前，请先核对
其 JetPack 版本说明。

## 故障排查

- **首次运行较慢：**引擎构建在首次启动时可能耗时数分钟；之后的运行会复用引擎（DeepStream 也有相同行为，参见[我们的 DeepStream 教程](/zh-hans/tutorials/jetson-agx-orin/deepstream)）。
- **FP8/FP4 指令无法工作：**属预期情况——Orin 仅支持 FP16/INT8/INT4 引擎。
- **版本不对：**请先确认 JetPack 7.2.1——[验证你的系统](/zh-hans/tutorials/jetson-agx-orin/verify-your-system)。

## 来源

- [TensorRT Edge-LLM——官方支持矩阵](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)（已于 2026-09-24 核查）
- [TensorRT Edge-LLM 文档主页](https://nvidia.github.io/TensorRT-Edge-LLM/)（v0.10.1，已于 2026-09-24 核查）
- [NVIDIA 技术博客——借助 JetPack 7.2 的内存效率在边缘部署智能体就绪的 AI](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)（性能数据；已于 2026-09-24 核查）

*状态：已于 2026-10-11 审核。内容依据所列日期的 NVIDIA 官方文档；
尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 与 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
