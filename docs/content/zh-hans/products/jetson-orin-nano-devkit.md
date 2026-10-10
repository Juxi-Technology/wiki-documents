---
title: Jetson Orin Nano Super 开发者套件(8GB)
category: compute-vision
description: NVIDIA Jetson Orin Nano Super 开发者套件(8GB)——最高 67 INT8 TOPS 的边缘 AI 算力，8 GB 统一内存，microSD 与 NVMe 存储可选，并附钜犀科技提供的完整 JetPack 7.2.1 文档。
keywords: [jetson, orin nano, edge ai, jetpack, nvidia, robotics]
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Jetson Orin Nano Super 开发者套件(8GB)

> **[商店购买](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)**

## 产品概述

NVIDIA® Jetson Orin Nano™ Super 开发者套件是 Jetson Orin 家族的紧凑型开发者套件——一台小型 AI 计算机，用于在边缘侧构建计算机视觉、机器人与生成式 AI 项目。钜犀科技销售的正是 NVIDIA 官方套件（原装盒装），并配套面向 JetPack 7.2.1 / L4T r39.2.1 软件基线的完整文档系列。

亮点：

- **最高 67 INT8 TOPS** 的 AI 性能（稀疏；稠密为 33），以及相较原版套件最高 **1.7 倍的生成式 AI 提升** *(NVIDIA)*
- **8 GB 128 位 LPDDR5 内存，带宽 102 GB/s** *(NVIDIA)*——由 CPU、GPU 与所有应用共享的统一内存；8 GB 是每一项工作负载的硬上限
- **1024 核 NVIDIA Ampere 架构 GPU，配备 32 个 Tensor 核心**，以及最高 1.7 GHz 的 6 核 Arm Cortex-A78AE CPU *(NVIDIA)*
- **“Super” 是软件升级，而非新芯片**——现有的 Orin Nano 开发者套件只需更新 JetPack，即可获得更高的 GPU、内存与 CPU 频率 *(NVIDIA)*
- **7 W 至 25 W 可配置功耗** *(NVIDIA)*——默认电源模式为 25 W
- **NVIDIA 不提供 eMMC，也不提供存储**——microSD 卡槽位于**模组底部**，另有两条用于 NVMe SSD 的 M.2 Key-M 插槽 *(NVIDIA)*；钜犀套装额外附赠一张 64 GB microSD 卡
- **当前软件：JetPack 7.2.1**（Jetson Linux / L4T r39.2.1）*(NVIDIA)*——通过 U 盘以 Jetson ISO 方式安装，无需单独的 Ubuntu 主机 PC
- **NVIDIA 官方原装盒装，由钜犀科技销售**——套装额外包含 19 V 电源适配器、电源线、64 GB microSD 卡与 M.2 Wi-Fi 模组

**适用场景**：小型本地 LLM 与生成式 AI、DeepStream 视频分析、机器人与 ROS 2 开发、教学与原型验证。

## 产品规格

