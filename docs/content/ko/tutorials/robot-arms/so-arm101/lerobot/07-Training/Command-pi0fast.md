---
title: "7단계: pi0fast 학습 커맨드라인"
description: "빠른 버전인 pi0fast 학습 커맨드라인으로, 환경 설치와 Hub 데이터셋 준비, 실행 후 기다리는 시간까지 함께 다룹니다."
---

# 7단계: pi0fast 학습 커맨드라인

## 실행 전

- **환경**: 먼저 [클라우드 GPU 학습 환경 설정](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)에 따라 인스턴스를 개설하고 dataset을 전송한 뒤, 이 문서로 돌아와 "환경 설치"와 "커맨드라인" 두 절을 실행합니다
- **dataset**: 아래의 학습 커맨드에는 `--dataset.root`가 없습니다. HuggingFace Hub에서 dataset을 가져오므로, dataset이 이미 Hub에 업로드되어 있어야 합니다. dataset이 로컬에만 있다면 이 문서 끝의 "이전 내용" 단락을 참고하여 `--dataset.root=~/lerobot_my_dataset_shake_hands`를 보충해 주세요
- **출력 디렉터리**: `--output_dir`이 이미 존재하면 위의 `sudo rm -rf` 명령으로 먼저 삭제하거나, 새 이름으로 바꿔 주세요
- **학습 중 언제든 wandb에서 곡선을 볼 수 있습니다**, [wandb 실시간 학습 곡선 확인](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)을 참고하세요

## 참고 문서

https://huggingface.co/docs/lerobot/pi0fast

## Issue

https://github.com/huggingface/lerobot/pull/2203

## 추천 클라우드 GPU 인스턴스

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## 환경 설치

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## 커맨드라인

- 이전에 학습이 중단된 output 아래의 파일 삭제

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- 학습

```Shell
lerobot-train \
    --dataset.repo_id=<사용자명>/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi0_fast \
    --output_dir=output_lerobot_train/shake/pi0_fast_A \
    --job_name=shake_pi0_fast_A \
    --policy.pretrained_path=lerobot/pi0_fast_base \
    --policy.dtype=bfloat16 \
    --policy.gradient_checkpointing=true \
    --policy.chunk_size=10 \
    --policy.n_action_steps=10 \
    --policy.max_action_tokens=256 \
    --steps=50000 \
    --batch_size=8 \
    --policy.device=cuda \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project
```

## 이전 내용

```Shell
lerobot-train \
  --dataset.repo_id=<사용자명>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0_fast \
  --output_dir=output_lerobot_train/shake/pi0_fast_A \
  --job_name=shake_pi0_fast_A \
  --policy.pretrained_path=lerobot/pi0_fast_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```

실행 후 10분 정도 지나야 학습이 정식으로 시작됩니다

모델 압축 파일은 약 5GB이고, 압축을 풀면 7GB입니다

<RelatedProducts slugs="so-arm101" />
