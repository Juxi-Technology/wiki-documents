---
title: Modulo inerziale IMU
description: Assetto 100Hz, 6/9/10 assi, IIC+UART, ROS
keywords: [imu-module]
---

# Modulo inerziale IMU

> **[Acquista nel negozio](https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Panoramica

IMU ad alta precisione con processore 72MHz a 32 bit. Dati di assetto fino a 100Hz, doppia comunicazione IIC/seriale, integrazione ROS.

## Specifiche

| カテゴリ | 仕様 |
|------|------|
| Frequenza | 25Hz di default, 10-100Hz |
| Interfaccia | IIC (100KHz) / UART (115200bps) |
| Tensione | 5V o 3.3V, 11mA |
| Dimensioni | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1 / ROS2 |

## Avvio rapido

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data
```

---

## Supporto

- 📧 Email: support@juxitech.com
- 🌐 Sito web: [www.juxitech.com](https://www.juxitech.com)
