---
title: "Étape 7 : Commande d'entraînement WALL-OSS"
description: "Entraînez la politique WALL-OSS (wall_x) sur le SO-ARM101 : installation de l'environnement, commande lerobot-train complète avec les poids pré-entraînés, et modèle d'environ 7,2 Go."
---

# Étape 7 : Commande d'entraînement WALL-OSS

## Documentation de référence

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/walloss.mdx

## Installer l'environnement

```Shell
cd lerobot
pip install -e ".[feetech,wallx]"
```

## Ligne de commande d'entraînement

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

L'archive du modèle fait environ 7.2G

<RelatedProducts slugs="so-arm101" />
