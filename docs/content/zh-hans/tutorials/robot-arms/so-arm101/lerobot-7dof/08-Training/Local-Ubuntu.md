---
title: "本地Ubuntu训练"
description: "本地 Ubuntu 训练:适合电脑自带英伟达显卡的情况,以抓橘子数据集为例运行 ACT 训练命令,并说明数据集路径与输出目录注意事项。"
---

# 本地Ubuntu训练

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- 注意

`\`前面只能有一个空格，后面不能有空格

`--dataset.split`默认为`train`，也就是用全量数据作为训练集

数据集在本地，`--dataset.streaming`必须为`false`，因为数据集已经在本地，无需流式读取

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



