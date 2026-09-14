---
title: SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル
description: "SO-ARM101 デュアルアーム(デュアルフォロワー)システムの完全な流れを紹介:ハードウェア接続とキャリブレーション、デュアルアーム遠隔操作、データセットの録画と管理、ACT ポリシーの訓練、そして実機デプロイまで。"
---

# SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-developers-kit)**

本ガイドでは、LeRobot を使って SO-ARM デュアルアームロボットシステムを訓練する完全な流れを紹介します。ハードウェア接続、デュアルアームのキャリブレーション、デュアルアーム遠隔操作、データセットの録画と管理、ACT ポリシーの訓練、実機デプロイまでを含みます。本ガイドに沿って操作すれば、2 本のリーダーアームと 2 本のフォロワーアームで教示データを収集し、模倣学習ポリシーを訓練し、実機のロボットアームで実行できます。

まず、次のとおりケーブルを接続します:

| 役割 | ポート |
| --- | --- |
| 左フォロワーアーム | `/dev/ttyACM0` |
| 右フォロワーアーム | `/dev/ttyACM1` |
| 左リーダーアーム | `/dev/ttyACM2` |
| 右リーダーアーム | `/dev/ttyACM3` |

フォロワーアームのタイプは `so101_follower`、リーダーアームのタイプは `so101_leader` です(LeRobot では `so100_leader` と `so101_leader` は同じ実装を共有します)。

## 事前準備

### 依存関係のインストール

環境のインストールは [SO-ARM101 チュートリアル](./SO-ARM101-Tutorial.md)を参照してください。

### USB 権限

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. キャリブレーション(重要ステップ)

### 1.1 左フォロワーアームのキャリブレーション

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 右フォロワーアームのキャリブレーション

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 左リーダーアームのキャリブレーション

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 右リーダーアームのキャリブレーション

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

キャリブレーション完了後、ファイルは次の場所に保存されます:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> ディレクトリ名について:`so101_follower` と `so100_follower`、`so101_leader` と `so100_leader` は同じ実装を共有するため、ディレクトリは `so_follower` / `so_leader` に統一されています。リーダーアームは teleoperator に属するため、キャリブレーションファイルは `robots/` ではなく `teleoperators/` の下にあります。

### (オプション)以前に別の ID でキャリブレーション済みの場合

例えば以前に `my_awesome_follower_arm1`、`my_awesome_follower_arm2` などを使っていた場合、キャリブレーションファイルをコピーできます:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. デュアルアーム遠隔操作

### 2.1 カメラなし

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 カメラあり

`lerobot-find-cameras opencv` でカメラのインデックスを確認できます。カメラは自由に追加・削除できます。

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 安全上の注意

- 周囲の環境に注意し、フォロワーアームの衝突を避けてください。

## 3. データセットの録画

### 3.1 ローカルに保存(Hub へアップロードしない)

`--dataset.root`(データをそのディレクトリに書き出す)と `--dataset.push_to_hub=false` を追加し、さらに `--dataset.no_stamp=true` を加えてデータセット名を安定させます(そうしないと `repo_id` にタイムスタンプが自動追加され、以降の続き録り/リプレイ/訓練で見つけられなくなります)。

> 注意:`repo_id` には `/` を含めることを推奨します(`用户名/数据集名` の形式)。ローカルのデータセットは実際にはアップロードされません。

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> 動画エンコードはデフォルトで `libsvtav1` なので指定不要です。カスタマイズする場合は `--dataset.rgb_encoder.vcodec=h264` のようなネストパラメータを使用します。

データは `./datasets/bi_so101_task/` に保存されます。構造は次のとおりです:

```text
├── meta/
│   ├── info.json         # 数据集信息(fps、特征形状等)
│   ├── episodes/         # 每集的元数据(chunk-000/...)
│   ├── stats.json        # 各特征归一化统计
│   └── tasks.parquet     # 任务文本 → task_index
├── data/                 # 每帧特征数据(chunk-*.parquet)
└── videos/               # 每个摄像头一个子目录(chunk-*.mp4)
```

### 3.2 Hugging Face Hub へのアップロード

自動アップロードを行いたい場合は `HF_USER` を残し、`root` と `push_to_hub=false` を外します(デフォルトでアップロードされます)。ポートとカメラのインデックスは接続表と一致させてください:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> アップロード後の Hub リポジトリ名は `${HF_USER}/bi_so101_task` となり、後述の 4.2 で Hub から訓練する際に使う `repo_id` と一致します。ローカルコピーは先に `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/` に保存されます。

### 3.3 収集の続行(レジューム録画)

録画中に予期せず終了した場合(例えば右クリックで終了した際に reset 段階だった場合)、あるいは複数回に分けて収集を完了したい場合は、`--resume` で同じデータセットに episode を追記し続けられます。

**注意**:

