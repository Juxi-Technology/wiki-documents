---
title: "回看、回放数据集"
description: "训练前先检查数据质量：在可视化工具里回看数据集，用 lerobot-dataset-viz 查看指定 episode，再用 lerobot-replay 让从动臂复现动作。"
---

# 回看、回放数据集

## 可视化整个数据集

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

输入`TommyZihao/lerobot_zihao_dataset_a`，或者其它数据集

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

观察：指令和状态是不一致的，指令由主动臂Leader提供，状态由从动臂Follower提供

## 可视化查看指定episode

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

拖拽时间轴查看任意时刻的摄像头画面和舵机位置

## 回放指定episode从动臂动作

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

能听到声音`Replaying episode`，然后从动臂移动，回放复现指定episode的动作



