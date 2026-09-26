---
title: 接口与硬件布局
sidebar_label: 接口与硬件布局
slug: /product/interfaces
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit 的标注布局与连接器参考——
  每个端口、插槽、排针与控件，模块底面的 microSD 卡槽，摄像头连接器，
  电源与串口控制台。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# 接口与硬件布局

套件由两块板组成：**Jetson Orin Nano 模块**（P3767）安装在**参考载板**（P3768）上；完整套件为 P3766。本页介绍各连接器与控件，沿用 NVIDIA 的官方标注（1–12）。

## 编号布局——标注部件

![开发者套件的编号布局](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*官方编号布局——NVIDIA 的标注 1–12。*

| # | 部件 | 说明 |
|---|---|---|
| 1 | microSD 卡槽 | 位于**模块底面**——见下文 |
| 2 | 40 针扩展排针 | UART、SPI、I2S、I2C、GPIO |
| 3 | 电源指示灯 | 绿色；套件通电时点亮 |
| 4 | USB-C 端口 | 主机、设备和 USB Recovery 模式；无视频输出 |
| 5 | 千兆以太网端口 | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps；两个双层堆叠连接器 |
| 7 | DisplayPort 输出 | **套件上唯一的显示输出** |
| 8 | DC 电源接口 | 5.5 mm × 2.5 mm 桶形接口 |
| 9 | MIPI CSI 摄像头连接器 ×2 | 22 针，0.5 mm 间距 |
| 10 | M.2 Key-M 插槽（2280） | PCIe 3.0 ×4——用于 NVMe SSD |
| 11 | M.2 Key-M 插槽（2230） | PCIe 3.0 ×2——用于 NVMe SSD |
| 12 | M.2 Key-E 插槽（2230） | 已装入随附的无线模块 |

> **首先要知道的三件事：**
> - **存储：** 无 eMMC，**包装内也没有任何存储**。请自行加装 microSD 卡或 NVMe SSD。
> - **microSD 卡槽：** 位于**模块底面**——见下文。
> - **显示：** DisplayPort 是*唯一*的显示输出——没有 HDMI，也不能通过 USB-C 输出视频。

## microSD 卡槽——位于模块底面

![模块底面的 microSD 卡槽](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*卡片插入**模块底面**——NVIDIA 图片，附放大插图。*

> **注意：** microSD 卡槽（标注 1）位于**模块底面**，而不在载板上。这是本套件最容易被忽略的物理细节。请在启动安装盘之前插入卡片。

- 插有 microSD 卡时，套件会从该卡启动；推荐 64 GB UHS-1 或更大。
- 如果安装器没有显示该卡，NVIDIA 的排查指引是确认卡片已完全插入模块卡槽。
- JetPack 7.2 及更高版本没有 SD 卡镜像。要更换已安装的系统，请使用受支持的安装途径——见 **[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)**。

## 存储选项

- **microSD**（模块底面，标注 1）——模块的主要存储。
- **NVMe SSD**——2280 或 2230 尺寸，装入 M.2 Key-M 插槽（标注 10 和 11，见下文）。
- **USB 盘**——接在 USB-C 或 Type-A 口；启动顺序在 UEFI 引导管理器中设置。

该买什么、首次启动流程如何，见 **[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)**。

## USB

| 端口 | 速度 | 模式 | 说明 |
|---|---|---|---|
| USB 3.2 Type-A ×4（标注 6） | USB 3.2 Gen 2，10 Gbps | 仅主机 | 两个双层堆叠连接器；每个堆叠连接器的 VBUS 限流 3 A |
| USB-C（标注 4） | USB 3.2 Type-C | 主机、设备、USB Recovery | 仅数据——该端口不输出视频 |

在**设备模式**下，USB-C 口会把这台套件以如下身份呈现给主机 PC：

- 一个大容量存储设备，内含 **L4T-README** 文件；
- 一个 USB 串口设备；
- 一条 USB 以太网（RNDIS）链路——Jetson 的地址是 **192.168.55.1**。

## DisplayPort 输出

- 仅一个输出（标注 7）：**DisplayPort 1.2，支持 MST**。没有 HDMI 端口，USB-C 口也不传输视频。
- 接 HDMI 显示器时，请使用 DisplayPort 转 HDMI 转接器。
- 如果没有显示输出，请将显示器直连——不要经过 KVM 切换器或转接链。

## 以太网

- 1× 千兆以太网（RJ45），标注 5。套件没有 10 GbE 端口。

## M.2 插槽

| 标注 | 插槽 | 尺寸 | 电气规格 | 适配 |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | NVMe SSD |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | NVMe SSD |
| 12 | M.2 Key-E | 2230 | — | 随附的无线模块（已装入） |

### 无线模块

- Key-E 插槽出厂时**已装入模块**。NVIDIA 仅将该卡描述为“802.11ac/ab/gn 无线网络接口控制器”——未给出芯片名称。
- 社区报告（未经证实）指认原装卡为 **Realtek RTL8822CE**（AzureWave 模块，PCI ID 10ec:c822）。这属于社区信息，并非 NVIDIA 的说明。
- 官方支持的 NVMe 型号与 Key-E 模块列在 Jetson 下载中心的“Jetson supported components information”列表中，而不在公开页面上。购买前请先在那里核对部件。
- 如果该卡搜不到你的网络——例如使用 MBSSID 的 6 GHz 路由器——见 **[故障排查 → Wi-Fi 搜不到网络](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)**。

## CSI 摄像头连接器

- 两个连接器（标注 9）：22 位、0.5 mm 间距、底部接触柔性排线。
- **CAM0：** CSI 1×2 lane。**CAM1：** CSI 1×2 lane 或 1×4 lane。
- 15 针摄像头（例如 Raspberry Pi Camera Module v2）需要一根 15 转 22 针排线。

## 40 针扩展排针（标注 2）

- GPIO 与外设接口：UART、SPI、I2S、I2C、GPIO。
- 关于引脚定义、电压电平和电气限制，NVIDIA 指向 *Jetson Orin Nano Developer Kit Carrier Board Specification*（Jetson 下载中心）。本页编写时无法访问该文档。

## 按键排针（12 针）

按键排针承载串口控制台、复位和 force-recovery 功能。

| 引脚 | 功能 |
|---|---|
| 3 (RXD)、4 (TXD)、7 (GND) | 串口控制台（UART） |
| 9 + 10 | Force Recovery 模式——短接引脚，然后上电 |
| 7 + 8 | 复位——系统通电时短接引脚 |
| 跳线 | 设定自动开机行为 |

### 串口控制台

- 连接 USB-TTL 串口转接器：转接器的 TX 接引脚 3 (RXD)，RX 接引脚 4 (TXD)，GND 接引脚 7。
- 这是无头方案的兜底手段。如何抓取启动日志，见 **[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)**。

### Force Recovery 与复位

- **Force Recovery 模式：** 短接引脚 9 和 10，然后给套件上电。
- **复位：** 套件开机时，短接引脚 7 和 8。
- Force Recovery 模式用于刷机流程——见 **[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)**。

## 电源

- **DC 电源接口（标注 8）：** 5.5 mm × 2.5 mm 桶形接口；请使用随附的 19 V 电源。
- **自动开机：** 默认情况下，接上 DC 电源套件即自动开机。按键排针上的跳线可以改变这一行为。
- **电源 LED（标注 3）：** 套件通电时，USB-C 接口旁的绿色 LED 点亮。
- NVIDIA 已核对的页面未说明随附电源的额定电流或接口极性。如需使用第三方电源，请与供应商确认这两点。

## 风扇连接器

- 载板上有一个 4 针风扇排针。
- 模块出厂自带散热器；官方图片显示风扇集成在散热器导流罩内。该排针用于替换散热方案。
- NVIDIA 已核对的页面未说明模块的工作温度范围或 Tj 上限——这些内容在 *Jetson Orin Nano Series Data Sheet* 和 *Orin NX/Orin Nano Thermal Design Guide* 中，二者都位于需要登录的下载中心。

## 尺寸

- **模块：** 69.6 mm × 45 mm，260 针 SO-DIMM 连接器。
- **套件：** 两份官方数据不一致——数据手册（2024 年 12 月）为 **103 mm × 90.5 mm × 34.77 mm**；NVIDIA 产品家族表为 **100 mm × 79 mm × 21 mm**。两者对高度的定义都包含脚垫、载板、模块和散热方案。
- NVIDIA 未发布任何对账说明。经销商的一种解释（带底座整机 vs. 裸载板）**未经证实**。

> **钜犀提示：** 设计外壳之前，请以 NVIDIA 最新数据手册确认尺寸。

## 参考资料

- [硬件布局——Jetson Orin Nano 开发者套件用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（核对于 2026-09-26）
- [快速开始——Jetson Orin Nano 开发者套件用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（核对于 2026-09-26）
- [How-To——Jetson Orin Nano 开发者套件用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（核对于 2026-09-26）
- [故障排查——Jetson Orin Nano 开发者套件用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)（核对于 2026-09-26）
- [Jetson Orin Nano Super Developer Kit 数据手册（PDF，2024 年 12 月）](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf)（核对于 2026-09-26）
- [Jetson Orin NX/Nano 系列——模块适配与 Bring-Up，L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html)（核对于 2026-09-26）
- [Jetson Orin 产品家族——developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin)（核对于 2026-09-26）
- [NVIDIA 开发者论坛——“Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)”，社区帖](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697)（核对于 2026-09-26）

*状态：草稿，待 cheny 审核。以上步骤与数值依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

**图片来源：** 布局图来自 NVIDIA 官方 *Jetson Orin Nano Developer Kit User Guide*（下载于 2026-09-26），版权归 © NVIDIA Corporation 所有。

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