| 类别 | 规格 |
|---|---|
| 套件 | NVIDIA Jetson Orin Nano Super 开发者套件——P3767 模组 + P3768 载板；整机套件料号 P3766 *(NVIDIA)* |
| AI 性能 | 最高 67 INT8 TOPS（稀疏）/ 33 INT8 TOPS（稠密）；相较原版套件最高 1.7 倍生成式 AI 提升 *(NVIDIA)* |
| GPU | NVIDIA Ampere 架构，1024 个 CUDA 核心 + 32 个 Tensor 核心；最高 1,020 MHz *(NVIDIA)* |
| CPU | 6 核 Arm Cortex-A78AE v8.2 64 位；最高 1.7 GHz；1.5 MB L2 + 4 MB L3 缓存 *(NVIDIA)* |
| 内存 | 8 GB 128 位 LPDDR5，102 GB/s *(NVIDIA)*——由 CPU、GPU 与应用共享 |
| 存储 | 无 eMMC。microSD 卡槽位于模组底部（主存储）+ 2 个 M.2 Key-M NVMe 插槽：2280（PCIe 3.0 x4）与 2230（PCIe 3.0 x2）*(NVIDIA)* |
| 视频 | 解码最高 1 路 4K60（H.265）、2 路 4K30、5 路 1080p60 或 11 路 1080p30；编码 1080p30 需占用 1-2 个 CPU 核心（无专用硬件编码器）*(NVIDIA)* |
| 显示 | 1 个 DisplayPort 1.2（+MST）——唯一的显示输出；USB-C 口不输出显示信号 *(NVIDIA)*。商店页面：“DP 1.2，最高 4K@60Hz”——NVIDIA 已抓取的页面未给出最大显示分辨率 |
| 网络 | 1 个千兆以太网口（RJ45）*(NVIDIA)*；随附 M.2 Key-E 无线模组，NVIDIA 称之为“802.11ac/ab/gn 无线网络接口控制器” *(NVIDIA)*。商店页面：双频 2.4/5 GHz Wi-Fi 5 + 蓝牙 5.0（NVIDIA 的页面未说明蓝牙版本——蓝牙 5.0 请视为未经证实） |
| 接口 | 4 个 USB 3.2 Type-A（10 Gbps，位于两个双层堆叠连接器上）、1 个 USB-C（仅数据；支持 Host、Device 与 USB Recovery 模式）、40 针排针（UART、SPI、I2S、I2C、GPIO）、12 针按键排针、4 针风扇排针、DC 电源插孔（5.5 mm x 2.5 mm）*(NVIDIA)* |
| 摄像头 | 2 个 MIPI CSI 连接器（22 针、0.5 mm 间距、底部接触）：CAM0 1x2 lanes；CAM1 1x2 或 1x4 lanes *(NVIDIA)* |
| 功耗 | 7 W – 25 W 可配置 *(NVIDIA)*。默认模式：25 W。MAXN SUPER 为实验性模式，仅在套件刷写为 `jetson-orin-nano-devkit-super` 或 `jetson-orin-nano-devkit-super-maxn` 配置时可用 *(NVIDIA)* |
| 尺寸 | NVIDIA 数据手册：103 x 90.5 x 34.77 mm；NVIDIA 家族规格表：100 x 79 x 21 mm（两种口径的高度均包含脚垫、载板、模组与散热方案）。NVIDIA 尚未统一这两个数字；商店页面列出 100 x 79 x 21 mm |
| 软件 | 当前版本：JetPack 7.2.1，含 Jetson Linux (L4T) r39.2.1，采用 Jetson ISO 方式安装 *(NVIDIA)* |
| 包装清单（钜犀商店套装） | NVIDIA Jetson Orin Nano Super 开发者套件 x1（官方原装盒装）；19 V 电源适配器 x1；Type B（美、日、加、菲）电源线 x1；64 GB microSD 卡 x1；M.2 Wi-Fi 模组 x1 |
| 包装清单（NVIDIA） | 开发者套件（Orin Nano 8GB 模组 + 散热器 + 参考载板）、19 V 电源、802.11ac/ab/gn 无线网络接口控制器、快速入门指南 *(NVIDIA)*。不含可移动存储：“Jetson Orin Nano Developer Kit 包装内不包含可移动存储” *(NVIDIA)* |
| 保修 | 1 年，仅限开发用途（商店页面信息） |

*完整规格：参见 NVIDIA 官方套件数据手册（链接见 nvidia.com）。*

> **钜犀提示：** 当商店页面与 NVIDIA 官方数据不一致时，本页以 NVIDIA 的数据为准，并注明差异。商店页面列出、但 NVIDIA 的页面未予确认的项目：蓝牙 5.0 与 4K@60Hz 显示输出。随附的 64 GB microSD 卡**未预装系统**（空白卡）；NVIDIA 建议使用 64 GB UHS-1 或更大容量的卡。请按完整安装 JetPack 来规划——见下文“开始使用”。

## 开始使用

