---
title: 快速开始——从开箱到可用的 JetPack 7.2.1 系统
sidebar_label: 快速开始
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson AGX Orin 开发套件（64GB）完整操作流程——首次开机、用 Jetson ISO
  方式将 BSP 更新到 JetPack 7.2.1（L4T r39.2.1），以及安装 JetPack 组件。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# 快速开始

本页将带你把 Jetson AGX Orin 开发套件（64GB）从开箱一路装到完成全部更新的 **JetPack 7.2.1** 系统。以下流程遵循 NVIDIA 当前推荐的设置步骤；每个步骤都已对照 NVIDIA 官方开发套件文档核实，核实日期见本页底部。

**三步流程：**

1. **开箱直接启动**，完成 Ubuntu 初始设置（`oem-config`）。
2. 用 **Jetson ISO** 方式把 BSP **更新**到 L4T r39.2.1（JetPack 7.2.1）——只需一个可启动 U 盘，无需 Ubuntu 主机 PC。
3. 用一条 `apt` 命令**安装 JetPack 组件**（CUDA、cuDNN、TensorRT……）。

> **为什么用 USB ISO 更新，而不是 SDK Manager？**
> NVIDIA 现在推荐对开发套件使用 Jetson ISO 方式：它直接从 U 盘更新板卡，**不需要**单独的 Ubuntu 主机。SDK Manager 仍可作为备选（见第 3b 步）。

## 准备工作

套件内附：

- Jetson AGX Orin 模组与参考载板
- Wi-Fi 模块
- USB Type-C 电源适配器
- USB Type-C 转 USB Type-A 数据线

你需要自备：

- 一台带 DisplayPort 输入的显示器与一根 DisplayPort 线，外加 USB 键盘和鼠标——**或者**一台电脑（Windows/Mac/Linux），如果你更想用无头方式安装
- 网络连接（网线，或在设置过程中配置好的 Wi-Fi）
- 一个容量足以装下 ISO 镜像的 U 盘（到了下载页记得查看标注的大小）——第 2 步的 ISO 更新需要用到
- 一台用于写入安装 U 盘的 PC（Balena Etcher 支持 Windows/Mac/Linux）

## 第 1 步 —— 首次开机与 Ubuntu 初始设置

你的开发套件出厂时已在 eMMC 中预刷好 L4T BSP 镜像，开箱即可启动进入 Ubuntu 桌面。新出厂的套件可能搭载**较旧**的 L4T 版本（例如 r35.x / JetPack 5.x）；第 2 步可将任何一台设备升级到当前版本。

连接显示器时：

1. 连接 DisplayPort 显示器、USB 键盘和鼠标，并（可选）接上网线。
2. 将随附的电源适配器接到 **DC 接口上方的 USB Type-C 口**。套件会自动开机——电源键附近的白色 LED 点亮。如果没有开机，按一下电源键。
3. 约一分钟后出现 Ubuntu 界面。首次开机会引导你完成 `oem-config`：接受 NVIDIA 软件最终用户许可协议（EULA）、选择语言/键盘/时区、创建用户账户并配置网络。
4. `oem-config` 完成后，套件会重启进入 Ubuntu 桌面。

