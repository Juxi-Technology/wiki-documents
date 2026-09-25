---
title: "Computer Ubuntu"
description: "Installazione di LeRobot su Ubuntu: ambiente virtuale Miniconda, configurazione dei mirror dei pacchetti, ffmpeg, repository ufficiale e verifica finale."
---

# Computer Ubuntu

Il braccio attivo nero utilizza un alimentatore 5V6A

Il braccio passivo bianco utilizza un alimentatore 12V5A

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
conda create -y -n lerobot python=3.12 -y
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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## Scaricare il codice di LeRobot

### Opzione A: usare direttamente il codice di questo repository (consigliato)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opzione B: scaricare il repository ufficiale e sostituire manualmente i file corrispondenti

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Installare il codice

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/4.png)

## Verificare che l'installazione sia riuscita

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## Risultati dell'esecuzione su una macchina 4090

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/6.png)

## Risultati dell'esecuzione su NVIDIA DGX Spark

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/7.png)



