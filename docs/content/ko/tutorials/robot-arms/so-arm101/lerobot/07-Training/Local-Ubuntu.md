---
title: "7단계: 로컬 Ubuntu 학습"
description: "NVIDIA 그래픽 카드가 있는 로컬 Ubuntu 컴퓨터에서 클라우드 GPU 없이 6단계 데이터셋으로 모델 학습을 실행하는 방법을 안내합니다."
---

# 7단계: 로컬 Ubuntu 학습

이 문서는 자신의 컴퓨터에 NVIDIA 그래픽 카드가 있는 경우를 위한 것으로, 클라우드 GPU가 필요하지 않습니다.

## 실행 전

- **환경**: [1단계: Lerobot 환경 설치](/ko/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu)대로 설치하면 되며, 로컬 머신 학습에서는 dataset을 다른 곳으로 옮길 필요가 없습니다
- **dataset**: 아래 예시는 6단계 첫 번째 문서에서 수집한 오렌지 집기 dataset `lerobot_my_dataset_a`를 사용하며, 경로는 절대 경로로 적었습니다. 자신의 사용자 이름으로 바꿔 주세요
- **Mac에서 학습**: 커맨드에서 `/home/<你的用户名>/`를 `/Users/<你的用户名>/`로 바꿔 주세요
- **출력 디렉터리**: `--output_dir`이 이미 존재하면 곧바로 `FileExistsError`가 발생합니다. 새 디렉터리 이름으로 바꾸거나 `--resume=true`를 추가해 학습을 이어 가세요

## 참고 문서

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- 주의

`` 앞에는 공백이 하나만 있어야 하고, 뒤에는 공백이 없어야 합니다

dataset이 로컬에 있을 때는 `--dataset.streaming`이 반드시 `false`여야 합니다. 스트리밍 읽기가 필요 없기 때문입니다

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
  --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<用户名>/lerobot_my_dataset_a --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
