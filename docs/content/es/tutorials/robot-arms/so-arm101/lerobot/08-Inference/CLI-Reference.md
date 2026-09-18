---
title: "Paso 8: Descripción de la línea de comandos"
description: "Referencia de la línea de comandos de despliegue de LeRobot: el modo base y el episódico, la elección del modelo y las opciones de visualización y duración."
---

# Paso 8: Descripción de la línea de comandos

## Nota sobre la versión (importante, léela primero)

A partir de LeRobot **0.6.0**, los modelos entrenados se despliegan con `lerobot-rollout`. La forma antigua `lerobot-record --policy.path=...` ya se eliminó en la versión **0.5.2**.

El primer paso de este tutorial instala LeRobot con `git clone`, por lo que obtienes la versión más reciente actual; por eso debes usar la línea de comandos `lerobot-rollout` de abajo. Si insistes en usar `lerobot-record`, el programa dará directamente un error y te indicará que cambies a `lerobot-rollout`.

El reparto de tareas entre los dos comandos es el siguiente:

- `lerobot-record`: solo se encarga de **recoger datos de demostración** (es el que se usa en el sexto paso); ahora rechazará los nombres de conjunto de datos que empiecen por `eval_`
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

## Los parámetros de cámara deben coincidir con los de la recogida

El `--robot.cameras` de todos los comandos de abajo usa `1280×720@30`, un valor unificado con el de [Recoger el conjunto de datos de demostración](/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). En el despliegue hay que mantener la misma resolución, fps y relación de aspecto que en la recogida: la resolución se escribe en los metadatos del conjunto de datos y participa en la validación, así que si no coincide dará directamente un error; incluso si por casualidad pasa, un campo de visión distinto hará que el modelo "vea un mundo" diferente al que le mostraste en la demostración, y el efecto empeorará notablemente.

## Acerca de la visualización

`--display_data=true` inicia la interfaz de visualización de rerun.io y, además, guarda la imagen de cada fotograma en el directorio `/Users/<你的用户名>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`, lo que ocupa bastante espacio; en el uso normal puedes ajustarlo a `--display_data=false`.

## Tomemos como ejemplo la tarea de recoger naranjas

- Evaluación sobre el terreno (con visualización en tiempo real)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

- Evaluación sobre el terreno (sin visualización en tiempo real)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=false
```

- Inferencia con un modelo del Repo de modelos de HuggingFace

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<用户名>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

Después de ejecutarlo se descargará el modelo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- Evaluar y grabar datos (`--strategy.type=episodic`)

Si quieres grabar el proceso como un conjunto de datos mientras se ejecuta, cambia `base` por `episodic`. En este modo no se escribe `--task`, sino que se usa `--dataset.single_task`, y es obligatorio indicar `--dataset.repo_id`:

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<用户名>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
