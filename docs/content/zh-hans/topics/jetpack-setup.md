---
title: JetPack 刷机与系统配置
description: "NVIDIA Jetson 平台 JetPack 刷机指南——SDK Manager 与官方镜像两种方式,刷机失败排错,系统基础配置"
keywords: [jetson, jetpack, 刷机, 系统配置, nvidia]
---

# JetPack 刷机与系统配置

> 📌 用 Jetson AGX Orin 官方套件(JetPack 7.2)?见专属系列:[快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)。

> 📌 用 NVIDIA Jetson Orin Nano Super 官方套件(JetPack 7.2.1)?见专属系列:[快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)。

> 面向首次接触 NVIDIA Jetson 平台的开发者。钜犀科技 Jetson 开发套件出厂已预装 Ubuntu 22.04,本文档用于重装系统或更换 JetPack 版本时参考。

## 1. JetPack 是什么?

JetPack 是 NVIDIA 为 Jetson 平台提供的 SDK 包,包含:

- Ubuntu 系统镜像
- CUDA / cuDNN / TensorRT
- 多媒体 API(L4T)

**版本对应**(常用):

| Jetson 板卡 | 推荐 JetPack | 系统 |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |
| Orin Nano Super(NVIDIA 官方套件) | JetPack 7.2.1 | Ubuntu 24.04 |

> 钜犀科技 [Jetson Orin NX Super 开发套件](/zh-hans/products/jetson-orin-nx-super-kit) 预装 Ubuntu 22.04(JetPack 6.x 生态)。

> [NVIDIA Jetson Orin Nano Super 开发者套件](/zh-hans/products/jetson-orin-nano-devkit)——NVIDIA 官方套件,由钜犀科技销售——出厂**不含存储、也未预装系统**(套装内附的 microSD 卡为空白卡)。请使用 Jetson ISO 方式安装 JetPack 7.2.1:见 [Jetson Orin Nano 系列](/zh-hans/tutorials/jetson-orin-nano/quick-start)。

## 2. 刷机方式

### 方式一:官方镜像(Ubuntu 引导)

适合已有 Ubuntu 主机或 U 盘引导的场景:

```bash
# 1. 从 NVIDIA 官网下载对应板卡的驱动包(Driver Package)
# 2. 解压并进入 Linux_for_Tegra 目录
cd Linux_for_Tegra
sudo ./apply_binaries.sh

# 3. 将 Jetson 进入 Recovery 模式(按住 REC 键上电)
# 4. 刷机
sudo ./flash.sh <board-name> mmcblk0p1
```

### 方式二:SDK Manager(推荐新手)

1. 安装 [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)
2. 连接 Jetson 到 PC(Recovery 模式)
3. 选择板卡型号 → JetPack 版本 → 勾选组件(建议全选 CUDA/TensorRT)
4. 等待烧录 + 首次引导完成

> ⚠️ 刷机时间较长(20-60 分钟),过程中**不要拔线断电**。

## 3. 刷机失败排错

| 现象 | 排查 |
|------|------|
| 无法进入 Recovery 模式 | 确认按住 REC 键后上电,用 `lsusb` 检查是否检测到 NVIDIA 设备 |
| 刷机中途失败 | 换一根**数据线**(先排除线材问题);关掉 PC 省电模式;重新刷 |
| 刷完黑屏 | 检查显示器接口(Orin 用 DP);重新进入 Recovery 重刷 |
| 提示版本不匹配 | 确认选择的板卡型号与 JetPack 版本对应(板卡侧面丝印) |

## 4. 系统基础配置

### 4.1 网络与源

```bash
# 换国内源(可选,加速 apt)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 确认 GPU 环境

```bash
# 查看 JetPack/CUDA
cat /etc/nv_tegra_release
nvcc --version

# 验证 PyTorch GPU
python3 -c "import torch; print(torch.cuda.is_available())"
```

> 若 PyTorch 不可用,参考 [Jetson Orin 上 PyTorch 不兼容问题](/zh-hans/tutorials/learning-resources/jetson-orin-pytorch-compatibility)。

### 4.3 开启 64G 显存模式(Orin)

```bash
sudo nvpmodel -m 0          # 最高性能模式
sudo jetson_clocks          # 解锁频率上限
```

### 4.4 扩容根分区

JetPack 刷机后根分区可能只占部分 SD/eMMC 空间:

```bash
sudo systemctl enable --now nvresize             # 自动扩容
# 或手动:
sudo resize2fs /dev/nvme0n1p1                    # 以实际设备为准
```

## 5. 常见问题

**Q: 刷机后没有 WiFi?**

**A:** Orin 系列核心板需外接 M.2 WiFi 模块;检查驱动的双频天线是否接好。

**Q: 如何进入 Recovery 模式?**

**A:** 断电 → 按住 REC(或 BOOT)键 → 插入电源/Type-C → `lsusb` 确认出现 `NVIDIA Corp.` 设备即成功。

**Q: 需要多大的存储?**

**A:** 建议 ≥128GB SSD(SD 卡写入速度瓶颈明显)。256GB 是开发套件标准配置。

---

## 相关链接

- [Jetson Orin NX Super 开发套件](/zh-hans/products/jetson-orin-nx-super-kit)
- [边缘 AI 部署入门](/zh-hans/topics/edge-ai-intro)
- [ROS 入门教程](/zh-hans/tutorials/ros-intro)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
