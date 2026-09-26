---
title: 多路视频分析——DeepStream 9.1
sidebar_label: DeepStream 视频分析
slug: /tutorials/deepstream
description: >-
  在 AGX Orin 开发者套件上安装 DeepStream 9.1 并运行参考视频分析应用——涵盖官方安装选项、示例配置以及 JP7.2 专属注意事项。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# 多路视频分析——DeepStream 9.1

DeepStream 是 NVIDIA 用于构建加速智能视频分析（IVA）流水线的框架，并且
**DeepStream 9.1 随 JetPack 7.2 一同发布**，适用于 Jetson Orin。本教程遵循
NVIDIA 官方的安装与快速入门文档；下文每一条命令均取自（或直接总结自）这些
官方页面。

**版本搭配：** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔
TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(依据 NVIDIA 官方兼容性
对照表)*。

## 1. 安装

NVIDIA 在 Jetson 上提供四种安装方式；官方说明推荐**新用户使用 Docker**
（速度最快、免装依赖）：

- **方式 4——Docker（推荐新用户）：** 使用 NGC DeepStream 容器——参见 [Docker 容器](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)。
- **方式 1——SDK Manager：** 在「Additional SDKs」中勾选 **DeepStreamSDK**，与 JetPack 7.2 GA 组件一起安装。
- **方式 2——tar 包：** 下载 `deepstream_sdk_v9.1.0_jetson.tbz2`（来自 [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)），然后：
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **方式 3——Debian 包：** 用 `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb` 安装 `deepstream-9.1_9.1.0-1_arm64.deb`。

**前置依赖包**（原生安装的官方依赖清单）：

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **钜犀提示：** 如果你遇到官方文档记载的 RTSP 问题（应用处理 RTSP 流时卡在
> EOS），请在装完上述依赖包后，运行 `/opt/nvidia/deepstream/deepstream/`
> 目录下的 `update_rtpmanager.sh` 脚本。

## 2. 提升时钟频率（运行任何程序之前）

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA 特别注明一个例外：**Jetson Orin Nano** 的 MAXN SUPER 模式要用 `-m 2`；
其他所有 Orin 模组（包括 AGX Orin）都用 `-m 0`。请在运行 DeepStream 应用之前
执行上述命令。

## 3. 运行参考应用

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

预期效果（据 NVIDIA 说明）：30 路模拟 1080p 视频流经 ResNet 推理后的平铺显示
画面，以及打印在终端中的性能指标——**该配置下约 30 FPS**。单击任意画面格即可
放大查看；右键单击可返回平铺视图。

值得探索的配置文件（均位于该目录）：

| 配置 | 用途 |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | 30 路视频流基准测试 |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | 跟踪 + 二级推理 |
| `source1_usb_dec_infer_resnet.txt` | **单路 USB 摄像头** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | **CSI 摄像头**方案（驱动支持取决于你的摄像头） |
| `source2_1080p_dec_infer-resnet_demux.txt` | Demux 示例 |

官方快速入门中的注意事项：

- **新模型首次运行需要数分钟**，期间会生成 TensorRT 引擎；之后的运行会直接复用它。
- 如果 GStreamer 元件（element）初始化失败，请清除缓存：`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **无显示器运行（无头模式）：** 默认的 EGL sink 需要接显示器。配置文件支持改用 **RTSP 输出 sink**（见 30 路视频流配置中的 `[sink2]` 组）——把结果推流到另一台机器。
- 所有预编译的示例应用都位于 `/opt/nvidia/deepstream/deepstream-9.1/samples/` 下——每个都附带 README。

## 4. JetPack 7.2 上 DeepStream 9.1 的新变化

- **代理辅助构建流水线：** NVIDIA 文档介绍了 *DeepStream Coding Agent*（用 AI 代理辅助构建流水线）——[文档](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent)。
- **流水线中的 LLM/VLM：** 参考应用包含 **deepstream-vllm-plugin**，可将视频流水线与大模型推理结合——参见[官方文档](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html)。如需在 DeepStream 之外进行端侧模型推理，请参见 [本地 LLM 推理](/zh-hans/tutorials/jetson-agx-orin/local-llm)。
- **设备端运行 Triton：** 如需以原生方式（不用 Docker）运行 Triton Inference Server，请在 samples 目录下执行 `sudo ./triton_backend_setup.sh`（会为 Jetson 安装 Triton 2.68.0）。

## 故障排查与延伸阅读

- [DeepStream 故障排查与常见问题](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [性能调优](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)——当你超出参考配置的范围后就需要用到它
- [示例配置详解](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- 系统层面的问题（显示、供电、存储）：请参见[故障排查](/zh-hans/tutorials/jetson-agx-orin/troubleshooting)

## 资料来源

- [DeepStream 安装指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)（查阅于 2026-09-24）
- [DeepStream 快速入门指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html)（查阅于 2026-09-24）
- [JetPack 7.2.1 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)（查阅于 2026-09-24）—— ⚠️ 其组件表部分行滞后；实际安装的版本请参见 [下载](/zh-hans/tutorials/jetson-agx-orin/downloads)

*状态：草稿，待 cheny 审阅。内容依据为截至所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
