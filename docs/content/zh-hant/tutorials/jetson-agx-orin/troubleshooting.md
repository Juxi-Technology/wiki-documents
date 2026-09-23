---
title: 故障排除
sidebar_label: 故障排除
slug: /support/troubleshooting
description: >-
  針對 Jetson AGX Orin 開發者套件的症狀導向故障排除——
  涵蓋開機與顯示、電源、刷機與已知問題，內容以 NVIDIA 官方文件為依據。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# 故障排除

問題依症狀分組——先找到你遇到的那一類，再依序逐項檢查。本頁內容均以 NVIDIA 官方文件為依據（來源見文末）。本頁未涵蓋的內容，請參閱文末的*取得協助*。

## 套件無法開機

1. 隨附的 USB-C 電源供應器必須接在 **DC 插孔上方的 USB-C 接口**（J24）——而不是 40 引腳排針旁邊的接口。
2. 接通電源後，套件會自動開機；如果沒有，請按一下 **Power 按鍵**。
3. 如果你透過桶形插孔（J41）使用自備電源：外徑 5.5 mm，內徑 2.5 mm，**內正極**。

## 無顯示輸出 / 螢幕持續黑屏

- **DisplayPort 是唯一的顯示輸出。** 沒有 HDMI 接口，也無法透過 USB-C 輸出 DisplayPort。若要連接 HDMI 顯示器，請使用**主動式** DP→HDMI 轉接器或轉接線。
- 首次開機時，螢幕最長可能需要**一分鐘**才會出現。
- 如果你使用了 **KVM 切換器**，請改為將顯示器直接連接到套件——KVM 裝置是已知的黑屏問題來源，正常開機與 ISO 安裝期間都可能出現（NVIDIA 已在安裝指南中列出這一點）。
- 電源配置有問題時開機？請參閱下文的*連接顯示器時重新開機導致系統崩潰*——請嘗試**不接**顯示器開機，開機完成後再重新接上。

## 安裝 ISO 後，套件仍會開機進入舊系統

安裝完成後請拔除安裝用的 USB 隨身碟。如果隨身碟一直插著，套件可能會再次從它開機，而不是從剛安裝好的系統開機。（官方指引。）

## 刷機——Jetson ISO 問題

- **套件不會從 USB 隨身碟開機：** 請在開機時開啟 **UEFI 開機管理程式**，並選擇該 USB 隨身碟。
- **出現 QSPI 固件提示：** 按 **`Y`**。這是相容性所必需的 capsule 更新，且會執行兩次。如果你錯過了提示，或不確定它是否已完成，請**重新開始安裝**並加以確認。跳過這一步會導致安裝問題（NVIDIA 發行說明中的已知問題 6266271）。
- **我的套件早於 L4T r35.5：** ISO 方式要求已安裝的 BSP 為 r35.5 或更新版本。請先用主機 PC 方式（SDK Manager 或 `flash.sh`）更新到 r35.5+——參見[刷機與更新](/zh-hant/tutorials/jetson-agx-orin/flashing-and-updates)。

## 刷機——SDK Manager 問題

- **未偵測到裝置：** 請依序檢查——
  1. 線纜插在 **40 引腳排針旁的 USB-C 接口**（接口 10 / J40），而不是電源接口；
  2. 套件已進入 **Force Recovery 模式**：按住**中間的 Force Recovery 按鍵**，同時插入電源插頭；
  3. 主機符合需求：Ubuntu Desktop 20.04/22.04（x86_64）、8 GB 系統記憶體、25 GB 可用磁碟空間，並已登入 NVIDIA Developer Program 帳號。（L4T 39.2 發行說明將用於刷機的主機發行版列為 24.04/22.04——請以 SDK Manager 系統需求頁面上的最新清單為準。）
- **我想刷機到 NVMe / microSD / USB 隨身碟：** ISO 安裝程式涵蓋 eMMC 與 NVMe；其他目標需要使用 SDK Manager 或刷機腳本（主機 PC）。

## 連接顯示器時重新開機導致系統崩潰（AGX Orin 64GB，15W 模式）

NVIDIA 發行說明中的已知問題 **6236259**：在 AGX Orin 平台上，於 systemd 初始化期間將 EMC 頻率降至最高值以下（15W 等低功耗模式下會發生這種情況），可能導致系統在重新開機時崩潰——尤其是在連接了顯示器的情況下。NVIDIA 的因應措施：

1. 重新開機前，先切換到 **MAXN** 電源模式（將 EMC 恢復至 Fmax）。
2. 系統重新開機後，再套用你需要的電源模式。
3. 如果是在問題模式下重新開機的：請斷開顯示器、開機，待初始化完成後再重新接上顯示器。

## 網路與無線（刷機後的說明）

- **刷機後無法連線 6 GHz / WPA3：** 請重置裝置後再試一次（L4T 39.2.0 中列為已修正；此重置說明仍適用於以較舊映像刷機的裝置）。
- **掃描時缺少部分 Wi-Fi 存取點（環境繁忙時）：** 增加掃描緩衝區——`wpa_cli set bss_max_count 500`（出自發行說明的已修正問題章節）。

## 本頁之外的已知問題

在深入除錯之前，請先查看目前發行說明中的**已知問題**章節——內容涵蓋一般系統、攝像頭、多媒體、圖形、連線、顯示與運算堆疊等項目：

- [Jetson Linux 39.2.0 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## 取得協助

- **[NVIDIA Jetson 開發者論壇](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)**——官方社群；發文前請先搜尋，並附上 `cat /etc/nv_tegra_release` 的輸出。
- **鉅犀科技支援**——如需技術支援，或處理訂單、保固與 RMA 事宜，請聯絡 **support@juxitech.com**。為加快處理速度，請附上你的訂單編號與 `cat /etc/nv_tegra_release` 的輸出。（銷售：sales@juxitech.com · 產品諮詢：pe@juxitech.com）

## 資料來源

- [快速開始](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP 安裝](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [硬體佈局](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)——Jetson AGX Orin 開發者套件使用者指南（已於 2026-09-23 核對）
- [Jetson Linux 39.2.0 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（已於 2026-09-23 核對）

*狀態：草稿，待 cheny 審核。客戶回報的硬體相關行為可能存在差異；請根據陸續收到的現場回報更新本頁。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
