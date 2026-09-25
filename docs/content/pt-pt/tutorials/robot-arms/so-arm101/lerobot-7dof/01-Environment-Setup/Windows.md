---
title: "Computador Windows"
description: "Instalação do ambiente LeRobot no Windows através do Miniconda, substituição das fontes de pacotes predefinidas e verificação da instalação."
---

# Computador Windows

O braço líder preto usa um adaptador de alimentação de 5V6A

O braço seguidor branco usa um adaptador de alimentação de 12V5A

## Instalar o Miniconda

anaconda\.com/download/success

Ou clique diretamente nesta ligação para descarregar o pacote de instalação

https://repo\.anaconda\.com/miniconda/Miniconda3\-latest\-Windows\-x86\_64\.exe

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/2.png)

## Mudar a fonte do conda

```Shell
# Limpar primeiro a configuração de fontes existente (para evitar conflitos)
conda config --remove-key channels

# Substituir as fontes predefinidas do conda e as fontes de terceiros comuns pelo espelho Tsinghua
# Adicionar as fontes de pacotes predefinidas (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Adicionar as fontes de terceiros comuns
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Ativar a exibição da fonte de descarregamento; ao instalar pacotes será mostrado o endereço de descarregamento específico
conda config --set show_channel_urls yes

# Limpar a cache de índices para aplicar as novas fontes
conda clean -i

# Ver a configuração atual (verificar se as fontes foram adicionadas com sucesso)
conda config --show-sources
```

## Criar o ambiente virtual

```Shell
conda create -y -n lerobot python=3.12
```

## Ativar o ambiente virtual

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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## Descarregar o código do LeRobot

### Opção A: usar diretamente o código deste repositório (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opção B: descarregar o repositório de código oficial e substituir manualmente os ficheiros correspondentes

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Instalar o repositório de código

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/6.png)

## Verificar se a instalação foi bem-sucedida

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/7.png)


