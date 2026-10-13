---
title: "第七步:训练模型——Diffusion 训练命令"
description: "Diffusion 训练命令:在 SO-ARM101 上用 lerobot-train 训练 Diffusion 策略的完整参数与参考文档,训练产出的模型压缩包约 1G。"
---

# 第七步:训练模型——Diffusion 训练命令

## 参考文档

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

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

Diffusion模型压缩包大概1个G左右

## 效果一般：机械臂一下一下卡顿，不推荐

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
