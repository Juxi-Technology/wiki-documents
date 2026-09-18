---
title: "Étape 7 : Environnement d'entraînement cloud GPU"
description: "Préparez l'entraînement sur cloud GPU : choix de l'algorithme, instance Featurize, installation de l'environnement, transfert du jeu de données et wandb."
---

# Étape 7 : Environnement d'entraînement cloud GPU

## Avant l'entraînement, lisez ceci en premier

Le dataset a déjà été collecté à la sixième étape ; il s'agit maintenant d'entraîner le modèle. Cette étape comporte trois choses, et cet article traite les deux premières :

1. **Préparer l'environnement d'entraînement** : ouvrir une instance sur une plateforme cloud GPU et installer LeRobot, ffmpeg, wandb, etc. (cet article)
2. **Transférer le dataset sur le cloud GPU** : les données collectées à la sixième étape se trouvent encore sur votre propre ordinateur (section « Monter le dataset » de cet article)
3. **Exécuter la commande d'entraînement** : comment choisir l'algorithme, comment régler les paramètres, voir les articles ci-dessous

## Dataset utilisé dans le tutoriel

Dans les commandes d'entraînement et d'inférence, le dataset utilisé est la **tâche de poignée de main `lerobot_my_dataset_shake_hands`** (c'est elle qui est présentée dans le troisième article de la sixième étape), et son chemin local est `~/lerobot_my_dataset_shake_hands`. Avant d'exécuter la commande d'entraînement, vérifiez que ce répertoire existe bien et que son nom est parfaitement identique.

Si vous souhaitez entraîner votre propre tâche, remplacez simplement toutes les occurrences de `lerobot_my_dataset_shake_hands` dans la commande par le nom de votre propre dataset.

## Comment choisir l'algorithme d'entraînement

| Algorithme | Documentation | Caractéristiques |
|---|---|---|
| ACT | [Ligne de commande d'entraînement-ACT](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | Recommandé pour débuter, modèle petit et entraînement rapide, des résultats visibles en une heure sur un seul GPU |
| SmolVLA | [Ligne de commande d'entraînement-smolvla](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | Recommandé pour progresser, fine-tuning possible à partir d'un modèle pré-entraîné |
| pi0 | [Ligne de commande d'entraînement-pi0](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | Meilleurs résultats, mais consommation de VRAM élevée et entraînement lent |
| pi0.5 | [Ligne de commande d'entraînement-pi0.5](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | Version améliorée de pi0 |
| pi0fast | [Ligne de commande d'entraînement-pi0fast](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | Inférence plus rapide |

Il est conseillé de commencer par dérouler tout le processus avec ACT, puis de passer à un autre algorithme une fois familiarisé.

## Après l'entraînement

- Pour téléverser le modèle entraîné sur Hugging Face (sauvegarde, changement de machine, partage avec quelqu'un d'autre), voir [Téléverser le modèle sur HuggingFace (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
- Pour télécharger le modèle en local sur votre ordinateur, voir [Obtenir les fichiers de poids du modèle](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)

## Entraînement sur la machine locale

Si votre ordinateur dispose lui-même d'une carte graphique NVIDIA, vous pouvez également vous passer du cloud GPU et entraîner directement sur la machine locale, voir [Entraînement sur Ubuntu local](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu).

## Désactiver le proxy réseau de votre ordinateur

Sinon, la ligne de commande de Jupyter risque de ne pas s'ouvrir

## Se connecter à la plateforme cloud GPU Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## Ouvrir une instance cloud GPU

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> Cliquez sur « JupyterLab » en bas ; il y a un bouton de téléversement en haut à gauche, où vous pouvez téléverser du code et le dataset
> 
> 

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

# Pas besoin d'installer si vous ne téléversez pas sur Huggingface et n'utilisez pas wandb
```

> Si le module training manque lors de l'installation du modèle, il faut l'installer en plus
> 
> `pip install -e ".[training]"`
> 
> 

## Se connecter à wandb

```Shell
wandb login
复制粘贴API Key，回车
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Monter le dataset

Première étape, compressez le dataset collecté à la sixième étape en un zip et téléversez-le dans la section « dataset » de la plateforme cloud GPU (il y a un bouton de téléversement en haut à gauche de JupyterLab). Après traitement par la plateforme, une commande de téléchargement vous sera fournie.

Deuxième étape, exécutez cette commande de téléchargement dans la ligne de commande de l'instance et décompressez :

```Shell
复制实例下载命令，类似：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

Le dataset apparaît dans le répertoire `~`.

Après décompression, vous pouvez vérifier avec `ls ~` que le nom du répertoire correspond exactement au `--dataset.root` de la commande d'entraînement (cet article et les suivants utilisent tous `~/lerobot_my_dataset_shake_hands`). Si la décompression crée un niveau de répertoire portant le même nom, par exemple `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`, déplacez le contenu du niveau interne vers l'extérieur, ou pointez directement `--dataset.root` vers le niveau réel.

## Modifier la fréquence de sauvegarde des poids (facultatif)

Ouvrez `lerobot/src/lerobot/configs/train.py`

Modifiez save_freq de 20_000 à 5_000

Cela permet d'obtenir les fichiers de poids du modèle plus tôt dans l'entraînement

<RelatedProducts slugs="so-arm101" />
