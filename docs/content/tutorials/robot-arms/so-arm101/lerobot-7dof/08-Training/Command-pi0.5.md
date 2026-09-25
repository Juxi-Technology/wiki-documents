---
title: "Training Command Line - pi0.5"
description: "Train a pi05 policy from the base pretrained checkpoint on a cloud GPU, with the extra dependencies and the full command line."
---

# Training Command Line \- pi0\.5

## Reference documentation

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

https://www\.pi\.website/blog/pi05

## Recommended cloud GPU instance

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Install the environment

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## Command line

- Delete the files under output from a previously interrupted training run

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- Train

```Shell
lerobot-train \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi05 \
    --output_dir=~/output_lerobot_train/shake/pi05_A \
    --job_name=shake_pi05_A \
    --policy.pretrained_path=lerobot/pi05_base \
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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

Training does not formally begin until about 20 minutes after the command line is started

The model archive is about 5 GB, and 7 GB after extraction

