---
title: "Inference Command Line - Diffusion"
description: "Run a trained Diffusion policy on the 7-DOF arm: the eval dataset cleanup and the full lerobot-inference command line."
---

# Inference Command Line \- Diffusion

> **Note:** Newer LeRobot versions moved policy inference to the dedicated `lerobot-rollout` command; `lerobot-record` is now for data collection only. The `lerobot-record --policy.path` command below applies to earlier versions.

## Ubuntu

- Delete the existing dataset starting with eval (if any)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Inference command line

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

- Delete the existing dataset starting with eval (if any)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Inference command line

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



