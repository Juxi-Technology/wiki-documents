---
title: 智能体 AI——8GB Orin Nano 上的 NemoClaw
sidebar_label: 智能体 AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  在 8GB 的 Jetson Orin Nano Super 开发套件上安装并运行 NVIDIA NemoClaw
  常驻智能体技术栈——官方安装方式、如实的 8GB 预期，以及安全注意事项。
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

# 智能体 AI——8GB Orin Nano 上的 NemoClaw

你的套件可以运行 NVIDIA NemoClaw——一个常驻的自主智能体，一条命令即可安装。
本页涵盖 NemoClaw 是什么、官方安装方式、围绕它的智能体技能、如实的 8GB
预期，以及它要求你做出的安全决策。

## NemoClaw 是什么

NVIDIA 把 NemoClaw 描述为“一组用于构建自主智能体的开放蓝图”——能够推理、
规划并在真实工作流中行动的常驻 AI 系统。它打包了智能体框架（OpenClaw、
Hermes、LangChain Deep Agents），以及 NVIDIA Agent Toolkit 组件：Nemotron
模型、NeMo 与 OpenShell 运行时策略控制。

OpenShell 是安全层：“它内部的安全运行时，约束着智能体可访问的内容：
文件、网络、凭据与工具。”

NemoClaw 是 alpha 软件——NVIDIA 将其标为“Early preview”（早期预览，自
2026-03-16 起）。产品页：<https://www.nvidia.com/en-us/ai/nemoclaw> ·
Build-a-Claw 资源中心：<https://www.nvidia.com/en-us/ai/build-a-claw/>

## 安装——官方单条命令

在套件上运行 NVIDIA 的安装脚本：

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

这会安装默认框架 **OpenClaw**。另外两个可以用环境变量选择：

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

在本套件上，安装脚本会自动检测 Jetson（Orin 与 Thor），并先应用 JetPack
主机配置；在 L4T 39.x 上，它只在缺失时加载 `br_netfilter` 模块（没有它，
沙箱 DNS 解析会失败，初始配置会卡在 “Setting up OpenClaw inside sandbox”）。
如果你选择 Ollama，安装脚本也会把它装上：“如果你选择了 ollama，脚本也会
安装 ollama，这样你就不需要事先手动安装”（NVIDIA 员工）。NVIDIA 官网记载了
这台设备：“Install OpenClaw on Your NVIDIA Jetson Orin Nano”（在你的
NVIDIA Jetson Orin Nano 上安装 OpenClaw）——“在 Jetson 上完全本地的 AI
个人助理……无需云 API。”

> **重要**——NemoClaw 的平台支持矩阵（v1.1，2026-09-04）没有 Jetson 行；
> 其测试平台是 Linux（Ubuntu 24.04）与 DGX OS Spark。Orin Nano 支持在实践
> 中是真实存在的——安装脚本能检测到该板卡，NVIDIA 也记录了该流程——但它并未
> 作为正式支持发布，因此请预期会有粗糙之处。

本套件需要注意的要求（来自 NVIDIA 的 NemoClaw 前置条件页）：

| 要求 | 最低 / 推荐 | 本套件上 |
|---|---|---|
| 内存 | 8 GB / 16 GB | 共 8GB——正好处于下限 |
| 空闲磁盘 | 20 GB | 没有内置存储；请用 microSD 或 NVMe（[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)） |
| Node.js / npm | 22.19+ / 10+ | 需另行安装 |
| 容器运行时 | Docker Engine / Desktop / Colima | socket 修复：`sudo usermod -aG docker $USER`，然后 `newgrp docker` |

## 安装之后——首次会话

NVIDIA 员工为 Orin 的流程推荐了 [Jetson AI Lab 的实操指南](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)（厂商指南）：

1. `curl -fsSL https://ollama.com/install.sh | sh`——或者跳过；NemoClaw 安装
   脚本也能安装 Ollama。
2. 拉取一个 4B 级的工具调用模型，例如 Nemotron3 Nano 4B（该指南的
   `nemotron-3-nano:30b` 示例面向更大的设备）。
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. 初始配置：选择 Ollama 作为模型来源，并选择能正常工作的最严格沙箱策略
   级别。
5. `source ~/.bashrc`，然后 `nemoclaw my-assistant connect`；用
   `openclaw tui` 启动智能体。

## 智能体技能

NVIDIA 还发布了**智能体技能**——采用开放 Agent Skills 格式的打包工作流，
用设备专属的自动化扩展 AI 编程助手（Claude Code、Cursor、Codex）。目前
有两个领域有文档记载：

