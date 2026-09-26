---
title: "コマンドラインの説明"
description: "訓練済みモデルのデプロイに使うコマンドの各パラメータと、評価と録画の2つのモードの使い方をまとめて説明します。"
---

# コマンドラインの説明

> **注意:** LeRobot の新しいバージョンでは、ポリシー推論は専用の `lerobot-rollout` コマンドに移行し、`lerobot-record` はデータ収集専用になりました。下記の `lerobot-record --policy.path` コマンドは以前のバージョン向けです。

## コマンドラインの説明

リアルタイム可視化あり：\-\-display\_data=true

リアルタイム可視化なし：\-\-display\_data=false

`--display_data=true`の場合、rerun\.io のクールな可視化インターフェースが起動しますが、`/Users/tommy/.cache/huggingface/lerobot/eval_lerobot_my_dataset_a/images/observation.images.front/episode-000000`ディレクトリ以下に毎フレームの画像が保存され、非常に容量を占有します。後で`--display_data=false`に設定できます



HuggingFace モデル Repo 上のモデルを推論する：\-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## みかん掴みタスクを例にする

- ローカルモデルを推論する（リアルタイム可視化あり）

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- ローカルモデルを推論する（リアルタイム可視化なし）

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- HuggingFace モデル Repo 上のモデルを推論する

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

実行後にモデルがダウンロードされます

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









