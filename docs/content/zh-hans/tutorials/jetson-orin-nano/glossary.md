---
title: 术语表
sidebar_label: 术语表
slug: /appendix/glossary
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit（8 GB）的关键术语——从 JetPack
  与 L4T 版本体系，到刷机、电源模式与 AI 软件栈。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 术语表

新用户最先遇到的术语，按字母顺序排列。版本号对应当前的发布版本
（**JetPack 7.2.1 / L4T r39.2.1**，核对于 2026-09-26）。

## 术语

| 术语 | 含义 |
|---|---|
| **BSP** | Board support package（板级支持包）：让板卡启动的软件层——bootloader、内核、驱动以及根文件系统。在 JetPack 中，BSP 就是 Jetson Linux（L4T）。进行 Jetson ISO 安装时，安装器会把 BSP 写入你选择的存储设备。 |
| **capsule 更新** | QSPI 启动固件的更新。在 QSPI 固件较旧的套件上执行 Jetson ISO 安装时，安装器会提示你运行 capsule 更新：请在 30 秒内按 `Y`，否则安装稍后会失败。该更新分两轮执行，套件可能在两轮之间重启——这属于正常现象。 |
| **预留区（carveout）** | 启动固件为特定硬件模块（如显示或摄像头流水线）保留的内存区域。操作系统无法使用。在 Orin Nano 上这些预留是有文档记载的，你可以通过编辑 BSP 并重新刷机来缩减它们（见[内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)）。 |
| **CUDA** | NVIDIA 的并行计算平台与工具包，用于在 GPU 上运行代码。JetPack 7.2.1 搭载 CUDA 13.2.2。Orin 的 GPU 计算能力为 8.7（`sm_87`）；不含 `sm_87` 的 GPU 二进制会回退到 CPU 执行（见[本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)）。 |
| **cuDNN** | NVIDIA 的优化深度学习基础算子库，例如卷积与激活函数。深度学习框架和 TensorRT 用其完成核心运算。JetPack 7.2.1 搭载 cuDNN 9.20.0。 |
| **DeepStream** | NVIDIA 的多路视频分析 SDK：它解码视频、运行推理、跟踪目标并输出结果。DeepStream 9.1 在 JetPack 7.2 上支持 Jetson Orin 系列。NVIDIA 推荐新用户以 Docker 容器作为最快的安装途径（见 [DeepStream 视频分析](/zh-hans/tutorials/jetson-orin-nano/deepstream)）。 |
| **DLA** | Deep Learning Accelerator（深度学习加速器）：内置于部分 Jetson 模块的固定功能推理引擎。Orin Nano 模块没有 DLA，因此本套件上的推理在 GPU 上运行。 |
| **Edge-LLM** | TensorRT Edge-LLM：NVIDIA 面向大语言模型（LLM）与视觉语言模型（VLM）的设备端运行时。在 Orin 上仅支持 FP16、INT8 和 INT4 引擎——FP8 和 FP4 引擎无法运行——且引擎在设备本机构建（见[本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)）。 |
| **eMMC** | 部分 Jetson 模块用作系统盘的嵌入式闪存。开发者套件出厂不含存储：开始前请自备 microSD 卡或 NVMe SSD（见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)）。 |
| **Force Recovery 模式** | 用于从主机 PC 刷写套件的特殊启动模式。可在运行中的系统上执行 `sudo reboot --force forced-recovery` 进入，或在套件断电状态下短接 Button Header 的引脚 9 和 10，然后接通电源。在此模式下，USB-C 端口承载与主机 PC 的刷机连接。 |
| **JetPack** | NVIDIA 面向 Jetson 的 SDK 套件：操作系统、驱动、CUDA 栈与各类库。本套件的当前版本是 JetPack 7.2.1，包含 Jetson Linux（L4T）r39.2.1。 |
| **Jetson 6.x Update Path** | 面向出厂 UEFI/QSPI 固件早于 36.0 的套件的固件过渡流程。它启动 JetPack 5.1.3 microSD 桥接镜像并安排一次 bootloader（固件）更新；此后套件即可启动 JetPack 6.x 或 JetPack 7.2.1 的 Jetson ISO。固件较旧的套件必须先完成此流程，才能进行 ISO 安装（见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)）。 |
| **Jetson ISO** | JetPack 7.2 及更高版本的统一 U 盘安装镜像。用 Balena Etcher 之类的工具写入 U 盘——不要写入 microSD 卡——并注意它仅用于安装，不是 live USB。安装过程中你选择目标：microSD 卡或 NVMe SSD。 |
| **L4T** | Jetson Linux：JetPack 底层的板级支持包——UEFI bootloader、内核、驱动与 Ubuntu 根文件系统。对应 JetPack 7.2.1 的版本是 r39.2.1，含 Linux 内核 6.8 与 Ubuntu 24.04 根文件系统。 |
| **MAXN SUPER** | 套件的最高电源模式（模式 2）：CPU 1,728 MHz、GPU 1,020 MHz、内存 3,199 MHz。它是实验性模式，仅在套件以 Super 配置刷写后才存在。可在桌面电源模式菜单中选择，或运行 `sudo /usr/sbin/nvpmodel -m 2`。 |
| **microSD (UHS-1)** | 用作套件默认系统存储的卡类型。UHS-1 是 SD 速度等级；NVIDIA 建议使用 64 GB 或更大的 UHS-1 microSD 卡。插槽位于模块底面，因此请在启动安装器前插好卡。 |
| **nv_boot_control.conf / TNSPEC** | 设备上的文件 `/etc/nv_boot_control.conf`，以 TNSPEC 字符串记录板卡配置。NVIDIA 员工指出，Super 配置会带 `-super` 后缀，例如 `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`；若缺少该后缀，更高的电源模式不可用。ISO 安装后，NVIDIA 指向这条 TNSPEC 条目作为正确板卡信息的参照。 |
| **NVMe** | 接在 PCIe 总线上的 SSD，安装在载板的某个 M.2 Key-M 插槽中：2280 尺寸（PCIe 3.0 x4）或 2230 尺寸（PCIe 3.0 x2）。NVMe SSD 可承载系统；当你需要更大容量和更好的存储性能时推荐使用。 |
| **nvpmodel** | 套件上的电源模式工具。运行 `sudo /usr/sbin/nvpmodel -q` 列出你系统上可用的模式，运行 `sudo /usr/sbin/nvpmodel -m <mode_id>` 切换模式。桌面电源模式菜单中也有同样的模式。 |
| **oem-config** | 首次启动设置向导：许可协议、语言与键盘、网络，以及初始用户名和密码。它在已安装系统首次启动后运行一次。 |
| **QSPI** | 套件上存放 UEFI 启动固件的小容量 NOR 闪存。JetPack 7.2 及更高版本要求 JetPack 6.x 世代的 QSPI 固件（晚于版本 36.0）；固件较旧时，安装器可能失败，或套件启动到黑屏。见[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)。 |
| **SDK Manager** | NVIDIA 的主机 PC 工具，用于通过 USB 刷写 BSP 和安装 JetPack 组件。有文档记载的主机是运行 Ubuntu 的 x86 PC。它是设备端 Jetson ISO 方式的替代方案。 |
| **SO-DIMM** | 模块的连接器规格：260 针 SO-DIMM，69.6 mm x 45 mm。模块插入载板的 SO-DIMM 插座，同一插座也兼容 Jetson Orin NX 模块。 |
| **Super 模式（Super Mode）** | NVIDIA 为 Orin Nano 提供的软件功耗与时钟配置——并非不同的硬件。现有套件通过 JetPack 软件升级即可获得 “Super” 提升，而在此套件上，只有以 Super 配置刷写后才会出现更高的电源模式。 |
| **TensorRT** | NVIDIA 的推理优化器与运行时。它把训练好的模型编译成 TensorRT 引擎——一种为目标 GPU 构建、与设备绑定的文件——并高效运行该引擎。JetPack 7.2.1 搭载 TensorRT 10.16.2。 |
| **TOPS** | Trillion（tera）operations per second（每秒万亿次运算），AI 吞吐量的常用单位。本套件标称最高 67 sparse INT8 TOPS（33 dense INT8）。NVIDIA 对同一模块同时公布稀疏与稠密两项指标。 |
| **UEFI** | 套件上的启动固件及其设置菜单。在显示 NVIDIA 启动画面时按 Esc 进入设置；在菜单中，Boot Manager 用于选择 USB 安装器作为启动设备。固件版本也会显示在那里，JetPack 7.2 及更高版本需要晚于 36.0 的版本。 |
| **统一内存（unified memory）** | 由 CPU 和 GPU 共享的单块 8 GB LPDDR5 内存池——本套件没有独立的显存。扣除固件与内核预留后约 7.6 GB 可用，操作系统、你的模型及其 KV cache 都从这一个池中取用。见[内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)。 |
| **VPI** | Vision Programming Interface：NVIDIA 面向 Jetson 的硬件加速图像处理库。JetPack 7.2.1 搭载 VPI 4.1.4。 |

