---
title: 產品概述——Jetson Orin Nano Super Developer Kit
sidebar_label: 產品概述
slug: /product/overview
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit（8GB）是什麼、能用來做什麼，
  以及它在 Jetson Orin 產品線中的定位。
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

# 產品概述

![Jetson Orin Nano Super Developer Kit](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

NVIDIA® Jetson Orin Nano™ Super Developer Kit 是 Jetson Orin 家族的入門套件：一台精巧的 AI 電腦，用於在邊緣端原型驗證電腦視覺、機器人與本地生成式 AI 應用。它執行 JetPack 7.2.1（Jetson Linux / L4T r39.2.1），是本套件的目前版本。

## 關鍵事實（已對照 NVIDIA 官方文件查核）

- 「Super」是一種軟體配置，不是新硬體：與先前的「Jetson Orin Nano Developer Kit」相同的模組（P3767）與載板（P3768），在 Super 更新時更名。*(Developer Kit User Guide; NVIDIA Super Boost announcement)*
- 套件主要數字：最高 **67 INT8 TOPS**、最高 **102 GB/s** 記憶體頻寬、功耗 **7W 至 25W**，以及相較前一代 **1.7 倍**的生成式 AI 提升。*(Developer Kit User Guide — Introduction)*
- Ampere 架構 GPU，具備 **1,024 個 CUDA 核心與 32 個 Tensor 核心**；**6 核心 Arm Cortex-A78AE** 64 位元 CPU，最高 1.7 GHz；**8GB 128 位元 LPDDR5**。*(Datasheet; Jetson Orin spec page)*
- 儲存：**模組底部的 microSD 卡槽**，外加**外接 NVMe** 支援；沒有 eMMC，盒內也沒有儲存裝置。*(Datasheet; Quick Start)*
- 透過 USB 隨身碟的 Jetson ISO 方式執行 JetPack **7.2.1**（L4T **r39.2.1**；Ubuntu 24.04、核心 6.8、CUDA 13.2.2、TensorRT 10.16.2）。支援範圍：JetPack 6.x 或 7.2/7.2.1（7.0/7.1 不支援 Orin）。*(Quick Start; JetPack downloads; JetPack archive)*
- 載板：DisplayPort、Gigabit 乙太網路、四個 USB 3.2 Type-A 接口、USB-C、兩個 MIPI CSI 連接器、三個 M.2 插槽、40 引腳排針。見**[接口與硬件佈局](/zh-hant/tutorials/jetson-orin-nano/interfaces)**。*(Developer Kit User Guide — Hardware Layout)*

## 「Super」是什麼意思

Super 效能提升來自一種軟體電源模式，它在相同的硬體上提高 GPU、記憶體與 CPU 時脈；NVIDIA 表示現有套件可透過升級 JetPack 取得：「現有的 Jetson Orin Nano Developer Kit 使用者只要軟體升級，就能獲得『Super』效能提升。」*(Developer Kit User Guide; NVIDIA Super Boost announcement)*

下表比較原始套件與 Super 配置。*(NVIDIA Super Boost announcement)*

| 項目 | 原始 Orin Nano Developer Kit | Super 配置 |
|---|---|---|
| GPU 時脈 | 635 MHz | 1,020 MHz |
| CPU 時脈 | 1.5 GHz | 1.7 GHz |
| 記憶體頻寬 | 68 GB/s | 102 GB/s |
| AI 效能（稀疏 INT8） | 40 TOPS | 67 TOPS |
| FP16 運算 | 10 TFLOPs | 17 TFLOPs |
| 電源模式 | 7W、15W | 7W、15W、25W |
| 價格（Super 發表時，2024 年 12 月） | $499 | $249 |

*有一個數字，NVIDIA 自家資料並不一致：Super 發表文把先前的記憶體頻寬寫成「65 GB/s」，而 NVIDIA 的模組規格表對原始 8 GB 配置列出 68 GB/s。上表採用規格表的數字；兩者指的是同一款 Super 之前的硬體。*

目前價格請見鉅犀商店的[本套件商品頁](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)（SKU JX00110）。

從 JetPack 7.2.1 起，Jetson ISO 預設以 Super 配置刷寫套件 *(JetPack downloads page)*。最初以 JetPack 7.2 ISO 安裝的裝置可能維持非 Super 設定檔；若缺少 25W 或 MAXN SUPER，請見**[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**。

在 L4T r39.2 的電源模式表中，Super 配置列出 15W（模式 0）、25W（模式 1，預設）與 MAXN SUPER（模式 2，實驗性；僅限以 Super 配置刷寫的套件）。MAXN SUPER 讓 CPU 跑到最高 1.7 GHz、GPU 最高 1,020 MHz、記憶體控制器 3,199 MHz。用 `sudo /usr/sbin/nvpmodel -q` 讀取模式；用 `sudo /usr/sbin/nvpmodel -m <mode_id>` 設定。NVIDIA 的套件頁面寫「7W 至 25W」；r39.2 的表列出上述三種模式——請在**[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)**中檢查你的裝置。*(L4T r39.2 Power and Performance page)*

## 模組規格

| 項目 | 規格 |
|---|---|
| AI 效能 | Super 配置下最高 67 稀疏 INT8 TOPS（33 稠密） |
| GPU | NVIDIA Ampere 架構，1,024 個 CUDA 核心、32 個 Tensor 核心，最高 1,020 MHz |
| CPU | 6 核心 Arm Cortex-A78AE v8.2（64 位元），1.5MB L2 + 4MB L3，最高 1.7 GHz |
| 記憶體 | 8GB 128 位元 LPDDR5，102 GB/s |
| 儲存 | 模組底部的 microSD 卡槽；支援外接 NVMe SSD |
| 視頻解碼 | 1x 4K60（H.265）、2x 4K30、5x 1080p60、11x 1080p30 |
| 視頻編碼 | 1080p30，使用 1–2 個 CPU 核心（無專用編碼硬體） |
| AI 加速器 | 沒有 DLA、沒有 PVA——推論在 GPU Tensor 核心上執行 |
| 模組外型 | 260 引腳 SO-DIMM，69.6 mm x 45 mm |

*來源：Jetson Orin Nano Super Developer Kit Datasheet（2024 年 12 月）；NVIDIA Jetson Orin 規格頁；L4T r39.2 Power and Performance 頁。*

## 零件編號

| 零件編號 | 代表什麼 |
|---|---|
| P3766 | 完整的 Jetson Orin Nano Developer Kit |
| P3767 | 系統模組（SOM） |
| P3768 | 參考載板 |
| P3767-0005 | 開發者套件中的模組 SKU（Jetson Orin Nano 8GB，「僅供開發」） |

其他 Orin Nano 模組 SKU：P3767-0003（8GB，商用）與 P3767-0004（4GB）。開發者套件的載板可接受 SKU 0、1、3、4 與 5 的 P3767 模組。*(L4T r39.2 Developer Guide; L4T r38.2.1 Developer Guide)*

## 在 Orin 家族中的定位

- **Jetson Orin Nano 8GB——本套件。** Orin 家族的入門點：67 INT8 TOPS、8GB 統一記憶體、7W 至 25W。
- **Jetson Orin NX。** 同一塊載板可供電、測試並使用 Orin NX 模組開發（需自備散熱片與風扇；全新模組必須在 Ubuntu 主機上以 SDK Manager 刷機）。*(Developer Kit User Guide — How-To)*
- **Jetson AGX Orin——旗艦層級。** AGX Orin 32GB 模組在 Super 模式下達到 241 TOPS *(JetPack 7.2 release highlights)*。見鉅犀的 [Jetson AGX Orin 系列](/zh-hant/tutorials/jetson-agx-orin/quick-start)。

主要需要規劃的限制是**8GB 統一記憶體**；沒有 DLA 或 PVA，AI 工作負載只能靠 GPU——見**[記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)**與**[本地 LLM](/zh-hant/tutorials/jetson-orin-nano/local-llm)**。

## 開發者套件的用途

- **為量產做原型。** JetPack 7.2.1 服務整個 Orin 家族，因此在套件上的工作可沿用到產品中使用的 Orin 模組。*(JetPack downloads page)*
- **電腦視覺。** 兩個 MIPI CSI 攝像頭連接器；DeepStream SDK 9.1 在 JetPack 7.2.1 組件矩陣中——見**[DeepStream](/zh-hant/tutorials/jetson-orin-nano/deepstream)**。
- **本地生成式 AI。** 主打說法是 1.7 倍的生成式 AI 提升；8GB 的天花板決定了什麼裝得下——見**[本地 LLM](/zh-hant/tutorials/jetson-orin-nano/local-llm)**。
- **機器人。** NVIDIA 員工建議 JetPack 7.2.1 搭配 ROS 2 Jazzy——見**[機器人](/zh-hant/tutorials/jetson-orin-nano/robotics)**。

> **鉅犀說明：** 量產產品建構在 Jetson Orin *模組*之上——Orin Nano 8GB 或 4GB，或 Orin NX——安裝在你自研或合作夥伴提供的載板上。開發者套件是開發驗證的載具，而非量產零件。

## 包裝內容

盒內含有開發者套件（Orin Nano 8GB 模組含散熱片，裝在參考載板上）、19 V 電源供應器、隨附的 802.11ac/ab/gn 無線網卡，以及快速開始與支援卡。NVIDIA 表示套件「盒內不含可拆卸儲存裝置」。*(Datasheet; Quick Start)*

你需要自備：

- **儲存裝置**——一張 microSD 卡（64GB，UHS-1 或更大）或一支 NVMe SSD。microSD 卡槽位於**模組底部**；開機前先插入。鉅犀商店的組合包已內含一張 64 GB microSD 卡，因此只有在你收到的是 NVIDIA 裸裝盒，或想改用 NVMe SSD 時，才需要購買儲存裝置。
- **一支安裝用 USB 隨身碟**——16GB 或更大。請把 JetPack ISO 寫到這支 USB 隨身碟，而不是 microSD 卡：SD 卡映像在 JetPack 7.2 中已移除。
- **一台主機電腦**，具備 25GB 以上可用空間；桌面設定另需一台 DisplayPort 顯示器與 USB 鍵盤／滑鼠。*(Quick Start; Supported Hardware)*

> **重要**：非常舊的出廠固件必須先更新——JetPack 7.2.1 要求 JetPack 6.x 世代的 UEFI/QSPI 固件。見**[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)**與**[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)**。

## 下一步

- **[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)**——從開箱到可用的 JetPack 7.2.1 系統
- **[接口與硬件佈局](/zh-hant/tutorials/jetson-orin-nano/interfaces)**——每個接口、插槽與連接器
- **[下載](/zh-hant/tutorials/jetson-orin-nano/downloads)**——官方映像檔、工具與文件連結

## 資料來源

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html)（查閱於 2026-09-26）
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)（查閱於 2026-09-26）
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/)（作為 Super 電源模式的發表連結）
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin)（查閱於 2026-09-26）
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive)（查閱於 2026-09-26）
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html)（查閱於 2026-09-26）
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)（查閱於 2026-09-26）
- [L4T r38.2.1 Developer Guide — Partition Configuration (module SKUs)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf)（查閱於 2026-09-26）
- [Juxi Technology store listing for this kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)（查閱於 2026-09-26）

*狀態：草稿，待 cheny 審核。內容以所列日期的 NVIDIA 官方文件為依據；尚未由鉅犀科技在實體硬體上驗證。*

**圖片來源：**產品圖片來自 NVIDIA 官方 *Jetson Orin Nano Developer Kit User Guide*（下載於 2026-09-26），© NVIDIA Corporation。

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
