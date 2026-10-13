---
title: "ステップ7:訓練コマンドライン-WALL-OSS"
description: "SO-ARM101 で WALL-OSS(wall_x)ポリシーを訓練:環境のインストール、事前学習済み重みを読み込む完全な lerobot-train コマンド、約 7.2GB のモデルについて解説。"
---

# ステップ7:訓練コマンドライン-WALL-OSS

## 参考ドキュメント

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## 環境のインストール

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## 学習コマンドライン

```Shell
python lerobot/src/lerobot/scripts/lerobot_train.py \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --policy.type=wall_x \
    --output_dir=~/output_lerobot_train/shake/wallx_A \
    --job_name=shake_wallx_a \
    --policy.pretrained_name_or_path=x-square-robot/wall-oss-flow \
    --policy.prediction_mode=diffusion \
    --policy.attn_implementation=eager \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project \
    --steps=30000 \
    --policy.device=cuda \
    --batch_size=8
```

モデルのアーカイブは約 7.2G です

<RelatedProducts slugs="so-arm101" />
