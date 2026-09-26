---
title: "Command Line Reference"
description: "Reference for the LeRobot rollout deployment command, covering working modes, key parameters, camera matching and episode recording."
---

# Command Line Reference

> **Note:** Newer LeRobot versions moved policy inference to the dedicated `lerobot-rollout` command; `lerobot-record` is now for data collection only. The `lerobot-record --policy.path` command below applies to earlier versions.

## Command Line Reference

With real-time visualization: \-\-display\_data=true

Without real-time visualization: \-\-display\_data=false

When `--display_data=true`, the cool rerun\.io visualization interface starts, but every frame is saved as an image under the `/Users/tommy/.cache/huggingface/lerobot/eval_lerobot_my_dataset_a/images/observation.images.front/episode-000000` directory, which takes up a lot of space. Later you can set it to `--display_data=false`



Inference with a model on a HuggingFace model Repo: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Taking the grab-oranges task as an example

- Inference with a local model (with real-time visualization)

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

- Inference with a local model (without real-time visualization)

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

- Inference with a model on a HuggingFace model Repo

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

The model will be downloaded after running

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









