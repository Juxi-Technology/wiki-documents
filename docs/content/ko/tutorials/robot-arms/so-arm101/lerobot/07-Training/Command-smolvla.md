---
title: "7단계: smolvla 학습 커맨드라인"
description: "심화 추천 모델 smolvla의 학습 커맨드라인으로, 추가 의존성 설치와 사전학습 모델 기반 파인튜닝 방법을 설명합니다."
---

# 7단계: smolvla 학습 커맨드라인

## 실행 전

- **환경**: 먼저 [클라우드 GPU 학습 환경 설정](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)에 따라 인스턴스를 개설하고 dataset을 전송합니다. smolvla는 의존성을 추가로 설치해야 하니 아래 "환경 설치"를 참고하세요
- **dataset**: 커맨드의 `--dataset.root=~/lerobot_my_dataset_shake_hands`는 6단계에서 수집한 악수 dataset을 가리킵니다. 자신의 작업을 학습한다면 자신의 dataset 이름으로 바꿔 주세요
- **두 가지 학습 방식**: 사전학습 모델을 기반으로 파인튜닝하면 보통 효과가 더 좋고 수렴이 더 빠릅니다. 처음부터 학습하면 사전학습 가중치를 다운로드할 필요가 없습니다. 필요에 따라 선택하세요
- **학습 중 언제든 wandb에서 곡선을 볼 수 있습니다**, [wandb 실시간 학습 곡선 확인](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)을 참고하세요

## 참고 문서

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## 환경 설치

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## 사전학습 모델 기반 파인튜닝(추천)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<사용자명>/lerobot_my_dataset_shake_hands \
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
  --dataset.repo_id=<사용자명>/lerobot_my_dataset_shake_hands \
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

<RelatedProducts slugs="so-arm101" />
