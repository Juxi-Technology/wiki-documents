---
title: 快速开始——从开箱到可用的 JetPack 7.2.1 系统
sidebar_label: 快速开始
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit（8GB）的首次设置：
  固件检查、将 Jetson 7.2.1 ISO 写入 U 盘，以及把
  JetPack 7.2.1（L4T r39.2.1）安装到 microSD 卡或 NVMe SSD。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 快速开始

本页将带你把 NVIDIA Jetson Orin Nano Super Developer Kit（8GB）从开箱一路装到可用的 **JetPack 7.2.1** 系统（Jetson Linux / L4T r39.2.1）。它遵循 NVIDIA 推荐的首次设置路径：**Jetson ISO** 方式，从 U 盘安装，无需 Ubuntu 主机 PC。

**三步流程：**

1. **通过固件门槛。** 出厂固件较旧时，必须先完成更新才能安装 JetPack 7.2（第 1 步）。
2. **制作安装 U 盘。** 下载 Jetson ISO，并用 Balena Etcher 将其写入 U 盘（第 2–3 步）。
3. **安装与设置。** 安装到 microSD 卡或 NVMe SSD，完成 Ubuntu 初始设置，然后安装 JetPack 组件（第 4–7 步）。

> **重要**
> 从 JetPack 7.2 开始，NVIDIA 不再为该套件发布 microSD 卡镜像。**没有可刷写的 SD 卡镜像**。安装介质是 U 盘。microSD 卡（或 NVMe SSD）只是**安装目标**。以“把镜像写入 microSD 卡”开头的旧教程已不再适用。

## 箱内物品

- Jetson Orin Nano 8 GB 模块（带散热器），安装在参考载板上
- 19 V 电源适配器
- 一块 802.11ac/ab/gn 无线网络接口控制器（已装入 M.2 Key-E 插槽）
- 一张快速开始与支持卡片

**包装内不含任何存储介质。** 箱内没有 microSD 卡，也没有 NVMe SSD；模块本身不含内置 eMMC 存储。所有存储都来自你自行安装的卡或硬盘。

## 需要自备的物品

- **存储 —— 以下二选一：**
  - 一张 **microSD 卡，64 GB UHS-1 或更大**（推荐）。插入**模块底面**的卡槽；请在启动安装盘之前插好。
  - 一块 **NVMe SSD**，装入载板上的一个 M.2 Key-M 插槽。可选，但推荐——容量更大、存储性能更好。
- 一个 **U 盘，16 GB 或更大** —— 它将被制作为安装盘。
- 一台**笔记本电脑或 PC**（Windows、Mac 或 Linux），至少有 **25 GB 可用空间** —— 用于下载 ISO 并写入 U 盘。
- 一台 **DisplayPort 显示器**，以及 USB 键盘和鼠标。DisplayPort 是套件上唯一的显示输出；不支持 HDMI 输出，也不支持通过 USB-C 输出 DisplayPort。使用 HDMI 显示器时，需搭配主动式 DisplayPort 转 HDMI 转接器。
- 不用显示器时：一根 **USB 转 TTL 串口线**，用于无头串口控制台（见第 1 步）。

![microSD 卡](/images/jetson-orin-nano/microsd_64gb.png)
*目标存储选项 1：一张 64 GB UHS-1 microSD 卡。*

