---
title: Feetech 总线舵机(SCS0009 / STS3215)
description: 钜犀科技 Feetech 串行总线舵机 SCS0009 与 STS3215——SCS 通信协议,磁编码/电位器双版本,内存表解析,上位机调试
keywords: [feetech, 舵机, scs, sts, 串行总线]
---

# Feetech 总线舵机(SCS0009 / STS3215)

> **[淘宝购买](https://item.taobao.com/item.htm?id=1031232356224)**

## 产品概述

Feetech(飞特)串行总线舵机是 SO-ARM101 等机械臂的驱动核心,支持 **SCS 通信协议**,单总线串联多舵机。提供磁编码(STS)与电位器(SCSCL)两个版本,配合上位机 FD 软件调试。

**核心特性**:

- 串行总线通信,单总线多舵机
- 磁编码(STS)/ 电位器(SCSCL)两种版本
- 位置/速度/扭矩实时反馈
- 内存表解析文档齐全
- 双通信方式:TTL(高速)/ RS485(强抗干扰)
- 单总线最多 254 个舵机(ID 0-253,广播 ID 254)
- 默认 1M 波特率,8 位数据位,1 位停止位
- 过温/过压/过流/过载多重保护
- FD 上位机调试(Windows)

## 产品规格

| 类别 | 规格 |
|------|------|
| 协议 | SCS 串行总线 |
| 版本 | STS3215(磁编码)/ SCS0009(电位器) |
| 调试 | FD 上位机(Windows) |
| 波特率 | 1,000,000(上位机默认) |

## 快速开始

```bash
# 上位机调试(Windows):下载 feetechrc.com/software.html
# 选择端口,波特率 1000000,点击搜索
```

## 相关教程

- [Feetech STS3215 & SCS0009 调试教程](/zh-hans/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
- [SCS 通信协议](/zh-hans/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
- [磁编码 STS 舵机内存表解析](/zh-hans/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
- [电位器 SCSCL 舵机内存表解析](/zh-hans/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
