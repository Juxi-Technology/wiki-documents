---
title: 故障排查
sidebar_label: 故障排查
slug: /support/troubleshooting
description: >-
  面向 Jetson AGX Orin 开发者套件的症状驱动式故障排查——
  涵盖启动与显示、供电、刷机以及已知问题,内容以 NVIDIA 官方文档为依据。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# 故障排查

问题按症状分组——先找到你遇到的那一类,再按顺序逐项检查。本页内容均以 NVIDIA 官方文档为依据(来源见文末)。本页未涵盖的内容,请参阅文末的*获取帮助*。

## 套件无法开机

1. 随附的 USB-C 电源必须接到 **DC 接口上方的 USB-C 口**(J24)——而不是 40 引脚排针旁边的那个口。
2. 接通电源后,套件会自动开机;如果没有,请按一下**电源键**。
3. 如果你通过桶形插孔(J41)使用自备电源:外径 5.5 mm,内径 2.5 mm,**内正极**。

## 无显示输出 / 屏幕始终黑屏

- **DisplayPort 是唯一的显示输出。** 没有 HDMI 接口,也不支持通过 USB-C 输出 DisplayPort。若要接 HDMI 显示器,请使用**主动式** DP→HDMI 转接器或转接线。
- 首次启动时,屏幕可能要**长达一分钟**才会出现。
- 如果你使用了 **KVM 切换器**,请改为将显示器直接连接到套件——KVM 设备是已知的黑屏问题来源,正常启动和 ISO 安装期间都可能出现(NVIDIA 在安装指南中列出了这一点)。
- 电源配置有问题时启动?请参阅下文的*连接显示器时重启导致系统崩溃*——试试**不接**显示器启动,启动完成后再重新接上。

## 安装 ISO 后,套件启动的仍是旧系统

安装完成后请拔下安装 U 盘。如果 U 盘一直插着,套件可能会再次从它启动,而不是从刚安装好的系统启动。(官方指导。)

## 刷机——Jetson ISO 问题

- **套件无法从 U 盘启动:** 在启动过程中打开 **UEFI 引导管理器**,选择该 U 盘。
- **出现 QSPI 固件提示:** 按 **`Y`**。这项 capsule 更新是兼容性所必需的,且会执行两次。如果你错过了提示,或不确定它是否已完成,请**重新开始安装**并加以确认。跳过这一步会导致安装问题(NVIDIA 发布说明已知问题 6266271)。
- **我的套件早于 L4T r35.5:** ISO 方式要求已安装的 BSP 为 r35.5 或更高版本。请先用主机 PC 方式(SDK Manager 或 `flash.sh`)更新到 r35.5+——参见[刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)。

## 刷机——SDK Manager 问题

- **未检测到设备:** 请依次检查——
  1. 线缆插在 **40 引脚排针旁的 USB-C 口**(端口 10 / J40),而不是电源口;
  2. 套件已进入 **Force Recovery 模式**:按住**中间的 Force Recovery 按键**,同时插入电源插头;
  3. 主机满足要求:Ubuntu Desktop 20.04/22.04(x86_64)、8 GB 内存、25 GB 可用磁盘空间,并已登录 NVIDIA Developer Program 账户。(L4T 39.2 发布说明将用于刷机的主机发行版列为 24.04/22.04——请以 SDK Manager 系统要求页面上的最新列表为准。)
- **我想刷写到 NVMe / microSD / USB 盘:** ISO 安装器涵盖 eMMC 和 NVMe;其他目标需要使用 SDK Manager 或刷机脚本(主机 PC)。

## 连接显示器时重启导致系统崩溃(AGX Orin 64GB,15W 模式)

NVIDIA 发布说明中的已知问题 **6236259**:在 AGX Orin 平台上,systemd 初始化期间将 EMC 频率降到最高值以下(在 15W 等低功耗模式下会发生这种情况),可能导致系统在重启时崩溃——尤其是在连接了显示器的情况下。NVIDIA 给出的规避方法:

1. 重启前,先切换到 **MAXN** 电源模式(将 EMC 恢复到 Fmax)。
2. 系统重启后,再应用你需要的电源模式。
3. 如果是在问题模式下重启的:断开显示器,启动系统,待初始化完成后再重新接上显示器。

## 网络与无线(刷机后的说明)

- **刷机后无法连接 6 GHz / WPA3:** 重置设备后重试(L4T 39.2.0 中列作已修复;该重置说明仍适用于使用旧镜像刷机的设备)。
- **扫描时缺少部分 Wi-Fi 接入点(环境繁忙时):** 增大扫描缓冲区——`wpa_cli set bss_max_count 500`(出自发布说明的已修复问题章节)。

## 本页之外的已知问题

深入调试之前,请先查看当前发布说明中的**已知问题**章节——它涵盖常规系统、摄像头、多媒体、图形、连接性、显示和计算栈等条目:

- [Jetson Linux 39.2.0 发布说明(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## 获取帮助

- **[NVIDIA Jetson 开发者论坛](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** —— 官方社区;发帖前请先搜索,并附上 `cat /etc/nv_tegra_release` 的输出。
- **钜犀科技技术支持** —— 如需技术支持,或办理订单、保修和 RMA 事宜,请联系 **support@juxitech.com**。为加快处理速度,请附上你的订单号以及 `cat /etc/nv_tegra_release` 的输出。(销售: sales@juxitech.com · 产品咨询: pe@juxitech.com)

## 来源

- [快速开始](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP 安装](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [硬件布局](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) —— Jetson AGX Orin 开发者套件用户指南(已于 2026-09-23 核查)
- [Jetson Linux 39.2.0 发布说明(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)(已于 2026-09-23 核查)

*状态:已于 2026-10-11 审核。客户反馈的硬件相关行为可能存在差异;请根据陆续收到的现场反馈更新本页。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布,并非 NVIDIA 官方出版物。
