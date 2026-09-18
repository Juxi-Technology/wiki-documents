---
title: "第六步:上傳數據集到 Hugging Face(可選)"
description: "本頁比較上傳數據集到 Hugging Face 的兩種方式，說明本機上傳較慢、改用雲端 GPU 平台較快的原因。"
---

# 第六步:上傳數據集到 Hugging Face(可選)

## 方法一：本地上傳（不推薦，上傳網速慢）

- 自動上傳

在採集數據集時設定`push_to_hub=true`，採集完畢後自動上傳

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/1.jpg)

- 手動上傳

在採集數據集時設定`push_to_hub=false`，採集完畢後手動上傳

```Shell
hf upload <用户名>/lerobot_my_dataset_a /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a / --repo-type=dataset
```

無論自動上傳還是手動上傳，上傳速度都很慢（每秒鐘一百KB）

因為HuggingFace伺服器在國外

## 方法二：雲GPU平台上傳（推薦）

### 登錄雲GPU平台Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

### 開啟一個雲GPU實例

### 上傳數據集壓縮包到`數據集`

### 複製實例下載命令

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/2.jpg)

### 在雲GPU實例的命令列中運行

```Shell
pip install httpx

unzip your_datasets.zip

hf auth login
```

### 上傳數據集到HuggingFace

建立`upload_dataset.py`檔案，內容如下

```Python
from huggingface_hub import HfApi

api = HfApi()

api.upload_folder(
    folder_path="~/lerobot_my_dataset_a",
    repo_id="<用户名>/lerobot_my_dataset_a",
    repo_type="dataset"
)

api.create_tag("<用户名>/lerobot_my_dataset_a", tag="v0.4.0", repo_type="dataset")
```

運行檔案

```Shell
python upload_dataset.py
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- 另一種上傳方法（不推薦）

```Shell
hf upload <用户名>/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

## 查看HuggingFace上的數據集

https://huggingface.co/datasets/Juxi-Technology/soarm_amazing_hand_pick

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/5.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/6.png)

<RelatedProducts slugs="so-arm101" />
