---
title: 驗證你的系統——版本、Super 模式與電源檢查清單
sidebar_label: 驗證你的系統
slug: /getting-started/verify-your-system
description: >-
  確認你的 Jetson Orin Nano Super Developer Kit 執行 JetPack 7.2.1、
  具備完整元件堆疊、Super Mode 板級配置與正確的電源模式。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# 驗證你的系統

在你的 JetPack 7.2.1 系統首次開機後，請執行這份檢查清單。它會確認 **L4T 版本**、**已安裝的 JetPack 組件**、**Super Mode 板級配置**與**電源模式**。如果系統還沒設定好，請先從 **[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)** 開始。

## 第 1 步 —— 檢查 L4T（BSP）版本

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** 系統會回報 **R39** 與 **REVISION: 2.1**：

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **鉅犀註：** NVIDIA 沒有為這個檔案公布範例輸出。上方區塊是社群在 Orin 裝置上
> 觀察到的 r39.2.1 輸出；你的 `GCID` 與 `DATE` 值會不同。要緊的是
> `REVISION: 2.1`。

如果輸出顯示較舊的版本（例如 JetPack 6.x 的 R36），你的系統就不是在執行 JetPack 7.2.1——請見**[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)**與**[從 JetPack 6 到 7 遷移](/zh-hant/tutorials/jetson-orin-nano/jetpack-6-to-7)**。

## 第 2 步 —— 檢查 JetPack 組件與版本

CUDA、cuDNN、TensorRT 等 JetPack 組件是以 Debian 套件的形式安裝。NVIDIA 官方的清單指令是：

```bash
apt list --installed | grep nvidia-jetpack
```

輸出中必須出現 `nvidia-jetpack` 中繼套件。要抽查單一組件，可直接查詢 `dpkg`——例如用 `dpkg -l | grep cudnn` 查 cuDNN。如果中繼套件不存在，請執行 `sudo apt update` 再執行 `sudo apt install nvidia-jetpack`，出現提示時重新開機。

下表列出 NVIDIA 官方提供的 **JetPack 7.2.1 / Jetson Linux 39.2.1** 組件版本（於 2026-09-26 在 JetPack 下載頁查閱）：

| 組件 | 版本 |
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
| NVIDIA Container Toolkit | 1.19（含 ISO 映像） |
| Isaac ROS | **已推出**——Isaac ROS 4.6.0（2026 年 8 月）新增對 Jetson Orin 與 JetPack 7.2 的支援；NVIDIA 的組件表仍標示「即將推出」 |

> **鉅犀註：** NVIDIA 的 7.2.1 頁面為整個 JetPack 7 系列（Thor 與 Orin 一起）
> 列出一份矩陣，而不是依平台分列。`dpkg` 顯示的版本可能帶有建置後綴——
> 請比對版本號本身，而不是完整字串。NVIDIA 的表未列出 OpenCV、DLA 或
> Python 版本，本頁因此也不列。

> **鉅犀註：** 關於 VPI 版本，NVIDIA 的下載頁尚未為 7.2.1 全面更新——其 VPI 那一列仍顯示 JetPack 7.2 的值（4.1.3）。JetPack 7.2.1 實際隨附 **VPI 4.1.4**，這點已從 NVIDIA 自家的套件倉庫確認：`nvidia-jetpack-runtime (= 7.2.1-b49)` 相依於 `nvidia-vpi (= 7.2.1-b49)`，後者鎖定 `libnvvpi4 (= 4.1.4)`。4.1.3 與 4.1.4 都存在於套件池中，因此只有相依性鎖定具決定性。（核對於 2026-09-26）

## 第 3 步 —— 安裝 jtop 並查看系統活動（可選）

`jtop` 是 **jetson-stats** 的一部分，那是社群專案——不是 NVIDIA 產品。NVIDIA 沒有為這個版本記載它，與 L4T r39 的相容性也未經 NVIDIA 驗證。

