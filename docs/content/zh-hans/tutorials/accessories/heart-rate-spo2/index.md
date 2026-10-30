---
title: "MAX30102 心率血氧传感器模块使用教程"
description: "MAX30102 心率血氧传感器模块完整教程：产品资料、网页端、Arduino、树莓派与 PC 端上位机。"
---

# MAX30102 心率血氧传感器模块使用教程

本教程介绍钜犀科技 MAX30102 心率血氧传感器模块的使用方法。模块搭载美信（Maxim）MAX30102 专用心率血氧检测芯片，内置自研心率血氧算法，可直接输出心率、血氧饱和度和板载温度，支持 I2C 与 UART 两种通信方式。

## 教程目录

| 内容 | 说明 |
|---|---|
| [产品资料](./product-info.md) | 产品概述、检测原理、技术规格、引脚定义与典型应用场景 |
| [网页端使用教程](./web-console.md) | 浏览器 Web Serial 直接连接，无需安装软件 |
| [Arduino 使用教程](./arduino.md) | 接线、库安装、示例代码、API 与常见问题 |
| [树莓派使用教程](./raspberry-pi.md) | I2C / UART 接线、环境配置、示例代码与 API |
| [PC 端 · Python 运行](./pc/python.md) | USB 转 TTL + Python 脚本读取数据 |
| [PC 端上位机](./pc/upper-computer.md) | 图形化上位机：串口设置、采集与实时监测 |

## 快速开始

1. 先阅读[产品资料](./product-info.md)，确认供电（3.3–5V）与引脚定义；
2. 只想快速看数据：用[网页端使用教程](./web-console.md)，Chrome / Edge 打开网页即可；
3. 接单片机：看 [Arduino 使用教程](./arduino.md)；
4. 接树莓派：看[树莓派使用教程](./raspberry-pi.md)；
5. 接电脑：看 [PC 端 · Python 运行](./pc/python.md) 或 [PC 端上位机](./pc/upper-computer.md)。

> 本产品为消费级电子检测模块，不属于专业医疗器械，检测数据仅作日常健康参考。

<RelatedProducts slugs="heart-rate-spo2" />
