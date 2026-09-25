---
title: "Entraînement local sur Ubuntu"
description: "Entraînez un modèle ACT sur un ordinateur Ubuntu équipé d'une carte NVIDIA, avec les paramètres de la commande détaillés et le suivi des courbes wandb."
---

# Entraînement local sur Ubuntu

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

- Remarque

`\` ne peut être précédé que d'un seul espace et ne doit être suivi d'aucun espace

`--dataset.split` vaut par défaut `train`, c'est-à-dire utiliser toutes les données comme ensemble d'entraînement

Le dataset étant en local, `--dataset.streaming` doit être `false`, car le dataset est déjà en local et la lecture en flux n'est pas nécessaire

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



