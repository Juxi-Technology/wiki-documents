---
title: 常見問題 FAQ
sidebar_label: 常見問題 FAQ
slug: /support/faq
description: >-
  關於 NVIDIA Jetson Orin Nano Super Developer Kit（8GB）的常見問題——
  儲存、首次設定、固件、電源模式、AI 工作負載與支援服務。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# 常見問題 FAQ

## 開始之前

**包裝內容有什麼？**
Jetson Orin Nano Developer Kit、一台 19 V 電源供應器，以及一張快速開始與支援卡。**NVIDIA 盒裝內沒有任何儲存裝置**：microSD 卡或 NVMe SSD、安裝用的 USB 隨身碟，以及顯示器與鍵盤都需自備——不過鉅犀商店的本套件組合包另附一張 64 GB microSD 卡（依商店頁面說明）。參見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)。

**我需要自購儲存裝置嗎？**
需要——除非你購買的是鉅犀商店組合包，它已包含一張 64 GB microSD 卡；這張卡就能滿足目標儲存裝置的要求，因此只有在想要更大容量時才需另購 NVMe SSD。（組合包內的卡片出貨時為空白、未預先寫入映像——你需要用 Jetson ISO 把系統安裝到卡上。）NVIDIA 表示：「Jetson Orin Nano Developer Kit 盒裝不含可拆卸儲存裝置，因此請在開始設定前選擇 microSD 卡或 NVMe SSD。」若你拿到的是裸裝的 NVIDIA 盒裝，請選購 64GB UHS-1 以上的 microSD 卡（NVIDIA 的建議）；或為載板的其中一個 M.2 Key-M 插槽選購 PCIe NVMe SSD。本套件沒有 eMMC：你的卡片或 SSD 就是系統的主要儲存裝置。參見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)與[接口與硬件佈局](/zh-hant/tutorials/jetson-orin-nano/interfaces)。

**我還能像早期的 JetPack 版本一樣刷寫 SD 卡映像嗎？**
不行。從 JetPack 7.2 起，SD 卡映像已不再支援。NVIDIA 的指示：「不要把 Jetson ISO 刷寫到 microSD 卡——請將它寫入 USB 隨身碟，再用它把 Jetson Linux 安裝到你的 microSD 卡或 NVMe SSD 上。」microSD 卡仍是有效的安裝目標；只是它不再是你寫入映像的媒介。ISO USB 隨身碟是安裝程式，不是 Live USB——它無法執行桌面環境，只負責安裝系統。參見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)與[遷移指南](/zh-hant/tutorials/jetson-orin-nano/jetpack-6-to-7)。

**開始之前，我確切需要準備什麼？**
你需要：

- 套件本身與其隨附的 19 V 電源供應器。
- 一台至少有 25GB 可用空間的筆記型電腦或 PC（Windows、Mac 或 Linux）。
- 一支 16GB 以上的 USB 隨身碟，用來裝安裝映像。
- 目標儲存裝置：microSD 卡（建議 64GB UHS-1 以上）及／或 NVMe SSD——鉅犀商店組合包已包含 64 GB microSD 卡。
- 一台 DisplayPort 顯示器與 USB 鍵盤、滑鼠，或用於無頭安裝的 USB 轉 TTL 串口線。

NVIDIA 的指南使用 Balena Etcher 把 ISO 寫入 USB 隨身碟——只把檔案複製到隨身碟上是不夠的。逐步流程見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)。

**我需要一台 Ubuntu PC 嗎？**
不需要，推薦路徑不需要。Jetson ISO 安裝在套件本身上執行；你的 PC 只負責把 ISO 寫入 USB 隨身碟，Windows、Mac 與 Linux 都能勝任。只有在使用替代方式——SDK Manager 或刷機腳本——時才需要 Ubuntu x86_64 主機 PC，例如你想把套件重新刷成 Super 配置時。注意：SDK Manager 頁面記載的主機是 Ubuntu 20.04 / 22.04 x86_64，但 NVIDIA 員工也回報可從 Windows 成功刷機。參見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)。

**microSD 卡槽在哪裡？**
它在 Jetson Orin Nano 模組的底面，而不是載板邊緣。請在啟動 ISO 安裝程式之前先插入卡片；安裝程式只會提供已安裝的儲存裝置。日後要換卡：關機、換上新卡，並在插著新卡的狀態下重新執行 JetPack 7.2.1 ISO 安裝程式——JetPack 7.2 以後已沒有卡映像可寫。參見[接口與硬件佈局](/zh-hant/tutorials/jetson-orin-nano/interfaces)與[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)。

## 設定

**我的套件是新的——為什麼指南說要先更新固件？**
JetPack 7.2 及更新版本的安裝要求套件具備 JetPack 6.x 世代的 UEFI/QSPI 固件——版本 36.x 或更新。出廠固件較舊的套件，必須先完成 NVIDIA 的「JetPack 6.x 更新路徑」，JetPack 7.2.1 的 ISO 才能開機。檢查版本的方法：接上顯示器開機，並在開機畫面反覆按 Esc；UEFI 選單上方會顯示固件版本。若顯示 36.x 或更新，可以繼續；若比 36.0 舊，請先完成更新路徑。QSPI、capsule 更新等術語請參見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)、[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)與[術語表](/zh-hant/tutorials/jetson-orin-nano/glossary)。

**設定要花多久時間？**
NVIDIA 並未公布整體設定時間。官方說明指出，畫面上可能會持續捲動白色文字數分鐘，你應等待安裝程式完成，並在出現提示時重新開機。使用者的回報範圍從約 15 分鐘到約兩小時（安裝到 microSD 卡；使用者回報，未經確認），之後首次開機還會加上 Ubuntu 設定畫面（語言、網路、使用者名稱）。參見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)。

