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

下表是 NVIDIA 官方给出的 **JetPack 7.2.1 / Jetson Linux 39.2.1** 组件清单（于 2026-09-23 在 NVIDIA JetPack 下载页核对）：

| 组件 | 版本 |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| 操作系统 | Ubuntu 24.04 (L4T) |
| 内核 | 6.8 |
| CUDA | 13.2.1 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI（计算机视觉） | 4.1.3 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19（含 ISO 镜像） |
| Isaac ROS | **JetPack 7 尚未提供**（据 NVIDIA 称“即将推出”） |

> **钜犀注：** `dpkg` 显示的软件包版本可能带有构建后缀（例如 `13.2.1-b48`），这属于正常现象——请比对版本号本身，而不是后缀。机器人方向的用户请注意：在规划依赖 Isaac ROS 的工作之前，先查看 Isaac ROS 这一行。

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

*状态：草稿，待 cheny 审核。内容基于截至所列日期的 NVIDIA 官方文档；尚未由钜犀科技在物理硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
