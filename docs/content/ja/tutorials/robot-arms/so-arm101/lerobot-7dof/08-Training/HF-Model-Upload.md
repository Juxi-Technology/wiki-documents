---
title: "モデルをHuggingFaceにアップロード（任意）"
description: "訓練時の自動アップロードと訓練後の手動アップロードの両方を、チェックポイントの指定や読み込み方法も含めて説明します。"
---

# モデルをHuggingFaceにアップロード（任意）

## モデルRepoを作成する

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## モデルRepoを確認する

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

現在は空です

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## モデルをアップロードする

`upload_model.py`ファイルを作成し、内容は以下のとおりです

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

実行する

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## モデルRepoを確認する

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

現在はモデルファイルがあります



