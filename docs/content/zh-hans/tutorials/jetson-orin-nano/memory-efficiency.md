---
title: 内存效率——在 8GB 上运行模型
sidebar_label: 内存效率
slug: /tutorials/memory-efficiency
description: >-
  把 LLM、VLM 与视觉负载装进 Jetson Orin Nano Super 开发套件 8GB 统一内存的
  已文档化手段——平台、模型与测量三个层面。
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

# 内存效率——在 8GB 上运行模型

在 Orin Nano Super 套件上，8GB 统一内存对一切而言都是硬性上限：
操作系统、桌面、各项服务，以及模型本身。已文档化的手段分三层——**平台**、
**模型**与**测量**——本页也会指出某项技术只在更大的模组上有文档记载。

## 8GB 预算：直白数字

- 扣除固件与内核预留后，**8GB 中约有 7.6 GB 可用**——NVIDIA 内存效率博客
  所有“可用内存”数字都基于这一预算。
- CPU 内存与 GPU 内存（CUDA、多媒体缓冲区）来自**同一物理内存池**；压低一边
  对另一边也有帮助。
- 该博客的旗舰演示——一条 2B 参数的 VLM 流水线——跑在 **4.5 / 7.6 GB（~60%）**。

## 手段 1——平台层面：操作系统与服务占用了什么

以下节省数字来自 NVIDIA 的内存效率博客。

| 手段 | 文档记载的节省 | 做法 |
|---|---|---|
| 禁用图形桌面（无头模式） | 最高 865 MB | `sudo systemctl set-default multi-user.target` |
| 禁用网络与日志服务 | 最高 32 MB | `sudo systemctl disable <service-name>` |
| 显示与摄像头预留区 | 合计约 100 MB | 修改 BSP 设备树，然后重新刷机 |
| SWIOTLB 预留 | 约 4 MB | 内核参数 `swiotlb=2048`，仅在出现 DMA 问题时使用 |
| DeepStream 风格的流水线 | 最高 412 MB | 容器改裸机（70 MB）；Python 改 C++（84 MB）；禁用 Tiler/OSD 并使用 FakeSink（258 MB）——见 [DeepStream](/zh-hans/tutorials/jetson-orin-nano/deepstream) |
| 推理框架选择 | 避免超过 2.7 GB 的开销 | 精简运行时（C++ 运行时、llama.cpp）；较重的框架仅初始化就能多占超过 2.7 GB |

> **钜犀提示：** 预留区的修改属于 BSP 源码变更：需要重新刷机，而且节省有限。
> 请一次只改一处，并保留一份可用的刷机镜像——见[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)。

**Swap 不是节省，而是泄压阀。** 厂商的 RAM 优化教程用 **NVMe 上的 16 GB swap 文件**
替换 ZRAM（先执行 `sudo systemctl disable nvzramconfig`）；NVIDIA 的 8GB 演示假定
峰值时**约使用 2 GB swap**。

### 停掉服务端后，释放缓存

停掉 vLLM 或 SGLang 服务端、或一个 Docker 容器后，内存占用可能居高不下
（L4T r39.2.1 已知问题 5661165）。NVIDIA 给出的命令：

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

Edge-LLM 引擎构建遇到内存不足时也适用同样的修复：`sudo sysctl -w vm.drop_caches=3`，
再配合更小的构建限制（厂商教程）。

### 电源模式改变的是时钟，不是容量

| 电源模式 | 模式 ID | CPU 最高频率 | GPU 最高频率 | 内存最高频率 |
|---|---|---|---|---|
| 15W | 0 | 1497.6 MHz | 612 MHz | 2133 MHz |
| 25W（默认） | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

