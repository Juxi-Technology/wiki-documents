---
title: "ステップ8:デプロイコマンドラインの説明"
description: "訓練済みモデルのデプロイに使うコマンドの各パラメータと、評価と録画の2つのモードの使い方をまとめて説明します。"
---

# ステップ8:デプロイコマンドラインの説明

## バージョンの説明（重要、まずお読みください）

LeRobot **0.6.0** 以降、訓練済みモデルのデプロイには `lerobot-rollout` を使用します。従来の `lerobot-record --policy.path=...` という記法は、**0.5.2** バージョンですでに削除されています。

本チュートリアルの第一步では `git clone` で LeRobot をインストールしており、入手できるのは現在の最新バージョンです。そのため、以下の `lerobot-rollout` のコマンドラインを使用してください。`lerobot-record` を使い続けると、プログラムはそのままエラーを報告し、`lerobot-rollout` に切り替えるよう促します。

2つのコマンドの役割分担は次のとおりです：

- `lerobot-record`：**示教データの収集**のみを担当します（第六步で使用しているのはこれです）。現在は `eval_` で始まるデータセット名を拒否します
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

## カメラパラメータは収集時と一致させる必要があります

以下のすべてのコマンドで `--robot.cameras` は `1280×720@30` を使用しており、これは[示教データセットの収集](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)と統一した値です。デプロイ時は収集時の解像度、fps、アスペクト比をそのまま使用する必要があります：解像度はデータセットのメタデータに書き込まれ検証にも関与するため、一致しないとそのままエラーが報告されます；たとえ運よく通っても、視野が異なるとモデルが「見る世界」があなたの示教時と変わり、効果が明らかに悪くなります。

## 可視化について

`--display_data=true` は rerun.io の可視化インターフェースを起動し、同時に `/Users/<你的用户名>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` ディレクトリ以下に毎フレームの画像を保存します。比較的容量を占有するため、本番使用時は `--display_data=false` に設定できます。

## みかん掴みタスクを例にする

- 現場評価（リアルタイム可視化あり）

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

- 現場評価（リアルタイム可視化なし）

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

- HuggingFace モデル Repo 上のモデルを推論する

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<用户名>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

実行後にモデルがダウンロードされます

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- 評価してデータを録画する（`--strategy.type=episodic`）

実行しながらその過程をデータセットとして録画したい場合は、`base` を `episodic` に変更します。このモードでは `--task` を書かず、代わりに `--dataset.single_task` を使用し、さらに `--dataset.repo_id` を必ず指定する必要があります：

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<用户名>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
