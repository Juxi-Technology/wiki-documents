---
title: "Ordinateur Windows"
description: "Installez sous Windows l'environnement LeRobot : Miniconda, miroirs de paquets, environnement virtuel, ffmpeg et récupération du dépôt officiel du projet."
---

# Ordinateur Windows

Le bras maître noir utilise un adaptateur secteur 5V6A

Le bras esclave blanc utilise un adaptateur secteur 12V5A

## Installer Miniconda

anaconda\.com/download/success

Ou cliquez directement sur ce lien pour télécharger le paquet d'installation

https://repo\.anaconda\.com/miniconda/Miniconda3\-latest\-Windows\-x86\_64\.exe

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/2.png)

## Changer la source de conda

```Shell
# Vider d'abord la configuration de source existante (pour éviter les conflits)
conda config --remove-key channels

# Remplacer la source par défaut de conda et les sources tierces courantes par le miroir de Tsinghua
# Ajouter les sources de paquets par défaut (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Ajouter les sources tierces courantes
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Activer l'affichage de la source de téléchargement ; lors de l'installation, l'adresse de téléchargement précise s'affichera
conda config --set show_channel_urls yes

# Vider le cache d'index pour appliquer la nouvelle source
conda clean -i

# Consulter la configuration actuelle (vérifier que la source a bien été ajoutée)
conda config --show-sources
```

## Créer un environnement virtuel

```Shell
conda create -y -n lerobot python=3.12
```

## Activer l'environnement virtuel

```Shell
conda activate lerobot
```

## Installer ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

Vérifier que l'installation a réussi

```Shell
ffmpeg
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## Télécharger le code LeRobot

### Option A : utiliser directement le code de ce dépôt (recommandé)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Option B : télécharger le dépôt de code officiel et remplacer manuellement les fichiers correspondants

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Installer le dépôt de code

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/6.png)

## Vérifier que l'installation a réussi

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/7.png)