以上最高频率取自 NVIDIA r39.2 的《电源与性能》表格。
电源模式改变的是时钟频率，而不是内存容量——装不下的模型，换到更快的模式也装不下。
用 `sudo nvpmodel -q`（列出）和 `sudo nvpmodel -m <mode_id>` 切换；MAXN_SUPER
需要 Super 刷机配置，并且是实验性的（依据上述表格）。如果缺少 25W 或 MAXN SUPER，
见[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。

> **注意：** 过大的 CUDA 内存分配可能导致**设备重启**（L4T r39.2.1 已知问题
> 5699079）。同一份发布说明给出的指引是：确保 CUDA 及其他应用请求的内存不超过
> 物理可用量，并以更高的 OOM 分数启动 CUDA 进程，以免系统进程被杀死。

## 手段 2——模型层面：模型与其缓存占用了什么

### 量化是单项最大的手段

Orin 只运行 **FP16、INT8 和 INT4 引擎**；FP8 与 FP4 不能在 Orin 上运行
（Thor/Blackwell 级）。对 TensorRT Edge-LLM，请使用 **INT4 AWQ 或 INT4 GPTQ**
的 checkpoint，避开 INT8 GPTQ，绝不选择 FP8、MXFP8、FP4 或 NVFP4 的
checkpoint。见[本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)。

第一方数据：Qwen3 8B 从 FP16 到 W4A16 回收约 **10 GB**；Qwen3 4B 从 BF16 到
INT4 回收约 **5.6 GB**。NVIDIA 那张 4B 案例的图表标注的是 “Jetson Orin NX
16 GB”——那是更大的模组，所以请把这些数字当作参考，而不是对 8GB 的承诺。

在 4 位量化加高效运行时下，NVIDIA 为这一预算记录的上限是 **LLM 最高约 10B
参数、VLM 最高约 4B 参数**。

### NVIDIA 在 8GB 上实际基准测试的是什么

TensorRT Edge-LLM 发布了 0.6B 到 2B 参数模型（Qwen3 与 Qwen3.5 家族）的
Orin Nano 8GB 行；**2B 是 NVIDIA 在这个模组上基准测试的最大模型**。厂商教程
中有一个 4B INT4 AWQ 的实操（权重约 2 GB），但没有官方公布的 4B 数字。

### 引擎构建内存（TensorRT Edge-LLM）

- `--externalize-weights int4_ffn`（稠密）或 `--externalize-weights
  int4_ffn int4_moe`（MoE）可降低系统内存较少的 Orin 设备上的引擎构建内存。
- 厂商教程给出的 Orin Nano 调优限制：
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`。
  如果构建仍然内存不足，先释放系统内存，再进一步下调，例如
  `--maxInputLen 256 --maxKVCacheCapacity 512`。
  引擎在设备上构建，不能在模组之间移植。

### KV cache：容量设定与复用

KV cache 随上下文长度、batch 大小与并发数增长；它是内存预算的一部分，
而不是事后才考虑的事。

- 构建限制决定它的上限：`--maxInputLen` 与 `--maxKVCacheCapacity`；Orin
  Nano 的基准构建使用 maxInputLen 2048 与 maxKVCacheCapacity 2200，batch 1。
- **KV cache 复用**是有文档记载的 Edge-LLM 运行时能力：一个进程内、按内容
  寻址的缓存，服务于重复的输入前缀——文档、此前轮次、已生成续写与重复图像
  前缀的 prefill 状态会被复用，而不是重新计算。
- 装得下的模型文件仍可能失败：一份社区报告显示 7.4 GB 与 16 GB 的 GGUF 文件
  在 8GB 板卡上因 KV-cache 分配错误而失败——检查是否装得下时，要把 KV cache
  与运行时开销一并计入。
- **词表缩减**（把生成限制在特定任务的 token 子集内）与 **视觉 token 剪枝
  （DART）**（在 prefill 前丢弃重复的视觉 token）都是有文档的 Edge-LLM 功能
  页面。视觉引擎构建还接受图像 token 上限：`--minImageTokens`、
  `--maxImageTokens`、`--maxImageTokensPerImage`。

> **重要：** FP8 KV cache——即那项约 50% 的 KV cache 内存节省——要求 SM89 或
> 更新（Ada Lovelace 及以后）。Orin 是 SM87，因此**在本套件上不可用**。
> 请使用 FP16 KV cache。

### 一份第一方的前后对比

NVIDIA 的 8GB 案例研究（内存效率博客，表 7）：以无头模式替代完整的 GNOME
桌面（1.8 GB → 1.1 GB），再加一个 4 位量化的 GGUF VLM（Q4_K_M，6.6 GB →
2.2 GB）。该流水线此前在 Orin Nano 8GB 上跑不起来（仅 VLM 就占用 87% 的
RAM），现在则以 **4.5 / 7.6 GB（~60%）** 运行——节省超过 5.1 GB。“之前”
一列的数据来自 **Orin NX 16GB**：同样的优化把负载搬到了 8GB 套件上。

## 手段 3——测量层面：看清内存都去了哪里

| 工具 | 展示内容 | 备注 |
|---|---|---|
| `sudo tegrastats` | CPU、GPU、内存、温度、功耗 | 开发套件用户指南：在 Jetson 上，nvidia-smi 不是主要的监控工具 |
| `nvidia-smi dmon` | GPU 利用率 | 依据发布说明 5406663；Jetson Power GUI 中的 GPU 利用率“仍在评估中” |
| `free -h` | 操作系统视角的内存 | 无法告诉你 GPU 负载能分配多少 |
| procrank | 按进程的物理内存（PSS） | `git clone https://github.com/csimmonds/procrank_linux.git`、`cd procrank_linux/`、`make`、`sudo ./procrank` |
| nvmap clients | 持有 GPU/多媒体缓冲区的进程 | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### “空闲内存”不是预算

`free -h` 显示的是系统的开放视角；GPU 的分配来自同一内存池，但单独记账。
在一份针对 8GB 板卡的社区报告中，`cudaMalloc` 为 KV cache 分配失败时，
`free -h` 仍显示 5.7 GiB“空闲”[B 级证据，社区报告]。判断装不装得下，要看
~7.6 GB 的预算，而不是“空闲”。

### 方法

1. 先确认平台基础——[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)。
2. 记录基线：空闲时、再到负载下（`tegrastats`）的内存占用。
3. 每次只改一个手段，再测一次。若毫无变化，就回退。

## 从哪里入手

按文档记载的收益大小排序：

1. **运行时与量化**——NVIDIA 总结中最大的一层（据该博客的表 5，推理框架与
   模型量化约 5–10 GB）。
2. **无头模式**——最高约 865 MB，一条命令。
3. **流水线调优**——最高约 412 MB（DeepStream 风格）。
4. **NVMe 上的 swap**——泄压，而非节省。
5. **预留区与 SWIOTLB**——约 100 MB 加 4 MB，还得重新刷机。放到最后。

如果模型还是装不下，问题在模型，而不在设置：换更小的、加大量化力度、缩短
上下文，或减小 batch——见[本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)
与[常见问题](/zh-hans/tutorials/jetson-orin-nano/faq)。

## 来源

- [NVIDIA 技术博客——最大化内存效率，在 NVIDIA Jetson 上运行更大的模型](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（7.6 GB 预算、桌面 865 MB、网络/日志 32 MB、预留区、SWIOTLB、流水线节省、量化与前后对比表格、procrank 安装步骤与 nvmap clients；已于 2026-09-26 核查）
- TensorRT Edge-LLM 文档：[支持的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8 KV Cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [性能基准](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Quick Start 指南](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · 功能页：[KV cache 复用](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [词表缩减](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [视觉 token 剪枝（DART）](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)（已于 2026-09-26 核查）
- Jetson Linux 文档：[r39.2.1 发布说明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（问题 5661165、5699079、5406663） · [电源与性能，r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [开发套件操作指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（已于 2026-09-26 核查）
- Jetson AI Lab：[TensorRT Edge-LLM 教程](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [RAM 优化](https://www.jetson-ai-lab.com/tutorials/ram-optimization/)（Orin Nano 构建限制；NVMe swap；已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——Jetson 上的 Ollama](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)（社区：free -h 与 cudaMalloc 的差异；B 级；已于 2026-09-26 核查）

*状态：已于 2026-10-11 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
