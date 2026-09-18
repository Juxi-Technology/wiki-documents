---
title: "4단계: 원격조작 (macOS)"
description: "macOS에서 포트 권한 부여 후 원격조작을 실행하고, 두 시리얼 포트 중 어느 것을 사용해도 되는지까지 함께 설명합니다."
---

# 4단계: 원격조작 (macOS)

## 포트에 권한 부여

모든 사용자가 이 시리얼 포트 장치를 읽고 쓸 수 있는 권한을 갖도록 합니다

```Shell
chmod 666 /dev/tty.*
```

## 포트 번호 복습

팔로워 암:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

리더 암:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 원격조작

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## 다른 포트를 사용해도 됩니다

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.wchusbserial5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.wchusbserial5AAF2194741 \
    --teleop.id=my_leader_arm
```

<RelatedProducts slugs="so-arm101" />
