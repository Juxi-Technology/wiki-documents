---
title: 03 · 部署
---

# 03 · 部署

> **上一篇**：[deployment/02-Environment-Setup](02-Environment-Setup.md)
> **接下来选一条路**：[xlerobot/](../xlerobot/01-Operation.md)（整机）
> 或 [lerobot/](../lerobot/01-Operation.md)（单臂 / LeKiwi）

把镜像拉到本机、启动容器。做完这一篇，你会进到一个装好一切环境的 shell 里。

---

## 1. 拿到镜像

### 方式 A：直接拉取（推荐）

```bash
docker pull chenyang310/xlerobot:cpu-slim
```

`cpu-slim` 是精简版（约 660 MB 下载量），包含遥操作、校准、录制数据所需的一切。

想要完整版（含可视化、训练、Diffusion 策略）：

```bash
docker pull chenyang310/xlerobot:cpu
```

### 方式 B：自己构建

适合需要改动、或者想用最新源码的情况。

```bash
git clone <本仓库地址> xlerobot-docker
cd xlerobot-docker

# 通用 CPU 版
bash scripts/build.sh cpu

# Jetson GPU 版（在 Jetson 上执行）
bash scripts/build.sh jetson
```

构建脚本已经配好了国内源（阿里云 PyPI、阿里云 Ubuntu 源），
**不需要额外配置就能在国内网络下构建**。

> 首次构建要下载约 2 GB 依赖，慢速网络下要一两个小时。
> 用 `scripts/sync.sh` + 板子上的 `wheels/` 缓存可以复用已下载的包。

---

## 2. 各版本的区别

| 镜像 | 体积 | 包含 | 适用 |
|---|---|---|---|
| `cpu-slim` | 约 660 MB | 遥操作、校准、ACT 策略推理 | 只要跑机器人 |
| `cpu` | 约 1 GB | 上面 + 可视化、录制数据、训练、Diffusion | 要做完整流程 |
| `jetson` | 约 3.6 GB | CPU 版 + **CUDA 加速** | Jetson，需要 GPU 推理 |

---

## 3. 启动容器

### 3.1 用脚本启动（推荐）

如果你克隆了仓库：

```bash
# 通用版
bash scripts/run.sh cpu

# Jetson 版（会自动加上 GPU 参数）
bash scripts/run.sh jetson
```

脚本已经配好了这些：

- **设备透传** —— 串口、摄像头、USB
- **网络** —— `--network host`，VR 遥操作和 web 控制需要
- **源码挂载** —— 改代码不用重建镜像
- **缓存挂载** —— 校准文件和模型下载会保留

### 3.2 手动启动

不用脚本的话，最小可用命令：

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

**每个参数的作用：**

| 参数 | 为什么需要 |
|---|---|
| `--privileged` + `-v /dev:/dev` | 串口（SO-101 舵机）、摄像头、USB 透传 |
| `--network host` | host/client 双进程通信（ZMQ），以及 VR 控制 |
| `-v ~/.cache/huggingface` | **校准文件**和模型缓存。不挂的话每次重开容器都要重新校准 |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | 要跑可视化时用（rerun 开窗） |
| `-e HF_ENDPOINT` | `huggingface.co` 国内完全不可达，必须走镜像 |

进去之后是个 bash，工作目录 `/opt/xlerobot`。

---

## 4. Jetson 的 GPU 参数 ⚠️ 与其它平台不同

Jetson 版**必须**用 CDI 给 GPU，**不能用 `--runtime nvidia`**：

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

首次使用前需要在**宿主机**上生成 CDI 规范：

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **踩过的坑**：JetPack 7.2 上 `nvidia-container-toolkit 1.19.1` 的
> `enable-cuda-compat` 钩子会崩溃（`slice bounds out of range`），
> 导致容器根本起不来。加参数禁掉它即可：
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> 容器 CUDA 版本和宿主机一致时不需要这个钩子。

### 验证 GPU 可用

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. 平台专项

### Jetson Orin 系列 —— ✅ 当前正式支持

| 型号 | 需要 | 说明 |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | 我们实测的板子（3.4 GB 内存也能跑遥操作） |
| **Orin NX** | JetPack **7.2** | 同上 |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 **不支持** AGX Orin 64GB，必须 7.2 |

**唯一硬性要求是 JetPack 版本**：镜像里的 torch 是 CUDA 13.0 编译的，
而 CUDA 13.x 要求驱动 **≥ 580**。

| JetPack | L4T | CUDA | 驱动 | 能用吗 |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ 驱动太老 |
| **7.2** | 39.2 | 13.2 | 595 系 | ✅ |

查看你的版本：

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ 从 JetPack 6.x 升到 7.x **不能用 `apt upgrade` / OTA**（OTA 只在同一
> L4T 大版本内可用），必须整机重刷。

### Jetson Nano（2019 原版）—— ❌ 永远不支持

三个独立的原因，都是死结：

1. **CUDA 13 把 Maxwell 架构整个删掉了**。驱动 R580 是最后一个支持
   Maxwell / Pascal / Volta 的分支，而 CUDA 13 需要的正是 580+。
   Jetson Nano 最高只能停在 JetPack 4.6.6 / CUDA 10.2。
2. **算力 5.3 低于 torch 支持的下限**。本镜像里 torch 编译的架构是
   `sm_80 / sm_90 / sm_100 / sm_110 / sm_120`——最低 sm_80，
   而 Jetson Nano 是 sm_53，既没有原生 kernel，PTX 即时编译也够不着。
3. **平台已 EOL**（JetPack 4 于 2024 年 11 月停止维护）。

### 树莓派 / 普通 Ubuntu / x86 电脑 —— ⏳ 暂未支持

镜像**设计上**是支持的——通用 CPU 版基于 `python:3.12-slim`，
这个基础镜像官方同时发布 amd64 和 arm64 两个版本。

但**目前发布出去的 CPU 版还没有做成多架构**（构建脚本是普通的
`docker build`，产出的只是构建机器那一个架构）。所以现在拉下来可能
只有 amd64 或只有 arm64，另一半平台用不了。

等做了多架构构建（`docker buildx build --platform linux/amd64,linux/arm64`）
再开放这部分，那之前**请只在 Jetson Orin 上用**。

> 不确定自己的镜像能不能用：<code v-pre>docker image inspect &lt;镜像&gt; --format '{{.Architecture}}'</code>，
> 和 `uname -m` 对一下。

---

## 进容器之后

先做个自检：

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

预期输出：

```
torch 2.11.0+cu130     ← Jetson 版；CPU 版显示 +cpu
lerobot 0.6.2
```

> ⚠️ **`xlerobot` 和 `xlerobot_mecanum` 不能放在同一个进程里**——两者在源码里
> 都注册成 `"xlerobot"`（XLeRobot 上游的 bug），会报
> `Cannot register ... as xlerobot because ... already registered`。
>
> 其它组合都没问题：**原版 LeRobot 的机器人和 XLeRobot 可以同进程共存**
> （实测 8 个类型同时注册成功），`xlerobot_2wheels` 也不冲突。
> 一台机器人只用一个变体，正常使用不受影响。

---

> **接下来选一条路**：[xlerobot/](../xlerobot/01-Operation.md) 整机 ·
> [lerobot/](../lerobot/01-Operation.md) 单臂 / LeKiwi
