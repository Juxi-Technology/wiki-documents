---
title: 術語表
sidebar_label: 術語表
slug: /appendix/glossary
description: >-
  Jetson AGX Orin 開發者套件的關鍵術語——從 JetPack 與 L4T 版本體系，
  到刷機、AI 軟體堆疊與電源相關術語。
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

# 術語表

客戶最常問到的術語，按主題分組。版本號對應目前的發布版本（**JetPack 7.2.1 / L4T 39.2.1**；元件版本重新核對於 2026-09-26）。

## 平台與硬體

| 術語 | 含義 |
|---|---|
| **Jetson AGX Orin** | NVIDIA 的邊緣 AI 模組系列；本開發者套件搭載的是 **64GB** 模組。 |
| **模組（Module）** | 整合 SoC、記憶體與 eMMC，負責實際運算的小板。 |
| **載板（Carrier board）** | 帶有全部連接埠與連接器的大板；模組插接在其上（699 針連接器，J3）。 |
| **開發者套件（Developer Kit）** | 模組 + 參考載板 + Wi-Fi 模組 + 電源供應器——即原型開發平台。量產產品使用自研或合作夥伴載板上的模組。 |
| **SoC** | System-on-chip（系統單晶片）：CPU、GPU 與各類加速器整合在一顆晶片上（NVIDIA 稱該產品線為「Tegra」）。 |
| **TOPS** | Trillion operations per second（每秒兆次運算）——衡量 AI 吞吐量的指標（AGX Orin 系列最高可達 275 TOPS）。 |
| **Tensor 核心** | 專為神經網路背後的矩陣運算而設計的 GPU 核心。 |
| **eMMC** | 模組上的嵌入式快閃記憶體；預設的系統儲存空間。 |
| **NVMe** | 透過 PCIe 連接的快速 SSD，安裝在 M.2 M-Key 插槽（J1）中；可承載系統。 |
| **M.2（M-Key / E-Key）** | 插槽類型：**M-Key** = NVMe SSD，**E-Key** = Wi-Fi 模組。 |
| **CSI / GMSL** | 攝像頭接口（CSI 位於攝像頭連接器 J509 上；GMSL 面向車規級攝像頭）。 |
| **DisplayPort（DP）** | 套件上**唯一**的顯示輸出；支援 MST（最多 2 台顯示器）與 DSC。 |

## 軟體與版本

| 術語 | 含義 |
|---|---|
| **JetPack** | NVIDIA 面向 Jetson 的 SDK 套件——作業系統、驅動程式、CUDA 堆疊與各類函式庫。**目前版本：7.2.1。** |
| **Jetson Linux（L4T）** | JetPack 底層的板級支援包：bootloader、核心、驅動程式，以及 Ubuntu 根檔案系統。**目前版本：r39.2.1。** |
| **BSP** | 「Board support package」（板級支援包）——讓板卡開機並運行所需的一切。 |
| **根檔案系統（rootfs）** | 作業系統的使用者空間部分（此處為 Ubuntu 24.04）。 |
| **oem-config** | 首次開機時的設定精靈（語言、使用者帳戶、網路）。 |
| **UEFI** | 套件上的韌體/開機選單；用其中的開機管理程式選擇開機裝置。 |
| **QSPI** | 存放早期開機韌體的小容量快閃記憶體。ISO 安裝過程中可能出現「**QSPI capsule 更新**」提示——按 `Y`（必需）。 |
| **Force Recovery 模式** | 從主機 PC 刷機的特殊開機模式。進入方法：按住中間的 Force Recovery 按鍵，同時接上電源。 |
| **Jetson ISO** | USB 隨身碟安裝映像檔；NVIDIA 推薦的更新途徑（無需主機 PC）。 |
| **SDK Manager** | NVIDIA 的 GUI 工具（執行於主機 PC），用於刷寫 BSP 並安裝 JetPack 元件。 |
| **Linux_for_Tegra / flash.sh** | 以腳本為基礎的刷機工具，面向進階與產品化用途。 |
| **OTA** | Over-the-air（無線更新）——面向已部署裝置的遠端軟體/安全更新。 |
| **裝置樹（Device tree）** | 告知核心有哪些硬體接入的資料結構；自訂裝置樹必須針對每個 L4T 版本重新構建。 |

