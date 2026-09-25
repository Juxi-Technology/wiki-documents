---
title: "데이터셋 다시 보기, 재생"
description: "녹화한 데이터셋을 LeRobot 데이터셋 시각화 도구에서 확인하고, 팔로워 암에서 episode를 재생해 훈련 전에 검증하는 방법을 안내합니다."
---

# 데이터셋 다시 보기, 재생

## 전체 데이터셋 시각화

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

`TommyZihao/lerobot_zihao_dataset_a`를 입력하거나, 다른 데이터셋을 입력합니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

관찰: 명령과 상태는 일치하지 않습니다. 명령은 리더 암(Leader)이 제공하고, 상태는 팔로워 암(Follower)이 제공합니다

## 특정 episode 시각화 확인

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

타임라인을 드래그하여 임의 시점의 카메라 화면과 서보 위치를 확인할 수 있습니다

## 특정 episode의 팔로워 암 동작 재생

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

`Replaying episode`라는 소리가 들리면 팔로워 암이 움직이며, 지정한 episode의 동작을 재생하여 재현합니다



