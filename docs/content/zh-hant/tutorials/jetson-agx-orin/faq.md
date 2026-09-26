---
title: 常見問題 FAQ
sidebar_label: 常見問題 FAQ
slug: /support/faq
description: >-
  關於 NVIDIA Jetson AGX Orin 開發者套件（64GB）的常見問題——包裝內容、設定、
  顯示與電源、軟體，以及支援服務。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# 常見問題 FAQ

## 設定

**包裝內容有什麼？**
Jetson AGX Orin 模組與參考載板、Wi-Fi 模組、USB Type-C 電源供應器，以及一條
USB Type-C 轉 USB Type-A 連接線。顯示器（DisplayPort）、鍵盤與滑鼠需自備，
另可選配網路線——參見[快速開始](/zh-hant/tutorials/jetson-agx-orin/quick-start)。

**套件隨附作業系統嗎？**
是的——eMMC 已預先燒錄，開箱即可開機進入 Ubuntu 桌面。出貨的裝置可能搭載較舊
的 L4T 版本；推薦的更新方式是 Jetson ISO（無需主機 PC）。參見
[快速開始](/zh-hant/tutorials/jetson-agx-orin/quick-start)。

**需要另一台電腦才能完成設定嗎？**
不需要，推薦的流程不需要——Jetson ISO 從 USB 隨身碟安裝。只有在採用其他安裝
方式（SDK Manager / 燒錄腳本）或無頭模式的首次設定時，才需要一台主機 PC
（Ubuntu）。參見[刷機與更新](/zh-hant/tutorials/jetson-agx-orin/flashing-and-updates)。

**目前是哪個軟體版本？**
JetPack **7.2.1**（Jetson Linux **39.2.1**、Ubuntu 24.04、CUDA 13.2.2、
TensorRT 10.16.2）。用[驗證你的系統](/zh-hant/tutorials/jetson-agx-orin/verify-your-system)
查看你的套件實際運行的版本。

## 顯示與電源

**可以連接我的 HDMI 顯示器嗎？**
只能透過**主動式** DisplayPort→HDMI 轉接器或轉接線——套件只有 DisplayPort
輸出（沒有 HDMI 接口，也不能透過 USB-C 輸出 DisplayPort）。支援 MST，最多可
連接兩台顯示器。詳見[接口與硬件佈局](/zh-hant/tutorials/jetson-agx-orin/interfaces)。

**如何為套件供電？**
使用隨附的 USB-C 電源供應器，接在 DC 插孔上方（J24）的 USB-C 接口。如果你
透過桶形插孔（J41）自備電源：外徑 5.5 mm、內徑 2.5 mm、內正極。

## 使用套件

**這套開發者套件能模擬其他 Jetson 模組嗎？**
可以。開發者套件與所有 Jetson Orin 模組共享同一種 SoC 架構，重新刷機即可模擬
AGX Orin、Orin NX 或 Orin Nano 的效能與功耗特性。出廠時預設配置為 AGX Orin
系列。

**量產產品會用到這個模組嗎？**
不會。量產產品建構在 Jetson Orin **模組**（64 GB / 32 GB / 工業版）之上，搭載
在你自研或合作夥伴提供的載板上。開發者套件是開發與原型驗證的載具。

**能運行大型語言模型 / 智能體 AI 嗎？**
可以——這是 Orin 平台的核心應用場景之一。在 JetPack 7.2 上，開發者套件可用
一條命令安裝 NVIDIA NemoClaw，用於本地與雲端的模型編排；[Jetson AI Lab](https://www.jetson-ai-lab.com)
則發布動手教程。

**機器人方面：JetPack 7.2 上能用 Isaac ROS 嗎？**
可以——Isaac ROS 自 **4.6.0** 版（2026-08-18）起即支援 JetPack 7.2 上的 Jetson
Orin，並有官方的 AGX Orin 設定逐步教學。請注意，NVIDIA 的 JetPack 下載頁面仍
顯示「即將推出」：Isaac ROS 獨立於 JetPack 發布，因此應以其自身的發行說明為
準。關於版本與 ROS 2 發行版選擇（4.6.x = Jazzy、5.0 = Lyrical）以及已知限制，
請參閱[機器人(現狀)](/zh-hant/tutorials/jetson-agx-orin/robotics)。

## 支援與服務

**我可以從哪裡獲得技術支援？**
- 平台問題：[NVIDIA Jetson 開發者論壇](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)——請先搜尋；提問時請附上 `cat /etc/nv_tegra_release` 的輸出。
- 鉅犀科技技術支援：**support@juxitech.com**
- 訂單、保固與 RMA：**support@juxitech.com**（為加快處理，請附上訂單編號）
- 銷售與報價：**sales@juxitech.com**
- 產品問題（選型、相容性）：**pe@juxitech.com**

**哪裡可以購買配件（NVMe 儲存、攝像頭、電源）？**
瀏覽鉅犀科技的產品目錄：**<https://wiki.juxitech.com/products/>**——
其中包含與 Jetson 相關的配件，例如
[IMX219 CSI 攝像頭](https://wiki.juxitech.com/products/imx219-csi-camera)
（專為 NVIDIA Jetson 打造）、USB 自動對焦攝像頭，以及
[RealSense 深度相機](https://wiki.juxitech.com/products/realsense-depth-camera)。
如需選購建議，請聯絡 sales@juxitech.com。

## 來源

- Jetson AGX Orin 開發者套件用戶指南——[簡介](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)、[快速開始](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)（查核於 2026-09-23）
- [JetPack SDK 下載](https://developer.nvidia.com/embedded/jetpack/downloads)（查核於 2026-09-23）

*狀態：草稿，待 cheny 審核。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非
NVIDIA 官方出版物。
