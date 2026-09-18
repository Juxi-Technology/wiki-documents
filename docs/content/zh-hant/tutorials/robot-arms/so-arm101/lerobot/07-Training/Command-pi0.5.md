---
title: "第七步:pi0.5 訓練命令列"
description: "本頁提供 pi0.5 演算法的訓練命令列，說明它是 pi0 的改良版本，並附上建議的雲端 GPU 規格。"
---

# 第七步:pi0.5 訓練命令列

## 執行之前

- **環境**：先按[雲GPU訓練環境配置](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)開通實例、把數據集傳上去，再回到本篇執行"安裝環境"和"命令列"兩節
- **數據集**：命令裡的 `--dataset.root=~/lerobot_my_dataset_shake_hands` 指向第六步採集的握手數據集。如果你訓練的是自己的任務，把它換成你自己的數據集名
- **輸出目錄**：`--output_dir` 如果已經存在，先用上面那條 `sudo rm -rf` 刪掉，或者換個新名字
- **訓練中隨時可以在 wandb 上看曲線**，見 [wandb查看實時訓練曲線](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## 參考文檔

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

https://www.pi.website/blog/pi05

## 推薦雲GPU實例

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/1.png)

## 安裝環境

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## 命令行

- 刪除之前訓練中斷的output下的檔案

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- 訓練

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

命令列執行20分鐘後，訓練才會正式開始

模型壓縮包5個G左右，解壓後7個G

<RelatedProducts slugs="so-arm101" />
