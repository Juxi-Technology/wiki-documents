---
title: 从 JetPack 6.x 迁移到 JetPack 7.2
sidebar_label: 从 JetPack 6.x 迁移
slug: /migration/jetpack-6-to-7
description: >-
  Jetson AGX Orin 开发者套件上 JetPack 6.x 与 JetPack 7.2.1 之间的变化、需要重新构建的内容,以及推荐的迁移顺序。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
review_owner: cheny
---

# 从 JetPack 6.x 迁移到 JetPack 7.2

本页面向已在 AGX Orin 开发者套件上使用 JetPack 6.x 的用户。
新到手的套件请改从[快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)开始。

## 有哪些变化

| 层级 | JetPack 6.x 时代 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x(6.2 使用 36.4.x) | **39.2.1** |
| 操作系统 / 根文件系统 | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux 内核 | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.1** |
| TensorRT | 10.x(6.x 时代) | **10.16.2** |

> JetPack 6.x 一列的数值仅为示意(JetPack 6.2 时代)。规划前请先用
> `cat /etc/nv_tegra_release` 确认**你**当前的确切版本,各版本的
> 详细说明参见 NVIDIA 的
> [JetPack 存档](https://developer.nvidia.com/embedded/jetpack-archive)。

## 7.2 系列中 Orin 有哪些新变化

摘自 Jetson Linux 39.2 发行说明:

- **Jetson Orin 系列加入 JetPack 7** 软件线(与 Thor 同代)。
- **统一 ISO 安装**——U 盘安装路径,无需主机 PC。
- 面向智能体 AI 工作流的 **NemoClaw** 单命令安装。
- 面向自定义生产镜像的官方 **Yocto/OpenEmbedded 配方**(OE4T)。
- 摄像头栈:**SIPL API v2.0**(GMSL 与 CoE)——注意本版本有 **ABI 变更**:为 JetPack 7.1 构建的 UDDF 驱动必须针对 JetPack 7.2 头文件重新构建。
- *(AGX Orin 32GB Super Mode / MAXN_SUPER 为 32GB 机型专属,不适用于 64GB 开发者套件。SBSA 与 MIG 的变更与 Jetson Thor 相关。)*

## 无法沿用的内容——计划重新构建

- **树外内核模块**——内核已升级到 6.8;模块必须针对新头文件重新构建。
- **摄像头驱动与设备树定制**——需针对 39.2 重新构建;SIPL 2.0 还带来了 UDDF 驱动的 ABI 变更。
- **TensorRT 引擎**——序列化引擎与 TensorRT 版本绑定;需在目标设备上用 TensorRT 10.16.2 重新构建。
- **CUDA 二进制文件**——需用 CUDA 13 重新构建;不要指望 12.x 的二进制能够直接沿用。
- **容器**——切换到兼容 JetPack 7 的镜像(例如更新后的 NGC 容器)。
- **Python 环境与系统服务**——需针对 Ubuntu 24.04 重建(软件包名称、软件源与解释器版本均已变化)。

## 推荐的迁移顺序

1. 在*清空任何内容之前*,先**确认你的软件栈在 7.2.1 上受支持**——逐一核对你依赖的每个组件,对照 NVIDIA 的 [JetPack 7.2.1 组件列表](https://developer.nvidia.com/embedded/jetpack/downloads)(例如,Isaac ROS 在本版本中标注为“即将推出”)。
2. **备份:**应用数据、传感器标定文件、容器卷、设备树源码、TensorRT 构建脚本/ONNX 模型。
3. **刷写 JetPack 7.2.1** ([刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)),并验证:启动、存储、网络,以及 Force Recovery 模式仍然可用。
4. **恢复外设:**Wi-Fi、摄像头、CAN 或现场总线驱动——均针对内核 6.8 重新构建。
5. **在目标设备上重新构建** CUDA 应用、TensorRT 插件与 TensorRT 引擎。
6. **先在应用原有的电源模式下完成验证**;确认无误后再尝试其他性能模式。
7. **记录基线:**内存占用、温度、功耗、延迟、吞吐量——在转入生产之前完成。

## 回滚

- 清空之前,请为当前系统保留一份**确认可用的副本**(一张备用的 NVMe/eMMC 镜像,或至少保留第 2 步中的数据)。
- ISO 安装器可以安装你手上持有安装介质的任何 L4T 版本——如果可能需要回退,请保留旧版安装 U 盘。
- 面向批量设备:分阶段推进,并优先采用带独立恢复路径(恢复 U 盘 + 备份镜像)的方案,而不是原地升级。

## 资料来源

- [Jetson Linux 39.2.0 发行说明(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)——*What's New*、已知问题(检查于 2026-09-23)
- [JetPack SDK 下载——组件列表](https://developer.nvidia.com/embedded/jetpack/downloads)(检查于 2026-09-23)
- [Seeed Studio JetPack 7.2 资源中心](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/)——次要来源;仅用于迁移主题的组织(检查于 2026-09-23)

*状态:草稿,待 cheny 审核。内容依据所列日期的 NVIDIA 官方
文档;尚未由钜犀科技在实机上验证。重新构建清单描述的是平台层面的标准后果
(内核/TensorRT/CUDA 版本变更)——请结合你自己的软件栈进行验证。*

---

NVIDIA® 与 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布,并非 NVIDIA
官方出版物。
