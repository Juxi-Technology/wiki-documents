---
title: JetPack 7.2 上的機器人開發——如今哪些能用
sidebar_label: 機器人(現狀)
slug: /tutorials/robotics
description: >-
  AGX Orin 開發者套件在 JetPack 7.2 上開展機器人開發的如實現狀說明——涵蓋 ROS 2、
  Isaac ROS 可用性、機器人學習技術棧，以及生態追趕期間該用什麼。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# JetPack 7.2 上的機器人開發——如今哪些能用

JetPack 7.2 將 Orin 帶入了新一代平台(Ubuntu 24.04、內核 6.8、CUDA 13)。機器人開發正是*生態*仍在追趕平台的領域——因此本頁有意寫成現狀說明，而不是教程。在確定架構之前，請先讀一遍本頁。

## 狀態表(2026-09-24 查核)

| 你需要什麼 | JetPack 7.2 / AGX Orin 上的狀態 | 備註 |
|---|---|---|
| **ROS 2(核心)** | ✅ 可用 | Ubuntu 24.04 是 ROS 2 **Jazzy** 的目標平台；按 [ROS 2 安裝文檔](https://docs.ros.org/en/jazzy/Installation.html) 安裝。基於 Docker 的 ROS 2 也是可選方案。 |
| **Isaac ROS**(硬體加速的 ROS 2 套件) | ⛔ **尚不可用——NVIDIA 對 JetPack 7 標註為“即將推出”** | 這是最大的缺口。如果 Isaac ROS 目前就在你的關鍵路徑上，請先繼續使用 **JetPack 6.x**，並關注 NVIDIA 的[下載頁面](https://developer.nvidia.com/embedded/jetpack/downloads)，等待正式發布。 |
| **本地 LLM / VLM / VLA 模型** | ✅ 可用 | TensorRT Edge-LLM 正式支援 JP7.2 上的 Orin，包括 **Vision-Language-Action** 示例——見[本地 LLM 推論](/zh-hant/tutorials/jetson-agx-orin/local-llm)。 |
| **多攝像頭視頻流水線** | ✅ 可用 | DeepStream 9.1 隨 JP7.2 一同提供——見 [DeepStream 視頻分析](/zh-hant/tutorials/jetson-agx-orin/deepstream)。 |
| **智能體行為 / 編排** | ✅ 可用 | NemoClaw + Jetson 智能體技能——見[智能體 AI](/zh-hant/tutorials/jetson-agx-orin/agentic-ai)。 |
| **機器人學習技術棧(LeRobot 風格的 Python 框架)** | ⚠️ 採用前請先驗證 | 這類技術棧重度依賴 Python；Ubuntu 24.04 已轉向 Python 3.12，部分依賴可能滯後。在圍繞它做設計之前，請先在 JP7.2 上測試你的具體技術棧——並注意**我們尚未在硬體上驗證**。 |
| **GR00T(人形基礎模型)** | ⚠️ 請查閱官方來源 | 平台支援情況請關注 NVIDIA 官方的 Isaac GR00T 倉庫與公告。一份由合作方發布的實操指南報告了在 AGX Orin + JP7.2 上的完整權重 TensorRT 部署*(第三方內容，未經我們驗證)*。 |
| **定製載板 / BSP 工作** | ✅ 新工具 | JetPack 7.2 的 **Jetson Linux 定製智能體技能** 可自動完成 BSP 點亮任務——見[智能體技能倉庫](https://github.com/jetson-bsp-skills)。 |

## 建議

- **沒有 Isaac ROS 依賴的新專案：** 基於 JetPack 7.2 構建——你可以獲得 Ubuntu 24.04 LTS 支援、CUDA 13、DeepStream 9.1、裝置端 LLM，以及智能體工具鏈。
- **目前依賴 Isaac ROS 的專案：** 暫時按 JetPack 6.x 規劃；等 Isaac ROS 發布對應版本後，再把 JP7.x 當作你的遷移目標(到那一天，我們的[遷移指南](/zh-hant/tutorials/jetson-agx-orin/jetpack-6-to-7) 涵蓋了需要重新構建的工作)。
- **一套開發套件，多種模組：** 請記住，你的開發套件可以透過重新刷機來模擬其他 Jetson Orin 模組——在選定量產型號之前，這很適合在整條模組產品線上驗證機器人工作負載(參見[產品概述](/zh-hant/tutorials/jetson-agx-orin/overview))。

## 參考資料

- [JetPack 7.2.1 下載頁——Isaac ROS 對 JetPack 7 顯示“即將推出”](https://developer.nvidia.com/embedded/jetpack/downloads)(查核於 2026-09-24)
- [Jetson AGX Orin 開發者套件用戶指南——簡介](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(模組模擬；查核於 2026-09-24)
- [ROS 2 Jazzy 安裝文檔](https://docs.ros.org/en/jazzy/Installation.html)

*狀態：草稿，待 cheny 審核。生態可用性變化很快——在依賴本表之前，請重新查核文中連結的 NVIDIA 頁面。尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
