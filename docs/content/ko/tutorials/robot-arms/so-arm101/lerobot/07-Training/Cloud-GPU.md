---
title: "7단계: 클라우드 GPU 학습 환경 설정"
description: "클라우드 GPU 플랫폼에서 학습 인스턴스를 만들고 환경 설치와 wandb 로그인, 데이터셋 전송까지 마치는 학습 준비 절차를 설명합니다."
---

# 7단계: 클라우드 GPU 학습 환경 설정

## 학습 전에 먼저 볼 것

dataset은 이미 6단계에서 수집했습니다. 다음은 모델 학습입니다. 이 단계는 세 가지로 구성되며, 이 문서는 앞의 두 가지를 다룹니다:

1. **학습 환경 준비**: 클라우드 GPU 플랫폼에서 인스턴스를 개설하고 LeRobot, ffmpeg, wandb 등을 설치합니다(이 문서)
2. **dataset을 클라우드 GPU로 전송**: 6단계에서 수집한 데이터는 아직 자신의 컴퓨터에 있습니다(이 문서의 "dataset 마운트" 절)
3. **학습 커맨드 실행**: 알고리즘 선택과 파라미터 조정은 아래 각 문서를 참고하세요

## 튜토리얼에서 사용하는 dataset

학습과 추론 커맨드에서 dataset은 **악수 작업 `lerobot_my_dataset_shake_hands`**를 사용합니다(6단계의 세 번째 문서에서 시연한 것입니다). 로컬 경로는 `~/lerobot_my_dataset_shake_hands`입니다. 학습 커맨드를 실행하기 전에 이 디렉터리가 실제로 존재하고 이름이 완전히 일치하는지 확인해 주세요.

자신이 수집한 작업을 학습하려면 커맨드의 모든 `lerobot_my_dataset_shake_hands`를 자신의 dataset 이름으로 바꾸면 됩니다.

## 학습 알고리즘 선택 방법

| 알고리즘 | 문서 | 특징 |
|---|---|---|
| ACT | [학습 커맨드라인-ACT](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | 입문 추천. 모델이 작고 학습이 빨라, 단일 GPU에서 한 시간이면 효과를 볼 수 있습니다 |
| SmolVLA | [학습 커맨드라인-smolvla](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | 심화 추천. 사전학습 모델을 기반으로 파인튜닝할 수 있습니다 |
| pi0 | [학습 커맨드라인-pi0](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | 효과가 가장 좋지만 VRAM 사용량이 크고 학습이 느립니다 |
| pi0.5 | [학습 커맨드라인-pi0.5](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | pi0의 개선 버전 |
| pi0fast | [학습 커맨드라인-pi0fast](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | 추론 속도가 더 빠릅니다 |

먼저 ACT로 전체 흐름을 한 번 끝까지 돌려 보고, 익숙해진 뒤 다른 알고리즘으로 바꾸는 것을 권장합니다.

## 학습 후

- 학습한 모델을 Hugging Face로 전송하려면(백업, 머신 교체, 다른 사람과 공유), [HuggingFace에 모델 업로드(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)를 참고하세요
- 모델을 로컬 컴퓨터로 다시 다운로드하려면 [모델 가중치 파일 얻기](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)를 참고하세요

## 로컬 머신 학습

자신의 컴퓨터에 NVIDIA 그래픽 카드가 있다면 클라우드 GPU를 쓰지 않고 로컬 머신에서 바로 학습할 수도 있습니다. [로컬 Ubuntu 학습](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)을 참고하세요.

## 자신의 컴퓨터 네트워크 프록시 끄기

그러지 않으면 Jupyter의 커맨드라인을 열지 못할 수 있습니다

## 클라우드 GPU 플랫폼 Featurize 로그인

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## 클라우드 GPU 인스턴스 시작

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> 아래의 "JupyterLab"을 클릭하면 왼쪽 상단에 업로드 버튼이 있으며, 여기에서 코드와 dataset을 업로드할 수 있습니다
> 
> 

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

# Huggingface에 업로드하지 않고 wandb도 필요 없다면 설치하지 않아도 됩니다
```

> 모델 설치 시 training이 빠졌다면 추가로 설치해야 합니다
> 
> `pip install -e ".[training]"`
> 
> 

## wandb 로그인

```Shell
wandb login
API 키를 복사해 붙여넣고 Enter를 누릅니다
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## dataset 마운트

첫 번째 단계로, 6단계에서 수집한 dataset을 zip으로 압축해 클라우드 GPU 플랫폼의 "dataset"에 업로드합니다(JupyterLab 왼쪽 상단에 업로드 버튼이 있습니다). 플랫폼에서 처리가 끝나면 다운로드 커맨드를 하나 줍니다.

두 번째 단계로, 인스턴스의 커맨드라인에서 이 다운로드 커맨드를 실행하고 압축을 풉니다:

```Shell
인스턴스 다운로드 커맨드를 복사합니다. 다음과 유사합니다:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

dataset이 `~` 디렉터리 아래에 나타납니다.

압축을 푼 뒤 `ls ~`로 확인할 수 있으며, 디렉터리 이름은 학습 커맨드의 `--dataset.root`와 완전히 일치해야 합니다(이 문서와 뒤의 각 문서에서는 모두 `~/lerobot_my_dataset_shake_hands`를 사용합니다). 압축을 풀었을 때 같은 이름의 디렉터리가 한 겹 더 생겼다면(예: `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`), 안쪽 층의 내용을 바깥층으로 옮기거나, `--dataset.root`를 실제 계층에 맞게 지정하면 됩니다.

## 가중치 저장 주기 변경(선택)

`lerobot/src/lerobot/configs/train.py`를 엽니다

save_freq를 20_000에서 5_000으로 변경합니다

이렇게 하면 학습 더 초반에 모델 가중치 파일을 얻을 수 있습니다

<RelatedProducts slugs="so-arm101" />
