---
title: "Computador Windows"
description: "Instale o ambiente LeRobot no Windows: Miniconda, espelhos de download de pacotes, ambiente virtual, ffmpeg e verificação da instalação com PyTorch e scservo."
---

# Computador Windows

O braço líder preto usa um adaptador de alimentação 5V6A

O braço seguidor branco usa um adaptador de alimentação 12V5A

## Instalar o Miniconda

anaconda\.com/download/success

Ou clique diretamente neste link para baixar o pacote de instalação

https://repo\.anaconda\.com/miniconda/Miniconda3\-latest\-Windows\-x86\_64\.exe

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/2.png)

## Trocar o espelho do conda

```Shell
# Primeiro limpar a configuração de espelhos existente (para evitar conflitos)
conda config --remove-key channels

# Substituir os espelhos padrão e os espelhos de terceiros mais usados do conda pelo espelho da Tsinghua
# Adicionar os espelhos de pacotes padrão (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Adicionar espelhos de terceiros mais usados
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Ativar a exibição do espelho de download, para que o endereço de download específico seja exibido ao instalar pacotes
conda config --set show_channel_urls yes

# Limpar o cache de índices para que os novos espelhos entrem em vigor
conda clean -i

# Visualizar a configuração atual (para verificar se os espelhos foram adicionados com sucesso)
conda config --show-sources
```

## Criar um ambiente virtual

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

## Baixar o código do LeRobot

### Opção A: usar diretamente o código deste repositório (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opção B: baixar o repositório de código oficial e substituir manualmente os arquivos correspondentes

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



