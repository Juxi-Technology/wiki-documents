---
title: "Passo 7: Comando di addestramento Diffusion"
description: "Comando lerobot-train completo per addestrare la policy Diffusion sul SO-ARM101, con la documentazione di riferimento; il modello addestrato pesa circa 1 GB."
---

# Passo 7: Comando di addestramento Diffusion

## Documentazione di riferimento

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

## Riga di comando

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

L'archivio del modello Diffusion è di circa 1 GB

## Risultati mediocri: il braccio si muove a scatti, sconsigliato

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
