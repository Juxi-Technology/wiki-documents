---
title: "第七步:SmolVLA 訓練命令列"
description: "本頁提供 SmolVLA 演算法的訓練命令列，包含基於預訓練模型微調與從頭訓練兩種方式，以及模型下載說明。"
---

# 第七步:SmolVLA 訓練命令列

## 執行之前

- **環境**：先按[雲GPU訓練環境配置](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)開通實例、把數據集傳上去，注意 smolvla 需要額外裝依賴，見下面的"安裝環境"
- **數據集**：命令裡的 `--dataset.root=~/lerobot_my_dataset_shake_hands` 指向第六步採集的握手數據集。如果你訓練的是自己的任務，把它換成你自己的數據集名
- **兩種訓練方式**：基於預訓練模型微調，效果通常更好、收斂更快；從頭訓練則不需要下載預訓練權重，按需選擇
- **訓練中隨時可以在 wandb 上看曲線**，見 [wandb查看實時訓練曲線](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## 參考文檔

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## 安裝環境

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## 基於預訓練模型微調（推薦）

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

## 從頭訓練

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

## 下載模型

smolvla模型壓縮包大概1個G左右

<RelatedProducts slugs="so-arm101" />
