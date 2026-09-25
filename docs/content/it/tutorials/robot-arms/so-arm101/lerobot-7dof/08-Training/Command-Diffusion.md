---
title: "Comando di addestramento-Diffusion"
description: "Riga di comando lerobot-train per addestrare la policy Diffusion sul SO-ARM101 a 7DOF, con la documentazione ufficiale di riferimento."
---

# Comando di addestramento\-Diffusion

## Documentazione di riferimento

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_diffusion\_README\.md

## Comandi

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

L'archivio compresso del modello Diffusion è di circa 1 GB

