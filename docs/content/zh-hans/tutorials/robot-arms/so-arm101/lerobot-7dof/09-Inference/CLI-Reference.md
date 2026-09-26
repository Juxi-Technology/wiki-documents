---
title: "命令行说明"
description: "模型推理命令行说明:介绍新版部署工具的参数与两种策略类型,以抓橘子任务为例演示现场评估与录制数据的用法。"
---

# 命令行说明

> **提示:** 较新的 LeRobot 版本已将策略推理移至专用的 `lerobot-rollout` 命令;`lerobot-record` 现仅用于数据采集。下方的 `lerobot-record --policy.path` 命令适用于较早版本。

## 命令行说明

带实时可视化：\-\-display\_data=true

不带实时可视化：\-\-display\_data=false

`--display_data=true`时，会启动rerun\.io酷炫的可视化界面，但在`/Users/tommy/.cache/huggingface/lerobot/eval_lerobot_my_dataset_a/images/observation.images.front/episode-000000`目录下，会保存每一帧的图片，但很占空间。后续可以设置成`--display_data=false`



推理HuggingFace模型Repo的模型：\-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## 以抓橘子任务为例

- 推理本地模型（带实时可视化）

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

- 推理本地模型（不带实时可视化）

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

- 推理HuggingFace模型Repo的模型

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

运行后会下载模型

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









