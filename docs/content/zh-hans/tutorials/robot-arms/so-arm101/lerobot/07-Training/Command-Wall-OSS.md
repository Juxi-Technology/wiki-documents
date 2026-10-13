---
title: "第七步:训练模型——WALL-OSS 训练命令"
description: "WALL-OSS(wall_x)训练命令:安装环境、加载预训练权重的完整 lerobot-train 命令与参考文档,训练产出的模型约 7.2G。"
---

# 第七步:训练模型——WALL-OSS 训练命令

## 参考文档

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## 安装环境

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## 训练命令行

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

模型压缩包大约7.2G

<RelatedProducts slugs="so-arm101" />
