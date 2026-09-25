---
title: "本地Ubuntu訓練"
description: "本頁說明如何在裝有 NVIDIA 顯示卡的 Ubuntu 電腦上訓練 ACT 模型，包含數據集路徑與輸出目錄的設定重點。"
---

# 本地Ubuntu訓練

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- 注意

`\`前面只能有一個空格，後面不能有空格

`--dataset.split`默認為`train`，也就是用全量數據作為訓練集

數據集在本地，`--dataset.streaming`必須為`false`，因為數據集已經在本地，無需流式讀取

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
  --dataset.root=/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)



