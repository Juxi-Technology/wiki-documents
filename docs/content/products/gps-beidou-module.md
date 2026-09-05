---
title: GPS & BeiDou GNSS Positioning Module
category: sensor
description: Juxi Technology GPS & BeiDou GNSS module — ATGM336H-5N, four satellite systems, 2.5m accuracy, ROS ready
keywords: [gps, beidou, gnss, positioning, ros]
---

# GPS & BeiDou GNSS Positioning Module

> **[Buy in Store](https://www.juxitech.com/products/gps-beidou-gnss-positioning-module)**

## Overview

The GPS & BDS positioning module is based on the **ATGM336H-5N** chip, supporting BeiDou B2/B3 (all satellites 1-63), GPS, GLONASS, and QZSS — with simultaneous multi-system reception for joint positioning, navigation, and timing.

**Key features**:

- **BDS/GPS/QZSS/GLONASS** four satellite systems (single or any combination)
- **32-channel** high-sensitivity receiver
- Positioning accuracy **2.5m (CEP50)**, cold start 32s
- Plug-and-play USB serial + TTL serial
- Open-source tutorials for Arduino/Jetson/Raspberry Pi/ROS

---

## Specifications

| Category | Spec |
|----------|------|
| Chip | ATGM336H-5N |
| Satellite Systems | BDS / GPS / QZSS / GLONASS |
| Channels | 32, simultaneous multi-system |
| Accuracy | <2.5m (CEP50) |
| Update Rate | Default 1Hz, max 10Hz |
| Baud Rate | 4800-115200bps (default 9600) |
| Sensitivity | Cold start -148dBm, tracking -162dBm |
| Power | 25mA @ 3.3V |
| Operating Temp | -40℃ to +85℃ |
| Interface | USB Type-C / TTL serial (PH2.0) |

## Pinout

| Pin | Function |
|-----|----------|
| 5V | Power input |
| RES | Module reset |
| PPS | Pulse-per-second output |
| TX | Serial data output |
| RX | Serial data input (optional) |

---

## Quick Start

### 1. Connect Antenna

Connect the 3m active GPS antenna, placing it in an open area (outdoors or window side) for fast satellite acquisition.

### 2. USB to PC/Host

Type-C direct connection, plug and play (default 9600bps).

### 3. Verify Positioning

```bash
# Parse NMEA data
pip install pynmea2

import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith(('$GPRMC', '$GNRMC')):
        msg = pynmea2.parse(line)
        print(f'Lat: {msg.latitude}, Lon: {msg.longitude}')
```

### 4. ROS Integration

Supports ROS positioning nodes, combinable with IMU fusion and Move_Base navigation.

---

## Tools & Resources

- **GnssToolKit3**: visualization tool — satellite status, data logging, KML export
- **Coordinate conversion**: WGS-84 → GCJ-02 → BD-09 complete solution
- **Examples**: Arduino / Python / Jetson Nano tutorials

---

## FAQ

**Q: Slow positioning or no signal?**

**A:** The antenna must be in an open area; check the connection; cold start takes 32s — be patient on first boot.

**Q: How many satellite systems?**

**A:** BDS, GPS, QZSS, GLONASS — single or any combination.

**Q: Can I connect to an MCU?**

**A:** Yes. TTL serial (PH2.0) supports MCU boards, with 51/Arduino/STM32 tutorials.

**Q: Output format?**

**A:** Standard NMEA 0183 protocol.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
