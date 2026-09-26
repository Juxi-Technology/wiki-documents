---
title: 更新日志
sidebar_label: 更新日志
slug: /appendix/changelog
description: >-
  本文档集的更新记录，以及 NVIDIA Jetson Orin Nano Super Developer Kit
  的 JetPack 发布历史。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 更新日志

## 文档更新

| 日期 | 变更 |
|---|---|
| 2026-09-26 | 文档集以草稿形式首次发布：快速开始、刷机与更新、验证你的系统、产品概述、接口与硬件布局、常见问题、故障排查、下载、JetPack 6.x → 7.2 迁移指南、五篇教程（本地 LLM、内存效率、DeepStream、机器人、智能体 AI）、术语表，以及本更新日志。内容依据 NVIDIA 关于 JetPack 7.2.1 的官方文档编写；尚未在实机上验证。 |

## 本套件的 JetPack 发布版本

| JetPack | Jetson Linux (L4T) | 日期 | 说明 |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **当前版本。** ISO 现在默认以 Super 模式配置刷写 Orin Nano Developer Kit，解决了 r39.2 上经 ISO 更新的设备停留在原有电源配置的问题。 |
| 7.2 | 39.2.0 | 2026-06 | 面向 Orin 系列的首个 JetPack 7 版本（Ubuntu 24.04、内核 6.8、CUDA 13.x）。该版本的已知问题：经 Jetson ISO 更新的设备不会默认进入 Super 模式——见[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。 |
| 6.2.x | 36.x | 2025 | 面向本套件的 JetPack 6 系列（Ubuntu 22.04）。“Super” 电源模式正是在这里引入的——同样的硬件，更高的 CPU/GPU/内存时钟，以及 25 W 模式。 |
| 6.0 / 6.1 | 36.x | 2024–2025 | 更早的 JetPack 6 版本。 |
| 5.1.3 | 35.x | 2023–2024 | 至今仍被提及的最老固件线：JetPack 6.x 更新路径使用 5.1.3 桥接镜像，把非常旧的套件先带到 JetPack 6.x 世代固件，之后才能安装 JetPack 7。 |

完整历史记录：[JetPack 归档](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux 归档](https://developer.nvidia.com/embedded/jetson-linux-archive)

要更新你的套件，请参阅**[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)**；
要查看当前运行的版本，请参阅**[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)**。

## 参考来源

- [JetPack SDK 下载](https://developer.nvidia.com/embedded/jetpack/downloads)（核查于 2026-09-26）
- [Jetson Linux 39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（核查于 2026-09-26）
- [NVIDIA JetPack 6.2 公告——面向 Jetson Orin Nano 的 Super 模式](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/)（作为 Super 电源模式的厂商公告链接）

*状态：草稿，待 cheny 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由
钜犀科技在实机上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非
NVIDIA 官方出版物。
