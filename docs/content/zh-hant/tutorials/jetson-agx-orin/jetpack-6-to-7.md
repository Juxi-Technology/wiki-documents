---
title: 從 JetPack 6.x 遷移到 JetPack 7.2
sidebar_label: 從 JetPack 6.x 遷移
slug: /migration/jetpack-6-to-7
description: >-
  Jetson AGX Orin 開發者套件上 JetPack 6.x 與 JetPack 7.2.1 之間的變化、需要重新構建的內容，以及推薦的遷移順序。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# 從 JetPack 6.x 遷移到 JetPack 7.2

本頁面面向已在 AGX Orin 開發者套件上使用 JetPack 6.x 的使用者。
新到手的套件請改從[快速開始](/zh-hant/tutorials/jetson-agx-orin/quick-start)開始。

## 有哪些變化

| 層級 | JetPack 6.x 時代 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x（6.2 使用 36.4.x） | **39.2.1** |
| 作業系統 / 根檔案系統 | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux 核心 | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x（6.x 時代） | **10.16.2** |

> JetPack 6.x 一欄的數值僅為示意（JetPack 6.2 時代）。規劃前請先用
> `cat /etc/nv_tegra_release` 確認**你**目前的確切版本，各版本的
> 詳細說明請參閱 NVIDIA 的
> [JetPack 存檔](https://developer.nvidia.com/embedded/jetpack-archive)。

## 7.2 系列中 Orin 有哪些新變化

摘自 Jetson Linux 39.2 發行說明：

- **Jetson Orin 系列加入 JetPack 7** 軟件產品線（與 Thor 同代）。
- **統一 ISO 安裝**——USB 隨身碟安裝路徑，無需主機 PC。
- 面向智能體 AI 工作流的 **NemoClaw** 單命令安裝。
- 面向自訂生產映像的官方 **Yocto/OpenEmbedded 配方**（OE4T）。
- 攝像頭堆疊：**SIPL API v2.0**（GMSL 與 CoE）——請注意本版本有 **ABI 變更**：為 JetPack 7.1 構建的 UDDF 驅動必須針對 JetPack 7.2 頭文件重新構建。
- *（AGX Orin 32GB Super Mode / MAXN_SUPER 為 32GB 機型專屬，不適用於 64GB 套件。SBSA 與 MIG 的變更與 Jetson Thor 相關。）*

## 無法沿用的內容——規劃重新構建

- **樹外核心模組**——核心已升級至 6.8；模組必須針對新的頭文件重新構建。
- **攝像頭驅動與裝置樹客製化**——需針對 39.2 重新構建；SIPL 2.0 也帶來了 UDDF 驅動的 ABI 變更。
- **TensorRT 引擎**——序列化引擎與 TensorRT 版本綁定；需在目標裝置上以 TensorRT 10.16.2 重新構建。
- **CUDA 二進制檔**——需以 CUDA 13 重新構建；不要指望 12.x 的二進制檔能夠直接沿用。
- **容器**——切換到相容 JetPack 7 的映像（例如更新後的 NGC 容器）。
- **Python 環境與系統服務**——需針對 Ubuntu 24.04 重建（套件名稱、軟件源與解釋器版本均已變更）。

## 推薦的遷移順序

1. 在*清空任何內容之前*，先**確認你的軟件堆疊在 7.2.1 上受支援**——逐一核對你依賴的每個組件，對照 NVIDIA 的 [JetPack 7.2.1 組件清單](https://developer.nvidia.com/embedded/jetpack/downloads)。該頁面對獨立發布的 SDK 可能滯後：Isaac ROS 仍標示為「即將推出」，但 Isaac ROS 4.6.0 已新增對 Jetson Orin + JetPack 7.2 的支援（參見[機器人(現狀)](/zh-hant/tutorials/jetson-agx-orin/robotics)）。
2. **備份：**應用資料、傳感器標定檔案、容器卷、裝置樹原始碼、TensorRT 構建腳本/ONNX 模型。
3. **刷寫 JetPack 7.2.1**（[刷機與更新](/zh-hant/tutorials/jetson-agx-orin/flashing-and-updates)），並驗證：開機、儲存、網路，以及 Force Recovery 模式仍然可用。
4. **恢復外設：**Wi-Fi、攝像頭、CAN 或現場總線驅動——均針對核心 6.8 重新構建。
5. **在目標裝置上重新構建** CUDA 應用、TensorRT 外掛程式與 TensorRT 引擎。
6. **先在應用原有的電源模式下完成驗證**；確認無誤後再嘗試其他效能模式。
7. **記錄基準數據：**記憶體使用量、溫度、功耗、延遲、吞吐量——在轉入生產之前完成。

## 回滾

- 清空之前，請為目前的系統保留一份**確認可用的副本**（一張備用的 NVMe/eMMC 映像，或至少保留第 2 步中的資料）。
- ISO 安裝程式可以安裝你手上持有安裝媒體的任何 L4T 版本——如果可能需要回退，請保留舊版安裝 USB 隨身碟。
- 面向批量裝置：分階段推進，並優先採用帶獨立恢復路徑（恢復 USB 隨身碟 + 備份映像）的方案，而不是原地升級。

## 資料來源

- [Jetson Linux 39.2.0 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)——*What's New*、已知問題（已於 2026-09-23 確認）
- [JetPack SDK 下載](https://developer.nvidia.com/embedded/jetpack/downloads)（已於 2026-09-23 確認）——⚠️ 其組件表部分行滯後；7.2.1 系統實際安裝的版本請參見[驗證你的系統](/zh-hant/tutorials/jetson-agx-orin/verify-your-system)
- [Seeed Studio JetPack 7.2 資源中心](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/)——次要來源；僅用於遷移主題的組織（已於 2026-09-23 確認）

*狀態：草稿，待 cheny 審核。內容依據所列日期的 NVIDIA 官方
文件；尚未由鉅犀科技在實體硬體上驗證。重新構建清單描述的是平台層面的標準後果
（核心/TensorRT/CUDA 版本變更）——請結合你自己的軟件堆疊進行驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發佈，並非 NVIDIA 官方出版物。
