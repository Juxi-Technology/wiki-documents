---
title: 記憶體效率——在 8 GB 中執行模型
sidebar_label: 記憶體效率
slug: /tutorials/memory-efficiency
description: >-
  把 LLM、VLM 與視覺工作負載裝進 Jetson Orin Nano Super 開發套件 8 GB 統一
  記憶體、有文件記載的手段——平台、模型與測量三個層面。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# 記憶體效率——在 8 GB 中執行模型

在 Orin Nano Super 套件上，8 GB 統一記憶體對所有東西都是硬性上限：作業系統、桌面、各項服務，以及模型本身。有文件記載的手段分三層——**平台**、**模型**與**測量**——本頁也會標明哪些技術只在更大模組上才有文件記載。

## 用白話說明 8 GB 的預算

- 扣除固件與核心預留後，**8 GB 中約有 7.6 GB 可用**——NVIDIA 記憶體效率部落格所有「可用記憶體」數字都以這個預算為準。
- CPU 記憶體與 GPU 記憶體（CUDA、多媒體緩衝區）來自**同一個實體池**；減少其中一方對另一方也有幫助。
- 部落格的旗艦示範——一條 2B 參數的 VLM 管線——執行時佔用 **4.5 / 7.6 GB（約 60%）**。

## 手段 1——平台層面：作業系統與服務佔用多少

以下節省數字來自 NVIDIA 的記憶體效率部落格。

| 手段 | 文件記載的節省 | 做法 |
|---|---|---|
| 停用圖形桌面（無頭模式） | 最多 865 MB | `sudo systemctl set-default multi-user.target` |
| 停用網路與日誌服務 | 最多 32 MB | `sudo systemctl disable <service-name>` |
| 顯示與攝像頭預留區 | 合計約 100 MB | 修改 BSP 裝置樹後重新刷機 |
| SWIOTLB 預留 | 約 4 MB | 核心參數 `swiotlb=2048`，僅在出現 DMA 問題時使用 |
| DeepStream 式管線 | 最多 412 MB | 容器改為裸機（70 MB）；Python 改為 C++（84 MB）；停用 Tiler/OSD 並使用 FakeSink（258 MB）——見 [DeepStream](/zh-hant/tutorials/jetson-orin-nano/deepstream) |
| 推論框架的選擇 | 避免超過 2.7 GB 的額外負擔 | 精簡的執行環境（C++ runtime、llama.cpp）；較重的框架光是初始化就可能增加超過 2.7 GB |

> **鉅犀提示：** 預留區修改屬於 BSP 原始碼變更：需要重新刷機，而且省下的不多。請一次只改一處，並保留一份可用的刷機映像——見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)。

**swap 不是節省手段，而是洩壓閥。** 原廠的 RAM 最佳化教學以 **NVMe 上的 16 GB swap 檔案**取代 ZRAM（先執行 `sudo systemctl disable nvzramconfig`）；NVIDIA 的 8 GB 示範假設**尖峰時約使用 2 GB swap**。

### 停掉伺服器之後，釋放快取

停掉 vLLM 或 SGLang 伺服器、或 Docker 容器之後，記憶體使用量可能仍居高不下（L4T r39.2.1 已知問題 5661165）。NVIDIA 的指令：

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

同樣的修正也適用於 Edge-LLM 引擎構建記憶體不足時：`sudo sysctl -w vm.drop_caches=3`，再搭配更小的構建限制（原廠教學）。

### 電源模式改變時鐘，不改變容量

| 電源模式 | 模式 ID | CPU 最高時鐘 | GPU 最高時鐘 | 記憶體最高時鐘 |
|---|---|---|---|---|
| 15W | 0 | 1497.6 MHz | 612 MHz | 2133 MHz |
| 25W（預設） | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

