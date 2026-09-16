---
title: AI 语音交互模块
category: accessory
description: 钜犀科技 AI 语音交互模块(CI1302)——110+ 条离线语音指令,5 米识别率 99%,支持自定义中英文指令词,串口/IIC 通信,适配 Arduino/Jetson/RDK/树莓派/PC
keywords: [ai语音, 语音交互模块, ci1302, 离线语音识别, 唤醒词, 命令词, 串口, iic, ros1, ros2]
---

# AI 语音交互模块

> **[淘宝购买](https://item.taobao.com/item.htm?id=1055967142978)**

## 产品概述

AI 语音交互模块基于启英泰伦 **CI1302** 高性能神经网络智能语音芯片,集成 BNPU V3 脑神经网络处理器,支持离线远场语音识别;板载 **STC8H 协处理器**,可将语音识别结果自动转换为串口或 IIC 数据,简化与外部主控设备的通信。识别全程在模块本地完成,无需联网。

**核心特性**:

- 100% 离线语音识别,无需联网(隐私 + 低延迟)
- 出厂预设 **110+ 条语音指令**,支持自定义中文和英文指令词(最多约 120 条)
- 唤醒词 “你好，小犀”,15 秒无指令自动休眠,再次唤醒即用
- 内置高保真扬声器与高性能麦克风,降噪与回声消除,5 米内识别率可达 99%
- 板载 STC8H 协处理器,识别结果输出为串口 / IIC 数据
- 主动播报与被动播报两种播报模式
- 提供 ROS1 / ROS2 SDK,以及 Arduino / Jetson / RDK / 树莓派 / PC 通信教程

---

## 产品规格

| 类别 | 规格 |
|------|------|
| 语音芯片 | 启英泰伦 CI1302(BNPU V3 神经网络处理器,主频可达 220MHz) |
| 存储 | 640KB SRAM + 2MB Flash |
| 语音指令 | 预设 110+ 条;自定义中英文指令词,最多可写入约 120 条 |
| 唤醒方式 | 唤醒词 “你好，小犀”(支持修改) |
| 识别距离 | 5 米以内(安静环境,识别率可达 99%) |
| 音频 | 内置高保真扬声器 + 高性能麦克风(降噪 + 回声消除) |
| 通信接口 | 串口 / IIC / Type-C(板载 STC8H 协处理器) |
| 供电 | 5V(Type-C) |
| 支持平台 | Arduino、Jetson、RDK、树莓派、PC(STM32 / ESP32 / MSPM0 等 MCU) |
| 软件支持 | ROS1 / ROS2 SDK、固件烧录工具、自定义词条网页工具 |

---

## 快速开始

出厂已烧录语音识别固件,无需烧录即可快速体验:

1. 使用 Type-C 数据线为模块供电(5V)
2. 说出唤醒词 “你好，小犀”,模块回复“我在”后即可下达指令(如“小车前进”)
3. 15 秒内没有识别到命令词条,模块播报“我去休息了”并进入休眠,再次使用时重新说出唤醒词即可

需要增加其他识别词条时,可通过网页工具修改指令词生成新固件,再用 PC 软件将固件写入模块,详见[模块固件烧录](/zh-hans/tutorials/accessories/ai-voice-module/Firmware-Flashing)与[自定义协议词条制作](/zh-hans/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)。

---

## 完整教程

- [快速上手——开箱体验、唤醒与播报](/zh-hans/tutorials/accessories/ai-voice-module/Quick-Start)
- [产品资料——产品特点、工作原理、注意事项与硬件接口](/zh-hans/tutorials/accessories/ai-voice-module/Product-Info)
- [模块固件烧录](/zh-hans/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [修改唤醒词和命令词](/zh-hans/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [自定义协议词条制作](/zh-hans/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [ROS1 语音交互](/zh-hans/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [ROS2 语音交互](/zh-hans/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [串口协议](/zh-hans/tutorials/accessories/ai-voice-module/Serial-Protocol) / [IIC 协议](/zh-hans/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [PC 通讯](/zh-hans/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino:[串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [IIC 通讯](/zh-hans/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson:[串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [IIC 通讯](/zh-hans/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK:[串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [IIC 通讯](/zh-hans/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- 树莓派:[串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [IIC 通讯](/zh-hans/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## 应用场景

- 机器人语音交互与指令控制(如“小车前进”“停止”)
- 智能家居语音控制(照明、家电)
- 教育与玩具类语音产品
- 工业设备语音控制
- 各类 DIY 语音交互项目

---

## 常见问题

**Q: 需要联网吗?**

**A:** 不需要。CI1302 为离线语音芯片,识别在模块本地完成,无需联网即可工作。

**Q: 出厂就能用吗?**

**A:** 可以。出厂已烧录语音识别功能固件,Type-C 供电后说出唤醒词即可体验;只有新增自定义词条时才需要重新烧录固件。

**Q: 支持英文指令吗?**

**A:** 支持。可自定义中文和英文指令词,通过网页工具修改后生成固件并烧录。

**Q: 如何与主控通信?**

**A:** 板载 STC8H 协处理器将语音识别结果自动转换为串口或 IIC 数据;提供 Arduino、Jetson、RDK、树莓派、PC 通讯教程与 ROS1 / ROS2 SDK。

**Q: 识别距离多远?**

**A:** 安静环境下 5 米内识别率可达 99%;嘈杂环境会影响识别效果。

---

## 注意事项

- 使用 5V 电压供电,超过 5V 会损坏模块
- 使用场景应尽量安静,嘈杂的环境会影响识别效果
- 说词条的时候,声音要洪亮而且语速不宜过快,建议与模块之间保持在 5 米之内

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
