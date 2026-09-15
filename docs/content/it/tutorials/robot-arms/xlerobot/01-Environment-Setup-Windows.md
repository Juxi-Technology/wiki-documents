---
title: "Configurazione (Windows)"
description: "Il braccio leader nero utilizza un adattatore di alimentazione 5V6A"
---

# Configurazione (Windows)

Il braccio leader nero utilizza un adattatore di alimentazione 5V6A

Il braccio follower bianco utilizza un adattatore di alimentazione 12V5A

## Installazione di Miniconda

anaconda.com/download/success

Oppure fare clic direttamente su questo link per scaricare il pacchetto di installazione

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![Immagine 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/1.png)

![Immagine 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/2.png)

## Cambio della sorgente di conda

```Shell
# 先清空原有源配置（避免冲突）
conda config --remove-key channels

# 将 conda 的默认源和常用第三方源替换为清华镜像
# 添加默认包源（main/r/msys2）
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 添加常用第三方源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# 开启显示下载源，安装包时会显示具体的下载地址
conda config --set show_channel_urls yes

# 清除索引缓存，使新源生效
conda clean -i

# 查看当前配置（验证源是否添加成功）
conda config --show-sources
```

## Creazione di un ambiente virtuale

```Shell
conda create -y -n lerobot python=3.12
```

## Attivazione dell'ambiente virtuale

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

![Immagine 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/3.png)

![Immagine 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/4.png)

![Immagine 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/5.png)

## Download di LeRobot

- Scaricare il repository ufficiale del codice LeRobot

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Installazione del repository del codice

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![Immagine 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/6.png)

## Verifica della corretta installazione

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![Immagine 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="xlerobot" />
