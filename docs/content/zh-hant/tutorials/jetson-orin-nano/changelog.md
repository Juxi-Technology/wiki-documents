---
title: 更新日誌
sidebar_label: 更新日誌
slug: /appendix/changelog
description: >-
  本文檔集的更新記錄，以及 NVIDIA Jetson Orin Nano Super Developer Kit
  的 JetPack 發布歷史。
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

# 更新日誌

## 文檔更新

| 日期 | 變更 |
|---|---|
| 2026-09-26 | 文檔集以草稿形式首次發布：快速開始、刷機與更新、驗證你的系統、產品概述、接口與硬件佈局、常見問題 FAQ、故障排除、下載、JetPack 6.x → 7.2 遷移指南、五篇教學（本地 LLM、記憶體效率、DeepStream、機器人開發、智能體 AI）、術語表，以及本更新日誌。內容依據 NVIDIA 為 JetPack 7.2.1 撰寫的官方文件；尚未在實體硬體上驗證。 |

## 本套件的 JetPack 發布版本

| JetPack | Jetson Linux (L4T) | 日期 | 說明 |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **目前版本。** ISO 現在預設以 Super Mode 配置刷寫 Orin Nano Developer Kit，解決了 r39.2 中經 ISO 更新的裝置停留在原本電源設定檔的問題。 |
| 7.2 | 39.2.0 | 2026-06 | 首個支援 Orin 系列的 JetPack 7 版本（Ubuntu 24.04、核心 6.8、CUDA 13.x）。此版本的已知問題：透過 Jetson ISO 更新的裝置不會預設為 Super 模式——見[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。 |
| 6.2.x | 36.x | 2025 | 本套件的 JetPack 6 產品線（Ubuntu 22.04）——「Super」電源模式就是在這裡登場：相同硬體，搭載更高的 CPU/GPU/記憶體時脈與 25 W 模式。 |
| 6.0 / 6.1 | 36.x | 2024–2025 | 較早的 JetPack 6 版本。 |
| 5.1.3 | 35.x | 2023–2024 | 至今仍被引用的最舊固件線：JetPack 6.x 更新路徑使用 5.1.3 橋接映像，把非常舊的套件先帶到 JetPack 6.x 世代的固件，之後才能安裝 JetPack 7。 |

完整歷史記錄：[JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

要更新你的套件，請參閱**[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)**；
要查看你目前執行的版本，請參閱**[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)**。

## 資料來源

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（查閱於 2026-09-26）
- [NVIDIA JetPack 6.2 發布公告 — Jetson Orin Nano 的 Super 模式](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/)（做為 Super 電源模式的官方發布公告連結）

*狀態：草稿，待 cheny 審核。內容以所列日期的 NVIDIA 官方文件為依據；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
