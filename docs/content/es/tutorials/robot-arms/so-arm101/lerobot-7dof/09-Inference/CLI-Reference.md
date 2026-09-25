---
title: "Descripción de la línea de comandos"
description: "Referencia de la línea de comandos de despliegue de LeRobot: el modo base y el episódico, la elección del modelo y las opciones de visualización y duración."
---

# Descripción de la línea de comandos

## Descripción de la línea de comandos

Con visualización en tiempo real: \-\-display\_data=true

Sin visualización en tiempo real: \-\-display\_data=false

Con `--display_data=true` se inicia la espectacular interfaz de visualización de rerun\.io, pero en el directorio `/Users/tommy/.cache/huggingface/lerobot/eval_lerobot_my_dataset_a/images/observation.images.front/episode-000000` se guarda la imagen de cada fotograma, lo que ocupa bastante espacio. Más adelante puedes ajustarlo a `--display_data=false`



Inferencia con un modelo del Repo de modelos de HuggingFace: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Tomemos como ejemplo la tarea de recoger naranjas

- Inferencia con un modelo local (con visualización en tiempo real)

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferencia con un modelo local (sin visualización en tiempo real)

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferencia con un modelo del Repo de modelos de HuggingFace

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

Después de ejecutarlo se descargará el modelo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









