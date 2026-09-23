---
title: 刷机与更新——BSP 安装方式
sidebar_label: 刷机与更新
slug: /getting-started/flashing-and-updates
description: 在 Jetson AGX Orin 开发者套件上安装或更新 BSP 的三种官方方式——Jetson ISO(推荐)、NVIDIA SDK Manager 与 Linux_for_Tegra 刷机脚本——以及如何进入 Force Recovery 模式。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# 刷机与更新——BSP 安装方式

NVIDIA 提供三种官方方式,用于在开发者套件上安装或更新 BSP。按你的情况选择:

| | 💾 从 eMMC 开始 | 🛠️ SDK Manager | 📜 刷机脚本 |
|---|---|---|---|
| 简要说明 | 启动预烧录的 eMMC,用 Jetson ISO 更新 | 主机 PC 上的 GUI 工具;可刷写 BSP,并可安装 JetPack 组件 | 主机 PC 上的 `flash.sh` 脚本 |
| Ubuntu 主机 PC | **不需要** | 需要 | 需要 |
| 典型耗时 | 首次启动即可用;ISO 更新约需 15 分钟 | 刷机约需 30 分钟 | 视具体环境而定 |
| 适用人群 | 所有人(推荐的默认方式) | 拥有 Ubuntu PC 的用户;需要刷写 NVMe/microSD/USB,或套件无法联网时 | 产品开发者、进阶用户 |

> **钜犀提示:** 当前版本为 **JetPack 7.2.1 (L4T r39.2.1)**。如果你的套件是全新到手的,请先看 **[快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)**——它会带你完整走一遍推荐流程。

## 方式一——从 eMMC 开始,用 Jetson ISO 更新(推荐)

你的开发者套件出厂时 eMMC 中已预烧录 L4T BSP,开箱即启动进入 Ubuntu 桌面。推荐的更新方式是 **Jetson ISO**——一个可启动的 USB 盘,可**无需 Ubuntu 主机 PC** 更新套件。

**前提条件:** 已安装的 BSP 必须为 **L4T r35.5 或更高版本**(可用 `cat /etc/nv_tegra_release` 查看)。较旧的套件需先使用主机 PC 方式(见下文方式二或方式三)。

完整的分步流程(用 Balena Etcher 制作 USB 启动盘、UEFI 引导、QSPI capsule 提示、GRUB 菜单、存储介质选择、首次启动)见 **[快速开始 → 第 2 步](/zh-hans/tutorials/jetson-agx-orin/quick-start)**。

NVIDIA 文档中的要点:

- 在 GRUB 菜单中选择安装目标:**eMMC** 或 **NVMe**(如果你加装了 SSD,推荐选 NVMe)。
- 出现提示时,按 `Y` 确认 **QSPI capsule 更新**——这是兼容性所必需的,且会执行两次。跳过会导致安装问题(该问题也作为已知问题 6266271 列于 L4T 发布说明中)。
- 在已运行 JetPack 7.2.1 的系统上重装是受支持的——请仔细按照官方说明操作。

## 方式二——NVIDIA SDK Manager(主机 PC)

在以下情况下选择 SDK Manager:

- 需要把基础 L4T BSP 刷写到 eMMC 之外的**其他存储介质**(NVMe SSD、USB 驱动器或 microSD 卡),或
- 需要刷写**无法直接接入互联网**的套件。

**主机 PC 要求**(依据 NVIDIA SDK Manager 文档):x86_64 上的 Ubuntu Desktop **20.04 或 22.04**、8 GB 系统内存、25 GB 可用磁盘空间,以及用于下载工具并登录的 **NVIDIA Developer Program 会员资格**(免费)。注意:L4T 39.2 发布说明中将用于刷机的主机 Linux 发行版列为 Ubuntu **24.04 和 22.04**——这一块变化较快,请以 NVIDIA SDK Manager 系统要求页面上的最新列表为准。

**安装并登录:**

1. 从 NVIDIA 下载 SDK Manager 的 `.deb` 包并安装:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. 用 `sdkmanager` 启动,点击 **NVIDIA DEVELOPER** 标签页并登录。

**硬件连接与 Force Recovery 模式:**

1. 用随附的 USB-A↔USB-C 线缆将套件连接到主机 PC,插到**40-pin 排针旁的 USB-C 口**(标注为 port 10 / J40)。
2. **按住中间的 Force Recovery 按键**(按键 2,位于 Power 与 Reset 之间),同时将 USB-C 电源插入 DC 接口上方的 USB-C 口。套件会以 **Force Recovery 模式**开机。
3. 在主机上,SDK Manager 应能检测到套件。*(如果没有,请参阅[故障排查](/zh-hans/tutorials/jetson-agx-orin/troubleshooting)。)*

**SDK Manager 中的刷机步骤**(摘要——请按屏幕提示操作):

1. **步骤 01:** 产品类别选择 **Jetson**,取消勾选 "Host Machine",选择 **Jetson AGX Orin** 模块,然后继续。
2. **步骤 02:** 若只需基础 BSP,仅选择 **Jetson OS**(取消勾选 "Jetson SDK Components")。接受许可协议。
3. **步骤 03:** 输入你的 sudo 密码;等待下载完成。在刷机对话框中选择 **"Manual Setup – Jetson AGX Orin"**,忽略 OEM 配置,选择要刷入的**存储设备**,然后点击 **Flash**。
4. 刷机完成后,套件会重启进入新的 BSP。完成 Ubuntu `oem-config`,然后安装 JetPack 组件(参见[快速开始 → 第 3 步](/zh-hans/tutorials/jetson-agx-orin/quick-start))。

## 方式三——Linux_for_Tegra 刷机脚本

面向进阶用户和产品开发者:Jetson Linux 软件包中的 `flash.sh`(或 initrd flash)脚本可从主机 PC 为 Jetson 设备刷机。请参阅 [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) 的 **Flashing Support** 章节。

来自 L4T 39.2 发布说明的主机与工具链信息:用于刷机的主机 Linux 发行版——Ubuntu 24.04 / 22.04;交叉编译工具链——GCC 13.2;源码发布标签——`jetson_39.2_GA`。

## Force Recovery 模式——如何进入

操作步骤与上文相同,进入该模式无需连接主机:

1. 在套件断电状态下,将 USB-C 数据线连接到主机(如需主机);
2. **按住中间的 Force Recovery 按键**,然后接入 USB-C 电源——套件即以 Force Recovery 模式启动。

要退出恢复模式,请重新上电或复位套件。在主机上,恢复模式通常表现为一个 NVIDIA USB 设备(可用 `lsusb` 查看)。

## 刷机之后

验证结果:**[验证你的系统](/zh-hans/tutorials/jetson-agx-orin/verify-your-system)**——检查 L4T、CUDA 以及整套 JetPack 组件的版本。

## 参考资料

- [BSP 安装——Jetson AGX Orin 开发者套件用户指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)(已于 2026-09-23 核对)
- [快速开始——同一指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)(已于 2026-09-23 核对)
- [Jetson Linux 39.2.0 发布说明(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)(已于 2026-09-23 核对)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*状态:草稿,待 cheny 审核。内容依据所列日期的 NVIDIA 官方文档;尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布,并非 NVIDIA 官方出版物。
