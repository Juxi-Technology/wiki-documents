---
title: ROS2 응용
description: "Ubuntu 22.04의 ROS2 humble 환경에서 IMU 자세 센서 사용 — 패키지 빌드와 노드 실행, RViz2 시각화 방법."
---

# ROS2 응용

> **[스토어에서 구매](https://www.juxitech.com/ko/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**시스템 구성: ubuntu22.04**

**ROS2 버전: humble**

### ROS2 환경 설정

1. **다운로드 소스 업데이트**

```PowerShell
sudo apt update
```

2. **ros2 다운로드 명령 입력**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
```

### 가상 머신에 디바이스 연결

1. **디바이스 확인**

```PowerShell
ll /dev/ttyUSB*
```

2. **포트 매핑 생성**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **매핑 파일 내용 작성**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **저장 후 종료, 명령 실행으로 규칙 적용**

```PowerShell
sudo udevadm trigger
```

```PowerShell
sudo service udev reload
```

```PowerShell
sudo service udev restart
```

5. **검증**

```PowerShell
ll /dev/imu-serial
```

### 준비된 압축 패키지 가져오기

1. **飞书 같은 레벨 디렉터리에 있음**[IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **파일 전송 소프트웨어로 가상 머신에 전송**

3. **IMU_Library 라이브러리 설치**

```PowerShell
# IMU_ROS2 압축 파일을 내려받아 압축 해제한 후, IMU_Library 디렉터리로 이동하여 setup.py 실행
cd IMU_ROS2/IMU_Library
# 라이브러리 및 의존성 설치
pip install -e .
# 또는 setup.py로 설치
python setup.py install
```

### python 관련 라이브러리 설치

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

### ROS2 프로젝트 빌드

1. **~/IMU_ROS2 디렉터리로 복귀**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **작업 디렉터리 ~/IMU_ROS2을 환경 변수에 추가**

```PowerShell
# ~/.bashrc 편집
sudo gedit ~/.bashrc
# 아래 명령을 파일 끝에 작성
source ~/IMU_ROS2/install/setup.bash
```

컴파일 성공 후 다음 명령으로 imu_ros2 기능 패키지에 실행 파일이 있는지 확인합니다
`ros2 pkg executables imu_ros2`

### ROS2 노드 시작

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### IMU 데이터 출력

1. **새 터미널을 열고 imu 토픽 확인**

```PowerShell
ros2 topic list
```

2. **/imu/data 토픽 데이터 출력**

```PowerShell
ros2 topic echo /imu/data
```

3. **새 터미널을 열고 msg 토픽 확인**

```PowerShell
ros2 topic echo /imu/mag
```

### RViz2 시각화

1. **명령 실행으로 rviz 시각화 인터페이스 열기**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### 자주 묻는 질문

1. 노드 시작 시 실패하면 다음 명령을 시도하세요

```PowerShell
# ~/IMU_ROS2 디렉터리에서 실행
source install/setup.bash
# 포트 번호 문제
sudo chmod 666 /dev/imu-serial
```
