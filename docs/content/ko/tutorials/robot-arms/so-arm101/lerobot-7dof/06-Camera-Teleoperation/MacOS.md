---
title: "Mac 컴퓨터"
description: "macOS에서 카메라 번호를 확인해 원격조작과 화면 표시를 실행하고, 데이터 수집과 배포 때 설정을 똑같이 맞춰야 하는 이유를 설명합니다."
---

# Mac 컴퓨터

## 카메라와 컴퓨터 연결

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## 카메라 1대, 원격조작 및 카메라 화면 표시

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

실행하면 원격조작이 시작됩니다

rerun\.io 화면이 열려 각 서보 관절의 궤적과 카메라 실시간 화면을 실시간으로 표시합니다

또한 이미지를 `~/사용자명/outputs/captured_images` 디렉터리에 저장합니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## 카메라 여러 대, 원격조작 및 카메라 화면 표시

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1920, height: 1080, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```



