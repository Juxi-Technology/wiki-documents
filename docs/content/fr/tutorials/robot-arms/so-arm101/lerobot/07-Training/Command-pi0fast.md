---
title: "Étape 7 : Commande d'entraînement pi0fast"
description: "Lancez l'entraînement pi0fast pour une inférence plus rapide : dépendances spécifiques, commande complète et variante avec le jeu de données en local."
---

# Étape 7 : Commande d'entraînement pi0fast

## Avant de commencer

- **Environnement** : commencez par suivre [Configuration de l'environnement d'entraînement sur cloud GPU](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) pour ouvrir une instance et y transférer le dataset, puis revenez à cet article pour exécuter les deux sections « Installation de l'environnement » et « Ligne de commande »
- **Dataset** : la commande d'entraînement ci-dessous n'indique pas `--dataset.root`, elle récupérera le dataset depuis HuggingFace Hub ; il faut donc que le dataset ait déjà été téléversé vers le Hub. Si le dataset n'est qu'en local, reportez-vous au passage « Contenu précédent » à la fin de cet article et ajoutez `--dataset.root=~/lerobot_my_dataset_shake_hands`
- **Répertoire de sortie** : si `--output_dir` existe déjà, supprimez-le d'abord avec la commande `sudo rm -rf` ci-dessus, ou changez de nom
- **Vous pouvez consulter les courbes sur wandb à tout moment pendant l'entraînement**, voir [Consulter les courbes d'entraînement en temps réel avec wandb](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentation de référence

https://huggingface.co/docs/lerobot/pi0fast

## Issue

https://github.com/huggingface/lerobot/pull/2203

## Instance cloud GPU recommandée

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## Installation de l'environnement

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## Ligne de commande

- Supprimer les fichiers du répertoire output de l'entraînement précédent interrompu

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- Entraînement

```Shell
lerobot-train \
    --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi0_fast \
    --output_dir=output_lerobot_train/shake/pi0_fast_A \
    --job_name=shake_pi0_fast_A \
    --policy.pretrained_path=lerobot/pi0_fast_base \
    --policy.dtype=bfloat16 \
    --policy.gradient_checkpointing=true \
    --policy.chunk_size=10 \
    --policy.n_action_steps=10 \
    --policy.max_action_tokens=256 \
    --steps=50000 \
    --batch_size=8 \
    --policy.device=cuda \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project
```

## Contenu précédent

```Shell
lerobot-train \
  --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0_fast \
  --output_dir=output_lerobot_train/shake/pi0_fast_A \
  --job_name=shake_pi0_fast_A \
  --policy.pretrained_path=lerobot/pi0_fast_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```

L'entraînement ne commence réellement qu'environ 10 minutes après le lancement

L'archive du modèle fait environ 5 Go, et 7 Go une fois décompressée

<RelatedProducts slugs="so-arm101" />
