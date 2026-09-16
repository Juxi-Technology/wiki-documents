---
title: Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101
description: "Presenta el flujo completo del sistema SO-ARM101 de doble brazo (doble brazo seguidor): cableado y calibración del hardware, teleoperación de doble brazo."
---

# Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

Esta guía presenta el flujo completo para entrenar un sistema robótico SO-ARM de doble brazo con LeRobot, incluyendo la conexión del hardware, la calibración de ambos brazos, la teleoperación de doble brazo, la grabación y la gestión del dataset, el entrenamiento de la política ACT y el despliegue en el robot real. Siguiendo esta guía, podrá recopilar datos de demostración con dos brazos líder y dos brazos seguidores, entrenar una política de aprendizaje por imitación y ejecutarla en brazos robóticos reales.

En primer lugar, realice las conexiones de la siguiente manera:

| Rol | Puerto |
| --- | --- |
| Brazo seguidor izquierdo | `/dev/ttyACM0` |
| Brazo seguidor derecho | `/dev/ttyACM1` |
| Brazo líder izquierdo | `/dev/ttyACM2` |
| Brazo líder derecho | `/dev/ttyACM3` |

El tipo de los brazos seguidores es `so101_follower` y el de los brazos líderes es `so101_leader` (en LeRobot, `so100_leader` y `so101_leader` comparten la misma implementación).

## Preparación previa

### Instalar dependencias

Para la instalación del entorno, consulte el [tutorial de uso del SO-ARM101](./SO-ARM101-Tutorial.md).

### Permisos USB

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. Calibración (paso clave)

### 1.1 Calibrar el brazo seguidor izquierdo

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 Calibrar el brazo seguidor derecho

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 Calibrar el brazo líder izquierdo

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 Calibrar el brazo líder derecho

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

Una vez completada la calibración, los archivos se guardan en:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> Nota sobre los nombres de directorio: `so101_follower` y `so100_follower`, así como `so101_leader` y `so100_leader`, comparten la misma implementación, por lo que los directorios son `so_follower` / `so_leader`; los brazos líderes son teleoperators, así que sus archivos de calibración están en `teleoperators/` y no en `robots/`.

### (Opcional) Si ya calibraba con otros ID

Por ejemplo, si antes usaba `my_awesome_follower_arm1`, `my_awesome_follower_arm2`, etc., puede copiar los archivos de calibración:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. Teleoperación de doble brazo

### 2.1 Sin cámaras

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 Con cámaras

Puede usar `lerobot-find-cameras opencv` para consultar los índices de las cámaras; también puede añadir o quitar cámaras libremente.

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### Aviso de seguridad

- Preste atención al entorno para evitar colisiones de los brazos seguidores.

## 3. Grabación del dataset

### 3.1 Guardar en local (sin subir a Hub)

Añada `--dataset.root` (los datos se escriben en ese directorio) y `--dataset.push_to_hub=false`, además de `--dataset.no_stamp=true` para mantener estable el nombre del dataset (de lo contrario, a `repo_id` se le añadirá automáticamente una marca de tiempo y las posteriores reanudaciones, reproducciones o entrenamientos no podrán encontrarlo).

> Nota: se recomienda que `repo_id` contenga `/` (con el formato `nombre_de_usuario/nombre_del_dataset`); los datasets locales no se suben realmente.

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> La codificación de vídeo ya es `libsvtav1` por defecto, no hace falta especificarla; si desea personalizarla, use parámetros anidados como `--dataset.rgb_encoder.vcodec=h264`.

Los datos se guardan en `./datasets/bi_so101_task/`, con esta estructura:

```text
├── meta/
│   ├── info.json         # 数据集信息(fps、特征形状等)
│   ├── episodes/         # 每集的元数据(chunk-000/...)
│   ├── stats.json        # 各特征归一化统计
│   └── tasks.parquet     # 任务文本 → task_index
├── data/                 # 每帧特征数据(chunk-*.parquet)
└── videos/               # 每个摄像头一个子目录(chunk-*.mp4)
```

### 3.2 Subir a Hugging Face Hub

Si desea que se suba automáticamente, conserve `HF_USER` y elimine `root` y `push_to_hub=false` (por defecto se sube). Mantenga los puertos y los índices de las cámaras coherentes con la tabla de conexiones:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> El nombre del repositorio en el Hub tras la subida será `${HF_USER}/bi_so101_task`, que coincide con el `repo_id` usado en el entrenamiento desde el Hub de la sección 4.2. La copia local se guarda primero en `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`.

### 3.3 Continuar la recolección (reanudar la grabación)

Si la grabación se interrumpe de forma accidental (por ejemplo, al salir con el botón derecho durante la fase de reset) o desea completar la recolección en varias sesiones, puede usar `--resume` para seguir añadiendo episodios al mismo dataset.

**Nota**:

