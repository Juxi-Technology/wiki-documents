---
title: "Treinamento local no Ubuntu"
description: "Treine o modelo na própria máquina Ubuntu com placa NVIDIA: ajuste os caminhos do conjunto de dados e execute o treinamento com o algoritmo ACT e o wandb."
---

# Treinamento local no Ubuntu

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- Atenção

Antes do `\` só pode haver um espaço, e depois dele não pode haver espaço

`--dataset.split` tem como padrão `train`, ou seja, usar todos os dados como conjunto de treinamento

Quando o conjunto de dados está local, `--dataset.streaming` deve ser `false`, pois não é necessária leitura em streaming

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



