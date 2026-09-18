---
title: "Step 7: Training — pi0fast Command"
description: "Train a pi0fast policy on the cloud GPU with extra pi dependencies, plus chunk size and action token settings for faster inference."
---

# Step 7: Training — pi0fast Command

## Before running

- **Environment**: first open an instance and upload the dataset as described in [Cloud GPU training environment setup](/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU), then come back to this page and carry out the two sections "Install the environment" and "Command line"
- **Dataset**: the training command below does not include `--dataset.root`, so it will pull the dataset from the HuggingFace Hub, which means the dataset needs to have been uploaded to the Hub; if the dataset is only local, please refer to the "Previous content" paragraph at the end of this page and add `--dataset.root=~/lerobot_my_dataset_shake_hands`
- **Output directory**: if `--output_dir` already exists, first delete it with the `sudo rm -rf` line above, or use a new name
- **You can check the curves on wandb at any time during training**, see [View real-time training curves on wandb](/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Reference documentation

https://huggingface.co/docs/lerobot/pi0fast

## Issue

https://github.com/huggingface/lerobot/pull/2203

## Recommended cloud GPU instance

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Install the environment

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## Command line

- Delete the files under output from a previously interrupted training run

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- Train

```Shell
lerobot-train \
    --dataset.repo_id=<username>/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi0_fast \
    --output_dir=output_lerobot_train/shake/pi0_fast_A \
    --job_name=shake_pi0_fast_A \
    --policy.pretrained_path=lerobot/pi0_fast_base \
    --policy.dtype=bfloat16 \
    --policy.gradient_checkpointing=true \
    --policy.chunk_size=10 \
    --policy.n_action_steps=10 \
    --policy.max_action_tokens=256 \
    --steps=50000 \
    --batch_size=8 \
    --policy.device=cuda \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project
```

## Previous content

```Shell
lerobot-train \
  --dataset.repo_id=<username>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0_fast \
  --output_dir=output_lerobot_train/shake/pi0_fast_A \
  --job_name=shake_pi0_fast_A \
  --policy.pretrained_path=lerobot/pi0_fast_base \
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

Training does not formally begin until about 10 minutes after running

The model archive is about 5 GB, and 7 GB after extraction

<RelatedProducts slugs="so-arm101" />
