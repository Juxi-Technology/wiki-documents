---
title: "第七步:训练模型——pi0.5 训练命令"
description: "pi0.5 训练命令:给出在 pi0 基础上改进的 pi0.5 训练命令与推荐云 GPU 实例,运行二十分钟后训练才会正式开始。"
---

# 第七步:训练模型——pi0.5 训练命令

## 运行之前

- **环境**：先按[云GPU训练环境配置](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)开通实例、把数据集传上去，再回到本篇执行"安装环境"和"命令行"两节
- **数据集**：命令里的 `--dataset.root=~/lerobot_my_dataset_shake_hands` 指向第六步采集的握手数据集。如果你训练的是自己的任务，把它换成你自己的数据集名
- **输出目录**：`--output_dir` 如果已经存在，先用上面那条 `sudo rm -rf` 删掉，或者换个新名字
- **训练中随时可以在 wandb 上看曲线**，见 [wandb查看实时训练曲线](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## 参考文档

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

https://www.pi.website/blog/pi05

## 推荐云GPU实例

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/1.png)

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
    --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

命令行运行20分钟后，训练才会正式开始

模型压缩包5个G左右，解压后7个G

<RelatedProducts slugs="so-arm101" />
