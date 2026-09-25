---
title: "Commande d'entraînement - Diffusion"
description: "Entraînez un modèle Diffusion sur le SO-ARM101 7-DOF : la ligne de commande lerobot-train complète, avec la documentation officielle de référence."
---

# Commande d'entraînement \- Diffusion

## Documentation de référence

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_diffusion\_README\.md

## Ligne de commande

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.streaming=false \
  --policy.type=diffusion \
  --output_dir=output_lerobot_train/shake/diffusion_a \
  --job_name=shake_diffusion_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=30000 \
  --batch_size=8
```

L'archive du modèle Diffusion fait environ 1 Go

