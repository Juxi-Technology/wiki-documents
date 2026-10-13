---
title: "Step 8: Inference — WALL-OSS Command"
description: "Run the WALL-OSS (wall_x) policy with lerobot-rollout on the SO-ARM101, with demo videos of the deployed model."
---

# Step 8: Inference — WALL-OSS Command

## Ubuntu

- Delete the existing eval-prefixed dataset (if any)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Inference command line

```Shell
lerobot-record  \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/wallx/30K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=1000
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-Wall-OSS/d63-01.png)

[c7b8a795e52ca10689d296d212dc8e53.mp4](/downloads/c7b8a795e52ca10689d296d212dc8e53.mp4)

## Inference Command Line - Mac

- Delete the existing eval-prefixed dataset (if any)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Inference command line

```Shell
lerobot-record  \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/wallx/30K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=1000
```

[9f4567abdcce7f983415aef8f42877d0.mp4](/downloads/9f4567abdcce7f983415aef8f42877d0.mp4)

<RelatedProducts slugs="so-arm101" />
