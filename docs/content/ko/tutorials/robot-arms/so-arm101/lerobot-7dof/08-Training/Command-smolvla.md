---
title: "학습 커맨드라인-smolvla(심화 추천)"
description: "심화 추천 모델 smolvla의 학습 커맨드라인으로, 추가 의존성 설치와 사전학습 모델 기반 파인튜닝 방법을 설명합니다."
---

# 학습 커맨드라인\-smolvla(심화 추천)

## 참고 문서

https://huggingface\.co/docs/lerobot/smolvla

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_smolvla\_README\.md

## 환경 설치

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## 사전학습 모델 기반 파인튜닝(추천)

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

## 처음부터 학습

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

## 모델 다운로드

smolvla 모델 압축 파일은 약 1GB 정도입니다