- **Physical AI（机器人）。** Isaac ROS 提供一组智能体技能目录——据 NVIDIA
  介绍，任务包括激活 Isaac ROS 开发容器、拉起 Mission Control 云端技术栈。
  目录在 <https://github.com/nvidia/skills>（“Physical AI”分类），用 `npx`
  安装（Node.js 不属于标准 Isaac ROS 环境）。Isaac ROS 5.0 新增了
  `isaac-ros-activate` CLI 与一个早期访问的 `migrate-node-to-rosidl-buffer`
  技能。见[机器人](/zh-hans/tutorials/jetson-orin-nano/robotics)。
- **视频流水线。** L4T r39.2.1 发布说明把“视频流水线的智能体技能”
  （Agent skills for video pipelines）列在 What's New 条目中。

一处需要如实说明的空白：本页的来源记载了 NVIDIA 面向 Isaac ROS（Physical AI）
与视频流水线的智能体技能；没有任何一个来源记载 NemoClaw 专属的技能目录。

## 面向 8GB 的现实预期

一个常驻智能体、一个本地模型，再加上 Ubuntu 桌面，无法同时舒适地装进本套件。
有文档记载的预算：

- **可用内存约 7.6 GB，而不是 8GB。** NVIDIA：“在 8GB 物理 DRAM 中，扣除
  固件与内核预留后约有 7.6 GB 可用。”
- **8GB 是 NemoClaw 的下限，而非舒适区。** 前置条件把 8 GB 列为最低、16 GB
  列为推荐：“在内存少于 8 GB 的机器上，这些合并占用可能触发 OOM killer。
  如果无法增加内存，请至少配置 8 GB swap 来规避此问题，代价是性能下降。”
  本套件的内存是固定的——请规划好 swap 文件（[内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)）。
  约 2.4 GB 的沙箱镜像推送已经在 8GB 的 Orin Nano 上触发过 OOM。
- **在模型加载之前，智能体与桌面就已经占用内存。** NVIDIA 论坛上的一份社区
  指南把 OpenClaw 运行时记为最高约 1 GB；禁用图形桌面可释放最高约 865 MB
  （NVIDIA 的数字），一份社区测量则把 GNOME 记为超过 600 MB。
- **超大模型的失败已有社区报告记录在 NVIDIA 论坛上。** 8GB 板卡上的 Ollama
  加载 7.4 GB 模型与 16 GB 模型均失败：`cudaMalloc failed: out of memory
  ... failed to allocate buffer for kv cache`。仅凭文件大小判断不了装不装
  得下——KV cache 也必须装进同一块 8GB。

按这些来源，能装下的是：NVIDIA 验证过的 Ollama 默认值（`qwen3.6:35b`、
`nemotron-3-nano:30b`、`qwen3.5:9b`）是面向更大机器配的；Jetson AI Lab 的
指南建议从 4B 级的工具调用模型起步——“它能用，但请预期性能弱于 30B 级的
模型”；NVIDIA 的内存博客则给出调优后的 4 位上限：LLM 最高约 10B、VLM 最高
约 4B 参数——这是专用配置的天花板，不是还能同时容纳桌面与智能体的预算。

NVIDIA 没有发布这台设备上 Ollama 的每秒 token 数；对外部的速度声明请谨慎
对待（见[本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)）。

> **钜犀提示：** 要在这里搭出可用的常驻配置，请规划无头模式、4B 级的量化模型，
> 以及为 20 GB 需求和 swap 文件准备的 NVMe 存储。这与各来源支持的内容相符；
> 再大的都未经验证。

## Ollama 与智能体注意事项——经 NVIDIA 员工确认

NVIDIA 员工在其开发者论坛上排查了 Orin Nano + JetPack 7.2 + Ollama 的流程，
并在 2026 年 9 月于 JetPack 7.2.1 上重新验证了 Ollama。

- **先检查 GPU。** `ollama ps` 的 PROCESSOR 列应显示 `100% GPU`；若显示
  CPU，智能体会非常慢。
- **有文档记载的失败（2026 年 6 月）。** 在刚刷好 JetPack 7.2 的 Orin Nano
  上运行 NemoClaw + Ollama 时，`openclaw tui` 能打开但从不作答
  （“Autocompaction could not recover this turn”）。NVIDIA 复现了它：Ollama
  跳过了 GPU 发现（回退到 CPU），且沙箱上下文窗口只有 4096 token。员工的
  修复把以下各行写入 `/etc/systemd/system/ollama.service.d/override.conf`：

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  然后执行 `sudo systemctl daemon-reload && sudo systemctl restart ollama`；
  在沙箱内（`nemoclaw my-assistant connect`），把 `.openclaw/openclaw.json`
  中的 `contextWindow` 提高到 32768，并刷新配置哈希。报告者确认此后 Ollama
  在 GPU 上运行。
