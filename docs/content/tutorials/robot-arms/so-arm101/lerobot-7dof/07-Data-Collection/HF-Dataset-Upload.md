---
title: "Upload Dataset to HuggingFace (Optional)"
description: "Upload a collected dataset to Hugging Face, either slowly from the local computer or faster through a cloud GPU instance."
---

# Upload Dataset to HuggingFace (Optional)

# Method 1: Local upload (not recommended, slow upload speed)

- Automatic upload

Set `push_to_hub=true` when collecting the dataset, and it will be uploaded automatically once collection is complete

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

- Manual upload

Set `push_to_hub=false` when collecting the dataset, and upload it manually once collection is complete

```Shell
hf upload Tommymy/lerobot_my_dataset_a /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a / --repo-type=dataset
```



Whether automatic or manual, the upload speed is very slow (one hundred KB per second)

Because the HuggingFace servers are overseas

# Method 2: Upload via a cloud GPU platform (recommended)

## Log in to the cloud GPU platform Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Tell customer service that you are a fan of "Tongji Zihao" to claim a voucher

## Start a cloud GPU instance

## Upload the dataset archive to `Datasets`

## Copy the instance download command

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

## Run in the command line of the cloud GPU instance

```Shell
pip install httpx

unzip lerobot_my_dataset_a.zip

hf auth login
```

## Upload the dataset to HuggingFace

Create an `upload_dataset.py` file with the following content

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

Run the file

```Shell
python upload_dataset.py
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/3.png)

- Another upload method (not recommended)

```Shell
hf upload Tommymy/lerobot_my_dataset_a lerobot_my_dataset_a / --repo-type=dataset
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Dataset-Upload/4.png)

# View the dataset on HuggingFace

https://huggingface\.co/datasets/Tommymy/lerobot\_my\_dataset\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



