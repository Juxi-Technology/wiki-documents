---
title: 产品概述——Jetson Orin Nano Super Developer Kit
sidebar_label: 产品概述
slug: /product/overview
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit（8GB）是什么、
  用来做什么，以及它在 Jetson Orin 家族中的定位。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# 产品概述

![Jetson Orin Nano Super Developer Kit](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

NVIDIA® Jetson Orin Nano™ Super Developer Kit 是 Jetson Orin 家族的入门套件：一台用于在边缘侧原型验证计算机视觉、机器人以及本地生成式 AI 应用的小型 AI 计算机。它运行 JetPack 7.2.1（Jetson Linux / L4T r39.2.1）——这是本套件当前的发布版本。

## 关键事实（已对照 NVIDIA 官方文档核实）

- “Super” 是一种软件配置，而不是新硬件：与早先的 “Jetson Orin Nano Developer Kit” 是同一模块（P3767）和载板（P3768），在 Super 更新时更名。*(Developer Kit User Guide; NVIDIA Super Boost announcement)*
- 套件的核心数字：最高 **67 INT8 TOPS**，最高 **102 GB/s** 内存带宽，功耗 **7W 到 25W**，生成式 AI 性能较上一代提升 **1.7x**。*(Developer Kit User Guide — Introduction)*
- Ampere 架构 GPU，**1,024 个 CUDA 核心和 32 个 Tensor 核心**；**6 核 Arm Cortex-A78AE** 64 位 CPU，最高 1.7 GHz；**8GB 128 位 LPDDR5**。*(Datasheet; Jetson Orin spec page)*
- 存储：**模块底面的 microSD 卡槽**加**外接 NVMe** 支持；无 eMMC，包装内也不含任何存储。*(Datasheet; Quick Start)*
- 通过 U 盘上的 Jetson ISO 方式运行 JetPack **7.2.1**（L4T **r39.2.1**；Ubuntu 24.04、内核 6.8、CUDA 13.2.2、TensorRT 10.16.2）。支持范围：JetPack 6.x 或 7.2/7.2.1（7.0/7.1 不支持 Orin）。*(Quick Start; JetPack downloads; JetPack archive)*
- 载板：DisplayPort、千兆以太网、四个 USB 3.2 Type-A 端口、USB-C、两个 MIPI CSI 连接器、三个 M.2 插槽、40 针排针。见 **[接口与硬件布局](/zh-hans/tutorials/jetson-orin-nano/interfaces)**。*(Developer Kit User Guide — Hardware Layout)*

## “Super” 意味着什么

Super 性能提升来自一个软件电源模式：它在相同硬件上拉高 GPU、内存和 CPU 时钟。NVIDIA 表示，现有套件通过升级 JetPack 即可获得：“现有的 Jetson Orin Nano Developer Kit 用户只需一次软件升级，就能获得 ‘Super’ 性能提升。”*(Developer Kit User Guide; NVIDIA Super Boost announcement)*

下表对比初代套件与 Super 配置。*(NVIDIA Super Boost announcement)*

| 项目 | 初代 Orin Nano Developer Kit | Super 配置 |
|---|---|---|
| GPU 时钟 | 635 MHz | 1,020 MHz |
| CPU 时钟 | 1.5 GHz | 1.7 GHz |
| 内存带宽 | 68 GB/s | 102 GB/s |
| AI 性能（稀疏 INT8） | 40 TOPS | 67 TOPS |
| FP16 算力 | 10 TFLOPs | 17 TFLOPs |
| 电源模式 | 7W、15W | 7W、15W、25W |
| 价格（2024 年 12 月 Super 发布时） | $499 | $249 |

*有一个数字，NVIDIA 自家材料也存在出入：Super 公告将上一代内存带宽描述为 “65 GB/s”，而 NVIDIA 的模块规格表为初代 8 GB 配置列出 68 GB/s。上表采用规格表数字；两者指的是同一代 Super 之前的硬件。*

当前价格请见钜犀商店的[该套件商品页](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)（SKU JX00110）。

从 JetPack 7.2.1 起，Jetson ISO 默认以 Super 配置刷写套件 *(JetPack downloads page)*。最初用 JetPack 7.2 ISO 安装的设备可能保留非 Super 配置；如果缺少 25W 或 MAXN SUPER，见 **[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)**。

在 L4T r39.2 的电源模式表中，Super 配置列出 15W（模式 0）、25W（模式 1，默认）和 MAXN SUPER（模式 2，实验性；仅见于以 Super 配置刷写的套件）。MAXN SUPER 让 CPU 最高跑到 1.7 GHz、GPU 最高 1,020 MHz、内存控制器 3,199 MHz。用 `sudo /usr/sbin/nvpmodel -q` 读取模式；用 `sudo /usr/sbin/nvpmodel -m <mode_id>` 设置。NVIDIA 的套件页面写的是 “7W 到 25W”；r39.2 表格列出的是上述三种模式——请在 **[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)** 中检查你的设备。*(L4T r39.2 Power and Performance page)*

## 模块规格

| 项目 | 规格 |
|---|---|
| AI 性能 | Super 配置下最高 67 稀疏 INT8 TOPS（33 稠密） |
| GPU | NVIDIA Ampere 架构，1,024 个 CUDA 核心，32 个 Tensor 核心，最高 1,020 MHz |
| CPU | 6 核 Arm Cortex-A78AE v8.2（64 位），1.5MB L2 + 4MB L3，最高 1.7 GHz |
| 内存 | 8GB 128 位 LPDDR5，102 GB/s |
| 存储 | 模块底面的 microSD 卡槽；支持外接 NVMe SSD |
| 视频解码 | 1x 4K60（H.265）、2x 4K30、5x 1080p60、11x 1080p30 |
| 视频编码 | 使用 1–2 个 CPU 核心实现 1080p30（无专用编码硬件） |
| AI 加速器 | 无 DLA、无 PVA——推理在 GPU Tensor 核心上运行 |
| 模块外形 | 260 针 SO-DIMM，69.6 mm x 45 mm |

*来源：Jetson Orin Nano Super Developer Kit Datasheet（2024 年 12 月）；NVIDIA Jetson Orin 规格页；L4T r39.2 Power and Performance page。*

## 料号

| 料号 | 指代 |
|---|---|
| P3766 | 完整的 Jetson Orin Nano Developer Kit |
| P3767 | 系统级模块（SOM） |
| P3768 | 参考载板 |
| P3767-0005 | 开发者套件中的模块 SKU（Jetson Orin Nano 8GB，“仅供开发”） |

本文档系列**仅覆盖 8GB 开发者套件**。商用版 8GB Orin Nano 模块是另一个料号（**P3767-0003**），在刷机工具中是独立的目标——参见 [刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates) 中的模块 SKU 说明。

## 它在 Orin 家族中的位置

- **Jetson Orin Nano 8GB——本套件。** Orin 家族的入门选择：67 INT8 TOPS、8GB 统一内存、7W 到 25W。
- **Jetson Orin NX。** 同一块载板可为 Orin NX 模块供电、测试和开发（需要自备散热器和风扇；全新出厂模块必须通过 Ubuntu 主机用 SDK Manager 刷机）。*(Developer Kit User Guide — How-To)*
- **Jetson AGX Orin——旗舰档。** AGX Orin 32GB 模块在 Super Mode 下可达 241 TOPS *(JetPack 7.2 release highlights)*。见钜犀的 [Jetson AGX Orin 系列](/zh-hans/tutorials/jetson-agx-orin/quick-start)。

规划时最大的约束是 **8GB 统一内存**；由于没有 DLA 和 PVA，AI 负载只能由 GPU 承担——见 **[内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)** 和 **[本地 LLM](/zh-hans/tutorials/jetson-orin-nano/local-llm)**。

## 开发者套件的用途

- **为量产做原型验证。** JetPack 7.2.1 服务于整个 Orin 家族，因此在套件上做的工作可以直接迁移到产品中使用的 Orin 模块。*(JetPack downloads page)*
- **计算机视觉。** 两个 MIPI CSI 摄像头连接器；DeepStream SDK 9.1 在 JetPack 7.2.1 组件矩阵中——见 **[DeepStream](/zh-hans/tutorials/jetson-orin-nano/deepstream)**。
- **本地生成式 AI。** 核心卖点是生成式 AI **1.7x** 的提升；8GB 的上限决定了能跑什么——见 **[本地 LLM](/zh-hans/tutorials/jetson-orin-nano/local-llm)**。
- **机器人。** NVIDIA 员工建议 JetPack 7.2.1 搭配 ROS 2 Jazzy——见 **[机器人](/zh-hans/tutorials/jetson-orin-nano/robotics)**。

> **钜犀提示：** 量产产品构建在 Jetson Orin 模块之上——Orin Nano 8GB 或 Orin NX——安装在你自研的载板上。开发者套件是开发验证的载体，而不是量产部件。

## 包装清单

包装内含开发套件（装在参考载板上的 Orin Nano 8GB 模块，带散热器）、19 V 电源、随附的 802.11ac/ab/gn 无线网卡，以及一张快速开始与支持卡片。NVIDIA 明确说明，该套件“包装内不含可移动存储”。*(Datasheet; Quick Start)*

你需要自备：

- **存储**——microSD 卡（64GB，UHS-1 或更大）或 NVMe SSD。microSD 卡槽位于**模块底面**；请在开机前插入。钜犀商店的套餐已包含一张 64 GB microSD 卡，因此只有当你拿到的是裸机 NVIDIA 包装盒、或想改用 NVMe SSD 时才需要另购存储。
- **一个安装用 U 盘**——16GB 或更大。请把 JetPack ISO 写入这个 U 盘，而不是 microSD 卡：SD 卡镜像已在 JetPack 7.2 中移除。
- **一台主机电脑**，至少有 25GB 可用空间；桌面安装还需要 DisplayPort 显示器和 USB 键鼠。*(Quick Start; Supported Hardware)*

> **重要** 非常旧的出厂固件必须先更新——JetPack 7.2.1 要求 JetPack 6.x 世代的 UEFI/QSPI 固件。见 **[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)** 和 **[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)**。

## 下一步

- **[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)** —— 从开箱到可用的 JetPack 7.2.1 系统
- **[接口与硬件布局](/zh-hans/tutorials/jetson-orin-nano/interfaces)** —— 每个端口、插槽与连接器
- **[下载](/zh-hans/tutorials/jetson-orin-nano/downloads)** —— 官方镜像、工具与文档链接

## 资料来源

- [Jetson Orin Nano 开发者套件用户指南——简介](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——硬件布局](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——JetPack 6.x 更新路径](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——支持的硬件](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html)（核对于 2026-09-26）
- [NVIDIA Super Boost：Jetson Orin Nano Developer Kit 迎来 Super 提升](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)（核对于 2026-09-26）
- [NVIDIA JetPack 6.2 为 Jetson Orin Nano 与 Jetson Orin NX 模块带来 Super Mode](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/)（作为 Super 电源模式的公告链接）
- [NVIDIA Jetson Orin 模块与开发者套件规格页](https://developer.nvidia.com/embedded/jetson-orin)（核对于 2026-09-26）
- [JetPack SDK 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)（核对于 2026-09-26）
- [JetPack 存档页](https://developer.nvidia.com/embedded/jetpack-archive)（核对于 2026-09-26）
- [L4T r39.2 Developer Guide——Jetson Orin NX 与 Orin Nano 系列：模块适配与 Bring-Up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html)（核对于 2026-09-26）
- [L4T r39.2 Developer Guide——平台电源与性能](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)（核对于 2026-09-26）
- [L4T r38.2.1 Developer Guide——分区配置（模块 SKU）](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html)（核对于 2026-09-26）
- [Jetson Orin Nano Super Developer Kit 数据手册（PDF，链接自 nvidia.com）](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf)（核对于 2026-09-26）
- [钜犀科技该套件的商店页](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)（核对于 2026-09-26）

*状态：草稿，待 cheny 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

**图片来源：** 产品图片来自 NVIDIA 官方 *Jetson Orin Nano Developer Kit User Guide*（下载于 2026-09-26），© NVIDIA Corporation。

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
