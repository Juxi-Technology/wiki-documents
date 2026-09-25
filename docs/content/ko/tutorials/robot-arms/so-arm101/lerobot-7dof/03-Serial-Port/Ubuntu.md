---
title: "Ubuntu"
description: "Ubuntu에서 시리얼 장치 포트를 직접 확인하거나 Lerobot 공식 도구로 찾아 두 로봇 암의 포트 번호를 기록하고 사용 권한을 부여합니다."
---

# Ubuntu

# 방법 1: Linux 커맨드라인에서 직접 확인

## 시리얼 장치 포트 확인

```Shell
ls /dev/ttyACM*
```

## 컴퓨터와 로봇 암의 USB 포트 연결

먼저 Follower 팔로워 암을 연결하고, 이어서 Leader 리더 암을 연결합니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

# 방법 2: Lerobot 공식 도구

```Shell
lerobot-find-port
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

# 내 포트 기록

`/dev/ttyACM0`은 Follower 팔로워 암의 시리얼 장치 포트 번호입니다

`/dev/ttyACM1`은 Leader 리더 암의 시리얼 장치 포트 번호입니다

# 포트에 권한 부여

모든 사용자가 이 시리얼 포트 장치를 읽고 쓸 수 있는 권한을 갖도록 합니다

```Shell
sudo chmod 666 /dev/ttyACM*
```











































