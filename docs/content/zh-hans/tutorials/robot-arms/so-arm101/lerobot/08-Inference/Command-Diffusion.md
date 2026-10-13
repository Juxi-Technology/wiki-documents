---
title: "第八步:模型推理——Diffusion 推理命令"
description: "Diffusion 推理命令:用 lerobot-rollout 在 SO-ARM101 上运行训练好的 Diffusion 策略,并附真机演示视频。"
---

# 第八步:模型推理——Diffusion 推理命令

## Ubuntu

- 删除原有的eval开头的数据集（如有）

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- 推理命令行

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

- 删除原有的eval开头的数据集（如有）

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- 推理命令行

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

## 效果：卡顿较大

[ea9ffc82e6501aa1c3af9d74dc551650.mp4](/downloads/ea9ffc82e6501aa1c3af9d74dc551650.mp4)

[02cfb7022f0828428e6fb10d62dc0e77.mp4](/downloads/02cfb7022f0828428e6fb10d62dc0e77.mp4)

<RelatedProducts slugs="so-arm101" />
