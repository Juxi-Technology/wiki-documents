---
title: "ROS: 사전 준비"
description: "(1) 워크스페이스를 구축한 후, gpssrc 폴더 안의 내용을 워크스페이스의 src 안에 복사하고, 그런 다음 colcon build로 컴파일합니다. 오류가 나타나지 않으면 컴파일이 통과된 것입…"
---

# ROS: 사전 준비

#### 1、GPS 모듈 컴파일 설명

(1) 워크스페이스를 구축한 후, gps_src 폴더 안의 내용을 워크스페이스의 src 안에 복사하고, 그런 다음 colcon build로 컴파일합니다. 오류가 나타나지 않으면 컴파일이 통과된 것입니다.

~/gps_ros2 디렉터리에서 실행

```
colcon build
```

~/gps_ros2 디렉터리에서 실행 

```
source install/setup.bash
```

(2) 기능 패키지 내용 설명:

- nmea_navsat_driver: GPS 모듈 시작, GPS 모듈 데이터 읽기, GPS 데이터 그리기 등의 기능;
- nmea_msgs: 일부 GPS 메시지의 msg 파일을 저장
- imu_gps_localization: IMU와 GPS 데이터 융합 기능
- gps_goal: 위도 경도 데이터를 Nav2 목표 내비게이션 데이터로 변환

#### 2、GPS 포트 바인딩

GPS 모듈은 시리얼 포트를 통해 컴퓨터 또는 메인 컨트롤러와 연결되므로, 포트 번호 문제로 GPS 모듈이 컴퓨터나 메인 컨트롤러에서 인식되지 않는 것을 막기 위해 GPS의 포트를 바인딩해야 합니다.

(1) 연결된 USB 장치를 확인하고 GPS 모듈을 찾습니다. 터미널에 **lsusb**를 입력하여 GPS가 연결된 장치 ID 번호를 검색합니다. 아래 그림과 같이 이것이 GPS 모듈의 장치 식별 ID입니다.

![그림 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

(2) 장치 번호 ID를 알았으니, 다음으로 rules 파일을 작성하여 포트를 바인딩합니다. 터미널에 입력하고,

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

다음 내용을 안에 복사합니다.

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

저장 후 종료하고, 그런 다음 실행 권한을 부여합니다. 터미널에 입력하고,

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

(3) GPS 모듈을 다시 꽂았다 뽑고, 터미널에 ll /dev/myserial을 입력하여 바인딩이 성공했는지 확인합니다. 아래 화면이 나타나면 바인딩 성공입니다.

```
ll /dev/myserial
```

![그림 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
