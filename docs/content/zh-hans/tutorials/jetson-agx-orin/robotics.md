---
title: JetPack 7.2 上的机器人开发——如今哪些能用
sidebar_label: 机器人(现状)
slug: /tutorials/robotics
description: >-
  AGX Orin 开发套件在 JetPack 7.2 上开展机器人开发的如实现状说明——涵盖 ROS 2、
  Isaac ROS 可用性、机器人学习技术栈,以及生态追赶期间该用什么。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# JetPack 7.2 上的机器人开发——如今哪些能用

JetPack 7.2 将 Orin 带入了新一代平台(Ubuntu 24.04、内核 6.8、CUDA 13)。机器人开发正是*生态*仍在追赶平台的领域——因此本页有意写成现状说明,而不是教程。在确定架构之前,请先读一遍本页。

## 状态表(2026-09-24 核查)

| 你需要什么 | JetPack 7.2 / AGX Orin 上的状态 | 备注 |
|---|---|---|
| **ROS 2(核心)** | ✅ 可用 | Ubuntu 24.04 是 ROS 2 **Jazzy** 的目标平台;按 [ROS 2 安装文档](https://docs.ros.org/en/jazzy/Installation.html) 安装。基于 Docker 的 ROS 2 也是可选方案。 |
| **Isaac ROS**(硬件加速的 ROS 2 软件包) | ⛔ **尚不可用——NVIDIA 对 JetPack 7 标注为“即将推出”** | 这是最大的缺口。如果 Isaac ROS 目前在您的关键路径上,请先继续使用 **JetPack 6.x**,并关注 NVIDIA 的[下载页面](https://developer.nvidia.com/embedded/jetpack/downloads),等待正式发布。 |
| **本地 LLM / VLM / VLA 模型** | ✅ 可用 | TensorRT Edge-LLM 正式支持 JP7.2 上的 Orin,包括 **Vision-Language-Action** 示例——见[本地 LLM 推理](/zh-hans/tutorials/jetson-agx-orin/local-llm)。 |
| **多摄像头视频流水线** | ✅ 可用 | DeepStream 9.1 随 JP7.2 一同提供——见 [DeepStream 视频分析](/zh-hans/tutorials/jetson-agx-orin/deepstream)。 |
| **智能体行为 / 编排** | ✅ 可用 | NemoClaw + Jetson 智能体技能——见[智能体 AI](/zh-hans/tutorials/jetson-agx-orin/agentic-ai)。 |
| **机器人学习技术栈(LeRobot 风格的 Python 框架)** | ⚠️ 采用前请先验证 | 这类技术栈重度依赖 Python;Ubuntu 24.04 已转向 Python 3.12,部分依赖可能滞后。在围绕它做设计之前,请先在 JP7.2 上测试你的具体技术栈——并注意**我们尚未在硬件上验证**。 |
| **GR00T(人形基础模型)** | ⚠️ 请查阅官方来源 | 平台支持情况请关注 NVIDIA 官方的 Isaac GR00T 仓库与公告。一份由合作方发布的实操指南报告了在 AGX Orin + JP7.2 上的完整权重 TensorRT 部署*(第三方内容,未经我们验证)*。 |
| **定制载板 / BSP 工作** | ✅ 新工具 | JetPack 7.2 的 **Jetson Linux 定制智能体技能** 可自动完成 BSP 点亮任务——见[智能体技能仓库](https://github.com/jetson-bsp-skills)。 |

## 建议

- **没有 Isaac ROS 依赖的新项目:** 基于 JetPack 7.2 构建——你可以获得 Ubuntu 24.04 LTS 支持、CUDA 13、DeepStream 9.1、设备端 LLM,以及智能体工具链。
- **目前依赖 Isaac ROS 的项目:** 暂时按 JetPack 6.x 规划;等 Isaac ROS 发布对应版本后,再把 JP7.x 作为您的迁移目标(到那一天,我们的[迁移指南](/zh-hans/tutorials/jetson-agx-orin/jetpack-6-to-7) 涵盖了需要重新构建的工作)。
- **一套开发套件,多种模组:** 请记住,你的开发套件可以通过重新刷机来模拟其他 Jetson Orin 模组——在选定量产型号之前,这很适合在整条模组产品线上验证机器人工作负载(见[产品概述](/zh-hans/tutorials/jetson-agx-orin/overview))。

## 参考资料

- [JetPack 7.2.1 下载页——Isaac ROS 对 JetPack 7 显示“即将推出”](https://developer.nvidia.com/embedded/jetpack/downloads)(核查于 2026-09-24)
- [Jetson AGX Orin 开发套件用户指南——简介](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(模组模拟;核查于 2026-09-24)
- [ROS 2 Jazzy 安装文档](https://docs.ros.org/en/jazzy/Installation.html)

*状态:草稿,待 cheny 审核。生态可用性变化很快——在依赖本表之前,请重新核查文中链接的 NVIDIA 页面。钜犀科技尚未在物理硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布,并非 NVIDIA 官方出版物。
