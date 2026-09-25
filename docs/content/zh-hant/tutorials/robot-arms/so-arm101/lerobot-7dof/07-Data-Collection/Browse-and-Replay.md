---
title: "回看、回放數據集"
description: "在 LeRobot 的數據集可視化工具中查看攝像頭畫面與舵機狀態，並讓從動臂回放指定 episode，訓練前先確認動作是否正確。"
---

# 回看、回放數據集

## 可視化整個數據集

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

輸入`TommyZihao/lerobot_zihao_dataset_a`，或者其它數據集

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

觀察：指令和狀態是不一致的，指令由主動臂Leader提供，狀態由從動臂Follower提供

## 可視化查看指定episode

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

拖拽時間軸查看任意時刻的攝像頭畫面和舵機位置

## 回放指定episode從動臂動作

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

能聽到聲音`Replaying episode`，然後從動臂移動，回放復現指定episode的動作



