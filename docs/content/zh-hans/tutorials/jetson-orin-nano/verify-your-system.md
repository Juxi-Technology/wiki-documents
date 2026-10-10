---
title: 验证你的系统——版本、Super Mode 与电源模式清单
sidebar_label: 验证你的系统
slug: /getting-started/verify-your-system
description: >-
  检查你的 Jetson Orin Nano Super Developer Kit 是否运行 JetPack 7.2.1、
  是否装有完整的组件栈、是否处于 Super Mode 板级配置，以及电源模式是否正确。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# 验证你的系统

JetPack 7.2.1 系统首次开机后，请运行这份检查清单。它会确认 **L4T 版本**、**已安装的 JetPack 组件**、**Super Mode 板级配置**和**电源模式**。如果系统还没装好，请先从 **[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)** 入手。

## 第 1 步 —— 检查 L4T（BSP）版本

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** 系统会报告 **R39** 和 **REVISION: 2.1**：

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **钜犀提示：** NVIDIA 没有为该文件发布示例输出。上面的代码块来自社区在某台 Orin 设备上观察到的 r39.2.1 输出；你的 `GCID` 和 `DATE` 值会不同。重要的是 `REVISION: 2.1`。

如果输出显示的是更早的版本（例如 JetPack 6.x 的 R36），说明你的系统没有运行 JetPack 7.2.1——见 **[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)** 与 **[从 JetPack 6.x 迁移](/zh-hans/tutorials/jetson-orin-nano/jetpack-6-to-7)**。

## 第 2 步 —— 检查 JetPack 组件及版本

CUDA、cuDNN、TensorRT 等 JetPack 组件以 Debian 软件包的形式安装。NVIDIA 官方的列出命令是：

```bash
apt list --installed | grep nvidia-jetpack
```

输出中必须出现 `nvidia-jetpack` 元包。要抽查某个组件，可直接查询 `dpkg`——例如用 `dpkg -l | grep cudnn` 检查 cuDNN。如果缺少该元包，请先运行 `sudo apt update`，再运行 `sudo apt install nvidia-jetpack`，如有提示则重启。

下表列出 NVIDIA 官方的组件版本，对应 **JetPack 7.2.1 / Jetson Linux 39.2.1**（核对于 2026-09-26，JetPack 下载页）：

| 组件 | 版本 |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| 操作系统 | Ubuntu 24.04 (L4T) |
| 内核 | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI（计算机视觉） | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19（随 ISO 镜像） |
| Isaac ROS | **已发布**——Isaac ROS 4.6.0（2026 年 8 月）新增了对 Jetson Orin 与 JetPack 7.2 的支持；NVIDIA 的组件表仍标注为 “coming soon”（即将推出） |

> **钜犀提示：** NVIDIA 的 7.2.1 页面为整个 JetPack 7 系列（Thor 与 Orin 合并）只列出一张矩阵，而非按平台分别列出。`dpkg` 显示的版本可能带构建后缀——请比对版本号本身，而不是完整字符串。NVIDIA 的表格未列出 OpenCV、DLA 或 Python 版本，因此本页也不列。

> **关于 VPI 版本：** NVIDIA 的下载页尚未针对 7.2.1 完整刷新——其 VPI 一行仍保留 JetPack 7.2 的值（4.1.3）。JetPack 7.2.1 实际搭载 **VPI 4.1.4**，这一点已从 NVIDIA 自己的软件包仓库确认：`nvidia-jetpack-runtime (= 7.2.1-b49)` 依赖 `nvidia-vpi (= 7.2.1-b49)`，后者锁定 `libnvvpi4 (= 4.1.4)`。软件包池中 4.1.3 和 4.1.4 同时存在，因此只有依赖锁定具有决定性。（核对于 2026-09-26）

## 第 3 步 —— 安装 jtop 并查看系统活动（可选）

`jtop` 属于 **jetson-stats**，这是一个社区项目——并非 NVIDIA 产品。NVIDIA 没有为这一版本提供相关文档，也未验证它与 L4T r39 的兼容性。

