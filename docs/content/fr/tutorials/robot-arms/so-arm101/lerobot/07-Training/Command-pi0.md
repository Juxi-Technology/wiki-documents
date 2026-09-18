---
title: "Étape 7 : Commande d'entraînement pi0"
description: "Lancez l'entraînement pi0 sur cloud GPU : environnement logiciel dédié, modèle pré-entraîné, paramètres de mémoire et commande complète commentée."
---

# Étape 7 : Commande d'entraînement pi0

## Avant de commencer

- **Environnement** : commencez par suivre [Configuration de l'environnement d'entraînement sur cloud GPU](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) pour ouvrir une instance et y transférer le dataset, puis revenez à cet article pour exécuter les deux sections « Installation de l'environnement » et « Ligne de commande »
- **Dataset** : le `--dataset.root=~/lerobot_my_dataset_shake_hands` de la commande pointe vers le dataset de poignée de main collecté à la sixième étape. Si vous entraînez votre propre tâche, remplacez-le par le nom de votre propre dataset
- **Répertoire de sortie** : si `--output_dir` existe déjà, supprimez-le d'abord avec la commande `sudo rm -rf` ci-dessus, ou changez de nom
- **Vous pouvez consulter les courbes sur wandb à tout moment pendant l'entraînement**, voir [Consulter les courbes d'entraînement en temps réel avec wandb](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentation de référence

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## Instance cloud GPU recommandée

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## Installation de l'environnement

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## Ligne de commande

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
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

L'entraînement ne commence réellement que 20 minutes après le lancement de la ligne de commande

L'archive du modèle fait environ 5 Go, et 7 Go une fois décompressée

<RelatedProducts slugs="so-arm101" />
