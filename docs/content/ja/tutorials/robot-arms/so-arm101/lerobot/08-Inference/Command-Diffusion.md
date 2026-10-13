---
title: "ステップ8:デプロイコマンドライン-Diffusion"
description: "lerobot-rollout で SO-ARM101 上で訓練済み Diffusion ポリシーを実行する推論コマンドと、実機デモ動画。"
---

# ステップ8:デプロイコマンドライン-Diffusion

## Ubuntu

- 既存の eval という接頭辞のデータセットがあれば削除する

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- 推論コマンドライン

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/Diffusion/15K/pretrained_model
```

## Mac

- 既存の eval という接頭辞のデータセットがあれば削除する

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- 推論コマンドライン

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands

lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/Diffusion/5K/pretrained_model
```

## 結果：目立つカクつき

[ea9ffc82e6501aa1c3af9d74dc551650.mp4](/downloads/ea9ffc82e6501aa1c3af9d74dc551650.mp4)

[02cfb7022f0828428e6fb10d62dc0e77.mp4](/downloads/02cfb7022f0828428e6fb10d62dc0e77.mp4)

<RelatedProducts slugs="so-arm101" />
