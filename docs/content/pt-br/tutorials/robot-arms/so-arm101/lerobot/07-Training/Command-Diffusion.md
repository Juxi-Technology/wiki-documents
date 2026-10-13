---
title: "Etapa 7: Comando de treinamento — Diffusion"
description: "Comando lerobot-train completo para treinar a policy Diffusion no SO-ARM101, com a documentação de referência; o modelo treinado tem cerca de 1 GB."
---

# Etapa 7: Comando de treinamento — Diffusion

## Documentação de referência

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

## Linha de comando

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

O arquivo do modelo Diffusion tem cerca de 1 GB

## Resultados medíocres: o braço se move aos solavancos, não recomendado

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
