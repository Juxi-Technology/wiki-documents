---
title: "第七步:WALL-OSS 訓練命令列"
description: "WALL-OSS(wall_x)訓練命令:安裝環境、載入預訓練權重的完整 lerobot-train 命令與參考文件,訓練產出的模型約 7.2G。"
---

# 第七步:WALL-OSS 訓練命令列

## 參考文件

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## 安裝環境

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## 訓練命令列

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

模型壓縮檔大約7.2G

<RelatedProducts slugs="so-arm101" />