![NVMe SSD](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*目标存储选项 2：装入 M.2 Key-M 插槽的 NVMe SSD。*

> **钜犀提示：** 钜犀商店针对该套件的套餐额外包含一张 64 GB microSD 卡和一块 M.2 Wi-Fi 模块。该卡出厂时**未预装镜像**（空白卡），请按本页的 ISO 流程把系统安装到卡上。

## 第 1 步 —— 检查固件门槛

JetPack 7.2 及更高版本的安装**要求开发套件具备 JetPack 6.x 世代的 UEFI/QSPI 固件**。如果你的套件仍是更早的出厂固件，请先完成 **JetPack 6.x 更新路径**。

连接显示器时：

1. 连接 DisplayPort 显示器、USB 键盘，并接上 19 V 电源——套件会自动开机，USB-C 接口旁的绿色 LED 点亮。
2. **NVIDIA 启动画面出现后，连续按 `Esc`。** 这会打开 UEFI 设置菜单。
3. 查看屏幕顶部附近的**固件版本**一行：

| 固件版本 | 该怎么做 |
|---|---|
| 36.x 或更新 | 继续第 2 步 |
| 低于 36.0 | 先完成 JetPack 6.x 更新路径（见下文） |

![显示固件版本的 UEFI 菜单](/images/jetson-orin-nano/firmware-version-check.png)
*固件版本显示在 UEFI 设置菜单顶部附近。*

无头替代方案：将 USB 转 TTL 串口线接到按键排针（转接器的 TX 线接引脚 3 / RXD，RX 线接引脚 4 / TXD，接地线接引脚 7 / GND），在 PC 上打开串口控制台，并在显示预启动选项时于控制台中按 `Esc`。

![接在按键排针上的 USB 转 TTL 串口线](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*无头方案：USB 转 TTL 串口线连接到按键排针。*

### 如果固件过旧

**JetPack 6.x 更新路径**可将固件升级到符合要求的版本。简要步骤如下（完整步骤见[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)）：

1. 从 microSD 卡启动 **JetPack 5.1.3** 桥接镜像（文件名 `JP513-orin-nano-sd-card-image_b29.zip`）。
2. 后台服务会安排一次 bootloader 更新（用 `sudo systemctl status nv-l4t-bootloader-config` 检查）。
3. 重启。固件更新在这次启动过程中执行（用 `sudo nvbootctrl dump-slots-info` 检查）。
4. 安装 QSPI 更新程序：先执行 `sudo apt update`，再执行 `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`，然后重启。
5. 关机，取出桥接卡，插入你的目标存储，然后继续第 2 步。

该路径需要一张 microSD 卡和一个读卡器。如果没有，替代方案是在 Ubuntu 主机上使用 SDK Manager（见[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)）。还有一种情况：如果固件来自 BSP 36.2（JetPack 5.0 DP），安装器内的 capsule 更新不支持它——请先把套件更新到任一更晚的版本，再运行 JetPack 7.2.1 ISO 安装。

如果你仍然启动了安装盘，而屏幕保持黑屏或进入 UEFI shell，通常说明固件过旧。不要反复重试启动。请关机，先完成更新路径，再重试。

![UEFI 交互式 shell](/images/jetson-orin-nano/uefi_interactive_shell.png)
*出现 UEFI shell（或黑屏）而不是安装器，通常说明固件对目标 JetPack 版本来说过旧。*

## 第 2 步 —— 下载 Jetson ISO

从 [JetPack 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)下载 JetPack 7.2.1 安装 ISO（标注：**Jetson ISO (r39.2.1)**），或使用下面的直链：

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

ISO 文件名遵循 `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` 的格式（本版本为 `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`）。NVIDIA 的下载页面不列出 ISO 的文件大小或校验和。

## 第 3 步 —— 将 ISO 写入 U 盘

1. 从 <https://etcher.balena.io/#download-etcher> 安装 **Balena Etcher**（Windows、Mac 或 Linux）。
2. 将 U 盘插入你的 PC。
3. 在 Etcher 中选择 ISO 文件、选择 U 盘，然后开始写入。

![用 Balena Etcher 将 Jetson ISO 写入 U 盘](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*用 Balena Etcher 将 Jetson ISO 写入 U 盘。*

> **注意**
> **不要把 ISO 写入 microSD 卡。** 从 JetPack 7.2 开始，不再支持 SD 卡镜像。请把 ISO 写入 U 盘，再用它把 Jetson Linux 安装到你的 microSD 卡或 NVMe SSD 上。

用文件管理器把 ISO 文件复制到 U 盘是行不通的——必须按磁盘镜像方式写入。制作完成的 U 盘只是一个安装盘；它无法引导进入可用的桌面系统。

## 第 4 步 —— 启动安装盘并安装

1. 关闭套件电源，然后安装**目标存储**：
   - microSD 卡：插入**模块底面**的卡槽。
   - NVMe SSD：装入载板上的 M.2 Key-M 插槽。
   请在启动安装盘之前装好目标存储。
2. 插入安装 U 盘。连接显示器、键盘和鼠标，然后接上电源。安装盘应**直接**插入套件，而不是经过 USB 集线器：NVIDIA 记录了一款会破坏 ISO 安装的 USB 3.0 集线器（型号 UH400），以及一款可能导致刷机失败的 USB 转以太网转接器（TRENDnet TU2-ET100）。详见**[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)**。
3. **NVIDIA logo 启动画面出现时按 `Esc`。** 选择 **Boot Manager**，选中你的 USB 磁盘，按回车从它启动。NVIDIA 建议显式选择 USB 磁盘，以确保运行的是正确的安装盘。
4. **QSPI capsule 更新提示出现时，在 30 秒内按 `Y`。** 这是最常被错过的一步。该提示在实际操作中很容易错过。如果它超时、安装未经更新就继续，安装会在之后失败——请重新开始安装，并在提示出现时按 `Y`。capsule 更新分**两轮**执行，套件可能在两轮之间或之后重启。这属于正常现象；请等两轮都完成。当前 QSPI 固件为 r38.2.0/r38.2.1 的套件，必须在第一轮完成后**再次**确认固件更新（r39.2.1 发布说明已知问题 6480645）——如出现提示，再按一次 `Y`。
5. 在 **Jetson BSP 安装 GRUB 菜单**中，选择 **Install Jetson ISO r39.2.1**。选择目标存储设备（microSD 卡或 NVMe SSD）并确认。**安装会清空所选设备**——确认前请核对选择。
6. 等待安装完成。NVIDIA 的说明称，屏幕上会有数分钟的白色文字滚动输出；出现提示时重启。社区报告的安装时长差异很大——从约 15 分钟到长得多（未经证实，来自论坛报告）。
7. **拔出 U 盘**，让套件从目标存储启动新系统，而不是再次启动安装盘。

NVIDIA 员工在论坛上还建议：ISO 安装期间保持显示器连接。

## 第 5 步 —— 首次开机与 Ubuntu 初始设置

安装盘重启后，套件会启动 Ubuntu 初始设置（`oem-config`）：

1. 阅读并接受 NVIDIA Jetson 软件最终用户许可协议（EULA）。
2. 选择系统语言、键盘布局和时区。
3. 连接网络。
4. 创建用户名、密码和计算机名。
5. 登录 Ubuntu 桌面。

## 第 6 步 —— 安装 JetPack 组件

ISO 安装的是基础系统（Jetson Linux）。CUDA、cuDNN、TensorRT 以及 JetPack 软件栈的其余部分要在首次开机后再安装。在套件桌面上打开终端，运行：

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

安装完成后如有提示，请重启。

检查结果：

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` 应显示 R39 发行版、revision 2.1。完整检查清单见[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)。

## 第 7 步 —— 检查电源模式

默认电源模式通常为 **25W**。要获得最大性能，点击 Ubuntu 桌面顶栏中的当前电源模式，选择 **Power Mode**，然后选 **MAXN SUPER**；在命令行中，`sudo /usr/sbin/nvpmodel -q` 显示当前模式。JetPack 7.2.1 的 ISO 安装默认采用 Super Mode 刷机配置，因此 25W 和 MAXN SUPER 应当可用——如果缺失，见[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。

![在电源模式菜单中选择 MAXN SUPER](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*选择 Power Mode → MAXN SUPER，获得最大性能。*

## 快速排查

| 现象 | 首先检查 |
|---|---|
| 套件无法开机 | 19 V 电源必须接在 DC 电源接口上。套件会自动开机；USB-C 接口旁的绿色 LED 应点亮。 |
| USB 安装盘无法启动 | 在 UEFI 引导管理器中显式选择该 USB 磁盘（启动画面时按 `Esc`）。并确认固件为 36.x 或更新。 |
| 出现黑屏或 UEFI shell，而不是安装器 | 固件可能过旧。请先完成 JetPack 6.x 更新路径。 |
| 安装器跳过了语言/网络/用户名设置；首次启动卡在黑屏 | 错过了 QSPI capsule 提示。重新开始安装，并在 30 秒内按 `Y`。 |
| 安装器不显示目标存储 | microSD：检查是否已完全插入模块底面的卡槽。NVMe：重新插拔硬盘并重启安装器。 |
| 只有 7W/15W 电源模式；缺少 25W 和 MAXN SUPER | 见[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。 |

## 来源与核实

- [Jetson Orin Nano 开发者套件用户指南——快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——JetPack 6.x 更新路径](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——JetPack SDK 设置](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html)（核对于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——硬件布局](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（核对于 2026-09-26）
- [JetPack SDK 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)（核对于 2026-09-26）
- [Jetson Linux 39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（核对于 2026-09-26）

*状态：草稿，待 cheny 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

**图片来源：** 本页所有截图均来自 NVIDIA 官方 *Jetson Orin Nano Developer Kit User Guide*（下载于 2026-09-26），版权归 © NVIDIA Corporation 所有。此处转载用于说明官方设置流程。

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
