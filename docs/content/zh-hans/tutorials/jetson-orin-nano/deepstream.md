---
title: 多路视频分析——DeepStream 9.1
sidebar_label: DeepStream 视频分析
slug: /tutorials/deepstream
description: >-
  在 Jetson Orin Nano Super 开发套件（8GB）上运行 NVIDIA DeepStream 9.1——
  版本搭配、安装、解码限制、内存与无头 RTSP 输出。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# 多路视频分析——DeepStream 9.1

DeepStream 是 NVIDIA 用于构建加速智能视频分析（IVA）流水线的 SDK，
DeepStream 9.1 则是在 JetPack 7.2 下运行于 Jetson Orin 的版本。本页涵盖
版本搭配、安装途径、解码限制、首次运行的预期、无头 RTSP 输出，以及面向
8GB Orin Nano Super 开发套件的内存说明。

## 1. 版本搭配

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2**（Docker 镜像 `deepstream:9.1`），该搭配列于
[DeepStream 安装指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)
的 *Platform and OS Compatibility*（平台与操作系统兼容性）表格。

DeepStream 8.0 与 9.0 只列出了 **AGX Thor**；9.1 是第一个在对应行内包含
Jetson Orin 的 9.x 版本（“AGX Thor, Jetson Orin”）——该行以
**“Jetson Orin”** 指代整个系列；更早的行（DS 6.3 到 DS 7.1）曾明确写 “Orin nano”。
未找到明确确认 Orin Nano 的 9.1 发布说明——请把支持视为组标签所隐含
（尚未确认）。基线套件：JetPack 7.2.1 / L4T r39.2.1。

## 2. 本套件能解码什么

