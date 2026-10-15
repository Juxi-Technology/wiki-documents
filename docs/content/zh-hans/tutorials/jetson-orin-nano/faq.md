---
title: 常见问题 FAQ
sidebar_label: 常见问题 FAQ
slug: /support/faq
description: >-
  关于 NVIDIA Jetson Orin Nano Super Developer Kit（8GB）的常见问题——存储、
  首次设置、固件、电源模式、AI 负载与技术支持。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# 常见问题 FAQ

## 开始之前

**包装里都有什么？**
Jetson Orin Nano Developer Kit、一个 19 V 电源适配器，以及一张快速入门与支持
卡片。**NVIDIA 的包装内不含存储**：microSD 卡或 NVMe SSD、安装器用的 U 盘，
以及显示器和键盘均需自备——不过钜犀商城面向本套件的套装另含一张 64 GB
microSD 卡（依据商店页面信息）。参见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)。

**需要自己购买存储吗？**
需要——除非你购买的是钜犀商城的套装，其中已包含一张 64 GB microSD 卡；
它已满足目标存储的要求，因此只有想要更大容量时才需要另购 NVMe SSD。（套装内
附的这张卡出厂为空白卡、未预装镜像——你需要用 Jetson ISO 把系统安装到它
上面。）NVIDIA 表示：“Jetson Orin Nano Developer Kit 的包装内不含可移动
存储，因此在开始设置前请先选好 microSD 卡或 NVMe SSD。”如果你拿到的是不含
配件的 NVIDIA 原盒，请购买一张 64GB UHS-1 或更大容量的 microSD 卡（NVIDIA
的建议），或为载板的某个 M.2 Key-M 插槽购买一块 PCIe NVMe SSD。本套件没有
eMMC：你的卡或 SSD 就是系统的主存储。参见
[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)和
[接口与硬件布局](/zh-hans/tutorials/jetson-orin-nano/interfaces)。

**还能像早期 JetPack 版本那样刷 SD 卡镜像吗？**
不能。从 JetPack 7.2 开始，SD 卡镜像不再受支持。NVIDIA 的说明：“不要把
Jetson ISO 刷写到 microSD 卡——请把它写入 U 盘，再用它把 Jetson Linux
安装到你的 microSD 卡或 NVMe SSD 上。”microSD 卡仍是有效的安装目标，只是
不再是写入镜像的介质。ISO U 盘是安装器，不是 live USB——它不能运行桌面，
只能安装系统。参见
[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)和
[迁移指南](/zh-hans/tutorials/jetson-orin-nano/jetpack-6-to-7)。

**开始之前到底需要准备什么？**
你需要：

- 套件及其随附的 19 V 电源适配器。
- 一台至少有 25GB 可用空间的笔记本电脑或 PC（Windows、Mac 或 Linux）。
- 一个 16GB 或更大容量的 U 盘，用于存放安装器镜像。
- 目标存储：一张 microSD 卡（建议 64GB UHS-1 或更大）和/或一块 NVMe
  SSD——钜犀商城的套装已包含那张 64 GB microSD 卡。
- 一台 DisplayPort 显示器、一个 USB 键盘和鼠标，或者用于无头安装的
  USB 转 TTL 串口线。

NVIDIA 的指南使用 Balena Etcher 把 ISO 写入 U 盘——只把文件复制到 U 盘里
是不够的。分步说明见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)。

**需要一台 Ubuntu PC 吗？**
不需要——推荐方式不需要。Jetson ISO 安装在套件本机上进行；你的 PC 只负责
把 ISO 写入 U 盘，Windows、Mac 和 Linux 都能胜任。只有在使用备选方式——
SDK Manager 或刷机脚本——时才需要一台 Ubuntu x86_64 主机 PC，例如你想用
Super 配置重新刷写套件时。注意：SDK Manager 页面记载的主机要求是
Ubuntu 20.04 / 22.04 x86_64，而 NVIDIA 员工也反馈从 Windows 刷机成功。参见
[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)。

**microSD 插槽在哪里？**
它在 Jetson Orin Nano 模块的底面，而不在载板边缘。请在启动 ISO 安装器之前
插好卡；安装器只会列出已安装的存储。之后若要换卡：关机、换上新卡，并在
插着卡的状态下重新运行 JetPack 7.2.1 ISO 安装器——JetPack 7.2 及更高版本
没有可写的卡镜像了。参见
[接口与硬件布局](/zh-hans/tutorials/jetson-orin-nano/interfaces)和
[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)。

## 安装设置

**我的套件是新的——为什么指南说要先更新固件？**
JetPack 7.2 及更高版本的安装要求套件上具备 JetPack 6.x 世代的 UEFI/QSPI
固件——版本 36.x 或更新。出厂固件较旧的套件必须先完成 NVIDIA 的
JetPack 6.x 更新路径，JetPack 7.2.1 ISO 才能启动。查看版本的方法：接上显示器开机，在启动画面反复按 Esc；UEFI 菜单顶部
附近会显示固件版本。若显示 36.x 或更新，继续即可；若早于 36.0，请先走更新
路径。参见[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)、
[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)，
以及[术语表](/zh-hans/tutorials/jetson-orin-nano/glossary)中关于 QSPI 和
capsule 更新等术语的说明。

**整个设置要花多长时间？**
NVIDIA 没有公布总用时。官方说明称，屏幕上可能会滚动显示数分钟的白色文字，
你应等待安装器完成，并在出现提示时重启。用户反馈：在 microSD 卡上安装约需
15 分钟到约两小时（用户反馈，未经证实）；随后首次开机还要经过 Ubuntu 设置
界面（语言、网络、用户名）。参见
[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)。

