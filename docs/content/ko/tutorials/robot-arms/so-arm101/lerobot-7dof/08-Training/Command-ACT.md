---
title: "학습 커맨드라인-ACT(입문 추천)"
description: "입문용으로 권장되는 ACT 알고리즘의 학습 커맨드라인을 소개하고, 데이터셋 경로와 출력 디렉터리 등 주요 파라미터를 설명합니다."
---

# 학습 커맨드라인\-ACT(입문 추천)

## 참고 문서

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act\.mdx

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

## 왜 ACT 알고리즘부터 시작하는가

ACT는 LeRobot을 다룰 때 가장 먼저 학습하도록 권장하는 모델이며, 그 장점은 다음과 같습니다:

- 모델이 매우 가벼워 학습 가능한 파라미터가 8천만 개뿐입니다

- 학습 수렴 속도가 매우 빠르고, 추론 속도도 빠릅니다

- GPU 1장에서 한 시간만 학습하면 효과를 볼 수 있습니다

- ACT 모델 다운로드 압축 파일은 약 200MB 정도로, 저장과 전송이 매우 편리합니다

- 데이터셋은 30 라운드 데이터를 수집하면 기본적으로 충분합니다

- Ubuntu 호스트, Mac 컴퓨터, Windows 컴퓨터, 심지어 라즈베리파이에서도 배포하여 추론할 수 있습니다

- 실제 로봇에서의 추론 효과가 꽤 좋아, 집기, 악수, 펜 놓기 같은 간단한 작업에는 충분합니다

- LeRobot 라이브러리의 기본 환경에 ACT 알고리즘이 이미 포함되어 있어 다른 라이브러리를 설치할 필요가 없습니다

## 커맨드라인

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## 커맨드라인 설명

줄바꿈 문자 `\` 앞에는 공백이 하나만 있어야 하고, 뒤에는 공백이 없어야 합니다

빨간색은 매번 실행하기 전에 확인하거나 수정해야 하는 파라미터입니다

|커맨드라인 파라미터|설명|
|---|---|
|\-\-dataset\.repo\_id|HuggingFace 데이터셋의 Repo\_ID|
|\-\-dataset\.root|데이터셋 로컬 경로|
|\-\-dataset\.revision|데이터셋 버전, 데이터셋을 HuggingFace에 업로드할 때 지정했던 값|
|\-\-dataset\.streaming|데이터셋이 로컬에 있으면 반드시 `false`여야 합니다. 데이터셋이 이미 로컬에 있어 스트리밍 읽기가 필요 없기 때문입니다|
|\-\-dataset\.split|기본값은 `train`이며, 즉 전체 데이터를 학습 세트로 사용합니다|
|\-\-policy\.type|학습할 알고리즘, 예를 들어 act, smolvla, diffusion, pi0, wallx|
|\-\-output\_dir|학습 출력이 저장되는 디렉터리|
|\-\-job\_name|이번 학습 작업의 이름|
|\-\-policy\.device|계산 장치|
|\-\-wandb\.enable|wandb 시각화를 켭니다|
|\-\-wandb\.project|wandb 프로젝트 이름|
|\-\-policy\.push\_to\_hub|학습한 모델을 HuggingFace 클라우드로 전송합니다|
|\-\-steps|학습 step 수|
|\-\-batch\_size|한 step에 입력하는 데이터량, VRAM이 부족하면 줄여야 합니다|
|||

## 학습 과정

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

모델 압축 파일은 약 300MB입니다

