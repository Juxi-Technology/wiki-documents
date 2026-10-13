---
title: "第六步:回看、回放資料集"
description: "回看與回放資料集:用 LeRobot Dataset Visualizer 線上檢視已採集資料,用 lerobot-dataset-viz 視覺化指定 episode,再用 lerobot-replay 在從臂上回放,驗證採集品質。"
---

# 第六步:回看、回放資料集

## 視覺化整個資料集

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

輸入`TommyZihao/lerobot_zihao_dataset_a`，或者其他資料集

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

觀察：指令和狀態是不一致的，指令由主動臂Leader提供，狀態由從動臂Follower提供

## 視覺化檢視指定episode

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

拖曳時間軸檢視任意時刻的攝影機畫面和伺服馬達位置

## 回放指定episode從動臂動作

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

能聽到聲音`Replaying episode`，然後從動臂移動，回放重現指定episode的動作

其實到這裡，已經能唬住很多外行了，不是嗎

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
