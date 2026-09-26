---
title: 從 JetPack 6.x 遷移到 JetPack 7.2.1
sidebar_label: 從 JetPack 6.x 遷移
slug: /migration/jetpack-6-to-7
description: >-
  Jetson Orin Nano Super Developer Kit（8GB）上 JetPack 6.x 與 JetPack 7.2.1
  之間的變化：固件前置條件、Super 模式陷阱、遷移檢查清單，以及回滾。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 從 JetPack 6.x 遷移到 JetPack 7.2.1

本頁供想把 Jetson Orin Nano（Super）開發者套件從 JetPack 6.x 升級到 JetPack 7.2.1 的使用者閱讀。新到手的套件請改從[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)開始。

JetPack 7.2.1 是一次大幅躍進：請預留完整重新刷機、一項固件前置條件，以及部分軟體重新構建的時間。

## 有哪些變化

| 層 | JetPack 6.x 時代 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x（JetPack 6.2.3 = 36.5.2） | **39.2.1** |
| 作業系統／根檔案系統 | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux 核心 | 5.15 | **6.8** |
| CUDA | 12.6（JetPack 6.2.3 = 12.6.10） | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **鉅犀註：** 6.x 欄使用 JetPack 6.2.3——JetPack 6 最後一個正式發行版本。請用 `cat /etc/nv_tegra_release` 確認你自己的版本。
> 7.2.1 的 VPI 值取自 NVIDIA 的套件倉庫，而非其下載頁——下載頁仍顯示 JetPack 7.2 的值。見[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)上的說明。

- **SD 卡映像走入歷史。**「從 JetPack 7.2 起，SD 卡映像已不再支援。」安裝程式是單一 ISO、寫在 USB 隨身碟上；microSD 卡仍是有效的安裝目標。
- **一項固件前置條件。** JetPack 7.2 以後的安裝要求 JetPack 6.x 世代的 Jetson UEFI/QSPI 固件；出廠固件較舊的套件必須先完成 JetPack 6.x 更新路徑。JetPack 7.0 與 7.1 未列出任何 Orin 硬體，因此 7.2 是該系列的首個 7.x 版本。
- **不同的安裝流程。** ISO 從 USB 隨身碟安裝到裝置的 microSD 或 NVMe。它僅供安裝，不是「Live USB」。

## 若有以下情況，請先不要升級……

- **你的機器人依賴 Isaac ROS。** 7.2.1 組件矩陣將 Isaac ROS 標為「即將推出」，但 NVIDIA 員工表示 Isaac ROS 4.6 支援 JetPack 7.2——來源互相矛盾。參見[機器人開發](/zh-hant/tutorials/jetson-orin-nano/robotics)。
- **你的相機程式碼綁定較舊的 SIPL API。** Jetson Linux 39.2.1 中的 SIPL API v2.0.0 帶來「破壞性變更，影響 API、ABI、JSON schema、套件佈局與驅動載入」。一則社群回報（未經 NVIDIA 確認）指出 NITO 相機配置現已成為預設，舊的 `NVCAMERA_NITO_PATH=CONFIG` 模式已不再運作。
- **你無法重新驗證你的軟體堆疊。** CUDA 13 wheels、Python 套件與第三方函式庫都必須有對應 Ubuntu 24.04 與 CUDA 13.2 的版本。NVIDIA 的 7.2.1 頁面未列出任何 Python 或 OpenCV 版本；CUDA 13.2 的 wheels 方面，NVIDIA 員工指向 Jetson AI Lab 的 SBSA 索引——參見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)。

## 無法沿用的內容——規劃重新構建