上表的時鐘上限來自 NVIDIA 的 r39.2 電源與性能表。電源模式改變的是時鐘頻率，不是記憶體容量——裝不下的模型，換到更快的模式也裝不下。用 `sudo nvpmodel -q`（列出）與 `sudo nvpmodel -m <mode_id>` 切換；MAXN_SUPER 需要 Super 刷機配置，且屬實驗性（依上述表格）。如果找不到 25W 或 MAXN SUPER，見[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。

> **注意：** 過大的 CUDA 記憶體配置可能讓**裝置重新開機**（L4T r39.2.1 已知問題 5699079）。同一份發行說明的指引：確保 CUDA 與其他應用程式不會要求超過實體可用量的記憶體，並以較高的 OOM 分數啟動 CUDA 程序，以免系統程序被殺掉。

## 手段 2——模型層面：模型與其快取佔用多少

### 量化是最大的一項手段

Orin 僅執行 **FP16、INT8 與 INT4 引擎**；FP8 與 FP4 無法在 Orin 上執行（Thor/Blackwell 等級）。使用 TensorRT Edge-LLM 時，請用 **INT4 AWQ 或 INT4 GPTQ** 檢查點，避開 INT8 GPTQ，並且絕不要選 FP8、MXFP8、FP4 或 NVFP4 檢查點。見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)。

原廠數字：Qwen3 8B 從 FP16 改為 W4A16 可回收約 **10 GB**；Qwen3 4B 從 BF16 改為 INT4 可回收約 **5.6 GB**。NVIDIA 針對 4B 案例的圖表標題是「Jetson Orin NX 16 GB」——那是更大的模組，因此請把這些數字當作參考，而不是對 8 GB 的承諾。

在 4 位元量化與高效執行環境下，NVIDIA 文件對這個預算給出的上限是 **LLM 最高約 10B 參數、VLM 最高約 4B 參數**。

### NVIDIA 在 8 GB 上實際測試的是什麼

TensorRT Edge-LLM 公布了 Orin Nano 8 GB 上 0.6B 至 2B 參數模型的資料列（Qwen3 與 Qwen3.5 系列）；**2B 是 NVIDIA 在這個模組上測試的最大模型**。4B INT4 AWQ 有原廠教學（權重約 2 GB），但沒有公布任何官方 4B 數字。

### 引擎構建記憶體（TensorRT Edge-LLM）

- `--externalize-weights int4_ffn`（稠密）或 `--externalize-weights int4_ffn int4_moe`（MoE）可降低系統記憶體較少的 Orin 裝置上的引擎構建記憶體。
- 原廠教學中針對 Orin Nano 調校的限制：`llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`。若構建仍然記憶體不足，先釋放系統記憶體再進一步調低，例如 `--maxInputLen 256 --maxKVCacheCapacity 512`。引擎在裝置上構建，無法在模組之間移植。

### KV cache：大小規劃與複用

KV cache 隨上下文長度、batch 大小與並行度成長；它是記憶體預算的一部分，不是事後才想到的環節。

- 構建限制決定其上限：`--maxInputLen` 與 `--maxKVCacheCapacity`；Orin Nano 基準測試的構建使用 maxInputLen 2048、maxKVCacheCapacity 2200、batch 1。
- **KV cache 複用**是 Edge-LLM 執行環境有文件記載的能力：針對重複輸入前綴的行程內、內容定址快取，讓文件、先前對話輪次、已生成的續寫內容與重複的圖像前綴的 prefill 狀態被重複使用，而不是重新計算。
- 裝得下的模型檔案仍可能失敗：一份社群回報顯示 7.4 GB 與 16 GB 的 GGUF 檔案在 8 GB 板卡上因 KV cache 配置錯誤而失敗——檢查是否裝得下時，要把 KV cache 與執行環境的額外負擔算進去。
- **詞彙表縮減**（把生成限制在工作特定的 token 子集）與**視覺 token 剪枝（DART）**（在 prefill 之前捨棄重複的視覺 token）都是有文件記載的 Edge-LLM 功能頁。視覺引擎構建另接受圖像 token 限制：`--minImageTokens`、`--maxImageTokens`、`--maxImageTokensPerImage`。

> **重要：** FP8 KV cache——約可省下 50% KV cache 記憶體——需要 SM89 或更新（Ada Lovelace 及之後）。Orin 是 SM87，因此**本套件無法使用**。請使用 FP16 KV cache。

### 原廠的前後對照