請依 [jetson-stats 專案頁面](https://pypi.org/project/jetson-stats/) 上的社群說明安裝。

然後執行 `jtop`——一個互動式系統監控與行程檢視工具。在開始大型 AI 工作負載之前，請留意共用的 8 GB 統一記憶體。官方替代方案是 `sudo tegrastats`（即時顯示 CPU、GPU、記憶體、溫度與功耗相關活動；按 `Ctrl`+`C` 停止）。NVIDIA 的 How-To 頁建議在 Jetson 上以 `tegrastats` 取代 `nvidia-smi` 來監控。

## 第 4 步 —— 檢查 Super 模式板級配置（TNSPEC）

JetPack 7.2.1 的 ISO 安裝預設會刷入 **Super Mode** 配置。請在裝置上確認：

```bash
cat /etc/nv_boot_control.conf
```

在 Super 配置的套件上，`TNSPEC` 那一行會帶有 `-super` 後綴。NVIDIA 員工貼出的範例：

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

在非 Super 的套件上，同一行結尾不會有 `-super`——例如一名使用者回報的受影響系統：`TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **鉅犀註：** TNSPEC 字串中段的字元因裝置與固件狀態而異。要緊的是 TNSPEC
> 那一行結尾的 `-super` 後綴。

發行說明問題 **6480645**：ISO 安裝之後，UEFI 變數 `TegraPlatformSpec` 可能無法準確反映板級規格。NVIDIA 表示，請讀取 `/etc/nv_boot_control.conf` 中的 `TNSPEC` 條目以取得正確的板級資訊。

## 第 5 步 —— 檢查電源模式

預設電源模式通常是 **25W**。在桌面上：點擊 Ubuntu 頂端列的電源模式，選擇 **Power Mode**，再選 **MAXN SUPER**。在命令列上，印出使用中的模式及其模式 ID：

```bash
sudo /usr/sbin/nvpmodel -q
```

要切換模式，請使用查詢顯示的 ID（`sudo /usr/sbin/nvpmodel -m <mode_id>`）。如何分辨 Super 與非 Super：

| | Super 配置 | 非 Super 配置 |
|---|---|---|
| 可用模式 | 15W、25W、**MAXN SUPER** | 僅 7W、15W |
| 模式 ID（社群觀察） | 0 = 15W、1 = 25W、2 = MAXN_SUPER；預設 25W | 0 = 15W、1 = 7W |
| `sudo nvpmodel -m 2` | 選取 MAXN SUPER | 失敗：`NVPM ERROR: request for bad power mode 2` |

> **鉅犀提示：** 模式 ID 來自一份社群對 7.2 系統上設定檔的回報；桌面電源選單
> 會直接列出可用模式。GPU 使用過後，切換電源模式可能會要求重新開機——
> NVIDIA 員工說這個提示是正常的。

## 如果只出現 7W 和 15W

這是 JetPack 7.2 的已知問題，已在 7.2.1 從設計上修正。

- 在 **JetPack 7.2（L4T 39.2）** 上，已知問題 **6279443** 指出，透過 ISO 安裝程式更新的裝置「不會預設為『Super』模式」；NVIDIA 當時的指引是用 Linux 主機或 SDK Manager 刷寫目標。
- **JetPack 7.2.1** 改變了這一點：「ISO 現在會預設以 Super Mode 刷機配置刷寫 Jetson Orin Nano Developer Kit。」問題 6279443 不在 7.2.1 的已知問題清單中，且 NVIDIA 員工表示：「這會在 jp7.2.1 修正。」

全新的 7.2.1 ISO 安裝應該會顯示 25W 與 MAXN SUPER。如果你的套件沒有：

1. 若是用 7.2 ISO 安裝的系統，請從 Linux 主機或 SDK Manager 以 Super 配置重新刷機——見**[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)**。
2. NVIDIA 未說明用 7.2.1 ISO 重新安裝是否能轉換原本以 7.2 ISO 安裝的板子。若 Super 模式仍然缺失，請使用**[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**中的重新刷機選項。

同一個問題也收錄在**[常見問題 FAQ](/zh-hant/tutorials/jetson-orin-nano/faq)**中。

## 什麼才叫正常

| 檢查 | 指令 | 正確的系統會顯示 |
|---|---|---|
| L4T 版本 | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| JetPack 套件 | `apt list --installed \| grep nvidia-jetpack` | 已安裝的 JetPack 套件，包括 `nvidia-jetpack` 中繼套件 |
| cuDNN 抽查 | `dpkg -l \| grep cudnn` | 版本 9.20.0 |
| 板級配置 | `cat /etc/nv_boot_control.conf` | `TNSPEC` 行以 `jetson-orin-nano-devkit-super-` 結尾 |
| 電源模式 | `sudo /usr/sbin/nvpmodel -q` | 使用中的模式預設為 25W；15W、25W 與 MAXN SUPER 可選 |

## 如果還是有問題

缺少組件：重新執行第 2 步的兩條指令。Super 配置或電源模式問題：見**[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)**與**[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)**。求助之前，請先收集 `cat /etc/nv_tegra_release` 與 `cat /etc/nv_boot_control.conf`——NVIDIA 員工在做任何設定檔變通之前會要求這些狀態（外加 `sudo /usr/sbin/nvpmodel -q --verbose`）。鉅犀支援：**support@juxitech.com**，請附上你的訂單編號。

## 資料來源

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)——Jetson Orin Nano Developer Kit User Guide（查閱於 2026-09-26）
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（查閱於 2026-09-26）
- [NVIDIA forum——25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [continuing power-mode issues](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode not unlocking](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)（查閱於 2026-09-26；含 NVIDIA 員工回覆）
- [jetson-stats (jtop) on PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/)（查閱於 2026-09-26；jtop 安裝的社群來源）

*狀態：已於 2026-10-11 審核。內容以所列日期的 NVIDIA 官方文件與 NVIDIA 論壇來源為依據；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
