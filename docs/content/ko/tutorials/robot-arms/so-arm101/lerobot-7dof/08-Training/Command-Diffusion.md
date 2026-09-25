---
title: "학습 커맨드라인-Diffusion"
description: "7축 SO-ARM101에서 Diffusion 정책을 학습하는 lerobot-train 커맨드라인과 공식 참고 문서를 함께 소개합니다."
---

# 학습 커맨드라인\-Diffusion

## 참고 문서

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_diffusion\_README\.md

## 커맨드라인

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

Diffusion 모델 압축 파일은 약 1GB 정도입니다

