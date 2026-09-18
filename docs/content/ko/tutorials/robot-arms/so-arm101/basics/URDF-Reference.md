---
title: "URDF 파일 및 자료 참고"
description: "SO-ARM 101의 공식 URDF 파일과 URDF Studio, ROS2 시뮬레이션, LeRobot 공식 그래픽 인터페이스 등 참고 자료를 모아 소개합니다."
---

# URDF 파일 및 자료 참고

## Lerbot 공식 [URDF 파일](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf)

### URDF Studio

https://urdf.d-robotics.cc/

### ROS2 시뮬레이션 제어(직접 구현 가능)

https://github.com/holmsslk/so-arm-moveit-hardware

### LeRobot 공식 그래픽 인터페이스

https://github.com/huggingface/leLab

LeLab은 웹 애플리케이션으로, LeRobot의 전체 워크플로——캘리브레이션, 원격조작, 기록, 학습, 재생——를 하나의 브라우저 인터페이스에 통합합니다. 로봇 암을 연결하고 앱을 열면 바로 조작을 시작할 수 있습니다. 번거로운 명령줄 조작도, 키보드 입력도 필요 없습니다.

🤗 LeRobot의 네이티브 웹 진입점으로, 신규 사용자가 몇 분 안에 “개봉”부터 “첫 번째 정책 학습”까지의 전체 과정을 완료할 수 있도록 하는 것을 목표로 합니다.

🤗 단 한 개의 명령으로 모든 프로그램을 설치하고 실행할 수 있습니다.

## 휴대폰으로 팔로워 암 제어

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### 클라우드 로봇 개발: AWS 기반으로 ROS 2 장치와 Isaac Sim의 Lerobot 시뮬레이션 및 데이터 흐름 구현

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### 웹에서 서보모터 ID 설정 및 중립 위치 캘리브레이션

https://bambot.org/feetech.js?lang=zh

1、서보모터 모델에 따라 0 또는 1을 입력하고, “연결”을 클릭합니다

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、ID 1~6의 서보모터를 스캔하면, 스캔 결과의 FOUND를 보고 해당 ID의 서보모터를 확인할 수 있습니다. 예를 들어 그림에서 서보모터 ID 1이 스캔되었습니다

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、ID 설정 및 중립 위치 캘리브레이션

① 현재 서보모터 ID에 스캔된 서보모터 ID를 입력합니다

② “ID 관리”에 숫자를 입력하고, “ID 변경”을 클릭하면 ID를 설정할 수 있습니다

③ 중립 위치 캘리브레이션(STS3215 서보모터의 중립은 2047, SCS0009 서보모터의 중립은 511)

STS 서보모터: “위치 제어”에 2047을 입력하고, “Set”을 클릭합니다

SCS 서보모터: “위치 제어”에 511을 입력하고, “Set”을 클릭합니다

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
