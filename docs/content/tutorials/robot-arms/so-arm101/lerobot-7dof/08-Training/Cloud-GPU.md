---
title: "Cloud GPU Training Environment Setup"
description: "Set up the cloud GPU training environment on Featurize, install LeRobot, ffmpeg and wandb, and mount the collected dataset."
---

# Cloud GPU Training Environment Setup

## Turn off the network proxy on your own computer

Otherwise the Jupyter command line may not open

## Log in to the cloud GPU platform Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Join the user group and tell customer service that you are a fan of "Tongji Zihao" to claim a voucher

## Launch a cloud GPU instance

## Install and configure the environment

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
```

## Log in to wandb

```Shell
wandb login
Copy and paste the API key, then press Enter
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Mounting the dataset

```Shell
Copy the instance download command, similar to:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

The dataset will appear under the `~` directory

## Change the weight save frequency (optional)

Open `lerobot/src/lerobot/configs/train.py`

Change save\_freq from 20\_000 to 5\_000

This way you can obtain a model weight file earlier in training



