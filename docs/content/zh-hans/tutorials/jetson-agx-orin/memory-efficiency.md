---
title: 内存效率——在 64GB 上运行更大的负载
sidebar_label: 内存效率
slug: /tutorials/memory-efficiency
description: >-
  AGX Orin 开发者套件上降低内存占用的已文档化手段——平台层面的智能体技能、TensorRT
  Edge-LLM 中的模型层面优化,以及如何测量优化结果。
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

# 内存效率——在 64GB 上运行更大的负载

在边缘设备上,限制你能运行哪些模型的因素通常不是算力,而是内存。JetPack 7.2 发布时把内存效率作为头号主题,并提供了三层已文档化的优化:**平台**、**模型**与**测量**。本页梳理这些手段,每一条都链接到权威来源。

## 手段 1——平台层面(NVIDIA 智能体技能)

据 NVIDIA 介绍,JetPack 7.2 的**内存优化智能体技能**可引导 AI 智能体审计并降低整个技术栈的内存占用:

- **Bootloader 内存预留区(carveouts)**——回收 Linux 启动前就预留的内存
- **内核内存预留**——调整内核保留的内存
- **用户空间开销**——找出并移除冗余的进程与服务

NVIDIA 陈述的目标:让更强的负载装进更小的内存占用(这正是同一代硬件随软件版本不断变得更好用的原因)。从这里开始:

- [Jetson 设备端技能](https://github.com/jetson-device-skills) · [Jetson BSP 技能](https://github.com/jetson-bsp-skills)
- 背景资料:[NVIDIA 的 JetPack 7.2 内存效率博客](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **注意:** 预留区与预留内存的改动会影响启动行为。请一次只改一处,保留恢复路径(参见
> [刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)),并在投入生产前重新验证。

## 手段 2——模型层面(TensorRT Edge-LLM 的特性)

对 LLM/VLM 负载来说,最占内存的是权重与 KV cache。TensorRT Edge-LLM 文档中记录了这些手段(Jetson Orin 只运行 FP16/INT8/INT4 引擎——参见[本地 LLM 推理](/zh-hans/tutorials/jetson-agx-orin/local-llm)):

| 手段 | 作用 | 文档 |
|---|---|---|
| **量化**(Orin 上的 INT8/INT4) | 权重更小,带宽占用更低 | [量化指南](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **词表缩减** | 缩小输出词表 / embedding 表 | [缩减词表](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **KV cache 复用** | 在相关请求间复用缓存,而不是重新计算 | [KV cache 复用](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **DART 视觉 token 剪枝** | 为 VLM 裁掉冗余的图像 token | [DART 剪枝](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(文档中也记录了 FP8 KV cache,但它面向 Thor;根据官方支持矩阵,Orin 仅限 FP16/INT8/INT4 引擎。)*

## 手段 3——先测量,不要猜

- **系统视角:** `tegrastats`(内置于 Jetson Linux)可实时查看 CPU/GPU/内存——参见[验证你的系统](/zh-hans/tutorials/jetson-agx-orin/verify-your-system)。
- **模型视角:** TensorRT Edge-LLM 提供了[内存监控的设计与工具](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html)并发布[各版本的性能基准](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)。
- **方法:** 先记录基线(空载与负载下的内存占用),只改**一个**手段,再测一次。对外发布的数字始终应来自你自己的负载。

## 实际意味着什么

- 64GB 模块已经能运行 30B 级别的模型(已发布数字见[本地 LLM 推理](/zh-hans/tutorials/jetson-agx-orin/local-llm));内存优化让你能在其之上再加*更多*内容——多模型流水线、更长的上下文、常驻智能体([智能体 AI](/zh-hans/tutorials/jetson-agx-orin/agentic-ai))、与推理并行的视频流水线([DeepStream](/zh-hans/tutorials/jetson-agx-orin/deepstream))。
- 如果你的负载现在勉强装得下,先从手段 2(模型层面)入手——它风险最低、文档最全。需要从平台本身再挤出内存时,再用手段 1。

## 来源

- [NVIDIA 技术博客——JetPack 7.2 中的内存效率与智能体技能](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(核对于 2026-09-24)
- [TensorRT Edge-LLM 文档](https://nvidia.github.io/TensorRT-Edge-LLM/)(功能与支持矩阵;核对于 2026-09-24)

*状态:已于 2026-10-11 审核。内容依据所列日期的 NVIDIA 官方文档;尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布,并非 NVIDIA 官方出版物。
