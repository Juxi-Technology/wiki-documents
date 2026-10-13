---
title: "第六步:采集数据集(真机)——回看与回放"
description: "回看与回放数据集:用 LeRobot Dataset Visualizer 在线查看已采集的数据,用 lerobot-dataset-viz 可视化指定 episode,再用 lerobot-replay 在从臂上回放,验证采集质量。"
---

# 第六步:采集数据集(真机)——回看与回放

## 可视化整个数据集

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

输入`TommyZihao/lerobot_zihao_dataset_a`，或者其它数据集

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

观察：指令和状态是不一致的，指令由主动臂Leader提供，状态由从动臂Follower提供

## 可视化查看指定episode

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

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

其实到这里，已经能唬住很多外行了，不是吗

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
