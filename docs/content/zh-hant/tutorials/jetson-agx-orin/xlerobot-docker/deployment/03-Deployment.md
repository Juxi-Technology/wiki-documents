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

### 方式 A：直接拉取（推薦）

```bash
docker pull chenyang310/xlerobot:cpu-slim
```

`cpu-slim` 是精簡版（約 660 MB 下載量），包含遙操作、校準、錄製資料所需的一切。

想要完整版（含視覺化、訓練、Diffusion 策略）：

```bash
docker pull chenyang310/xlerobot:cpu
```

### 方式 B：自行建置

適合需要修改、或者想使用最新原始碼的情況。

```bash
git clone <本儲存庫網址> xlerobot-docker
cd xlerobot-docker

# 通用 CPU 版
bash scripts/build.sh cpu

# Jetson GPU 版（在 Jetson 上執行）
bash scripts/build.sh jetson
```

建置腳本已經設定好中國大陸的來源（阿里雲 PyPI、阿里雲 Ubuntu 來源），
**不需要額外設定就能在中國大陸的網路環境下建置**。

> 首次建置需要下載約 2 GB 相依套件，慢速網路下要花一兩個小時。
> 用 `scripts/sync.sh` + 板子上的 `wheels/` 快取可以沿用已下載的套件。

---

## 2. 各版本的差異

| 鏡像 | 大小 | 包含 | 適用 |
|---|---|---|---|
| `cpu-slim` | 約 660 MB | 遙操作、校準、ACT 策略推理 | 只需要跑機器人 |
| `cpu` | 約 1 GB | 上述功能 + 視覺化、錄製資料、訓練、Diffusion | 要做完整流程 |
| `jetson` | 約 3.6 GB | CPU 版 + **CUDA 加速** | Jetson，需要 GPU 推理 |

---

## 3. 啟動容器

### 3.1 使用腳本啟動（推薦）

如果你已經複製了儲存庫：

```bash
# 通用版
bash scripts/run.sh cpu

# Jetson 版（會自動加上 GPU 參數）
bash scripts/run.sh jetson
```

腳本已經設定好了這些項目：

- **裝置直通** —— 串口、攝影機、USB
- **網路** —— `--network host`，VR 遙操作和 web 控制需要
- **原始碼掛載** —— 改程式碼不用重新建置鏡像
- **快取掛載** —— 校準檔案和模型下載會保留

### 3.2 手動啟動

不用腳本的話，最小可用指令：

```bash
docker run -it --rm \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:cpu-slim
```

**每個參數的作用：**

| 參數 | 為什麼需要 |
|---|---|
| `--privileged` + `-v /dev:/dev` | 串口（SO-101 舵機）、攝影機、USB 直通 |
| `--network host` | host/client 雙行程通訊（ZMQ），以及 VR 控制 |
| `-v ~/.cache/huggingface` | **校準檔案**和模型快取。不掛載的話每次重開容器都要重新校準 |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | 要跑視覺化時使用（rerun 開啟視窗） |
| `-e HF_ENDPOINT` | `huggingface.co` 從中國大陸完全無法連線，必須走鏡像 |

進去之後是一個 bash，工作目錄是 `/opt/xlerobot`。

---

## 4. Jetson 的 GPU 參數 ⚠️ 與其他平台不同

Jetson 版**必須**透過 CDI 提供 GPU，**不能用 `--runtime nvidia`**：

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

### 樹莓派 / 一般 Ubuntu / x86 電腦 —— ⏳ 暫未支援

鏡像**設計上**是支援的——通用 CPU 版基於 `python:3.12-slim`，
這個基礎鏡像官方同時發布 amd64 和 arm64 兩個版本。

但**目前發布出去的 CPU 版還沒有做成多架構**（建置腳本是普通的
`docker build`，產出的只是建置機器那一個架構）。所以現在拉下來可能
只有 amd64 或只有 arm64，另一半平台用不了。

等做了多架構建置（`docker buildx build --platform linux/amd64,linux/arm64`）
再開放這部分，那之前**請只在 Jetson Orin 上用**。

> 不確定自己的鏡像能不能用：<code v-pre>docker image inspect &lt;鏡像&gt; --format '{{.Architecture}}'</code>，
> 和 `uname -m` 對一下。

---

## 進入容器之後

先做個自檢：

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

預期輸出：

```
torch 2.11.0+cu130     ← Jetson 版；CPU 版顯示 +cpu
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
