---
title: "IMU 캘리브레이션"
description: "Juxi Technology 고정밀 IMU 모듈 캘리브레이션 — 전체/자력계/온도, UART 및 I2C"
keywords: [imu, 캘리브레이션, 자력계]
---

# IMU 캘리브레이션

> **[스토어에서 구매](https://www.juxitech.com/ko/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> 첫 사용 전 캘리브레이션 권장. 공식 `IMU_Library`의 `imu_calibration_tool.py` 사용.

## 캘리브레이션 종류

| 유형 | 설명 | 시기 |
|------|------|------|
| **전체** (`imu`) | 가속도계 + 자이로 + 자력계 | 최초 설치 후, 장착 위치 변경 시 |
| **자력계** (`mag`) | 환경 자기장 간섭 제거 | 모터/금속 근처로 이동한 후 |
| **온도** (`temp`) | 온도 드리프트 보상 | 큰 온도 변화가 있을 때 |

---

## 준비

1. 공식 저장소를 클론합니다:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. 호스트(직렬 또는 I2C)와 IMU 연결을 확인합니다

3. **캘리브레이션 자세**: IMU를 평평하고 고정된 위치에 두고, 강한 자기장 소스(모터, 자석, 금속 고정물)에서 멀리 떨어뜨립니다

---

## 직렬 통신

```bash
cd ~/IMU_Library/IMU_Library

# 모든 캘리브레이션 실행(전체, 자력계, 온도)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 전체 캘리브레이션만
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 자력계만
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 온도만
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C 통신

```bash
# 모든 캘리브레이션 실행
python3 imu_calibration_tool.py --mode i2c --port 1

# 전체 캘리브레이션만
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 자력계만
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 온도만
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port`: I2C 모드에서는 I2C 버스 번호(예: Raspberry Pi/STM32에서 1), 직렬 모드에서는 장치 경로(예: `/dev/ttyUSB0`, `/dev/imu-serial`).

---

## 캘리브레이션 팁

| 팁 | 설명 |
|-----|------|
| **자력계** | IMU를 수평으로 천천히 회전(8자 또는 원)하며 모든 방향을 커버 |
| **정지 상태** | 전체 캘리브레이션 중 IMU는 완전히 정지해야 함 |
| **자석 금지** | 모터, 변압기, 금속 테이블에서 멀리 유지 |
| **다축** | 자력계 캘리브레이션은 3축 모두 회전을 커버해야 함 |

---

## FAQ

**Q: 캘리브레이션 후에도 자세가 드리프트합니다?**

**A:** 전체 캘리브레이션(`imu`)이 실행되었는지 확인하고, IMU가 단단히 장착되었는지 확인합니다(진동은 노이즈를 추가합니다). 큰 온도 변화에는 온도 캘리브레이션을 추가하세요.

**Q: 자력계 캘리브레이션이 실패합니다?**

**A:** 환경에 강한 자기 간섭이 있는 경우입니다. `--calibrate mag` 플래그를 확인하고, 캘리브레이션 중 전 방향 회전을 보장하세요.

**Q: I2C 모드에서 `--port` 값은 무엇인가요?**

**A:** 호스트의 I2C 버스 번호입니다. Raspberry Pi 기본값은 1. STM32의 하드웨어 I2C 매핑을 확인하고, `i2cdetect -l`로 검증하세요.

---

## 관련

- [IMU 모듈 소개](/ko/products/imu-module)
- [IMU 모듈 개요(제품 정보)](/ko/tutorials/sensors/imu/product-info)
- [IMU ROS1](/ko/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/ko/tutorials/sensors/imu/ros-examples/ros2)
- [공식 저장소](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 웹사이트: [www.juxitech.com](https://www.juxitech.com)
