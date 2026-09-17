---
title: Jetson Orin NX Super 开发套件
category: compute-vision
description: "钜犀科技 Jetson Orin NX SUPER 套件:预装 Ubuntu 22.04 与 256GB NVMe SSD,最高 157 TOPS,适用 LLM 与机器人视觉。"
keywords: [jetson, orin nx, edge ai, 边缘计算, leRobot, 机器人]
---

# Jetson Orin NX Super 开发套件

> **[淘宝店铺](https://juxitechnology.taobao.com)**

## 产品概述

NVIDIA Jetson Orin NX SUPER 开发套件是一款高性能边缘 AI 计算平台,专为高级机器人开发者、生成式 AI 研究员和嵌入式系统工程师打造。它采用 Jetson Orin NX SUPER 模块,提供高达 **117 TOPS (8GB) / 157 TOPS (16GB)** 的 AI 性能——比初代 Jetson Nano 快 234 倍 / 314 倍。

开箱即用,无需单独购买存储或安装系统:

- 预装 **Ubuntu 22.04**
- 预配置 **256GB NVMe PCIe 3.0 x4 SSD**(读取速度高达 2800MB/s)
- 2.4G/5G 双频 WiFi 5 + 蓝牙 5.0(4dBi 高增益天线)
- PWM 控制滚珠轴承风扇(50,000 小时寿命)
- 亚克力外壳,预留摄像头支架安装孔位

**适用场景**:大语言模型边缘部署、高级计算机视觉、LeRobot SO-ARM 机器人开发。

---

## 产品规格

| 类别 | 规格 |
|------|------|
| 核心模块 | NVIDIA Jetson Orin NX SUPER |
| AI 性能 | 117 TOPS(8GB 版本)/ 157 TOPS(16GB 版本) |
| CPU | 6 核 NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere 架构,1792 CUDA 核心 + 56 Tensor 核心 + 2 NVDLA 引擎 |
| 内存 | 8GB / 16GB LPDDR5(102.4 GB/s) |
| 存储 | 256GB NVMe PCIe 3.0 x4 SSD(读取高达 2800MB/s) |
| 无线连接 | 2.4G/5G 双频 WiFi 5 + 蓝牙 5.0,4dBi 高增益双天线 |
| 散热 | PWM 滚珠轴承风扇(50,000 小时)+ 铝制散热器 |
| 显示输出 | DP 1.4,最高 4K@60Hz (H.265) |
| 接口 | 4× USB 3.2、DP 4K60Hz、40 引脚 GPIO 排针 |
| 系统 | 预装 Ubuntu 22.04 |

## 硬件连接

### 快速开始

1. 连接电源适配器(19V 40W)
2. 将 DP 转 HDMI 线连接显示器
3. 连接键盘鼠标(USB 3.2 接口)
4. 开机进入预装的 Ubuntu 22.04

### 摄像头安装

亚克力外壳预留摄像头支架安装孔位,支持双摄像头安装(CSI / USB)。

---

## 软件配置

### 确认 PyTorch GPU 可用

```python
import torch
print(torch.cuda.is_available())  # 应输出 True
```

### 安装 LeRobot(SO-ARM100/101 开发)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### 参考

- [Jetson Orin 上 PyTorch 不兼容问题](/zh-hans/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [SO-ARM101 使用教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

---

## 套件变体

| 套件类型 | 附加组件 | 适用场景 |
|---------|---------|---------|
| **标准套件** | 主板 + 亚克力外壳 + 256GB SSD + WiFi/BT + 天线 + 19V 40W 电源 + DP转HDMI线 + Type-C线 + 螺丝刀 | 通用高性能 AI 开发 |
| **OLED 显示套件** | + 0.91 英寸 OLED 状态显示屏 | 实时监控系统资源 |
| **USB 音频套件** | + USB 声卡(扬声器 + 麦克风,降噪/回声消除) | 语音交互、LLM 语音助手 |
| **IMX219 摄像头套件** | + IMX219 CSI 摄像头(77° FOV,8MP)+ 铝制可调支架 | 原生 CSI 视觉 |
| **自动对焦摄像头套件** | + 86° 自动对焦 USB 摄像头(1080P)+ 铝制可调支架 | 通用视觉、机械臂 |
| **SO-ARM100/101 机器人套件** | + USB 3.0 HUB + 自动对焦摄像头 + 专用安装支架 | 机械臂视觉开发 |

## 版本选择

| 版本 | AI 性能 | 推荐场景 |
|------|---------|---------|
| **8GB** | 117 TOPS | 高级 AI 开发、中端机器人项目、LLM 边缘部署 |
| **16GB** | 157 TOPS | 高性能具身智能、大型模型边缘推理、复杂视觉任务 |

---

## 常见问题

**Q: 相比标准 Orin NX 快多少?**

**A:** 快 1.7 倍(SUPER 版本优化)。

**Q: 需要自己装系统吗?**

**A:** 不需要。已预装 Ubuntu 22.04 和 256GB SSD,通电即用。

**Q: 支持 SO-ARM101 吗?**

**A:** 完全兼容。配套有专用机器人视觉套件(摄像头 + 支架),与 LeRobot 生态无缝衔接。

**Q: 散热噪音如何?**

**A:** PWM 滚珠轴承风扇,40W 满载下性能稳定且噪音低,寿命 50,000 小时(比液压风扇耐用 10 倍)。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
