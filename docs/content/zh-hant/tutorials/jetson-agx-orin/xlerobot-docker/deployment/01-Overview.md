---
title: 01 · 總覽
---

# 01 · 總覽

> **上一篇**：無，這是第一篇
> **下一篇**：[02-Environment-Setup](02-Environment-Setup.md)

這一篇講清楚：**XLeRobot 的完整工作流程是什麼、需要什麼硬體、你的機器支不支援。**

---

## 工作流程

XLeRobot 的完整流程分為四步：

```
① 校準機器人  →  ② 遙操作採集資料  →  ③ 訓練模型  →  ④ 部署模型自主運行
   calibrate        record              train           eval / rollout
```

Docker 鏡像把這四步需要的**軟體環境**全都裝好了——Python、PyTorch、
LeRobot、XLeRobot 的機器人程式碼、舵機和相機驅動程式。你不用再費心處理版本衝突。

**你需要自己準備的**只有：一台機器人（或先讓軟體跑通）、一台電腦、一條 USB 線。

---

## 硬體支援

| 平台 | 支援情況 |
|---|---|
| **Jetson Orin 系列**（JetPack 7.2） | ✅ **目前正式支援的平台**，可用 GPU 加速 |
| Jetson Nano（2019 原版） | ❌ 不支援——算力太低，見下 |
| 樹莓派 / 一般 Ubuntu / x86 電腦 | ⏳ **暫未支援**，見下 |
| Windows / macOS | ❌ 不支援（串口和攝影機直通在 Linux 上才順暢） |

> 💡 **目前這份鏡像只面向 Jetson Orin 裝置。**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**：需要 **JetPack 7.2**
>   （L4T 39.2 / CUDA 13.2）。AGX Orin 64GB 也是 7.2 才完整支援。
> - **Jetson Nano（2019 原版）**：❌ 永遠不行。它是 Maxwell 架構（算力 5.3），
>   而 CUDA 13 已經整個刪掉了 Maxwell 支援，torch 最低也要求 sm_80。
> - **樹莓派 / x86 電腦**：鏡像設計上支援（通用 CPU 版基於 `python:3.12-slim`，
>   該基礎鏡像官方有 amd64 和 arm64 兩個版本），
>   但**目前發布出去的 CPU 版還沒有做成多架構**，
>   拉下來可能只有 amd64 或只有 arm64。等做了多架構建置再開放。
>
> 記憶體建議 4 GB 以上。Jetson Orin Nano 的 3.4 GB 也能跑遙操作，
> 但訓練會吃力。

### 系統需求

- Ubuntu 20.04 / 22.04 / 24.04，或 Debian 12+
- 樹莓派：需要 64 位元系統（`uname -m` 顯示 `aarch64`）
- 核心支援 USB 串口（一般都有）

### 檢查你的架構

```bash
uname -m
```

- `aarch64` → 樹莓派、Jetson（使用 arm64 鏡像）
- `x86_64` → 一般電腦（使用 amd64 鏡像）

---

## 你需要讀的資料夾

| # | 資料夾 | 內容 | 什麼時候看 |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md)（就是這裡） | **拉取鏡像、執行鏡像** | 第一次用，按 `01` → `02` → `03` 順序讀 |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **XLeRobot 整機執行指令** | 你有整機（雙臂 + 底盤）時 |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **原版 LeRobot 執行指令** | 你只有單條 SO-101 / SO-100 臂或 LeKiwi 時 |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | 常見問題與速查 | 出問題時 |

> ⚠️ **第 2 個和第 3 個資料夾是二選一**——看你的硬體：
> - **XLeRobot 整機**（雙臂 + 底盤）→ 進 `xlerobot/`
> - **單條 SO-101 / SO-100 臂**、**LeKiwi** → 進 `lerobot/`
>
> 鏡像是同一套環境，兩條路隨時可以切，不用重裝任何東西。

---

## 最短路徑（只想先跑通）

**在 Jetson 上（JetPack 7.2）**，幾個指令先讓機器人動起來，再回頭讀細節：

```bash
# 1. 裝 Docker（已經裝了跳過）
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. 給容器開 GPU 通道（Jetson 特有，只需做一次）
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. 拉鏡像（約 3.6 GB）
docker pull chenyang310/xlerobot:jetson

# 4. 啟動容器
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. 容器裡跑遙操作（首次會自動進入校準引導）
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ 捷徑跳過了兩件**遲早要做**的事，卡住了再回頭看對應章節：
> - **中國大陸鏡像加速器**（第 3 步可能卡住）→ [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` 不能省**（這個鉤子在
>   JetPack 7.2 上有 bug，會讓容器起不來）→ [03-Deployment §4](03-Deployment.md)
>
> 上面第 5 步跑的是 **XLeRobot 整機**的範例。如果你只有單條 SO-101 臂，
> 換用 `lerobot-*` 命令列，見 [lerobot/](../lerobot/01-Operation.md)。

---

> **下一篇**：[02-Environment-Setup](02-Environment-Setup.md) —— 安裝 Docker、設定中國大陸加速、接上硬體
