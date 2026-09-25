---
title: "Equipo Windows"
description: "Instala el entorno de LeRobot en Windows: Miniconda, el cambio de las fuentes de conda, el entorno virtual, ffmpeg y la descarga del repositorio oficial."
---

# Equipo Windows

El brazo líder negro utiliza un adaptador de corriente de 5V6A

El brazo seguidor blanco utiliza un adaptador de corriente de 12V5A

## Instalar Miniconda

anaconda\.com/download/success

O haz clic directamente en este enlace para descargar el paquete de instalación

https://repo\.anaconda\.com/miniconda/Miniconda3\-latest\-Windows\-x86\_64\.exe

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/2.png)

## Cambiar la fuente de conda

```Shell
# Primero vaciar la configuración de fuentes original (para evitar conflictos)
conda config --remove-key channels

# Reemplazar las fuentes predeterminadas de conda y las fuentes de terceros habituales por el espejo de Tsinghua
# Añadir las fuentes de paquetes predeterminadas (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Añadir fuentes de terceros habituales
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Activar la visualización de la fuente de descarga; al instalar paquetes se muestra la dirección de descarga concreta
conda config --set show_channel_urls yes

# Limpiar la caché de índices para que la nueva fuente surta efecto
conda clean -i

# Ver la configuración actual (verificar si la fuente se añadió correctamente)
conda config --show-sources
```

## Crear el entorno virtual

```Shell
conda create -y -n lerobot python=3.12
```

## Activar el entorno virtual

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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## Descargar el código de LeRobot

### Opción A: usar directamente el código de este repositorio (recomendado)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Opción B: descargar el repositorio de código oficial y sustituir manualmente los archivos correspondientes

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Instalar el repositorio de código

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/6.png)

## Verificar que la instalación se realizó correctamente

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/7.png)



