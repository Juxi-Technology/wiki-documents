---
title: 从 JetPack 6.x 迁移到 JetPack 7.2.1
sidebar_label: 从 JetPack 6.x 迁移
slug: /migration/jetpack-6-to-7
description: >-
  在 Jetson Orin Nano Super Developer Kit（8GB）上，JetPack 6.x 与
  JetPack 7.2.1 之间有哪些变化：固件前置条件、Super 模式陷阱、迁移检查
  清单与回滚。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 从 JetPack 6.x 迁移到 JetPack 7.2.1

本页面向持有 Jetson Orin Nano（Super）Developer Kit、正从 JetPack 6.x
迁移到 JetPack 7.2.1 的用户。新到手的套件请改从
[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)开始。

JetPack 7.2.1 是一次不小的跨越：请为完整重刷、一项固件前置条件和部分
软件重建做好计划。

## 有哪些变化

| 层级 | JetPack 6.x 时代 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| 操作系统 / 根文件系统 | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux 内核 | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **钜犀提示：** 6.x 一列使用的是 JetPack 6.2.3，即 JetPack 6 最后一个正式
> 发布版本。请用 `cat /etc/nv_tegra_release` 核对你自己系统上的版本。
> 7.2.1 的 VPI 值取自 NVIDIA 的软件包仓库，而不是其下载页——下载页仍显示
> JetPack 7.2 的值。见
> [验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)上的说明。

- **不再有 SD 卡镜像。**“从 JetPack 7.2 开始，SD 卡镜像不再受支持。”
  安装器只有一个用于 U 盘的 ISO；microSD 卡仍是有效的安装目标。
- **一项固件前置条件。** JetPack 7.2 及更高版本的安装要求
  JetPack 6.x 世代的 Jetson UEFI/QSPI 固件；出厂固件较旧的套件必须先完成
  JetPack 6.x 更新路径。JetPack 7.0 和 7.1 未列出任何 Orin 硬件，因此
  7.2 是该系列的首个 7.x 版本。
- **不同的安装流程。** ISO 从 U 盘安装到设备上的 microSD 或 NVMe。它仅用于
  安装，不是 “live USB”。

## 在以下情况下请先不要升级……

- **你的机器人依赖 Isaac ROS。** 7.2.1 组件列表将 Isaac ROS 标为
  “Coming soon”（即将推出），但 NVIDIA 员工表示 Isaac ROS 4.6 支持
  JetPack 7.2——来源之间存在分歧。参见
  [机器人](/zh-hans/tutorials/jetson-orin-nano/robotics)。
- **你的摄像头代码绑定在旧版 SIPL API 上。** Jetson Linux 39.2.1 中的
  SIPL API v2.0.0 带来“影响 API、ABI、JSON schema、包布局与驱动加载的
  破坏性变更”。一份社区报告（NVIDIA 未确认）称 NITO 摄像头配置现已
  成为默认，旧式 `NVCAMERA_NITO_PATH=CONFIG` 模式不再工作。
- **你无法重新验证自己的软件栈。** CUDA 13 的 wheel、Python 包和第三方库
  必须已有面向 Ubuntu 24.04 与 CUDA 13.2 的版本。NVIDIA 的 7.2.1 页面未
  列出 Python 或 OpenCV 版本；关于 CUDA 13.2 的 wheel，NVIDIA 员工指向
  Jetson AI Lab 的 SBSA 索引——参见
  [本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)。

## 无法沿用的内容——计划重新构建

- **TensorRT 引擎。** TensorRT 从 10.3.0 升级到 10.16.2。序列化的引擎与
  TensorRT 版本绑定。请在目标设备上重新构建。
- **CUDA 二进制文件。** CUDA 从 12.6 跃升到 13.2.2，是一次大版本跨越。
  不要指望 CUDA 12.x 的二进制能够沿用；请用新工具包重新构建。
