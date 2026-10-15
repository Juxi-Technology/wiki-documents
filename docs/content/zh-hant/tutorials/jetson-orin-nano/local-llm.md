---
title: 在本地執行 LLM——8 GB Orin Nano 上的 TensorRT Edge-LLM
sidebar_label: 本地 LLM 推論
slug: /tutorials/local-llm
description: >-
  在 8 GB 的 Jetson Orin Nano 上於本地執行大型語言模型——
  TensorRT Edge-LLM 支援、精度限制、能裝下哪些模型，以及官方數字。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# 在本地執行 LLM——8 GB Orin Nano 上的 TensorRT Edge-LLM

你的 Jetson Orin Nano Super 開發套件（8 GB）可以在本地執行語言模型。NVIDIA 針對此用途的最佳化路徑是 **TensorRT Edge-LLM**，它**正式支援 JetPack 7.2 系列上的 Jetson Orin**。本頁說明 8 GB 能裝下什麼、目前哪些執行環境可用；權威的操作步驟在 NVIDIA 官方文件中，連結見下文。

## 先讀這一節——本套件的四項限制

1. **Orin 僅執行 FP16、INT8 與 INT4 引擎。FP8 與 FP4 引擎無法在此裝置上執行**——它們屬於 Thor/Blackwell 等級的能力（「Jetson Orin 不執行 FP8 或 FP4 模型引擎」——支援矩陣）。
2. **引擎由 C++ 執行環境在裝置上構建。** ONNX 匯出與量化則在 x86-64 Linux 主機上執行——不在 Orin 上。引擎與 SM 版本精確綁定：在 Thor（SM110）上構建的引擎無法在 Orin Nano（sm_87）上載入。
3. **JetPack 7.2.1（L4T r39.2.1）是受支援的軟體堆疊**——CUDA 13.2.2、TensorRT 10.16.2。Edge-LLM 使用的正是 JetPack 隨附的這個平台 TensorRT。
4. **8 GB 的統一記憶體由作業系統與桌面共用。** 約 7.6 GB 可用。真正的瓶頸是模型規模——而不是 TOPS——而且 KV cache 也必須放進同一塊記憶體。

> **重要：** 本套件請選擇 **INT4 AWQ** 或 **INT4 GPTQ** 檢查點。不要選擇 FP8、MXFP8、FP4 或 NVFP4 檢查點。不支援 INT8 GPTQ。

## TensorRT Edge-LLM 涵蓋的範圍

TensorRT Edge-LLM 是 NVIDIA 針對邊緣平台上 LLM 與 VLM 的官方執行環境。支援矩陣將 JetPack 7.2 上的 Jetson Orin 列為「Official」，引擎在裝置上構建，精度為 FP16、INT8、INT4。

- **模型涵蓋範圍：** 支援的檢查點包括 Llama 3.2 1B/3B、Llama 3.1 8B、Qwen2.5（0.5B–14B）、Qwen3（0.6B–8B），以及 Qwen2.5-VL 3B/7B、InternVL3/3.5（1B–14B）等 VLM——皆為 30B 參數以下的稠密檢查點。這不是驗證矩陣：「並非每個列出的檢查點都在所有支援的平台與精度上完整驗證過。」
- **8 GB 的構建參數：** 在 Orin Nano 上構建 INT4 引擎時，傳入 `--externalize-weights int4_ffn`（稠密）或 `--externalize-weights int4_ffn int4_moe`（MoE），以降低引擎構建時的記憶體用量。
- **磁碟空間：** 每個模型工作流程需為 ONNX 檔案與引擎預留約 20–50 GB；本套件沒有內建儲存空間（[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)）。
- **兩條 Quick Start 路徑：** C++ 路徑（在主機上匯出/量化、在裝置上構建引擎、執行），以及伺服器路徑——`tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B`（首次啟動時下載檢查點）。

> **鉅犀提示：** 權威步驟以 NVIDIA 為準——[Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)、[安裝](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)、[支援的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)。0.10.1 的安裝頁指出：「0.10.1 中不發布 wheel，也不是預設安裝路徑。」

## 8 GB 實際上裝得下什麼

- **NVIDIA 在這個模組上實測過的規模上限是 2B 參數。** Edge-LLM 基準測試頁中最大的 Orin Nano（8GB）資料列是 Qwen3.5-2B、4,692 MB：「2B 是 NVIDIA 在 Orin Nano 8 GB 上測試過的最大模型。」
- **原廠教學中有跑 4B 模型的案例。** Jetson AI Lab 教學指出 Qwen3-4B-Instruct INT4 AWQ（權重約 2 GB）可裝進「Orin Nano 的 8 GB 統一記憶體」；InternVL3 1B/2B 用 INT4 AWQ 也能裝下，更大的版本則以 AGX Orin 或 Thor 為目標。（原廠內容。）
- **NVIDIA 記憶體部落格給出的實用上限：** 在 4 位元量化與高效執行環境下，LLM 最高約 10B、VLM 最高約 4B 參數——前提是經過調校的配置。
- **檔案大小不是裝不裝得下的判準——KV cache 也必須放得進去。** 社群回報顯示，12B/26B 等級的 GGUF 模型（gemma4:12b 為 7.4 GB、gemma4:26b 為 16 GB）在 8 GB 板卡上的 Ollama 中失敗：`cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache`。（未經確認。）

## 本套件的官方性能數字

NVIDIA 公布了 **Jetson Orin Nano（8GB）** 的基準測試表——v0.10.0、JetPack 7.2 / CUDA 13.2 / TensorRT 10.16。結果為 MTBench（LLM）與 COCO（VLM）上的執行階段數據，並附峰值 GPU 記憶體：

