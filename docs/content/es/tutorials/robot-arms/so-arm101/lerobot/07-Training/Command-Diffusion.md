---
title: "Paso 7: Comando de entrenamiento Diffusion"
description: "Comando lerobot-train completo para entrenar la política Diffusion en el SO-ARM101, con la documentación de referencia; el modelo entrenado ocupa aproximadamente 1 GB."
---

# Paso 7: Comando de entrenamiento Diffusion

## Documentación de referencia

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

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

El archivo del modelo Diffusion ocupa unos 1 GB

## Resultados mediocres: el brazo se mueve a tirones, no recomendado

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
