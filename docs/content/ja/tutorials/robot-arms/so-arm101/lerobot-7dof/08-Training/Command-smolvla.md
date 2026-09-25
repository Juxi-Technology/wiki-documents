---
title: "訓練コマンドライン-smolvla（次のステップに推奨）"
description: "smolvlaアルゴリズムの訓練コマンドを、事前学習済みモデルからのファインチューニングとゼロからの訓練の2通りで説明します。"
---

# 訓練コマンドライン\-smolvla（次のステップに推奨）

## 参考ドキュメント

https://huggingface\.co/docs/lerobot/smolvla

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_smolvla\_README\.md

## 環境のインストール

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## 事前学習済みモデルをベースにファインチューニングする（推奨）

```Shell
lerobot-train \
  *--policy.path*=lerobot/smolvla_base \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
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
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
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

smolvla モデルの圧縮パッケージはおよそ 1GB 程度です



