---
title: "Computador Mac"
description: "Instalação do ambiente LeRobot no macOS, incluindo as permissões de segurança necessárias, o Miniconda, o ambiente virtual, o ffmpeg e a verificação final."
---

# Computador Mac

O braço líder preto usa um adaptador de alimentação de 5V6A

O braço seguidor branco usa um adaptador de alimentação de 12V5A

## Dar permissões

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/1.png)

## Instalar o Miniconda

https://www\.anaconda\.com/download

## Mudar a fonte do pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Mudar a fonte do conda

```Shell
# Limpar a configuração .condarc existente (opcional, para evitar conflitos)
echo "" > ~/.condarc

# Escrever a configuração da fonte Tsinghua
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

# Limpar a cache para aplicar a configuração
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

Verificar se a instalação foi bem-sucedida

```Shell
ffmpeg
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/2.png)

## Descarregar o código do LeRobot

### Opção A: usar diretamente o código deste repositório (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opção B: descarregar o repositório de código oficial e substituir manualmente os ficheiros correspondentes

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Instalar o repositório de código

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/01-environment-setup/5.png)

## Verificar se a instalação foi bem-sucedida

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


