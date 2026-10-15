---
title: 智能體 AI——8 GB Orin Nano 上的 NemoClaw
sidebar_label: 智能體 AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  在 8 GB 的 Jetson Orin Nano Super 開發套件上安裝並執行 NVIDIA NemoClaw
  常駐智能體技術棧——官方安裝、對 8 GB 的誠實預期，以及安全注意事項。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 智能體 AI——8 GB Orin Nano 上的 NemoClaw

你的套件可以執行 NVIDIA NemoClaw——一個以單一指令安裝的常駐自主智能體。本頁涵蓋 NemoClaw 是什麼、官方安裝方式、圍繞它的智能體技能、對 8 GB 的誠實預期，以及它要求你做的安全決策。

## NemoClaw 是什麼

NVIDIA 將 NemoClaw 描述為「一套用於構建自主智能體的開放藍圖集合」——能夠推理、規劃並在真實工作流程中行動的常駐 AI 系統。它捆綁了智能體框架（OpenClaw、Hermes、LangChain Deep Agents）與 NVIDIA Agent Toolkit 組件：Nemotron 模型、NeMo 與 OpenShell 執行環境策略控制。

OpenShell 是安全層：「其內部的安全執行環境，強制限定智能體可以存取什麼：檔案、網路、憑證與工具。」

NemoClaw 是 alpha 軟體——NVIDIA 標記為「Early preview」（自 2026-03-16 起）。產品頁：<https://www.nvidia.com/en-us/ai/nemoclaw> · Build-a-Claw 資源中心：<https://www.nvidia.com/en-us/ai/build-a-claw/>

## 安裝——官方單一指令

在套件上執行 NVIDIA 的安裝程式：

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

這會安裝預設框架 **OpenClaw**。另外兩種可用環境變數選擇：

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

在本套件上，安裝程式會自動偵測 Jetson（Orin 與 Thor），並先套用 JetPack 主機配置；在 L4T 39.x 上，它只在缺少時載入 `br_netfilter` 模組（少了它，沙箱會無法完成 DNS 解析，初始設定會卡在「Setting up OpenClaw inside sandbox」）。如果你選擇 Ollama，安裝程式也會一併安裝：「腳本也會安裝 ollama（若有選取），因此你不必事先手動安裝」（NVIDIA 員工）。NVIDIA 網站記載了這台裝置：「Install OpenClaw on Your NVIDIA Jetson Orin Nano」——「Jetson 上完全本地的 AI 個人助理……不需要任何雲端 API。」

> **重要：** NemoClaw 的平台支援矩陣（v1.1，2026-09-04）沒有 Jetson 資料列；它測試過的平台是 Linux（Ubuntu 24.04）與 DGX OS Spark。Orin Nano 的支援在實務上是真的——安裝程式會偵測到板卡，NVIDIA 也記載了這個流程——但它並未以正式支援的形式公布，所以請預期還會有粗糙之處。

這裡要緊的需求（出自 NVIDIA 的 NemoClaw 前置條件頁）：

| 需求 | 最低／建議 | 在本套件上 |
|---|---|---|
| RAM | 8 GB / 16 GB | 總計 8 GB——正踩在門檻上 |
| 可用磁碟 | 20 GB | 沒有內建儲存；請用 microSD 或 NVMe（[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)） |
| Node.js / npm | 22.19+ / 10+ | 需另行安裝 |
| 容器執行環境 | Docker Engine / Desktop / Colima | Socket 修正：`sudo usermod -aG docker $USER`，然後 `newgrp docker` |

## 安裝之後——第一次工作階段

NVIDIA 員工為 Orin 流程指向 [Jetson AI Lab 實作指南](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)（原廠指南）：

1. `curl -fsSL https://ollama.com/install.sh | sh`——或跳過這步；NemoClaw 安裝程式也能安裝 Ollama。
2. 下載一個 4B 等級的工具呼叫模型，例如 Nemotron3 Nano 4B（指南中的 `nemotron-3-nano:30b` 範例是給更大裝置用的）。
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. 初始設定：選擇 Ollama 作為模型來源，並選擇仍能運作的最嚴格沙箱政策層級。
5. `source ~/.bashrc`，然後 `nemoclaw my-assistant connect`；用 `openclaw tui` 啟動智能體。

## 智能體技能

NVIDIA 也提供**智能體技能**——以開放 Agent Skills 格式打包的工作流程，用裝置特定的自動化來擴充 AI 編碼助手（Claude Code、Cursor、Codex）。這個時期有文件記載的有兩個領域：

