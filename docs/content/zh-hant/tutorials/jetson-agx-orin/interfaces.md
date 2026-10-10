---
title: 接口與硬件佈局
sidebar_label: 接口與硬件佈局
slug: /product/interfaces
description: >-
  NVIDIA Jetson AGX Orin 開發者套件的標註佈局與連接器參考——按鍵、接口、載板連接器、顯示與儲存選項、
  40 引腳排針與自動化排針。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# 接口與硬件佈局

開發者套件有兩套參考體系:NVIDIA 官方指南和本頁使用的**側視圖編號標籤(0–12)**,以及印在 PCB 上的**載板連接器編號(J 編號)**。兩套編號都請隨時對照——我們其餘的指南都會引用它們。

## 側視圖——標註部件

![開發者套件,按鍵與 DC 輸入視角](/images/jetson-agx-orin/jaodk_labeled_01.png)
![開發者套件,PCIe 蓋板與 40 引腳視角](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | 部件 | 說明 |
|---|---|---|
| 0 | 白色 LED | 電源指示燈 |
| 1 | Power 按鍵 | |
| 2 | Force Recovery 按鍵 | 用於 Recovery / 燒錄模式 |
| 3 | Reset 按鍵 | |
| 4 | USB Type-C 接口 | 僅 DFP(連接外設) |
| 5 | DC 電源插孔 | 桶形插孔——規格見 J41 |
| 6 | 乙太網接口 | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | DisplayPort 輸出 | **套件上唯一的顯示接口** |
| 9 | USB micro-B 接口 | 用於調試 |
| 10 | USB Type-C 接口 | 燒錄與數據(UFP 和 DFP) |
| 11 | 40 引腳連接器 | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## 載板——連接器

| 標記 | 連接器 | 規格 / 說明 |
|---|---|---|
| DS2 | 白色 LED | |
| S1 / S2 / S3 | Power / Reset / Force Recovery 按鍵 | |
| J24 | USB Type-C(DC 插孔上方) | 僅 DFP,USB 3.2 Gen 2——**隨附的 USB-C 電源適配器就接在這裏** |
| J41 | DC 電源插孔 | 外徑 5.5 mm,內徑 2.5 mm,內正極 |
| J17 | 乙太網 | 最高 10GBASE-T |
| J33 | USB Type-A ×2(乙太網接口旁) | USB 3.2 Gen 2 |
| J18 | DisplayPort 輸出 | 支援 MST |
| J26 | USB micro-B | 調試 UART |
| J40 | USB Type-C(40 引腳排針旁) | UFP 和 DFP——**配合 SDK Manager 連接主機 PC 時所用的接口** |
| J30 | 40 引腳連接器 | PCB 上 Pin 1 以白色三角形標示 |
| J42 | 自動化排針 | 自動開機、LAN 喚醒、降頻觸發(引腳見下) |
| J13 | RTC 備份電池連接器 | |
| J509 | 攝像頭連接器 | |
| J502 | JTAG 調試連接器 | |
| J505 | M.2 E-Key 插槽 | 通常安裝 Wi-Fi 模組 |
| J511 | HD Audio 排針 | |
| J1 | M.2 M-Key 插槽 | 用於安裝 NVMe SSD |
| J10 | microSD 卡槽 | UHS-1 |
| J3 | Jetson 模組連接器 | 699 引腳 |
| J6 | PCIe x16 連接器 | 電氣上為 PCIe 4.0 ×8 |
| J9 | 風扇連接器 | 4 引腳,1.25 mm 間距 |

> **大家最先問的三個問題:**
> - **顯示:**DisplayPort(J18)是*唯一*的顯示輸出——沒有 HDMI 接口,也不能透過 USB-C 輸出 DisplayPort。要接 HDMI 顯示器,請使用主動式 DP→HDMI 轉接器或轉接線。
> - **供電:**隨附的 USB-C 電源適配器接在 **J24**(DC 插孔上方的 USB-C 接口)。如果你自備電源,也可以使用獨立的桶形插孔輸入(J41)。
> - **連接主機 PC:**使用 SDK Manager 或串口控制台時,請用 **J40**(40 引腳排針旁的 USB-C 接口)——不是 J24。

## DisplayPort 輸出

- 支援 DP SST、DP MST(最多 2 台外接顯示器)與 DP DSC
- 最大解像度:8K@30 / 4K@120(無論是否啟用 DSC)
- 輸出格式:RGB 8/10 bpc、YUV444 8/10 bpc

## 儲存選項

- **預設:**模組上的 eMMC 快閃記憶體
- **選配:**NVMe SSD(M.2 M-Key,J1)· microSD 卡(J10,UHS-1)· USB 儲存裝置

Jetson ISO 安裝程式可將系統安裝至 eMMC 或 NVMe;SDK Manager 則可將基礎 L4T BSP 燒錄至任一受支援的儲存媒體。

## 40 引腳排針(J30)

![40 引腳排針引腳定義](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*40 引腳排針引腳定義——來自 NVIDIA 載板規格書。*

![40 引腳排針上的 Pin 1 標記](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*PCB 上 Pin 1 以白色三角形標示。*

## 自動化排針(J42)

用於生產與自動化接線:

- Pin 1、12:GND
- Pin 2、3、4:輸入,功能與 Recovery、Reset 和 Power 按鍵相同
- Pin 5–6:斷開 = 停用自動開機;短接 = 啟用自動開機
- Pin 7:CVB_STBY 輸出——指示模組是否處於休眠狀態
- Pin 8:SYSTEM_OC 輸入——觸發 Tegra 降頻
- Pin 9–10:斷開 = 停用在關機狀態下透過 LAN 喚醒/開機;短接 = 啟用
- Pin 11:JTAG_TRST——JTAG 測試復位

## 參考資料

- [硬件佈局——Jetson AGX Orin 開發者套件用戶指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)(已於 2026-09-23 確認)
- 載板相關細節請參閱 *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification*(連結見 NVIDIA 的[下載頁面](https://developer.nvidia.com/embedded/downloads))

*狀態:已於 2026-10-11 審核。以上步驟與數值依據所列日期的 NVIDIA 官方文件;尚未由鉅犀科技在實體硬件上驗證。*

**圖片來源:**佈局圖與引腳圖來自 NVIDIA 官方 *Jetson AGX Orin Developer Kit User Guide* 與 *Carrier Board Specification*(下載於 2026-09-23),版權歸 © NVIDIA Corporation 所有。

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發佈,並非 NVIDIA 官方出版物。
