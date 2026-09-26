---
title: 更新日誌
sidebar_label: 更新日誌
slug: /appendix/changelog
description: >-
  本文檔集的更新記錄，以及 Jetson AGX Orin 開發者套件的 JetPack
  發布歷史。
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

# 更新日誌

## 文檔更新

| 日期 | 變更 |
|---|---|
| 2026-09-26 | **更正了 JetPack 7.2.1 的兩個元件版本：CUDA 13.2.1 → 13.2.2 與 VPI 4.1.3 → 4.1.4。** 這兩個版本原先取自 NVIDIA 的 JetPack 下載頁面，其摘要表仍為 JetPack **7.2** 的數值；這些版本已透過 NVIDIA Jetson apt 套件倉庫中 `nvidia-jetpack` 7.2.1 的相依性鏈核實。更新了**驗證你的系統**（表格來源註記）、**術語表**、**常見問題**、**JetPack 6.x → 7.2 遷移指南**以及產品頁面。並在所有引用該頁面作為元件版本來源的頁面（**下載**、**術語表**、**DeepStream**、**遷移指南**）補充了「摘要表滯後」的提示。 |
| 2026-09-26 | **更正了 JetPack 7.2 上的 Isaac ROS 狀態。** Isaac ROS 4.6.0（2026-08-18）新增了對 Jetson Orin + JetPack 7.2 的支援，取代了先前取自 JetPack 下載頁面的「即將推出」狀態（該頁面至今仍顯示此狀態）。更新了**機器人**（新版本與 ROS 2 發行版指引）、**驗證你的系統**、**JetPack 6.x → 7.2 遷移指南**與**常見問題**。 |
| 2026-09-24 | 新增**術語表**與本**更新日誌**。在常見問題、故障排除與下載頁面中補充了鉅犀科技的聯絡資訊（技術支援、銷售、產品諮詢）；並為配件新增了鉅犀產品目錄連結。 |
| 2026-09-23 | 文檔集以草稿形式首次發布：快速開始、刷機與更新、驗證你的系統、產品概述、接口與硬件佈局、常見問題、故障排除、下載，以及 JetPack 6.x → 7.2 遷移指南。所有頁面均依據 NVIDIA 官方文檔撰寫。 |

## 本套件的 JetPack 發布版本

| JetPack | Jetson Linux (L4T) | 日期 | 說明 |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **目前版本。** 修復與安全性更新；T3000 模擬；用於視頻管道的智能體技能。 |
| 7.2 | 39.2.0 | 2026-06 | 首個將 Jetson Orin 系列帶入 JetPack 7 的版本（Ubuntu 24.04、核心 6.8、CUDA 13）。 |
| 6.x | 36.x | 2024–2025 | 上一代版本（Ubuntu 22.04、核心 5.15、CUDA 12）——如果你仍在使用該版本，請參閱存檔，以及我們的[遷移指南](/zh-hant/tutorials/jetson-agx-orin/jetpack-6-to-7)。 |

完整歷史記錄：[JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

要更新你的套件，請參閱**[刷機與更新](/zh-hant/tutorials/jetson-agx-orin/flashing-and-updates)**；
要查看你目前執行的版本，請參閱**[驗證你的系統](/zh-hant/tutorials/jetson-agx-orin/verify-your-system)**。

## 參考來源

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads)（查核於 2026-09-24）
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（查核於 2026-09-24）

*狀態：草稿，待 cheny 審核。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁由鉅犀科技發布，並非 NVIDIA 官方出版物。