## 版本对照

最值得记住的一张版本对照表：

| JetPack | Jetson Linux (L4T) | Ubuntu | 内核 | CUDA |
|---|---|---|---|---|
| **7.2.1**（当前） | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3（JetPack 6 最后的发布版） | r36.5.2 | 22.04 | 5.15 | 12.6 |

要核实具体系统实际运行的版本：`cat /etc/nv_tegra_release`（见
[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)）。

## 参考来源

- [Jetson Orin Nano 开发者套件用户指南——简介](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html)（核查于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——快速开始指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（核查于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——JetPack 6.x 更新路径](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（核查于 2026-09-26）
- [Jetson Orin Nano 开发者套件用户指南——How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（核查于 2026-09-26）
- [JetPack SDK 下载](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ 其组件表逐行滞后（VPI 与 PVA 两行仍是 JetPack 7.2 的值）；组件版本请改用 [NVIDIA 软件包仓库](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)（checked 2026-09-26）
- [Jetson Linux r39.2.1 发布说明（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)（核查于 2026-09-26）
- [TensorRT Edge-LLM——支持矩阵](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)（核查于 2026-09-26）
- [在 NVIDIA Jetson 上以更高的内存效率运行更大的模型（NVIDIA 技术博客）](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（核查于 2026-09-26）
- [Jetson Orin Nano 系列——功耗与性能（L4T r39.2 开发者指南）](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)（核查于 2026-09-26）
- [NVIDIA Jetson Orin 系列——规格参数](https://developer.nvidia.com/embedded/jetson-orin)（核查于 2026-09-26）
- [DeepStream SDK——安装](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)（核查于 2026-09-26）
- [NVIDIA 论坛——“JetPack 7.2 中看不到 25W 和 MAXN_SUPER”（NVIDIA 员工答复）](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)（核查于 2026-09-26）

*状态：已于 2026-10-11 审核。定义整理自 NVIDIA 官方文档与行业通行用法；
版本号核对于所列日期。尚未由钜犀科技在实机上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非
NVIDIA 官方出版物。
