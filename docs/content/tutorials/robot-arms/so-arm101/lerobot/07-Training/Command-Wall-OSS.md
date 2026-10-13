---
title: "Step 7: Training — WALL-OSS Command"
description: "Train the WALL-OSS (wall_x) policy on the SO-ARM101: environment installation, the complete lerobot-train command with pretrained weights, and the ~7.2 GB model archive."
---

# Step 7: Training — WALL-OSS Command

## Reference Documentation

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## Install the Environment

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## Training Command Line

```Shell
python lerobot/src/lerobot/scripts/lerobot_train.py \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --policy.type=wall_x \
    --output_dir=~/output_lerobot_train/shake/wallx_A \
    --job_name=shake_wallx_a \
    --policy.pretrained_name_or_path=x-square-robot/wall-oss-flow \
    --policy.prediction_mode=diffusion \
    --policy.attn_implementation=eager \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project \
    --steps=30000 \
    --policy.device=cuda \
    --batch_size=8
```

The model archive is about 7.2G

<RelatedProducts slugs="so-arm101" />
