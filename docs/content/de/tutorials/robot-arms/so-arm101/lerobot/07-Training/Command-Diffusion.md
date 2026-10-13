---
title: "Schritt 7: Trainingsbefehl für Diffusion"
description: "Vollständiger lerobot-train-Befehl zum Trainieren der Diffusion-Policy auf dem SO-ARM101, mit Referenzdokumentation; das trainierte Modell ist etwa 1 GB groß."
---

# Schritt 7: Trainingsbefehl für Diffusion

## Referenzdokumentation

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_diffusion_README.md

## Kommandozeile

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

Das Diffusion-Modellarchiv ist etwa 1 GB groß

## Mittelmäßige Ergebnisse: Der Arm bewegt sich ruckartig, nicht empfohlen

[wx_camera_1768547494388.mp4](/downloads/wx_camera_1768547494388.mp4)

[wx_camera_1768551529764.mp4](/downloads/wx_camera_1768551529764.mp4)

<RelatedProducts slugs="so-arm101" />
