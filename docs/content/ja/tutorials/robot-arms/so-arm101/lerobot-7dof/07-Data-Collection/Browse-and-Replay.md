---
title: "データセットの確認・リプレイ"
description: "LeRobotのデータセット可視化ツールで録画済みデータセットを確認し、アームでリプレイして訓練前にエピソードを検証する方法を説明します。"
---

# データセットの確認・リプレイ

## データセット全体を可視化する

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

`TommyZihao/lerobot_zihao_dataset_a`、または他のデータセットを入力します

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

観察：指令と状態は一致しません。指令はリーダーアーム（Leader）が提供し、状態はフォロワーアーム（Follower）が提供します

## 指定したepisodeを可視化して確認する

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

タイムラインをドラッグして、任意の時点のカメラ映像とサーボ位置を確認します

## 指定したepisodeのフォロワーアーム動作をリプレイする

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

`Replaying episode`という音声が聞こえ、その後フォロワーアームが動いて、指定したepisodeの動作をリプレイで再現します



