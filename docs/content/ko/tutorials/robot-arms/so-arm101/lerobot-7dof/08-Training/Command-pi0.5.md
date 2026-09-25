---
title: "학습 커맨드라인-pi0.5"
description: "pi0를 개선한 상위 버전의 학습 커맨드라인으로, 환경 설치와 커맨드라인 실행 방법을 정리한 심화 과정 페이지입니다."
---

# 학습 커맨드라인\-pi0\.5

## 참고 문서

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

https://www\.pi\.website/blog/pi05

## 추천 클라우드 GPU 인스턴스

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

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
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

커맨드라인을 실행하고 20분이 지나야 학습이 정식으로 시작됩니다

모델 압축 파일은 약 5GB이고, 압축을 풀면 7GB입니다

