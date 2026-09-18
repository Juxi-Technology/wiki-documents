---
title: "Paso 7: Entorno de entrenamiento con GPU en la nube"
description: "Prepara el entorno de entrenamiento en una GPU en la nube: abrir la instancia en Featurize, instalar LeRobot, ffmpeg y wandb, y montar el conjunto de datos."
---

# Paso 7: Entorno de entrenamiento con GPU en la nube

## Antes de entrenar, lee esto

El conjunto de datos ya se ha recogido en el sexto paso; lo siguiente es entrenar el modelo. Este paso incluye tres cosas, y este artículo se encarga de las dos primeras:

1. **Preparar el entorno de entrenamiento**: abrir una instancia en una plataforma de GPU en la nube e instalar LeRobot, ffmpeg, wandb, etc. (este artículo)
2. **Subir el conjunto de datos a la GPU en la nube**: los datos recogidos en el sexto paso siguen en tu propio ordenador (sección "Montar el conjunto de datos" de este artículo)
3. **Ejecutar el comando de entrenamiento**: cómo elegir el algoritmo y ajustar los parámetros, consulta los artículos siguientes

## Conjunto de datos usado en el tutorial

En los comandos de entrenamiento e inferencia, el conjunto de datos que se usa es la **tarea de dar la mano `lerobot_my_dataset_shake_hands`** (el tercer artículo del sexto paso lo demuestra), y la ruta local es `~/lerobot_my_dataset_shake_hands`. Antes de ejecutar el comando de entrenamiento, confirma que este directorio existe realmente y que el nombre es exactamente igual.

Si la tarea que quieres entrenar es una que has recogido tú mismo, basta con sustituir en el comando todas las apariciones de `lerobot_my_dataset_shake_hands` por el nombre de tu propio conjunto de datos.

## Cómo elegir el algoritmo de entrenamiento

| Algoritmo | Documentación | Características |
|---|---|---|
| ACT | [Comando de entrenamiento-ACT](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | Recomendado para empezar, modelo pequeño y entrenamiento rápido; en una sola tarjeta se ven resultados en una hora |
| SmolVLA | [Comando de entrenamiento-smolvla](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | Recomendado como siguiente paso, se puede ajustar finamente a partir de un modelo preentrenado |
| pi0 | [Comando de entrenamiento-pi0](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | El mejor resultado, pero consume mucha VRAM y el entrenamiento es lento |
| pi0.5 | [Comando de entrenamiento-pi0.5](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | Versión mejorada de pi0 |
| pi0fast | [Comando de entrenamiento-pi0fast](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | Velocidad de inferencia más rápida |

Se recomienda empezar ejecutando primero el flujo completo con ACT y, una vez familiarizado, cambiar a otro algoritmo.

## Después del entrenamiento

- Si quieres subir el modelo entrenado a Hugging Face (respaldo, cambio de máquina o compartirlo con otras personas), consulta [Subir el modelo a HuggingFace (opcional)](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
- Si quieres descargar el modelo de vuelta a tu ordenador local, consulta [Obtener el archivo de pesos del modelo](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)

## Entrenamiento en la propia máquina

Si tu ordenador ya tiene una tarjeta gráfica NVIDIA, también puedes prescindir de la GPU en la nube y entrenar directamente en la máquina local; consulta [Entrenamiento local en Ubuntu](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu).

## Desactivar el proxy de red de tu ordenador

De lo contrario puede que no se abra la línea de comandos de Jupyter

## Iniciar sesión en la plataforma de GPU en la nube Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## Abrir una instancia de GPU en la nube

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> Haz clic en "JupyterLab" de la parte inferior; en la esquina superior izquierda hay un botón de subida, donde puedes subir código y conjuntos de datos
> 
> 

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

# Si no vas a subirlo a Huggingface y no necesitas wandb, no hace falta instalarlo
```

> Si al instalar el modelo falta `training`, hay que instalarlo aparte
> 
> `pip install -e ".[training]"`
> 
> 

## Iniciar sesión en wandb

```Shell
wandb login
复制粘贴API Key，回车
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montar el conjunto de datos

Primero, comprime en un zip el conjunto de datos recogido en el sexto paso y súbelo a la sección "Datasets" de la plataforma de GPU en la nube (en la esquina superior izquierda de JupyterLab hay un botón de subida). Después de que la plataforma lo procese, te dará un comando de descarga.

Segundo, ejecuta este comando de descarga en la línea de comandos de la instancia y descomprímelo:

```Shell
复制实例下载命令，类似：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

El conjunto de datos aparece en el directorio `~`.

Una vez descomprimido, puedes confirmarlo con `ls ~`; el nombre del directorio debe coincidir exactamente con `--dataset.root` del comando de entrenamiento (tanto este artículo como los siguientes usan `~/lerobot_my_dataset_shake_hands`). Si al descomprimir aparece un nivel extra de un directorio con el mismo nombre, por ejemplo `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`, mueve el contenido de ese nivel interno al nivel externo, o apunta `--dataset.root` directamente al nivel real.

## Modificar la frecuencia de guardado de pesos (opcional)

Abre `lerobot/src/lerobot/configs/train.py`

Cambia save_freq de 20_000 a 5_000

Así podrás obtener el archivo de pesos del modelo en una fase más temprana del entrenamiento

<RelatedProducts slugs="so-arm101" />