- **實體 AI（機器人）。** Isaac ROS 提供一份智能體技能目錄——據 NVIDIA 所述，任務包括啟動 Isaac ROS 開發容器、拉起 Mission Control 雲端技術棧。目錄位於 <https://github.com/nvidia/skills>（「Physical AI」類別），以 `npx` 安裝（Node.js 不是標準 Isaac ROS 環境的一部分）。Isaac ROS 5.0 新增了 `isaac-ros-activate` CLI 與早期存取的 `migrate-node-to-rosidl-buffer` 技能。見[機器人](/zh-hant/tutorials/jetson-orin-nano/robotics)。
- **視頻管線。** L4T r39.2.1 發行說明在「What's New」項目中列有「視頻管線的智能體技能」。

一個誠實的缺口：本頁的來源記載了 NVIDIA 為 Isaac ROS（實體 AI）與視頻管線提供的智能體技能；沒有任何來源記載 NemoClaw 專屬的技能目錄。

## 對 8 GB 的務實預期

一個常駐智能體、一個本地模型與 Ubuntu 桌面，無法同時從容地裝進本套件。有文件記載的預算：

- **可用記憶體約 7.6 GB，而不是 8 GB。** NVIDIA：「8 GB 實體 DRAM 中，扣除固件與核心預留後約有 7.6 GB 可用。」
- **8 GB 是 NemoClaw 的門檻，不是舒適區。** 前置條件把 8 GB 列為最低、16 GB 為建議：「在 RAM 少於 8 GB 的機器上，這樣合計的使用量可能觸發 OOM killer。如果無法加記憶體，請配置至少 8 GB swap 來繞過問題，代價是效能變慢。」本套件的記憶體是固定的——請規劃 swap 檔案（[記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)）。約 2.4 GB 的沙箱映像推送，已經在 8 GB 的 Orin Nano 上觸發過 OOM。
- **智能體與桌面會在模型載入之前先佔記憶體。** NVIDIA 論壇上的一份社群指南把 OpenClaw 執行環境估為最多約 1 GB；停用圖形桌面最多可釋出約 865 MB（NVIDIA 的數字），而一份社群測量把 GNOME 計為超過 600 MB。
- **過大模型的失敗案例，有 NVIDIA 論壇上的社群回報為證。** 8 GB 板卡上的 Ollama 無法載入 7.4 GB 與 16 GB 的模型：`cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache`。單看檔案大小不是裝不裝得下的判準——KV cache 也必須放進同一塊 8 GB。

依來源所述，什麼裝得下：NVIDIA 驗證過的 Ollama 預設值（`qwen3.6:35b`、`nemotron-3-nano:30b`、`qwen3.5:9b`）是為更大的機器準備的；Jetson AI Lab 指南說要從 4B 等級的工具呼叫模型開始——「它可以用，但效能可預期會比 30B 等級的模型弱」；NVIDIA 的記憶體部落格則把調校後的 4 位元上限訂在 LLM 最高約 10B、VLM 最高約 4B 參數——那是專用配置的上限，不是還能同時容納桌面與智能體的預算。

NVIDIA 沒有公布 Ollama 在此裝置上的每秒 token 數字；對外部的速度宣稱請謹慎看待（見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)）。

> **鉅犀提示：** 要在這裡得到可行的常駐配置，請規劃無頭模式、4B 等級的量化模型，以及能滿足 20 GB 需求與 swap 檔案的 NVMe 儲存。這與來源所述的內容一致；任何更大的配置都未經驗證。

## Ollama 與智能體注意事項——NVIDIA 員工確認

NVIDIA 員工在其開發者論壇上除錯了 Orin Nano + JetPack 7.2 + Ollama 流程，並於 2026 年 9 月在 JetPack 7.2.1 上重新驗證了 Ollama。

- **先檢查 GPU。** `ollama ps` 應在 PROCESSOR 欄顯示 `100% GPU`；如果顯示 CPU，智能體會非常慢。
- **有文件記載的失敗案例（2026 年 6 月）。** 在全新刷機的 JetPack 7.2 Orin Nano 上以 NemoClaw + Ollama 執行時，`openclaw tui` 開得起來但從不回應（「Autocompaction could not recover this turn」）。NVIDIA 重現了問題：Ollama 跳過了 GPU 探索（退回 CPU），而沙箱的上下文視窗只有 4096 token。員工的修正把以下幾行寫入 `/etc/systemd/system/ollama.service.d/override.conf`：

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  然後執行 `sudo systemctl daemon-reload && sudo systemctl restart ollama`；在沙箱內（`nemoclaw my-assistant connect`），把 `.openclaw/openclaw.json` 中的 `contextWindow` 提高到 32768 並重新整理配置雜湊。回報者確認 Ollama 之後就在 GPU 上執行了。
- **現況：應該不再需要這個暫時解法。** 員工於 2026 年年中表示：「此問題已在最新的 ollama 版本中修正。不再需要該暫時解法（override.conf）。」在 JetPack 7.2.1 上，上游安裝程式可用，`ollama ps` 回報 100% GPU；「WARNING: Unsupported JetPack version detected」這行無害。請先測試原版安裝。
- **如果 Ollama 仍然退回 CPU：** 先更新 Ollama。一位論壇使用者刪除過時的 `/usr/local/lib/ollama/cuda_v12` 目錄後，修好了持續退回 CPU 的問題（員工確認可移除）。把 override.conf 留作最後手段——NVIDIA 就是在這款套件上用這個方法成功的。

