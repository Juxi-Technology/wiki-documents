---
title: 產品概述 — Jetson AGX Orin 開發者套件
sidebar_label: 產品概述
slug: /product/overview
description: >-
  NVIDIA Jetson AGX Orin 開發者套件(64GB)是什麼、能用來做什麼，以及它在
  Jetson Orin 產品線中的定位。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# 產品概述

![Jetson AGX Orin 開發者套件](/images/jetson-agx-orin/jaodk_1024px.png)

NVIDIA® Jetson AGX Orin™ 開發者套件是 Jetson Orin 家族中的旗艦級開發者套件：
一台精巧的 AI 電腦，用來在邊緣端開發並原型驗證機器人、電腦視覺與生成式 AI
應用。本指南介紹的是 **64GB** 版開發者套件。

## 關鍵事實(已對照 NVIDIA 官方文件查核)

- 開發者套件與**所有 Jetson Orin 模組共享同一種 SoC 架構**，因此只要重新刷機，
  就能**模擬 AGX Orin、Orin NX 或 Orin Nano 模組的效能與功耗**。出廠時預設配置為
  **Jetson AGX Orin 系列**。*(Developer Kit User Guide)*
- NVIDIA 標稱 AGX Orin 模組系列的 AI 效能**最高可達 275 TOPS**，功耗可在
  **15W 至 60W** 之間配置。*(NVIDIA 產品頁面)*
- 64GB 模組的 GPU 為 **2048 核心 NVIDIA Ampere 架構 GPU，內含 64 個 Tensor
  核心**。*(NVIDIA 產品頁面，對比表)*
- 套件隨附的參考載板提供多種標準介面——DisplayPort、10GBASE-T 乙太網路、
  USB 3.2、M.2(NVMe 與 Wi-Fi)、40 針排針、PCIe、相機連接器等。詳見
  **[介面與硬體佈局](/zh-hant/tutorials/jetson-agx-orin/interfaces)**。

## 開發者套件的用途

- **開發與原型驗證**——對於最終將在量產環境的 Jetson Orin 模組上運行的應用，
  套件就是它們的參考平台。
- **效能與功耗探索**——由於它可以模擬其他 Orin 模組，一套套件即可讓你在決定
  量產型號之前，先在整個模組產品線範圍內測試工作負載。
- **邊緣 AI 工作負載**——電腦視覺、機器人與本地生成式 AI(請參閱我們持續擴充的
  教程專區)。

> **鉅犀說明：**量產產品建構在 Jetson Orin *模組*(64GB / 32GB / 工業版)之上，
> 模組安裝在你自研或合作夥伴提供的載板上。開發者套件是開發驗證的載具，而非
> 量產零件。

## 包裝內容

Jetson AGX Orin 模組與參考載板、Wi-Fi 模組、USB Type-C 電源供應器，以及一條
USB Type-C 轉 USB Type-A 連接線。需要自行準備的物品請見
**[快速開始](/zh-hant/tutorials/jetson-agx-orin/quick-start)**。

## 下一步

- **[快速開始](/zh-hant/tutorials/jetson-agx-orin/quick-start)**——從開箱到建立可正常運作的 JetPack 7.2.1 系統
- **[介面與硬體佈局](/zh-hant/tutorials/jetson-agx-orin/interfaces)**——每一個連接埠與連接器
- **[下載](/zh-hant/tutorials/jetson-agx-orin/downloads)**——官方映像檔、工具與文件連結 *(頁面整理中)*

## 資料來源

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (查核於 2026-09-23)
- [NVIDIA Jetson Orin 產品頁面](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) (查核於 2026-09-23)

*狀態：草稿，待 cheny 審核。完整的模組規格表將依 NVIDIA 官方資料表補上；在此
之前，請以 NVIDIA 產品頁面作為規格的權威來源。*

**圖片來源：**產品圖片來自 NVIDIA 官方 *Jetson AGX Orin Developer Kit User
Guide*(下載於 2026-09-23)，© NVIDIA Corporation。

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非
NVIDIA 官方出版物。
