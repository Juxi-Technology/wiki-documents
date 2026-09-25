---
title: "训练命令行-smolvla（推荐进阶）"
description: "smolvla 训练命令:介绍基于预训练模型微调与从头训练两种方式,分别给出完整命令与额外依赖的安装方法。"
---

# 训练命令行\-smolvla（推荐进阶）

## 参考文档

https://huggingface\.co/docs/lerobot/smolvla

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_smolvla\_README\.md

## 安装环境

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## 基于预训练模型微调（推荐）

```Shell
lerobot-train \
  *--policy.path*=lerobot/smolvla_base \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
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

## 从头训练

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
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

## 下载模型

smolvla模型压缩包大概1个G左右



