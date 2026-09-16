---
title: "Configuração (macOS)"
description: "XLeRobot: configuração do ambiente no macOS, com permissões de porta, instalação do Miniconda e fontes de espelho."
---

# Configuração (macOS)

O braço líder preto usa um adaptador de energia de 5V6A

O braço seguidor branco usa um adaptador de energia de 12V5A

## Conceder permissões

![Imagem 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/1.png)

## Instalar o Miniconda

https://www.anaconda.com/download

## Trocar a fonte do pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Trocar a fonte do conda

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
conda create -y -n lerobot python=3.12
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

![Imagem 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/2.png)

## Baixar o LeRobot

- Baixar o repositório de código oficial do LeRobot

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Instalar o repositório de código

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![Imagem 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/3.png)

![Imagem 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/4.jpg)

## Verificar se a instalação foi bem-sucedida

```Shell
lerobot-info

python

import lerobot
import torch
torch.cuda.is_available()
import scservo_sdk
```

![Imagem 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/5.png)

![Imagem 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/6.png)

<RelatedProducts slugs="xlerobot" />
