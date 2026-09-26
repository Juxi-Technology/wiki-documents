---
title: 術語表
sidebar_label: 術語表
slug: /appendix/glossary
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit（8 GB）的關鍵術語——從 JetPack
  與 L4T 版本體系，到刷機、電源模式與 AI 軟體堆疊。
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 術語表

新手最先遇到的 Jetson 術語，按字母順序排列。版本號對應本套件目前的發行版本（**JetPack 7.2.1 / L4T r39.2.1**，查閱於 2026-09-26）。

## 術語

| 術語 | 含義 |
|---|---|
| **BSP** | 板級支援包（Board support package）：讓板卡開機的軟體層——bootloader、核心、驅動程式與根檔案系統。在 JetPack 中，BSP 就是 Jetson Linux（L4T）。Jetson ISO 安裝期間，安裝程式會將 BSP 寫入你選取的儲存裝置。 |
| **capsule update** | QSPI 開機固件的更新。在 QSPI 固件較舊的套件上執行 Jetson ISO 安裝時，安裝程式會提示你執行 capsule 更新：請在 30 秒內按 `Y`，否則安裝稍後會失敗。更新會分兩輪執行，套件可能在兩輪之間重新開機——這是正常現象。 |
| **carveout** | 開機固件為特定硬體區塊（例如顯示或相機管線）預留的記憶體區域。作業系統無法使用它。在 Orin Nano 上這些保留區有文件記載，你可以編輯 BSP 並重新刷機來縮小它們（見[8 GB 的記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)）。 |
| **CUDA** | NVIDIA 的平行運算平台與工具包，用於在 GPU 上執行程式碼。JetPack 7.2.1 隨附 CUDA 13.2.2。Orin 的 GPU 運算能力為 8.7（`sm_87`）；未包含 `sm_87` 的 GPU 二進位檔會退回 CPU 執行（見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)）。 |
| **cuDNN** | NVIDIA 的深度學習最佳化基礎運算函式庫，例如卷積與激活函數。深度學習框架與 TensorRT 以它執行核心運算。JetPack 7.2.1 隨附 cuDNN 9.20.0。 |
| **DeepStream** | NVIDIA 的多路視頻分析 SDK：它解碼視頻、執行推論、追蹤物件並輸出結果。DeepStream 9.1 在 JetPack 7.2 上支援 Jetson Orin 系列。NVIDIA 建議新使用者以 Docker 容器作為最快的安裝途徑（見 [DeepStream 視頻分析](/zh-hant/tutorials/jetson-orin-nano/deepstream)）。 |
| **DLA** | 深度學習加速器（Deep Learning Accelerator）：內建於部分 Jetson 模組的固定功能推論引擎。Orin Nano 模組沒有 DLA，因此本套件上的推論是在 GPU 上執行。 |
| **Edge-LLM** | TensorRT Edge-LLM：NVIDIA 為大型語言模型（LLM）與視覺語言模型（VLM）提供的裝置端執行階段。在 Orin 上僅支援 FP16、INT8 與 INT4 引擎——FP8 與 FP4 引擎無法執行——且引擎是在裝置本身構建的（見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)）。 |
| **eMMC** | 部分 Jetson 模組用作系統磁碟的嵌入式快閃儲存。本開發者套件出貨時不含儲存裝置：開始之前請自備 microSD 卡或 NVMe SSD（見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)）。 |
| **Force Recovery mode** | 用於從主機 PC 刷寫套件的特殊開機模式。在執行中的系統上以 `sudo reboot --force forced-recovery` 進入，或在套件關機時短路按鍵排針的 pin 9 與 pin 10，然後接上電源。在此模式下，USB-C 接口負責連接主機 PC 進行刷機。 |
| **JetPack** | NVIDIA 的 Jetson SDK 套件：作業系統、驅動程式、CUDA 堆疊與函式庫。本套件目前的發行版本是 JetPack 7.2.1，內含 Jetson Linux（L4T）r39.2.1。 |
| **Jetson 6.x Update Path** | 給出廠 UEFI/QSPI 固件比 36.0 舊的套件所用的固件橋接程序。它會啟動 JetPack 5.1.3 microSD 橋接映像並排程 bootloader（固件）更新；完成後，套件即可開機進入 JetPack 6.x 或 JetPack 7.2.1 的 Jetson ISO。固件較舊的套件必須先完成此路徑才能進行 ISO 安裝（見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)）。 |
| **Jetson ISO** | JetPack 7.2 以後的統一 USB 安裝映像。請用 Balena Etcher 之類的工具將它寫入 USB 隨身碟——不要寫入 microSD 卡——並注意它僅供安裝，不是 Live USB。安裝期間你需選擇目標：microSD 卡或 NVMe SSD。 |
| **L4T** | Jetson Linux：JetPack 底層的板級支援包——UEFI bootloader、核心、驅動程式與 Ubuntu 根檔案系統。對 JetPack 7.2.1 而言是 r39.2.1，搭載 Linux 核心 6.8 與 Ubuntu 24.04 根檔案系統。 |
| **MAXN SUPER** | 本套件的最高電源模式（模式 2）：CPU 1,728 MHz、GPU 1,020 MHz、記憶體 3,199 MHz。它是實驗性模式，且只有在套件以 Super 配置刷機時才存在。可在桌面的 Power Mode 選單中選擇，或執行 `sudo /usr/sbin/nvpmodel -m 2`。 |
| **microSD (UHS-1)** | 本套件作為預設系統儲存使用的卡片格式。UHS-1 是 SD 速度等級；NVIDIA 建議使用 64 GB 以上的 UHS-1 microSD 卡。卡槽位於模組底面，因此請在啟動安裝程式前插入卡片。 |
| **nv_boot_control.conf / TNSPEC** | 裝置上的檔案 `/etc/nv_boot_control.conf`，以 TNSPEC 字串記錄板級配置。NVIDIA 員工指出，Super 配置會顯示 `-super` 後綴，例如 `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`；若後綴不存在，就無法使用較高的電源模式。ISO 安裝後，NVIDIA 指出這筆 TNSPEC 記錄可作為正確板卡資訊的參考。 |
| **NVMe** | 裝在 PCIe 匯流排上的 SSD，安裝於載板的其中一個 M.2 Key-M 插槽：2280 尺寸（PCIe 3.0 x4）或 2230 尺寸（PCIe 3.0 x2）。NVMe SSD 可以承載系統，當你需要更大容量與更好的儲存效能時推薦使用。 |
| **nvpmodel** | 套件上的電源模式工具。執行 `sudo /usr/sbin/nvpmodel -q` 可列出你系統上可用的模式，`sudo /usr/sbin/nvpmodel -m <mode_id>` 可切換模式。相同的模式也見於桌面的 Power Mode 選單。 |
| **oem-config** | 首次開機的設定精靈：授權合約、語言與鍵盤、網路，以及初始使用者名稱與密碼。它會在已安裝系統首次開機後執行一次。 |
| **QSPI** | 套件上存放 UEFI 開機固件的小容量 NOR 快閃記憶體。JetPack 7.2 以後要求 JetPack 6.x 世代的 QSPI 固件（比 36.0 版新）；固件較舊時，安裝程式可能失敗，或套件可能開機到黑屏。見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)。 |
| **SDK Manager** | NVIDIA 的主機 PC 工具，用於透過 USB 刷寫 BSP 與安裝 JetPack 組件。記載的主機是執行 Ubuntu 的 x86 PC。它是裝置端 Jetson ISO 方式的替代方案。 |
| **SO-DIMM** | 模組的連接器規格：260 針 SO-DIMM，69.6 mm x 45 mm。模組插在載板的 SO-DIMM 插槽中，同一插槽也可安裝 Jetson Orin NX 模組。 |
| **Super Mode** | NVIDIA 為 Orin Nano 提供的軟體電源與時脈配置——並非不同的硬體。既有的套件透過 JetPack 軟體升級即可獲得「Super」提升；在本套件上，較高的電源模式只有在以 Super 配置刷機後才會出現。 |
| **TensorRT** | NVIDIA 的推論最佳化器與執行階段。它將訓練好的模型編譯成 TensorRT 引擎——為目標 GPU 構建的裝置專屬檔案——並有效率地執行該引擎。JetPack 7.2.1 隨附 TensorRT 10.16.2。 |
| **TOPS** | 每秒兆次（tera）運算，AI 吞吐量的常用單位。本套件標稱最高 67 sparse INT8 TOPS（33 dense INT8）。NVIDIA 為同一模組同時公布稀疏與密集兩種數據。 |
| **UEFI** | 套件上的開機固件與其設定選單。在 NVIDIA 開機畫面顯示時按 Esc 進入設定；在選單中，Boot Manager 是你選擇 USB 安裝碟作為開機裝置的地方。固件版本會顯示在那裡，且 JetPack 7.2 以後需要比 36.0 新的版本。 |
| **unified memory** | 由 CPU 與 GPU 共享的單一 8 GB LPDDR5 記憶體池——本套件沒有獨立的顯示記憶體。扣除固件與核心保留後約有 7.6 GB 可用，作業系統、你的模型與其 KV cache 全都從這同一個記憶體池取用。見[8 GB 的記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)。 |
| **VPI** | 視覺程式設計介面（Vision Programming Interface）：NVIDIA 在 Jetson 上進行硬體加速影像處理的函式庫。JetPack 7.2.1 隨附 VPI 4.1.4。 |