| 模型 | 類型 | 吞吐量 | 峰值 GPU 記憶體 |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77.0 tok/s | 1,917 MB |
| Qwen3-1.7B | LLM | 36.5 tok/s | 2,992 MB |
| Qwen3-VL-2B | VLM | 36.1 tok/s | 4,486 MB |
| Qwen3.5-0.8B | LLM | 59.1 tok/s | 2,127 MB |
| Qwen3.5-0.8B | VLM | 59.0 tok/s | 2,760 MB |
| Qwen3.5-2B | LLM | 29.6 tok/s | 3,642 MB |
| Qwen3.5-2B | VLM | 29.6 tok/s | 4,692 MB |

Orin 的資料列採用 batch 1 與外部化的 INT4 權重；構建限制：maxInputLen 2048、maxKVCacheCapacity 2200。「正式環境的性能可能因系統層級調校（電源模式、記憶體配置、散熱管理）而有所不同。」

> **重要：** NVIDIA 為 **AGX Orin 64 GB** 公布的每秒 token 表**不適用於**本套件——模組、記憶體頻寬、功耗上限都不同。不要用 AGX Orin 的數字推估 Orin Nano。這裡的 Ollama 或 llama.cpp 路徑沒有任何原廠數字。

## 本套件上的其他執行環境

### Ollama

NVIDIA 員工在開發者論壇上驗證過 JetPack 7.2.1（2026 年 9 月）的現況：原版安裝程式可用——`curl -fsSL https://ollama.com/install.sh | sh`——且 `ollama ps` 應回報 `100% GPU`。「Unsupported JetPack version detected」警告無害。

較舊的版本會退回 CPU，因為其預編譯 CUDA 函式庫缺少 sm_87（Orin 的運算能力）；社群回報指出 Ollama 0.30.11 加入了「CC 87 for CUDA v13」，NVIDIA 員工也確認了此修正。社群仍有一些問題回報（2026 年 8–9 月）——請在你的機器上檢查 `ollama ps`；以 CUDA v13 從原始碼構建仍是最後的退路。

### JetPack 7.2 的 Python wheel

JetPack 7.2 / CUDA 13.2 的 CUDA 版 Python 套件（PyTorch 等）來自 Jetson AI Lab 的 SBSA 索引，NVIDIA 員工也引用它：

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

將它作為 pip 索引使用（`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`）。它提供 aarch64 wheel，例如 torch 2.11.0、torchvision 0.25.0 與 vllm 0.20.0+cu130。沒有 `jp7/*` 索引；JetPack 6 時代的索引是 `jp6/cu126`。CUDA 13.2 將 Orin 統一到了 Arm SBSA 工具包（R595+ 驅動程式）。

### jetson-containers 與 Jetson AI Lab（替代路徑）

[jetson-containers](https://github.com/dusty-nv/jetson-containers) 支援 JetPack 6.2（CUDA 12.6）與 JetPack 7（CUDA 13.x）。主要服務路徑都有預構建的 `-jetson-orin` 映像，包括 `ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` 與 `ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`。

原廠資料中對 8 GB 的提醒：vLLM 範例使用 `--shm-size=16g`（這不是對本套件的容量建議），建議的設定會把 Docker 資料根目錄移到 NVMe，並加入 16 GB 的 swap 檔案（先停用 ZRAM）。

## 為 8 GB 調校

當模型裝不下時：釋放平台記憶體（無頭模式最多可回收約 865 MB）、量化到 4 位元，並刻意規劃 KV cache 與上下文大小——見[8 GB 的記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)。

## 故障排除

- **載入時記憶體不足**——`cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache` 表示模型加上 KV cache 超出了 8 GB 統一記憶體。請改用更小或量化更重的模型，或縮短上下文；若是 Edge-LLM 引擎構建，加上 `--externalize-weights int4_ffn` 並調低 `--maxInputLen` / `--maxKVCacheCapacity`。
- **Ollama 退回 CPU，或出現「Unsupported JetPack version detected」警告**——先更新 Ollama（較舊版本缺少 sm_87）；根據 NVIDIA 員工的說法，此警告在 7.2.1 上無害。用 `ollama ps`（`100% GPU`）確認。
- **版本或設定問題**——見[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)與[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。

## 資料來源

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/)：[支援矩陣](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)、[支援的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)、[安裝](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)、[Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)、[性能基準](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)（查閱於 2026-09-26）
- [JetPack 7.2.1 下載頁](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）
- [NVIDIA 技術部落格——在 NVIDIA Jetson 上最大化記憶體效率，以執行更大的模型](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（查閱於 2026-09-26）
- [NVIDIA 開發者論壇——Jetson 上的 Ollama（員工在 JetPack 7.2.1 上驗證）](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)（查閱於 2026-09-26）
- [NVIDIA 開發者論壇——JetPack 7.2 GPU 加速問題（wheel 索引、sm_87）](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)（查閱於 2026-09-26）
- [NVIDIA 開發者論壇——可在 Jetson Orin Nano Super 8GB 上執行的 AI 模型（社群）](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412)（查閱於 2026-09-26）
- [Jetson AI Lab——TensorRT Edge-LLM 教學](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/)（查閱於 2026-09-26）
- [Jetson AI Lab——完整文件內容（容器映像表）](https://www.jetson-ai-lab.com/llms-full.txt)（查閱於 2026-09-26）
- [jetson-containers（GitHub）](https://github.com/dusty-nv/jetson-containers)（查閱於 2026-09-26）
- [Jetson AI Lab PyPI 索引——sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130)（查閱於 2026-09-26）

*狀態：已於 2026-10-11 審核。內容以所列日期的 NVIDIA 官方文件為依據；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
