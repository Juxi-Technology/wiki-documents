---
title: 智能體 AI —— JetPack 7.2 上的 NemoClaw
sidebar_label: 智能體 AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  在 AGX Orin 開發套件上部署 NVIDIA NemoClaw——單一命令安裝、
  Jetson 智能體技能,以及面向常駐智能體的實用注意事項。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# 智能體 AI —— JetPack 7.2 上的 NemoClaw

JetPack 7.2 讓你的套件**智能體就緒**:NVIDIA NemoClaw 一條命令即可安裝,NVIDIA 的智能體技能還能將過去大量需要手動完成的平台工作自動化。

## NemoClaw 是什麼

按 NVIDIA 的說法:NemoClaw 是一套用於構建**自主智能體**的開放堆疊/藍圖集合——即能夠推理、規劃並行動的常駐 AI 系統。它為 OpenClaw 智能體生態加入隱私與安全控制(透過 **OpenShell** 執行時策略控制),並打包 Nemotron 模型、NeMo 等 NVIDIA 組件。JetPack 7.2 **已預先配置所需依賴**,因此你的套件無需手動搭建環境。

- NemoClaw 產品頁:<https://www.nvidia.com/en-us/ai/nemoclaw>
- GitHub 上的 NemoClaw:<https://github.com/NemoClaw> · 社群範例:<https://github.com/nemoclaw-community>

## 安裝(單一命令,官方)

在套件上(JetPack 7.2+)執行:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **安全提示——執行前請務必閱讀:** 這會安裝一個常駐智能體框架。請在*啟用之前*先審查該智能體被允許存取什麼、可以使用哪些憑證;優先使用限定範圍/可撤銷的令牌,並善用 OpenShell 的策略控制。不要讓智能體處於無人看管、且你無法撤銷其權限的狀態。

## 安裝之後——接下來做什麼

NVIDIA 維護著一個 **Build-a-Claw Resource Hub**,提供安裝指南、雲端試用和學習資源:<https://www.nvidia.com/en-us/ai/build-a-claw>

同樣有用的還有:

- NVIDIA Deep Learning Institute 課程:*Securing Agents With NemoClaw and OpenShell*(見資源中心)
- NVIDIA Developer Discord——`#nemoclaw` 頻道
- 第三方教學(例如 [Seeed Studio 的 NemoClaw 指南](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/),為 Jetson Thor 機械臂而寫)記錄了 `nemoclaw onboard` 這類安裝後流程——請把這些當作社群經驗,權威流程以 NVIDIA 的資源中心為準。

## Jetson 智能體技能——讓平台工作自動化

JetPack 7.2 內建**智能體技能**:面向 Jetson 開發的可重複、可由智能體執行的工作流。按 NVIDIA 的劃分共有三類:

| 技能類別 | 自動化的內容 |
|---|---|
| **Jetson Linux 自訂** | 為自訂載板構建/自訂 BSP——I/O 配置、時鐘、風扇控制、電源模式 |
| **記憶體優化** | 稽核 bootloader 保留區、核心保留和使用者空間記憶體,以便用更少的記憶體承載更強的負載 |
| **模型基準測試** | 為你的裝置尋找最佳模型配置與診斷方法 |

生態中還有更多智能體技能:

- [Jetson 裝置端技能](https://github.com/jetson-device-skills) · [Jetson BSP 技能](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent)——智能體輔助的視覺管線構建(見[我們的 DeepStream 教學](/zh-hant/tutorials/jetson-agx-orin/deepstream))
- [Metropolis VSS 藍圖技能](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills)——影片搜尋與摘要工作流

## AGX Orin 套件的實用注意事項

- **常駐智能體需要專用算力**——這正是把它們跑在套件上、而不是跑在會休眠的筆電上的意義所在;請據此規劃供電與散熱(參見[故障排除](/zh-hant/tutorials/jetson-agx-orin/troubleshooting)中的電源模式說明)。
- **模型選擇會影響記憶體使用**——Orin 上的本地模型在 64GB 內運行自如,但常駐智能體會不斷累積上下文。可用的調節手段見[記憶體效率](/zh-hant/tutorials/jetson-agx-orin/memory-efficiency),裝置端模型效能見[本地 LLM 推論](/zh-hant/tutorials/jetson-agx-orin/local-llm)。
- **這個領域變化很快。** 請把上面的命令視為目前的官方路徑;在把部署寫成腳本之前,先到資源中心確認有沒有更新。

## 來源

- [NVIDIA 技術部落格——JetPack 7.2 智能體 AI(安裝命令、智能體技能、版本特性)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(查核於 2026-09-24)
- [NVIDIA NemoClaw 產品頁](https://www.nvidia.com/en-us/ai/nemoclaw)(查核於 2026-09-24)
- [JetPack 7.2.1 下載頁](https://developer.nvidia.com/embedded/jetpack/downloads)(查核於 2026-09-24)

*狀態:草稿,待 cheny 審閱。內容依據截至所列日期的 NVIDIA 官方文件;尚未經鉅犀科技在實機上驗證。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布,並非 NVIDIA 官方出版物。
