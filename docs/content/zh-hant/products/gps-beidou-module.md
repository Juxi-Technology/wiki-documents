---
title: GPS & 北斗 GNSS 定位模組
description: 鉅犀科技 GPS & 北斗 GNSS 定位模組——ATGM336H-5N 芯片,四大衛星系統聯合定位,2.5m 精度,支持 ROS
keywords: [gps, beidou, gnss, 北斗, 定位模組, ros]
---

# GPS & 北斗 GNSS 定位模組

> **[淘寶店鋪](https://juxitechnology.taobao.com)**

## 產品概述

GPS & BDS 定位模組基於和芯星通 **ATGM336H-5N** 芯片,支持北斗二代/三代(1-63 號所有衛星)、GPS、GLONASS 和 QZSS 等衛星導航系統,可同時接收多系統信號實現聯合定位、導航和授時。

**核心特性**:

- 支持 **BDS/GPS/QZSS/GLONASS** 四大衛星系統(單系統或任意組合)
- **32 通道**高靈敏度接收機,定位穩定可靠
- 定位精度 **2.5m (CEP50)**,冷啟動 32 秒
- 即插即用 USB 串口 + TTL 串口
- 提供 Arduino/Jetson/樹莓派/ROS 開源教程

---

## 產品規格

| 類別 | 規格 |
|------|------|
| 芯片 | ATGM336H-5N |
| 衛星系統 | BDS / GPS / QZSS / GLONASS |
| 通道數 | 32 通道,多系統同時接收 |
| 定位精度 | <2.5m (CEP50) |
| 更新頻率 | 默認 1Hz,最大 10Hz |
| 波特率 | 4800-115200bps(默認 9600) |
| 靈敏度 | 冷啟動 -148dBm,跟蹤 -162dBm |
| 功耗 | 25mA @ 3.3V |
| 工作溫度 | -40℃ ~ +85℃ |
| 接口 | USB Type-C / TTL 串口(PH2.0) |

## 引腳說明

| 引腳 | 功能 |
|------|------|
| 5V | 電源輸入 |
| RES | 模組復位 |
| PPS | 每秒脈衝輸出 |
| TX | 串口數據輸出 |
| RX | 串口數據輸入(可選) |

---

## 快速開始

### 1. 連接天線與模組

將 3 米有源 GPS 天線連接到模組,天線置於開闊處(室外或窗邊)以快速搜星。

### 2. USB 連接 PC/主控

Type-C 數據線直連,即插即用(默認 9600bps)。

### 3. 驗證定位

```bash
# 解析 NMEA 數據
pip install pynmea2

import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith(('$GPRMC', '$GNRMC')):
        msg = pynmea2.parse(line)
        print(f'緯度: {msg.latitude}, 經度: {msg.longitude}')
```

### 4. ROS 集成

支持 ROS 定位節點,可與 IMU 融合、Move_Base 導航配合使用。

---

## 工具與資料

- **GnssToolKit3**:可視化工具,支持衛星狀態查看、數據記錄、KML 導出
- **坐標系轉換**:提供 WGS-84 → GCJ-02 → BD-09 完整方案
- **示例代碼**:Arduino / Python / Jetson Nano 教程

---

## 常見問題

**Q: 定位慢或無信號?**
天線必須置於開闊處;確認天線連接牢固;冷啟動需 32 秒,首次開機請耐心等待。

**Q: 支持幾個衛星系統?**
BDS、GPS、QZSS、GLONASS 四系統,支持單系統或任意組合聯合定位。

**Q: 能接單片機嗎?**
可以。TTL 串口(PH2.0)支持接 MCU 開發板,附 51/Arduino/STM32 教程。

**Q: 輸出格式?**
標準 NMEA 0183 協議。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
