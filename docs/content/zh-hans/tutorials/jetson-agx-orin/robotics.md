---
title: JetPack 7.2 上的机器人开发——如今哪些能用
sidebar_label: 机器人(现状)
slug: /tutorials/robotics
description: >-
  AGX Orin 开发套件在 JetPack 7.2 上开展机器人开发的如实现状说明——涵盖 ROS 2、
  Isaac ROS 可用性、机器人学习技术栈,以及在确定架构前该核查什么。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2 上的机器人开发——如今哪些能用

JetPack 7.2 将 Orin 带入了新一代平台(Ubuntu 24.04、内核 6.8、CUDA 13)。机器人开发现状则是喜忧参半:核心部分(ROS 2、Isaac ROS)如今已在该平台上就位,而周边技术栈的部分环节仍在磨合——因此本页有意写成现状说明,而不是教程。在确定架构之前,请先读一遍本页。

## 状态表(2026-09-24 核查;Isaac ROS 行于 2026-09-26 复核)

| 你需要什么 | JetPack 7.2 / AGX Orin 上的状态 | 备注 |
|---|---|---|
| **ROS 2(核心)** | ✅ 可用 | Ubuntu 24.04 是 ROS 2 **Jazzy** 的目标平台;按 [ROS 2 安装文档](https://docs.ros.org/en/jazzy/Installation.html) 安装。基于 Docker 的 ROS 2 也是可选方案。 |
| **Isaac ROS**(硬件加速的 ROS 2 软件包) | ✅ **自 Isaac ROS 4.6.0 起受支持**(2026-08-18) | 已针对 Jetson Orin 上的 JetPack 7.2 发布,并附有官方的 AGX Orin 安装配置演练。真正需要你决定的是选用哪个 ROS 2 发行版:**Jazzy 上的 4.6.x** 与 **Lyrical 上的 5.0**——见 [JetPack 7.2 上的 Isaac ROS](#jetpack-7-2-上的-isaac-ros)。 |
| **本地 LLM / VLM / VLA 模型** | ✅ 可用 | TensorRT Edge-LLM 正式支持 JP7.2 上的 Orin,包括 **Vision-Language-Action** 示例——见[本地 LLM 推理](/zh-hans/tutorials/jetson-agx-orin/local-llm)。 |
| **多摄像头视频流水线** | ✅ 可用 | DeepStream 9.1 随 JP7.2 一同提供——见 [DeepStream 视频分析](/zh-hans/tutorials/jetson-agx-orin/deepstream)。 |
| **智能体行为 / 编排** | ✅ 可用 | NemoClaw + Jetson 智能体技能——见[智能体 AI](/zh-hans/tutorials/jetson-agx-orin/agentic-ai)。 |
| **机器人学习技术栈(LeRobot 风格的 Python 框架)** | ⚠️ 采用前请先验证 | 这类技术栈重度依赖 Python;Ubuntu 24.04 已转向 Python 3.12,部分依赖可能滞后。在围绕它做设计之前,请先在 JP7.2 上测试你的具体技术栈——并注意**我们尚未在硬件上验证**。 |
| **GR00T(人形基础模型)** | ⚠️ 请查阅官方来源 | 平台支持情况请关注 NVIDIA 官方的 Isaac GR00T 仓库与公告。一份由合作方发布的实操指南报告了在 AGX Orin + JP7.2 上的完整权重 TensorRT 部署*(第三方内容,未经我们验证)*。 |
| **定制载板 / BSP 工作** | ✅ 新工具 | JetPack 7.2 的 **Jetson Linux 定制智能体技能** 可自动完成 BSP 点亮任务——见[智能体技能仓库](https://github.com/jetson-bsp-skills)。 |

## JetPack 7.2 上的 Isaac ROS

“即将推出”的时代已经结束。Isaac ROS **4.6.0** 版(2026-08-18)新增了对 **Jetson Orin** 和 **JetPack 7.2** 的支持,其受支持平台表将 *Jetson Orin* 与 *JetPack 7.2*(128+ GB NVMe SSD)搭配列出。NVIDIA 为这一组合发布了专门的 **Jetson AGX Orin** 快速上手与 Docker 配置演练——本开发套件是一等目标平台,而不是事后才补上的。

真正重要的决定,是你采用哪个 **ROS 2 发行版**:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| 发布 | 2026-08-18 | 2026-09-21 |
| ROS 2 发行版 | **Jazzy**——Ubuntu 24.04 的标准发行版 | **Lyrical Luth**——NVIDIA 自行构建 ROS 2 Noble 软件包,并通过其 buildfarm CDN 分发 |
| NITROS 软件包 | 有 | 已**移除**,并基于 `rosidl::Buffer` 原生重建;直接调用 NITROS API 或类型的代码需要源码级迁移 |
| Isaac Sim 搭配 | 6.0(5.0/5.1 仍作为旧版受支持) | 6.0 |

- 全新起步、想走主流路线:**Jazzy 上的 4.6.x** 让你留在标准 ROS 2 发行版上。**5.0** 是 NVIDIA 的前进方向,并带来 Lyrical 生态——在升级现有节点代码之前,请先阅读 [5.0.0 发布说明](https://nvidia-isaac-ros.github.io/releases/index.html) 中链接的 NITROS 到 `rosidl::Buffer` 迁移指引。
- **这些版本在 Orin 上的已知限制:** RealSense 摄像头**仅能在 Docker 模式下**工作;使用 `isaac_ros_stereo_image_proc` 时,在 AGX Orin 上以 RGB8/BGR8 输入选择 `backend:=JETSON` 可能因 VPI 错误导致节点中止——请保留默认的 `backend:=CUDA`;Orin 上从 Debian 包安装的 Teleop 需要设置 `ISAAC_TELEOP_CLOUDXR_EXP=0`;而 5.0 的 `isaac_ros_dnn_image_encoder` 预处理在 AGX Orin 上比 4.6 更慢——如果该节点在你的计算图中是热点,请优先选择 4.6。
- **OpenCV:** JetPack 7.2 自带 OpenCV **4.8.0**,而 Isaac ROS 预期的是 **4.6.0**。移除系统软件包(`sudo apt-get remove -y libopencv* opencv*`),Isaac ROS 软件包便会安装其固定版本。

### NVIDIA 自家页面说法不一致之处

NVIDIA 的 [JetPack 下载页](https://developer.nvidia.com/embedded/jetpack/downloads) 对这一版本仍将 Isaac ROS 列为 **“即将推出”**,而 Isaac ROS 发布说明则称自 4.6.0 起已受支持。这两个页面尚未统一——Isaac ROS 独立于 JetPack 发布,而 JetPack 页面的组件表跟踪的是随 JetPack *一同*发布的内容。Isaac ROS 文档指向的 apt 仓库是这一受支持组合的硬证据:`…/isaac-ros/release-4.6 noble-jetpack`——*noble* 对应 Ubuntu 24.04,*jetpack* 对应 JetPack 构建。两者不一致时,请以 [Isaac ROS 发布说明](https://nvidia-isaac-ros.github.io/releases/index.html) 为准,并先在你自己的环境上验证,再围绕其中任何一种做设计。

## 建议

- **没有机器人开发依赖的新项目:** 基于 JetPack 7.2 构建——你可以获得 Ubuntu 24.04 LTS 支持、CUDA 13、DeepStream 9.1、设备端 LLM,以及智能体工具链。
- **正在使用 Isaac ROS 的项目:** JetPack 7.2 重新成为受支持的目标。请审慎选择 4.6.x(Jazzy)还是 5.0(Lyrical),并为 OpenCV 替换与 RealSense 仅限 Docker 模式的支持预留相应投入。如果你在 JetPack 6.x 上的项目已推进到中途且技术栈经过验证,则并不存在被迫迁移的压力——等你敲定 Isaac ROS 版本后再迁移(我们的[迁移指南](/zh-hans/tutorials/jetson-agx-orin/jetpack-6-to-7)涵盖了需要重新构建的工作)。
- **一套开发套件,多种模组:** 请记住,你的开发套件可以通过重新刷机来模拟其他 Jetson Orin 模组——在选定量产型号之前,这很适合在整条模组产品线上验证机器人工作负载(见[产品概述](/zh-hans/tutorials/jetson-agx-orin/overview))。

## 参考资料

- [Isaac ROS 发布说明——4.6.0(2026-08-18)与 5.0.0(2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html)(核查于 2026-09-26)
- [Isaac ROS 4.6——入门指南:受支持平台、Jetson AGX Orin 演练、apt 安装](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html)(核查于 2026-09-26)
- [Isaac ROS 5.0——入门指南:受支持平台、Lyrical buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/index.html)(核查于 2026-09-26)
- [JetPack 7.2.1 下载页——组件列表](https://developer.nvidia.com/embedded/jetpack/downloads)——仍保留过时的 Isaac ROS“即将推出”行(核查于 2026-09-26)
- [Jetson AGX Orin 开发套件用户指南——简介](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(模组模拟;核查于 2026-09-24)
- [ROS 2 Jazzy 安装文档](https://docs.ros.org/en/jazzy/Installation.html)

*状态:草稿,待 cheny 审核。生态可用性变化很快——在依赖本表之前,请重新核查文中链接的 NVIDIA 页面。钜犀科技尚未在物理硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布,并非 NVIDIA 官方出版物。
