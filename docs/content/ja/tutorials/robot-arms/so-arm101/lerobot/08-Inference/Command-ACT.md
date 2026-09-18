---
title: "ステップ8:デプロイコマンドライン-ACT"
description: "ACTモデルを実機にデプロイし、UbuntuとMacそれぞれの環境で握手タスクを実行するためのコマンドを掲載しています。"
---

# ステップ8:デプロイコマンドライン-ACT

> デプロイは統一して `lerobot-rollout` を使用します。使い方とパラメータは[コマンドラインの説明](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)を参照してください。

## Ubuntu

- 既存のデータセットを削除する（ある場合）

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<ユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/rollout_lerobot_my_dataset_shake_hands
```

- デプロイコマンドライン

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<ユーザー名>/Downloads/lerobot_output/shake/ACT/5K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- 既存のデータセットを削除する（ある場合）

```Shell
sudo rm -rf /Users/<ユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/rollout_lerobot_my_dataset_shake_hands
```

- デプロイコマンドライン

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<ユーザー名>/Downloads/7-lerobot/shake/ACT/5K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
