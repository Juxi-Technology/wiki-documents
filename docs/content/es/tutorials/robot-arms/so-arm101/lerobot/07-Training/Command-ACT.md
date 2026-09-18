---
title: "Paso 7: Comando de entrenamiento ACT"
description: "Comando de entrenamiento con el algoritmo ACT para LeRobot, recomendado para empezar, con la descripción de cada parámetro y el proceso de entrenamiento."
---

# Paso 7: Comando de entrenamiento ACT

## Antes de ejecutar

- **Entorno**: primero hay que preparar el entorno y subir el conjunto de datos a la GPU en la nube según [Configuración del entorno de entrenamiento en GPU en la nube](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU). ACT viene incluido en el entorno básico de LeRobot, no hace falta instalarlo aparte
- **Conjunto de datos**: `--dataset.root=~/lerobot_my_dataset_shake_hands` del comando apunta al conjunto de datos de dar la mano recogido en el sexto paso. Si entrenas tu propia tarea, sustitúyelo por el nombre de tu propio conjunto de datos
- **Directorio de salida**: si `--output_dir` ya existe, dará directamente `FileExistsError`; usa un nombre de directorio nuevo, o añade `--resume=true` para continuar el entrenamiento
- **Durante el entrenamiento puedes ver las curvas en wandb en cualquier momento**, consulta [Ver las curvas de entrenamiento en tiempo real con wandb](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentación de referencia

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act.mdx

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

## Por qué empezar con el algoritmo ACT

ACT es el primer modelo más recomendado para entrenar cuando se juega con LeRobot; sus ventajas son las siguientes:

- El modelo es muy ligero, con solo ochenta millones de parámetros entrenables

- La convergencia del entrenamiento es muy rápida y la velocidad de inferencia también es muy alta

- En una sola tarjeta gráfica se ven resultados después de una hora de entrenamiento

- El propio modelo ACT es muy pequeño, el paquete comprimido ocupa unos 200MB, lo que facilita mucho su almacenamiento y transferencia. El paquete comprimido del modelo que produce el entrenamiento ocupa unos 300MB (véase el final de este artículo)

- Con recoger unas 30 rondas de datos para el conjunto de datos suele ser suficiente

- Se puede desplegar para la inferencia en un equipo con Ubuntu, un ordenador Mac, un ordenador con Windows o incluso en una Raspberry Pi

- El efecto de la inferencia en el robot real sigue siendo bastante bueno; para tareas sencillas como agarrar, dar la mano o dejar un bolígrafo es suficiente

- El algoritmo ACT ya viene incluido en el entorno básico de la biblioteca LeRobot, no hace falta instalar otras bibliotecas

## Línea de comandos

```Shell
lerobot-train \
  --dataset.repo_id=<usuario>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## Descripción de la línea de comandos

Antes del carácter de continuación de línea `` solo puede haber un espacio, y después no puede haber ninguno

|Parámetro de línea de comandos|Descripción|
|---|---|
|--dataset.repo_id|El Repo_ID del conjunto de datos de HuggingFace, con la forma `用户名/数据集名`|
|--dataset.root|La ruta local del conjunto de datos. Cuando el conjunto de datos ya se ha descargado localmente, debe apuntar al directorio real|
|--dataset.revision|La versión del conjunto de datos, que se especificó al subir el conjunto de datos a HuggingFace|
|--dataset.streaming|Si se lee en streaming. Cuando el conjunto de datos es local se ajusta a `false`, ya que no hace falta una lectura en streaming|
|--policy.type|El algoritmo que se va a entrenar, por ejemplo act, smolvla, diffusion, pi0, pi05, pi0_fast, wall_x|
|--output_dir|El directorio donde se guarda la salida del entrenamiento|
|--job_name|El nombre de esta tarea de entrenamiento|
|--policy.device|El dispositivo de cómputo|
|--wandb.enable|Activa la visualización de wandb|
|--wandb.project|El nombre del proyecto de wandb|
|--policy.push_to_hub|Envía el modelo entrenado a la nube de HuggingFace|
|--steps|El número de pasos de entrenamiento|
|--batch_size|La cantidad de datos que se introducen en un paso; si la VRAM no es suficiente, hay que reducirla|

## Proceso de entrenamiento

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

El paquete comprimido del modelo ocupa unos 300MB

<RelatedProducts slugs="so-arm101" />