## 常駐智能體的安全

常駐智能體是一個帶著憑證與工具存取權、在你沒盯著時仍持續運作的程式。在存放你資料的裝置上，這是真實的風險：一個擁有工具與 shell 存取權的智能體，可以讀取、修改或送出它能觸及的任何東西。

**善用政策層。** NVIDIA 描述 OpenShell 為「其內部的安全執行環境，強制限定智能體可以存取什麼：檔案、網路、憑證與工具」。在初始設定時，選擇仍能完成工作的最嚴格沙箱政策層級（Jetson AI Lab 實作指南建議選最嚴格的層級）。

**憑證。** 給智能體限定範圍、可撤銷的憑證——專用的金鑰與帳號，絕不要用你個人的。智能體能讀到的任何東西，它都能複製；它能使用的任何東西，都可能被誘導去使用。通訊整合是以你的身分行動：NVIDIA 的 Orin Nano 頁面展示了 OpenClaw + WhatsApp 的範例，所以請使用專用帳號或號碼。

**網路曝露。** 讓本地服務待在 localhost——NVIDIA 員工在此的 Ollama 配置把它綁定到 `127.0.0.1`（`OLLAMA_HOST=127.0.0.1:11434`）。不要把智能體儀表板、控制 API 或模型伺服器曝露到公開網際網路；需要遠端存取時，請使用你能控制的通道或 VPN。安裝需要 Docker（Engine/Desktop/Colima，依上方需求）加上沙箱化的容器叢集（OpenShell 閘道在內部執行 k3s）與 sudo 權限。

**操作習慣。** 從有人看管開始——先觀察智能體做了什麼，再讓它無人看管。不要給它你無法撤銷或復原的權限，並保留備份與復原路徑（見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)）。NemoClaw 是 alpha 軟體（「Early preview」）；請把沙箱當成多層防護中的一層，而不是唯一的一層。

> **注意：** 因為這個技術棧在本機執行（「不需要任何雲端 API」），安全邊界就是你的裝置、你的網路與你的憑證。讓智能體持續運作之前，請把這三者都檢查一遍。

## 資料來源

- [NVIDIA NemoClaw 產品頁](https://www.nvidia.com/en-us/ai/nemoclaw)（查閱於 2026-09-26）——定義、框架、安裝指令、OpenShell。
- [NVIDIA Build-a-Claw 資源中心](https://www.nvidia.com/en-us/ai/build-a-claw/)（查閱於 2026-09-26）——Orin Nano 安裝章節。
- [NemoClaw——前置條件](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md)與[平台支援](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md)（查閱於 2026-09-26）
- [NemoClaw——故障排除（Jetson 主機配置）](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx)（查閱於 2026-09-26）
- [NVIDIA 開發者論壇——JetPack 7.2 上 Orin Super 的 NemoClaw（NVIDIA 員工修正）](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)（查閱於 2026-09-26）
- [NVIDIA 開發者論壇——Jetson 上的 Ollama（員工驗證）](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)與 [JetPack 7.2 GPU 加速](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)（查閱於 2026-09-26）
- [NVIDIA 技術部落格——在 NVIDIA Jetson 上最大化記憶體效率](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（查閱於 2026-09-26）
- [NVIDIA 開發者論壇——可在 Orin Nano Super 8GB 上執行的 AI 模型（社群指南）](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412)（查閱於 2026-09-26）
- [Jetson AI Lab——NemoClaw 教學（原廠指南）](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)（查閱於 2026-09-26）
- [Isaac ROS——Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html)與[發行說明](https://nvidia-isaac-ros.github.io/releases/index.html)（查閱於 2026-09-26）
- [Jetson Linux r39.2.1 發行說明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（查閱於 2026-09-26）——「Agent skills for video pipelines」這項 What's New 內容。

*狀態：已於 2026-10-11 審核。內容以所列日期的 NVIDIA 官方文件、NVIDIA 開發者論壇貼文與 Jetson AI Lab 原廠指南為依據；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
