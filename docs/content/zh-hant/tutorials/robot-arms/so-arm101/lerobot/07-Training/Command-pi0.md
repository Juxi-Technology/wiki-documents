---
title: "第七步:pi0 訓練命令列"
description: "本頁提供 pi0 演算法的訓練命令列，包含環境安裝方式，適合顯示卡資源充足、追求最佳效果的訓練。"
---

# 第七步:pi0 訓練命令列

## 執行之前

- **環境**：先按[雲GPU訓練環境配置](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)開通實例、把數據集傳上去，再回到本篇執行"安裝環境"和"命令列"兩節
- **數據集**：命令裡的 `--dataset.root=~/lerobot_my_dataset_shake_hands` 指向第六步採集的握手數據集。如果你訓練的是自己的任務，把它換成你自己的數據集名
- **輸出目錄**：`--output_dir` 如果已經存在，先用上面那條 `sudo rm -rf` 刪掉，或者換個新名字
- **訓練中隨時可以在 wandb 上看曲線**，見 [wandb查看實時訓練曲線](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## 參考文檔

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## 推薦雲GPU實例

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## 安裝環境

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## 命令行

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

命令列執行20分鐘後，訓練才會正式開始

模型壓縮包5個G左右，解壓後7個G

<RelatedProducts slugs="so-arm101" />
