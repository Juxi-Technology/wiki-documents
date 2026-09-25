---
title: "Windows 컴퓨터"
description: "Windows에서 COM 포트로 팔로워와 리더 암을 캘리브레이션하고, 파일 내보내기 위치와 자주 겪는 문제의 대처법을 설명합니다."
---

# Windows 컴퓨터

리더 암과 팔로워 암을 동시에 연결해야 합니다

## 팔로워(Follower) 암 캘리브레이션（“wrist\_yaw” 관절 추가）

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## 리더(Leader) 암 캘리브레이션（“wrist\_yaw” 관절 추가）

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## 파일 내보내기 위치

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## 다른 로봇 암으로 캘리브레이션

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## 주의 사항

### ① 한쪽 암이 리밋에 도달한 후 움직이지 않음

재캘리브레이션이 필요합니다

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② 서보모터를 찾을 수 없음

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

서보모터 전원이 연결되지 않았으니, 다시 꽂았다 뺐다 하며 커넥터를 돌려 보세요



