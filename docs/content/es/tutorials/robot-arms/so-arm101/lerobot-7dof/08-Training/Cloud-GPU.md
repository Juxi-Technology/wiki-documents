---
title: "Configuración del entorno de entrenamiento con GPU en la nube"
description: "Prepara el entorno de entrenamiento en una GPU en la nube: abrir la instancia en Featurize, instalar LeRobot, ffmpeg y wandb, y montar el conjunto de datos."
---

# Configuración del entorno de entrenamiento con GPU en la nube

## Desactivar el proxy de red de tu ordenador

De lo contrario puede que no se abra la línea de comandos de Jupyter

## Iniciar sesión en la plataforma de GPU en la nube Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Únete al grupo de usuarios y dile al servicio de atención al cliente que eres seguidor de Tongji Zihao para reclamar un cupón

## Abrir una instancia de GPU en la nube

## Instalar y configurar el entorno

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## Iniciar sesión en wandb

```Shell
wandb login
Copia y pega la API Key, pulsa Intro
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montar el conjunto de datos

```Shell
Copia el comando de descarga de la instancia, similar a:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

El conjunto de datos aparece en el directorio `~`

## Modificar la frecuencia de guardado de pesos (opcional)

Abre `lerobot/src/lerobot/configs/train.py`

Cambia save\_freq de 20\_000 a 5\_000

Así podrás obtener el archivo de pesos del modelo en una fase más temprana del entrenamiento



