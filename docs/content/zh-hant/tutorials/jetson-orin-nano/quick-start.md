---
title: 快速開始——從開箱到可用的 JetPack 7.2.1 系統
sidebar_label: 快速開始
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit（8GB）的首次設定：
  固件檢查、將 Jetson 7.2.1 ISO 寫入 USB 隨身碟，以及把 JetPack 7.2.1
  （L4T r39.2.1）安裝到 microSD 卡或 NVMe SSD。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 快速開始

本頁將帶你的 NVIDIA Jetson Orin Nano Super Developer Kit（8 GB）從開箱一路完成到可用的 **JetPack 7.2.1** 系統（Jetson Linux / L4T r39.2.1）。流程遵循 NVIDIA 推薦的首次設定路徑：**Jetson ISO** 方式，從 USB 隨身碟安裝。不需要 Ubuntu 主機 PC。

**三步流程：**

1. **通過固件門檻。** 出廠固件較舊的套件必須先更新，才能安裝 JetPack 7.2（第 1 步）。
2. **製作安裝用 USB 隨身碟。** 下載 Jetson ISO，並用 Balena Etcher 寫入 USB 隨身碟（第 2–3 步）。
3. **安裝並設定。** 安裝到 microSD 卡或 NVMe SSD，完成 Ubuntu 初始設定，然後加入 JetPack 組件（第 4–7 步）。

> **重要**
> 從 JetPack 7.2 起，NVIDIA 不再為本套件發布 microSD 卡映像檔。
> **沒有可刷寫的 SD 卡映像**。安裝媒體是 USB 隨身碟。microSD 卡
> （或 NVMe SSD）只是**安裝目標**。以「把映像寫到 microSD 卡」
> 開頭的舊教學已不再適用。

## 包裝內容

- Jetson Orin Nano 8 GB 模組與散熱片，安裝在參考載板上
- 19 V 電源供應器
- 802.11ac/ab/gn 無線網路介面控制器（安裝於 M.2 Key-E 插槽）
- 快速開始與支援卡

**不包含任何儲存媒體。** 盒內沒有 microSD 卡，也沒有 NVMe SSD，模組本身也沒有內建 eMMC 儲存空間。所有儲存空間都來自你自行安裝的卡片或硬碟。

## 你需要自備

- **儲存裝置——以下二選一：**
  - **microSD 卡，64 GB UHS-1 或更大**（推薦）。它要插進**模組底部**的卡槽。請在啟動安裝程式前插入。
  - 一支 **NVMe SSD**，裝到載板上其中一個 M.2 Key-M 插槽。選配，但若想要更大容量與更好的儲存效能，推薦選用。
- 一支 **USB 隨身碟，16 GB 或更大**——它將成為安裝程式。
- 一台**筆記型電腦或 PC**（Windows、Mac 或 Linux），至少要有 **25 GB 可用空間**——用來下載 ISO 並寫入 USB 隨身碟。
- 一台 **DisplayPort 顯示器**，外加 USB 鍵盤與滑鼠。DisplayPort 是本品唯一的顯示輸出；不支援 HDMI 輸出與 USB-C 的 DisplayPort。主動式 DisplayPort 轉 HDMI 轉接器可搭配 HDMI 顯示器使用。
- 沒有顯示器時：一條 **USB 轉 TTL 串口線**，用於無頭串口控制台（見第 1 步）。

![microSD 卡](/images/jetson-orin-nano/microsd_64gb.png)
*目標儲存選項 1：一張 64 GB UHS-1 microSD 卡。*

