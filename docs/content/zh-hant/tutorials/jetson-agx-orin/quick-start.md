---
title: 快速開始——從開箱到可用的 JetPack 7.2.1 系統
sidebar_label: 快速開始
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson AGX Orin 開發套件（64GB）完整操作流程——首次開機、用 Jetson ISO
  方式將 BSP 更新到 JetPack 7.2.1（L4T r39.2.1），以及安裝 JetPack 組件。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# 快速開始

本頁將帶你把 Jetson AGX Orin 開發套件（64GB）從開箱一路完成到全數更新的 **JetPack 7.2.1** 系統。以下流程遵循 NVIDIA 推薦的現行設定步驟；每個步驟都已對照 NVIDIA 官方開發套件文件驗證，驗證日期見本頁底部。

**三步流程：**

1. **開箱直接開機**，並完成 Ubuntu 初始設定（`oem-config`）。
2. 用 **Jetson ISO** 方式將 BSP **更新**到 L4T r39.2.1（JetPack 7.2.1）——只需一支可開機 USB 隨身碟，無需 Ubuntu 主機 PC。
3. 用一條 `apt` 命令**安裝 JetPack 組件**（CUDA、cuDNN、TensorRT……）。

> **為何改用 USB ISO 更新，而不是 SDK Manager？**
> NVIDIA 現在推薦對開發套件使用 Jetson ISO 方式：它直接從 USB 隨身碟更新板卡，**不需要**另一台 Ubuntu 主機。SDK Manager 仍可作為備選（見第 3b 步）。

## 準備工作

套件內附：

- Jetson AGX Orin 模組與參考載板
- Wi-Fi 模組
- USB Type-C 電源適配器
- USB Type-C 轉 USB Type-A 數據線

你需要自備：

- 一台帶 DisplayPort 輸入的顯示器與一條 DisplayPort 線，外加 USB 鍵盤和滑鼠——**或者**另一台電腦（Windows/Mac/Linux），如果你更偏好無頭安裝
- 網路連線（網路線，或在設定過程中配置好的 Wi-Fi）
- 一支容量足以裝下 ISO 鏡像的 USB 隨身碟（到了下載頁記得查看標示的大小）——第 2 步的 ISO 更新需要用到
- 一台用於寫入安裝 USB 隨身碟的 PC（Balena Etcher 可在 Windows/Mac/Linux 上執行）

## 第 1 步 —— 首次開機與 Ubuntu 初始設定

你的開發套件出廠時已在 eMMC 上預刷 L4T BSP 鏡像，開箱即可開機進入 Ubuntu 桌面。新出廠的設備可能搭載**較舊**的 L4T 版本（例如 r35.x / JetPack 5.x）；第 2 步可將任何一台設備升級到目前版本。

連接顯示器時：

1. 連接 DisplayPort 顯示器、USB 鍵盤和滑鼠，並（可選）接上網路線。
2. 將隨附的電源適配器接到 **DC 電源插孔上方的 USB Type-C 接口**。套件會自動開機——電源鍵附近的白色 LED 會亮起。如果沒有，請按一下電源鍵。
3. 約一分鐘內會出現 Ubuntu 畫面。首次開機會引導你完成 `oem-config`：接受 NVIDIA 軟體最終使用者授權合約（EULA）、選擇語言/鍵盤/時區、建立你的使用者帳號，以及配置網路。
4. `oem-config` 完成後，套件會重啟進入 Ubuntu 桌面。

