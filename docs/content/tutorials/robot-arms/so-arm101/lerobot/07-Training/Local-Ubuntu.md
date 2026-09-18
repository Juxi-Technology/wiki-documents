---
title: "Step 7: Training — Local Ubuntu"
description: "Train an ACT policy on a local Ubuntu machine with an NVIDIA GPU, including dataset paths, output directories and wandb logging."
---

# Step 7: Training — Local Ubuntu

This page applies to cases where your own computer already has an NVIDIA GPU, so no cloud GPU is needed.

## Before running

- **Environment**: just complete the setup as described in [Step 1: Install the Lerobot environment](/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu); for local training you do not need to upload the dataset anywhere
- **Dataset**: the example below uses the grab-oranges dataset `lerobot_my_dataset_a` collected in the first page of step 6; the path is written as an absolute path, so please replace it with your own username
- **Training on a Mac**: replace `/home/<你的用户名>/` in the command with `/Users/<你的用户名>/`
- **Output directory**: if `--output_dir` already exists, it will directly raise `FileExistsError`; use a new directory name, or add `--resume=true` to continue training

## Reference documentation

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- Note

`` can only have one space before it and no space after it

When the dataset is local, `--dataset.streaming` must be `false`, because streaming reads are not needed

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
  --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<用户名>/lerobot_my_dataset_a --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
