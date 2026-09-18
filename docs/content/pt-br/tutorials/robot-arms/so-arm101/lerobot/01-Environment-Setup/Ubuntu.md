---
title: "Etapa 1: Instalação do ambiente LeRobot (Ubuntu)"
description: "Instale o ambiente LeRobot no Ubuntu: Miniconda, espelhos de download de pacotes, ambiente virtual, ffmpeg e verificação final da instalação com GPU NVIDIA."
---

# Etapa 1: Instalação do ambiente LeRobot (Ubuntu)

O braço líder preto usa um adaptador de alimentação 5V6A

O braço seguidor branco usa um adaptador de alimentação 12V5A

## Instalar o Miniconda

https://www.anaconda.com/download

## Trocar o espelho do pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Trocar o espelho do conda

```Shell
# Limpar a configuração existente do .condarc (opcional, para evitar conflitos)
echo "" > ~/.condarc

# Escrever a configuração do espelho da Tsinghua
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

# Limpar o cache para aplicar a configuração
conda clean -i
```

## Criar um ambiente virtual

```Shell
conda create -y -n lerobot python=3.12 -y
```

## Entrar no ambiente virtual

```Shell
conda activate lerobot
```

## Instalar o ffmpeg

```Shell
conda install ffmpeg=7.1.1 -c conda-forge -y
```

Verificar se a instalação foi bem-sucedida

```Shell
ffmpeg
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## Baixar o repositório de código oficial do LeRobot

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Instalar o repositório de código

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/4.png)

## Verificar se a instalação foi bem-sucedida

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## Resultados de execução em uma máquina com 4090

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/5.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/6.png)

## Resultados de execução em um NVIDIA DGX Spark

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="so-arm101" />
