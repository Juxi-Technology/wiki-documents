---
title: 驗證你的系統——版本與元件清單
sidebar_label: 驗證你的系統
slug: /getting-started/verify-your-system
description: >-
  確認你的 Jetson AGX Orin 開發套件執行 JetPack 7.2.1
  與完整元件堆疊——附版本檢查指令與預期元件清單。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: still lists Isaac ROS as "coming soon"; see the note under Step 3
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# 驗證你的系統

安裝或更新好你的套件之後，請確認兩件事：**BSP 版本**與**已安裝的 JetPack 元件堆疊**。這兩項檢查都花不到一分鐘。

## 第 1 步 —— 檢查 L4T（BSP）版本

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** 系統會輸出：

```
# R39 (release), REVISION: 2.1, ...
```

如果輸出顯示較舊的版本（例如 R35），請先更新 BSP——參見 **[刷機與更新](/zh-hant/tutorials/jetson-agx-orin/flashing-and-updates)**。

## 第 2 步 —— 檢查 JetPack 元件

JetPack 元件（CUDA、cuDNN、TensorRT……）以 Debian 套件的形式安裝。請檢查中繼套件是否存在：

```bash
dpkg -l | grep -i nvidia-jetpack
```

並確認 CUDA Toolkit 是否可用：

```bash
nvcc --version
```

本版本的預期輸出為：**CUDA 13.2**。如果 `nvcc` 缺失或中繼套件不存在，請用以下指令安裝元件：

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

（視連線速度而定，這個過程大約需要一小時——參見[快速開始 → 第 3 步](/zh-hant/tutorials/jetson-agx-orin/quick-start)。）

## 第 3 步 —— JetPack 7.2.1 的預期版本

下表列出 **JetPack 7.2.1 / Jetson Linux 39.2.1** 實際安裝的內容，於 2026-09-26 經由 [NVIDIA Jetson apt 套件倉庫](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)中 `nvidia-jetpack` 7.2.1 的相依性鏈核對：

| 元件 | 版本 |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| 作業系統 | Ubuntu 24.04 (L4T) |
| 核心 | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI（電腦視覺） | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19（含 ISO 鏡像） |
| Isaac ROS | *JetPack 頁面仍顯示「即將推出」*——獨立發布，詳見下方說明 |

> **鉅犀註：** `dpkg` 顯示的套件版本可能帶有建置或修訂後綴（例如 `13.2.2-1`，L4T 套件則如 `7.2.1-b49`），這是正常現象——請比對版本號本身，而不是後綴。
>
> **JetPack 下載頁滯後之處（2026-09-26 核對）：** 該頁的摘要表仍顯示 CUDA **13.2.1** 與 VPI **4.1.3**——那是 JetPack **7.2** 的數值。`nvidia-jetpack` 7.2.1 實際安裝的是 CUDA **13.2.2**（建置編號 13.2.86）與 VPI **4.1.4**。以上方的 apt 套件倉庫為準。
>
> **Isaac ROS（2026-09-26 重新核對）：** JetPack 下載頁仍顯示「即將推出」，但 Isaac ROS 自 **4.6.0** 版（2026-08-18）起即支援 JetPack 7.2 上的 Jetson Orin。Isaac ROS 獨立於 JetPack 發布，因此應以其自身的發行說明為準。機器人領域的使用者：在規劃依賴 Isaac ROS 的工作之前，請先閱讀 [機器人(現狀)](/zh-hant/tutorials/jetson-agx-orin/robotics)。

## 可選 —— 快速查看系統活動

`tegrastats`（Jetson Linux 內附）會即時顯示 CPU/GPU/記憶體使用量：

```bash
tegrastats
```

按 `Ctrl`+`C` 停止。

## 如果有元件缺失

1. 重新執行 `sudo apt update && sudo apt install nvidia-jetpack`。
2. 確認安裝流程中的 `apt dist-upgrade` + 重新開機已完成（參見[快速開始 → 第 3 步](/zh-hant/tutorials/jetson-agx-orin/quick-start)）。
3. 檢查磁碟空間（`df -h`）與網路連線。
4. 還是沒解決？參見**[故障排除](/zh-hant/tutorials/jetson-agx-orin/troubleshooting)**。

## 參考資料

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html)（於 2026-09-23 核對）
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads)（於 2026-09-23 核對）

*狀態：已於 2026-10-11 審核。內容依據截至所列日期的 NVIDIA 官方文件；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁由鉅犀科技發布，並非 NVIDIA 官方出版物。