## 版本對照

最值得記住的一張版本對照表：

| JetPack | Jetson Linux (L4T) | Ubuntu | 核心 | CUDA |
|---|---|---|---|---|
| **7.2.1**（目前） | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3（JetPack 6 最後一版） | r36.5.2 | 22.04 | 5.15 | 12.6 |

要確認具體系統實際執行的版本：`cat /etc/nv_tegra_release`
（見[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)）。

## 資料來源

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（查閱於 2026-09-26）
- [JetPack SDK 下載](https://developer.nvidia.com/embedded/jetpack/downloads) —— ⚠️ 其組件表逐列落後（VPI 與 PVA 兩列仍顯示 JetPack 7.2 的值）；組件版本請改用 [NVIDIA 的套件倉庫](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)（checked 2026-09-26）
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（查閱於 2026-09-26）
- [TensorRT Edge-LLM — Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)（查閱於 2026-09-26）
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson（NVIDIA 技術部落格）](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（查閱於 2026-09-26）
- [Jetson Orin Nano Series — Power and Performance（L4T r39.2 Developer Guide）](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)（查閱於 2026-09-26）
- [NVIDIA Jetson Orin 系列 — 規格](https://developer.nvidia.com/embedded/jetson-orin)（查閱於 2026-09-26）
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)（查閱於 2026-09-26）
- [NVIDIA 論壇 — 「JetPack 7.2 中看不到 25W 與 MAXN_SUPER」（NVIDIA 員工回答）](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)（查閱於 2026-09-26）

*狀態：草稿，待 cheny 審核。定義整理自 NVIDIA 官方文件與業界通行用法；版本號查閱於所列日期。尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
