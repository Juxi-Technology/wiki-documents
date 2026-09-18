---
title: "7단계: 모델 가중치 파일 얻기"
description: "클라우드 GPU에서 학습을 마친 모델 가중치를 압축해 로컬로 내려받는 방법과 체크포인트가 저장되는 위치를 설명합니다."
---

# 7단계: 모델 가중치 파일 얻기

클라우드 GPU에서 학습을 마친 뒤에는 모델을 압축해 로컬로 다운로드할 수 있습니다:

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

20K step마다 모델 가중치 파일이 한 번 저장됩니다

`ckpt.zip` 압축 파일을 마우스 오른쪽 버튼으로 클릭해 다운로드하고, 로컬 컴퓨터에 압축을 풀어 주세요

> 모델을 다른 사람에게 전달해야 하거나 다른 컴퓨터에서 추론할 계획이라면, 압축해서 다운로드하는 것보다 Hugging Face에 바로 업로드하는 편이 더 간편합니다. [HuggingFace에 모델 업로드(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)를 참고하세요.

## 악수

```Shell
# 지정한 학습 step에서 저장된 모델
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# 최신 모델
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
