---
title: IMU-Trägheitsmodul
description: 100Hz-Attitude, 6/9/10-Achsen, IIC+UART, ROS
keywords: [imu-module]
---

# IMU-Trägheitsmodul

> **[Im Shop kaufen](https://www.juxitech.com/de/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Überblick

Hochpräzises IMU mit 72MHz-32-Bit-Prozessor. Bis zu 100Hz Attitudedaten, IIC/Seriell-Dualkommunikation, ROS-Integration.

## Spezifikationen

| カテゴリ | 仕様 |
|------|------|
| Datenrate | Standard 25Hz, 10-100Hz |
| Schnittstelle | IIC (100KHz) / UART (115200bps) |
| Spannung | 5V oder 3.3V, 11mA |
| Größe | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1 / ROS2 |

## Schnellstart

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data
```

---

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