1. **先检查固件版本。** JetPack 7.2.1 要求 JetPack 6.x 世代的 Jetson UEFI/QSPI 固件（版本高于 36.0）。如果你的套件出厂固件较旧，请先走 JetPack 6.x 更新路径再安装——参见[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)。
2. **准备需要自备的物品**：一台至少有 25 GB 可用空间的 PC 或笔记本电脑（Windows、macOS 或 Linux）；一个 16 GB 或更大容量的 U 盘；以及一台 DisplayPort 显示器（配 USB 键盘和鼠标），或一根用于无头安装的 USB-TTL 串口线。
3. **选择存储**：可以使用随附的 64 GB microSD 卡（开机前插入模组底部的卡槽），也可以在 M.2 Key-M 插槽中装入你自己的 NVMe SSD。
4. **写入安装盘**：下载 JetPack 7.2.1 的 Jetson ISO，并将其写入 U 盘。切勿把 ISO 写入 microSD 卡——自 JetPack 7.2 起已不支持 SD 卡镜像。
5. **安装**：从 U 盘启动套件，并选择目标存储。在固件 capsule 提示出现时，**于 30 秒内按 Y 确认**——NVIDIA 指出这是最常被漏掉的一步。
6. **首次启动**：完成 Ubuntu 初始设置，然后安装 JetPack 组件。
7. 完整流程见：**[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)**

## 文档（Jetson Orin Nano 系列）

- [快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start) · [刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates) · [验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)
- [产品概述](/zh-hans/tutorials/jetson-orin-nano/overview) · [接口与硬件布局](/zh-hans/tutorials/jetson-orin-nano/interfaces) · [故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting) · [常见问题 FAQ](/zh-hans/tutorials/jetson-orin-nano/faq)
- [下载](/zh-hans/tutorials/jetson-orin-nano/downloads) · [从 JetPack 6.x 迁移](/zh-hans/tutorials/jetson-orin-nano/jetpack-6-to-7) · [术语表](/zh-hans/tutorials/jetson-orin-nano/glossary) · [更新日志](/zh-hans/tutorials/jetson-orin-nano/changelog)
- [本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm) · [内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency) · [DeepStream 视频分析](/zh-hans/tutorials/jetson-orin-nano/deepstream) · [机器人（现状）](/zh-hans/tutorials/jetson-orin-nano/robotics) · [智能体 AI (NemoClaw)](/zh-hans/tutorials/jetson-orin-nano/agentic-ai)

## 推荐配件

浏览[钜犀科技产品目录](https://wiki.juxitech.com/products/)——摄像头（IMX219 CSI、USB 自动对焦、RealSense 深度相机）、[Jetson Orin Radiator](https://www.juxitech.com/products/jetson-orin-radiator)（商店页面标注适用于 Orin NX / Orin Nano SUPER）、机械臂、传感器等。

## 技术支持

- 📧 技术支持：support@juxitech.com
- 🌐 官网：[www.juxitech.com](https://www.juxitech.com)
- 💬 反馈文档问题：[GitHub](https://github.com/Juxi-Technology/wiki-documents/issues)

## 来源

- [Jetson Orin Nano 开发者套件用户指南——简介](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html)（已于 2026-09-26 核查）
- [Jetson Orin Nano 开发者套件用户指南——快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)（已于 2026-09-26 核查）
- [Jetson Orin Nano 开发者套件用户指南——硬件布局](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（已于 2026-09-26 核查）
- [Jetson Orin Nano 开发者套件用户指南——操作指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)（已于 2026-09-26 核查）
- [Jetson Orin Nano 开发者套件用户指南——JetPack 6.x 更新路径](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)（已于 2026-09-26 核查）
- [L4T r39.2 开发者指南——平台功耗与性能](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)（已于 2026-09-26 核查）
- [L4T r39.2 开发者指南——Jetson Orin NX 与 Orin Nano 系列：模组适配与启动调试](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html)（已于 2026-09-26 核查）
- [NVIDIA Jetson Orin 模组与开发者套件规格页](https://developer.nvidia.com/embedded/jetson-orin)（已于 2026-09-26 核查）
- [NVIDIA Super Boost：Jetson Orin Nano 开发者套件获得 Super 提升](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)（已于 2026-09-26 核查）
- [Jetson Orin Nano Super 开发者套件数据手册（PDF，链接自 nvidia.com）](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf)（已于 2026-09-26 核查）
- [钜犀科技商店产品页](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)（已于 2026-09-26 核查）

*状态：已于 2026-10-11 审核。内容依据所列日期的 NVIDIA 官方文档；尚未由钜犀科技在实体硬件上验证。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非 NVIDIA 官方出版物。
