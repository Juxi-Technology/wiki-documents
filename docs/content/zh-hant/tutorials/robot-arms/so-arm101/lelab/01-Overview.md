---
title: "1 · 總覽"
description: "LeLab 用瀏覽器完成 LeRobot 全流程——校準、遙操作、錄製、訓練、回放:能做什麼、環境要求與檔案存放位置。"
---

# 1 · 總覽

> **下一篇**：[02 安裝與啟動](02-Install.md)

LeLab 是一個網頁應用程式，把 LeRobot 的工作流程——校準、遙操作、錄製、訓練、回放——收進同一個瀏覽器視窗。

## 能做什麼

| 頁面 | 功能 |
|---|---|
| **Calibration 校準** | 兩條手臂的引導式校準 |
| **Teleoperation 遙操作** | 移動主臂；從臂跟隨，並即時串流關節位置 |
| **Recording 錄製** | 搭配攝影機，把示範錄成 LeRobotDataset |
| **Datasets 資料集** | 逐格瀏覽磁碟上的 episode，附關節運動軌跡 |
| **Training 訓練** | 啟動 LeRobot 訓練任務並觀看日誌 |
| **Inference 推論** | 在從臂上執行訓練好的策略 |
| **Upload 上傳** | 把資料集推送到 Hugging Face Hub |

## LeLab 與 LeRobot

LeRobot 是那套函式庫——機械手臂驅動、資料集格式、訓練程式碼。LeLab 是呼叫它的 FastAPI 伺服器，再加上一個透過 HTTP 與 WebSocket 跟該伺服器溝通的 React 前端。

- LeLab 沒有開放的功能，一樣能透過 `lerobot-*` 命令列使用。
- LeLab 不隨附 LeRobot。安裝 LeLab 就會安裝 LeRobot。

## 需求

| | |
|---|---|
| 機械手臂 | **SO-101 主臂 + 從臂**——唯一支援的配置 |
| 電腦 | Linux、macOS 或 Windows |
| Python | **3.12 或更新版本** |
| Node.js | 22——僅 `lelab --dev` 需要 |
| USB | 兩個空閒埠，每條手臂一個 |

校準、遙操作與錄製在筆電上就能跑。訓練是吃重的那一步，LeLab 可以改在 Hugging Face Hub 上執行——見[第 6 篇](06-Train-and-Inference.md)。

## 檔案放在哪

在 `~/.cache/huggingface/lerobot/` 底下：

| 路徑 | 內容 |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | 主臂校準檔 |
| `calibration/robots/so101_follower/*.json` | 從臂校準檔 |
| `ports/leader_port.txt` · `ports/follower_port.txt` | 上次使用的序列埠 |
| `saved_configs/*.txt` | 上次選用的校準設定檔 |

資料集放在 LeRobot 放的位置——預設是同一棵目錄樹。

清掉那個快取，或重新安裝，就表示兩條手臂都要重新校準。見[疑難排解](07-Troubleshooting.md)。

## 術語

LeRobot 依角色為手臂命名；LeLab 的 API 對同樣兩條手臂用了另一套名稱：

| 你說 | LeRobot / LeLab 說 |
|---|---|
| 你用手移動的那條手臂 | **leader** · **teleop** |
| 跟隨的那條手臂 | **follower** · **robot** |

---

> **下一篇**：[02 安裝與啟動](02-Install.md)

<RelatedProducts slugs="so-arm101" />