![NVMe SSD](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*目標儲存選項 2：裝在 M.2 Key-M 插槽中的 NVMe SSD。*

> **鉅犀提示：** 鉅犀商店的本套件組合包另含一張 64 GB microSD 卡與一個
> M.2 Wi-Fi 模組。這張卡出貨時**未預先寫入映像**（空白），請依本頁的 ISO
> 流程把系統安裝到卡上。

## 第 1 步 —— 檢查固件門檻

JetPack 7.2 及更新版本的安裝**要求開發者套件具備 JetPack 6.x 世代的 UEFI/QSPI 固件**。如果你的套件還是較舊的出廠固件，請先完成 **JetPack 6.x 更新路徑**。

連接顯示器時：

1. 連接 DisplayPort 顯示器與 USB 鍵盤。接上 19 V 電源供應器——套件會自動開機，USB-C 接口旁的綠色 LED 會亮起。
2. **NVIDIA 開機畫面出現後連續按 `Esc`。** 這會開啟 UEFI 設定選單。
3. 查看畫面上方附近的**固件版本**列：

| 固件版本 | 怎麼做 |
|---|---|
| 36.x 或更新 | 繼續第 2 步 |
| 比 36.0 更舊 | 先完成 JetPack 6.x 更新路徑（見下文） |

![顯示固件版本的 UEFI 選單](/images/jetson-orin-nano/firmware-version-check.png)
*固件版本顯示在 UEFI 設定選單上方附近。*

無頭替代方案：將 USB 轉 TTL 串口線接到按鍵排針（轉接器 TX 線接 pin 3／RXD，轉接器 RX 線接 pin 4／TXD，轉接器接地線接 pin 7／GND），在電腦上開啟串口控制台，並在顯示開機前選項時於控制台中按 `Esc`。

![按鍵排針上的 USB 轉 TTL 串口線](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*無頭路線：接在按鍵排針上的 USB 轉 TTL 串口線。*

### 如果固件太舊

**JetPack 6.x 更新路徑**會把固件推進到新版本。簡述如下（完整步驟見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)）：

1. 從 microSD 卡啟動 **JetPack 5.1.3** 橋接映像檔（檔名 `JP513-orin-nano-sd-card-image_b29.zip`）。
2. 一個背景服務會排定 bootloader 更新（可用 `sudo systemctl status nv-l4t-bootloader-config` 檢查）。
3. 重新開機。固件更新會在這一次開機期間執行（可用 `sudo nvbootctrl dump-slots-info` 檢查）。
4. 安裝 QSPI 更新程式：先 `sudo apt update`，再 `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`，然後重新開機。
5. 關機，取出橋接卡，插入你的目標儲存裝置，然後繼續第 2 步。

這條路徑需要一張 microSD 卡與一個讀卡機。沒有的話，替代方案是在 Ubuntu 主機上使用 SDK Manager（見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)）。還有一種情況：如果固件來自 BSP 36.2（JetPack 5.0 DP），安裝程式內的 capsule 更新並不支援——請先讓套件升到任何較新的版本，再執行 JetPack 7.2.1 ISO 安裝。

如果你仍照樣啟動安裝程式，畫面一直黑或掉到 UEFI shell，固件很可能就是太舊。請不要反覆重試開機。先關機、完成更新路徑，再重試。

![UEFI 互動式 shell](/images/jetson-orin-nano/uefi_interactive_shell.png)
*沒出現安裝程式、反而出現 UEFI shell（或黑畫面），通常代表固件對目標 JetPack 版本而言太舊。*

## 第 2 步 —— 下載 Jetson ISO

