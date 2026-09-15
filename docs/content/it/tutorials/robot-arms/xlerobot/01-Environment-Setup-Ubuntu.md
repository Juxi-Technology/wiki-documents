---
title: "Computer Ubuntu"
description: "Il braccio leader nero utilizza un adattatore di alimentazione 5V6A"
---

# Computer Ubuntu

Il braccio leader nero utilizza un adattatore di alimentazione 5V6A

Il braccio follower bianco utilizza un adattatore di alimentazione 12V5A

## Installazione di Miniconda

https://www.anaconda.com/download

## Cambio della sorgente di pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Cambio della sorgente di conda

```Shell
# 清空原有 .condarc 配置（可选，避免冲突）
echo "" > ~/.condarc

# 写入清华源配置
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

# 清除缓存使配置生效
conda clean -i
```

## Creazione di un ambiente virtuale

```Shell
conda create -y -n lerobot python=3.12 -y
```

## Accesso all'ambiente virtuale

```Shell
conda activate lerobot
```

## Installazione di ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

Verifica della corretta installazione

```Shell
ffmpeg
```

![Immagine 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/1.png)

![Immagine 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/2.png)

## Download del repository ufficiale del codice LeRobot

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Installazione del repository del codice

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![Immagine 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/3.png)

![Immagine 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/4.png)

## Verifica della corretta installazione

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## Risultati dell'esecuzione sull'host 4090

![Immagine 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/5.png)

![Immagine 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/6.png)

## Risultati dell'esecuzione su NVIDIA DGX Spark

![Immagine 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/7.png)