- `--resume=true` を必ず追加してください。そうしないと `LeRobotDataset.create()` がディレクトリ既存のためエラーになります。
- 続き録りコマンドの `--dataset.root` と `--dataset.repo_id` は初回録画(3.1)と完全に一致させる必要があります(`resume` は明示的な `root` を必須とします)。
- `--dataset.num_episodes` は**今回録画する本数**であり、総目標数ではありません。例えば 15 本録画済みで合計 50 本にしたい場合は `35` と書きます。
- 終了する際は、できるだけ episode の録画中か自然終了後に終了し、"Reset the environment" の段階での終了は避けてください(空の episode の保存失敗を招きます)。

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 episode のリプレイと削除

#### 指定 episode のリプレイ

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` は 0 始まりのインデックスで、`24` は 25 番目の episode を意味します。

#### 指定 episode の削除

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

削除後はデータセットがその場で書き直され、元データは `./datasets/bi_so101_task_old/` にバックアップされます。新しいデータセットに問題がないことを確認したら、バックアップを手動で削除できます:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### データセット全体の削除

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. ACT 訓練

### 4.1 ローカルデータセットからの訓練

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` は 3.1 で録画したデータセットディレクトリを指定します(`repo_id` は録画時と一致させる必要があります)。`--output_dir` のディレクトリが既に存在する場合は `FileExistsError` が直接発生するため、新しい出力ディレクトリに変更するか、`--resume=true` を追加して訓練を再開してください。

### 4.2 Hugging Face Hub からの訓練

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> 上記は ACT のデフォルトパラメータ(`chunk_size=100`、`dim_model=512` など)を使用しています。

> `repo_id` は 3.2 でアップロードした際のリポジトリ名と一致させる必要があります(3.2 で `--dataset.no_stamp=true` を追加済みのため、リポジトリ名は `${HF_USER}/bi_so101_task` に固定されます)。訓練時に `--dataset.root` は不要で、Hub から自動的にダウンロードされます。

## 5. 実機デプロイ

> 注意:`lerobot-record` は教示データの収集専用です。訓練済みポリシーのデプロイには `lerobot-rollout` を使用してください——現在のバージョンの `lerobot-record` は `--policy.path` を受け付けず、`eval_` プレフィックスのデータセット名も拒否します。

### 5.1 現場評価(データを録画しない)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` は実行秒数で、`0` は時間無制限を意味します。
- 途中で引き継ぎ/停止したい場合は `--interactive=true` を追加し、ターミナルで `/stop`、`/reset` などのコマンドで制御します。

### 5.2 評価しながらデータを録画(ローカル)

`episodic` ストラテジーを使用します(旧版 `lerobot-record` と同様の動作で、episode 単位で録画し reset 段階を含みます):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> デプロイ用データセット名は `rollout_` で始まる必要があります(現在のバージョンの必須規約)。ローカルに録画する場合は `--dataset.root` と `--dataset.no_stamp=true` を追加し、ディレクトリ名にタイムスタンプが付かないようにすることを推奨します。

### 5.3 評価データの Hugging Face Hub へのアップロード

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. よくある質問

| 問題 | 原因 | 解決方法 |
| --- | --- | --- |
| 遠隔操作時に再キャリブレーションを求められる | `bi_so_follower` が `_left` / `_right` サフィックスのキャリブレーションファイルを見つけられない | `_left` / `_right` 付きの ID で再キャリブレーションするか、既存のキャリブレーションファイルをコピー |
| リーダーアームが動かせない | leader のトルクが無効化されていない | 再キャリブレーションするかモーターを確認 |
| 収集の続行時にディレクトリ既存エラーが出る | `--resume=true` を追加していない | `lerobot-record` コマンドに `--resume=true` を追加 |
| `--resume=true` 時に `root` を要求するエラーが出る | 続き録りではデータセットディレクトリの明示指定が必須 | 続き録りコマンドに `--dataset.root=./datasets/bi_so101_task` を追加し、初回録画と一致させる |
| データセットディレクトリ名にタイムスタンプが付き、リプレイ/訓練で見つからない | 録画時に `no_stamp` を設定せず、`repo_id` にタイムスタンプが自動追加された | 録画/続き録り時に `--dataset.no_stamp=true` を追加 |
| `--dataset.vcodec=...` でパラメータ不存在エラーが出る | 旧版のパラメータで、現在の動画エンコードパラメータはネスト形式に変更済み | `--dataset.rgb_encoder.vcodec=h264` に変更(デフォルトは既に `libsvtav1`) |
| デプロイ時に `lerobot-record` が `--policy.path` / `eval_` エラーを出す | 現在のバージョンの `lerobot-record` にはポリシーデプロイ機能がない | デプロイは `lerobot-rollout --strategy.type=episodic` に変更し、データセット名は `rollout_` で始める |
| 左右のアームが逆になっている | ポート設定の誤り | `left_arm_config.port` と `right_arm_config.port` を交換 |
| 訓練時にデータセットが見つからない | ローカルデータセットに `root` を指定していない | 訓練時に `--dataset.root=./datasets/xxx` を追加 |
| データセットが自動アップロードされた | `push_to_hub=false` を設定していない | 録画時に `--dataset.push_to_hub=false` を追加 |
| 終了時に `You must add one or several frames before calling add_episode` が出る | reset 段階で終了し、現在の episode にフレームがない | 録画済みデータには影響なし。`--resume=true` で収集を続行 |

<RelatedProducts slugs="so-arm101" />