- **当前状态：不应再需要这个变通方案。** 员工在 2026 年中表示：“该问题已在
  最新的 ollama 版本中修复。不再需要这个变通方案（override.conf）。”在
  JetPack 7.2.1 上，上游安装脚本可用，`ollama ps` 报告 100% GPU；
  “WARNING: Unsupported JetPack version detected” 一行无害。请先测试原版
  安装。
- **如果 Ollama 仍然回退到 CPU：** 先更新 Ollama。一位论坛用户通过删除陈旧
  的 `/usr/local/lib/ollama/cuda_v12` 目录修好了顽固的回退（员工确认了该
  删除操作）。把 override.conf 留作最后手段的变通方案——NVIDIA 正是在这套件
  上用它取得了成功。

## 常驻智能体的安全

常驻智能体是一个带着凭据与工具访问权限的程序，在你没有盯着的时候也持续工作。
在一台存放你数据的设备上，这是真实的风险：这里的智能体拥有工具与 shell
访问权限，凡是它能触及的，它就能读取、更改或发送。

**用好策略层。** NVIDIA 把 OpenShell 描述为“它内部的安全运行时，约束着
智能体可访问的内容：文件、网络、凭据与工具”。在初始配置时，选择仍能完成
任务的最严格沙箱策略级别（Jetson AI Lab 的实操指南也建议选最严格的级别）。

**凭据。** 给智能体限定范围、可吊销的凭据——专用密钥与账户，绝不用你个人的。
凡是智能体能读取的，它都能复制；凡是它能使用的，它都可能被骗去使用。消息
集成会以你的身份行事：NVIDIA 的 Orin Nano 页面展示了 OpenClaw + WhatsApp 的
示例，所以请使用专用账户或号码。

**网络暴露面。** 让本地服务待在 localhost 上——NVIDIA 员工为这里的 Ollama
所做的配置就把它绑定到 `127.0.0.1`（`OLLAMA_HOST=127.0.0.1:11434`）。不要
把智能体仪表盘、控制 API 或模型服务端暴露到公网；如需远程访问，请使用你
掌控的隧道或 VPN。安装需要 Docker（Engine/Desktop/Colima，见上文要求）以及
一个沙箱化的容器集群（OpenShell 网关内部运行 k3s）和 sudo 权限。

**操作习惯。** 从有人看管开始——先观察智能体都在做什么，再考虑让它无人值守。
不要给它你无法吊销或撤销的访问权限，并保留备份与恢复路径（见[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)）。
NemoClaw 是 alpha 软件（“Early preview”）；请把沙箱当作多层中的一层，而不是
唯一的一层。

> **注意**——因为这套技术栈在本地运行（“无需云 API”），安全边界就是你的
> 设备、你的网络与你的凭据。在让智能体持续运行之前，请把这三者都审查一遍。

## 来源

- [NVIDIA NemoClaw 产品页](https://www.nvidia.com/en-us/ai/nemoclaw)（已于 2026-09-26 核查）——定义、智能体框架、安装命令、OpenShell。
- [NVIDIA Build-a-Claw 资源中心](https://www.nvidia.com/en-us/ai/build-a-claw/)（已于 2026-09-26 核查）——Orin Nano 安装章节。
- [NemoClaw——前置条件](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md)与[平台支持](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md)（已于 2026-09-26 核查）
- [NemoClaw——故障排查（Jetson 主机配置）](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx)（已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——JetPack 7.2 下 Jetson Orin Super 上的 NemoClaw（NVIDIA 员工修复）](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)（已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——Jetson 上的 Ollama（经员工确认）](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)与 [JetPack 7.2 GPU 加速](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)（已于 2026-09-26 核查）
- [NVIDIA 技术博客——最大化 NVIDIA Jetson 上的内存效率](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（已于 2026-09-26 核查）
- [NVIDIA 开发者论坛——能在 Orin Nano Super 8GB 上运行的 AI 模型（社区指南）](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412)（已于 2026-09-26 核查）
- [Jetson AI Lab——NemoClaw 教程（厂商指南）](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)（已于 2026-09-26 核查）
- [Isaac ROS——Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html)与[发布说明](https://nvidia-isaac-ros.github.io/releases/index.html)（已于 2026-09-26 核查）
- [Jetson Linux r39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（已于 2026-09-26 核查）——“视频流水线的智能体技能”这一 What's New 条目。

*状态：已于 2026-10-11 审核。内容依据所列日期的 NVIDIA 官方文档、NVIDIA 开发者论坛帖子与 Jetson AI Lab 厂商指南；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
