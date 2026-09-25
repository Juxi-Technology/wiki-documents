---
title: "ローカルUbuntuでの訓練"
description: "NVIDIAグラフィックスカードを搭載したパソコンで、収集済みのデータセットを使いローカルUbuntu上でモデルを訓練する手順です。"
---

# ローカルUbuntuでの訓練

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- 注意

`\`の前にはスペースを 1 つだけ入れ、後ろにはスペースを入れてはいけません

`--dataset.split`はデフォルトで`train`、つまり全量データを訓練セットとして使用します

データセットがローカルにある場合、`--dataset.streaming`は`false`でなければなりません。データセットがすでにローカルにあり、ストリーミング読み込みが不要だからです

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



