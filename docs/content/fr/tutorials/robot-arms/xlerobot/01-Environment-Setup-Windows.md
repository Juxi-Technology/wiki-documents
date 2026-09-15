---
title: "Ordinateur Windows"
description: "Le bras meneur noir utilise un adaptateur secteur 5V6A"
---

# Ordinateur Windows

Le bras meneur noir utilise un adaptateur secteur 5V6A

Le bras suiveur blanc utilise un adaptateur secteur 12V5A

## Installer Miniconda

anaconda.com/download/success

Ou cliquez directement sur ce lien pour télécharger le programme d'installation

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![Image 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/1.png)

![Image 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/2.png)

## Changer la source conda

```Shell
# 先清空原有源配置（避免冲突）
conda config --remove-key channels

# 将 conda 的默认源和常用第三方源替换为清华镜像
# 添加默认包源（main/r/msys2）
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 添加常用第三方源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# 开启显示下载源，安装包时会显示具体的下载地址
conda config --set show_channel_urls yes

# 清除索引缓存，使新源生效
conda clean -i

# 查看当前配置（验证源是否添加成功）
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

Vérifiez que l'installation a réussi

```Shell
ffmpeg
```

![Image 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/3.png)

![Image 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/4.png)

![Image 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/5.png)

## Télécharger LeRobot

- Téléchargez le dépôt de code officiel de LeRobot

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

![Image 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/6.png)

## Vérifier que l'installation a réussi

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![Image 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="xlerobot" />
