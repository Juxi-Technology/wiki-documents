---
title: "訓練命令行-Diffusion"
description: "在 7-DOF SO-ARM101 上以 lerobot-train 訓練 Diffusion 策略的完整指令範例，含主要參數設定，並附上官方參考文檔連結。"
---

# 訓練命令行\-Diffusion

## 參考文檔

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_diffusion\_README\.md

## 命令行

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

Diffusion模型壓縮包大概1個G左右

