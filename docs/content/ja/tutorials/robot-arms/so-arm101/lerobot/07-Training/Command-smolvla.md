---
title: "ステップ7:訓練コマンドライン-smolvla"
description: "smolvlaアルゴリズムの訓練コマンドを、事前学習済みモデルからのファインチューニングとゼロからの訓練の2通りで説明します。"
---

# ステップ7:訓練コマンドライン-smolvla

## 実行の前に

- **環境**：先に[クラウドGPU訓練環境の設定](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)に従ってインスタンスを開設し、データセットを転送してください。smolvla は追加で依存関係をインストールする必要がある点に注意してください。以下の「環境のインストール」を参照
- **データセット**：コマンド内の `--dataset.root=~/lerobot_my_dataset_shake_hands` は第六步で収集した握手データセットを指します。自分で収集したタスクを訓練する場合は、自分のデータセット名に置き換えてください
- **2つの訓練方法**：事前学習済みモデルをベースにファインチューニングする方が通常は効果が良く収束も速いです。ゼロから訓練する場合は事前学習済みの重みをダウンロードする必要がありません。必要に応じて選択してください
- **訓練中はいつでも wandb で曲線を確認できます**。[wandbでリアルタイム訓練曲線を確認](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)を参照してください

## 参考ドキュメント

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## 環境のインストール

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## 事前学習済みモデルをベースにファインチューニングする（推奨）

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## ゼロから訓練する

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## モデルのダウンロード

smolvla モデルの圧縮パッケージはおよそ1G程度です

<RelatedProducts slugs="so-arm101" />
