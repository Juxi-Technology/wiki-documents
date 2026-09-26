---
title: "命令行说明"
description: "模型推理命令行说明:介绍新版部署工具的参数与两种策略类型,以抓橘子任务为例演示现场评估与录制数据的用法。"
---

# 命令行说明

## 版本说明（重要，请先读）

从 LeRobot **0.6.0** 开始，训练好的模型要用 `lerobot-rollout` 来部署。原来的 `lerobot-record --policy.path=...` 写法，在 **0.5.2** 版本就已经被移除了。

本教程第一步是用 `git clone` 安装 LeRobot 的，拿到的是当前最新版本，所以请使用下面 `lerobot-rollout` 的命令行。如果坚持用 `lerobot-record`，程序会直接报错，并提示你改用 `lerobot-rollout`。

两个命令的分工是这样的：

- `lerobot-record`：只负责**采集示教数据**（第七步用的就是它），它现在会拒绝 `eval_` 开头的数据集名
- `lerobot-rollout`：负责**部署训练好的模型**，用 `--strategy.type` 选择工作方式

## rollout 命令行参数

| 参数 | 说明 |
|---|---|
| `--strategy.type` | 工作方式。`base` 只跑模型、不录数据，用于现场看效果；`episodic` 按 episode 录制并带 reset 阶段，行为接近旧版的 `lerobot-record` |
| `--policy.path` | 模型路径，指向训练输出里的 `checkpoints/last/pretrained_model` |
| `--task` | 任务描述，配合 `--strategy.type=base` 使用 |
| `--duration` | 运行秒数，`0` 表示不限时 |
| `--interactive` | 需要中途接管时加上它，可在终端用 `/stop`、`/reset` 等命令控制 |
| `--display_data` | 是否启动 rerun.io 可视化界面 |
| `--policy.device` | 计算设备，比如 `cuda`、`cpu` |

## 命令行说明

带实时可视化：\-\-display\_data=true

不带实时可视化：\-\-display\_data=false

`--display_data=true`时，会启动rerun\.io酷炫的可视化界面，但在`/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`目录下，会保存每一帧的图片，但很占空间。后续可以设置成`--display_data=false`



推理HuggingFace模型Repo的模型：\-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## 以抓橘子任务为例

- 推理本地模型（带实时可视化）

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- 推理本地模型（不带实时可视化）

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- 推理HuggingFace模型Repo的模型

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

运行后会下载模型

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