**如果安裝程式跳過了使用者名稱／密碼畫面怎麼辦？**
這與一則已知回報相符：QSPI capsule 提示逾時了。安裝程式要求你確認固件（QSPI）更新，只等待 30 秒——若錯過提示，後續步驟可能失敗，語言、網路與使用者名稱畫面可能永遠不會出現；接下來的開機可能停在只有游標的黑屏。官方指南的解法：重新開始安裝，並在 capsule 提示出現時按 Y。部分使用者也先清除了殘留的分割區後重試，或改用 SDK Manager 安裝（使用者回報；NVIDIA 員工已回應該討論串）。參見[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。

> **重要**——安裝程式顯示 QSPI capsule 更新提示時，請在 30 秒內按 **Y**。NVIDIA 稱這是「最常被錯過的步驟」。

**我要如何取得串口控制台？**
將 USB 轉 TTL 串口線接到按鍵排針：RXD pin 3 接轉接器的 TX 線、TXD pin 4 接轉接器的 RX 線、GND pin 7 接轉接器的接地線。接著在你的 PC 上開啟串口控制台、開機，並在開機前畫面按 Esc 進入 UEFI／開機管理程式——你可以全程用這個方式完成 ISO 安裝。一個我們如實指出的缺口：NVIDIA 的頁面只說「在你的 PC 上開啟串口控制台」，並未說明鮑率或終端機程式。當套件以裝置模式透過 USB-C 連到 PC 時，也會呈現一個「USB Serial device for serial terminal access」。參見[接口與硬件佈局](/zh-hant/tutorials/jetson-orin-nano/interfaces)與[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。

## 電源與效能

**為什麼沒有 25W／MAXN SUPER 選項？**
你的套件是以非 Super 開機配置刷機的，所以只會出現 7W 與 15W 模式。這是 JetPack 7.2 ISO 已記載的問題 6279443：ISO 安裝會保留更新前的設定檔，而不會切換到「Super」。JetPack 7.2.1 已為新的安裝修復此問題——ISO「現在預設以 Super Mode 刷機配置刷寫 Jetson Orin Nano Developer Kit」；NVIDIA 並未說明 7.2.1 重新安裝能否轉換以 7.2.0 ISO 安裝的套件。檢查 `/etc/nv_boot_control.conf`：Super 配置會顯示 `-super` 後綴。若要修復既有的 7.2 安裝，請從 Ubuntu 主機以 Super 配置重新刷機（SDK Manager 或刷機腳本）；電源模式選單之後就會提供 15W、25W（預設）與 MAXN SUPER。參見[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)、[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)與[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)。

> **鉅犀註：** 社群存在一種原地修法（編輯 `/etc/nv_boot_control.conf`、重新配置 bootloader、刪除 `/etc/nvpmodel.conf`、重新開機）。多位使用者回報成功，但 NVIDIA 並未認可，且有使用者回報出現開機循環。

## AI 工作負載

**8 GB 能跑多大的模型？**
8GB 的 LPDDR5 是統一記憶體，由 CPU、GPU 與作業系統共享——扣除固件與核心保留區後約有 7.6GB 可用。NVIDIA 公布的指引：搭配 4 位元量化與高記憶體效率的執行階段，可容納大約 10B 參數以內的 LLM，以及大約 4B 參數以內的 VLM。TensorRT Edge-LLM 官方的 Orin Nano 8GB 基準測試涵蓋到 2B 的模型，這也是 NVIDIA 在本套件上做基準測試的最大模型級別。即使檔案看起來放得下，模型仍可能載入失敗，因為 KV cache 也需要記憶體；在 8GB 套件上有 7.4GB 與 16GB 的 GGUF 載入失敗的案例（使用者回報）。參見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)與[8 GB 的記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)。

## 支援與服務

**支援管道怎麼走？**
先從 NVIDIA 官方的[故障排除頁面](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)開始，它涵蓋五個常見的設定問題：ISO 無法開機、沒有顯示輸出、安裝程式未顯示目標儲存裝置、需要更新固件，以及 Docker 權限錯誤。平台相關問題請使用 NVIDIA Jetson 開發者論壇，連結列於官方的 [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) 頁面；發文前請先搜尋，並附上 `cat /etc/nv_tegra_release` 的輸出。鉅犀科技的聯絡方式：

- 技術支援：**support@juxitech.com**
- 訂單、保固與 RMA：**support@juxitech.com**（請附上訂單編號）
- 銷售與報價：**sales@juxitech.com**
- 產品問題（選型、相容性）：**pe@juxitech.com**

官方下載與參考連結：[下載](/zh-hant/tutorials/jetson-orin-nano/downloads)。

> **鉅犀註：** 部分標示為 NVIDIA 員工的論壇回覆，其實是自動生成的 AI 答案（開頭會寫「This is an automated AI response」）。請把這類回覆視為非權威內容，並以官方文件為準。

## 資料來源

- Jetson Orin Nano Developer Kit User Guide —— [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)、[Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)、[How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)、[Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（查閱於 2026-09-26）
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）
- Jetson Linux Release Notes — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)、[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（查閱於 2026-09-26）
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（查閱於 2026-09-26）
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)（查閱於 2026-09-26）
- NVIDIA developer forums — [開機卡住／跳過使用者名稱設定討論串](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)、[25W／MAXN SUPER 討論串](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)（查閱於 2026-09-26）
- [鉅犀科技商店頁面——Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)（查閱於 2026-09-26）

*狀態：草稿，待 cheny 審核。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
