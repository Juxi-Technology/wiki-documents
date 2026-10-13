---
title: "第七步:Diffusion 訓練命令列"
description: "Diffusion 訓練命令:在 SO-ARM101 上用 lerobot-train 訓練 Diffusion 策略的完整參數與參考文件,訓練產出的模型壓縮包約 1G。"
---

# 第七步:Diffusion 訓練命令列

## 參考文件

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

## 命令列

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

Diffusion模型壓縮檔大概1個G左右

## 效果一般：機械臂一下一下卡頓，不推薦

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
