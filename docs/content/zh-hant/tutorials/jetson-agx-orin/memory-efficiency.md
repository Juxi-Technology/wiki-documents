---
title: 記憶體效率——在 64GB 上執行更大的工作負載
sidebar_label: 記憶體效率
slug: /tutorials/memory-efficiency
description: >-
  AGX Orin 開發者套件上降低記憶體佔用的已文檔化手段——平台層面的智能體技能、TensorRT
  Edge-LLM 中的模型層面優化,以及如何測量優化結果。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# 記憶體效率——在 64GB 上執行更大的工作負載

在邊緣設備上,限制你能執行哪些模型的通常是記憶體,而不是算力。JetPack 7.2 發佈時把記憶體效率作為頭號主題,並提供三層已文檔化的優化:**平台**、**模型**與**測量**。本頁梳理這些手段,每一項都附有權威來源的連結。

## 手段 1——平台層面(NVIDIA 智能體技能)

據 NVIDIA 介紹,JetPack 7.2 的**記憶體優化智能體技能**可引導 AI 智能體檢視並降低整個堆疊的記憶體佔用:

- **Bootloader 記憶體預留區(carveouts)**——回收 Linux 啟動前就預留的記憶體
- **內核記憶體預留**——調整內核保留的記憶體
- **使用者空間額外負擔**——找出並移除多餘的進程與服務

NVIDIA 陳述的目標:讓更強的工作負載裝進更小的記憶體佔用(這正是同一代硬件隨著軟件版本不斷變得更好用的原因)。從這裏開始:

- [Jetson 裝置端技能](https://github.com/jetson-device-skills) · [Jetson BSP 技能](https://github.com/jetson-bsp-skills)
- 背景資料:[NVIDIA 的 JetPack 7.2 記憶體效率部落格](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **注意:** 預留區與預留記憶體的改動會影響開機行為。請一次只改一處,保留恢復路徑
> (參見 [刷機與更新](/zh-hant/tutorials/jetson-agx-orin/flashing-and-updates)),並在投入
> 生產前重新驗證。

## 手段 2——模型層面(TensorRT Edge-LLM 的特性)

對 LLM/VLM 工作負載來說,最佔用記憶體的是權重與 KV cache。TensorRT Edge-LLM 文檔中記錄了這些手段(Jetson Orin 執行 FP16/INT8/INT4 引擎——參見[本地 LLM 推論](/zh-hant/tutorials/jetson-agx-orin/local-llm)):

| 手段 | 作用 | 文檔 |
|---|---|---|
| **量化**(Orin 上的 INT8/INT4) | 權重更小,佔用帶寬更低 | [量化指南](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **詞彙表縮減** | 縮小輸出詞彙表 / embedding 表 | [縮減詞彙表](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **KV cache 複用** | 在相關請求之間複用緩存,而不是重新計算 | [KV cache 複用](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **DART 視覺 token 剪枝** | 為 VLM 裁掉多餘的圖像 token | [DART 剪枝](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(文檔中也有 FP8 KV cache,但它是面向 Thor 的;根據官方支援矩陣,Orin 僅限 FP16/INT8/INT4 引擎。)*

## 手段 3——先測量,不要猜

- **系統視角:** `tegrastats`(內置於 Jetson Linux)可實時查看 CPU/GPU/記憶體——參見[驗證你的系統](/zh-hant/tutorials/jetson-agx-orin/verify-your-system)。
- **模型視角:** TensorRT Edge-LLM 提供了[記憶體監控的設計與工具](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html)並發佈[各版本的性能基準](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)。
- **方法:** 先記錄基線(空載與負載下的記憶體佔用),只改**一個**手段,再測量一次。對外發佈的數字應始終來自你自己的工作負載。

## 實際意味著什麼

- 64GB 模組已經能執行 30B 級別的模型(已發佈的數字見[本地 LLM 推論](/zh-hant/tutorials/jetson-agx-orin/local-llm));記憶體優化讓你能在其之上再加*更多*內容——多模型管線、更長的上下文、常駐智能體([智能體 AI](/zh-hant/tutorials/jetson-agx-orin/agentic-ai))、與推論並行的視頻管線([DeepStream](/zh-hant/tutorials/jetson-agx-orin/deepstream))。
- 如果你的工作負載現在勉強裝得下,請先從手段 2(模型層面)入手——它風險最低、文檔最齊全。需要從平台本身再擠出記憶體時,再用手段 1。

## 資料來源

- [NVIDIA 技術部落格——JetPack 7.2 中的記憶體效率與智能體技能](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(已於 2026-09-24 確認)
- [TensorRT Edge-LLM 文檔](https://nvidia.github.io/TensorRT-Edge-LLM/)(功能與支援矩陣;已於 2026-09-24 確認)

*狀態:已於 2026-10-11 審核。內容依據所列日期的 NVIDIA 官方文件;尚未由鉅犀科技在實體硬件上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發佈,並非 NVIDIA 官方出版物。
