---
title: GPS & 北斗 GNSS 定位模块
category: sensor
description: 钜犀科技 GPS & 北斗 GNSS 定位模块——ATGM336H-5N 芯片,四大卫星系统联合定位,2.5m 精度,支持 ROS
keywords: [gps, beidou, gnss, 北斗, 定位模块, ros]
---

# GPS & 北斗 GNSS 定位模块

> **[淘宝购买](https://item.taobao.com/item.htm?id=1057400460049)**

## 产品概述

GPS & BDS 定位模块基于和芯星通 **ATGM336H-5N** 芯片,支持北斗二代/三代(1-63 号所有卫星)、GPS、GLONASS 和 QZSS 等卫星导航系统,可同时接收多系统信号实现联合定位、导航和授时。

**核心特性**:

- 支持 **BDS/GPS/QZSS/GLONASS** 四大卫星系统(单系统或任意组合)
- **32 通道**高灵敏度接收机,定位稳定可靠
- 定位精度 **2.5m (CEP50)**,冷启动 32 秒
- 即插即用 USB 串口 + TTL 串口
- 提供 Arduino/Jetson/树莓派/ROS 开源教程

---

## 产品规格

| 类别 | 规格 |
|------|------|
| 芯片 | ATGM336H-5N |
| 卫星系统 | BDS / GPS / QZSS / GLONASS |
| 通道数 | 32 通道,多系统同时接收 |
| 定位精度 | <2.5m (CEP50) |
| 更新频率 | 默认 1Hz,最大 10Hz |
| 波特率 | 4800-115200bps(默认 9600) |
| 灵敏度 | 冷启动 -148dBm,跟踪 -162dBm |
| 功耗 | 25mA @ 3.3V |
| 工作温度 | -40℃ ~ +85℃ |
| 接口 | USB Type-C / TTL 串口(PH2.0) |

## 引脚说明

| 引脚 | 功能 |
|------|------|
| 5V | 电源输入 |
| RES | 模块复位 |
| PPS | 每秒脉冲输出 |
| TX | 串口数据输出 |
| RX | 串口数据输入(可选) |

---

## 快速开始

### 1. 连接天线与模块

将 3 米有源 GPS 天线连接到模块,天线置于开阔处(室外或窗边)以快速搜星。

### 2. USB 连接 PC/主控

Type-C 数据线直连,即插即用(默认 9600bps)。

### 3. 验证定位

```bash
# 安装 pynmea2 解析 NMEA 数据
pip install pynmea2

# 读取定位数据示例
import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith('$GPRMC') or line.startswith('$GNRMC'):
        msg = pynmea2.parse(line)
        print(f'纬度: {msg.latitude}, 经度: {msg.longitude}')
```

### 4. ROS 集成

支持 ROS 定位节点,可与 IMU 融合、Move_Base 导航配合使用。

---

## 工具与资料

- **GnssToolKit3**:可视化工具,支持卫星状态查看、数据记录、KML 导出
- **坐标系转换**:提供 WGS-84 → GCJ-02 → BD-09 完整方案
- **示例代码**:Arduino / Python / Jetson Nano 教程
- [官方仓库](https://github.com/Juxi-Technology)(查阅 IMU/定位相关代码)

---

## 常见问题

**Q: 定位慢或无信号?**

**A:** 天线必须置于开阔处(室外/窗边);确认天线连接牢固;冷启动需 32 秒,首次开机请耐心等待。

**Q: 支持几个卫星系统?**

**A:** BDS、GPS、QZSS、GLONASS 四系统,支持单系统或任意组合联合定位。

**Q: 能接单片机吗?**

**A:** 可以。TTL 串口(PH2.0)支持接 MCU 开发板,附 51/Arduino/STM32 教程。

**Q: 输出格式?**

**A:** 标准 NMEA 0183 协议。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