- **TensorRT 引擎。** TensorRT 從 10.3.0 升至 10.16.2。序列化引擎與 TensorRT 版本綁定。請在目標裝置上重新構建。
- **CUDA 二進位檔。** CUDA 從 12.6 升至 13.2.2，是一次大版本躍進。不要指望 CUDA 12.x 的二進位檔能夠沿用；請以新的工具包重新構建。
- **樹外核心模組。** 核心從 5.15 升至 6.8。請針對新的核心標頭檔重新構建模組。
- **相機驅動與裝置樹。** SIPL 2.0 的 API 與 ABI 變更適用（見上文）。
- **容器。** 為 JetPack 6 / L4T r36 構建的映像留在舊堆疊上；ISO 隨附 NVIDIA Container Toolkit 1.19。NVIDIA 員工表示 Orin Nano 現在可以執行主流的 Arm64「arm64-SBSA」容器。
- **Python 環境。** Ubuntu 24.04 使用的 Python 比 22.04 新。請重新建立虛擬環境；用 `python3 --version` 檢查。

## 遷移檢查清單

1. **先備份。** 安裝會清除你選取的目標儲存裝置。請把以下內容從套件上複製出來：應用程式資料、設定檔案、相機校正、容器磁碟區、TensorRT 構建腳本與 ONNX 模型，以及自訂驅動或裝置樹原始碼。用 `cat /etc/nv_tegra_release` 與 `apt list --installed | grep nvidia-jetpack` 記錄版本。
2. **通過固件門檻。** 開機，在 NVIDIA 開機畫面反覆按 Esc，讀取 UEFI 選單中的固件版本。36.x 或更新的固件已可迎接 7.2.1。若比 36.0 舊，請先完成「JetPack 6.x 更新路徑」：以更新後的 JetPack 5.1.3 SD 卡映像（`JP513-orin-nano-sd-card-image_b29.zip`）作為橋樑開機，讓它排程 bootloader 更新、重新開機、安裝 QSPI 更新程式（`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`），再重新開機一次。預期會經歷多次重新開機；JetPack 6.2.x 可能在首次開機後再排程一次更新。BSP 36.2 / JetPack 5.0 DP 的裝置必須先更新到較新的版本。用 `sudo systemctl status nv-l4t-bootloader-config` 檢查排程，用 `sudo nvbootctrl dump-slots-info` 檢查固件。
3. **製作安裝 USB 隨身碟。** 用 Balena Etcher 將 r39.2.1 的 Jetson ISO 寫入 USB 隨身碟（16 GB 以上）。不要把 ISO 寫入 microSD 卡。請在開機前先裝好目標儲存裝置（microSD 或 NVMe）——安裝程式只會提供已安裝的裝置。
4. **安裝 JetPack 7.2.1。** 透過 UEFI 開機管理程式開機：在開機畫面按 Esc、選擇 Boot Manager、選擇 USB 磁碟（NVIDIA 建議這樣明確選取）。

   > **重要**——在 QSPI capsule 更新提示出現時，於 30 秒內按 **Y**（「最常被錯過的步驟」）。若逾時，安裝稍後會失敗。Capsule 更新會分兩輪執行，且可能讓套件重新開機——這是正常現象。

   在 GRUB 選單中選擇 Install Jetson ISO r39.2.1、選擇目標儲存裝置並確認（安裝會清除你選取的儲存裝置）。安裝完成並出現提示後拔除 USB 隨身碟，接著完成 Ubuntu 初始設定（授權、語言、網路、使用者），並執行 `sudo apt update` 與 `sudo apt install nvidia-jetpack`。
5. **確認 Super 設定檔。** `sudo /usr/sbin/nvpmodel -q` 會列出電源模式；桌面上則可用頂端列：Power Mode → MAXN SUPER。啟用 Super Mode 時，`cat /etc/nv_boot_control.conf` 的 TNSPEC 行會顯示 `-super` 後綴。若這些都不存在，請讀下一節。
6. **重新驗證你的工作負載。** 在目標裝置上重新構建 TensorRT 引擎與 CUDA 應用程式。重新建立 Python 環境、更新容器、重新測試相機。執行[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)上的檢查——對 r39.2.1 而言，`cat /etc/nv_tegra_release` 應顯示 R39、修訂號 2.1。

## Super 模式陷阱（已於 7.2.1 修復）