**安装器跳过了用户名/密码界面怎么办？**
这对应一个已知案例：QSPI capsule 提示超时了。安装器要求你确认一次
固件（QSPI）更新，但只等待 30 秒——一旦错过该提示，后续步骤就可能失败，
语言、网络和用户名界面也许根本不会出现；下一次启动则可能停在带光标的
黑屏上。官方指南给出的解决办法：重新开始安装，并在 capsule 提示出现时按
Y。也有用户先清理了遗留分区再重试，或改用 SDK Manager 安装（用户反馈；
NVIDIA 员工在该帖中作出回应）。参见
[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。

> **重要** 当安装器显示 QSPI capsule 更新提示时，请在 30 秒内按 **Y**。
> NVIDIA 称其为“最常被错过的一步”。

**如何获得串口控制台？**
把 USB 转 TTL 串口线接到 Button Header：RXD 引脚 3 接适配器的 TX 线，
TXD 引脚 4 接适配器的 RX 线，GND 引脚 7 接适配器的地线。然后在 PC 上打开
串口控制台，给套件上电，并在预启动画面期间按 Esc 进入 UEFI / Boot
Manager——整个 ISO 安装都可以这样完成。一个诚实的缺口：NVIDIA 的页面只说
“在你的 PC 上打开串口控制台”，却没有给出波特率或终端软件。当套件以设备
模式通过 USB-C 连接到 PC 时，还会呈现一个名为
“USB Serial device for serial terminal access”的设备。参见
[接口与硬件布局](/zh-hans/tutorials/jetson-orin-nano/interfaces)和
[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)。

## 电源与性能

**为什么没有 25W / MAXN SUPER 选项？**
你的套件被刷入了非 Super 的启动配置，因此只显示 7W 和 15W 模式。这是
JetPack 7.2 ISO 的已记载问题 **6279443**：ISO 安装保留了更新前的配置，
而没有切换到 “Super”。JetPack 7.2.1 已在新安装中修复此问题——ISO
“现在默认以 Super Mode 刷机配置刷写 Jetson Orin Nano Developer Kit”；
NVIDIA 未说明用 7.2.1 重装能否把 7.2.0 ISO 装出的套件转换过来。检查
`/etc/nv_boot_control.conf`：Super 配置会显示 `-super` 后缀。要修复现有的
7.2 安装，请从 Ubuntu 主机用 Super 配置重新刷机（SDK Manager 或刷机
脚本）；之后电源模式菜单会提供 15W、25W（默认）和 MAXN SUPER。参见
[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)、
[故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)和
[刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)。

> **钜犀提示：** 社区存在一种原地修复方法（编辑 `/etc/nv_boot_control.conf`、
> 重新配置 bootloader、删除 `/etc/nvpmodel.conf`、重启）。多名用户反馈
> 成功，但 NVIDIA 并未认可该方法，且有一位用户报告出现启动循环。

## AI 负载

**8 GB 能跑多大的模型？**
这 8GB LPDDR5 是统一内存，由 CPU、GPU 和操作系统共享——扣除固件与内核
预留后约剩 7.6GB 可用。NVIDIA 公布的指引：配合 4 位量化和内存高效的
运行时，可容纳约 10B 参数以内的 LLM 和约 4B 参数以内的 VLM。
TensorRT Edge-LLM 官方的 Orin Nano 8GB 基准最高覆盖到 2B 模型，这也是
NVIDIA 在此套件上做过基准测试的最大模型级别。即便文件看起来放得下，
模型也可能加载失败，因为 KV cache 同样需要内存；在 8GB 套件上，
7.4GB 和 16GB 的 GGUF 都曾加载失败（用户反馈）。参见
[8GB 上的本地 LLM](/zh-hans/tutorials/jetson-orin-nano/local-llm)和
[内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)。

## 支持与服务

**技术支持该走什么渠道？**
先看 NVIDIA 官方的[故障排查页面](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)，
它覆盖五种常见的安装问题：ISO 无法启动、无显示输出、安装器不显示目标
存储、需要更新固件，以及 Docker 权限错误。平台层面的问题请到
NVIDIA Jetson 开发者论坛，该论坛列在官方
[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)
页面上；发帖前先搜索，并附上 `cat /etc/nv_tegra_release` 的输出。
钜犀科技的联系方式：

- 技术支持：**support@juxitech.com**
- 订单、保修与 RMA：**support@juxitech.com**（请附上订单号）
- 销售与报价：**sales@juxitech.com**
- 产品问题（选型、兼容性）：**pe@juxitech.com**

官方下载与参考链接：[下载](/zh-hans/tutorials/jetson-orin-nano/downloads)。

> **钜犀提示：** 论坛上一些标注为 NVIDIA 员工的回复其实是自动生成的 AI
> 回答（以 “This is an automated AI response” 开头）。请把它们视为
> 非权威内容，以官方文档为准。

## 来源

- Jetson Orin Nano 开发者套件用户指南——[快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)、[故障排查](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)、[How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)、[硬件布局](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)（核查于 2026-09-26）
- [JetPack SDK 下载](https://developer.nvidia.com/embedded/jetpack/downloads)（核查于 2026-09-26）
- Jetson Linux 发布说明——[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)、[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)（核查于 2026-09-26）
- [在 NVIDIA Jetson 上以更高的内存效率运行更大的模型](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（核查于 2026-09-26）
- [TensorRT Edge-LLM 性能基准](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)（核查于 2026-09-26）
- NVIDIA 开发者论坛——[启动挂起 / 跳过用户名设置的主题帖](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)、[25W / MAXN SUPER 主题帖](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)（核查于 2026-09-26）
- [钜犀科技商店商品页——Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)（核查于 2026-09-26）

*状态：已于 2026-10-11 审核。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非
NVIDIA 官方出版物。
