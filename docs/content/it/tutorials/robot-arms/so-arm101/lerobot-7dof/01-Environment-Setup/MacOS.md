---
title: "Computer Mac"
description: "Installazione di LeRobot su Mac: autorizzazioni di sistema, Miniconda, configurazione dei mirror, ambiente virtuale, ffmpeg e verifica dei pacchetti."
---

# Computer Mac

Il braccio attivo nero utilizza un alimentatore 5V6A

Il braccio passivo bianco utilizza un alimentatore 12V5A

## Concedere le autorizzazioni

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/1.png)

## Installare Miniconda

https://www\.anaconda\.com/download

## Cambiare il mirror di pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Cambiare il mirror di conda

```Shell
# Svuota la configurazione .condarc esistente (opzionale, per evitare conflitti)
echo "" > ~/.condarc

# Scrivi la configurazione del mirror di Tsinghua
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

# Cancella la cache per rendere effettiva la configurazione
conda clean -i
```

## Creare l'ambiente virtuale

```Shell
conda create -y -n lerobot python=3.12
```

## Entrare nell'ambiente virtuale

```Shell
conda activate lerobot
```

## Installare ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

Verificare che l'installazione sia riuscita

```Shell
ffmpeg
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/2.png)

## Scaricare il codice di LeRobot

### Opzione A: usare direttamente il codice di questo repository (consigliato)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opzione B: scaricare il repository ufficiale e sostituire manualmente i file corrispondenti

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Installare il repository del codice

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/01-environment-setup/5.png)

## Verificare che l'installazione sia riuscita

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



