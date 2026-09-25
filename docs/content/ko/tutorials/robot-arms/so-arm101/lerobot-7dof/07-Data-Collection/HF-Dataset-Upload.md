---
title: "HuggingFace에 데이터셋 업로드(선택 사항)"
description: "로컬 업로드와 클라우드 GPU 플랫폼 업로드 두 가지 방법으로 수집한 데이터셋을 HuggingFace에 올리고 확인하는 절차를 설명합니다."
---

# HuggingFace에 데이터셋 업로드(선택 사항)

# 방법 1: 로컬 업로드(권장하지 않음, 업로드 속도 느림)

- 자동 업로드

데이터셋 수집 시 `push_to_hub=true`로 설정하면, 수집 완료 후 자동으로 업로드됩니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- 수동 업로드

데이터셋 수집 시 `push_to_hub=false`로 설정하면, 수집 완료 후 수동으로 업로드합니다

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



자동 업로드든 수동 업로드든 업로드 속도가 매우 느립니다(초당 100KB)

HuggingFace 서버가 해외에 있기 때문입니다

# 방법 2: 클라우드 GPU 플랫폼 업로드(권장)

## 클라우드 GPU 플랫폼 Featurize 로그인

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

고객센터에 퉁지쯔하오 팬이라고 말하면 대금권(쿠폰)을 받을 수 있습니다

## 클라우드 GPU 인스턴스 시작

## 데이터셋 압축 파일을 `데이터셋`에 업로드

## 인스턴스 다운로드 명령 복사

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## 클라우드 GPU 인스턴스의 커맨드라인에서 실행

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## HuggingFace에 데이터셋 업로드

`upload_dataset.py` 파일을 생성하고, 내용은 다음과 같습니다

```Python
from huggingface_hub import HfApi

api = HfApi()

api.upload_folder(
    folder_path="~/lerobot_my_dataset_a",
    repo_id="Tommymy/lerobot_my_dataset_a",
    repo_type="dataset"
)

api.create_tag("Tommymy/lerobot_my_dataset_a", tag="v0.4.0", repo_type="dataset")
```

파일 실행

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- 다른 업로드 방법(권장하지 않음)

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# HuggingFace의 데이터셋 확인

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



