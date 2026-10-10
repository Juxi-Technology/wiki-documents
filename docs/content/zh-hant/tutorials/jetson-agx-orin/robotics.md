---
title: JetPack 7.2 上的機器人開發——如今哪些能用
sidebar_label: 機器人(現狀)
slug: /tutorials/robotics
description: >-
  AGX Orin 開發者套件在 JetPack 7.2 上開展機器人開發的如實現狀說明——涵蓋 ROS 2、
  Isaac ROS 可用性、機器人學習技術棧，以及確定架構之前該核查什麼。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2 上的機器人開發——如今哪些能用

JetPack 7.2 將 Orin 帶入了新一代平台(Ubuntu 24.04、內核 6.8、CUDA 13)。機器人方面的情況好壞參半：核心部分(ROS 2、Isaac ROS)如今已在該平台上就位，而周邊技術棧的部分環節仍在逐步穩定——因此本頁有意寫成現狀說明，而不是教程。在確定架構之前，請先讀一遍本頁。

## 狀態表(2026-09-24 查核；Isaac ROS 一列已於 2026-09-26 復查)

| 你需要什麼 | JetPack 7.2 / AGX Orin 上的狀態 | 備註 |
|---|---|---|
| **ROS 2(核心)** | ✅ 可用 | Ubuntu 24.04 是 ROS 2 **Jazzy** 的目標平台；按 [ROS 2 安裝文檔](https://docs.ros.org/en/jazzy/Installation.html) 安裝。基於 Docker 的 ROS 2 也是可選方案。 |
| **Isaac ROS**(硬體加速的 ROS 2 套件) | ✅ **自 Isaac ROS 4.6.0 版起即受支援**(2026-08-18) | 已在 Jetson Orin 上為 JetPack 7.2 發布，並有官方的 AGX Orin 設定逐步教學。真正要做的決定是選用哪個 ROS 2 發行版：**Jazzy 上的 4.6.x** 還是 **Lyrical 上的 5.0**——見[JetPack 7.2 上的 Isaac ROS](#jetpack-7-2-上的-isaac-ros)。 |
| **本地 LLM / VLM / VLA 模型** | ✅ 可用 | TensorRT Edge-LLM 正式支援 JP7.2 上的 Orin，包括 **Vision-Language-Action** 示例——見[本地 LLM 推論](/zh-hant/tutorials/jetson-agx-orin/local-llm)。 |
| **多攝像頭視頻流水線** | ✅ 可用 | DeepStream 9.1 隨 JP7.2 一同提供——見 [DeepStream 視頻分析](/zh-hant/tutorials/jetson-agx-orin/deepstream)。 |
| **智能體行為 / 編排** | ✅ 可用 | NemoClaw + Jetson 智能體技能——見[智能體 AI](/zh-hant/tutorials/jetson-agx-orin/agentic-ai)。 |
| **機器人學習技術棧(LeRobot 風格的 Python 框架)** | ⚠️ 採用前請先驗證 | 這類技術棧重度依賴 Python；Ubuntu 24.04 已轉向 Python 3.12，部分依賴可能滯後。在圍繞它做設計之前，請先在 JP7.2 上測試你的具體技術棧——並注意**我們尚未在硬體上驗證**。 |
| **GR00T(人形基礎模型)** | ⚠️ 請查閱官方來源 | 平台支援情況請關注 NVIDIA 官方的 Isaac GR00T 倉庫與公告。一份由合作方發布的實操指南報告了在 AGX Orin + JP7.2 上的完整權重 TensorRT 部署*(第三方內容，未經我們驗證)*。 |
| **定製載板 / BSP 工作** | ✅ 新工具 | JetPack 7.2 的 **Jetson Linux 定製智能體技能** 可自動完成 BSP 點亮任務——見[智能體技能倉庫](https://github.com/jetson-bsp-skills)。 |

## JetPack 7.2 上的 Isaac ROS

「即將推出」的時代已經結束。Isaac ROS **4.6.0** 版(2026-08-18)新增了對 **Jetson Orin** 與 **JetPack 7.2** 的支援，其支援平台表將 *Jetson Orin* 與 *JetPack 7.2*(128+ GB NVMe SSD)配成一組。NVIDIA 為這一組合發布了專門的 **Jetson AGX Orin** 快速開始與 Docker 設定逐步教學——本套件是官方重點支援的目標，而不是事後才想到的。

真正重要的決定，是你採用哪個 **ROS 2 發行版**：

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| 發布日期 | 2026-08-18 | 2026-09-21 |
| ROS 2 發行版 | **Jazzy**——Ubuntu 24.04 的標準發行版 | **Lyrical Luth**——NVIDIA 自行構建 ROS 2 Noble 套件，並由其 buildfarm CDN 分發 |
| NITROS 套件 | 保留 | **已移除**，改為在 `rosidl::Buffer` 上原生重建；直接呼叫 NITROS API 或型別的程式碼需要原始碼層級的遷移 |
| Isaac Sim 搭配版本 | 6.0(5.0/5.1 仍作為舊版支援) | 6.0 |

- 全新起步、想走主流路線：**Jazzy 上的 4.6.x** 讓你留在標準的 ROS 2 發行版上。**5.0** 是 NVIDIA 的發展方向，並帶來 Lyrical 生態——在升級既有節點程式碼之前，請先閱讀 [5.0.0 發行說明](https://nvidia-isaac-ros.github.io/releases/index.html) 中所連結的 NITROS 到 `rosidl::Buffer` 遷移指引。
- **這些版本在 Orin 上的已知限制**：RealSense 攝像頭僅能在 **Docker 模式** 下運作；使用 `isaac_ros_stereo_image_proc` 時，在 AGX Orin 上以 RGB8/BGR8 輸入選擇 `backend:=JETSON` 可能因 VPI 錯誤而讓節點中止——請保留預設的 `backend:=CUDA`；從 Debian 套件安裝的 Teleop 在 Orin 上需要設定 `ISAAC_TELEOP_CLOUDXR_EXP=0`；而 5.0 的 `isaac_ros_dnn_image_encoder` 預處理在 AGX Orin 上比 4.6 慢——如果該節點在你的計算圖中是熱點，請優先選用 4.6。
- **OpenCV：** JetPack 7.2 隨附的 OpenCV 為 **4.8.0**，而 Isaac ROS 期望的是 **4.6.0**。移除系統套件(`sudo apt-get remove -y libopencv* opencv*`)後，Isaac ROS 的套件便會安裝其固定版本。

### NVIDIA 自家頁面互相矛盾之處

NVIDIA 的 [JetPack 下載頁面](https://developer.nvidia.com/embedded/jetpack/downloads) 針對本次發行版仍將 Isaac ROS 列為 **「即將推出」**，而 Isaac ROS 的發行說明則稱自 4.6.0 起即已支援。這兩個頁面尚未取得一致——Isaac ROS 獨立於 JetPack 發布，而 JetPack 頁面的組件表記錄的是隨 JetPack *一同* 發布的內容。Isaac ROS 文檔指向的 apt 套件倉庫，是這一受支援組合最有力的證據：`…/isaac-ros/release-4.6 noble-jetpack`——*noble* 對應 Ubuntu 24.04，*jetpack* 對應 JetPack 構建。當兩者不一致時，請以 [Isaac ROS 發行說明](https://nvidia-isaac-ros.github.io/releases/index.html) 為準，並在據以設計之前先在你自己的環境中驗證。

## 建議

- **沒有機器人相關依賴的新專案：** 基於 JetPack 7.2 構建——你可以獲得 Ubuntu 24.04 LTS 支援、CUDA 13、DeepStream 9.1、裝置端 LLM，以及智能體工具鏈。
- **使用 Isaac ROS 的專案：** JetPack 7.2 重新成為受支援的目標。請審慎選擇 4.6.x(Jazzy)或 5.0(Lyrical)，並把 OpenCV 的更換與 RealSense 僅支援 Docker 模式計入你的規劃。如果你的專案正進行到一半、在 JetPack 6.x 上已有經過驗證的技術棧，也沒有非遷不可的壓力——等你的 Isaac ROS 版本選型確定後再遷移即可(我們的[遷移指南](/zh-hant/tutorials/jetson-agx-orin/jetpack-6-to-7) 涵蓋了需要重新構建的工作)。
- **一套開發套件，多種模組：** 請記住，你的開發套件可以透過重新刷機來模擬其他 Jetson Orin 模組——在選定量產型號之前，這很適合在整條模組產品線上驗證機器人工作負載(參見[產品概述](/zh-hant/tutorials/jetson-agx-orin/overview))。

## 參考資料

- [Isaac ROS 發行說明——4.6.0(2026-08-18)與 5.0.0(2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html)(查核於 2026-09-26)
- [Isaac ROS 4.6——入門指南：支援平台、Jetson AGX Orin 逐步教學、apt 安裝](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html)(查核於 2026-09-26)
- [Isaac ROS 5.0——入門指南：支援平台、Lyrical buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/index.html)(查核於 2026-09-26)
- [JetPack 7.2.1 下載頁——組件清單](https://developer.nvidia.com/embedded/jetpack/downloads)——其中 Isaac ROS 一列仍寫著過時的「即將推出」(查核於 2026-09-26)
- [Jetson AGX Orin 開發者套件用戶指南——簡介](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(模組模擬；查核於 2026-09-24)
- [ROS 2 Jazzy 安裝文檔](https://docs.ros.org/en/jazzy/Installation.html)

*狀態：已於 2026-10-11 審核。生態可用性變化很快——在依賴本表之前，請重新查核文中連結的 NVIDIA 頁面。尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
