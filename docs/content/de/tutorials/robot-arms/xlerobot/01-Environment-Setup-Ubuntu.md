---
title: "Umgebung einrichten (Ubuntu)"
description: "XLeRobot-Umgebung unter Ubuntu einrichten: Miniconda installieren und pip- sowie conda-Paketquellen für schnellere Downloads umstellen."
---

# Umgebung einrichten (Ubuntu)

Der schwarze Leader-Arm verwendet ein 5V6A-Netzteil

Der weiße Follower-Arm verwendet ein 12V5A-Netzteil

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

## Virtuelle Umgebung aktivieren

```Shell
conda activate lerobot
```

## ffmpeg installieren

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

Überprüfen Sie, ob die Installation erfolgreich war

```Shell
ffmpeg
```

![Abb. 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/1.png)

![Abb. 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/2.png)

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

![Abb. 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/3.png)

![Abb. 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/4.png)

## Erfolgreiche Installation überprüfen

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## Ergebnisse der Ausführung auf dem 4090-Host

![Abb. 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/5.png)

![Abb. 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/6.png)

## Ergebnisse der Ausführung auf einem NVIDIA DGX Spark

![Abb. 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="xlerobot" />
