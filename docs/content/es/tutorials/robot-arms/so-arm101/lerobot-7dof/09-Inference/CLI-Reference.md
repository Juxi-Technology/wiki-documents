---
title: "Descripción de la línea de comandos"
description: "Referencia de la línea de comandos de despliegue de LeRobot: el modo base y el episódico, la elección del modelo y las opciones de visualización y duración."
---

# Descripción de la línea de comandos

## Nota sobre la versión (importante, léela primero)

A partir de LeRobot **0.6.0**, los modelos entrenados se despliegan con `lerobot-rollout`. La forma antigua `lerobot-record --policy.path=...` ya se eliminó en la versión **0.5.2**.

El primer paso de este tutorial instala LeRobot con `git clone`, por lo que obtienes la versión más reciente actual; por eso debes usar la línea de comandos `lerobot-rollout` de abajo. Si insistes en usar `lerobot-record`, el programa dará directamente un error y te indicará que cambies a `lerobot-rollout`.

El reparto de tareas entre los dos comandos es el siguiente:

- `lerobot-record`: solo se encarga de **recoger datos de demostración** (es el que se usa en el séptimo paso); ahora rechazará los nombres de conjunto de datos que empiecen por `eval_`
- `lerobot-rollout`: se encarga de **desplegar el modelo entrenado**; usa `--strategy.type` para elegir el modo de trabajo

## Parámetros de la línea de comandos de rollout

| Parámetro | Descripción |
|---|---|
| `--strategy.type` | El modo de trabajo. `base` solo ejecuta el modelo y no graba datos, para ver el efecto sobre el terreno; `episodic` graba por episodio e incluye una fase de reset, con un comportamiento parecido al antiguo `lerobot-record` |
| `--policy.path` | La ruta del modelo, que apunta al `checkpoints/last/pretrained_model` de la salida del entrenamiento |
| `--task` | La descripción de la tarea; se usa junto con `--strategy.type=base` |
| `--duration` | El número de segundos de ejecución; `0` significa sin límite de tiempo |
| `--interactive` | Añádelo cuando necesites tomar el control a mitad de camino; en la terminal puedes controlar con comandos como `/stop` o `/reset` |
| `--display_data` | Si se inicia la interfaz de visualización de rerun.io |
| `--policy.device` | El dispositivo de cómputo, por ejemplo `cuda`, `cpu` |

## Descripción de la línea de comandos

Con visualización en tiempo real: \-\-display\_data=true

Sin visualización en tiempo real: \-\-display\_data=false

Con `--display_data=true` se inicia la espectacular interfaz de visualización de rerun\.io, pero en el directorio `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` se guarda la imagen de cada fotograma, lo que ocupa bastante espacio. Más adelante puedes ajustarlo a `--display_data=false`



Inferencia con un modelo del Repo de modelos de HuggingFace: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Tomemos como ejemplo la tarea de recoger naranjas

- Inferencia con un modelo local (con visualización en tiempo real)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferencia con un modelo local (sin visualización en tiempo real)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferencia con un modelo del Repo de modelos de HuggingFace

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

Después de ejecutarlo se descargará el modelo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