- **树外内核模块。** 内核从 5.15 升级到 6.8。请针对新内核头文件重新构建
  模块。
- **摄像头驱动与设备树。** 适用 SIPL 2.0 的 API 与 ABI 变更（见上文）。
- **容器。** 为 JetPack 6 / L4T r36 构建的镜像留在旧软件栈上；ISO 附带
  NVIDIA Container Toolkit 1.19。NVIDIA 员工表示，Orin Nano 现在可以运行
  主流的 Arm64 “arm64-SBSA” 容器。
- **Python 环境。** Ubuntu 24.04 的 Python 比 22.04 更新。请重建虚拟环境；
  用 `python3 --version` 核对版本。

## 迁移检查清单

1. **先备份。** 安装会擦除你选择的目标存储。请把以下内容从套件中复制
   出来：应用数据、配置文件、摄像头标定、容器卷、TensorRT 构建脚本与
   ONNX 模型，以及自定义驱动或设备树源码。用
   `cat /etc/nv_tegra_release` 和
   `apt list --installed | grep nvidia-jetpack` 记录版本。
2. **通过固件门槛。** 开机，在 NVIDIA 启动画面反复按 Esc，在 UEFI 菜单中
   读取固件版本。36.x 或更新的固件即可安装 7.2.1。若早于 36.0，请先完成
   JetPack 6.x 更新路径：先启动更新后的 JetPack 5.1.3 SD 卡镜像
   （`JP513-orin-nano-sd-card-image_b29.zip`）作为过渡，让它安排 bootloader
   更新，重启，安装 QSPI 更新器
   （`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`），再重启。
   预计会重启多次；JetPack 6.2.x 可能在首次启动后再安排一次更新。
   BSP 36.2 / JetPack 5.0 DP 的设备必须先更新到较新的版本。用
   `sudo systemctl status nv-l4t-bootloader-config` 检查安排情况，用
   `sudo nvbootctrl dump-slots-info` 检查固件。
3. **制作安装 U 盘。** 用 Balena Etcher 把 r39.2.1 的 Jetson ISO 写入 U 盘
   （16 GB 或更大）。不要把 ISO 写入 microSD 卡。启动前先装好目标存储
   （microSD 或 NVMe）——安装器只列出已安装的设备。
4. **安装 JetPack 7.2.1。** 经 UEFI Boot Manager 启动：在启动画面按 Esc，
   选择 Boot Manager，选中该 USB 磁盘（NVIDIA 建议这样显式选择）。

   > **重要**——在 QSPI capsule 更新提示出现时，请在 30 秒内按 **Y**
   > （“最常被错过的一步”）。一旦超时，安装稍后会失败。capsule 更新分
   > 两轮运行，并可能让套件重启——这属于正常现象。

   在 GRUB 菜单中，选择 Install Jetson ISO r39.2.1，选择目标存储并确认
   （安装会擦除你选择的存储）。安装完成后按提示拔出 U 盘，然后完成
   Ubuntu 初始设置（许可协议、语言、网络、用户），并运行
   `sudo apt update` 和 `sudo apt install nvidia-jetpack`。
5. **确认 Super 配置。** `sudo /usr/sbin/nvpmodel -q` 会列出电源模式；
   在桌面上则使用顶栏：Power Mode、MAXN SUPER。启用 Super 模式后，
   `cat /etc/nv_boot_control.conf` 的 TNSPEC 行会显示 `-super` 后缀。
   若没有这些，请阅读下一节。
6. **重新验证你的负载。** 在目标设备上重新构建 TensorRT 引擎与 CUDA
   应用。重建 Python 环境、更新容器、重新测试摄像头。运行
   [验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)
   中的检查——对 r39.2.1，`cat /etc/nv_tegra_release` 应显示 R39、
   revision 2.1。

## Super 模式陷阱（已在 7.2.1 修复）

