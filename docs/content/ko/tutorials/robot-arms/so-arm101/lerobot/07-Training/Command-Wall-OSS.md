---
title: "7단계: WALL-OSS 학습 커맨드라인"
description: "SO-ARM101에서 WALL-OSS(wall_x) 정책 학습: 환경 설치, 사전 학습 가중치를 불러오는 전체 lerobot-train 명령과 약 7.2GB 모델 안내."
---

# 7단계: WALL-OSS 학습 커맨드라인

## 참고 문서

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## 환경 설치

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## 학습 명령줄

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

모델 아카이브는 약 7.2G입니다

<RelatedProducts slugs="so-arm101" />