[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
解码器使用 NVDEC 硬件引擎，支持 **H.264、H.265、AV1、JPEG 与 MJPEG**。
已发布的 Orin Nano 模组规格：

| 能力 | 规格 |
|---|---|
| 视频解码（H.265） | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| 视频编码 | 无硬件编码器——“1080p30 由 1-2 个 CPU 核心支持” |
| DLA · PVA | 无 |

推理在 [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
插件中基于 TensorRT 引擎运行：FP16、FP32 与 INT8 模型（FP16 与 INT8
取决于平台）；INT8 需要校准文件。该插件的 `enable-dla` 选项在本模组上
没有可指向的引擎——Orin Nano 产品页列出的是 “DL Accelerator: -” 与
“Vision Accelerator: -”。

**在 8GB 下：** 解码帧、引擎与应用内存共用同一个内存池，且没有 DLA 可以
分担工作。下文“30 路”示例要解码 30 路 1080p 视频流；而本模组公布的解码
能力为 11x 1080p30（H.265），因此要按更少的路数或更低的分辨率来规划。
此外**没有硬件视频编码器**——编码输出（例如 RTSP 推流）跑在 CPU 上。

## 3. 安装——优先 Docker

NVIDIA 的指南写道：“推荐新用户使用方式 4（Docker 容器），这是最快捷、
免装依赖的方案。”Jetson 上的四种方式：

| 方式 | 是什么 |
|---|---|
| 1——SDK Manager | 与 JetPack 7.2 GA 组件一起，在 “Additional SDKs” 下勾选 **DeepStreamSDK**。 |
| 2——tar 包 | `deepstream_sdk_v9.1.0_jetson.tbz2`，GitHub release 资产。 |
| 3——Debian 包 | `deepstream-9.1_9.1.0-1_arm64.deb`。 |
| 4——Docker（推荐） | NGC（`nvcr.io`）上的 Jetson 容器。 |

Jetson 容器是 `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`（参考应用、
示例模型与配置）和 `nvcr.io/nvidia/deepstream:9.1-triton-multiarch`（另含
devel 库与 Triton 后端）。前置条件：`docker-ce`、NVIDIA Container Toolkit、
NGC 账户，以及 `docker login nvcr.io`（用户名 `$oauthtoken`，密码为你的
NGC API 密钥）。

> **重要**：NVIDIA 表示：“Jetson Docker 容器仅用于部署。它们不支持在容器内
> 进行 DeepStream 软件开发。”请在套件上原生构建应用，再把你的二进制文件
> 加进你自己的镜像。

在 Docker 中改为运行 `user_additional_install.sh`（见下文的 EOS 说明）。
Triton 容器的 “Failed to detect NVIDIA driver version” 消息无害。

> **钜犀提示：** 如需最简的主机安装，在 SDK Manager 中只选 “Jetson OS”，
> 然后运行 `sudo apt install docker.io`、`sudo apt install
> nvidia-container`、`sudo apt install nvidia-l4t-gstreamer`，以及
> `sudo service docker restart`。

## 4. 提升时钟频率——用本套件专属的电源模式

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

引自官方快速入门：“对于 Jetson Orin Nano 模组，请使用 `sudo nvpmodel -m 2`
而不是 `-m 0` 来启用 MAXN SUPER 模式。其他所有 Jetson Orin 模组（包括
Orin NX）请使用 `-m 0`。”请在运行 DeepStream 应用之前执行这些命令。在按
Super 配置的 8GB 套件上，电源模式为 **15W（模式 0）**、**25W（模式 1，
默认）**和 **MAXN_SUPER（模式 2）**；MAXN_SUPER 只存在于按 Super 配置
刷机的设备上。

> **注意**：如果没有 25W / MAXN SUPER，或 `nvpmodel -m 2` 报错指出电源
> 模式无效，说明该设备未按 Super 配置刷机。见[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。

## 5. 首次运行——TensorRT 引擎在首次使用时构建

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

引自官方快速入门：对于尚无现成引擎文件的模型，“文件生成与应用启动可能需要
几分钟（取决于平台与模型）。之后的运行可以复用这些生成的引擎文件，以加快
加载。”终端中会滚动显示 FPS 指标。快速入门里的 “（该配置约 30 FPS）” 是
文档的通用数字——**不是 Orin Nano 的实测值**。如果应用无法创建 Gst 元件，
请清除缓存后重试：
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`。其他示例配置涵盖
USB 与 CSI 摄像头，以及带二级推理的跟踪。

## 6. 无头运行与 RTSP 输出

快速入门记载了如何在没有显示器的情况下运行：默认配置使用基于 EGL 的
`nveglglessink` 渲染器（`[sink]` 组中的 `type=2`），它需要运行中的
X server。改为添加一个 RTSP 输出 sink 组——`source30_1080p_dec_infer-resnet_tiled_display.txt`
中的 `[sink2]` 组就是示例——并把 EGL sink 组设为 `enable=0`。编码后的
RTSP 输出跑在 CPU 上（第 2 节：无硬件编码器）。

> **钜犀提示：** 使用 RTSP 流时，应用可能卡在到达 EOS（`rtpjitterbuffer`
> 的问题）。在裸机上，装完快速入门的依赖包后，在
> `/opt/nvidia/deepstream/deepstream/` 中运行一次 `update_rtpmanager.sh`。
> 在 Docker 中则改为运行 `user_additional_install.sh`。

## 7. 面向 8GB 的内存规划

NVIDIA 的内存效率博客写道：“Jetson Orin Nano 8GB 模组，在 8GB 物理 DRAM
中，扣除固件与内核预留后约有 7.6 GB 可用。”CPU 与 GPU 共用这个内存池。
DeepStream 风格流水线有文档记载的手段：

| 手段 | 可回收的内存 |
|---|---|
| 用裸机代替容器 | 最高 70 MB |
| 从 Python 应用切换到 C++ | 最高 84 MB |
| 禁用 Tiler/OSD 并使用 FakeSink | 最高 258 MB |
| **合计** | **412 MB** |

禁用 Tiler/OSD 并使用 FakeSink “可移除可视化所需的显示环节，而无头或生产
部署并不需要它们。这能节省内存、降低 GPU 负载并提升吞吐量”。这与上文的
无头 RTSP 路径搭配使用；禁用图形桌面还能释放最高 865 MB。完整的 8GB 攻略
见[面向 8GB 的内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)。

## NVIDIA 未针对本套件发布的内容

NVIDIA 官方的 DeepStream 9.1 Jetson 性能页只覆盖两个平台：**Jetson AGX
Thor** 与 **Jetson AGX Orin**。没有发布任何 Orin Nano 的 FPS 数字；不要把
AGX Orin 的行当作 Orin Nano 的性能。做容量规划时，从解码能力（第 2 节）
出发，然后逐步降低路数与分辨率，直到流水线装得下。

最接近的已发布数据点，是 [Ultralytics 的 Jetson 基准](https://docs.ultralytics.com/guides/nvidia-jetson/)：
YOLO26n 在 Orin Nano Super 上、640 输入尺寸下，TensorRT FP16 引擎约
4.57 ms/image（约 219 FPS），INT8 约 3.80 ms/image（约 263 FPS）——
**厂商数据，测量于 JetPack 6.1 时代的软件，并非本套件的 7.2.1 软件栈**；
推理时间不含前处理/后处理。据同一来源，只有 PyTorch、TorchScript 与
TensorRT 三种导出格式使用 GPU——其他导出格式跑在 CPU 上。

## 故障排查与延伸阅读

- 系统层面的问题（电源模式、存储、显示）：
  [故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting) ·
  [面向 8GB 的内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)。
- DeepStream 之外的模型：[本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm) ·
  官方性能参考：
  [DeepStream 性能](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)。

## 资料来源

- [DeepStream 安装指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)（已于 2026-09-26 核查）
- [DeepStream 快速入门指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html)（已于 2026-09-26 核查）
- [DeepStream Docker 容器](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)（已于 2026-09-26 核查）
- [DeepStream 性能](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)（已于 2026-09-26 核查）
- [Gst-nvvideo4linux2（硬件解码器）](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)（已于 2026-09-26 核查）
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)（已于 2026-09-26 核查）
- [Jetson Orin 模组——解码、编码与加速器规格](https://developer.nvidia.com/embedded/jetson-orin)（已于 2026-09-26 核查）
- [最大化内存效率，在 NVIDIA Jetson 上运行更大的模型（开发者博客）](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（已于 2026-09-26 核查）
- [Jetson Linux r39.2 开发者指南——电源与性能](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)（已于 2026-09-26 核查）
- [Ultralytics——NVIDIA Jetson 指南（厂商基准）](https://docs.ultralytics.com/guides/nvidia-jetson/)（已于 2026-09-26 核查）

*状态：草稿，待 cheny 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
