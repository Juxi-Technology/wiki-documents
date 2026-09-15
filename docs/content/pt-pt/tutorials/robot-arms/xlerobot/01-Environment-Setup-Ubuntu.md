---
title: "Configuração (Ubuntu)"
description: "Configuração do ambiente XLeRobot no Ubuntu: instalação do Miniconda, alteração das fontes pip e conda e preparação do braço líder e seguidor."
---

# Configuração (Ubuntu)

O braço líder preto utiliza um adaptador de alimentação de 5V6A

O braço seguidor branco utiliza um adaptador de alimentação de 12V5A

## Instalar o Miniconda

https://www.anaconda.com/download

## Alterar a fonte do pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Alterar a fonte do conda

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

## Criar o ambiente virtual

```Shell
conda create -y -n lerobot python=3.12 -y
```

## Entrar no ambiente virtual

```Shell
conda activate lerobot
```

## Instalar o ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

Verifique se a instalação foi bem-sucedida

```Shell
ffmpeg
```

![Imagem 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/1.png)

![Imagem 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/2.png)

## Transferir o repositório de código oficial do LeRobot

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Instalar o repositório de código

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![Imagem 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/3.png)

![Imagem 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/4.png)

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

## Resultados da execução no computador com 4090

![Imagem 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/5.png)

![Imagem 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/6.png)

## Resultados da execução numa NVIDIA DGX Spark

![Imagem 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="xlerobot" />
