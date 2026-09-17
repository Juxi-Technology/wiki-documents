---
title: AmazingHand 开源 4 指灵巧手
category: robot
description: "钜犀科技 AmazingHand 开源4 指灵巧手,TTL 总线控制,开源 CAD,具身智能与人机交互研究"
keywords: [amazinghand, 灵巧手, dexterous hand, 具身智能]
---

# AmazingHand 开源 4 指灵巧手

> **[淘宝购买](https://item.taobao.com/item.htm?id=1007323867930)**

## 产品概述

AmazingHand 是钜犀科技开源的4 指灵巧手,多关节仿生设计,支持 TTL 串行总线控制。开源 CAD 文件可自由修改手指设计,广泛用于灵巧操作、抓取策略、人机交互研究。

**核心特性**:

- 4 指多关节,类人手比例
- TTL 串行总线控制,与主流主控兼容
- 开源 CAD/源码,支持定制改装
- 与 SO-ARM101 组合构建完整操作平台
- 实时手部追踪:网络摄像头追踪手势,实时控制机械手
- 仿真演示:无需硬件即可运行手部追踪演示(dora-rs 生态)
- 手指角度控制:可单独控制每根手指角度,支持双手
- 供电:舵机驱动板 5V3A,USB 连接主控

## 产品规格

| 类别 | 规格 |
|------|------|
| 类型 | 4 指灵巧手 |
| 控制 | TTL 串行总线 |
| 生态 | Python SDK,ROS |
| 开源 | CAD/源码 GitHub 公开 |

## 快速开始

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

## 相关教程

- [AmazingHand 界面控制教程](/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [AmazingHand 官方示例运行教程](/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [AmazingHand TTL 调试教程](/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
