---
title: JetPack 7.2 上的机器人开发——Orin Nano 上哪些能用
sidebar_label: 机器人(现状)
slug: /tutorials/robotics
description: >-
  面向 Jetson Orin Nano Super 开发套件（8GB）在 JetPack 7.2.1 下开展机器人开发的
  如实现状说明——ROS 2、Isaac ROS、Isaac Sim、LeRobot 风格的技术栈，
  以及哪些内容暂时还不宜围绕它做规划。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2 上的机器人开发——Orin Nano 上哪些能用

JetPack 7.2 把本套件带入了新一代平台：Ubuntu 24.04、CUDA 13，
以及塑造每一项 AI 负载的 8GB 内存上限。机器人生态仍在追赶这次
迁移。有些部分如今已经可用，有些不行，还有些无法从任何官方页面得到核实。

本页是现状说明，不是教程。这里的一切仅经文档核对——钜犀尚未在硬件上测试过
这些技术栈。读任何机器人相关页面时都请留意日期：这个生态的多个部分在
2026 年 8 月和 9 月发生了变动。下图中，右侧的大块内容在套件上运行；
Isaac Sim 与 Isaac Lab 位于左侧的 Omniverse 区块，那是一台独立的主机。

![NVIDIA Jetson 软件栈，左侧为 DGX 与 Omniverse 主机](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## 状态表（2026-09-26 核查）

| 你需要什么 | 在 JetPack 7.2.1 / Orin Nano（8GB）上的状态 | 备注 |
|---|---|---|
| **ROS 2（核心）** | ✅ 可用 | JetPack 不安装也不要求任何 ROS 发行版。ROS 2 **Jazzy** 有官方的 Ubuntu 24.04 arm64 软件包。一份 NVIDIA 员工在论坛的回答（2026-09-07）称 Jazzy 是“JetPack 7.2.1 推荐的 ROS 发行版”。论坛回答不是官方文档。安装步骤见下文。 |
| **Isaac ROS**（硬件加速的 ROS 2） | ⚠️ 2026 年 8 月已发布——但确有缺口 | Isaac ROS 4.6.0 发布说明：“新增对 Jetson Orin 的支持”与“新增对 JetPack 7.2 的支持”。Orin Nano Super 8GB 出现在 NVIDIA 的官方基准表中。但实操指南没有 Orin Nano 章节，支持表预期使用 NVMe SSD，而 NVIDIA 的 JetPack 页面仍写着“即将推出”。详情见下文。 |
| **Isaac Sim / Isaac Lab**（仿真） | ⛔ 无法在本套件上运行 | 需要一台搭载 RTX GPU 的 x86_64 主机（最低 GeForce RTX 4080、16 GB VRAM、32 GB 内存）。不支持没有 RT 核心的 GPU。aarch64 构建只面向 DGX Spark。在仿真工作流中，仿真器运行在 x86_64 机器上，而不是 Jetson。 |
| **GR00T（人形基础模型）** | ⛔ 不在本套件上 | GR00T 1.7 的后训练需要至少 48 GB VRAM 的 GPU。NVIDIA 的参考工作流使用 Jetson AGX Thor 作为真机的边缘计算机。同一工作流把演示数据转换为 LeRobot 格式——软件方向一致，但算力不在这里。 |
| **LeRobot 风格的 Python 技术栈**（SO-ARM101、LeKiwi、视觉套件） | ⚠️ 需要验证 | Python 版本下限满足（Ubuntu 24.04 自带 Python 3.12.3；LeRobot 要求 3.12 或更新）。但上游没有官方的 JetPack 7.2 路径，文档记载的 Jetson 路线是社区为 JetPack 6.2 维护的。投入前请先测试你的具体技术栈。 |
| **DeepStream** | — 本次评审未核实 | 有专属页面——见 [DeepStream 视频分析](/zh-hans/tutorials/jetson-orin-nano/deepstream)。本次机器人评审没有重新核查 DeepStream 支持矩阵。 |
| **TensorRT Edge-LLM** | — 本次评审未核实 | 有专属页面——见[本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)。与机器人的关联主要是通过 VLA 类模型。 |
| **NemoClaw（智能体技术栈）** | ⚠️ 可用，事实上的支持 | 安装脚本会自动检测 Jetson（Orin 与 Thor），NVIDIA 官网也在宣传 “Install OpenClaw on Your NVIDIA Jetson Orin Nano”（在你的 NVIDIA Jetson Orin Nano 上安装 OpenClaw）。但官方平台矩阵没有 Jetson 行，且项目处于 alpha / “Early preview”阶段。8GB 是标称的最低内存（建议 16 GB），有文档记载的 OOM 风险。见[智能体 AI](/zh-hans/tutorials/jetson-orin-nano/agentic-ai)。 |

## JetPack 7.2 上的 Isaac ROS——官方页面如今怎么说

**NVIDIA 的页面彼此不一致。** JetPack 7.2.1 下载页仍然列着 “NVIDIA Isaac™
ROS——即将推出”。Isaac ROS 项目页面则说支持已经发布。就 Isaac ROS 本身
而言，项目页面是更具体的来源，而且更新：

- **Isaac ROS 4.6.0（2026-08-18）**——发布说明：“新增对 Jetson Orin 的
  支持”与“新增对 JetPack 7.2 的支持”。第一个具备该组合的 4.x 版本。
- **支持的平台：**“本表定义的平台是 Isaac ROS 测试并官方支持的仅有的硬件与
  软件组合。”Jetson 行：“Jetson Thor（T5000 与 T4000）和 Jetson Orin”、
  JetPack 7.2、存储“128+ GB NVMe SSD”。表里写的是“Jetson Orin”（家族），
  而不是“Orin Nano”。
- **基准：**性能表有一列专门的 “Orin Nano Super 8GB”，条目具体——例如
  720p 下的 AprilTag Node，104 fps；720p 下的 Mobile SAM graph，4.80 fps。
  这些是 NVIDIA 为这台设备发布的数字，不是钜犀实测。更重的负载显示为短横线
  （“–”）：FoundationPose、Grounding DINO 与完整版 SAM 未列为可运行。
- **Isaac ROS 5.0.0（2026-09-21）**转向 ROS 2 Lyrical Luth。公共的 ROS 2
  apt 仓库不为 Ubuntu 24.04 提供 ROS 2 Lyrical 软件包；NVIDIA 自行在
  Isaac ROS Buildfarm CDN 上发布。Isaac ROS 4.6 仍留在 ROS 2 Jazzy。
  主流 Jazzy 技术栈请选 4.6。

**投入前需要知道的缺口：**

- **没有 Orin Nano 配置章节。** Jetson 实操指南只覆盖 Jetson AGX Thor 与
  Jetson AGX Orin；唯一与 Orin Nano 相关的链接是电源设置指南。
- **预期使用 NVMe SSD。** 存储一列写的是“128+ GB NVMe SSD”。本套件完全
  不带存储，因此只有 microSD 的配置处于所述预期之外（见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)）。
