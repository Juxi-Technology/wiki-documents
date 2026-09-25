---
title: "訓練命令行-pi0（效果最好）"
description: "本頁提供 pi0 演算法的訓練命令列，包含環境安裝方式，適合顯示卡資源充足、追求最佳效果的訓練。"
---

# 訓練命令行\-pi0（效果最好）

## 參考文檔

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

## 推薦雲GPU實例

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## 安裝環境

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## 命令行

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
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

命令行運行20分鐘後，訓練才會正式開始

模型壓縮包5個G左右，解壓後7個G



