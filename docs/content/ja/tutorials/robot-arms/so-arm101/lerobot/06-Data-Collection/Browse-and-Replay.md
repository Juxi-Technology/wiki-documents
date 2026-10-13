---
title: "ステップ6:データセットの表示と再生"
description: "収録済みデータセットを LeRobot Dataset Visualizer で確認し、lerobot-dataset-viz で特定エピソードを可視化、lerobot-replay でフォロワーアームの動作を再生して収集品質を検証します。"
---

# ステップ6:データセットの表示と再生

## データセット全体の可視化

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

`TommyZihao/lerobot_zihao_dataset_a`、または別のデータセットを入力します

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

注意：command と state は同じではありません。command は Leader アームによって提供され、state は Follower アームによって提供されます

## 特定のエピソードの可視化

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

タイムラインをドラッグして、任意の時点のカメラ映像とサーボ位置を表示します

## 特定のエピソードで Follower アームの動作を再生する

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

`Replaying episode` と表示された後、Follower アームが動き、指定したエピソードの動作を再生・再現します

実際、この時点で多くの素人を驚かせることができるのではないでしょうか

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
