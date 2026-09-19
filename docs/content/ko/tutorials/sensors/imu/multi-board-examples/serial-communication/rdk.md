---
title: "RDK"
description: "RDK X5에서 USB 시리얼 통신으로 IMU 자세 센서 사용 — 포트 매핑, 데이터 확인과 캘리브레이션 절차."
---

# RDK

## 1. 장치 연결

본 튜토리얼은 RDK X5 마더보드의  이미지를 예로 듭니다.

IMU 자세 센서를 Type-C 케이블로 호스트의 USB에 꽂습니다.

![1. 장치 연결 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/1.jpg)

## 2. 장치 상태 확인

장치 ID 확인

```PowerShell
lsusb
```

장치 번호 확인

```PowerShell
ls -l /dev/ttyU*
```

포트 매핑 설정

```Bash
# 플러그 탈착 후 포트 변경 방지를 위해 포트 매핑 설정
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
# gedit 명령이 없다는 내용이 나오면 먼저 설치
sudo apt install gedit
# 매핑 내용 기입
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
# 파라미터 설명
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
# 출력 예시
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

## 3. 드라이버 라이브러리 설치

3.1 **코드에 필요한 python 라이브러리 설치**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 **파일 전송**

IMU_ROS2.zip

MobaXterm을 사용한 파일 전송이 아직 익숙하지 않은 분은 아래 페이지에서 MobaXterm의 자세한 설치 및 사용 방법을 확인하세요: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

MobaXterm 소프트웨어로 압축 해제한 파일을 RDK X5에 드래그합니다.

![3. 드라이버 라이브러리 설치 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/2.png)

## 4. imu 데이터 확인

**~/IMU_Library 디렉터리로 이동하여 IMU_Serial_Library.py 파일 실행**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# IMU 데이터 출력 파일 실행
python3 -m IMU_Library.IMU_Serial_Library
```

![4. imu 데이터 확인 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/3.png)

주의: 위는 10축 IMU 데이터 읽기입니다. 6축은 자기력계(Magnetometer)와 기압계(Barometer) 데이터가 없고, 9축은 기압계(Barometer) 데이터가 없습니다.

## **5. IMU 캘리브레이션**

**~/IMU_Library 디렉터리로 이동하여 imu_calibration_tool.py 파일 실행**

```PowerShell
cd ~/IMU_Library
# IMU 보정 코드 파일 실행 --직렬 통신 보정
# 모든 보정 실행(전체, 자력계, 온도)
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial
# 전체 보정만
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu
# 자력계 보정만
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag
# 온도 보정만
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![5. IMU 캘리브레이션 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/4.png)

## 6. 주의사항

장치 ID는 확인할 수 있지만 장치 번호를 확인할 수 없는 경우, 아래 명령으로 ch34x 드라이버를 설치하세요

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```
