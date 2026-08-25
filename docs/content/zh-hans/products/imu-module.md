---
title: IMU 高精度惯导模块
description: 钜犀科技 IMU 高精度惯导模块——100Hz 姿态解算,六轴/九轴/十轴可选,IIC+串口双通信,ROS 集成
keywords: [imu, 惯导, 姿态传感器, ahrs, ros]
---

# IMU 高精度惯导模块

> **[淘宝店铺](https://juxitechnology.taobao.com)**

## 产品概述

高精度 IMU 姿态传感器内置 72MHz 高性能 32 位处理器,实时姿态解算与动态补偿,数据更新频率高达 **100Hz**。支持 IIC 与串口双通信模式,兼容单片机、Linux 主控,无缝集成 ROS。

**版本选择**:

| 版本 | 陀螺仪 | 加速度计 | 磁力计 | 气压计 | AHRS |
|------|--------|---------|--------|--------|------|
| 六轴 | ✅ | ✅ | - | - | - |
| 九轴 | ✅ | ✅ | ✅ | - | ✅ |
| 十轴 | ✅ | ✅ | ✅ | ✅ | ✅ |

## 产品规格

| 类别 | 规格 |
|------|------|
| 处理器 | 72MHz 32 位 |
| 数据频率 | 默认 25Hz,10~100Hz 可调 |
| 通信 | IIC(100KHz)/ 串口(115200bps) |
| 输出 | 三轴加速度/角速度/欧拉角/磁力计/气压/温度/四元数 |
| 工作电压 | 5V 或 3.3V,11mA |
| 尺寸重量 | 27.4×22.6×12mm,3.8g |
| 工作温度 | -40°C ~ +85°C(存储 -40°C ~ +100°C) |
| 抗冲击 | 20kg(裸板) |
| ROS | ROS1 / ROS2 |

## 快速开始

```bash
# ROS2 启动
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# 校准(首次使用)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```

## 相关教程

- [IMU 模块介绍](/zh-hans/tutorials/sensors/imu/product-info)
- [IMU 校准指南](/zh-hans/tutorials/sensors/imu/calibration)
- [IMU ROS2 应用](/zh-hans/tutorials/sensors/imu/ros-examples/ros2)
- [IMU 多板卡通信示例](/zh-hans/tutorials/sensors/imu/multi-board-examples/overview)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
