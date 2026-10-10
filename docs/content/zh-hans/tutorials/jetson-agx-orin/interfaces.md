---
title: 接口与硬件布局
sidebar_label: 接口与硬件布局
slug: /product/interfaces
description: >-
  NVIDIA Jetson AGX Orin 开发者套件的布局标注与接口参考——按键、端口、载板连接器、显示与存储选项、40 引脚排针与自动化排针。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# 接口与硬件布局

开发套件有两套参考体系:NVIDIA 官方指南和本页使用的**侧视图编号标签(0–12)**,以及印在 PCB 上的**载板连接器编号(J 编号)**。两套编号都请随时对照——我们其余的指南都会引用它们。

## 侧视图——标注部件

![开发者套件,按键与 DC 输入视角](/images/jetson-agx-orin/jaodk_labeled_01.png)
![开发者套件,PCIe 盖板与 40 引脚视角](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | 部件 | 说明 |
|---|---|---|
| 0 | 白色 LED | 电源指示灯 |
| 1 | Power 按键 | |
| 2 | Force Recovery 按键 | 用于 Recovery / 刷机模式 |
| 3 | Reset 按键 | |
| 4 | USB Type-C 口 | 仅 DFP(连接外设) |
| 5 | DC 电源接口 | 桶形插孔——规格见 J41 |
| 6 | 以太网口 | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | DisplayPort 输出 | **套件上唯一的显示接口** |
| 9 | USB micro-B 口 | 用于调试 |
| 10 | USB Type-C 口 | 刷机与数据(UFP 和 DFP) |
| 11 | 40 引脚连接器 | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## 载板——连接器

| 标记 | 连接器 | 规格 / 说明 |
|---|---|---|
| DS2 | 白色 LED | |
| S1 / S2 / S3 | Power / Reset / Force Recovery 按键 | |
| J24 | USB Type-C(DC 接口上方) | 仅 DFP,USB 3.2 Gen 2——**随附的 USB-C 电源就接在这里** |
| J41 | DC 电源接口 | 外径 5.5 mm,内径 2.5 mm,内正极 |
| J17 | 以太网 | 最高 10GBASE-T |
| J33 | USB Type-A ×2(以太网口旁) | USB 3.2 Gen 2 |
| J18 | DisplayPort 输出 | 支持 MST |
| J26 | USB micro-B | 调试 UART |
| J40 | USB Type-C(40 引脚排针旁) | UFP 和 DFP——**配合 SDK Manager 连接主机 PC 时用的口** |
| J30 | 40 引脚连接器 | PCB 上 Pin 1 以白色三角形标记 |
| J42 | 自动化排针 | 自动开机、网络唤醒(Wake-on-LAN)、降频触发(引脚见下) |
| J13 | RTC 备份电池连接器 | |
| J509 | 摄像头连接器 | |
| J502 | JTAG 调试连接器 | |
| J505 | M.2 E-Key 插槽 | 通常安装 Wi-Fi 模组 |
| J511 | HD Audio 排针 | |
| J1 | M.2 M-Key 插槽 | 用于安装 NVMe SSD |
| J10 | microSD 卡槽 | UHS-1 |
| J3 | Jetson 模组连接器 | 699 引脚 |
| J6 | PCIe x16 连接器 | 电气上为 PCIe 4.0 ×8 |
| J9 | 风扇连接器 | 4 引脚,1.25 mm 间距 |

> **大家最先问的三个问题:**
> - **显示:**DisplayPort(J18)是*唯一*的显示输出——没有 HDMI 接口,也不能通过 USB-C 输出 DisplayPort。要接 HDMI 显示器,请使用主动式 DP→HDMI 转接器或转接线。
> - **供电:**随附的 USB-C 电源接在 **J24**(DC 接口上方的 USB-C 口)。如果你自备电源,也可以使用独立的桶形插孔输入(J41)。
> - **连接主机 PC:**使用 SDK Manager 或串口控制台时,请用 **J40**(40 引脚排针旁的 USB-C 口)——不是 J24。

## DisplayPort 输出

- 支持 DP SST、DP MST(最多 2 台外接显示器)和 DP DSC
- 最大分辨率:8K@30 / 4K@120(无论是否启用 DSC)
- 输出格式:RGB 8/10 bpc、YUV444 8/10 bpc

## 存储选项

- **默认:**模组上的 eMMC 闪存
- **可选:**NVMe SSD(M.2 M-Key,J1)· microSD 卡(J10,UHS-1)· USB 存储设备

Jetson ISO 安装器可把系统安装到 eMMC 或 NVMe;SDK Manager 则可将基础 L4T BSP 刷写到任意受支持的存储介质。

## 40 引脚排针(J30)

![40 引脚排针引脚定义](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*40 引脚排针引脚定义——来自 NVIDIA 载板规格书。*

![40 引脚排针上的 Pin 1 标记](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*PCB 上 Pin 1 以白色三角形标记。*

## 自动化排针(J42)

用于生产与自动化接线:

- Pin 1、12:GND
- Pin 2、3、4:输入,功能与 Recovery、Reset 和 Power 按键相同
- Pin 5–6:断开 = 禁用自动开机;短接 = 启用自动开机
- Pin 7:CVB_STBY 输出——指示模组是否处于休眠状态
- Pin 8:SYSTEM_OC 输入——触发 Tegra 降频
- Pin 9–10:断开 = 禁用关机状态下的 LAN 唤醒/开机;短接 = 启用
- Pin 11:JTAG_TRST——JTAG 测试复位

## 参考资料

- [硬件布局——Jetson AGX Orin 开发者套件用户指南](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)(已于 2026-09-23 核对)
- 载板相关细节请参阅 *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification*(链接见 NVIDIA 的[下载页面](https://developer.nvidia.com/embedded/downloads))

*状态:已于 2026-10-11 审核。以上步骤与数值依据所列日期的 NVIDIA 官方文档;尚未由钜犀科技在实体硬件上验证。*

**图片来源:**布局图与引脚图来自 NVIDIA 官方 *Jetson AGX Orin Developer Kit User Guide* 与 *Carrier Board Specification*(下载于 2026-09-23),版权归 © NVIDIA Corporation 所有。

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布,并非 NVIDIA 官方出版物。
