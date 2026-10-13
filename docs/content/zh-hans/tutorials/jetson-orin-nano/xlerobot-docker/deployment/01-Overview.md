---
title: 01 · 总览
---

# 01 · 总览

> **上一篇**：无，这是第一篇
> **下一篇**：[deployment/02-Environment-Setup](02-Environment-Setup.md)

这一篇讲清楚：**XLeRobot 的完整工作流是什么、需要什么硬件、你的机器支不支持。**

---

## 工作流

XLeRobot 的完整流程是四步：

```
① 校准机器人  →  ② 遥操作采集数据  →  ③ 训练模型  →  ④ 部署模型自主运行
   calibrate        record              train           eval / rollout
```

Docker 镜像把这四步需要的**软件环境**全都装好了——Python、PyTorch、
LeRobot、XLeRobot 的机器人代码、舵机和相机驱动。你不用再折腾版本冲突。

**你需要自己准备的**只有：一台机器人（或先跑通软件）、一台电脑、一根 USB 线。

---

## 硬件支持

| 平台 | 支持情况 |
|---|---|
| **Jetson Orin 系列**（JetPack 7.2） | ✅ **唯一支持的平台**，可用 GPU 加速 |
| 其它任何平台 | ❌ 不支持 |

> ⚠️ **这份镜像只为 Jetson + JetPack 7.2 构建。** 树莓派、普通 x86 电脑、
> Windows、macOS，以及非 Orin 的 Jetson 板子，都用不了。
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**：需要 **JetPack 7.2**
>   （L4T 39.2 / CUDA 13.2）。AGX Orin 64GB 也是 7.2 才完整支持。
> - **Jetson Nano（2019 原版）**：❌ 永远不行。它是 Maxwell 架构（算力 5.3），
>   而 CUDA 13 已经整个删掉了 Maxwell 支持，torch 最低也要求 sm_80。
>
> 内存建议 4 GB 以上。Jetson Orin Nano 的 3.4 GB 也能跑遥操作，
> 但训练会吃力。

### 系统要求

- **JetPack 7.2**（L4T r39 / Ubuntu 24.04）
- 架构：`arm64`
- 内核支持 USB 串口（一般都有）

### 确认 JetPack 版本

```bash
cat /etc/nv_tegra_release
```

看到 **R39** 就对了。不是 R39 请先升级 JetPack——镜像是为它编的。

---

## 你需要读的文件夹

| # | 文件夹 | 内容 | 什么时候看 |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md)（就是这里） | **拉取镜像、运行镜像** | 第一次用，按 `01` → `02` → `03` 顺序读 |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **XLeRobot 整机运行指令** | 你有整机（双臂 + 底盘）时 |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **原版 LeRobot 运行指令** | 你只有单条 SO-101 / SO-100 臂或 LeKiwi 时 |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | 常见问题与速查 | 出问题时 |

> ⚠️ **第 2 个和第 3 个文件夹是二选一**——看你的硬件：
> - **XLeRobot 整机**（双臂 + 底盘）→ 进 `xlerobot/`
> - **单条 SO-101 / SO-100 臂**、**LeKiwi** → 进 `lerobot/`
>
> 镜像是同一套环境，两条路随时可以切，不用重装任何东西。

---

## 最短路径（只想先跑通）

**在 Jetson 上（JetPack 7.2）**，几个命令先看到机器人动起来，再回头读细节：

```bash
# 1. 装 Docker（已经装了跳过）
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. 给容器开 GPU 通道（Jetson 特有，只需做一次）
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. 拉镜像（约 3.6 GB）
docker pull chenyang310/xlerobot:jetson

# 4. 启动容器
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. 容器里跑遥操作（首次会自动进入校准引导）
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ 快捷路径跳过了两件**迟早要做**的事，卡住了回头看对应章节：
> - **国内镜像加速器**（第 3 步可能卡住）→ [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` 不能省**（这个钩子在
>   JetPack 7.2 上有 bug，会让容器起不来）→ [03-Deployment §4](03-Deployment.md)
>
> 上面第 5 步跑的是 **XLeRobot 整机**的示例。如果你只有单条 SO-101 臂，
> 换用 `lerobot-*` 命令行，见 [lerobot/](../lerobot/01-Operation.md)。

---

> **下一篇**：[deployment/02-Environment-Setup](02-Environment-Setup.md) —— 装 Docker、配国内加速、接硬件
