---
title: "Paso 7: Entrenamiento local en Ubuntu"
description: "Entrena el modelo en tu propia máquina con tarjeta gráfica NVIDIA y Ubuntu, usando el conjunto de datos local y el algoritmo ACT con las curvas de wandb."
---

# Paso 7: Entrenamiento local en Ubuntu

Este artículo se aplica al caso en que tu propio ordenador ya tiene una tarjeta gráfica NVIDIA y no necesitas la GPU en la nube.

## Antes de ejecutar

- **Entorno**: basta con instalarlo según [Primer paso: instalar el entorno de Lerobot](/es/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu); para el entrenamiento en la máquina local no hace falta subir el conjunto de datos a otro sitio
- **Conjunto de datos**: en el ejemplo siguiente se usa el conjunto de datos de recoger naranjas `lerobot_my_dataset_a` recogido en el primer artículo del sexto paso, con la ruta escrita como ruta absoluta; sustitúyela por tu propio nombre de usuario
- **Entrenar en Mac**: sustituye `/home/<你的用户名>/` del comando por `/Users/<你的用户名>/`
- **Directorio de salida**: si `--output_dir` ya existe, dará directamente `FileExistsError`; usa un nombre de directorio nuevo, o añade `--resume=true` para continuar el entrenamiento

## Documentación de referencia

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- Nota

Antes de `` solo puede haber un espacio, y después no puede haber ninguno

Cuando el conjunto de datos es local, `--dataset.streaming` debe ser `false`, porque no hace falta una lectura en streaming

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
  --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<用户名>/lerobot_my_dataset_a --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
