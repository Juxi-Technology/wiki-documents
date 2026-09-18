---
title: "Schritt 1: LeRobot-Umgebung installieren (Ubuntu)"
description: "Richtet unter Ubuntu die LeRobot-Umgebung ein: Miniconda, Tsinghua-Spiegel, conda-Umgebung mit Python, ffmpeg und das offizielle LeRobot-Repository."
---

# Schritt 1: LeRobot-Umgebung installieren (Ubuntu)

Der schwarze Führungsarm verwendet ein 5V6A-Netzteil

Der weiße Folgearm verwendet ein 12V5A-Netzteil

## Miniconda installieren

https://www.anaconda.com/download

## pip-Quelle ändern

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda-Quelle ändern

```Shell
# Vorhandene .condarc-Konfiguration leeren (optional, um Konflikte zu vermeiden)
echo "" > ~/.condarc

# Tsinghua-Quellenkonfiguration schreiben
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

# Cache leeren, damit die Konfiguration wirksam wird
conda clean -i
```

## Virtuelle Umgebung erstellen

```Shell
conda create -y -n lerobot python=3.12 -y
```

## Virtuelle Umgebung betreten

```Shell
conda activate lerobot
```

## ffmpeg installieren

```Shell
conda install ffmpeg=7.1.1 -c conda-forge -y
```

Installation erfolgreich verifizieren

```Shell
ffmpeg
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## Offizielles LeRobot-Code-Repository herunterladen

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Code-Repository installieren

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/4.png)

## Installation erfolgreich verifizieren

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## Ergebnis der Ausführung auf dem 4090-Rechner

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/5.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/6.png)

## Ergebnis der Ausführung auf dem NVIDIA DGX Spark

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="so-arm101" />
