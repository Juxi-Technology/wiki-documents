---
title: "コマンドラインの説明"
description: "訓練済みモデルのデプロイに使うコマンドの各パラメータと、評価と録画の2つのモードの使い方をまとめて説明します。"
---

# コマンドラインの説明

## バージョンの説明（重要、まずお読みください）

LeRobot **0.6.0** 以降、訓練済みモデルのデプロイには `lerobot-rollout` を使用します。従来の `lerobot-record --policy.path=...` という記法は、**0.5.2** バージョンですでに削除されています。

本チュートリアルのステップ1では `git clone` で LeRobot をインストールしており、入手できるのは現在の最新バージョンです。そのため、以下の `lerobot-rollout` のコマンドラインを使用してください。`lerobot-record` を使い続けると、プログラムはそのままエラーを報告し、`lerobot-rollout` に切り替えるよう促します。

2つのコマンドの役割分担は次のとおりです：

- `lerobot-record`：**示教データの収集**のみを担当します（ステップ7で使用しているのはこれです）。現在は `eval_` で始まるデータセット名を拒否します
- `lerobot-rollout`：**訓練済みモデルのデプロイ**を担当し、`--strategy.type` で動作方式を選択します

## rollout のコマンドラインパラメータ

| パラメータ | 説明 |
|---|---|
| `--strategy.type` | 動作方式。`base` はモデルを実行するだけでデータを記録せず、現場で効果を確認するのに使います；`episodic` は episode ごとに記録し reset 段階を伴い、動作は旧版の `lerobot-record` に近いです |
| `--policy.path` | モデルのパス。訓練出力内の `checkpoints/last/pretrained_model` を指します |
| `--task` | タスクの説明。`--strategy.type=base` と組み合わせて使用します |
| `--duration` | 実行秒数。`0` は時間制限なしを意味します |
| `--interactive` | 途中で引き継ぎが必要な場合に追加します。ターミナルで `/stop`、`/reset` などのコマンドで制御できます |
| `--display_data` | rerun.io の可視化インターフェースを起動するかどうか |
| `--policy.device` | 計算デバイス。例えば `cuda`、`cpu` |

## コマンドラインの説明

リアルタイム可視化あり：\-\-display\_data=true

リアルタイム可視化なし：\-\-display\_data=false

`--display_data=true`の場合、rerun\.io のクールな可視化インターフェースが起動しますが、`/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`ディレクトリ以下に毎フレームの画像が保存され、非常に容量を占有します。後で`--display_data=false`に設定できます



HuggingFace モデル Repo 上のモデルを推論する：\-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## みかん掴みタスクを例にする

- ローカルモデルを推論する（リアルタイム可視化あり）

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

- ローカルモデルを推論する（リアルタイム可視化なし）

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

- HuggingFace モデル Repo 上のモデルを推論する

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

実行後にモデルがダウンロードされます

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









