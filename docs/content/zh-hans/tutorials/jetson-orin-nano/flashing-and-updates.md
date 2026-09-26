---
title: 刷机与更新——BSP 安装方式
sidebar_label: 刷机与更新
slug: /getting-started/flashing-and-updates
description: >-
  在 Jetson Orin Nano Super Developer Kit 上安装或更新 BSP 的三种官方方式——
  Jetson ISO（推荐）、NVIDIA SDK Manager 和 Linux_for_Tegra 刷机脚本——
  以及存储选择、旧套件的 JetPack 6.x 固件更新路径和 Force Recovery 模式。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# 刷机与更新——BSP 安装方式

在 Jetson Orin Nano Super Developer Kit 上安装或更新 BSP（Jetson Linux），NVIDIA 官方支持三种方式。有两个硬件事实决定了所有方式的走向：**包装内不含任何存储**（无 eMMC、无 microSD 卡、无 SSD），且 JetPack 7.2 **移除了 SD 卡镜像**——U 盘上的统一 ISO 取而代之，而 microSD 卡本身仍是有效的安装目标。

| | Jetson ISO（推荐） | NVIDIA SDK Manager | Linux_for_Tegra 刷机脚本 |
|---|---|---|---|
| 简要说明 | 在任意 PC 上制作 USB 安装盘，从它启动套件；在套件上选择目标存储 | 主机 PC 上的 GUI 工具；通过 USB-C 把 BSP 刷写到所选存储 | 主机 PC 上的命令行刷机工具；可直接控制目标 |
| Ubuntu 主机 PC | 不需要 | 需要（x86_64） | 需要（x86_64） |
| 典型耗时 | 未公布；安装器会“持续数分钟”显示输出 | 未公布；主机需先下载 BSP 与根文件系统 | 视你的环境而定 |
| 适合谁用 | 新套件的首次设置；大多数用户 | 有 Ubuntu PC 的用户；NVIDIA 推荐的直刷 NVMe SSD 途径；也用于固件更新 | 进阶用户与产品开发者 |

NVIDIA 未公布安装耗时；论坛报告从约 15 分钟到两小时不等（未经证实）。

> **钜犀提示：** 当前版本为 **JetPack 7.2.1 (L4T r39.2.1)**。如果你的套件是全新到手的，请先看 **[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)**——它会带你完整走一遍推荐的 ISO 流程。需要对比不同途径、选择存储或更新旧套件时，再回到本页。

## 方式一 —— Jetson ISO（推荐）

Jetson ISO 是 NVIDIA 推荐的首次设置路径，也是唯一不需要 Ubuntu 主机 PC 的方式：在任意电脑上把一个 ISO 文件写入 U 盘，从 U 盘启动套件，然后安装到你准备好的存储上。请准备以下物品：

- **目标存储**（套件本身没有；见下文存储一节）：一张 **microSD 卡，64 GB UHS-1 或更大（推荐）**，在启动安装盘之前插入**模块底面**的卡槽；或者一块 **NVMe SSD**（可选；推荐——容量更大、存储性能更好）。
- **一个 U 盘，16 GB 或更大**——它将被制作为安装盘。
- **一台笔记本电脑或 PC（Windows、Mac 或 Linux），至少 25 GB 可用空间**，用于写入 ISO。
- **一台 DisplayPort 显示器和 USB 键盘**（无头安装则用 USB 转 TTL 串口线；不支持 HDMI），以及随附的 19 V 电源。

两个注意事项决定成败：固件必须是 JetPack 6.x 世代的——如果屏幕保持黑屏或出现 UEFI shell，请先运行下文的 JetPack 6.x 更新路径——以及必须在 QSPI capsule 提示出现时于 30 秒内按 `Y`；提示超时会导致安装稍后失败，此时应重新开始安装并按 `Y`。

> **重要** —— 请把 ISO 写入 **U 盘，而不是 microSD 卡**（“不要把 Jetson ISO 刷写到 microSD 卡”）。安装还会**清空所选的存储目标**；开始前请确认你选对了设备。

完整的逐步流程——ISO 下载、Balena Etcher、UEFI 引导管理器、GRUB 菜单、存储选择、首次启动的 Ubuntu 设置——见 **[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)**。安装 U 盘**不是“Live USB”**（它只负责安装），因此安装完成后请在提示时拔出。

## 方式二 —— NVIDIA SDK Manager（主机 PC）

SDK Manager 是主机 PC 方式：它通过 USB-C 刷写 BSP，也能更新套件固件（见下文更新路径一节）。

**主机 PC 要求**（依据套件的 BSP 设置页面）：一台**运行 Ubuntu 22.04 或 Ubuntu 20.04 的 x86 PC**；**互联网连接和一个免费的 NVIDIA Developer Program 账户**；一根接套件 USB-C 口的 **USB 线**，外加“一根跳线针或金属回形针”；以及用于套件的显示器或 USB 转 TTL 串口线。

