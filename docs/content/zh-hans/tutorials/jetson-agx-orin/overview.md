---
title: 产品概述 — Jetson AGX Orin 开发者套件
sidebar_label: 产品概述
slug: /product/overview
description: >-
  NVIDIA Jetson AGX Orin 开发者套件(64GB)是什么、能用来做什么，以及它在
  Jetson Orin 产品线中的定位。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# 产品概述

![Jetson AGX Orin 开发者套件](/images/jetson-agx-orin/jaodk_1024px.png)

NVIDIA® Jetson AGX Orin™ 开发者套件是 Jetson Orin 家族中的旗舰级开发者套件：一台紧凑型 AI 计算机，用于在边缘侧开发并原型验证机器人、计算机视觉与生成式 AI 应用。本指南介绍的是 **64GB** 版开发者套件。

## 关键事实(已对照 NVIDIA 官方文档核实)

- 开发者套件与**所有 Jetson Orin 模块共享同一种 SoC 架构**，因此可以通过重新刷机来**模拟 AGX Orin、Orin NX 或 Orin Nano 模块的性能与功耗**。出厂时默认预配置为 **Jetson AGX Orin 系列**。*(Developer Kit User Guide)*
- NVIDIA 标称 AGX Orin 模块系列的 AI 性能**最高可达 275 TOPS**，功耗可在 **15W 至 60W** 之间配置。*(NVIDIA 产品页面)*
- 64GB 模块的 GPU 为 **2048 核 NVIDIA Ampere 架构 GPU，配备 64 个 Tensor 核心**。*(NVIDIA 产品页面，对比表)*
- 套件随附的参考载板提供多种标准接口——DisplayPort、10GBASE-T 以太网、USB 3.2、M.2 (NVMe 与 Wi-Fi)、40 针排针、PCIe、摄像头连接器等。详见 **[接口与硬件布局](/zh-hans/tutorials/jetson-agx-orin/interfaces)**。

## 开发者套件的用途

- **开发与原型验证**——对于最终将在生产环境的 Jetson Orin 模块上运行的应用，套件就是它们的参考平台。
- **性能与功耗探索**——由于它可以模拟其他 Orin 模块，一套套件即可让你先在整个模块产品线范围内测试工作负载，再决定选用哪款量产型号。
- **边缘 AI 工作负载**——计算机视觉、机器人以及本地生成式 AI(参见我们持续扩充的教程栏目)。

> **钜犀提示：**量产产品构建在 Jetson Orin *模块*(64GB / 32GB / 工业版)之上，模块安装在你自研或合作伙伴提供的载板上。开发者套件是开发验证的载体，而不是量产部件。

## 包装清单

Jetson AGX Orin 模块与参考载板、Wi-Fi 模块、USB Type-C 电源适配器，以及一根 USB Type-C 转 USB Type-A 线缆。需要自备的物品详见 **[快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)**。

## 下一步

- **[快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)**——从开箱到跑通 JetPack 7.2.1 系统
- **[接口与硬件布局](/zh-hans/tutorials/jetson-agx-orin/interfaces)**——每一个端口与连接器
- **[下载](/zh-hans/tutorials/jetson-agx-orin/downloads)**——官方镜像、工具与文档链接 *(页面整理中)*

## 资料来源

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (已于 2026-09-23 核查)
- [NVIDIA Jetson Orin 产品页面](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) (已于 2026-09-23 核查)

*状态：草稿，等待 cheny 审核。完整的模块规格表将依据 NVIDIA 官方数据手册补充；在此之前，请以 NVIDIA 产品页面作为规格的权威来源。*

**图片来源：**产品图片来自 NVIDIA 官方 *Jetson AGX Orin Developer Kit User Guide*(下载于 2026-09-23)，© NVIDIA Corporation。

---

NVIDIA® 与 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 的官方出版物。
