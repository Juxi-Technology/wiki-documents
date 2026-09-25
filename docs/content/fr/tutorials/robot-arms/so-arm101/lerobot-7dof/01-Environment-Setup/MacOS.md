---
title: "Ordinateur Mac"
description: "Installez sur Mac l'environnement LeRobot : Miniconda, autorisations du système, miroirs de paquets, ffmpeg et dépôt officiel du projet."
---

# Ordinateur Mac

Le bras maître noir utilise un adaptateur secteur 5V6A

Le bras esclave blanc utilise un adaptateur secteur 12V5A

## Accorder les permissions

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/1.png)

## Installer Miniconda

https://www\.anaconda\.com/download

## Changer la source de pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Changer la source de conda

```Shell
# Vider la configuration .condarc existante (facultatif, pour éviter les conflits)
echo "" > ~/.condarc

# Écrire la configuration du miroir de Tsinghua
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# Vider le cache pour appliquer la configuration
conda clean -i
```

## Créer un environnement virtuel

```Shell
conda create -y -n lerobot python=3.12
```

## Entrer dans l'environnement virtuel

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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/2.png)

## Télécharger le code LeRobot

### Option A : utiliser directement le code de ce dépôt (recommandé)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Option B : télécharger le dépôt de code officiel et remplacer manuellement les fichiers correspondants

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Installer le dépôt de code

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/01-environment-setup/5.png)

## Vérifier que l'installation a réussi

```Shell
lerobot-info

python

import lerobot
import torch
torch.cuda.is_available()
import scservo_sdk
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/6.png)



