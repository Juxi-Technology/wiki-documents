---
title: "Configuração (Windows)"
description: "XLeRobot: configuração do ambiente no Windows, com instalação do Miniconda e ajuste das fontes de espelho do conda."
---

# Configuração (Windows)

O braço líder preto usa um adaptador de energia de 5V6A

O braço seguidor branco usa um adaptador de energia de 12V5A

## Instalar o Miniconda

anaconda.com/download/success

Ou clique diretamente neste link para baixar o pacote de instalação

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![Imagem 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/1.png)

![Imagem 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/2.png)

## Trocar a fonte do conda

```Shell
# Limpar primeiro a configuração de fontes existente (para evitar conflitos)
conda config --remove-key channels

# Substituir as fontes padrão do conda e as fontes de terceiros comuns pelo espelho da Tsinghua
# Adicionar as fontes de pacotes padrão (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Adicionar fontes de terceiros comuns
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Ativar a exibição da fonte de download; ao instalar pacotes, o endereço de download específico será exibido
conda config --set show_channel_urls yes

# Limpar o cache de índice para aplicar as novas fontes
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

Verifique se a instalação foi bem-sucedida

```Shell
ffmpeg
```

![Imagem 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/3.png)

![Imagem 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/4.png)

![Imagem 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/5.png)

## Baixar o LeRobot

- Baixar o repositório de código oficial do LeRobot

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

![Imagem 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/6.png)

## Verificar se a instalação foi bem-sucedida

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![Imagem 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="xlerobot" />
