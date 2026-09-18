---
title: "第八步:模型推理——命令行说明"
description: "模型推理命令行说明:介绍新版部署工具的参数与两种策略类型,以抓橘子任务为例演示现场评估与录制数据的用法。"
---

# 第八步:模型推理——命令行说明

## 版本说明（重要，请先读）

从 LeRobot **0.6.0** 开始，训练好的模型要用 `lerobot-rollout` 来部署。原来的 `lerobot-record --policy.path=...` 写法，在 **0.5.2** 版本就已经被移除了。

本教程第一步是用 `git clone` 安装 LeRobot 的，拿到的是当前最新版本，所以请使用下面 `lerobot-rollout` 的命令行。如果坚持用 `lerobot-record`，程序会直接报错，并提示你改用 `lerobot-rollout`。

两个命令的分工是这样的：

- `lerobot-record`：只负责**采集示教数据**（第六步用的就是它），它现在会拒绝 `eval_` 开头的数据集名
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

## 相机参数必须和采集时一致

下面所有命令里的 `--robot.cameras` 用的都是 `1280×720@30`，这是和[示教采集数据集](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)统一过的值。部署时必须沿用采集时的分辨率、fps 和宽高比：分辨率会写进数据集元数据并参与校验，不一致会直接报错；即便侥幸通过，视野不同也会让模型"看到的世界"和你示教时不一样，效果会明显变差。

## 关于可视化

`--display_data=true` 会启动 rerun.io 的可视化界面，同时在 `/Users/<你的用户名>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` 目录下保存每一帧的图片，比较占空间，正式使用时可以设成 `--display_data=false`。

## 以抓橘子任务为例

- 现场评估（带实时可视化）

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

- 现场评估（不带实时可视化）

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=false
```

- 推理 HuggingFace 模型 Repo 上的模型

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<你的用户名>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

运行后会下载模型

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- 评估并录制数据（`--strategy.type=episodic`）

想边跑边把过程录成数据集，就把 `base` 换成 `episodic`。这个模式下不写 `--task`，改用 `--dataset.single_task`，并且必须给出 `--dataset.repo_id`：

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<你的用户名>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
