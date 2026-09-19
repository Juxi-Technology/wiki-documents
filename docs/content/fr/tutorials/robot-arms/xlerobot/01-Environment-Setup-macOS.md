---
title: "Configuration (macOS)"
description: "Configuration de l'environnement XLeRobot sous macOS : accorder les autorisations système, installer Miniconda et créer l'environnement virtuel LeRobot."
---

# Configuration (macOS)

Le bras meneur noir utilise un adaptateur secteur 5V6A

Le bras suiveur blanc utilise un adaptateur secteur 12V5A

## Accorder les autorisations

![Image 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/1.png)

## Installer Miniconda

https://www.anaconda.com/download

## Changer la source pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Changer la source conda

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

Vérifiez que l'installation a réussi

```Shell
ffmpeg
```

![Image 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/2.png)

## Télécharger LeRobot

- Téléchargez le dépôt de code officiel de LeRobot

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Installer le dépôt de code

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![Image 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/3.png)

![Image 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/4.jpg)

## Vérifier que l'installation a réussi

```Shell
lerobot-info

python

import lerobot
import torch
torch.cuda.is_available()
import scservo_sdk
```

![Image 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/5.png)

![Image 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/6.png)

<RelatedProducts slugs="xlerobot" />
