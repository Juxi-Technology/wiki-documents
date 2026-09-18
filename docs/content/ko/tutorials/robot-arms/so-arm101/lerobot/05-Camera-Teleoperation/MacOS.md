---
title: "5단계: 카메라 연결 원격조작 (macOS)"
description: "macOS에서 카메라 번호를 확인해 원격조작과 화면 표시를 실행하고, 데이터 수집과 배포 때 설정을 똑같이 맞춰야 하는 이유를 설명합니다."
---

# 5단계: 카메라 연결 원격조작 (macOS)

## 카메라와 컴퓨터 연결

```Shell
lerobot-find-cameras opencv
```

실행하면 각 카메라의 번호가 나열되며, 이를 기록해 아래 명령의 `index_or_path`에 입력합니다.

> 카메라 파라미터(해상도, fps, 화면 비율)는 데이터셋 수집과 모델 배포 시 반드시 일치해야 하며, 그 이유는 [시연 데이터셋 수집](/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)의 설명을 참고하세요. 본 튜토리얼은 통일하여 `1280×720@30`을 사용합니다.

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## 카메라 1대, 원격조작 및 카메라 화면 표시

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

실행하면 원격조작이 시작됩니다

rerun.io 화면이 열려 각 서보모터 관절의 궤적과 카메라 실시간 화면을 실시간으로 표시합니다

또한 이미지를 `~/<사용자명>/outputs/captured_images` 디렉터리에 저장합니다

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## 카메라 여러 대, 원격조작 및 카메라 화면 표시

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/3.jpg)

<RelatedProducts slugs="so-arm101" />
