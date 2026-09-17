---
title: XLeRobot 双臂移动机器人
category: robot
description: "钜犀科技 XLeRobot 双臂移动机器人——SO-ARM101 双臂 + 全向轮底盘 + 相机塔,双舵机驱动板 12V 供电,LeRobot 生态,支持成品/散件两种形态"
keywords: [xlerobot, 双臂机器人, 移动机器人, 具身智能, lerobot, so-arm101, 全向轮底盘]
---

# XLeRobot 双臂移动机器人

> **[淘宝购买](https://item.taobao.com/item.htm?id=1045195950187)**

## 产品概述

XLeRobot 是一款双臂移动机器人平台:以全向轮(万向轮)底盘车为移动底座,通过相机塔承载两个 SO-ARM101 从动机械臂,配合双舵机驱动板、树莓派/Jetson 主控与 PD 移动电源,构成可以移动操作的开源机器人,面向具身智能研究、家务操作与 LeRobot 生态开发。

**核心特性**:

- 双臂操作 + 全向移动底盘,可移动抓取多种家庭物品
- 基于 SO-ARM101 机械臂,采用飞特 STS3215-C018 总线舵机
- 相机塔 + 手腕相机,支持数据采集与模仿学习
- 双舵机驱动板独立驱动双臂与底盘,12V 供电
- 完整 LeRobot 软件生态:环境搭建、数据采集、训练与推理
- 提供成品组装与散件组装两种形态,散件附完整配件清单
- 兼容 Lekiwi 底座(已有 Lekiwi 可直接复用轮式底座)

---

## 产品规格

| 类别 | 规格 |
|------|------|
| 机械臂 | SO-ARM101 从动臂 ×2(飞特 STS3215-C018 总线舵机,ID 1-6) |
| 底盘 | 全向轮(万向轮)底盘车,3 个 STS3215-C018 舵机(ID 7/8/9) |
| 相机塔 | 相机塔底座 + 2 个 STS3215-C018 舵机(ID 7/8)+ 摄像头 |
| 驱动 | 舵机驱动板 ×2(USB-C 转 USB-A 数据线连接主控;PD 转 DC12V3A 电源线) |
| 供电 | PD 移动电源 12V 版本(单口最高 100W,经测试足以支持运行) |
| 主控 | 树莓派(需自备)/ Jetson |
| 连接线 | 90CM 舵机延长线 ×2(底盘车与相机塔 → 舵机驱动板) |
| 整机重量 | 约 12kg(完全组装后) |
| 软件 | LeRobot 生态;舵机配置使用 Bambot(Windows / macOS / Linux) |

---

## 快速开始

### 1. 搭建 LeRobot 环境

按操作系统选择环境搭建教程(macOS / Ubuntu / Windows),安装 LeRobot 与依赖。

### 2. 移动 XLeRobot 文件

将 XLeRobot 文件移动到对应目录,完成软件准备工作。

### 3. 组装机器人

- **成品组装**:按配件清单直接安装底盘车、相机塔底座、双臂与接线
- **散件组装**:先配置舵机(用 [Bambot](https://bambot.org/feetech.js) 扫描并重命名 ID),再依次组装推车、轮式底座、机械臂底座与接线,最后放置电池

散件组装建议最后连接电源线缆;在插拔其他线缆时保持电源断开,以保护舵机驱动板。

---

## 完整教程

- [XLeRobot 教程总览](/zh-hans/tutorials/robot-arms/xlerobot/)
- [安装环境(macOS)](/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [安装环境(Ubuntu)](/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [安装环境(Windows)](/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [移动 XLeRobot 文件](/zh-hans/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [成品组装教程](/zh-hans/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [散件组装教程](/zh-hans/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## 应用场景

- 具身智能与模仿学习研究(家务操作、物品抓取)
- 双臂移动操作算法开发(LeRobot 生态)
- 机器人教学与竞赛
- 家庭服务机器人原型验证

---

## 常见问题

**Q: 成品和散件有什么区别?**

**A:** 成品为按配件清单装配好的套件;散件需要自行组装,并先用 Bambot 工具配置舵机 ID(机械臂 1-6,底盘 7/8/9,相机塔 7/8)。

**Q: 还需要自备哪些部件?**

**A:** 移动电源、树莓派以及 PD 5V5A 树莓派电源线需自行购买(教程中已注明)。

**Q: 舵机 ID 怎么配置?**

**A:** 连接舵机与舵机驱动板到电脑后,使用 [Bambot 舵机配置页面](https://bambot.org/feetech.js)扫描并重命名舵机 ID;官方 LeRobot 代码库暂不支持机械臂以外的舵机配置,故使用 Bambot 代替。

**Q: 组装完成后可以直接推着移动吗?**

**A:** 不可以。完全组装后请勿像推车一样推着走,这可能损坏舵机齿轮;需要手动移动时请抬起机器人(约 12kg)。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
