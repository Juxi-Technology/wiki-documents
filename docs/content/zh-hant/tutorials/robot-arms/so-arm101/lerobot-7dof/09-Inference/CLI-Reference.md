---
title: "命令行說明"
description: "本頁說明模型推論的命令列用法與參數，包含攝像頭參數一致性與可視化設定的說明。"
---

# 命令行說明

## 版本說明（重要，請先讀）

從 LeRobot **0.6.0** 開始，訓練好的模型要用 `lerobot-rollout` 來部署。原來的 `lerobot-record --policy.path=...` 寫法，在 **0.5.2** 版本就已經被移除了。

本教程第一步是用 `git clone` 安裝 LeRobot 的，拿到的是當前最新版本，所以請使用下面 `lerobot-rollout` 的命令列。如果堅持用 `lerobot-record`，程式會直接報錯，並提示你改用 `lerobot-rollout`。

兩個命令的分工是這樣的：

- `lerobot-record`：只負責**採集示教數據**（第七步用的就是它），它現在會拒絕 `eval_` 開頭的數據集名
- `lerobot-rollout`：負責**部署訓練好的模型**，用 `--strategy.type` 選擇工作方式

## rollout 命令列參數

| 參數 | 說明 |
|---|---|
| `--strategy.type` | 工作方式。`base` 只跑模型、不錄數據，用於現場看效果；`episodic` 按 episode 錄製並帶 reset 階段，行為接近舊版的 `lerobot-record` |
| `--policy.path` | 模型路徑，指向訓練輸出裡的 `checkpoints/last/pretrained_model` |
| `--task` | 任務描述，配合 `--strategy.type=base` 使用 |
| `--duration` | 執行秒數，`0` 表示不限時 |
| `--interactive` | 需要中途接管時加上它，可在終端用 `/stop`、`/reset` 等命令控制 |
| `--display_data` | 是否啟動 rerun.io 可視化介面 |
| `--policy.device` | 計算裝置，比如 `cuda`、`cpu` |

## 命令行說明

帶實時可視化：\-\-display\_data=true

不帶實時可視化：\-\-display\_data=false

`--display_data=true`時，會啟動rerun\.io酷炫的可視化界面，但在`/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`目錄下，會保存每一幀的圖片，但很佔空間。後續可以設置成`--display_data=false`



推理HuggingFace模型Repo的模型：\-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## 以抓橘子任務為例

- 推理本地模型（帶實時可視化）

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

- 推理本地模型（不帶實時可視化）

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

運行後會下載模型

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









