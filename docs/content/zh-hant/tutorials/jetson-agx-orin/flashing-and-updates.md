---
title: 刷機與更新——BSP 安裝方式
sidebar_label: 刷機與更新
slug: /getting-started/flashing-and-updates
description: 在 Jetson AGX Orin 開發者套件上安裝或更新 BSP 的三種官方方式——Jetson ISO(推薦)、NVIDIA SDK Manager 與 Linux_for_Tegra 刷機腳本——以及如何進入 Force Recovery 模式。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# 刷機與更新——BSP 安裝方式

NVIDIA 提供三種官方方式,用於在開發者套件上安裝或更新 BSP。依你的情況選擇:

| | 💾 從 eMMC 開始 | 🛠️ SDK Manager | 📜 刷機腳本 |
|---|---|---|---|
| 簡要說明 | 從預先燒錄的 eMMC 開機,用 Jetson ISO 更新 | 主機 PC 上的 GUI 工具;可刷寫 BSP,並可安裝 JetPack 組件 | 主機 PC 上的 `flash.sh` 腳本 |
| Ubuntu 主機 PC | **不需要** | 需要 | 需要 |
| 典型耗時 | 首次開機即可使用;ISO 更新約需 15 分鐘 | 刷機約需 30 分鐘 | 視具體環境而定 |
| 適用對象 | 所有人(推薦的預設方式) | 擁有 Ubuntu PC 的使用者;需要刷寫 NVMe/microSD/USB,或套件無法連網時 | 產品開發者、進階使用者 |

> **鉅犀提示:** 目前版本為 **JetPack 7.2.1 (L4T r39.2.1)**。如果你的套件是全新到手的,請先看 **[快速開始](/zh-hant/tutorials/jetson-agx-orin/quick-start)**——它會帶你完整走一遍推薦流程。

## 方式一——從 eMMC 開始,用 Jetson ISO 更新(推薦)

你的開發者套件出廠時,eMMC 中已預先燒錄 L4T BSP,開箱即可開機進入 Ubuntu 桌面。推薦的更新方式是 **Jetson ISO**——一支可開機的 USB 隨身碟,**無需 Ubuntu 主機 PC** 即可更新套件。

**前提條件:** 已安裝的 BSP 必須為 **L4T r35.5 或更新版本**(可用 `cat /etc/nv_tegra_release` 檢查)。較舊的套件需先使用主機 PC 方式(見下文方式二或方式三)。

完整的分步流程(使用 Balena Etcher 製作 USB 開機碟、UEFI 開機、QSPI capsule 提示、GRUB 選單、儲存媒體選擇、首次開機)見 **[快速開始 → 第 2 步](/zh-hant/tutorials/jetson-agx-orin/quick-start)**。

NVIDIA 文檔中的重點:

- 在 GRUB 選單中選擇安裝目標:**eMMC** 或 **NVMe**(如果你加裝了 SSD,推薦選 NVMe)。
- 出現提示時,按 `Y` 確認 **QSPI capsule 更新**——這是相容性所必需的,且會執行兩次。跳過會導致安裝問題(這在 L4T 發行說明中也列為已知問題 6266271)。
- 在已執行 JetPack 7.2.1 的系統上重新安裝是支援的——請仔細依官方說明操作。

## 方式二——NVIDIA SDK Manager(主機 PC)

在以下情況選擇 SDK Manager:

- 需要將基礎 L4T BSP 刷寫到 eMMC 之外的**其他儲存媒體**(NVMe SSD、USB 隨身碟或 microSD 卡),或
- 需要刷寫**無法直接連接網路**的套件。

**主機 PC 需求**(依據 NVIDIA SDK Manager 文檔):x86_64 上的 Ubuntu Desktop **20.04 或 22.04**、8 GB 系統記憶體、25 GB 可用磁碟空間,以及**NVIDIA Developer Program 會員資格**(免費),用於下載工具並登入。注意:L4T 39.2 發行說明將刷機用的主機 Linux 發行版列為 Ubuntu **24.04 和 22.04**——這方面變化較快,請以 NVIDIA SDK Manager 系統需求頁面上的最新清單為準。

**安裝並登入:**

1. 從 NVIDIA 下載 SDK Manager 的 `.deb` 套件並安裝:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. 用 `sdkmanager` 啟動,點擊 **NVIDIA DEVELOPER** 分頁並登入。

**硬體連接與 Force Recovery 模式:**

1. 用隨附的 USB-A↔USB-C 資料線將套件連接到主機 PC,插入 **40-pin 排針旁的 USB-C 埠**(標示為 port 10 / J40)。
2. **按住中間的 Force Recovery 按鍵**(按鍵 2,位於 Power 與 Reset 之間),同時將 USB-C 電源供應器插入 DC 插孔上方的 USB-C 埠。套件會以 **Force Recovery 模式**開機。
3. 在主機上,SDK Manager 應能偵測到套件。*(如果沒有,請參閱[故障排查](/zh-hant/tutorials/jetson-agx-orin/troubleshooting)。)*

**SDK Manager 中的刷機步驟**(摘要——請依螢幕提示操作):

1. **步驟 01:** 產品類別選擇 **Jetson**,取消勾選 "Host Machine",選擇 **Jetson AGX Orin** 模組,然後繼續。
2. **步驟 02:** 若只需基礎 BSP,僅選擇 **Jetson OS**(取消勾選 "Jetson SDK Components")。接受授權條款。
3. **步驟 03:** 輸入你的 sudo 密碼;等待下載完成。在刷機對話框中選擇 **"Manual Setup – Jetson AGX Orin"**,忽略 OEM 設定,選擇要刷入的**儲存裝置**,然後點擊 **Flash**。
4. 刷機完成後,套件會重新開機進入新的 BSP。完成 Ubuntu `oem-config`,然後安裝 JetPack 組件(參見[快速開始 → 第 3 步](/zh-hant/tutorials/jetson-agx-orin/quick-start))。

## 方式三——Linux_for_Tegra 刷機腳本

針對進階使用者與產品開發者:Jetson Linux 套件中的 `flash.sh`(或 initrd flash)腳本可從主機 PC 為 Jetson 裝置刷機。請參閱 [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) 的 **Flashing Support** 章節。

來自 L4T 39.2 發行說明的主機與工具鏈資訊:刷機用的主機 Linux 發行版——Ubuntu 24.04 / 22.04;交叉編譯工具鏈——GCC 13.2;原始碼發行標籤——`jetson_39.2_GA`。

## Force Recovery 模式——如何進入

操作步驟與上文相同,進入該模式無需連接主機:

1. 在套件斷電的狀態下,將 USB-C 資料線連接到主機(如需主機),
2. **按住中間的 Force Recovery 按鍵**,然後接上 USB-C 電源——套件即以 Force Recovery 模式啟動。

要退出恢復模式,請重新上電或重置套件。在主機上,恢復模式通常會顯示為一個 NVIDIA USB 裝置(可用 `lsusb` 查看)。

## 刷機之後

驗證結果:**[驗證你的系統](/zh-hant/tutorials/jetson-agx-orin/verify-your-system)**——檢查 L4T、CUDA 以及整套 JetPack 組件的版本。

## 參考資料

- [BSP 安裝——Jetson AGX Orin 開發者套件使用者指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)(已於 2026-09-23 核對)
- [快速開始——同一指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)(已於 2026-09-23 核對)
- [Jetson Linux 39.2.0 發行說明(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)(已於 2026-09-23 核對)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*狀態:已於 2026-10-11 審核。內容依據所列日期的 NVIDIA 官方文檔;尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布,並非 NVIDIA 官方出版物。
