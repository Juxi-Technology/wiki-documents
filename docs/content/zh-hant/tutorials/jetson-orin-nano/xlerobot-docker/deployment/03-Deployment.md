---
title: 03 · 部署
---

# 03 · 部署

> **上一篇**：[02-Environment-Setup](02-Environment-Setup.md)
> **接下來選一條路**：[xlerobot/](../xlerobot/01-Operation.md)（整機）
> 或 [lerobot/](../lerobot/01-Operation.md)（單臂 / LeKiwi）

把鏡像拉到本機、啟動容器。做完這一篇，你會進入一個裝好所有必要環境的 shell 裡。

---

## 1. 取得鏡像

只有一個鏡像：

```bash
docker pull chenyang310/xlerobot:jetson
```

| | |
|---|---|
| 架構 | `arm64` |
| 執行平台 | Jetson + JetPack 7.2 |
| 下載大小 | 約 3.6 GB（解壓後更大——請預留 20 GB 空間） |
| 包含 | 遙操作、校準、錄製資料、訓練與推理，**GPU 加速** |

確認已拉取成功：

```bash
docker images | grep xlerobot
```

你應該看到 `chenyang310/xlerobot` 帶有 `jetson` 標籤。

> **中國大陸**：直接拉取即可——不需要鏡像加速器。如果太慢，見
> [02-Environment-Setup](02-Environment-Setup.md) 第 2 節。

### 自行建置（維護者）

適合需要修改、或者想從最新原始碼建置的情況。

```bash
git clone <repository-url> xlerobot-docker
cd xlerobot-docker

bash scripts/build.sh jetson
```

建置腳本已經設定好中國大陸的來源（阿里雲 PyPI、阿里雲 Ubuntu 來源），
**不需要額外設定就能在中國大陸的網路環境下建置**。

> 首次建置需要下載約 2 GB 相依套件，慢速網路下要花一兩個小時。
> 用 `scripts/sync.sh` + 板子上的 `wheels/` 快取可以沿用已下載的套件。

---

## 2. 鏡像裡有什麼

一個鏡像，應有盡有：

- **遙操作與校準** —— 用手拖動機器人並保存其校準
- **錄製與回放資料**
- **訓練** —— ACT、Diffusion Policy、SmolVLA、π₀、π₀.₅、Wall-OSS
- **推理** —— 在機器人上執行訓練好的策略，**GPU 加速**

---

## 3. 啟動容器

### 3.1 使用腳本啟動（推薦）

如果你已經複製了儲存庫：

```bash
bash scripts/run.sh jetson
```

腳本已經設定好了這些項目：

- **GPU** —— `--device nvidia.com/gpu=all`（CDI）
- **裝置直通** —— 串口、攝影機、USB
- **網路** —— `--network host`，VR 遙操作和 web 控制需要
- **原始碼掛載** —— 改程式碼不用重新建置鏡像
- **快取掛載** —— 校準檔案和模型下載會保留

### 3.2 手動啟動

不用腳本的話，最小可用指令：

```bash
docker run -it --rm \
  --name xlerobot \
  --device nvidia.com/gpu=all \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson
```

**每個參數的作用：**

| 參數 | 為什麼需要 |
|---|---|
| `--device nvidia.com/gpu=all` | **把 GPU 交給容器**（透過 CDI）。沒有它容器完全沒有 GPU |
| `--privileged` + `-v /dev:/dev` | 串口（SO-101 舵機）、攝影機、USB 直通 |
| `--network host` | host/client 雙行程通訊（ZMQ），以及 VR 控制 |
| `-v ~/.cache/huggingface` | **校準檔案**和模型快取。不掛載的話每次重開容器都要重新校準 |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | 要跑視覺化時使用（rerun 開啟視窗） |
| `-e HF_ENDPOINT` | `huggingface.co` 從中國大陸完全無法連線，必須走鏡像 |

