---
title: "3단계: 로봇 암 캘리브레이션 (Ubuntu)"
description: "Ubuntu에서 포트 권한을 부여한 뒤 팔로워와 리더 암을 캘리브레이션하고, 설정 파일 확인과 주의 사항까지 함께 다룹니다."
---

# 3단계: 로봇 암 캘리브레이션 (Ubuntu)

## 포트에 권한 부여

모든 사용자가 이 시리얼 포트 장치를 읽고 쓸 수 있는 권한을 갖도록 합니다

```Shell
sudo chmod 666 /dev/ttyACM*
```

## 팔로워(Follower) 암 캘리브레이션

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## Leader 리더 암 캘리브레이션

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## 캘리브레이션 설정 파일 확인

```Shell
sudo nano /home/<사용자명>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## 주의 사항

### ① 한쪽 암이 리밋에 도달한 후 움직이지 않음

재캘리브레이션이 필요합니다

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② 서보모터를 찾을 수 없음

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

서보모터 전원이 연결되지 않음

<RelatedProducts slugs="so-arm101" />
