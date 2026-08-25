---
title: IMU 캘리브레이션 가이드
description: Juxi Technology 고정밀 IMU 모듈 캘리브레이션 — 전체/자력계/온도, UART 및 I2C
keywords: [imu, 캘리브레이션, 자력계]
---

# IMU 캘리브레이션 가이드

> **[스토어에서 구매](https://www.juxitech.com/ko/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> 첫 사용 전 캘리브레이션 권장. 공식 `IMU_Library`의 `imu_calibration_tool.py` 사용.

## 캘리브레이션 종류

| 유형 | 설명 |
|------|------|
| **전체** (`imu`) | 가속도계 + 자이로 + 자력계 |
| **자력계** (`mag`) | 환경 자기장 간섭 제거 |
| **온도** (`temp`) | 온도 드리프트 보상 |

## 직렬 통신

```bash
cd ~/IMU_Library/IMU_Library
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C 통신

```bash
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag
```

## 팁

- 자력계: 수평으로 천천히 회전하며 모든 방향 커버
- 전체 캘리브레이션 중엔 완전 정지
- 모터/자석과 거리 유지

## 관련

- [IMU 모듈 소개](/ko/products/imu-module)