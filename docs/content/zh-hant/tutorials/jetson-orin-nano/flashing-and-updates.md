---
title: 刷機與更新——BSP 安裝方式
sidebar_label: 刷機與更新
slug: /getting-started/flashing-and-updates
description: >-
  在 Jetson Orin Nano Super Developer Kit 上安裝或更新 BSP 的三種官方方式——
  Jetson ISO（推薦）、NVIDIA SDK Manager 與 Linux_for_Tegra 刷機腳本——
  外加儲存裝置的抉擇、較舊套件的 JetPack 6.x 固件更新路徑，以及 Force Recovery 模式。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# 刷機與更新——BSP 安裝方式

NVIDIA 支援三種官方方式，可在 Jetson Orin Nano Super Developer Kit 上安裝或更新 BSP（Jetson Linux）。有兩個硬體事實塑造了這三種方式：**盒內沒有任何儲存裝置**（沒有 eMMC、沒有 microSD 卡、沒有 SSD），而且 JetPack 7.2 **移除了 SD 卡映像**——由 USB 隨身碟上的統一 ISO 取代，而 microSD 卡本身仍是有效的安裝目標。

| | Jetson ISO（推薦） | NVIDIA SDK Manager | Linux_for_Tegra 刷機腳本 |
|---|---|---|---|
| 簡要說明 | 用任何 PC 製作的 USB 安裝碟啟動套件；在套件上選擇目標儲存裝置 | 主機 PC 上的 GUI 工具；透過 USB-C 把 BSP 刷寫到你選的儲存裝置 | 主機 PC 上的命令列刷機工具；直接控制目標 |
| Ubuntu 主機 PC | 不需要 | 需要（x86_64） | 需要（x86_64） |
| 典型耗時 | 未公布；安裝程式會持續輸出，為時「數分鐘」 | 未公布；主機會先下載 BSP 與根檔案系統 | 視你的環境而定 |
| 適用對象 | 新套件的首次設定；大多數使用者 | 擁有 Ubuntu PC 的使用者；NVIDIA 偏好直接刷到 NVMe SSD 的路線；也用於固件更新 | 進階使用者與產品開發者 |

NVIDIA 未公布安裝時間；論壇回報從約 15 分鐘到兩小時都有（未經確認）。

> **鉅犀提示：** 目前版本是 **JetPack 7.2.1（L4T r39.2.1）**。新套件請從
> **[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)** 入手——它會帶你把推薦的 ISO 路徑完整走一遍。
> 回到本頁則可比較各路線、選擇儲存裝置，或更新較舊的套件。

## 方式一——Jetson ISO（推薦）

Jetson ISO 是 NVIDIA 推薦的首次設定路徑，也是唯一不需要 Ubuntu 主機 PC 的路線：在任何電腦上把一個 ISO 檔寫入 USB 隨身碟，從隨身碟啟動套件，再安裝到你準備好的儲存裝置。請準備以下項目：

- **目標儲存裝置**（套件本身沒有；見下方儲存裝置一節）：一張 **microSD 卡，64 GB UHS-1 或更大（推薦）**，在啟動安裝程式前插入**模組底部**的卡槽；或一支 **NVMe SSD**（選配；若想要更大容量與更好的儲存效能，推薦選用）。
- **一支 USB 隨身碟，16 GB 或更大**——它將成為安裝程式。
- **一台筆記型電腦或 PC（Windows、Mac 或 Linux），至少 25 GB 可用空間**，用來寫入 ISO。
- **一台 DisplayPort 顯示器與 USB 鍵盤**（或一條 USB 轉 TTL 串口線，用於無頭設定；不支援 HDMI），外加隨附的 19 V 電源供應器。

兩項注意事項決定成敗：固件必須是 JetPack 6.x 世代——若畫面持續黑屏或出現 UEFI shell，請先執行下方的 JetPack 6.x 更新路徑——以及在 QSPI capsule 提示出現時於 30 秒內按 `Y`；提示逾時會讓安裝之後失敗，請重新開始安裝並按 `Y`。

> **重要**——請把 ISO 寫到 **USB 隨身碟，而不是 microSD 卡**（「不要把 Jetson ISO 刷寫到 microSD 卡」）。安裝也會**抹除所選的目標儲存裝置**；開始前請確認你選的是哪個裝置。

完整的逐步流程——ISO 下載、Balena Etcher、UEFI 開機管理程式、GRUB 選單、儲存裝置選擇、首次開機的 Ubuntu 設定——見 **[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)**。安裝用 USB 隨身碟**不是「Live USB」**（它只負責安裝），所以安裝完成、出現提示後請將它移除。

## 方式二——NVIDIA SDK Manager（主機 PC）

SDK Manager 是主機 PC 路線：它透過 USB-C 刷寫 BSP，也能更新套件的固件（見下方更新路徑一節）。

**主機 PC 需求**（依套件的 BSP Setup 頁面）：一台**執行 Ubuntu 22.04 或 Ubuntu 20.04 的 x86 PC**；**網際網路連線與一個免費的 NVIDIA Developer Program 帳號**；一條連接套件 USB-C 接口的 **USB 線**，外加「一支跳線針或金屬迴紋針」；以及供套件使用的顯示器或 USB 轉 TTL 串口線。

