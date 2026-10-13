---
title: "ステップ7:訓練コマンドライン-Diffusion"
description: "SO-ARM101 で lerobot-train を使って Diffusion ポリシーを訓練するための完全なパラメーターと参考ドキュメント。訓練後のモデルは約 1GB です。"
---

# ステップ7:訓練コマンドライン-Diffusion

## 参考ドキュメント

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

## コマンドライン

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.streaming=false \
  --policy.type=diffusion \
  --output_dir=output_lerobot_train/shake/diffusion_a \
  --job_name=shake_diffusion_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=30000 \
  --batch_size=8
```

Diffusion モデルのアーカイブは約 1 GB です

## 結果は平凡：アームがぎこちない動きで進みます。推奨しません

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