![初始设置完成后的 Ubuntu 桌面](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

也可以从另一台电脑进行无头安装——具体接线方式见 NVIDIA 的快速入门指南（链接见本页底部）。

> **钜犀提示：** 如果你打算从 NVMe SSD 运行系统，请在第 2 步留意这一点——ISO 安装器可以直接安装到 NVMe 硬盘。

## 第 2 步 —— 用 Jetson ISO 更新 BSP（推荐）

**前提条件：** 已安装的 BSP 必须为 **L4T r35.5 或更高版本**，ISO 方式才能使用。先检查：

```bash
cat /etc/nv_tegra_release
```

JetPack 7.2.1 系统会输出 `# R39 (release), REVISION: 2.1`。如果输出显示的是较旧的版本，请先更新到 L4T r35.5 或更高版本（见下方*注意事项*）。

1. **下载 Jetson ISO**（对应 JetPack 7.2.1 / L4T r39.2.1）：
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **制作安装 U 盘。** 用 [Balena Etcher](https://etcher.balena.io) 将 ISO 写入 U 盘（“Flash from file” → 选择 ISO → 选择 U 盘）。
   > **不要**用文件管理器把 ISO 文件直接复制到 U 盘——
   > 必须按磁盘镜像写入，否则无法引导。
3. **插入 U 盘**并给开发套件上电。如果套件没有自动从 U 盘引导，请在启动过程中打开 UEFI 引导管理器并选择该 U 盘。
4. **引导并安装：**
   - 如果提示你确认 **QSPI capsule 更新**，请按 `Y`。该固件更新在 ISO 安装*之前*运行，并且会运行**两次**。不要跳过——它是兼容性所必需的。如果错过了该提示，请重新开始安装，并在再次提示时确认。
   - 在 GRUB 菜单中，选择 **Install Jetson ISO r39.2.1**，然后按回车键。
   - 用方向键选择存储目标：**eMMC**（默认内置存储）或 **NVMe**（如果加装了 SSD，推荐选它）。
   - 安装大约需要 15 分钟，屏幕上会滚动显示文本输出。
5. 安装完成并重启后，**拔出 U 盘**——否则套件可能再次从 U 盘启动，而不是从新系统启动。
6. 更新后的系统会启动首次开机 `oem-config`——再次完成 Ubuntu 设置，为这次新的安装创建用户账户。

### 你会看到什么（按顺序）

![用 Balena Etcher 将 ISO 写入 U 盘](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*用 Balena Etcher 将 Jetson ISO 写入 U 盘。*

![UEFI 引导管理器中已选中 U 盘](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*如果套件没有自动从 U 盘引导，请在 UEFI 引导管理器中选中它。*

![QSPI capsule 更新确认提示](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*QSPI capsule 更新提示——按 `Y`。它是兼容性所必需的，并且会运行两次。*

![Jetson ISO 的 GRUB 菜单](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*选择 “Install Jetson ISO r39.2.1”。*

![GRUB 菜单中的存储目标选项](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*选择 eMMC 或 NVMe 作为安装目标。*

![安装器进度界面](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*安装器大约运行 15 分钟。*

![更新后的 oem-config 欢迎界面](/images/jetson-agx-orin/oem-config_welcome.png)
*更新完成后，`oem-config` 会再次运行，用于设置新系统。*

### 注意事项与已知问题

- **较旧的设备（< L4T r35.5）：** Jetson ISO 方式要求已安装的 BSP 为 r35.5 或更高版本。要先把旧套件升级上来，请使用主机 PC 方式之一（SDK Manager 或 `flash.sh` 脚本）——见[刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)。
- **错过了 QSPI capsule 提示？** 重新开始 ISO 安装并按 `Y`。
- **安装过程中黑屏：** 部分 KVM 切换器在 ISO 安装期间对 AGX Orin 的视频输出处理不佳。请将显示器直连开发套件后重试。

## 第 3 步 —— 安装 JetPack 组件

### 3a. 通过 `apt` 安装（最简单 —— 无需主机 PC）

在套件桌面上打开终端（`Ctrl`+`Alt`+`T`），然后运行：

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

这会安装 CUDA、cuDNN、TensorRT 以及 JetPack 套件的其余组件。视网络速度不同，预计需要**大约一个小时**。

验证结果：`cat /etc/nv_tegra_release` 应显示 R39 / REVISION 2.1，并且 CUDA 工具包变为可用（`nvcc --version`）。完整检查清单见[验证你的系统](/zh-hans/tutorials/jetson-agx-orin/verify-your-system)。

### 3b. 通过 SDK Manager 安装（备选）

SDK Manager 通过 USB 从主机 PC 安装 JetPack 组件：

1. 在套件开机状态下，用随附的 USB Type-C 转 Type-A 线缆把它连接到主机 PC，线缆插在套件上 **40 针连接器旁边的 USB Type-C 口**。
2. 在 SDK Manager 中选择 Jetson AGX Orin 目标，勾选 **Jetson SDK Components**（而不是再次刷写 “Jetson OS”），然后按屏幕提示操作（USB 连接、地址 `192.168.55.1`）。

完整的 SDK Manager 说明由 NVIDIA 维护（见下方链接），我们的刷机指南也会深入介绍。

## 快速排查

| 现象 | 首先检查 |
|---|---|
| 套件无法开机 | 电源适配器是否插在 **DC 接口上方的 USB-C 口**；按一下电源键 |
| 无显示输出 | 检查 DisplayPort 线（HDMI 显示器需使用主动式 DP→HDMI 转接器）；尝试在不插 ISO U 盘的情况下启动 |
| ISO 安装器未启动 | 确认 U 盘是用 Etcher 写入的（不是直接复制文件）；在 UEFI 引导管理器中选中该 U 盘 |
| 出现 QSPI 提示 | 按 `Y`——必需；更新会运行两次 |
| 安装中途黑屏 | KVM 切换器干扰——将显示器直连套件 |

## 来源与核实

本页由钜犀科技参照 NVIDIA 官方文档编写并核实：

- [Jetson AGX Orin 开发套件用户指南——快速开始](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)（已于 2026-09-23 核查）
- [Jetson AGX Orin 开发套件用户指南——JetPack SDK 设置](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html)（已于 2026-09-23 核查）
- [BSP 安装（SDK Manager / 刷机脚本）](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*状态：已于 2026-10-11 审核。这些步骤尚未由钜犀科技在实体硬件上验证；其依据为上述日期的 NVIDIA 官方文档。*

**图片来源：** 本页所有截图均来自 NVIDIA 官方 *Jetson AGX Orin Developer Kit User Guide*（下载于 2026-09-23），版权归 © NVIDIA Corporation 所有。此处转载用于说明官方设置流程。

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本指南由钜犀科技发布，并非 NVIDIA 官方出版物。
