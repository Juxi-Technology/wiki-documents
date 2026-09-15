---
title: "Product Info"
description: "Built-in high-precision IMU attitude sensor72MHz high-performance 32-bit processor, capable of real-time attitude calculation and dynamic compensation"
---

# Product Info

> **[Buy in Store](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


# Introduction to IMU Module

Built-in high-precision IMU attitude sensor **72MHz high-performance 32-bit processor**, capable of real-time attitude calculation and dynamic compensation, with a data update frequency of up to 100Hz, combining the advantages of rapid response and stable output. It supports both IIC and serial communication modes, is compatible with single-chip microcomputers and Linux main controllers, and can be seamlessly integrated with the ROS system, widely applicable to high-performance application scenarios such as robot motion control, UAV attitude stabilization, and intelligent navigation and positioning.

# 1. Version Overview

| Performance Comparison |                                                     |                                                              |                                                              |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|                        | 6-Axis                                              | 9-Axis                                                       | 10-Axis                                                      |
| High-performance 32-bit processor | √                                            | √                                                            | √                                                            |
| 3-axis gyroscope       | √                                                    | √                                                            | √                                                            |
| 3-axis accelerometer   | √                                                    | √                                                            | √                                                            |
| 3-axis magnetometer    | -                                                    | √                                                            | √                                                            |
| Barometer              | -                                                    | -                                                            | √                                                            |
| AHRS attitude data fusion algorithm | -                                        | √                                                            | √                                                            |
| Mahony filter algorithm | √                                                   | √                                                            | √                                                            |
| Communication interface | Type-C (requires base board) / IIC pin header       |                                                              |                                                              |
| Communication method   | IIC / serial                                        |                                                              |                                                              |
| Positioning / Application scenarios | Designed for cost-sensitive applications, meeting the standard for high-dynamic-response applications | Built on the 6-axis hardware architecture with an integrated 3-axis magnetometer module, tuned with the AHRS attitude data fusion algorithm, greatly enhancing the stability and measurement accuracy of data output | Adds a barometer on top of the 9-axis sensing architecture, capable of outputting precise altitude information, suitable for application scenarios with higher requirements for 3D spatial attitude and position perception |

## Pin Function Description

| SDA  | I2C serial data line   |
| ---- | ---------------------- |
| SCL  | I2C serial clock line  |
| GND  | Ground                 |
| 3V3  | 3V3                    |
| RX   | Serial data receive pin |
| TX   | Serial data transmit pin |
| GND  | Ground                 |
| 5V   | 5V                     |

# 2. Product Parameters

| Product Parameters |                                                              |
| ------------------ | ------------------------------------------------------------ |
|                    | Notes                                                        |
| Serial baud rate   | 115200bps                                                    |
| Serial output frequency | Default 25Hz, adjustable from 10Hz to 100Hz              |
| IIC clock rate     | 100KHz                                                       |
| Output data        | 3-axis acceleration, 3-axis angular velocity, 3-axis gyroscope, 3-axis Euler angles, 3-axis magnetometer, barometric pressure, altitude, temperature, quaternion (*red text: 9-axis/10-axis versions only; blue text: 10-axis version only) |
| Startup time       | 5000ms                                                       |
| Operating temperature | -40°C~+85°C                                               |
| Storage temperature | -40°C~+100°C                                               |
| Shock resistance   | 20kg (bare board)                                            |
| Supported devices  | Linux hosts: PC, Raspberry Pi, Jetson series, RDK series; MCU hosts: STM32, MSPM0, ESP32, Pico, Arduino |
| Operating voltage  | 5V or 3.3V                                                   |
| Operating current  | 11mA                                                         |
| Product dimensions | 27.4mm*22.6mm*12mm                                           |
| Product weight     | 3.8g                                                         |
| ROS support        | ROS1/ROS2                                                    |

# 3. Sensor Performance Parameters

IMU Data Performance Parameters

| IMU                    | Accelerometer    | Gyroscope        | Magnetometer    |
| ---------------------- | ---------------- | ---------------- | --------------- |
| Range                  | ±16g             | ±2000°/s         | ±8Gauss         |
| Resolution             | 0.0005(g/LSB)    | 0.061(°/s)/(LSB) | 0.244mGauss/LSB |
| RMS noise (100Hz bandwidth) | 1.0mg-RMS    | 0.07°/S-RMS      | /               |
| Temperature drift      | ±0.15mg/C        | 0.015°/s/°C      | /               |
| Bandwidth              | 12.5~1600Hz      | 12.5~1600Hz      | /               |

Navigation Data Performance Parameters

| Parameter                          | Typical Value |             |
| ---------------------------------- | ------------- | ----------- |
| Pitch/Roll angle (horizontal placement) | Range      | X:±180°, Y:±90° |
| Accuracy                           | 0.0055°       |             |
| Heading angle (horizontal placement) | Range       | Z:±180°     |
| Accuracy                           | 0.0055°       |             |

Barometer Performance Parameters

| Parameter        | Condition     | Typical Value |
| ---------------- | ------------- | ------------- |
| Range            |               | 300~2000hPa   |
| RMS noise        | Standard mode | 1Pa-RMS       |
| Relative accuracy |              | ±0.12hPa      |

# 4. Dimension Parameters

![Pin Function Description – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjA3NmQ5NzIzMzdkYWZlMzZkYzcwOGIyOGRmMmYxYWJfNTAxNTBiYzRjZTk4MzJiY2YzMWZhMWY4NDI5ZTFjYTZfSUQ6NzYzODkyMjc2MDI5MDcxNjYwMl8xNzgwMzE3OTcyOjE3ODA0MDQzNzJfVjM)
