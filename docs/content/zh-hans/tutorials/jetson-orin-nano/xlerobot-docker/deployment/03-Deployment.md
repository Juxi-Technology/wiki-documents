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

镜像只有一个：

```bash
docker pull chenyang310/xlerobot:jetson
```

| | |
|---|---|
| 架构 | `arm64` |
| 运行环境 | Jetson + JetPack 7.2 |
| 下载量 | 约 3.6 GB（解压后更大，建议留 20 GB 空闲） |
| 包含 | 遥操作、校准、录制数据、训练、推理，**GPU 加速** |

拉完确认一下：

```bash
docker images | grep xlerobot
```

应该看到 `chenyang310/xlerobot` 和 `jetson` 标签。

> **国内网络**：实测可以直接拉，不需要额外配加速器。如果慢，见
> [02-Environment-Setup](02-Environment-Setup.md) 第 2 节。

### 自己构建（维护者）

适合需要改动、或者想用最新源码的情况。

```bash
git clone <repository-url> xlerobot-docker
cd xlerobot-docker

bash scripts/build.sh jetson
```

构建脚本已经配好了国内源（阿里云 PyPI、阿里云 Ubuntu 源），
**不需要额外配置就能在国内网络下构建**。

> 首次构建要下载约 2 GB 依赖，慢速网络下要一两个小时。
> 用 `scripts/sync.sh` + 板子上的 `wheels/` 缓存可以复用已下载的包。

---

## 2. 镜像里有什么

一个镜像，东西全在里面：

- **遥操作与校准** —— 手动拖动示教，保存校准
- **录制与回放数据**
- **训练** —— ACT、Diffusion Policy、SmolVLA、π₀、π₀.₅、Wall-OSS
- **推理** —— 在机器人上跑训练好的策略，**GPU 加速**

---

## 3. 启动容器

### 3.1 用脚本启动（推荐）

如果你克隆了仓库：

```bash
bash scripts/run.sh jetson
```

脚本已经配好了这些：

- **GPU** —— `--device nvidia.com/gpu=all`（CDI 方式）
- **设备透传** —— 串口、摄像头、USB
- **网络** —— `--network host`，VR 遥操作和 web 控制需要
- **源码挂载** —— 改代码不用重建镜像
- **缓存挂载** —— 校准文件和模型下载会保留

### 3.2 手动启动

不用脚本的话，最小可用命令：

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

**每个参数的作用：**

| 参数 | 为什么需要 |
|---|---|
| `--device nvidia.com/gpu=all` | **给容器 GPU**（CDI 方式）。少了这个容器里完全没有 GPU |
| `--privileged` + `-v /dev:/dev` | 串口（SO-101 舵机）、摄像头、USB 透传 |
| `--network host` | host/client 双进程通信（ZMQ），以及 VR 控制 |
| `-v ~/.cache/huggingface` | **校准文件**和模型缓存。不挂的话每次重开容器都要重新校准 |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | 要跑可视化时用（rerun 开窗） |
| `-e HF_ENDPOINT` | `huggingface.co` 国内完全不可达，必须走镜像 |

> 挂载路径里的 `/home/jetson` 是**镜像里的**用户目录，写死是对的——
> 这个镜像的用户就叫 `jetson`。

进去之后是个 bash，工作目录 `/opt/xlerobot`。

---

## 4. GPU 参数 —— 必须走 CDI

镜像**必须**用 CDI 给 GPU，**不能用 `--runtime nvidia`**：

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

### 树莓派 / 普通 Ubuntu / x86 电脑 —— ❌ 不支持

树莓派、普通 x86 电脑、Windows 和 macOS **都跑不了这个镜像**。
它是针对 JetPack 7.2 的 CUDA 环境构建的，而且只发布 `arm64`，
**没有 CPU 版可以退而求其次**。请用 Jetson Orin 板子。

> 确认一下手上的设备：`uname -m` 应该输出 `aarch64`，
> `cat /etc/nv_tegra_release` 应该显示 **R39**。

---

## 进容器之后

先做个自检：

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

预期输出：

```
torch 2.11.0+cu130
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
