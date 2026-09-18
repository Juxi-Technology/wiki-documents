---
title: "Step 7: Training — pi0 Command"
description: "Train a pi0 policy from the base pretrained checkpoint on a cloud GPU, with the environment setup and the full training command."
---

# Step 7: Training — pi0 Command

## Before running

- **Environment**: first open an instance and upload the dataset as described in [Cloud GPU training environment setup](/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU), then come back to this page and carry out the two sections "Install the environment" and "Command line"
- **Dataset**: `--dataset.root=~/lerobot_my_dataset_shake_hands` in the command points to the handshake dataset collected in step 6. If you are training your own task, replace it with your own dataset name
- **Output directory**: if `--output_dir` already exists, first delete it with the `sudo rm -rf` line above, or use a new name
- **You can check the curves on wandb at any time during training**, see [View real-time training curves on wandb](/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Reference documentation

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## Recommended cloud GPU instance

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## Install the environment

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## Command line

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<username>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```

Training does not formally begin until about 20 minutes after the command line is started

The model archive is about 5 GB, and 7 GB after extraction

<RelatedProducts slugs="so-arm101" />
