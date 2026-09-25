---
title: "Línea de comandos de entrenamiento-Diffusion"
description: "Comando lerobot-train para la política Diffusion sobre el SO-ARM101 de 7 ejes, con el enlace a la documentación oficial de referencia."
---

# Línea de comandos de entrenamiento\-Diffusion

## Documentación de referencia

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_diffusion\_README\.md

## Línea de comandos

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

El paquete comprimido del modelo Diffusion ocupa alrededor de 1 GB