- **版本偏差。** 4.6 的设置页面要求你从 `cat /etc/nv_tegra_release` 确认
  “R39 (release), REVISION: 2.0”（L4T r39.2.0）；本套件搭载 JetPack 7.2.1
  = L4T r39.2.1。迁移生产机器人之前，先在 Docker 中验证。
- **摄像头与 OpenCV。** Intel RealSense 摄像头“仅在 Docker 模式下受支持。
  虚拟环境与裸机模式不受支持。”JetPack 7.2 还会安装
  OpenCV 4.8.0，而 Isaac ROS 是在 4.6.0 上测试的——修复方法见下文安装步骤。
- **一处 5.0 的回归。** 在 Isaac ROS 5.0 中，DNN 图像编码器的吞吐量可能低于
  4.6。如果该节点对你重要，请考虑 4.6。

> **重要**：如果 Isaac ROS 在你的关键路径上，请权衡时机。JetPack 7.2 上的
> 支持是真实的，但很新（2026 年 8 月），而且 Orin Nano 的文档很薄。早在
> JetPack 6.2 时代（Isaac ROS 3.2 Update 1，2025 年 1 月），本套件就已经是
> Isaac ROS 的支持目标。一个需要最久经验证的组合、且无法承受首版发布期
> 反复变动的团队，有站得住脚的理由继续留在 JetPack 6.2 时代的配置上。
> 其他人：迁到 7.2.1，但在投入之前，先在本套件的 Docker 里验证你的确切
> 流水线。

## 仿真与训练——另一台机器

