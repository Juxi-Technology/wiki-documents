---
title: "训练命令行-pi0.5"
description: "pi0.5 训练命令:给出在 pi0 基础上改进的 pi0.5 训练命令与推荐云 GPU 实例,运行二十分钟后训练才会正式开始。"
---

# 训练命令行\-pi0\.5

## 参考文档

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

https://www\.pi\.website/blog/pi05

## 推荐云GPU实例

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## 安装环境

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## 命令行

- 删除之前训练中断的output下的文件

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- 训练

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

命令行运行20分钟后，训练才会正式开始

模型压缩包5个G左右，解压后7个G

