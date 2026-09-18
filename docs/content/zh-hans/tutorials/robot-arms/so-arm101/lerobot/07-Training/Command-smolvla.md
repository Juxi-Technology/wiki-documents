---
title: "第七步:训练模型——smolvla 训练命令"
description: "smolvla 训练命令:介绍基于预训练模型微调与从头训练两种方式,分别给出完整命令与额外依赖的安装方法。"
---

# 第七步:训练模型——smolvla 训练命令

## 运行之前

- **环境**：先按[云GPU训练环境配置](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)开通实例、把数据集传上去，注意 smolvla 需要额外装依赖，见下面的"安装环境"
- **数据集**：命令里的 `--dataset.root=~/lerobot_my_dataset_shake_hands` 指向第六步采集的握手数据集。如果你训练的是自己的任务，把它换成你自己的数据集名
- **两种训练方式**：基于预训练模型微调，效果通常更好、收敛更快；从头训练则不需要下载预训练权重，按需选择
- **训练中随时可以在 wandb 上看曲线**，见 [wandb查看实时训练曲线](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## 参考文档

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## 安装环境

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## 基于预训练模型微调（推荐）

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

## 从头训练

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

## 下载模型

smolvla模型压缩包大概1个G左右

<RelatedProducts slugs="so-arm101" />
