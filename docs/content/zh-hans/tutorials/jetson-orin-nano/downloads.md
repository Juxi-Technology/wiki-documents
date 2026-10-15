---
title: 下载与官方链接
sidebar_label: 下载
slug: /downloads
description: >-
  一份经过核对的索引：NVIDIA Jetson Orin Nano Super Developer Kit（8GB）
  在 JetPack 7.2.1 / L4T r39.2.1 上的官方下载与文档，另含合作伙伴资源和
  钜犀科技的入口。
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 下载与官方链接

本页汇总了 **Jetson Orin Nano Super Developer Kit（8GB）** 在
**JetPack 7.2.1 / Jetson Linux（L4T）r39.2.1** 下的 NVIDIA 官方下载与文档，
另附少量合作伙伴资源和钜犀科技的入口。所有链接均核查于 **2026-09-26**。

下载任何东西之前，有两个 Orin Nano 专属事实值得注意：

- **没有 SD 卡镜像。** 从 JetPack 7.2 起，套件通过写入 U 盘的 Jetson ISO
  安装。没有 SD 卡镜像，且 ISO 绝不能写入 microSD 卡。
- **固件门槛。** JetPack 7.2.1 要求套件具备 JetPack 6.x 世代的 UEFI/QSPI
  固件。如果你的套件仍是较旧的出厂固件，请先完成 JetPack 6.x 更新路径。

> **钜犀提示：** 完整的安装流程见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)。刷机与更新方式的对比见[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)。

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK 下载](https://developer.nvidia.com/embedded/jetpack/downloads) — JetPack 主页面：发布说明、官方组件版本表，以及所有 JetPack 7.2.1 下载链接。

> ⚠️ **不要逐行相信那张组件表。** NVIDIA 尚未为 7.2.1 将其完整刷新：CUDA 一行已更新，但紧邻的两行没有——VPI 仍显示 JetPack 7.2 的值（**4.1.3，而 7.2.1 实际搭载 4.1.4**），Isaac ROS 一行仍写着 “coming soon”（即将推出），尽管自 2026 年 8 月发布以来，Isaac ROS 就已支持 JetPack 7.2 上的 Orin。组件版本请以 NVIDIA 的软件包仓库为权威依据：元包通过依赖链锁定每个组件——[r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)，其中 `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` （核对于 2026-09-26）。组件版本也列在[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)上。

- [r39.2.1 的 Jetson ISO（直接下载）](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — JetPack 7.2.1 的安装器镜像；套件的快速开始页面将其链接为 “Direct Download Link: Jetson ISO (r39.2.1)”。请写入 16 GB 或更大容量的 U 盘。下载页面未随附校验和。
- [NVIDIA SDK Manager 文档](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — 安装并使用这款主机 PC 工具来刷写套件、更新固件和安装 JetPack 组件（需要 NVIDIA 开发者计划账户）；套件相关流程见 [BSP Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html)。
- [JetPack 归档](https://developer.nvidia.com/embedded/jetpack-archive) — 更早的 JetPack 版本，包括 JetPack 7.2（首个支持 Orin 系列的 7.x 版本）和 JetPack 6.x 系列。

## 文档

- [Jetson Orin Nano 开发者套件用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — 本套件的主要参考文档。
  - [快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x 更新路径](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [硬件布局](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — JetPack 7.2.1 的新增内容、GA 声明与已知问题列表。
- [Jetson Linux r39.2 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — JetPack 7.2 的发布说明。
- [Jetson Linux 开发者指南（r39.2）](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — 刷机目标、分区配置，以及平台功耗与性能表。
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — NVIDIA 自己整理的更多本套件资源清单（JetPack SDK、开发者指南、SDK Manager 文档、Jetson 下载中心、Jetson AI Lab、开发者论坛、Jetson 生态）。
- [Jetson 下载中心](https://developer.nvidia.com/embedded/downloads) — NVIDIA 的 Jetson 下载索引；套件指南指向这里获取载板规格与受支持组件列表。其中部分内容需要 NVIDIA 账号登录。

## AI 框架与教程

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — NVIDIA 面向 Jetson 的设备端 LLM 推理栈。Orin 是官方支持的目标，仅支持 FP16、INT8 和 INT4（[支持矩阵](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [支持的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)）。
- [DeepStream 9.1 安装指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — Jetson 上的视频分析；DeepStream 9.1 是在 JetPack 7.2 上支持 Orin 系列的版本（[快速上手](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Docker 容器](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)）。
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — 由合作伙伴运营的动手教程中心，教你在 Jetson 上运行 AI 模型，其中包括一篇[面向 Orin Nano 8 GB 的 TensorRT Edge-LLM 演练](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/)。
- [SBSA wheel 索引（CUDA 13）](https://pypi.jetson-ai-lab.io/sbsa/cu130) — 合作伙伴托管的 aarch64 Python wheel 索引，面向 JetPack 7.2 / CUDA 13.2；NVIDIA 员工指向该索引作为本版本的 Python wheel 来源。

## 钜犀科技

- **Wiki：** [wiki.juxitech.com](https://wiki.juxitech.com/) — 就是本站这一文档系列；[产品目录](https://wiki.juxitech.com/products/)列出了面向 Jetson 套件的摄像头、传感器与配件。
- **商店：** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — 本套件在钜犀商城的商品页（SKU JX00110）。
- **联系方式：** 技术支持 — support@juxitech.com · 销售 — sales@juxitech.com · 产品咨询 — pe@juxitech.com。

## 来源

- [Jetson Orin Nano 开发者套件用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)、[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)（核查于 2026-09-26）
- [JetPack SDK 下载](https://developer.nvidia.com/embedded/jetpack/downloads)与 [JetPack 归档](https://developer.nvidia.com/embedded/jetpack-archive)（核查于 2026-09-26）—— ⚠️ 其组件表逐行滞后，组件版本请以 [NVIDIA 软件包仓库](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) 为准（见上文警告）
- [NVIDIA 软件包仓库——r39.2 arm64 Packages 索引](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — 组件版本的权威来源，经由元包中的依赖锁定（checked 2026-09-26）
- Jetson Linux 发布说明——[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)、[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（核查于 2026-09-26）
- [Jetson Linux 开发者指南](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html)（核查于 2026-09-26）
- [NVIDIA SDK Manager 文档](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html)（核查于 2026-09-26）
- [TensorRT Edge-LLM 文档](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 安装指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA wheel 索引](https://pypi.jetson-ai-lab.io/sbsa/cu130)（核查于 2026-09-26）
- [钜犀科技商店商品页](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)与 [wiki](https://wiki.juxitech.com/)（核查于 2026-09-26）

*状态：已于 2026-10-11 审核。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非
NVIDIA 官方出版物。