请按照 [jetson-stats 项目页面](https://pypi.org/project/jetson-stats/)上的社区说明安装。

然后运行 `jtop`——一个交互式系统监视器和进程查看器。在启动大型 AI 负载之前，留意共享的 8 GB 统一内存。官方替代方案是 `sudo tegrastats`（实时显示 CPU、GPU、内存、温度和电源相关活动；`Ctrl`+`C` 停止）。NVIDIA 的 How-To 页面建议在 Jetson 上使用 `tegrastats` 而非 `nvidia-smi` 进行监控。

## 第 4 步 —— 检查 Super Mode 板级配置（TNSPEC）

JetPack 7.2.1 的 ISO 安装默认刷入 **Super Mode** 配置。在设备上确认：

```bash
cat /etc/nv_boot_control.conf
```

在已配置 Super 的套件上，`TNSPEC` 一行带有 `-super` 后缀。NVIDIA 员工给出的示例如下：

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

在非 Super 套件上，同一行的结尾不带 `-super`——例如一位用户报告的受影响系统：`TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **钜犀提示：** TNSPEC 字符串中间部分的字符因设备和固件状态而异。真正重要的是 TNSPEC 行末尾的 `-super` 后缀。

发布说明已知问题 **6480645**：ISO 安装后，UEFI 变量 `TegraPlatformSpec` 可能无法准确反映板卡规格。NVIDIA 表示，要获取正确的板卡信息，请读取 `/etc/nv_boot_control.conf` 中的 `TNSPEC` 条目。

## 第 5 步 —— 检查电源模式

默认电源模式通常为 **25W**。在桌面上：点击 Ubuntu 顶栏中的电源模式，选择 **Power Mode**，然后选 **MAXN SUPER**。在命令行中，打印当前激活模式及其模式 ID：

```bash
sudo /usr/sbin/nvpmodel -q
```

要切换模式，请使用查询结果显示的 ID（`sudo /usr/sbin/nvpmodel -m <mode_id>`）。如何区分 Super 与非 Super：

| | Super 配置 | 非 Super 配置 |
|---|---|---|
| 可用模式 | 15W、25W、**MAXN SUPER** | 仅 7W、15W |
| 模式 ID（社区观察） | 0 = 15W，1 = 25W，2 = MAXN_SUPER；默认 25W | 0 = 15W，1 = 7W |
| `sudo nvpmodel -m 2` | 选择 MAXN SUPER | 失败：`NVPM ERROR: request for bad power mode 2` |

> **钜犀提示：** 这些模式 ID 来自社区对某台 7.2 系统上配置文件的报告；桌面电源菜单会直接列出可用模式。在 GPU 使用过之后，切换电源模式可能会要求重启——NVIDIA 员工表示该提示属于预期行为。

## 如果只出现 7W 和 15W

这是 JetPack 7.2 的已知问题，已在 7.2.1 中从设计上修复。

- 在 **JetPack 7.2 (L4T 39.2)** 上，已知问题 **6279443** 指出，通过 ISO 安装器更新的设备“不会默认进入 ‘Super’ 模式”；NVIDIA 当时的指引是用 Linux 主机或 SDK Manager 刷写目标设备。
- **JetPack 7.2.1** 改变了这一点：“ISO 现在默认以 Super Mode 刷机配置刷写 Jetson Orin Nano Developer Kit。”问题 6279443 不在 7.2.1 的已知问题列表中，NVIDIA 员工也表示：“这将在 jp7.2.1 中修复。”

全新的 7.2.1 ISO 安装应显示 25W 和 MAXN SUPER。如果你的套件不是这样：

1. 对于用 7.2 ISO 安装的系统，请从 Linux 主机或 SDK Manager 以 Super 配置重新刷机——见 **[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)**。
2. NVIDIA 未说明用 7.2.1 ISO 重装能否转换此前用 7.2 ISO 安装的板卡。如果 Super 模式仍然缺失，请使用 **[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)** 中的重刷选项。

同一问题也收录在 **[FAQ](/zh-hans/tutorials/jetson-orin-nano/faq)** 中。

## 正常状态应该是什么样

| 检查项 | 命令 | 正确系统的表现 |
|---|---|---|
| L4T 版本 | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| JetPack 软件包 | `apt list --installed \| grep nvidia-jetpack` | 已安装的 JetPack 软件包，包含 `nvidia-jetpack` 元包 |
| cuDNN 抽查 | `dpkg -l \| grep cudnn` | 版本 9.20.0 |
| 板级配置 | `cat /etc/nv_boot_control.conf` | `TNSPEC` 行以 `jetson-orin-nano-devkit-super-` 结尾 |
| 电源模式 | `sudo /usr/sbin/nvpmodel -q` | 默认激活模式为 25W；可选 15W、25W 和 MAXN SUPER |

## 如果仍有问题

组件缺失：重新运行第 2 步中的两条命令。Super 配置或电源模式问题，见 **[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)** 和 **[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)**。寻求帮助之前，请先收集 `cat /etc/nv_tegra_release` 和 `cat /etc/nv_boot_control.conf`——在任何配置文件层面的变通方案之前，NVIDIA 员工都会要求提供这些状态信息（外加 `sudo /usr/sbin/nvpmodel -q --verbose`）。钜犀技术支持：**support@juxitech.com**，请附上你的订单号。

## 参考来源

- [JetPack SDK 设置](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)——Jetson Orin Nano 开发者套件用户指南（核对于 2026-09-26）
- [JetPack SDK 下载与发布说明](https://developer.nvidia.com/embedded/jetpack/downloads)（核对于 2026-09-26）
- [Jetson Linux 39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（核对于 2026-09-26）
- [NVIDIA 论坛——JetPack 7.2 中看不到 25W 与 MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [电源模式问题仍在继续](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode 未解锁](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)（核对于 2026-09-26；含 NVIDIA 员工回复）
- [PyPI 上的 jetson-stats（jtop）](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/)（核对于 2026-09-26；jtop 安装的社区来源）

*状态：已于 2026-10-11 审核。内容基于截至所列日期的 NVIDIA 官方文档与 NVIDIA 论坛来源；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页由钜犀科技发布，并非 NVIDIA 官方出版物。