> 掛載路徑裡的 `/home/jetson` 是**鏡像內部**的使用者目錄——寫死它是對的，
> 因為那個鏡像的使用者就叫 `jetson`。

進去之後是一個 bash，工作目錄是 `/opt/xlerobot`。

---

## 4. GPU 參數 —— CDI 的做法

鏡像**必須**透過 CDI 提供 GPU，**不能用 `--runtime nvidia`**：

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

首次使用前需要在**宿主機**上產生 CDI 規格：

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **踩過的坑**：JetPack 7.2 上 `nvidia-container-toolkit 1.19.1` 的
> `enable-cuda-compat` 鉤子會崩潰（`slice bounds out of range`），
> 導致容器根本無法啟動。加上參數把它停用即可：
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> 容器 CUDA 版本和宿主機一致時不需要這個鉤子。

### 驗證 GPU 可用

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. 平台專項

### Jetson Orin 系列 —— ✅ 目前正式支援

| 型號 | 需要 | 說明 |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | 我們實測的板子（3.4 GB 記憶體也能跑遙操作） |
| **Orin NX** | JetPack **7.2** | 同上 |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 **不支援** AGX Orin 64GB，必須 7.2 |

**唯一硬性要求是 JetPack 版本**：鏡像裡的 torch 是 CUDA 13.0 編譯的，
而 CUDA 13.x 要求驅動程式 **≥ 580**。

| JetPack | L4T | CUDA | 驅動程式 | 能用嗎 |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ 驅動程式太舊 |
| **7.2** | 39.2 | 13.2 | 595 系 | ✅ |

查看你的版本：

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ 從 JetPack 6.x 升到 7.x **不能用 `apt upgrade` / OTA**（OTA 只在同一
> L4T 大版本內可用），必須整機重刷。

### Jetson Nano（2019 原版）—— ❌ 永遠不支援

三個獨立的原因，都是死結：

1. **CUDA 13 把 Maxwell 架構整個刪掉了**。驅動程式 R580 是最後一個支援
   Maxwell / Pascal / Volta 的分支，而 CUDA 13 需要的正是 580+。
   Jetson Nano 最高只能停在 JetPack 4.6.6 / CUDA 10.2。
2. **算力 5.3 低於 torch 支援的下限**。本鏡像裡 torch 編譯的架構是
   `sm_80 / sm_90 / sm_100 / sm_110 / sm_120`——最低 sm_80，
   而 Jetson Nano 是 sm_53，既沒有原生 kernel，PTX 即時編譯也夠不著。
3. **平台已 EOL**（JetPack 4 於 2024 年 11 月停止維護）。

### 其他平台 —— ❌ 不支援

樹莓派、一般 x86 電腦、Windows 和 macOS **都無法執行這個鏡像**。它是針對
JetPack 7.2 的 CUDA 堆疊建置的，且只發布 `arm64`，所以沒有 CPU 版可以退而求其次。
請使用 Jetson Orin 板子。

> 檢查你手上有什麼：`uname -m` 應該印出 `aarch64`，`cat /etc/nv_tegra_release`
> 應該回報 **R39**。

---

## 進入容器之後

先做個自檢：

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

預期輸出：

```
torch 2.11.0+cu130
lerobot 0.6.2
```

> ⚠️ **`xlerobot` 和 `xlerobot_mecanum` 不能放在同一個行程裡**——兩者在原始碼裡
> 都註冊成 `"xlerobot"`（XLeRobot 上游的 bug），會出現
> `Cannot register ... as xlerobot because ... already registered`。
>
> 其他組合都沒問題：**原版 LeRobot 的機器人和 XLeRobot 可以同行程共存**
> （實測 8 個類型同時註冊成功），`xlerobot_2wheels` 也不衝突。
> 一台機器人只用一個變體，正常使用不受影響。

---

> **接下來選一條路**：[xlerobot/](../xlerobot/01-Operation.md) 整機 ·
> [lerobot/](../lerobot/01-Operation.md) 單臂 / LeKiwi
