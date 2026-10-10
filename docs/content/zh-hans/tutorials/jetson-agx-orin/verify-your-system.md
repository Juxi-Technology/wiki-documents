---
title: 验证你的系统——版本与组件清单
sidebar_label: 验证你的系统
slug: /getting-started/verify-your-system
description: >-
  确认你的 Jetson AGX Orin 开发套件运行 JetPack 7.2.1 及完整组件栈——
  附版本检查命令与预期组件清单。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: still lists Isaac ROS as "coming soon"; see the note under Step 3
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# 验证你的系统

安装或更新好你的套件之后，请确认两件事：**BSP 版本**和**已安装的 JetPack 组件栈**。这两项检查用时都不到一分钟。

## 第 1 步 —— 检查 L4T（BSP）版本

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** 系统会输出：

```
# R39 (release), REVISION: 2.1, ...
```

如果输出显示的是较旧的版本（例如 R35），请先更新 BSP——参见 **[刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)**。

## 第 2 步 —— 检查 JetPack 组件

JetPack 组件（CUDA、cuDNN、TensorRT……）以 Debian 软件包的形式安装。请检查元包是否存在：

```bash
dpkg -l | grep -i nvidia-jetpack
```

再确认 CUDA 工具包是否可用：

```bash
nvcc --version
```

本版本的预期输出为：**CUDA 13.2**。如果 `nvcc` 缺失或元包不存在，请用以下命令安装组件：

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

（根据网络速度不同，这个过程大约需要一小时——参见 [快速开始 → 第 3 步](/zh-hans/tutorials/jetson-agx-orin/quick-start)。）

## 第 3 步 —— JetPack 7.2.1 的预期版本

下表列出的是 **JetPack 7.2.1 / Jetson Linux 39.2.1** 实际安装的组件，于 2026-09-26 通过 [NVIDIA 的 Jetson apt 仓库](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)中的 `nvidia-jetpack` 7.2.1 依赖链核对：

| 组件 | 版本 |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| 操作系统 | Ubuntu 24.04 (L4T) |
| 内核 | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI（计算机视觉） | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19（含 ISO 镜像） |
| Isaac ROS | *JetPack 页面仍显示“即将推出”*——独立发布，见下方说明 |

> **钜犀注：** `dpkg` 显示的软件包版本可能带有构建或修订后缀（例如 `13.2.2-1`，L4T 软件包则如 `7.2.1-b49`），这属于正常现象——请比对版本号本身，而不是后缀。
>
> **JetPack 下载页滞后的地方（2026-09-26 核对）：** 该页面的汇总表仍显示 CUDA **13.2.1** 和 VPI **4.1.3**——那是 JetPack **7.2** 的版本号。`nvidia-jetpack` 7.2.1 实际安装的是 CUDA **13.2.2**（构建号 13.2.86）和 VPI **4.1.4**。以上面的 apt 仓库为准。
>
> **Isaac ROS（2026-09-26 重新核对）：** JetPack 下载页仍显示“即将推出”，但 Isaac ROS 自 **4.6.0** 版（2026-08-18）发布起已支持 Jetson Orin + JetPack 7.2。Isaac ROS 独立于 JetPack 发布，因此其自身的发行说明才是权威来源。机器人方向的用户：在规划依赖 Isaac ROS 的工作之前，请先阅读 [机器人(现状)](/zh-hans/tutorials/jetson-agx-orin/robotics)。

## 可选 —— 快速查看系统活动

`tegrastats`（随 Jetson Linux 提供）会实时打印 CPU/GPU/内存占用情况：

```bash
tegrastats
```

按 `Ctrl`+`C` 停止。

## 如果有组件缺失

1. 重新执行 `sudo apt update && sudo apt install nvidia-jetpack`。
2. 确认安装流程中的 `apt dist-upgrade` + 重启已经完成（参见 [快速开始 → 第 3 步](/zh-hans/tutorials/jetson-agx-orin/quick-start)）。
3. 检查磁盘空间（`df -h`）和网络连接是否正常。
4. 还是没解决？参见 **[故障排查](/zh-hans/tutorials/jetson-agx-orin/troubleshooting)**。

## 参考来源

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html)（核对于 2026-09-23）
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads)（核对于 2026-09-23）

*状态：已于 2026-10-11 审核。内容基于截至所列日期的 NVIDIA 官方文档；尚未由钜犀科技在物理硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
