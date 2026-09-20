---
title: 고정밀 IMU 자세 센서 사용 튜토리얼
description: "Juxi 고정밀 IMU 자세 센서 사용 튜토리얼 — 라이브러리 설치와 포트 설정 후 시리얼과 I2C 통신으로 자세 데이터를 확인하는 방법."
---

# 고정밀 IMU 자세 센서 사용 튜토리얼

### 압축 패키지 [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb) 또는 [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)를 다운로드하고 압축 해제 후 ~/IMU_Library로 이동하세요

1. **코드 실행에 필요한 python 라이브러리 설치**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **IMU_Library 라이브러리 설치**

```PowerShell
# 코드 실행에 필요한 python 라이브러리 설치
pip install -e .

# 라이브러리 및 의존성 설치
python setup.py install
```

3. **포트 매핑 설정**

```PowerShell
# 플러그 탈착 후 포트 변경 방지를 위해 포트 매핑 설정
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# gedit 명령이 없으면 먼저 설치
sudo apt install gedit

# 매핑 내용 기입
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# 파라미터 설명：
`--mode`: 통신 모드. `serial`(직렬) 또는 `i2c`
`--port`: 직렬 포트 이름(예: `/dev/ttyUSB0`) 또는 I2C 포트 번호(예: `7`)
`--rate`: 데이터 출력 주파수(Hz), 기본 10Hz
`--debug`: 디버그 모드 활성화, 상세 정보 표시

# 저장 후 종료하고 규칙을 활성화하는 명령 실행
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# 검증
ll /dev/imu-serial

# 출력 예시：
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### 시리얼 통신

1. **~/IMU_Library 디렉토리로 이동해 IMU_Serial_Library.py 파일 실행**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library
# IMU 직렬 데이터 출력 파일 실행
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library/IMU_Library

# 또는
python3 IMU_Serial_Library.py
```

### I2C 통신

1. **~/IMU_Library 디렉토리로 이동해 IMU_I2C_Library.py 파일 실행**

```PowerShell
cd ~/IMU_Library/IMU_Library

# IMU I2C 데이터 출력 파일 실행
python3 IMU_I2C_Library.py
```

### imu 보정

1. **~/IMU_Library 디렉토리로 이동해 imu_calibration_tool.py 파일 실행**

```PowerShell
cd ~/IMU_Library/IMU_Library

# IMU 보정 코드 파일 실행 --직렬 통신 보정
# 모든 보정 실행(전체, 자력계, 온도)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 전체 보정만
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 자력계 보정만
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 온도 보정만
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# I2C 통신 보정
# IMU 보정 코드 파일 실행 --I2C 통신 보정
python3 imu_calibration_tool.py --mode i2c --port 1

# 전체 보정만
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 자력계 보정만
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 온도 보정만
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```


---

## 공식 저장소 예제

Juxi Technology는 IMU 관성항법 모듈용 완전한 오픈소스 코드를 제공합니다：[GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### ROS1 / ROS2 예제

저장소는 ROS1과 ROS2를 기본 지원하며, 캘리브레이션 도구와 시각화 노드를 포함합니다:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Python 캘리브레이션 도구

```bash
# 6면 캘리브레이션을 실행하여 정확한 가속도계/자이로 영점 획득
python calibration/calibrate.py --port /dev/ttyUSB0
```

- **마지막 업데이트 (UTC)**
  - [IMU 캘리브레이션](./calibration.md)
  - [파일 원격 전송](./remote-file-transfer.md)
  - [SSH 파일 전송](./ssh-file-transfer.md)
- **IMU 관성 내비게이션**
  - [제품 정보](./product-info.md)
- **멀티 보드 예제**
  - [멀티 호스트 통신 케이스 개요](./multi-board-examples/overview.md)
  - [PC 통신](./multi-board-examples/pc-communication.md)
- **I2C 통신**
  - [Arduino](./multi-board-examples/i2c-communication/arduino.md)
  - [Jetson](./multi-board-examples/i2c-communication/jetson.md)
  - [라즈베리파이](./multi-board-examples/i2c-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/i2c-communication/rdk.md)
  - [STM32](./multi-board-examples/i2c-communication/stm32.md)
- **직렬 통신**
  - [Arduino](./multi-board-examples/serial-communication/arduino.md)
  - [Jetson](./multi-board-examples/serial-communication/jetson.md)
  - [라즈베리파이](./multi-board-examples/serial-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/serial-communication/rdk.md)
  - [STM32](./multi-board-examples/serial-communication/stm32.md)
- **ROS 예제**
  - [ROS1 응용](./ros-examples/ros1.md)
  - [ROS2 응용](./ros-examples/ros2.md)
