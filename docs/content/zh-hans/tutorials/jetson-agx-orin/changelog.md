---
title: 更新日志
sidebar_label: 更新日志
slug: /appendix/changelog
description: >-
  本文档集的更新记录，以及 Jetson AGX Orin 开发者套件的 JetPack
  发布历史。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: source for the CUDA 13.2.2 / VPI 4.1.4 correction
review_owner: cheny
---

# 更新日志

## 文档更新

| 日期 | 变更 |
|---|---|
| 2026-09-26 | **更正 JetPack 7.2.1 的两个组件版本：CUDA 13.2.1 → 13.2.2 和 VPI 4.1.3 → 4.1.4。** 这两个版本此前均取自 NVIDIA 的 JetPack 下载页，其汇总表仍是 JetPack **7.2** 的数值；现已通过 NVIDIA Jetson apt 仓库中 `nvidia-jetpack` 7.2.1 的依赖链核实。已更新**验证你的系统**（表格来源说明）、**术语表**、**常见问题**、**JetPack 6.x → 7.2 迁移指南**和产品页面。另在所有将该下载页引用为组件版本来源的地方补充了“该表格滞后”的提示（**下载**、**术语表**、**DeepStream**、**迁移指南**）。 |
| 2026-09-26 | **更正 Isaac ROS 在 JetPack 7.2 上的状态。** Isaac ROS 4.6.0（2026-08-18）新增了对 Jetson Orin + JetPack 7.2 的支持，取代了此前取自 JetPack 下载页的“即将推出”状态（该页面至今仍显示该状态）。已更新**机器人（现状）**（新版本号及 ROS 2 发行版选择指引）、**验证你的系统**、**JetPack 6.x → 7.2 迁移指南**和**常见问题**。 |
| 2026-09-24 | 新增**术语表**与本**更新日志**。在常见问题、故障排查和下载页面中补充了钜犀科技的联系方式（技术支持、销售、产品咨询）；并为配件添加了钜犀产品目录链接。 |
| 2026-09-23 | 文档集以草稿形式首次发布：快速开始、刷机与更新、验证你的系统、产品概述、接口与硬件布局、常见问题、故障排查、下载，以及 JetPack 6.x → 7.2 迁移指南。所有页面均依据 NVIDIA 官方文档编写。 |

## 本套件的 JetPack 发布版本

| JetPack | Jetson Linux (L4T) | 日期 | 说明 |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **当前版本。** 修复与安全更新；T3000 仿真；面向视频流水线的智能体技能。 |
| 7.2 | 39.2.0 | 2026-06 | 首个将 Jetson Orin 系列带入 JetPack 7 的版本（Ubuntu 24.04、内核 6.8、CUDA 13）。 |
| 6.x | 36.x | 2024–2025 | 上一代版本（Ubuntu 22.04、内核 5.15、CUDA 12）——如果你仍在使用该版本，请参阅存档，以及我们的[迁移指南](/zh-hans/tutorials/jetson-agx-orin/jetpack-6-to-7)。 |

完整历史记录：[JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

要更新你的套件，请参阅**[刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)**；
要查看当前运行的版本，请参阅**[验证你的系统](/zh-hans/tutorials/jetson-agx-orin/verify-your-system)**。

## 参考来源

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads)（核对于 2026-09-24）
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（核对于 2026-09-24）

*状态：已于 2026-10-11 审核。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
