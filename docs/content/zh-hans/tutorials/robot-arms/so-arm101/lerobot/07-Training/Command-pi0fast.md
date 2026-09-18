---
title: "第七步:训练模型——pi0fast 训练命令"
description: "pi0fast 训练命令:推理速度更快的 pi0fast 训练命令与推荐云 GPU 实例,并补充本地数据集需要加的参数。"
---

# 第七步:训练模型——pi0fast 训练命令

## 运行之前

- **环境**：先按[云GPU训练环境配置](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)开通实例、把数据集传上去，再回到本篇执行"安装环境"和"命令行"两节
- **数据集**：下面的训练命令没有写 `--dataset.root`，它会从 HuggingFace Hub 上拉取数据集，所以需要数据集已经上传到 Hub；如果数据集只在本地，请参考本篇末尾"之前的内容"那一段，补上 `--dataset.root=~/lerobot_my_dataset_shake_hands`
- **输出目录**：`--output_dir` 如果已经存在，先用上面那条 `sudo rm -rf` 删掉，或者换个新名字
- **训练中随时可以在 wandb 上看曲线**，见 [wandb查看实时训练曲线](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## 参考文档

https://huggingface.co/docs/lerobot/pi0fast

## Issue

https://github.com/huggingface/lerobot/pull/2203

## 推荐云GPU实例

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## 安装环境

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## 命令行

- 删除之前训练中断的output下的文件

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- 训练

```Shell
lerobot-train \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

## 之前的内容

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

运行后10分钟左右，训练才会正式开始

模型压缩包5个G左右，解压后7个G

<RelatedProducts slugs="so-arm101" />