> **钜犀提示：** NVIDIA 的资料在这一点上说法不一。套件设置页面列出的是 Ubuntu 22.04 或 20.04；L4T r39.2.1 发布说明则将“Ubuntu 24.04 和 22.04”列为用于刷机的主机发行版。准备主机 PC 之前，请核对 NVIDIA 的 SDK Manager 要求。

**在主机上安装 SDK Manager。** NVIDIA 的设置页面给出了 Ubuntu 22.04 和 20.04 的确切命令；用 `sdkmanager` 启动它，然后用你的 NVIDIA Developer 凭据登录（会打开浏览器窗口；可能出现双重验证）。

**刷写 BSP**（简要说明；请按屏幕提示操作）。SDK Manager 通过 USB 刷写，因此要先把套件置入 Force Recovery 模式（见下文）：

1. 选择 **Jetson Orin Nano [8GB developer kit version]**，点击 **OK**；取消勾选 **Host Machine**，只保留 Jetson 目标；点击 **Continue**；在下一步只勾选 **Jetson Linux**；接受许可协议并输入主机的 sudo 密码。
2. 在刷机提示处（SDK Manager 会先下载软件包）：选择 **Runtime for OEM Configuration**；选择 **NVMe** 或 **SD Card** 作为存储；点击 **Flash**。
3. 刷机完成后，取下 J14 排针上的跳线，给套件断电重启，并完成 Ubuntu 初始设置（oem-config）。

> **钜犀提示 —— 模块 SKU：** 本套件搭载 **P3767-0005** 模块，NVIDIA 文档中的描述是“Jetson Orin Nano 8GB（P3767-0005，仅供开发）”。商用 8GB Orin Nano 模块是 **P3767-0003**——另一个 SKU，不属于本套件。请使用 NVIDIA 为这款套件命名的目标条目：**Jetson Orin Nano [8GB developer kit version]**。

## 方式三 —— Linux_for_Tegra 刷机脚本

面向进阶用户与产品开发者：用 Jetson Linux Driver Package 进行命令行刷机。依据 NVIDIA 的设置页面：下载对应 JetPack 版本的 Driver Package 和示例根文件系统；在 Ubuntu x86_64 主机上解压 Driver Package；将示例根文件系统解压到 `Linux_for_Tegra/rootfs`，并从 `Linux_for_Tegra` 运行 `apply_binaries.sh`；把套件置入 Force Recovery 模式（见下文）；然后针对 Jetson Orin Nano Developer Kit 目标运行相应的刷机命令。目标名称与详细命令见 Jetson Linux Developer Guide。

- 本套件的目标名称是 `jetson-orin-nano-devkit` 和 `jetson-orin-nano-devkit-super`；NVIDIA 指出 Super 配置具有“更高的功耗预算和扩展的时钟频率档位”。
- Developer Guide 中针对本套件的示例——NVMe + Super 配置：`sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`（`--erase-all` 选项会清空目标存储上的数据）。
- 出自 L4T r39.2.1 发布说明：刷机主机——Ubuntu 24.04 / 22.04；工具链——GCC 13.2；源码标签——`jetson_39.2.1_GA`。出自 JetPack 下载页：BSP 软件包——`Jetson_Linux_R39.2.1_aarch64.tbz2`。

## 选择目标存储：microSD 还是 NVMe SSD

安装器只提供启动时**已经接上**的存储。请先做决定、装好存储，再启动安装器。

| | microSD 卡 | NVMe SSD |
|---|---|---|
| 规格 | 64 GB UHS-1 或更大，推荐 | M.2 Key-M 插槽中的 PCIe NVMe 硬盘 |
| 安装位置 | **模块底面**的卡槽 | M.2 Key-M 2280 插槽（PCIe 3.0 x4）或 2230 插槽（PCIe 3.0 x2） |
| 为什么选它 | 模块的默认存储；最简单、成本最低的选择 | 容量更大、存储性能更好；推荐用于 AI 模型、容器、数据集和项目文件 |

**microSD 仍是有效的安装目标。** JetPack 7.2 移除的是 SD 卡*镜像文件*——而不是 microSD *目标*：使用 ISO 流程时，插入卡后启动 USB 安装盘并选中它即可（SDK Manager 也可以从主机把系统刷到 microSD 卡）。microSD 卡槽位于**模块底面**。所有安装途径都会**清空所选的存储目标**，因此不要选择存有你所需数据的硬盘。如果安装器没有列出你的 NVMe 硬盘，见**[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)**；选购建议见 **[FAQ](/zh-hans/tutorials/jetson-orin-nano/faq)**。

## 较旧的套件：JetPack 6.x 更新路径

**何时需要：** JetPack 7.2 及更高版本要求 JetPack 6.x 世代的 UEFI/QSPI 固件。NVIDIA 的规则是：固件 **36.x 或更新**——套件可以直接使用；**低于 36.0**——请先完成本路径（在 UEFI 菜单中查看版本；步骤见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)）。两条官方途径：**microSD 桥接流程**（见下文）需要一张 microSD 卡，但不需要 Ubuntu 主机 PC；**SDK Manager**（方式二）需要 Ubuntu 主机 PC，是 NVIDIA 指定的固件/QSPI 更新替代方案。

