---
title: "Étape 7 : Commande d'entraînement ACT"
description: "La commande d'entraînement ACT commentée en détail : jeu de données de poignée de main, rôle de chaque paramètre, et pourquoi ACT convient pour débuter."
---

# Étape 7 : Commande d'entraînement ACT

## Avant de commencer

- **Environnement** : il faut d'abord installer l'environnement et transférer le dataset sur le cloud GPU en suivant [Configuration de l'environnement d'entraînement sur cloud GPU](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU). ACT est fourni d'origine avec l'environnement de base de LeRobot, aucune installation supplémentaire n'est nécessaire
- **Dataset** : le `--dataset.root=~/lerobot_my_dataset_shake_hands` de la commande pointe vers le dataset de poignée de main collecté à la sixième étape. Si vous entraînez votre propre tâche, remplacez-le par le nom de votre propre dataset
- **Répertoire de sortie** : si `--output_dir` existe déjà, une erreur `FileExistsError` sera directement signalée ; changez de nom de répertoire, ou ajoutez `--resume=true` pour poursuivre l'entraînement
- **Vous pouvez consulter les courbes sur wandb à tout moment pendant l'entraînement**, voir [Consulter les courbes d'entraînement en temps réel avec wandb](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentation de référence

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act.mdx

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

## Pourquoi commencer par l'algorithme ACT

ACT est le premier modèle le plus recommandé à entraîner pour débuter avec LeRobot ; voici ses avantages :

- Le modèle est très léger, avec seulement quatre-vingts millions de paramètres apprenables

- La convergence de l'entraînement est très rapide, et l'inférence l'est aussi

- Une heure d'entraînement sur un seul GPU suffit pour voir des résultats

- Le modèle ACT lui-même est très petit, l'archive fait environ 200 Mo, ce qui le rend très facile à stocker et à transférer. L'archive du modèle produit par l'entraînement fait environ 300 Mo (voir la fin de cet article)

- Collecter environ 30 épisodes de données suffit généralement

- Peut être déployé et exécuté en inférence sur un hôte Ubuntu, un ordinateur Mac, un ordinateur Windows, et même un Raspberry Pi

- Les résultats d'inférence sur un robot réel sont plutôt bons, amplement suffisants pour des tâches simples comme saisir, serrer la main ou poser un stylo

- L'environnement de base de la bibliothèque LeRobot inclut déjà l'algorithme ACT, aucune autre bibliothèque n'est à installer

## Ligne de commande

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## Description de la ligne de commande

Le caractère de continuation `` ne peut être précédé que d'un seul espace et ne doit être suivi d'aucun espace

|Paramètre de ligne de commande|Description|
|---|---|
|--dataset.repo_id|Repo_ID du dataset HuggingFace, de la forme `nom_utilisateur/nom_dataset`|
|--dataset.root|Chemin local du dataset. Lorsque le dataset a déjà été téléchargé en local, il faut pointer vers le répertoire réel|
|--dataset.revision|Version du dataset, spécifiée lors du téléversement du dataset sur HuggingFace|
|--dataset.streaming|Indique si la lecture se fait en flux. Lorsque le dataset est en local, il faut la définir à `false`, car la lecture en flux n'est pas nécessaire|
|--policy.type|Algorithme à entraîner, par exemple act, smolvla, diffusion, pi0, pi05, pi0_fast, wall_x|
|--output_dir|Répertoire où sont enregistrées les sorties de l'entraînement|
|--job_name|Nom de cette tâche d'entraînement|
|--policy.device|Périphérique de calcul|
|--wandb.enable|Active la visualisation wandb|
|--wandb.project|Nom du projet wandb|
|--policy.push_to_hub|Envoie le modèle entraîné vers le cloud HuggingFace|
|--steps|Nombre de steps d'entraînement|
|--batch_size|Quantité de données entrée par step ; si la VRAM est insuffisante, il faut la réduire|

## Processus d'entraînement

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

L'archive du modèle fait environ 300 Mo

<RelatedProducts slugs="so-arm101" />
