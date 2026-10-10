---
title: 接口與硬件佈局
sidebar_label: 接口與硬件佈局
slug: /product/interfaces
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit 的標註佈局與連接器參考——
  所有接口、插槽、排針與控制項，模組底部的 microSD 卡槽、攝像頭連接器、電源與串口控制台。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# 接口與硬件佈局

本套件由兩塊板子組成：**Jetson Orin Nano 模組**（P3767）插在**參考載板**（P3768）上；完整套件為 P3766。本頁依 NVIDIA 官方標記（1–12）介紹各連接器與控制項。

## 編號佈局——標註部件

![開發者套件的編號佈局圖](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*官方編號佈局——NVIDIA 的標記 1–12。*

| # | 部件 | 說明 |
|---|---|---|
| 1 | microSD 卡槽 | 位於**模組底部**——見下文 |
| 2 | 40 引腳擴充排針 | UART、SPI、I2S、I2C、GPIO |
| 3 | 電源指示燈 | 綠色；套件通電時亮起 |
| 4 | USB-C 接口 | 主機、裝置與 USB Recovery 模式；無視頻輸出 |
| 5 | Gigabit 乙太網路接口 | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps；兩個雙層堆疊連接器 |
| 7 | DisplayPort 輸出 | **套件上唯一的顯示輸出** |
| 8 | DC 電源插孔 | 5.5 mm × 2.5 mm 桶形插孔 |
| 9 | MIPI CSI 攝像頭連接器 ×2 | 22 引腳、0.5 mm 間距 |
| 10 | M.2 Key-M 插槽（2280） | PCIe 3.0 ×4——用於 NVMe SSD |
| 11 | M.2 Key-M 插槽（2230） | PCIe 3.0 ×2——用於 NVMe SSD |
| 12 | M.2 Key-E 插槽（2230） | 已裝有隨附的無線模組 |

> **先知道三件事：**
> - **儲存：** 沒有 eMMC，**盒內也沒有任何儲存裝置**。請自行加裝 microSD 卡或 NVMe SSD。
> - **microSD 卡槽：** 位於**模組底部**——見下文。
> - **顯示：** DisplayPort 是*唯一*的顯示輸出——沒有 HDMI，也不能透過 USB-C 輸出視頻。

## microSD 卡槽——模組底部

![模組底部的 microSD 卡槽](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*卡片插入**模組底部**——NVIDIA 圖片，附放大示意圖。*

> **注意：** microSD 卡槽（標記 1）位於**模組底部**，不在載板上。這是本套件最常被忽略的實體細節。請在啟動安裝程式前插入卡片。

- 插有 microSD 卡時，套件會從它開機；建議使用 64 GB UHS-1 或更大容量。
- 如果安裝程式沒有顯示這張卡，NVIDIA 的故障排除指引是確認卡片已完全插入模組卡槽。
- JetPack 7.2 及更新版本沒有 SD 卡映像。要更換安裝的內容，請使用受支援的安裝路徑——見**[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)**。

## 儲存選項

- **microSD**（模組底部，標記 1）——模組的主要儲存裝置。
- **NVMe SSD**——2280 或 2230 尺寸，裝在 M.2 Key-M 插槽（標記 10 與 11，見下文）。
- **USB 隨身碟**——可接 USB-C 或 Type-A；開機順序在 UEFI 開機管理程式中設定。

採購建議與首次開機流程見**[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)**。

## USB

| 接口 | 速度 | 模式 | 說明 |
|---|---|---|---|
| USB 3.2 Type-A ×4（標記 6） | USB 3.2 Gen 2、10 Gbps | 僅主機 | 兩個雙層堆疊連接器；每個堆疊的 VBUS 限 3 A |
| USB-C（標記 4） | USB 3.2 Type-C | 主機、裝置、USB Recovery | 僅資料——此接口不輸出視頻 |

在**裝置模式**下，USB-C 接口會把套件以以下身分呈現給主機 PC：

- 一台帶有 **L4T-README** 檔案的大容量儲存裝置；
- 一個 USB 串口裝置；
- 一條 USB 乙太網路（RNDIS）連線——Jetson 位於 **192.168.55.1**。

## DisplayPort 輸出

- 只有一個輸出（標記 7）：**DisplayPort 1.2，支援 MST**。沒有 HDMI 接口，USB-C 接口也不輸出視頻。
- 搭配 HDMI 顯示器時，請使用 DisplayPort 轉 HDMI 轉接器。
- 如果沒有顯示輸出，請直接把顯示器接上——不要經過 KVM 切換器或轉接串鏈。

## 乙太網路

- 1× Gigabit 乙太網路（RJ45），標記 5。套件沒有 10 GbE 接口。

## M.2 插槽

| 標記 | 插槽 | 尺寸 | 電氣規格 | 可裝 |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | NVMe SSD |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | NVMe SSD |
| 12 | M.2 Key-E | 2230 | — | 隨附的無線模組（已裝上） |

### 無線模組

- Key-E 插槽**出廠已裝有**模組。NVIDIA 只用「802.11ac/ab/gn 無線網路介面控制器」描述這張卡——沒有晶片名稱。
- 社群回報（未經確認）指出原廠卡是 **Realtek RTL8822CE**（AzureWave 模組，PCI ID 10ec:c822）。這是社群資訊，不是 NVIDIA 的聲明。
- 官方支援的 NVMe 型號與 Key-E 模組列在 Jetson Download Center 的「Jetson supported components information」清單中，不在公開頁面上。購買前請先在該處查對零件。
- 如果卡片看不到你的網路——例如使用 MBSSID 的 6 GHz 路由器——請見**[故障排除 → Wi-Fi 看不到網路](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**。

## CSI 攝像頭連接器

- 兩個連接器（標記 9）：22 位、0.5 mm 間距、下接觸式軟排線。
- **CAM0：**CSI 1×2 通道。**CAM1：**CSI 1×2 通道或 1×4 通道。
- 15 引腳的攝像頭（例如 Raspberry Pi Camera Module v2）需要一條 15 轉 22 引腳的排線。

## 40 引腳擴充排針（標記 2）

- GPIO 與周邊介面：UART、SPI、I2S、I2C、GPIO。
- 引腳定義、電壓位準與電氣限制，NVIDIA 請參閱 *Jetson Orin Nano Developer Kit Carrier Board Specification*（Jetson Download Center）。本頁撰寫時無法取得該文件。

## 按鍵排針（12 引腳）

按鍵排針承載串口控制台、重置與 Force Recovery 功能。

| 引腳 | 功能 |
|---|---|
| 3（RXD）、4（TXD）、7（GND） | 串口控制台（UART） |
| 9 + 10 | Force Recovery 模式——短接這兩個引腳後開機 |
| 7 + 8 | 重置——系統通電時短接這兩個引腳 |
| 跳線 | 設定自動開機行為 |

### 串口控制台

- 接上 USB-TTL 串口轉接器：轉接器 TX 接 pin 3（RXD），RX 接 pin 4（TXD），GND 接 pin 7。
- 這是無頭時的替代方案。如何擷取開機日誌請見**[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**。

### Force Recovery 與重置

- **Force Recovery 模式：**連接 Pin 9 與 10，然後開啟套件電源。
- **重置：**套件開機時，短接 Pin 7 與 8。
- Force Recovery 模式用於刷機流程——見**[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)**。

## 電源

- **DC 電源插孔（標記 8）：**5.5 mm × 2.5 mm 桶形插孔；請使用隨附的 19 V 電源供應器。
- **自動開機：**預設情況下，一接上 DC 電源，套件就會開機。按鍵排針上的跳線可改變此行為。
- **電源 LED（標記 3）：**套件通電時，USB-C 接口旁的綠色 LED 會亮起。
- NVIDIA 已查核的頁面並未記載隨附電源供應器的電流額定值或插孔極性。使用第三方電源供應器時，請向供應商確認這兩項。

## 風扇連接器

- 載板上有一個 4 引腳風扇排針。
- 模組出貨時附散熱片；官方圖片顯示風扇整合在散熱片外罩內。這個排針是為更換散熱方案而設。
- NVIDIA 已查核的頁面並未記載模組的運作溫度範圍或 Tj 上限——那些在 Jetson Orin Nano Series Data Sheet 與 Orin NX/Orin Nano Thermal Design Guide 中，兩者都位於需登入的 Download Center。

## 尺寸

- **模組：**69.6 mm × 45 mm，260 引腳 SO-DIMM 連接器。
- **套件：**兩份官方數據不一致——資料表（2024 年 12 月）寫 **103 mm × 90.5 mm × 34.77 mm**；NVIDIA 的產品家族表寫 **100 mm × 79 mm × 21 mm**。兩者對高度的定義都包含腳座、載板、模組與散熱方案。
- NVIDIA 未公布任何調解說法。一種經銷商的解釋（套件連底座，對比裸載板）**未經驗證**。

> **鉅犀提示：** 設計外殼之前，請先在 NVIDIA 目前的資料表上確認尺寸。

## 資料來源

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（查閱於 2026-09-26）
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（查閱於 2026-09-26）
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（查閱於 2026-09-26）
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)（查閱於 2026-09-26）
- [Jetson Orin Nano Super Developer Kit datasheet (PDF, Dec 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf)（查閱於 2026-09-26）
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html)（查閱於 2026-09-26）
- [Jetson Orin product family — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin)（查閱於 2026-09-26）
- [NVIDIA Developer Forums — "Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)", community thread](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697)（查閱於 2026-09-26）

*狀態：已於 2026-10-11 審核。以上步驟與數值依據所列日期的 NVIDIA 官方文件；尚未由鉅犀科技在實體硬件上驗證。*

**圖片來源：**佈局圖來自 NVIDIA 官方 *Jetson Orin Nano Developer Kit User Guide*（下載於 2026-09-26），版權歸 © NVIDIA Corporation 所有。

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
