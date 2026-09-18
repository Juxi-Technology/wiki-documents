---
title: "第七步:本機 Ubuntu 訓練"
description: "本頁說明如何在裝有 NVIDIA 顯示卡的 Ubuntu 電腦上訓練 ACT 模型，包含數據集路徑與輸出目錄的設定重點。"
---

# 第七步:本機 Ubuntu 訓練

本篇適用於自己電腦上就有英偉達顯卡的情況，不需要雲GPU。

## 執行之前

- **環境**：按[第一步：安裝Lerobot環境](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu)裝好即可，本機訓練不用把數據集傳到別處
- **數據集**：下面的例子用的是第六步第一篇採集的抓橘子數據集 `lerobot_my_dataset_a`，路徑寫成了絕對路徑，請替換成你自己的使用者名
- **在 Mac 上訓練**：把命令裡的 `/home/<你的用户名>/` 換成 `/Users/<你的用户名>/`
- **輸出目錄**：`--output_dir` 如果已經存在，會直接報 `FileExistsError`，換個新目錄名，或者加 `--resume=true` 接著訓練

## 參考文檔

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- 注意

``前面只能有一個空格，後面不能有空格

數據集在本地時，`--dataset.streaming`必須為`false`，因為無需流式讀取

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
  --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a \
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
  
lerobot-train --dataset.repo_id=<用户名>/lerobot_my_dataset_a --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
