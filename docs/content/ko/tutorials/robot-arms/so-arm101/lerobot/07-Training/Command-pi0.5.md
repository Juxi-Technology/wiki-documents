---
title: "7단계: pi0.5 학습 커맨드라인"
description: "pi0를 개선한 상위 버전의 학습 커맨드라인으로, 환경 설치와 커맨드라인 실행 방법을 정리한 심화 과정 페이지입니다."
---

# 7단계: pi0.5 학습 커맨드라인

## 실행 전

- **환경**: 먼저 [클라우드 GPU 학습 환경 설정](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)에 따라 인스턴스를 개설하고 dataset을 전송한 뒤, 이 문서로 돌아와 "환경 설치"와 "커맨드라인" 두 절을 실행합니다
- **dataset**: 커맨드의 `--dataset.root=~/lerobot_my_dataset_shake_hands`는 6단계에서 수집한 악수 dataset을 가리킵니다. 자신의 작업을 학습한다면 자신의 dataset 이름으로 바꿔 주세요
- **출력 디렉터리**: `--output_dir`이 이미 존재하면 위의 `sudo rm -rf` 명령으로 먼저 삭제하거나, 새 이름으로 바꿔 주세요
- **학습 중 언제든 wandb에서 곡선을 볼 수 있습니다**, [wandb 실시간 학습 곡선 확인](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)을 참고하세요

## 참고 문서

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

https://www.pi.website/blog/pi05

## 추천 클라우드 GPU 인스턴스

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/1.png)

## 환경 설치

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## 커맨드라인

- 이전에 학습이 중단된 output 아래의 파일 삭제

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- 학습

```Shell
lerobot-train \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi05 \
    --output_dir=~/output_lerobot_train/shake/pi05_A \
    --job_name=shake_pi05_A \
    --policy.pretrained_path=lerobot/pi05_base \
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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

커맨드라인을 실행하고 20분이 지나야 학습이 정식으로 시작됩니다

모델 압축 파일은 약 5GB이고, 압축을 풀면 7GB입니다

<RelatedProducts slugs="so-arm101" />
