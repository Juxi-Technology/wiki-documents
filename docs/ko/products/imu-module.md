---
title: IMU 고정밀 관성항법 모듈
description: 鉅犀科技 IMU 고정밀 관성항법 모듈 — 100Hz 자세 연산, 6/9/10축 선택, IIC+직렬 이중 통신, ROS 통합
keywords: [imu, 관성항법, 자세 센서, ahrs, ros]
---

# IMU 고정밀 관성항법 모듈

> **[스토어에서 구매](https://www.juxitech.com/ko/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## 제품 개요

고정밀 IMU 자세 센서는 72MHz 고성능 32비트 프로세서를 내장해 실시간 자세 연산과 동적 보상을 수행하며, 데이터 갱신 주파수는 최대 **100Hz**입니다. IIC 및 직렬 이중 통신 모드를 지원하고, 마이컴·Linux 호스트와 호환되며 ROS에 원활하게 통합됩니다.

**버전 선택**:

| 버전 | 자이로 | 가속도계 | 자력계 | 기압계 | AHRS |
|------|--------|---------|--------|--------|------|
| 6축 | ✅ | ✅ | - | - | - |
| 9축 | ✅ | ✅ | ✅ | - | ✅ |
| 10축 | ✅ | ✅ | ✅ | ✅ | ✅ |

## 사양

| 카테고리 | 사양 |
|------|------|
| 프로세서 | 72MHz 32비트 |
| 데이터 주파수 | 기본 25Hz, 10~100Hz 가변 |
| 통신 | IIC(100KHz)/ 직렬(115200bps) |
| 출력 | 3축 가속도/각속도/오일러각/자력계/기압/온도/쿼터니언 |
| 작동 전압 | 5V 또는 3.3V, 11mA |
| 크기·무게 | 27.4×22.6×12mm, 3.8g |
| 작동 온도 | -40°C ~ +85°C(보관 -40°C ~ +100°C) |
| 내충격성 | 20kg(베어 보드) |
| ROS | ROS1 / ROS2 |

## 빠른 시작
```bash
# ROS2 启动
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# 校准(首次使用)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```
## 관련 튜토리얼

- [IMU 모듈 소개](/ko/tutorials/sensors/imu/product-info)
- [IMU 캘리브레이션 가이드](/ko/tutorials/sensors/imu/calibration)
- [IMU ROS2 애플리케이션](/ko/tutorials/sensors/imu/ros-examples/ros2)
- [IMU 멀티보드 통신 예제](/ko/tutorials/sensors/imu/multi-board-examples/overview)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
