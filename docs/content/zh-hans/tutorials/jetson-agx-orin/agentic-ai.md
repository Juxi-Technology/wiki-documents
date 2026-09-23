---
title: 智能体 AI —— JetPack 7.2 上的 NemoClaw
sidebar_label: 智能体 AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  在 AGX Orin 开发者套件上部署 NVIDIA NemoClaw——单条命令安装、
  Jetson 智能体技能,以及面向常驻智能体的实用提示。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# 智能体 AI —— JetPack 7.2 上的 NemoClaw

JetPack 7.2 让你的套件**智能体就绪**:NVIDIA NemoClaw 一条命令即可安装,NVIDIA 的智能体技能还能把过去大量需要手工完成的平台工作自动化。

## NemoClaw 是什么

按 NVIDIA 的说法:NemoClaw 是一套用于构建**自主智能体**的开放栈/蓝图集合——即能够推理、规划并行动的常驻 AI 系统。它为 OpenClaw 智能体生态加入隐私与安全控制(通过 **OpenShell** 运行时策略控制),并打包 Nemotron 模型、NeMo 等 NVIDIA 组件。JetPack 7.2 **已预配置所需依赖**,因此你的套件无需手动搭建环境。

- NemoClaw 产品页:<https://www.nvidia.com/en-us/ai/nemoclaw>
- GitHub 上的 NemoClaw:<https://github.com/NemoClaw> · 社区示例:<https://github.com/nemoclaw-community>

## 安装(单条命令,官方)

在套件上(JetPack 7.2+)运行:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **安全提示——运行前请务必阅读:** 这会安装一个常驻智能体框架。请在*启用之前*先审查该智能体被允许访问什么、可以使用哪些凭据;优先使用限定范围/可吊销的令牌,并善用 OpenShell 的策略控制。不要把智能体置于无人看管、且你无法吊销其权限的状态。

## 安装之后——接下来看什么

NVIDIA 维护着一个 **Build-a-Claw Resource Hub**,其中提供安装指南、云端试用和学习资源:<https://www.nvidia.com/en-us/ai/build-a-claw>

同样有用的还有:

- NVIDIA Deep Learning Institute 课程:*Securing Agents With NemoClaw and OpenShell*(见资源中心)
- NVIDIA Developer Discord——`#nemoclaw` 频道
- 第三方教程(例如 [Seeed Studio 的 NemoClaw 指南](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/),面向 Jetson Thor 机械臂编写)记录了一些安装后流程,比如 `nemoclaw onboard`——请把这些当作社区经验,权威流程以 NVIDIA 的资源中心为准。

## Jetson 智能体技能——让平台工作自动化

JetPack 7.2 内置**智能体技能**:面向 Jetson 开发的可重复、可由智能体执行的工作流。按 NVIDIA 的划分有三类:

| 技能类别 | 自动化的内容 |
|---|---|
| **Jetson Linux 定制** | 为自定义载板构建/定制 BSP——I/O 配置、时钟、风扇控制、电源模式 |
| **内存优化** | 审计 bootloader 预留区、内核预留与用户空间内存,以便用更少内存承载更强的负载 |
| **模型基准测试** | 为你的设备寻找最优模型配置与诊断手段 |

生态中还有更多智能体技能:

- [Jetson 设备端技能](https://github.com/jetson-device-skills) · [Jetson BSP 技能](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent)——智能体辅助的视觉流水线构建(见[我们的 DeepStream 教程](/zh-hans/tutorials/jetson-agx-orin/deepstream))
- [Metropolis VSS 蓝图技能](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills)——视频搜索与摘要工作流

## AGX Orin 套件的实用提示

- **常驻智能体需要专用算力**——这正是要把它们跑在套件上、而不是跑在会休眠的笔记本上的意义所在;请据此规划供电与散热(参见[故障排查](/zh-hans/tutorials/jetson-agx-orin/troubleshooting)中的电源模式说明)。
- **模型选择影响内存使用**——Orin 上的本地模型在 64GB 内运行自如,但常驻智能体会不断累积上下文。可用的调节手段见[内存效率](/zh-hans/tutorials/jetson-agx-orin/memory-efficiency),设备端模型性能见[本地 LLM 推理](/zh-hans/tutorials/jetson-agx-orin/local-llm)。
- **这个领域变化很快。** 请把上面的命令视为当前的官方路径;在把部署写成脚本之前,先到资源中心确认有没有更新。

## 来源

- [NVIDIA 技术博客——JetPack 7.2 智能体 AI(安装命令、智能体技能、版本特性)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(核对于 2026-09-24)
- [NVIDIA NemoClaw 产品页](https://www.nvidia.com/en-us/ai/nemoclaw)(核对于 2026-09-24)
- [JetPack 7.2.1 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)(核对于 2026-09-24)

*状态:草稿,待 cheny 评审。内容依据截至所列日期的 NVIDIA 官方文档;尚未经钜犀科技在实机上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布,并非 NVIDIA 官方出版物。