在 7.2.0 的 ISO 安裝上，裝置保留了既有的板級配置：缺少 25W 與 MAXN SUPER 電源模式，且 `sudo nvpmodel -m 2` 會以「bad power mode 2」失敗。NVIDIA 在 r39.2 發行說明中將此記載為問題 6279443：「裝置在更新後不會預設為『Super』模式。若要使用『Super』模式，你必須使用 Linux 主機或 SDKM 刷寫目標。」NVIDIA 員工後來稱之為 ISO 的 bug，已在 7.2.1 修復。

JetPack 7.2.1 預設即刷寫 Super 配置：「ISO 現在預設以 Super Mode 刷機配置刷寫 Jetson Orin Nano Developer Kit。」問題 6279443 已不在 r39.2.1 的已知問題清單中。

仍有兩點要注意：

- **從主機刷機時要選對目標。** 在 SDK Manager 中，目標是「Jetson Orin Nano [8GB developer kit version]」。使用刷機腳本時，請用 `jetson-orin-nano-devkit-super` 目標（而非一般目標）以啟用 Super 模式。範例（Developer Guide，NVMe）：`sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`。
- **在既有系統上重新安裝 7.2.1。** NVIDIA：「如果你要用 ISO 在已安裝的系統上重新安裝 JetPack 7.2.1，請仔細遵循 Getting Started Guide 中的說明。」NVIDIA 未說明 7.2.1 重新安裝能否讓被 7.2.0 ISO 留在非 Super 狀態的裝置恢復 Super 模式；記載的路徑是用 Super 配置從主機刷機。社群的原地修法（編輯 `/etc/nv_boot_control.conf`）未獲 NVIDIA 認可；一位使用者回報出現開機循環。參見[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。

## 回滾

NVIDIA 員工表示：「降級：是的，如有需要，你可以透過 SDK Manager 刷回 JP 6.2.2。」一位使用者確認了來回流程（刷回 6.2.2，再重新升級到 7.2）。成本如下，我們如實說明：

- **無法原地降級。** 這是從 x86 Ubuntu 主機進行的完整重新刷機（官方頁面列的是 Ubuntu 主機；NVIDIA 員工也回報 Windows 版 SDK Manager 可行）。
- **目標儲存裝置會被清除。** 你的備份是唯一的副本。
- **沒有更多保證。** NVIDIA 未發布降級程序，也沒有文件表示 JetPack 6.x 開機媒體保證能在 r39.2.x 的 QSPI 固件上運作。請把降級視為重新安裝舊堆疊，外加同樣的重新構建工作。

若只是缺少 Super 電源模式，較窄的修法是從主機以 Super 配置重新刷機——這樣可保留 7.x。參見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)。

## 資料來源

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) —— 組件矩陣、SD 卡取消、Super 模式預設、重新安裝注意事項（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) —— ISO 安裝流程、固件門檻、capsule 提示、MAXN SUPER（查閱於 2026-09-26）
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) —— 固件橋接、版本檢查（查閱於 2026-09-26）
- [Jetson Linux 39.2.1 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) —— GA 狀態、SIPL 2.0 破壞性變更（查閱於 2026-09-26）
- [Jetson Linux 39.2 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) —— 問題 6279443、Super 模式陷阱（查閱於 2026-09-26）
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) —— JetPack 6.x 基準版本（查閱於 2026-09-26）
- [NVIDIA 開發者論壇 — JetPack 7.2 GPU 加速問題](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) —— NVIDIA 員工：降級路徑與 CUDA 13.2 wheel 索引（查閱於 2026-09-26）
- [NVIDIA 開發者論壇 — JetPack 7.2 中看不到 25W 與 MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) —— NVIDIA 員工與使用者：`-super` TNSPEC 檢查、主機重新刷機（查閱於 2026-09-26）

*狀態：草稿，待 cheny 審核。內容以所列日期的 NVIDIA 官方文件與開發者論壇發言為依據；尚未由鉅犀科技在實體硬體上驗證。重新構建清單描述的是平台層面的標準後果——請結合你自己的軟體堆疊進行驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
