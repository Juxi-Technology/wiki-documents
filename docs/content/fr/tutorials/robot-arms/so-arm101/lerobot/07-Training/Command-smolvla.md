---
title: "Étape 7 : Commande d'entraînement smolvla"
description: "Entraînez SmolVLA sur cloud GPU, par fine-tuning du modèle pré-entraîné ou à partir de zéro, avec les commandes complètes et les dépendances à installer."
---

# Étape 7 : Commande d'entraînement smolvla

## Avant de commencer

- **Environnement** : commencez par suivre [Configuration de l'environnement d'entraînement sur cloud GPU](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) pour ouvrir une instance et y transférer le dataset ; notez que smolvla nécessite l'installation de dépendances supplémentaires, voir « Installation de l'environnement » ci-dessous
- **Dataset** : le `--dataset.root=~/lerobot_my_dataset_shake_hands` de la commande pointe vers le dataset de poignée de main collecté à la sixième étape. Si vous entraînez votre propre tâche, remplacez-le par le nom de votre propre dataset
- **Deux modes d'entraînement** : le fine-tuning à partir d'un modèle pré-entraîné donne généralement de meilleurs résultats et converge plus vite ; l'entraînement à partir de zéro ne nécessite pas de télécharger les poids pré-entraînés. À choisir selon vos besoins
- **Vous pouvez consulter les courbes sur wandb à tout moment pendant l'entraînement**, voir [Consulter les courbes d'entraînement en temps réel avec wandb](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentation de référence

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## Installation de l'environnement

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Fine-tuning à partir d'un modèle pré-entraîné (recommandé)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Entraînement à partir de zéro

```Shell
lerobot-train \
  --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Télécharger le modèle

L'archive du modèle smolvla fait environ 1 Go

<RelatedProducts slugs="so-arm101" />
