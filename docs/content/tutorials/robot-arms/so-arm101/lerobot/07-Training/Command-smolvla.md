---
title: "Step 7: Training — smolvla Command"
description: "Train a smolvla policy on the cloud GPU, either by fine-tuning the pretrained base model or starting completely from scratch."
---

# Step 7: Training — smolvla Command

## Before running

- **Environment**: first open an instance and upload the dataset as described in [Cloud GPU training environment setup](/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); note that smolvla requires extra dependencies, see "Install the environment" below
- **Dataset**: `--dataset.root=~/lerobot_my_dataset_shake_hands` in the command points to the handshake dataset collected in step 6. If you are training your own task, replace it with your own dataset name
- **Two training approaches**: fine-tuning from a pretrained model usually gives better results and faster convergence; training from scratch does not require downloading the pretrained weights. Choose as needed
- **You can check the curves on wandb at any time during training**, see [View real-time training curves on wandb](/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Reference documentation

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## Install the environment

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Fine-tuning from a pretrained model (recommended)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Training from scratch

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Download the model

The smolvla model archive is about 1 GB

<RelatedProducts slugs="so-arm101" />
