---
title: "Equipo Ubuntu"
description: "Aprende a instalar el entorno de LeRobot en Ubuntu: Miniconda, las fuentes de pip y conda, el entorno virtual, ffmpeg y el repositorio de código oficial."
---

# Equipo Ubuntu

El brazo líder negro utiliza un adaptador de corriente de 5V6A

El brazo seguidor blanco utiliza un adaptador de corriente de 12V5A

## Instalar Miniconda

https://www\.anaconda\.com/download

## Cambiar la fuente de pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Cambiar la fuente de conda

```Shell
# Vaciar la configuración original de .condarc (opcional, para evitar conflictos)
echo "" > ~/.condarc

# Escribir la configuración del espejo de Tsinghua
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

# Limpiar la caché para que la configuración surta efecto
conda clean -i
```

## Crear el entorno virtual

```Shell
conda create -y -n lerobot python=3.12 -y
```

## Entrar al entorno virtual

```Shell
conda activate lerobot
```

## Instalar ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

Verificar que la instalación se realizó correctamente

```Shell
ffmpeg
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## Descargar el código de LeRobot

### Opción A: usar directamente el código de este repositorio (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opción B: descargar el repositorio de código oficial y sustituir manualmente los archivos correspondientes

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Instalar el código

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/4.png)

## Verificar que la instalación se realizó correctamente

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## Resultados de ejecución en una máquina con 4090

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/6.png)

## Resultados de ejecución en una NVIDIA DGX Spark

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/7.png)



