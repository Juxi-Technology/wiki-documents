---
title: "Comando de treino-Diffusion"
description: "A linha de comando lerobot-train para a política Diffusion no SO-ARM101 de 7 eixos, com ligação à documentação oficial de referência."
---

# Comando de treino\-Diffusion

## Documentação de referência

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy\_diffusion\_README\.md

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

O pacote comprimido do modelo Diffusion tem cerca de 1 GB