Isaac Sim 6.0 无法在本套件上运行。已发布的 Linux x86_64 路径最低要求：
GeForce RTX 4080、16 GB VRAM、32 GB 内存、50 GB SSD。“不支持没有 RT 核心的
GPU（A100、H100）。”aarch64 构建“目前仅在 DGX Spark 系统上受支持”。在
Isaac ROS 的仿真工作流中，“Isaac Sim 运行在 x86_64 机器上，提供传感器数据
与世界信息”——Jetson 是部署目标。

在机器人学习的重负载一端，分工同样如此：GR00T 1.7 的后训练需要至少
48 GB 的 VRAM，NVIDIA 的参考工作流使用 Jetson AGX Thor 作为真机的边缘
计算机。规则：在 PC 上仿真与训练，在套件上部署与运行推理。如果 Isaac Sim
是你考虑 Orin Nano 的理由，那它并不适合这份工作。

## LeRobot 与 Python 机器人技术栈——兼容性问题

1. **Python 版本问题有明确答案：3.12 没问题。** Ubuntu 24.04 的系统 Python
   是 3.12.3，而 LeRobot（0.6.2）要求 Python 3.12 或更新。这次升级不会以
   Python 版本为由挡住 LeRobot。
2. **但上游没有 JetPack 7.2 路径。** LeRobot 的官方安装页面写道：在 Jetson
   上默认没有 GPU 加速的视频解码（该库回退到 pyav）、aarch64 的 torchcodec
   wheel 需要 PyTorch 2.11 或更新，并且它的 Jetson Docker 构建针对的是
   **JetPack 6.2**、由社区维护。没有任何官方声明说目前的 LeRobot 已为
   JetPack 7.2 的 CUDA 13 备好了 aarch64 CUDA wheel。
3. **所以：“需要验证”——既不是“支持”，也不是“不能用”。** 在围绕 LeRobot
   设计本套件上的方案之前，先测试你的具体技术栈：装上它，跑一个小策略，
   并确认推理确实用了 GPU。

> **钜犀提示：** 我们的机器人套件（SO-ARM101、LeKiwi、视觉套件）构建在
> LeRobot 之上。在本套件 + JetPack 7.2.1 上，无论上游还是钜犀都还没有经过
> 测试的路径。JetPack 6.2 是社区维护路线的参考平台。在把项目排期押在
> LeRobot 与这套件的组合上之前，请先与钜犀支持确认（见[下载](/zh-hans/tutorials/jetson-orin-nano/downloads)）。

## 如今就能跑的部分

### ROS 2 Jazzy——地基

JetPack 不包含 ROS。可行的路径是面向 Ubuntu 24.04（arm64）的官方
ROS 2 Jazzy deb 安装，以下摘自 ROS 2 文档：

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6——当你需要加速感知

