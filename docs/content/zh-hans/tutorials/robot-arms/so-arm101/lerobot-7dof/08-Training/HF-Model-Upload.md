---
title: "上传模型到HuggingFace（可选）"
description: "把训练好的模型上传到 Hugging Face:介绍训练时自动上传与训练后手动上传两种做法,并说明如何加载云端模型。"
---

# 上传模型到HuggingFace（可选）

## 创建模型Repo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/3.png)

## 查看模型Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

现在是空的

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/1.png)

## 上传模型

创建`upload_model.py`文件，内容如下

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

运行

```Shell
python upload_model.py
```

![be7686a3cbc9caffe00ffcba6b82b2e7\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/7686390068227.png)

## 查看模型Repo

https://huggingface\.co/TommyZihao/lerobot\_zihao\_model\_a

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/08-training/2.png)

现在有了模型文件



