---
title: "Configuration de l'environnement d'entraînement sur cloud GPU"
description: "Préparez l'entraînement sur cloud GPU : choix de l'algorithme, instance Featurize, installation de l'environnement, transfert du jeu de données et wandb."
---

# Configuration de l'environnement d'entraînement sur cloud GPU

## Désactiver le proxy réseau de votre ordinateur

Sinon, la ligne de commande de Jupyter risque de ne pas s'ouvrir

## Se connecter à la plateforme de GPU cloud Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Rejoignez le groupe d'utilisateurs et dites au service client que vous êtes fan de Tongji Zihao pour recevoir un bon d'achat

## Lancer une instance de GPU cloud

## Installer et configurer l'environnement

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## Se connecter à wandb

```Shell
wandb login
Copier-coller la clé API, puis appuyer sur Entrée
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Monter le dataset

```Shell
Copier la commande de téléchargement de l'instance, par exemple :
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

Le dataset apparaît dans le répertoire `~`

## Modifier la fréquence de sauvegarde des poids (facultatif)

Ouvrez `lerobot/src/lerobot/configs/train.py`

Modifiez save\_freq de 20\_000 à 5\_000

Cela permet d'obtenir les fichiers de poids du modèle plus tôt dans l'entraînement