从 NVIDIA 的 apt 仓库安装（官方页面列出了确切的 keyring 命令）：仓库
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`，频道
`noble-jetpack`；中国镜像 `isaac.download.nvidia.cn`。然后：

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

预装的 OpenCV 4.8.0 移除一次即可（见上文缺口清单）；Isaac ROS
随后会自动安装其固定版本的 OpenCV 4.6.0：

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA 推荐 Docker：“Docker 是大多数用户推荐的选择。它提供与宿主系统最高
级别的隔离。”这也与 RealSense 摄像头的需求一致（仅限 Docker）。

### NemoClaw 与智能体技术栈

安装脚本会自动检测 NVIDIA Jetson 设备（Orin 与 Thor），并应用 JetPack
专属的主机配置。两个注意点：项目处于 alpha 阶段（“Early preview”），其
官方平台矩阵没有 Jetson 行，所以支持是事实上的，而非官方声明。8GB 是标称
的最低内存（建议 16 GB），围绕约 2.4 GB 的沙箱镜像有文档记载的 OOM 风险。
见[智能体 AI](/zh-hans/tutorials/jetson-orin-nano/agentic-ai)。

## 建议

- **只用 ROS 2：** 今天就基于 JetPack 7.2.1 + ROS 2 Jazzy 构建。这行得通。
- **关键路径上有 Isaac ROS：** 自 2026 年 8 月起受支持，但很新，Orin Nano
  文档很薄。在 Docker 中验证；规划一块 NVMe。如果需要最久经验证的组合，
  JetPack 6.2 时代的配置依然站得住脚——两种选择的重新构建成本见
  [迁移指南](/zh-hans/tutorials/jetson-orin-nano/jetpack-6-to-7)。
- **需要仿真或训练：** 另外配一台 RTX PC（Isaac Sim）和一台 Thor 级设备
  做 GR00T 级工作。本套件两样都做不了。
- **构建在 LeRobot 之上：** 需要验证。先测试；JetPack 6.2 是文档路线的参考。
- **不要为以下用途买这套件：** Isaac Sim、GR00T 后训练，或实时的完整
  SAM / Grounding DINO / FoundationPose 级负载——最后这三者在 NVIDIA 为
  这台设备发布的基准表里都未列为可运行。

## 仍不明确的部分

- **micro-ROS：** 没有找到 Jetson 专属的官方页面（两个 micro.ros.org 官方
  URL 目前返回 404）。请把这对组合视为未验证。
- **Isaac ROS 5.0 之后的 ROS 发行版：** 推荐 Jazzy 的论坛回答早于 5.0
  （2026-09-21）；未找到 5.0 之后的表态。
- **JetPack 7.2 上的 LeRobot：** 没有官方声明；在投入之前，先核查 CUDA 13
  的 PyTorch aarch64 wheel 可用性。
- **只有 microSD 的配置搭配 Isaac ROS：** 支持表写的是 NVMe，但这一点没有
  专门针对 Orin Nano 重申。
- **“Jetson Orin”与“Orin Nano”：** 平台表用的是家族名；“Orin Nano Super
  8GB”只出现在基准表里。NVIDIA 是否把它们当作两个不同的支持声明，尚未解决。
- **DeepStream 与 TensorRT Edge-LLM：** 本次机器人评审未重新核实——见它们
  各自的页面。

## 参考资料

- [Isaac ROS——Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html)（支持的平台、Docker、ROS 2 Lyrical；已于 2026-09-26 核查）
- [Isaac ROS 4.6——Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html)（Jazzy 搭配、apt 安装、OpenCV 说明；已于 2026-09-26 核查）
- [Isaac ROS 5.0——Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html)（x86_64 上的 Isaac Sim；已于 2026-09-26 核查）
- [Isaac ROS——Releases](https://nvidia-isaac-ros.github.io/releases/index.html)（4.6.0 与 5.0.0 说明；RealSense 与 DNN 编码器限制；已于 2026-09-26 核查）
- [Isaac ROS——Performance](https://nvidia-isaac-ros.github.io/performance/index.html)（Orin Nano Super 8GB 基准列；已于 2026-09-26 核查）
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html)（Ubuntu 24.04 的 ROS 2 Lyrical 软件包；已于 2026-09-26 核查）
- [Isaac Sim 6.0 安装要求](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html)（已于 2026-09-26 核查）
- [GR00T 端到端工作流——前置条件](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html)（已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——“Is ROS2 Jazzy the correct version...” （员工回答；论坛，非官方文档）](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439)（已于 2026-09-26 核查）
- [ROS 2 Jazzy 安装——deb 软件包（上游）](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst)（已于 2026-09-26 核查）
- [ROS 2 Jazzy 安装——apt 仓库（上游）](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst)（已于 2026-09-26 核查）
- [LeRobot 安装指南（上游）](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx)（已于 2026-09-26 核查）
- [LeRobot pyproject.toml（上游）](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml)（Python 与 torchcodec 版本固定；已于 2026-09-26 核查）
- [Ubuntu Noble——python3 软件包](https://packages.ubuntu.com/noble/python3)（Python 3.12.3；已于 2026-09-26 核查）
- [NemoClaw——前置条件](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md)（已于 2026-09-26 核查）
- [NemoClaw——平台支持矩阵](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md)（alpha 阶段；无 Jetson 行；已于 2026-09-26 核查）
- [NemoClaw——安装器故障排查（Jetson 自动检测）](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx)（已于 2026-09-26 核查）
- [NVIDIA——Build a Claw（“Install OpenClaw on Your NVIDIA Jetson Orin Nano™”）](https://www.nvidia.com/en-us/ai/build-a-claw/)（已于 2026-09-26 核查）
- [JetPack 7.2.1 下载页（组件矩阵把 Isaac ROS 列为“即将推出”）](https://developer.nvidia.com/embedded/jetpack/downloads)（已于 2026-09-26 核查）

*状态：已于 2026-10-11 审核。生态可用性变化很快——在依赖本表之前，请重新核查文中链接的 NVIDIA 与上游页面。尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
