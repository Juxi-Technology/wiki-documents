---
title: "訓練命令行-pi0.5"
description: "本頁提供 pi0.5 演算法的訓練命令列，說明它是 pi0 的改良版本，並附上建議的雲端 GPU 規格。"
---

# 訓練命令行\-pi0\.5

## 參考文檔

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

https://www\.pi\.website/blog/pi05

## 推薦雲GPU實例

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## 安裝環境

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## 命令行

- 刪除之前訓練中斷的output下的文件

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- 訓練

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

命令行運行20分鐘後，訓練才會正式開始

模型壓縮包5個G左右，解壓後7個G