在 7.2.0 的 ISO 安装中，设备会保留其原有的板卡配置：25W 和 MAXN SUPER
电源模式缺失，`sudo nvpmodel -m 2` 以 “bad power mode 2” 失败。NVIDIA
在 r39.2 发布说明中将其记载为问题 6279443：“设备在更新后不会默认进入
‘Super’ 模式。要使用 ‘Super’ 模式，你必须用 Linux 主机或 SDKM 刷写目标
设备。”NVIDIA 员工后来称这是一个 ISO 缺陷，已在 7.2.1 修复。

JetPack 7.2.1 的 ISO 安装默认刷入 Super Mode 配置：“ISO 现在默认以
Super Mode 刷机配置刷写 Jetson Orin Nano Developer Kit。”问题 6279443
不在 r39.2.1 的已知问题列表中。

还有两点需要注意：

- **从主机刷机时要选对目标。** 在 SDK Manager 中，目标是
  “Jetson Orin Nano [8GB developer kit version]”。使用刷机脚本时，要
  启用 Super 模式需用 `jetson-orin-nano-devkit-super` 目标，而不是普通
  目标。示例（开发者指南，NVMe）：
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`。
- **在已有系统上重装 7.2.1。** NVIDIA：“如果你在已安装系统上使用 ISO
  重装 JetPack 7.2.1，请务必仔细按照 Getting Started Guide 中的说明
  操作。”NVIDIA 未说明用
  7.2.1 重装能否让 7.2.0 ISO 留下的非 Super 设备恢复 Super 模式；有记载
  的途径是用 Super 配置从主机刷机。社区原地修复法（编辑
  `/etc/nv_boot_control.conf`）未获 NVIDIA 认可；有一位用户报告出现启动
  循环。参见
  [故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。

## 回滚

NVIDIA 员工表示：“降级：可以，如有需要你可以通过 SDK Manager 刷回
JP 6.2.2。”一位用户确认完成了往返（重刷到 6.2.2，再升级回 7.2）。
代价，如实陈述：

- **不能原地降级。** 必须从 x86 Ubuntu 主机完整重刷（官方页面列的是
  Ubuntu 主机；NVIDIA 员工也反馈 Windows 版 SDK Manager 可行）。
- **目标存储会被擦除。** 你的备份是唯一的副本。
- **没有更多保证。** NVIDIA 未发布降级流程，也没有文档说明
  JetPack 6.x 启动介质保证能在 r39.2.x QSPI 固件上工作。请把降级视为
  旧软件栈的重装，外加同样的重建工作。

如果只是缺少 Super 电源模式，更窄的修法是用 Super 配置从主机重刷——这样
可保留 7.x。参见
[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)。

## 资料来源

- [JetPack SDK 下载——JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — 组件矩阵、SD 卡取消、Super 模式默认、重装注意事项（核查于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — ISO 安装流程、固件门槛、capsule 提示、MAXN SUPER（核查于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——JetPack 6.x 更新路径](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — 固件过渡、版本检查（核查于 2026-09-26）
- [Jetson Linux 39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — GA 状态、SIPL 2.0 破坏性变更（核查于 2026-09-26）
- [Jetson Linux 39.2 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — 问题 6279443，Super 模式陷阱（核查于 2026-09-26）
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — JetPack 6.x 基线版本（核查于 2026-09-26）
- [NVIDIA 开发者论坛——JetPack 7.2 GPU 加速问题](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — NVIDIA 员工：降级路径与 CUDA 13.2 wheel 索引（核查于 2026-09-26）
- [NVIDIA 开发者论坛——JetPack 7.2 中看不到 25W 和 MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — NVIDIA 员工与用户：`-super` TNSPEC 检查、主机重刷（核查于 2026-09-26）

*状态：已于 2026-10-11 审核。内容依据所列日期的 NVIDIA 官方文档与开发者
论坛发言；尚未由钜犀科技在实机上验证。重建清单描述的是平台层面的标准
后果——请结合你自己的软件栈进行验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非
NVIDIA 官方出版物。
