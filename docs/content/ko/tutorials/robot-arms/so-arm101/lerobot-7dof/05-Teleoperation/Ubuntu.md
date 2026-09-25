---
title: "Ubuntu 컴퓨터"
description: "Ubuntu에서 포트 권한을 부여한 뒤 리더 암으로 팔로워 암을 조작하는 원격조작을 실행하는 방법을 단계별로 안내합니다."
---

# Ubuntu 컴퓨터

## 포트에 권한 부여

모든 사용자가 이 시리얼 포트 장치를 읽고 쓸 수 있는 권한을 갖도록 합니다

```Shell
sudo chmod 666 /dev/ttyACM*
```

## 원격조작

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-04-Teleoperation-Ubuntu/1.png)



