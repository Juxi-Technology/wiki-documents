---
title: "7단계: pi0 학습 커맨드라인"
description: "효과가 가장 좋은 pi0 알고리즘의 학습 커맨드라인으로, 환경 설치와 실행 방법 및 학습 시작까지 걸리는 시간을 설명합니다."
---

# 7단계: pi0 학습 커맨드라인

## 실행 전

- **환경**: 먼저 [클라우드 GPU 학습 환경 설정](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)에 따라 인스턴스를 개설하고 dataset을 전송한 뒤, 이 문서로 돌아와 "환경 설치"와 "커맨드라인" 두 절을 실행합니다
- **dataset**: 커맨드의 `--dataset.root=~/lerobot_my_dataset_shake_hands`는 6단계에서 수집한 악수 dataset을 가리킵니다. 자신의 작업을 학습한다면 자신의 dataset 이름으로 바꿔 주세요
- **출력 디렉터리**: `--output_dir`이 이미 존재하면 위의 `sudo rm -rf` 명령으로 먼저 삭제하거나, 새 이름으로 바꿔 주세요
- **학습 중 언제든 wandb에서 곡선을 볼 수 있습니다**, [wandb 실시간 학습 곡선 확인](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)을 참고하세요

## 참고 문서

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## 추천 클라우드 GPU 인스턴스

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## 환경 설치

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## 커맨드라인

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
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

커맨드라인을 실행하고 20분이 지나야 학습이 정식으로 시작됩니다

모델 압축 파일은 약 5GB이고, 압축을 풀면 7GB입니다

<RelatedProducts slugs="so-arm101" />