![初始設定完成後的 Ubuntu 桌面](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

無頭安裝也可以從另一台電腦進行——具體接線方式見 NVIDIA 的快速開始指南（連結見本頁底部）。

> **鉅犀提示：** 如果你打算從 NVMe SSD 執行系統，請在第 2 步留意這一點——ISO 安裝程式可以直接安裝到 NVMe 磁碟。

## 第 2 步 —— 用 Jetson ISO 更新 BSP（推薦）

**前提條件：** 已安裝的 BSP 必須為 **L4T r35.5 或更新版本**，ISO 方式才能運作。請先檢查：

```bash
cat /etc/nv_tegra_release
```

JetPack 7.2.1 系統會回報 `# R39 (release), REVISION: 2.1`。如果輸出顯示的是較舊版本，請先更新到 L4T r35.5 或更新版本（見下方*注意事項*）。

1. **下載 Jetson ISO**（對應 JetPack 7.2.1 / L4T r39.2.1）：
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **製作安裝 USB 隨身碟。** 用 [Balena Etcher](https://etcher.balena.io) 將 ISO 寫入 USB 隨身碟（「Flash from file」→ 選擇 ISO → 選擇 USB 隨身碟）。
   > **不要**直接用檔案管理器把 ISO 檔案複製到隨身碟——
   > 必須以磁碟鏡像方式寫入，否則無法開機。
3. **插入 USB 隨身碟**到開發套件並開機。如果它沒有自動從 USB 開機，請在開機期間打開 UEFI 開機管理員並選擇該 USB 隨身碟。
4. **開機並安裝：**
   - 如果系統提示你確認 **QSPI capsule 更新**，請按 `Y`。此固件更新會在 ISO 安裝*之前*執行，且會執行**兩次**。不要跳過——它是相容性所必需的。如果錯過了提示，請重新開始安裝，並在再次提示時確認。
   - 在 GRUB 選單中，選擇 **Install Jetson ISO r39.2.1**，然後按 Enter 鍵。
   - 用方向鍵選擇儲存目標：**eMMC**（預設內建儲存）或 **NVMe**（如果你加裝了 SSD，推薦選它）。
   - 安裝大約需要 15 分鐘，畫面上會持續捲動文字輸出。
5. 安裝完成且系統重啟後，**拔下 USB 隨身碟**——否則套件可能再次從隨身碟開機，而不是從新系統開機。
6. 更新後的系統會啟動首次開機 `oem-config`——再次完成 Ubuntu 設定，為這次新安裝建立使用者帳號。

### 你會看到什麼（依序）

![用 Balena Etcher 將 ISO 寫入 USB 隨身碟](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*用 Balena Etcher 將 Jetson ISO 寫入 USB 隨身碟。*

![UEFI 開機管理員中已選中 USB 隨身碟](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*如果套件沒有自動從 USB 隨身碟開機，請在 UEFI 開機管理員中選擇它。*

![QSPI capsule 更新確認提示](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*QSPI capsule 更新提示——按 `Y`。它是相容性所必需的，且會執行兩次。*

![Jetson ISO 的 GRUB 選單](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*選擇「Install Jetson ISO r39.2.1」。*

![GRUB 選單中的儲存目標選項](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*選擇 eMMC 或 NVMe 作為安裝目標。*

![安裝程式進度畫面](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*安裝程式大約執行 15 分鐘。*

![更新後的 oem-config 歡迎畫面](/images/jetson-agx-orin/oem-config_welcome.png)
*更新完成後，`oem-config` 會再次執行，以設定新系統。*

### 注意事項與已知問題

- **較舊的設備（< L4T r35.5）：** Jetson ISO 方式要求已安裝的 BSP 為 r35.5 或更新版本。若要先把較舊的套件升級上來，請使用主機 PC 方式之一（SDK Manager 或 `flash.sh` 腳本）——見[刷機與更新](/zh-hant/tutorials/jetson-agx-orin/flashing-and-updates)。
- **錯過了 QSPI capsule 提示？** 重新開始 ISO 安裝並按 `Y`。
- **安裝期間黑屏：** 部分 KVM 切換器在 ISO 安裝期間對 AGX Orin 的視頻輸出處理不佳。請將顯示器直連開發套件後重試。

## 第 3 步 —— 安裝 JetPack 組件

### 3a. 用 `apt` 安裝（最簡單 —— 無需主機 PC）

在套件的桌面上打開終端（`Ctrl`+`Alt`+`T`），然後執行：

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

這會安裝 CUDA、cuDNN、TensorRT 以及 JetPack 堆疊的其餘部分。視連線速度而定，預計需要**約一個小時**。

驗證結果：`cat /etc/nv_tegra_release` 應回報 R39 / REVISION 2.1，且 CUDA 工具包會變得可用（`nvcc --version`）。完整檢查清單見[驗證你的系統](/zh-hant/tutorials/jetson-agx-orin/verify-your-system)。

### 3b. 用 SDK Manager 安裝（備選）

SDK Manager 會從主機 PC 透過 USB 安裝 JetPack 組件：

1. 在套件開機的狀態下，用隨附的 USB Type-C 轉 Type-A 線把它連接到主機 PC，線要插在套件上 **40 引腳連接器旁邊的 USB Type-C 接口**。
2. 在 SDK Manager 中選擇 Jetson AGX Orin 目標，並選取 **Jetson SDK Components**（而不是再次燒錄「Jetson OS」），然後依照畫面指示操作（USB 連線、地址 `192.168.55.1`）。

完整的 SDK Manager 說明由 NVIDIA 維護（見下方連結），我們的刷機指南也會深入介紹。

## 快速排錯

| 現象 | 首先檢查 |
|---|---|
| 套件無法開機 | 電源適配器已插在 **DC 電源插孔上方**的 USB-C 接口；按一下電源鍵 |
| 沒有顯示輸出 | 檢查 DisplayPort 線（HDMI 顯示器需使用主動式 DP→HDMI 轉接器）；嘗試在不插 ISO USB 隨身碟的情況下開機 |
| ISO 安裝程式未啟動 | 確認隨身碟是用 Etcher 寫入的（不是直接複製檔案）；在 UEFI 開機管理員中選擇該隨身碟 |
| 出現 QSPI 提示 | 按 `Y`——必需；更新會執行兩次 |
| 安裝中途黑屏 | KVM 切換器干擾——將顯示器直連套件 |

## 來源與驗證

本頁由鉅犀科技對照 NVIDIA 官方文件撰寫並驗證：

- [Jetson AGX Orin 開發套件使用者指南——快速開始](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)（已於 2026-09-23 驗證）
- [Jetson AGX Orin 開發套件使用者指南——JetPack SDK 設定](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html)（已於 2026-09-23 驗證）
- [BSP 安裝（SDK Manager / 刷機腳本）](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*狀態：草稿。這些步驟尚未經鉅犀科技在實體硬體上驗證；內容以所列日期的 NVIDIA 官方文件為依據。*

**圖片來源：** 本頁所有截圖均來自 NVIDIA 官方 *Jetson AGX Orin Developer Kit User Guide*（下載於 2026-09-23），版權歸 © NVIDIA Corporation 所有。此處轉載用於說明官方設定流程。

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商標。本指南由鉅犀科技發布，並非 NVIDIA 官方出版物。
