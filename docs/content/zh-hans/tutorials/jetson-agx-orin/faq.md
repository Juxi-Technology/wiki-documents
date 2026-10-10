---
title: 常见问题 FAQ
sidebar_label: 常见问题 FAQ
slug: /support/faq
description: >-
  关于 NVIDIA Jetson AGX Orin 开发者套件（64GB）的常见问题解答——开箱内容、安装
  设置、显示与供电、软件与支持。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# 常见问题 FAQ

## 安装设置

**包装里都有什么？**
Jetson AGX Orin 模组与参考载板、Wi-Fi 模块、USB Type-C 电源适配器，以及一根
USB Type-C 转 USB Type-A 数据线。显示器（DisplayPort）、键盘和鼠标需自备，
另可选配网线——参见[快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)。

**套件自带操作系统吗？**
是的——eMMC 出厂时已预先刷好系统，套件开箱即可直接启动进入 Ubuntu 桌面。出货的
设备可能搭载较旧的 L4T 版本；推荐的更新方式是 Jetson ISO（无需主机 PC）。参见
[快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)。

**需要一台单独的电脑才能完成设置吗？**
不需要，推荐方式不需要——Jetson ISO 从 U 盘安装。只有在使用其他安装方式
（SDK Manager / 刷机脚本）或进行无头模式的首次设置时，才需要一台主机 PC
（Ubuntu）。参见[刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)。

**当前是哪个软件版本？**
JetPack **7.2.1**（Jetson Linux **39.2.1**、Ubuntu 24.04、CUDA 13.2.2、
TensorRT 10.16.2）。用[验证你的系统](/zh-hans/tutorials/jetson-agx-orin/verify-your-system)
查看你的套件实际运行的版本。

## 显示与供电

**可以接我的 HDMI 显示器吗？**
只能通过**主动式** DisplayPort→HDMI 转接器或转接线——套件只有 DisplayPort
输出（没有 HDMI 接口，也不支持 DP-over-USB-C）。支持 MST，最多可连接两台
显示器。详见[接口与硬件布局](/zh-hans/tutorials/jetson-agx-orin/interfaces)。

**如何给套件供电？**
使用随附的 USB-C 电源适配器，插入 DC 接口上方（J24）的 USB-C 端口。如果你通过
桶形插孔（J41）自备电源：外径 5.5 mm、内径 2.5 mm、内正极。

## 使用套件

**这套开发套件能模拟其他 Jetson 模组吗？**
可以。开发套件与所有 Jetson Orin 模组共享同一 SoC 架构，可以重新刷机来模拟
AGX Orin、Orin NX 或 Orin Nano 的性能与功耗特性。出厂配置为 AGX Orin 系列。

**量产产品会用到这个模组吗？**
不会。量产产品基于 Jetson Orin **模组**（64 GB / 32 GB / 工业版）构建，搭载在
你自有或合作方提供的载板上。开发者套件是开发与原型验证的载体。

**能运行大语言模型 / 智能体 AI 吗？**
可以——这是 Orin 平台的核心用例之一。在 JetPack 7.2 上，开发套件可用一条命令
安装 NVIDIA NemoClaw，用于本地与云端的模型编排；[Jetson AI Lab](https://www.jetson-ai-lab.com)
还发布了动手教程。

**机器人方面：JetPack 7.2 上能用 Isaac ROS 吗？**
可以——Isaac ROS 自 **4.6.0** 版（2026-08-18）起已支持 JetPack 7.2 上的
Jetson Orin，并提供官方的 AGX Orin 设置教程。注意，NVIDIA 的 JetPack 下载
页面仍显示“即将推出”：Isaac ROS 独立于 JetPack 发布，因此以其自身的发布
说明为准。关于版本与 ROS 2 发行版的选择（4.6.x = Jazzy、5.0 = Lyrical）以及
已知限制，参见[机器人(现状)](/zh-hans/tutorials/jetson-agx-orin/robotics)。

## 支持与服务

**从哪里可以获得技术支持？**
- 平台问题：[NVIDIA Jetson 开发者论坛](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)——先搜索；提问时请附上 `cat /etc/nv_tegra_release` 的输出。
- 钜犀科技技术支持：**support@juxitech.com**
- 订单、保修与 RMA：**support@juxitech.com**（为加快处理，请附上订单号）
- 销售与报价：**sales@juxitech.com**
- 产品问题（选型、兼容性）：**pe@juxitech.com**

**从哪里可以购买配件（NVMe 存储、摄像头、电源）？**
浏览钜犀科技产品目录：**<https://wiki.juxitech.com/products/>**——
其中包含 Jetson 相关配件，例如
[IMX219 CSI 摄像头](https://wiki.juxitech.com/products/imx219-csi-camera)
（专为 NVIDIA Jetson 打造）、USB 自动对焦摄像头，以及
[RealSense 深度相机](https://wiki.juxitech.com/products/realsense-depth-camera)。
如需选购建议，请联系 sales@juxitech.com。

## 来源

- Jetson AGX Orin 开发者套件用户指南——[简介](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)、[快速开始](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)（查阅于 2026-09-23）
- [JetPack SDK 下载](https://developer.nvidia.com/embedded/jetpack/downloads)（查阅于 2026-09-23）

*状态：已于 2026-10-11 审核。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非
NVIDIA 官方出版物。
