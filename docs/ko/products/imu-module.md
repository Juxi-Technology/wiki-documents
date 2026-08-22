---
title: IMU 관성 모듈
description: 100Hz 자세 해석, 6/9/10축, IIC+UART, ROS 지원
keywords: [imu-module]
---

# IMU 관성 모듈

> **[스토어에서 구매](https://www.juxitech.com/ko/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## 개요

72MHz 32비트 프로세서 탑재 고정밀 IMU. 최대 100Hz 자세 데이터, IIC/직렬 이중 통신, ROS 통합.

## 사양

| カテゴリ | 仕様 |
|------|------|
| 데이터 레이트 | 기본 25Hz, 10~100Hz |
| 인터페이스 | IIC (100KHz) / UART (115200bps) |
| 전압 | 5V 또는 3.3V, 11mA |
| 크기 | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1 / ROS2 |

## 빠른 시작

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data
```

---

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
