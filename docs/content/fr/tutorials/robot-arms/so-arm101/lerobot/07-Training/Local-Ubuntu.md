---
title: "Étape 7 : Entraînement local sur Ubuntu"
description: "Entraînez un modèle ACT sur un ordinateur Ubuntu équipé d'une carte NVIDIA, avec les paramètres de la commande détaillés et le suivi des courbes wandb."
---

# Étape 7 : Entraînement local sur Ubuntu

Cet article s'applique au cas où votre ordinateur dispose déjà d'une carte graphique NVIDIA ; aucun cloud GPU n'est nécessaire.

## Avant de commencer

- **Environnement** : il suffit de l'installer en suivant [Première étape : installer l'environnement Lerobot](/fr/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu) ; pour l'entraînement local, inutile de transférer le dataset ailleurs
- **Dataset** : l'exemple ci-dessous utilise le dataset de saisie d'oranges `lerobot_my_dataset_a` collecté dans le premier article de la sixième étape, avec un chemin écrit en absolu ; remplacez-le par votre propre nom d'utilisateur
- **Entraînement sur Mac** : remplacez `/home/<nom-utilisateur>/` dans la commande par `/Users/<nom-utilisateur>/`
- **Répertoire de sortie** : si `--output_dir` existe déjà, une erreur `FileExistsError` sera directement signalée ; changez de nom de répertoire, ou ajoutez `--resume=true` pour poursuivre l'entraînement

## Documentation de référence

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- Remarque

Le caractère `` ne peut être précédé que d'un seul espace et ne doit être suivi d'aucun espace

Lorsque le dataset est en local, `--dataset.streaming` doit être `false`, car la lecture en flux n'est pas nécessaire

```Shell
lerobot-train \
  --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_a \
  --dataset.root=/home/<nom-utilisateur>/.cache/huggingface/lerobot/<nom-utilisateur>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_a --dataset.root=/home/<nom-utilisateur>/.cache/huggingface/lerobot/<nom-utilisateur>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
