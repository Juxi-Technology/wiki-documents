---
title: IMU High-Precision Inertial Module
description: Juxi Technology IMU module — 100Hz attitude, 6/9/10-axis options, IIC+UART, ROS integration
keywords: [imu, inertial, attitude sensor, ahrs, ros]
---

# IMU High-Precision Inertial Module

> **[Buy in Store](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Overview

High-precision IMU attitude sensor with a 72MHz 32-bit processor for real-time attitude solving and dynamic compensation, up to **100Hz** data rate. Supports IIC and serial dual-mode communication with MCU and Linux hosts, seamlessly integrating with ROS.

**Version selection**:

| Version | Gyro | Accel | Mag | Baro | AHRS |
|---------|------|-------|-----|------|------|
| 6-axis | ✅ | ✅ | - | - | - |
| 9-axis | ✅ | ✅ | ✅ | - | ✅ |
| 10-axis | ✅ | ✅ | ✅ | ✅ | ✅ |

## Specifications

| Category | Spec |
|----------|------|
| MCU | 72MHz 32-bit |
| Data Rate | Default 25Hz, 10-100Hz |
| Interface | IIC (100KHz) / UART (115200bps) |
| Output | 3-axis accel/gyro/euler/mag/pressure/temp/quaternion |
| Power | 5V or 3.3V, 11mA |
| Size/Weight | 27.4×22.6×12mm, 3.8g |
| Operating temp | -40°C ~ +85°C (storage -40°C ~ +100°C) |
| Shock resistance | 20kg (bare board) |
| ROS | ROS1 / ROS2 |

## Quick Start

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# Calibrate before first use
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```

## Tutorials

- [IMU Module Overview](/en/tutorials/sensors/imu/product-info)
- [IMU Calibration Guide](/en/tutorials/sensors/imu/calibration)
- [IMU ROS2](/en/tutorials/sensors/imu/ros-examples/ros2)
- [IMU Multi-Board Examples](/en/tutorials/sensors/imu/multi-board-examples/overview)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