> **鉅犀提示：** NVIDIA 的說法互相矛盾。套件設定頁列出 Ubuntu 22.04 或 20.04；
> L4T r39.2.1 發行說明則把刷機用的主機發行版列為「Ubuntu 24.04 和 22.04」。
> 準備主機 PC 之前，請先查閱 NVIDIA 的 SDK Manager 需求。

**在主機上安裝 SDK Manager。** NVIDIA 的設定頁給了 Ubuntu 22.04 與 20.04 的確切指令；用 `sdkmanager` 啟動它，然後用你的 NVIDIA Developer 帳號登入（會開啟瀏覽器視窗；可能出現雙因素驗證）。

**刷寫 BSP**（摘要；請依畫面上的指示操作）。SDK Manager 透過 USB 刷寫，所以請先讓套件進入 Force Recovery 模式（見下文）：

1. 選擇 **Jetson Orin Nano [8GB developer kit version]** 並點擊 **OK**；取消勾選 **Host Machine**，只留下 Jetson 目標；點擊 **Continue**；下一步只保留 **Jetson Linux**；接受授權條款並輸入主機的 sudo 密碼。
2. 在刷機提示中（SDK Manager 會先下載套件）：選擇 **Runtime for OEM Configuration**；選擇 **NVMe** 或 **SD Card** 作為儲存裝置；點擊 **Flash**。
3. 刷機完成後，從 J14 排針移除跳線、重新上電套件，並完成 Ubuntu 初始設定（oem-config）。

> **鉅犀提示——模組 SKU：** 本套件內含 **P3767-0005** 模組，NVIDIA 將其記載為
> 「Jetson Orin Nano 8GB (P3767-0005, for development only)」。商用 8GB
> Orin Nano 模組是 **P3767-0003**——另一個 SKU，不屬於本套件。請使用 NVIDIA
> 為本套件命名的目標項目：**Jetson Orin Nano [8GB developer kit version]**。

## 方式三——Linux_for_Tegra 刷機腳本

給進階使用者與產品開發者：用 Jetson Linux Driver Package 進行命令列刷機。依照 NVIDIA 的設定頁：下載你的 JetPack 版本對應的 Driver Package 與範例根檔案系統；在 Ubuntu x86_64 主機上解開 Driver Package；把範例根檔案系統解到 `Linux_for_Tegra/rootfs`，並從 `Linux_for_Tegra` 執行 `apply_binaries.sh`；讓套件進入 Force Recovery 模式（見下文）；然後對 Jetson Orin Nano Developer Kit 目標執行對應的刷機指令。目標名稱與詳細指令在 Jetson Linux Developer Guide 中。

- 本套件的目標名稱是 `jetson-orin-nano-devkit` 與 `jetson-orin-nano-devkit-super`；NVIDIA 指出 Super 配置具有「更高的功耗預算與延伸的時脈頻率級距」。
- Developer Guide 為本套件提供的範例——NVMe 搭配 Super 配置：`sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`（`--erase-all` 選項會抹除目標儲存裝置上的資料）。
- 出自 L4T r39.2.1 發行說明：刷機用主機——Ubuntu 24.04 / 22.04；工具鏈——GCC 13.2；原始碼標籤——`jetson_39.2.1_GA`。出自 JetPack 下載頁：BSP 套件——`Jetson_Linux_R39.2.1_aarch64.tbz2`。

## 選擇目標儲存裝置：microSD 或 NVMe SSD

安裝程式只會提供它**開機時已連接**的儲存裝置。請先決定、裝好儲存裝置，再啟動安裝程式。

| | microSD 卡 | NVMe SSD |
|---|---|---|
| 規格 | 64 GB UHS-1 或更大，推薦 | M.2 Key-M 插槽中的 PCIe NVMe 硬碟 |
| 裝在哪裡 | **模組底部**的卡槽 | M.2 Key-M 2280 插槽（PCIe 3.0 x4）或 2230 插槽（PCIe 3.0 x2） |
| 為何選它 | 模組的預設儲存裝置；最簡單、成本最低的選項 | 更大容量與更好的儲存效能；推薦用於 AI 模型、容器、資料集與專案檔案 |

**microSD 仍是有效的安裝目標。** JetPack 7.2 移除的是 SD 卡的*映像檔*——不是 microSD 這個*目標*：在 ISO 流程中，插著卡片啟動 USB 安裝程式並選擇它即可（SDK Manager 也能從主機刷寫 microSD 卡）。microSD 卡槽位於**模組底部**。每一條安裝路線都會**抹除所選的目標儲存裝置**，所以不要選擇存有你需要之資料的硬碟。如果安裝程式沒有提供你的 NVMe 硬碟，請見**[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**；採購建議請見**[常見問題 FAQ](/zh-hant/tutorials/jetson-orin-nano/faq)**。

## 較舊的套件：JetPack 6.x 更新路徑

**何時需要：** JetPack 7.2 及更新版本要求 JetPack 6.x 世代的 UEFI/QSPI 固件。NVIDIA 的規則：固件 **36.x 或更新**——套件已就緒；**比 36.0 更舊**——先完成這條路徑（在 UEFI 選單檢查版本；步驟見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)）。兩條官方路線：**microSD 橋接流程**（如下）需要一張 microSD 卡，但不需要 Ubuntu 主機 PC；**SDK Manager**（方式二）需要 Ubuntu 主機 PC，是 NVIDIA 指名的固件／QSPI 更新替代方案。

