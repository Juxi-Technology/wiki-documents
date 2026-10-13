---
title: "Passo 7: Comando di addestramento WALL-OSS"
description: "Addestra la policy WALL-OSS (wall_x) sul SO-ARM101: installazione ambiente, comando lerobot-train completo con pesi pre-addestrati e modello di circa 7,2 GB."
---

# Passo 7: Comando di addestramento WALL-OSS

## Documentazione di riferimento

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## Installare l'ambiente

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## Riga di comando di addestramento

```Shell
python lerobot/src/lerobot/scripts/lerobot_train.py \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --policy.type=wall_x \
    --output_dir=~/output_lerobot_train/shake/wallx_A \
    --job_name=shake_wallx_a \
    --policy.pretrained_name_or_path=x-square-robot/wall-oss-flow \
    --policy.prediction_mode=diffusion \
    --policy.attn_implementation=eager \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project \
    --steps=30000 \
    --policy.device=cuda \
    --batch_size=8
```

L'archivio del modello è di circa 7.2G

<RelatedProducts slugs="so-arm101" />
