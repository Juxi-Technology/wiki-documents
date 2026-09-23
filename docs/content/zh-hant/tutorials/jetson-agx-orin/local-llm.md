---
title: 在本地執行 LLM——JetPack 7.2 上的 TensorRT Edge-LLM
sidebar_label: 本地 LLM 推論
slug: /tutorials/local-llm
description: >-
  以 NVIDIA TensorRT Edge-LLM 在 AGX Orin 開發套件上於本地執行大型語言與多模態
  模型——涵蓋支援的模型、Orin 限制、工作流程與預期性能。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# 在本地執行 LLM——JetPack 7.2 上的 TensorRT Edge-LLM

你的 AGX Orin 64GB 可以在本地執行大型語言模型——無需雲端、無需網絡。NVIDIA 針對此用途的最佳化路徑是 **TensorRT Edge-LLM**，它**正式支援 JetPack 7.2 上的 Jetson Orin**。本頁幫你建立整體概念：你的套件能做什麼、不能做什麼，工作流程的樣貌，以及可以預期的性能。權威的分步操作在 NVIDIA 官方文件中（全文附有連結）。

## 先讀這一節——三個 Orin 專屬事實

1. **Orin 僅執行 FP16、INT8 與 INT4 引擎。Orin 不支援 FP8 與 FP4**（它們屬於 Thor 等級的能力）。NVIDIA 的支援矩陣明確說明了這一點——請據此規劃你的量化選擇。
2. **Orin 部署路徑的引擎在裝置上構建**（不是從 PC 交叉編譯）。
3. **JetPack 7.2 是受支援的軟件堆疊**——CUDA 13.2 搭配平台版 TensorRT（本版本為 10.16.2）。aarch64 wheel 針對 Jetson Orin（SM87），支援 Python 3.10–3.12。

*（來源：TensorRT Edge-LLM 官方支援矩陣，查閱於 2026-09-24。）*

## TensorRT Edge-LLM 涵蓋的範圍

根據 NVIDIA 官方文件，Edge-LLM 為邊緣平台上的**文字、視覺、音頻、語音與動作模型**提供優化推論：

| 能力 | 文件中的示例 |
|---|---|
| 文字生成 | 含 Qwen、Gemma、Nemotron 的 LLM 系列 |
| 多模態（VLM） | Phi-4 Multimodal 示例 |
| 語音辨識（ASR） | 專屬示例工作流程 |
| 語音生成（TTS） | 專屬示例工作流程 |
| 視覺-語言-動作 | VLA 示例（機器人） |
| Omni（音頻 + 視覺 + 語音 I/O） | 專屬示例工作流程 |

功能亮點：量化（Orin 上的 INT8/INT4）、推測解碼（EAGLE3、DFlash 等）、**KV cache 複用**、**詞彙縮減**、針對 VLM 的 **DART 視覺 token 剪枝**、串流輸出，以及 LoRA 支援。

## 工作流程（依官方文件）

TensorRT Edge-LLM 有兩條官方記載的 Quick Start 路徑：

1. **ONNX + C++ runtime**——匯出/量化檢查點（通常在 x86 主機上）、傳輸到裝置、在裝置上構建引擎、執行 C++ runtime。
2. **單行 Python 伺服器**——更快取得服務端點的路徑。

從這裡開始：**[TensorRT Edge-LLM Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

除了 Quick Start 之外：

- [安裝選項 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)（原始碼 C++ runtime、匯出/量化工作流程、實驗性本地 wheel）
- [支援的模型 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [量化指南 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [KV cache 複用 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [DART 剪枝 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **鉅犀提示：** 匯出/量化工具在 x86 Linux 主機上執行效果最好（依文件中所列 x86 開發者條目）
> ；**引擎構建與推論則在你的套件上執行**。請為模型檢查點預留磁碟空間——每個模型數 GB 是常態。

## 服務：OpenAI 相容端點（以及 Claude Code）

文件中包含一個**實驗性 Python API 與伺服器**，提供 OpenAI 相容的聊天介面——文件中有 OpenAI 風格客戶端的示例，甚至還有**「Anthropic 與 Claude Code」整合示例**（把 Claude Code 指向你在 Jetson 上託管的端點）。

- [實驗性 Python API 與伺服器 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## 預期性能（AGX Orin 64GB）

NVIDIA 公布了 64GB 模組在 JetPack 7.2 上的以下每秒 token 數據（2026 年 6 月；完整背景與方法見原始部落格）：

| 模型 | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

你的數據會因模型、量化、上下文長度與電源模式而不同。請將這些視為原廠公布的參考值，而不是保證。

## 更簡單的替代方案

如果 Edge-LLM 的匯出/構建工作流程對你現在的需求來說過於繁重，NVIDIA 的 [Jetson AI Lab](https://www.jetson-ai-lab.com) 為其他 runtime（llama.cpp、vLLM 等）提供了實作教學——照著較舊的教學操作之前，請先確認它的 JetPack 版本說明。

## 故障排除

- **首次執行較慢：** 首次啟動時引擎構建可能需要數分鐘；之後的執行會複用引擎（DeepStream 也是同樣的行為——參見[我們的 DeepStream 教學](/zh-hant/tutorials/jetson-agx-orin/deepstream)）。
- **FP8/FP4 指令無法運作：** 這是預期行為——Orin 僅支援 FP16/INT8/INT4 引擎。
- **版本不對：** 請先確認 JetPack 7.2.1——[驗證你的系統](/zh-hant/tutorials/jetson-agx-orin/verify-your-system)。

## 資料來源

- [TensorRT Edge-LLM——官方支援矩陣](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)（查閱於 2026-09-24）
- [TensorRT Edge-LLM 文件首頁](https://nvidia.github.io/TensorRT-Edge-LLM/)（v0.10.1，查閱於 2026-09-24）
- [NVIDIA 技術部落格——在 JetPack 7.2 中以記憶體效率在邊緣部署代理式 AI](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)（性能數據；查閱於 2026-09-24）

*狀態：草稿，待 cheny 審閱。內容依據截至所列日期的 NVIDIA 官方文件；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁由鉅犀科技發布，並非 NVIDIA 官方出版物。