桥接流程，按 NVIDIA 文档记载的顺序：

1. 把 **JetPack 5.1.3 桥接镜像**（`JP513-orin-nano-sd-card-image_b29.zip`——请使用更新后的镜像）写入 microSD 卡，从卡启动套件，完成首次启动的 Ubuntu 设置，并将套件接入互联网。
2. 随后，后台服务会安排一次 bootloader 更新（桌面可能弹出通知）。用 `sudo systemctl status nv-l4t-bootloader-config` 确认——一次已完成的调度运行会显示服务处于 inactive、退出状态为成功。

   ![Jetson Linux 桌面上的 bootloader 更新通知](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. 重启；固件更新会在启动过程中执行。之后用 `sudo nvbootctrl dump-slots-info` 检查状态——NVIDIA 在此阶段的示例输出为 “Current version: 35.5.0”。

   ![从 JetPack 6.x 固件升级时的固件更新进度](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. 安装 QSPI 更新程序：先 `sudo apt update`，再 `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`；重启并等待更新完成。
5. 此时固件已达到 JetPack 6.x 世代的要求，5.1.3 卡不再是目标启动介质。关机，然后用 USB 安装盘运行 JetPack 7.2.1 安装（见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)）。

补充说明：经过 JetPack 6.2.x 时，其首次启动后可能会安排**又一次** UEFI 固件更新——出现提示时再次重启。出自 r39.2.1 发布说明（已知问题 6379600）：ISO 安装期间的 capsule 更新不支持来自 **BSP 36.2 / JetPack 5.0 DP** 版本的设备——请先将这些设备更新到更晚的版本。

## Force Recovery 模式 —— 如何进入

Force Recovery 模式（RCM）是主机 PC 刷机时需要的状态。NVIDIA 记录了三种进入方式：

1. **在运行中的系统上，从终端进入：** `sudo reboot --force forced-recovery`。
2. **套件已断电时：** 短接按键排针的引脚 9 和引脚 10（设置页面称之为 J14 排针），然后接上 DC 电源开机。
3. **套件已开机时：** 短接引脚 9 和引脚 10，再暂时短接引脚 7 和引脚 8 以复位系统。

进入 RCM 后，主机检测到设备即可取下跳线。刷机连接走 **USB-C 口**（它以 USB Recovery 模式工作）；在主机上，开始刷机前 `lsusb` 应该能看到一个 NVIDIA USB 设备。

## 重装与升级

**在运行中的套件上更新 JetPack 组件**：先 `sudo apt update`，再 `sudo apt install nvidia-jetpack` —— 见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)。

**重装 BSP（相同或更新的 JetPack）。** 再次运行三种途径中的任意一种；ISO 流程是设备端就能完成的选择。NVIDIA 对 ISO 重装的提醒：“如果你在已安装系统上使用 ISO 重装 JetPack 7.2.1，请务必仔细按照 Getting Started Guide 中的说明操作。”重装会**清空目标存储**（请先备份）；如果出现 QSPI capsule 提示，请在 30 秒内按 `Y`。完成后拔出 USB 安装盘，让套件从新系统启动。

**重装后的 Super 模式。** 7.2.1 ISO“默认以 Super Mode 刷机配置刷写 Jetson Orin Nano Developer Kit”。在更早的 7.2 版本上，经 ISO 更新过的套件会保留原有配置，可能最终缺少 25 W / MAXN SUPER 模式（r39.2 已知问题 6279443；NVIDIA 当时的指引是从 Linux 主机或 SDK Manager 刷机）。NVIDIA 尚未说明重新运行 7.2.1 ISO 是否能把现有的非 Super 安装转换为 Super。如果你的套件缺少 25 W / MAXN SUPER 模式，见**[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)**。

**在 JetPack 大版本之间迁移。** JetPack 6.x → 7.2.1 的变更清单与回退说明见 **[JetPack 6.x → 7.2.1](/zh-hans/tutorials/jetson-orin-nano/jetpack-6-to-7)**。任何安装或更新之后，请验证结果：**[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)**。

## 参考资料

- [BSP 安装——Jetson Orin Nano 开发者套件用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html)（核对于 2026-09-26）
- [快速开始——同一用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（核对于 2026-09-26）
- [JetPack 6.x 更新路径——同一用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（核对于 2026-09-26）
- [How-To——同一用户指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（核对于 2026-09-26）
- [Jetson Linux 39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（核对于 2026-09-26）
- [Jetson Linux Developer Guide（r39.2.1）——快速开始](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html)（核对于 2026-09-26）
- [JetPack 下载页](https://developer.nvidia.com/embedded/jetpack/downloads)（核对于 2026-09-26）
- [SDK Manager——连接显示器的安装说明](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html)（核对于 2026-09-26）

*状态：草稿，待 cheny 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