橋接流程，依 NVIDIA 記載的順序：

1. 把 **JetPack 5.1.3 橋接映像檔**（`JP513-orin-nano-sd-card-image_b29.zip`——請使用更新後的映像）寫入 microSD 卡，用它啟動套件，完成首次開機的 Ubuntu 設定，並把套件連上網際網路。
2. 接著會有一個背景服務排定 bootloader 更新（可能會出現桌面通知）。用 `sudo systemctl status nv-l4t-bootloader-config` 確認——「一次完成的排程執行會顯示服務為 inactive、結束狀態為成功。」

   ![Jetson Linux 桌面上的 bootloader 更新通知](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. 重新開機；固件更新會在開機期間執行。之後用 `sudo nvbootctrl dump-slots-info` 檢查狀態——NVIDIA 在此階段的範例輸出是「Current version: 35.5.0」。

   ![從 JetPack 6.x 固件進行固件更新的進度](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. 安裝 QSPI 更新程式：先 `sudo apt update`，再 `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`；重新開機並讓更新完成。
5. 至此固件已為 JetPack 6.x 世代準備就緒，5.1.3 卡片已不再是目標開機媒體。關機，然後從 USB 安裝程式執行 JetPack 7.2.1 安裝（見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)）。

補充說明：經過 JetPack 6.2.x 可能會在其首次開機後排定**又一次** UEFI 固件更新——出現提示時請再次重新開機。出自 r39.2.1 發行說明（已知問題 6379600）：ISO 安裝期間的 capsule 更新不支援來自 **BSP 36.2 / JetPack 5.0 DP** 版本的裝置——請先把這些裝置更新到較新的版本。

## Force Recovery 模式——如何進入

Force Recovery 模式（RCM）是主機 PC 刷機時所需的狀態。NVIDIA 記載了三種進入方式：

1. **在執行中系統的終端機裡：** `sudo reboot --force forced-recovery`。
2. **套件已關機：** 連接按鍵排針的 pin 9 與 pin 10（設定頁稱之為 J14 排針），然後插入 DC 電源開機。
3. **套件已開機：** 連接 pin 9 與 10，然後暫時連接 pin 7 與 8 以重置系統。

進入 RCM 後，等主機偵測到裝置，就把跳線移除。**USB-C 接口**承載刷機連線（它以 USB Recovery 模式運作）；在主機上，開始刷機前 `lsusb` 應顯示一個 NVIDIA USB 裝置。

## 重新安裝與升級

**在執行中的套件上更新 JetPack 組件**：`sudo apt update`，然後 `sudo apt install nvidia-jetpack`——見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)。

**重新安裝 BSP（相同或更新的 JetPack）。** 三條路線任選其一再跑一次；ISO 流程是裝置端就能做的選項。NVIDIA 對 ISO 重裝的提醒：「如果你要用 ISO 在已安裝的系統上重新安裝 JetPack 7.2.1，請仔細遵循 Getting Started Guide 中的說明。」重新安裝會**抹除目標儲存裝置**（請先備份），若出現 QSPI capsule 提示，請在 30 秒內按 `Y`。完成後移除 USB 安裝碟，讓套件從新系統開機。

**重裝之後的 Super 模式。** 7.2.1 ISO「預設以 Super Mode 刷機配置刷寫 Jetson Orin Nano Developer Kit」。在較早的 7.2 版本上，以 ISO 更新的套件會保留先前的設定檔，可能落得沒有 25 W / MAXN SUPER 模式（r39.2 已知問題 6279443；NVIDIA 當時的指引是從 Linux 主機或 SDK Manager 刷機）。NVIDIA 並未記載重跑 7.2.1 ISO 是否會把既有的非 Super 安裝轉為 Super。如果你的套件缺少 25 W / MAXN SUPER 模式，請見**[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**。

**在 JetPack 主版本之間移動。** JetPack 6.x → 7.2.1 的變更清單與回退說明，請見**[JetPack 6.x → 7.2.1](/zh-hant/tutorials/jetson-orin-nano/jetpack-6-to-7)**。任何安裝或更新之後，請驗證結果：**[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)**。

## 資料來源

- [BSP Setup — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html)（查閱於 2026-09-26）
- [Quick Start——同一指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（查閱於 2026-09-26）
- [JetPack 6.x Update Path——同一指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（查閱於 2026-09-26）
- [How-To——同一指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（查閱於 2026-09-26）
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（查閱於 2026-09-26）
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html)（查閱於 2026-09-26）
- [JetPack Downloads](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）
- [SDK Manager — monitor-attached installation instructions](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html)（查閱於 2026-09-26）

*狀態：已於 2026-10-11 審核。內容以所列日期的 NVIDIA 官方文件為依據；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
