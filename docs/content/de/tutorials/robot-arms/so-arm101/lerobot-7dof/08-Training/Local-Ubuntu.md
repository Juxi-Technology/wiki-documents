---
title: "Lokales Training unter Ubuntu"
description: "Erklärt das lokale Training mit eigener NVIDIA-Grafikkarte unter Ubuntu: Voraussetzungen, der Trainingsbefehl mit dem ACT-Algorithmus und der Ausgabepfad."
---

# Lokales Training unter Ubuntu

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- Hinweis

Vor dem Zeichen `\` darf nur ein Leerzeichen stehen, danach darf kein Leerzeichen folgen

`--dataset.split` ist standardmäßig `train`, d. h. alle Daten werden als Trainingssatz verwendet

Wenn der Datensatz lokal vorliegt, muss `--dataset.streaming` auf `false` gesetzt sein, da der Datensatz bereits lokal liegt und kein Stream\-Reading erforderlich ist

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



