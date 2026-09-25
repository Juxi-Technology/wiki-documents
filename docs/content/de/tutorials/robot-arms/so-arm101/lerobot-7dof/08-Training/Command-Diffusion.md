---
title: "Trainingsbefehl-Diffusion"
description: "Der vollständige lerobot-train-Befehl für die Diffusion-Policy auf dem 7-DOF-SO-ARM101 samt offizieller Referenzdokumentation."
---

# Trainingsbefehl\-Diffusion

## Referenzdokumentation

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_diffusion\_README\.md

## Befehl

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

Das Archiv des Diffusion\-Modells umfasst etwa 1 GB