NVIDIA 的 8 GB 案例研究（記憶體效率部落格，Table 7）：以無頭模式取代完整 GNOME 桌面（1.8 GB → 1.1 GB），再加上 4 位元 GGUF 的 VLM（Q4_K_M，6.6 GB → 2.2 GB）。這條管線先前在 Orin Nano 8 GB 上跑不動（光是 VLM 就用了 87% 的 RAM），現在執行時佔用 **4.5 / 7.6 GB（約 60%）**——省下超過 5.1 GB。「之前」那一欄是在 **Orin NX 16 GB** 上測的：同一組最佳化把工作負載搬到了 8 GB 的套件上。

## 手段 3——測量層面：看清楚記憶體去了哪裡

| 工具 | 顯示內容 | 備註 |
|---|---|---|
| `sudo tegrastats` | CPU、GPU、記憶體、溫度、功耗 | 開發套件使用者指南：nvidia-smi 不是 Jetson 上的主要監控工具 |
| `nvidia-smi dmon` | GPU 使用率 | 依發行說明 5406663；Jetson Power GUI 中的 GPU 使用率「仍在評估中」 |
| `free -h` | 作業系統視角的記憶體 | 不會告訴你 GPU 工作負載能配置多少 |
| procrank | 各行程的實體記憶體（PSS） | `git clone https://github.com/csimmonds/procrank_linux.git`、`cd procrank_linux/`、`make`、`sudo ./procrank` |
| nvmap clients | 持有 GPU/多媒體緩衝區的行程 | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### 「可用記憶體」不是預算

`free -h` 顯示的是作業系統的視角；GPU 配置來自同一個池，但分開計帳。在一份 8 GB 板卡的社群回報中，`cudaMalloc` 為 KV cache 配置失敗時，`free -h` 仍顯示 5.7 GiB「可用」[等級 B，社群回報]。判斷裝不裝得下時，請以約 7.6 GB 的預算為準，而不是「可用」。

### 方法

1. 先確認平台基本狀態——[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)。
2. 記錄基線：閒置時與負載下的記憶體（`tegrastats`）。
3. 只改一項手段，再測一次。如果毫無變化，就改回去。

## 從哪裡開始

依文件記載的節省幅度排序：

1. **執行環境與量化**——NVIDIA 摘要中最大的一層（依部落格 Table 5，推論框架與模型量化約 5–10 GB）。
2. **無頭模式**——最多約 865 MB，一條指令。
3. **管線調校**——最多約 412 MB（DeepStream 式）。
4. **NVMe 上的 swap**——洩壓，不是節省。
5. **預留區與 SWIOTLB**——約 100 MB 與 4 MB，還要重新刷機。放最後。

如果模型還是裝不下，問題在模型，不在設定：換更小的、量化更重的、縮短上下文，或減小 batch——見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)與[常見問題](/zh-hant/tutorials/jetson-orin-nano/faq)。

## 資料來源

- [NVIDIA 技術部落格——在 NVIDIA Jetson 上最大化記憶體效率，以執行更大的模型](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（7.6 GB 預算、桌面 865 MB、網路/日誌 32 MB、預留區、SWIOTLB、管線節省、量化與前後對照表、procrank 安裝步驟與 nvmap clients；查閱於 2026-09-26）
- TensorRT Edge-LLM 文件：[支援的模型](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8 KV Cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [性能基準](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Quick Start 指南](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · 功能頁：[KV cache 複用](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [詞彙表縮減](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [視覺 token 剪枝（DART）](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)（查閱於 2026-09-26）
- Jetson Linux 文件：[r39.2.1 發行說明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（問題 5661165、5699079、5406663）· [電源與性能，r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [開發套件操作指南（Dev Kit How-To）](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（查閱於 2026-09-26）
- Jetson AI Lab：[TensorRT Edge-LLM 教學](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [RAM 最佳化](https://www.jetson-ai-lab.com/tutorials/ram-optimization/)（Orin Nano 構建限制；NVMe swap；查閱於 2026-09-26）
- [NVIDIA 開發者論壇——Jetson 上的 Ollama](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)（社群：free -h 對比 cudaMalloc；等級 B；查閱於 2026-09-26）

*狀態：草稿，待 cheny 審核。內容依據所列日期的 NVIDIA 官方文件；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
