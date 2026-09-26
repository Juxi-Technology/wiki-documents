---
title: "推理命令行-ACT"
description: "ACT 模型推理命令:在 Ubuntu 与 Mac 上分别给出用 ACT 模型推理握手任务的完整部署命令,含串口权限与模型路径。"
---

# 推理命令行\-ACT

> 部署统一使用 `lerobot-rollout`，用法和参数见[命令行说明](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)。

## Ubuntu

- 删除原有的rollout开头的数据集（如有）

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- 推理命令行

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/ACT/5K/pretrained_model
```

## Mac

- 删除原有的rollout开头的数据集（如有）

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- 推理命令行

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/ACT/5K/pretrained_model
```



