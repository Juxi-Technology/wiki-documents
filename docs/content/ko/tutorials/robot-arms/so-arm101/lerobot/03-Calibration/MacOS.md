---
title: "3단계: 로봇 암 캘리브레이션 (macOS)"
description: "macOS에서 포트 번호를 확인한 뒤 두 로봇 암을 캘리브레이션하고, 설정 파일 확인과 자주 발생하는 Bug 대처법을 함께 다룹니다."
---

# 3단계: 로봇 암 캘리브레이션 (macOS)

## 포트 번호 복습

팔로워 암:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

리더 암:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 팔로워(Follower) 암 캘리브레이션

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## 리더(Leader) 암 캘리브레이션

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## 캘리브레이션 설정 파일 확인

```Shell
sudo nano /Users/<你的用户名>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
```

## 자주 발생하는 Bug

- 서보모터 하나 또는 몇 개를 찾지 못함

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)

## 주의 사항

### ① 한쪽 암이 리밋에 도달한 후 움직이지 않음

재캘리브레이션이 필요합니다

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② 서보모터를 찾을 수 없음

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

서보모터 전원이 연결되지 않음

<RelatedProducts slugs="so-arm101" />
