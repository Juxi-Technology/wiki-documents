---
title: "Configuración (Windows)"
description: "Configuración del entorno XLeRobot en Windows: instalación de Miniconda, configuración de las fuentes de conda y creación del entorno virtual Python."
---

# Configuración (Windows)

El brazo motriz negro utiliza un adaptador de alimentación de 5V6A

El brazo seguidor blanco utiliza un adaptador de alimentación de 12V5A

## Instalar Miniconda

anaconda.com/download/success

O haga clic directamente en este enlace para descargar el instalador

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![Imagen 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/1.png)

![Imagen 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/2.png)

## Cambiar la fuente de conda

```Shell
# Vaciar primero la configuración de fuentes original (para evitar conflictos)
conda config --remove-key channels

# Sustituir las fuentes predeterminadas de conda y las fuentes de terceros habituales por el espejo de Tsinghua
# Añadir las fuentes de paquetes predeterminadas (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Añadir las fuentes de terceros habituales
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Activar la visualización de la fuente de descarga; al instalar paquetes se muestra la dirección de descarga concreta
conda config --set show_channel_urls yes

# Limpiar la caché de índices para aplicar las nuevas fuentes
conda clean -i

# Ver la configuración actual (comprobar si las fuentes se añadieron correctamente)
conda config --show-sources
```

## Crear un entorno virtual

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

Verifique que la instalación se haya realizado correctamente

```Shell
ffmpeg
```

![Imagen 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/3.png)

![Imagen 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/4.png)

![Imagen 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/5.png)

## Descargar LeRobot

- Descargue el repositorio de código oficial de LeRobot

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

![Imagen 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/6.png)

## Verificar la instalación correcta

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![Imagen 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="xlerobot" />
