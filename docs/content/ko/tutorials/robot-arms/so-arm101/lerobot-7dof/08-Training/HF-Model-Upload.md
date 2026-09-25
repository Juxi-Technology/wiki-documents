---
title: "HuggingFace에 모델 업로드(선택 사항)"
description: "학습이 끝난 모델을 HuggingFace에 업로드하는 선택 사항 안내로, 학습 중 자동 업로드와 수동 업로드 두 가지 방법을 설명합니다."
---

# HuggingFace에 모델 업로드(선택 사항)

## 모델 Repo 생성

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## 모델 Repo 확인

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

현재는 비어 있습니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## 모델 업로드

`upload_model.py` 파일을 생성하고, 내용은 다음과 같습니다

```Python
from huggingface_hub import HfApi

api = HfApi()

repo_id = "TommyZihao/lerobot_zihao_model_shake_hands"

api.upload_folder(
    folder_path="~/output_lerobot_train/b/checkpoints/last/pretrained_model",
    repo_id=repo_id,
    repo_type="model"
)

api.create_tag(repo_id, tag="v0.1.0", repo_type="model")
```

실행

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## 모델 Repo 확인

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

이제 모델 파일이 있습니다



