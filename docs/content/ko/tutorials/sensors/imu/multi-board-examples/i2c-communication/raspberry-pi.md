---
title: "라즈베리파이"
description: "본 튜토리얼은 라즈베리파이 5 마더보드의 , 공식 64비트 이미지 이미지를 예로 듭니다."
---

# 라즈베리파이

## 1. 장치 연결

본 튜토리얼은 라즈베리파이 5 마더보드의 , 공식 64비트 이미지 이미지를 예로 듭니다.

IMU 자세 센서를 아래 그림처럼 라즈베리파이 5의 I2C 인터페이스에 연결합니다.

![1. 장치 연결 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/1.jpg)

![1. 장치 연결 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/2.png)

## 2. 장치 상태 확인

먼저 I2Ctool을 설치합니다. 터미널에 입력:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2C 장치 확인

\`\`\`PowerShell
sudo i2cdetect -y -r -a 1
\`\`\`

![2. 장치 상태 확인 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/3.png)

## 3. 드라이버 라이브러리 설치

3.1 **코드에 필요한 python 라이브러리 설치**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 파일 전송

IMU_ROS2.zip

MobaXterm을 사용한 파일 전송이 아직 익숙하지 않은 분은 아래 페이지에서 MobaXterm의 자세한 설치 및 사용 방법을 확인하세요: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

MobaXterm 소프트웨어로 압축 해제한 파일을 라즈베리파이 5에 드래그합니다.

![3. 드라이버 라이브러리 설치 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/4.png)

## 4. imu 데이터 확인

**~/IMU_Library 디렉터리로 이동하여 IMU_Serial_Library.py 파일 실행**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# IMU 데이터 출력 파일 실행
python3 -m IMU_Library.IMU_I2C_Library
```

![4. imu 데이터 확인 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/5.png)

주의: 위는 10축 IMU 데이터 읽기입니다. 6축은 자기력계(Magnetometer)와 기압계(Barometer) 데이터가 없고, 9축은 기압계(Barometer) 데이터가 없습니다.

## **5. IMU 캘리브레이션**

**~/IMU_Library 디렉터리로 이동하여 imu_calibration_tool.py 파일 실행**

```PowerShell
cd ~/IMU_Library

# IMU 보정 코드 파일 실행 --I2C 통신 보정
# 모든 보정 실행(전체, 자력계, 온도)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 전체 보정만
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 자력계 보정만
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 온도 보정만
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. IMU 캘리브레이션 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/6.png)

## 6. 주의사항

라즈베리파이 5는 미리 I2C 핀을 활성화해야 합니다.<br>활성화 방법은 다음과 같습니다:<br>터미널에서 명령 실행

```PowerShell
sudo raspi-config
```

키보드 방향키로 선택 후 Enter 키로 진입<br>I2C 선택 후 Enter 키로 진입<br>I2C 선택 후 Enter 키를 누르고, 방향키로 Yes 선택, Enter 키로 확인.<br>Enter 키로 확인<br>방향키로 Finish 선택 후 Enter 키로 종료.

![6. 주의사항 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/7.png)

![6. 주의사항 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/8.png)

![6. 주의사항 – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/9.png)

![6. 주의사항 – 4](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/10.png)

![6. 주의사항 – 5](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/11.png)
