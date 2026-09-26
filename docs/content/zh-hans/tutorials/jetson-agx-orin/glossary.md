---
title: 术语表
sidebar_label: 术语表
slug: /appendix/glossary
description: >-
  Jetson AGX Orin 开发者套件的关键术语——从 JetPack 与 L4T 版本体系，
  到刷机、AI 软件栈与电源相关术语。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — component versions per the apt repository below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# 术语表

客户最常问到的术语，按主题分组。版本号对应当前的发布版本（**JetPack 7.2.1 / L4T 39.2.1**；组件版本重新核对于 2026-09-26）。

## 平台与硬件

| 术语 | 含义 |
|---|---|
| **Jetson AGX Orin** | NVIDIA 的边缘 AI 模块系列；本开发者套件搭载的是 **64GB** 模块。 |
| **模块（Module）** | 集成 SoC、内存与 eMMC，负责实际运算的小板。 |
| **载板（Carrier board）** | 带有全部端口与连接器的大板；模块插接在其上（699 针连接器，J3）。 |
| **开发者套件（Developer Kit）** | 模块 + 参考载板 + Wi-Fi 模块 + 电源——即原型开发平台。量产产品使用自研或合作伙伴载板上的模块。 |
| **SoC** | System-on-chip（片上系统）：CPU、GPU 与各类加速器集成在一颗芯片上（NVIDIA 称该产品线为“Tegra”）。 |
| **TOPS** | Trillion operations per second（每秒万亿次运算）——衡量 AI 吞吐量的指标（AGX Orin 系列最高可达 275 TOPS）。 |
| **Tensor 核心** | 专为神经网络背后的矩阵运算而设计的 GPU 核心。 |
| **eMMC** | 模块上的嵌入式闪存；默认的系统存储。 |
| **NVMe** | 通过 PCIe 连接的快速 SSD，安装在 M.2 M-Key 插槽（J1）中；可承载系统。 |
| **M.2（M-Key / E-Key）** | 插槽类型：**M-Key** = NVMe SSD，**E-Key** = Wi-Fi 模块。 |
| **CSI / GMSL** | 摄像头接口（CSI 位于摄像头连接器 J509 上；GMSL 面向车规级摄像头）。 |
| **DisplayPort（DP）** | 套件上**唯一**的显示输出；支持 MST（最多 2 台显示器）与 DSC。 |

## 软件与版本

| 术语 | 含义 |
|---|---|
| **JetPack** | NVIDIA 面向 Jetson 的 SDK 套件——操作系统、驱动、CUDA 栈与各类库。**当前版本：7.2.1。** |
| **Jetson Linux（L4T）** | JetPack 底层的板级支持包：bootloader、内核、驱动，以及 Ubuntu 根文件系统。**当前版本：r39.2.1。** |
| **BSP** | “Board support package”（板级支持包）——让板卡启动并运行所需的一切。 |
| **根文件系统（rootfs）** | 操作系统的用户空间部分（此处为 Ubuntu 24.04）。 |
| **oem-config** | 首次启动时的设置向导（语言、用户账户、网络）。 |
| **UEFI** | 套件上的固件/启动菜单；用其中的启动管理器选择启动设备。 |
| **QSPI** | 存放早期启动固件的小容量闪存。ISO 安装过程中可能出现“**QSPI capsule 更新**”提示——按 `Y`（必需）。 |
| **Force Recovery 模式** | 用于从主机 PC 刷机的特殊启动模式。进入方法：按住中间的 Force Recovery 按键，同时接入电源。 |
| **Jetson ISO** | U 盘安装镜像；NVIDIA 推荐的更新途径（无需主机 PC）。 |
| **SDK Manager** | NVIDIA 的 GUI 工具（运行在主机 PC 上），用于刷写 BSP 并安装 JetPack 组件。 |
| **Linux_for_Tegra / flash.sh** | 基于脚本的刷机工具，面向进阶与产品化用途。 |
| **OTA** | Over-the-air（空中升级）——面向已部署设备的远程软件/安全更新。 |
| **设备树（Device tree）** | 告知内核有哪些硬件接入的数据结构；定制设备树必须针对每个 L4T 版本重新构建。 |

**版本对照**（最值得记住的一张表）：

| JetPack | Jetson Linux (L4T) | Ubuntu | 内核 | CUDA |
|---|---|---|---|---|
| **7.2.1**（当前） | **39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.x（上一代） | 36.x | 22.04 | 5.15 | 12.x |

务必核实具体系统实际运行的版本：`cat /etc/nv_tegra_release`。

## AI 软件栈

| 术语 | 含义 |
|---|---|
| **CUDA** | NVIDIA 的 GPU 计算工具包（本版本中为 13.2.2）。 |
| **cuDNN** | 优化过的深度学习基础算子库（9.20.0）。 |
| **TensorRT** | 推理优化器与运行时（10.16.2）。 |
| **TensorRT 引擎** | 经编译的模型文件，与具体硬件/版本绑定。引擎**不能**跨版本升级沿用——需要重新构建。 |
| **DeepStream** | 面向多路视频分析的 SDK（9.1）。 |
| **VPI** | Vision Programming Interface——硬件加速的图像处理（4.1.4）。 |
| **Holoscan** | 面向实时传感器处理的流式 AI 框架（3.9.0）。 |
| **NGC** | NVIDIA 的容器与预训练模型目录（catalog.ngc.nvidia.com）。 |
| **容器（Container）** | 隔离、打包好的运行时（Docker）；在 Jetson 上交付 AI 软件的标准方式。 |

## 电源与监控

| 术语 | 含义 |
|---|---|
| **nvpmodel** | 用于切换电源模式的工具。运行 `sudo nvpmodel -q` 可查看你系统上的可用模式。 |
| **MAXN** | “最大性能”电源模式（无功耗上限）。 |
| **jetson_clocks** | 将时钟锁定在最高频率——适合基准测试，不适合长期作为默认设置使用。 |
| **tegrastats** | 内置的实时监控工具，可查看 CPU/GPU/内存占用。 |

## JetPack 7 时代

| 术语 | 含义 |
|---|---|
| **NemoClaw** | NVIDIA 面向 Jetson 的智能体 AI 框架；自 JetPack 7.2 起可一条命令安装。 |
| **Jetson 智能体技能（agent skills）** | NVIDIA 为设备端与 BSP 任务发布的可复用智能体工作流。 |
| **Yocto / OpenEmbedded (OE4T)** | 用于构建定制化、可复现的量产 Linux 镜像的构建系统——自 7.2 起获官方支持。 |
| **SBSA** | Server Base System Architecture（服务器基础系统架构）——Jetson **Thor** 系列所对齐的 Arm 服务器模型（不适用于本套件）。 |
| **MIG** | Multi-Instance GPU——将一块 GPU 划分为多个隔离实例（Jetson Thor，技术预览）。 |

## 参考来源

- [NVIDIA Jetson apt 仓库——实际组件版本](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)（核对于 2026-09-26）——经由 `nvidia-jetpack` 7.2.1 依赖链；[JetPack 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)的汇总表滞后（仍列出 CUDA 13.2.1 / VPI 4.1.3）
- [Jetson AGX Orin 开发者套件用户指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)（核对于 2026-09-24）

*状态：草稿，待 cheny 审核。定义整理自 NVIDIA 官方文档与行业通行用法；版本号核对于所列日期。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
