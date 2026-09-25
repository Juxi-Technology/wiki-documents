---
title: "データセットをHuggingFaceにアップロード（任意）"
description: "収集したデータセットをHuggingFaceにアップロードする2つの方法を、ローカルからのアップロードとクラウドGPU経由に分けて説明します。"
---

# データセットをHuggingFaceにアップロード（任意）

# 方法1：ローカルアップロード（非推奨、アップロード速度が遅い）

- 自動アップロード

データセットの収集時に`push_to_hub=true`を設定すると、収集完了後に自動的にアップロードされます

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- 手動アップロード

データセットの収集時に`push_to_hub=false`を設定すると、収集完了後に手動でアップロードします

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



自動アップロードであっても手動アップロードであっても、アップロード速度はどちらも非常に遅いです（毎秒 100KB）

HuggingFaceのサーバーが海外にあるためです

# 方法2：クラウドGPUプラットフォームへのアップロード（推奨）

## クラウドGPUプラットフォームFeaturizeにログインする

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

カスタマーサポートに同済子豪兄のファンだと伝えると、代金券を受け取れます

## クラウドGPUインスタンスを起動する

## データセットの圧縮ファイルを`データセット`にアップロードする

## インスタンスのダウンロードコマンドをコピーする

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## クラウドGPUインスタンスのコマンドラインで実行する

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## データセットをHuggingFaceにアップロードする

`upload_dataset.py`ファイルを作成し、内容は以下のとおりです

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

ファイルを実行する

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- 別のアップロード方法（非推奨）

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# HuggingFace上のデータセットを確認する

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



