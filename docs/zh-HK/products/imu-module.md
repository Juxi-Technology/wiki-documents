---
title: IMU 高精度慣導模組
description: 鉅犀科技 IMU 高精度慣導模組——100Hz 姿態解算,六軸/九軸/十軸可選,IIC+串口雙通信,ROS 集成
keywords: [imu, 慣導, 姿態傳感器, ahrs, ros]
---

# IMU 高精度慣導模組

> **[在商店購買](https://www.juxitech.com/zh-hant/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## 產品概述

高精度 IMU 姿態傳感器內置 72MHz 高性能 32 位處理器,實時姿態解算與動態補償,數據更新頻率高達 **100Hz**。支持 IIC 與串口雙通信模式,兼容單片機、Linux 主控,無縫集成 ROS。

**版本選擇**:

| 版本 | 陀螺儀 | 加速度計 | 磁力計 | 氣壓計 | AHRS |
|------|--------|---------|--------|--------|------|
| 六軸 | ✅ | ✅ | - | - | - |
| 九軸 | ✅ | ✅ | ✅ | - | ✅ |
| 十軸 | ✅ | ✅ | ✅ | ✅ | ✅ |

## 產品規格

| 類別 | 規格 |
|------|------|
| 處理器 | 72MHz 32 位 |
| 數據頻率 | 默認 25Hz,10~100Hz 可調 |
| 通信 | IIC(100KHz)/ 串口(115200bps) |
| 輸出 | 三軸加速度/角速度/歐拉角/磁力計/氣壓/溫度/四元數 |
| 工作電壓 | 5V 或 3.3V,11mA |
| 尺寸重量 | 27.4×22.6×12mm,3.8g |
| ROS | ROS1 / ROS2 |

## 快速開始

```bash
# ROS2 啟動
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# 校準(首次使用)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```

## 相關教程

- [IMU 模組介紹](/zh-HK/tutorials/sensors/imu/product-info)
- [IMU 校準指南](/zh-HK/tutorials/sensors/imu/calibration)
- [IMU ROS2 應用](/zh-HK/tutorials/sensors/imu/ros-examples/ros2)
- [IMU 多板卡通信示例](/zh-HK/tutorials/sensors/imu/multi-board-examples/overview)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