- Es obligatorio añadir `--resume=true`; de lo contrario, `LeRobotDataset.create()` dará error porque el directorio ya existe.
- El `--dataset.root` y el `--dataset.repo_id` del comando de continuación deben ser exactamente iguales a los de la primera grabación (3.1) (`resume` exige un `root` explícito).
- `--dataset.num_episodes` indica **cuántos episodios grabar en esta sesión**, no el objetivo total. Por ejemplo, si ya ha grabado 15 y quiere llegar a 50, escriba `35`.
- Al salir, procure hacerlo durante la grabación de un episodio o justo al terminar; evite salir en la fase "Reset the environment" (provocaría el fallo al guardar un episodio vacío).

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 Reproducción y eliminación de episodios

#### Reproducir un episodio concreto

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` es un índice basado en 0; `24` corresponde al episodio número 25.

#### Eliminar un episodio concreto

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

Tras la eliminación, el dataset se reescribe en su lugar y los datos originales se respaldan en `./datasets/bi_so101_task_old/`. Cuando confirme que el nuevo dataset es correcto, puede eliminar la copia de seguridad manualmente:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### Eliminar el dataset completo

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. Entrenamiento de ACT

### 4.1 Entrenar desde un dataset local

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` apunta al directorio del dataset grabado en 3.1 (el `repo_id` debe coincidir con el usado al grabar). Si el directorio `--output_dir` ya existe, se producirá directamente un `FileExistsError`; use un directorio de salida nuevo o añada `--resume=true` para continuar el entrenamiento.

### 4.2 Entrenar desde Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> El comando anterior usa los parámetros predeterminados de ACT (`chunk_size=100`, `dim_model=512`, etc.).

> El `repo_id` debe coincidir con el nombre del repositorio de la subida de 3.2 (en 3.2 ya se añadió `--dataset.no_stamp=true`, por lo que el nombre queda fijo como `${HF_USER}/bi_so101_task`). En el entrenamiento no hace falta `--dataset.root`: se descarga automáticamente desde el Hub.

## 5. Despliegue en el robot real

> Nota: `lerobot-record` solo se usa para recopilar datos de demostración. Para desplegar una política ya entrenada use `lerobot-rollout`: en la versión actual, `lerobot-record` ya no acepta `--policy.path` y también rechaza los nombres de dataset con el prefijo `eval_`.

### 5.1 Evaluación en el sitio (sin grabar datos)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` es el número de segundos de ejecución; `0` significa sin límite de tiempo.
- Si necesita tomar el control o detenerlo a mitad, añada `--interactive=true` y use comandos como `/stop` y `/reset` en la terminal.

### 5.2 Evaluar y grabar datos (local)

Use la estrategia `episodic` (se comporta como el antiguo `lerobot-record`: graba por episodios con fase de reset):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> El nombre del dataset de despliegue debe empezar por `rollout_` (convención obligatoria de la versión actual). Al grabar en local se recomienda añadir `--dataset.root` y `--dataset.no_stamp=true` para evitar que se añada una marca de tiempo al nombre del directorio.

### 5.3 Subir los datos de evaluación a Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. Preguntas frecuentes

| Problema | Causa | Solución |
| --- | --- | --- |
| Al teleoperar pide recalibrar | `bi_so_follower` no encuentra los archivos de calibración con sufijo `_left` / `_right` | Vuelva a calibrar con ID que incluyan `_left` / `_right`, o copie los archivos de calibración existentes |
| El brazo líder no se puede arrastrar | El par (torque) del leader no está desactivado | Vuelva a calibrar o revise los motores |
| Al continuar la recolección da error de directorio existente | No se añadió `--resume=true` | Añada `--resume=true` al comando `lerobot-record` |
| Con `--resume=true` da error pidiendo `root` | La continuación exige especificar explícitamente el directorio del dataset | Añada `--dataset.root=./datasets/bi_so101_task` al comando de continuación, igual que en la primera grabación |
| Al nombre del directorio del dataset se le añade una marca de tiempo y la reproducción o el entrenamiento no lo encuentran | No se configuró `no_stamp` al grabar y a `repo_id` se le añadió automáticamente una marca de tiempo | Añada `--dataset.no_stamp=true` al grabar o continuar |
| `--dataset.vcodec=...` da error de parámetro inexistente | Parámetro de una versión antigua; los parámetros de codificación de vídeo actuales son anidados | Use `--dataset.rgb_encoder.vcodec=h264` (por defecto ya es `libsvtav1`) |
| Al desplegar, `lerobot-record` da errores de `--policy.path` / `eval_` | La versión actual de `lerobot-record` ya no incluye la capacidad de desplegar políticas | Use `lerobot-rollout --strategy.type=episodic` para el despliegue, con nombres de dataset que empiecen por `rollout_` |
| Los brazos izquierdo y derecho están invertidos | Configuración de puertos incorrecta | Intercambie `left_arm_config.port` y `right_arm_config.port` |
| Durante el entrenamiento no encuentra el dataset | No se especificó `root` para el dataset local | Añada `--dataset.root=./datasets/xxx` al entrenar |
| El dataset se sube automáticamente | No se configuró `push_to_hub=false` | Añada `--dataset.push_to_hub=false` al grabar |
| Al salir aparece `You must add one or several frames before calling add_episode` | Se salió durante la fase de reset y el episodio en curso no tenía fotogramas | No afecta a los datos ya grabados; continúe la recolección con `--resume=true` |

<RelatedProducts slugs="so-arm101" />