**版本對照**（最值得記住的一張表）：

| JetPack | Jetson Linux (L4T) | Ubuntu | 核心 | CUDA |
|---|---|---|---|---|
| **7.2.1**（目前） | **39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.x（上一代） | 36.x | 22.04 | 5.15 | 12.x |

務必確認具體系統實際執行的版本：`cat /etc/nv_tegra_release`。

## AI 軟體堆疊

| 術語 | 含義 |
|---|---|
| **CUDA** | NVIDIA 的 GPU 運算工具包（本版本中為 13.2.2）。 |
| **cuDNN** | 經最佳化的深度學習基礎運算函式庫（9.20.0）。 |
| **TensorRT** | 推論最佳化器與執行階段（10.16.2）。 |
| **TensorRT 引擎** | 經編譯的模型檔案，與具體硬體/版本綁定。引擎**不能**跨版本升級沿用——需要重新構建。 |
| **DeepStream** | 面向多路視頻分析的 SDK（9.1）。 |
| **VPI** | Vision Programming Interface——硬體加速的影像處理（4.1.4）。 |
| **Holoscan** | 面向即時傳感器處理的串流 AI 框架（3.9.0）。 |
| **NGC** | NVIDIA 的容器與預訓練模型目錄（catalog.ngc.nvidia.com）。 |
| **容器（Container）** | 隔離、打包好的執行階段（Docker）；在 Jetson 上交付 AI 軟體的標準方式。 |

## 電源與監控

| 術語 | 含義 |
|---|---|
| **nvpmodel** | 用於切換電源模式的工具。執行 `sudo nvpmodel -q` 可查看你系統上的可用模式。 |
| **MAXN** | 「最大效能」電源模式（無功耗上限）。 |
| **jetson_clocks** | 將時鐘鎖定在最高頻率——適合基準測試，不適合長期作為預設設定使用。 |
| **tegrastats** | 內建的即時監控工具，可查看 CPU/GPU/記憶體使用量。 |

## JetPack 7 時代

| 術語 | 含義 |
|---|---|
| **NemoClaw** | NVIDIA 面向 Jetson 的智能體 AI 框架；自 JetPack 7.2 起可一條命令安裝。 |
| **Jetson 智能體技能（agent skills）** | NVIDIA 為裝置端與 BSP 任務發布的可重複使用智能體工作流。 |
| **Yocto / OpenEmbedded (OE4T)** | 用於構建自訂、可重現的量產 Linux 映像檔的構建系統——自 7.2 起獲官方支援。 |
| **SBSA** | Server Base System Architecture（伺服器基礎系統架構）——Jetson **Thor** 系列所對齊的 Arm 伺服器模型（不適用於本套件）。 |
| **MIG** | Multi-Instance GPU——將一塊 GPU 劃分為多個隔離執行個體（Jetson Thor，技術預覽）。 |

## 資料來源

- [NVIDIA Jetson apt 套件倉庫——實際元件版本](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)（核對於 2026-09-26）——經由 `nvidia-jetpack` 7.2.1 相依性鏈；[JetPack 下載頁](https://developer.nvidia.com/embedded/jetpack/downloads)的摘要表滯後（仍列出 CUDA 13.2.1 / VPI 4.1.3）
- [Jetson AGX Orin 開發者套件使用者指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)（核對於 2026-09-24）

*狀態：已於 2026-10-11 審核。定義整理自 NVIDIA 官方文件與業界通行用法；版本號核對於所列日期。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