從 [JetPack 下載頁](https://developer.nvidia.com/embedded/jetpack/downloads) 下載 JetPack 7.2.1 安裝程式 ISO（標籤：**Jetson ISO (r39.2.1)**），或使用這個直接連結：

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

ISO 檔名遵循 `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` 的模式（本版本為 `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`）。NVIDIA 的下載頁並未列出 ISO 的檔案大小或校驗碼。

## 第 3 步 —— 將 ISO 寫入 USB 隨身碟

1. 從 <https://etcher.balena.io/#download-etcher> 安裝 **Balena Etcher**（Windows、Mac 或 Linux）。
2. 把 USB 隨身碟插入你的 PC。
3. 在 Etcher 中選擇 ISO 檔案、選擇 USB 隨身碟，然後開始寫入。

![用 Balena Etcher 將 Jetson ISO 寫入 USB 隨身碟](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*用 Balena Etcher 將 Jetson ISO 寫入 USB 隨身碟。*

> **注意**
> **不要將 ISO 寫到 microSD 卡。** 從 JetPack 7.2 起，
> 不再支援 SD 卡映像。請把 ISO 寫到 USB 隨身碟，
> 再用它把 Jetson Linux 安裝到你的 microSD 卡或 NVMe SSD。

用檔案管理器把 ISO 檔複製到隨身碟是行不通的——必須以磁碟映像方式寫入。製作完成的隨身碟只是安裝程式；它無法開機進入可用的桌面。

## 第 4 步 —— 從安裝程式開機並安裝

1. 關閉套件電源，然後安裝**目標儲存裝置**：
   - microSD 卡：插入**模組底部**的卡槽。
   - NVMe SSD：裝到載板上的 M.2 Key-M 插槽。
   請在啟動安裝程式之前先安裝好目標儲存裝置。
2. 插入安裝用 USB 隨身碟。連接顯示器、鍵盤與滑鼠，然後接上電源供應器。請把安裝隨身碟**直接**插到套件上，不要透過集線器：NVIDIA 記載了一款會破壞 ISO 安裝的 USB 3.0 集線器（型號 UH400），以及一款可能導致刷機失敗的 USB 轉乙太網路轉接器（TRENDnet TU2-ET100）。參見**[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**。
3. **在 NVIDIA 標誌開機畫面出現時按 `Esc`。** 選擇 **Boot Manager**，選擇你的 USB 磁碟，按 Enter 從它開機。NVIDIA 建議明確選擇 USB 磁碟，這樣你才能確定執行中的是正確的安裝程式。
4. **當 QSPI capsule 更新提示出現時，在 30 秒內按 `Y`。** 這是最常被錯過的一步。提示很容易在當下被錯過。如果它逾時、安裝在沒有更新的情況下繼續，之後就會安裝失敗——請重新開始安裝，並在提示出現時按 `Y`。capsule 更新會執行**兩輪**，套件可能會在兩輪之間或之後重新開機。這是正常現象；請等待兩輪都完成。目前 QSPI 固件為 r38.2.0/r38.2.1 的套件，必須在第一輪完成後**再次**確認固件更新（r39.2.1 發行說明問題 6480645）——若再次出現提示，請再按一次 `Y`。
5. 在 **Jetson BSP 安裝 GRUB 選單**中，選擇 **Install Jetson ISO r39.2.1**。選擇目標儲存裝置（microSD 卡或 NVMe SSD）並確認。**安裝會抹除所選裝置**——確認前請檢查你的選擇。
6. 等待安裝完成。NVIDIA 的說明寫道，白字會在畫面上捲動數分鐘；出現提示時請重新開機。社群回報的安裝時間差異很大——從約 15 分鐘到長得多都有（未經確認，論壇回報）。
7. **拔下 USB 隨身碟**，讓套件從目標儲存裝置、而不是再次從安裝程式開機。

NVIDIA 員工在論壇上也建議在 ISO 安裝期間保持顯示器連接。

## 第 5 步 —— 首次開機與 Ubuntu 初始設定

安裝程式重新開機後，套件會啟動 Ubuntu 初始設定（`oem-config`）：

1. 詳閱並接受 NVIDIA Jetson 軟體最終使用者授權合約（EULA）。
2. 選擇系統語言、鍵盤配置與時區。
3. 連接網路。
4. 建立使用者名稱、密碼與電腦名稱。
5. 登入 Ubuntu 桌面。

## 第 6 步 —— 安裝 JetPack 組件

ISO 安裝的是基礎系統（Jetson Linux）。CUDA、cuDNN、TensorRT 與 JetPack 堆疊的其餘部分是在首次開機後才加入。在套件桌面上開啟終端機並執行：

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

若出現提示，請在安裝後重新開機。

檢查結果：

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` 應回報 R39 版本、修訂號 2.1。完整檢查清單見[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)。

## 第 7 步 —— 檢查電源模式

預設電源模式通常是 **25W**。若要發揮最大效能，請在 Ubuntu 桌面頂端列點擊目前的電源模式，選擇 **Power Mode**，再選 **MAXN SUPER**；在命令列上，`sudo /usr/sbin/nvpmodel -q` 會顯示目前模式。JetPack 7.2.1 的 ISO 安裝預設使用 Super Mode 刷機配置，因此 25W 與 MAXN SUPER 應該都會出現——如果沒有，請參見[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。

![在電源模式選單中選擇 MAXN SUPER](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*選擇 Power Mode → MAXN SUPER 以獲得最大效能。*

## 快速排錯

| 現象 | 首先檢查 |
|---|---|
| 套件無法開機 | 19 V 電源供應器必須接在 DC 插孔。套件會自動開機；USB-C 接口旁的綠色 LED 應該亮起。 |
| USB 安裝程式沒有開機 | 在 UEFI 開機管理程式中明確選擇 USB 磁碟（在開機畫面按 `Esc`）。確認固件為 36.x 或更新。 |
| 沒出現安裝程式，而是黑畫面或 UEFI shell | 固件可能太舊。請先完成 JetPack 6.x 更新路徑。 |
| 安裝程式跳過語言／網路／使用者名稱設定；首次開機卡在黑畫面 | QSPI capsule 提示被錯過了。重新開始安裝，並在 30 秒內按 `Y`。 |
| 安裝程式沒有顯示目標儲存裝置 | microSD：確認卡片已完全插入模組底部的卡槽。NVMe：重新插好硬碟並重新啟動安裝程式。 |
| 只有 7W/15W 電源模式；沒有 25W 與 MAXN SUPER | 參見[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。 |

## 資料來源

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（查閱於 2026-09-26）
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（查閱於 2026-09-26）

*狀態：草稿，待 cheny 審核。內容以所列日期的 NVIDIA 官方文件為依據；尚未由鉅犀科技在實體硬體上驗證。*

**圖片來源：** 本頁圖片來自 NVIDIA 官方 *Jetson Orin Nano Developer Kit User Guide*（下載於 2026-09-26），版權歸 © NVIDIA Corporation 所有。此處轉載用於說明官方設定流程。

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
