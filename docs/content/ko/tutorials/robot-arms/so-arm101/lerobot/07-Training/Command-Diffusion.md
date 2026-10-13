---
title: "7단계: Diffusion 학습 커맨드라인"
description: "SO-ARM101에서 lerobot-train으로 Diffusion 정책을 학습하는 전체 파라미터와 참고 문서. 학습된 모델 압축 파일은 약 1GB입니다."
---

# 7단계: Diffusion 학습 커맨드라인

## 참고 문서

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

## 명령줄

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

Diffusion 모델 아카이브는 약 1 GB입니다

## 결과가 그저 그럼: 팔이 끊어지듯 움직임, 권장하지 않음

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
