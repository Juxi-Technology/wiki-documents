---
title: 下載與官方連結
sidebar_label: 下載
slug: /downloads
description: >-
  一份已查核的索引：Jetson Orin Nano Super Developer Kit（8GB）在
  JetPack 7.2.1 / L4T r39.2.1 上的 NVIDIA 官方下載與文件，
  外加合作夥伴資源與鉅犀科技的入口。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 下載與官方連結

本頁是 **Jetson Orin Nano Super Developer Kit（8GB）** 在 **JetPack 7.2.1 / Jetson Linux（L4T）r39.2.1** 上的 NVIDIA 官方下載與文件索引，外加一些合作夥伴資源與鉅犀科技的入口。所有連結均於 **2026-09-26** 查核。

在下載任何東西之前，有兩個 Orin Nano 專屬的事實要留意：

- **沒有 SD 卡映像。** 從 JetPack 7.2 起，本套件是透過寫入 USB 隨身碟的 Jetson ISO 安裝。沒有 SD 卡映像，且 ISO 不得寫入 microSD 卡。
- **固件門檻。** JetPack 7.2.1 要求套件具備 JetPack 6.x 世代的 UEFI/QSPI 固件。如果你的套件仍是較舊的出廠固件，請先完成 JetPack 6.x 更新路徑。

> **鉅犀提示：** 完整設定流程見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)。刷機與更新選項的比較見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)。

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK 下載](https://developer.nvidia.com/embedded/jetpack/downloads) —— 主要的 JetPack 頁面：發行說明、官方組件版本表，以及所有 JetPack 7.2.1 下載連結。

> ⚠️ **不要逐列信任那張組件表。** NVIDIA 尚未為 7.2.1 將其全面更新：CUDA 那一列已更新，但緊鄰它的兩列沒有——VPI 仍顯示 JetPack 7.2 的值（**4.1.3，而 7.2.1 實際隨附 4.1.4**），Isaac ROS 那一列仍標示「即將推出」，儘管 Isaac ROS 自 2026 年 8 月發行以來就已支援 JetPack 7.2 上的 Orin。組件版本請以 NVIDIA 的套件倉庫為準：中繼套件透過相依性鏈鎖定每個組件——[r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)，其中 `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` （核對於 2026-09-26）。組件版本也列在[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)上。
- [r39.2.1 的 Jetson ISO（直接下載）](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) —— JetPack 7.2.1 的安裝映像；套件的快速開始頁面以「Direct Download Link: Jetson ISO (r39.2.1)」之名連結它。請將它寫入 16 GB 以上的 USB 隨身碟。下載處未隨附校驗碼。
- [NVIDIA SDK Manager 文件](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) —— 安裝與使用這套主機 PC 工具來刷寫套件、更新固件與安裝 JetPack 組件（需要 NVIDIA Developer Program 帳號）；套件的工作流程見 [BSP 安裝](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html)。
- [JetPack 歸檔](https://developer.nvidia.com/embedded/jetpack-archive) —— 較早的 JetPack 版本，包括 JetPack 7.2（首個支援 Orin 系列的 7.x 版本）與 JetPack 6.x 產品線。

## 文檔

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) —— 本套件的主要參考文檔。
  - [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) —— JetPack 7.2.1 的新增內容、GA 宣告與已知問題清單。
- [Jetson Linux r39.2 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) —— JetPack 7.2 的發行說明。
- [Jetson Linux Developer Guide（r39.2）](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) —— 刷機目標、分割區配置，以及平台電源與效能表。
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) —— NVIDIA 自己為本套件整理的延伸資源清單（JetPack SDK、Developer Guide、SDK Manager 文件、Jetson Download Center、Jetson AI Lab、開發者論壇、Jetson 生態系）。
- [Jetson Download Center](https://developer.nvidia.com/embedded/downloads) —— NVIDIA 的 Jetson 下載索引；套件指南在此指向載板規格與支援組件清單。部分內容需要 NVIDIA 登入。

## AI 框架與教學

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) —— NVIDIA 為 Jetson 打造的裝置端 LLM 推論堆疊。Orin 是官方支援的目標，且僅支援 FP16、INT8 與 INT4（[支援矩陣](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [支援的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)）。
- [DeepStream 9.1 安裝指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) —— Jetson 上的視頻分析；DeepStream 9.1 是在 JetPack 7.2 上支援 Orin 系列的版本（[快速入門](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Docker 容器](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)）。
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) —— 由合作夥伴經營的實作教學中心，教你如何在 Jetson 上執行 AI 模型，其中包括[給 Orin Nano 8 GB 的 TensorRT Edge-LLM 逐步教學](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/)。
- [SBSA wheel 索引（CUDA 13）](https://pypi.jetson-ai-lab.io/sbsa/cu130) —— 合作夥伴託管的 aarch64 Python wheels 索引，對應 JetPack 7.2 / CUDA 13.2；NVIDIA 員工為此版本的 Python wheels 指向這個索引。

## 鉅犀科技

- **Wiki：** [wiki.juxitech.com](https://wiki.juxitech.com/) —— 本文件系列；[產品目錄](https://wiki.juxitech.com/products/)列出相機、感測器與 Jetson 套件配件。
- **商店：** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) —— 鉅犀科技為本套件的商店頁面（SKU JX00110）。
- **聯絡方式：** 技術支援 —— support@juxitech.com · 銷售 —— sales@juxitech.com · 產品諮詢 —— pe@juxitech.com。

## 資料來源

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) —— [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)、[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)（查閱於 2026-09-26）
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) 與 [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive)（查閱於 2026-09-26）—— ⚠️ 其組件表逐列落後，組件版本請以 [NVIDIA 的套件倉庫](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) 為準（見上文警告）
- [NVIDIA 的套件倉庫——r39.2 arm64 Packages 索引](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) —— 組件版本的權威來源，透過中繼套件中的相依性鎖定（checked 2026-09-26）
- Jetson Linux Release Notes —— [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)、[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（查閱於 2026-09-26）
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html)（查閱於 2026-09-26）
- [NVIDIA SDK Manager 文件](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html)（查閱於 2026-09-26）
- [TensorRT Edge-LLM 文檔](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 安裝指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA wheel 索引](https://pypi.jetson-ai-lab.io/sbsa/cu130)（查閱於 2026-09-26）
- [鉅犀科技商店產品頁](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)與 [wiki](https://wiki.juxitech.com/)（查閱於 2026-09-26）

*狀態：草稿，待 cheny 審核。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
