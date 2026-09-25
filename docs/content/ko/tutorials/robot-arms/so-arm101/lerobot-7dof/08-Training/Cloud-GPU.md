---
title: "클라우드 GPU 학습 환경 설정"
description: "클라우드 GPU 플랫폼에서 학습 인스턴스를 만들고 환경 설치와 wandb 로그인, 데이터셋 전송까지 마치는 학습 준비 절차를 설명합니다."
---

# 클라우드 GPU 학습 환경 설정

## 자신의 컴퓨터 네트워크 프록시 끄기

그러지 않으면 Jupyter의 커맨드라인을 열지 못할 수 있습니다

## 클라우드 GPU 플랫폼 Featurize 로그인

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

사용자 그룹에 가입하고, 고객센터에 퉁지쯔하오 팬이라고 말하면 대금권(쿠폰)을 받을 수 있습니다

## 클라우드 GPU 인스턴스 시작

## 환경 설치 및 설정

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## wandb 로그인

```Shell
wandb login
API 키를 복사해 붙여넣고 Enter를 누릅니다
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## 데이터셋 마운트

```Shell
인스턴스 다운로드 명령을 복사합니다. 다음과 유사합니다:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

데이터셋이 `~` 디렉터리 아래에 나타납니다

## 가중치 저장 주기 변경(선택)

`lerobot/src/lerobot/configs/train.py`를 엽니다

save\_freq를 20\_000에서 5\_000으로 변경합니다

이렇게 하면 학습 더 초반에 모델 가중치 파일을 얻을 수 있습니다



