---
title: "09 · Tutorial de uso completo (arrancar el brazo → dataset → ver vídeos → entrenar → desplegar)"
---

# 09 · Tutorial de uso completo (arrancar el brazo → dataset → ver vídeos → entrenar → desplegar)

> Manual de principio a fin: síguelo una vez y pasarás de "conectar el brazo líder" a "la política entrenada trabajando sola en simulación".
> Basta con ejecutar este documento en orden de capítulos: todas las dependencias (incluido el extra `training` para entrenar) se instalan de una vez en [01](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment),
> sin necesidad de instalar nada más a mitad.
> Requisito: entorno instalado según [01](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment) y brazo líder calibrado según [03](/es/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)
> (en esta máquina, `juxi_leader` / COM124). Todos los problemas relacionados con la grabación están reunidos en [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

## 0 · Preparación única

```bash
# 本机所有 uv 命令都要先设（跨盘缓存特例，见 07）
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
```

Conecta el brazo líder y confirma el puerto serie (**el número puede cambiar cada vez que se conecta o desconecta**):

```bash
uv run --frozen python -c "from serial.tools import list_ports; print([p.device for p in list_ports.comports()])"
```

Deja espacio en el escritorio: la grabación abrirá **3 ventanas** (vista principal + `wrist camera - live` + `top camera - live`).

## 1 · Calentamiento con teleoperación (recomendado)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

Mueve el brazo líder y confirma que el brazo simulado le sigue; antes de salir (Ctrl-C), deja el brazo líder **cerca de la pose media**, para que no haya un gran segmento de convergencia al empezar a grabar.

## 2 · Grabación (comando principal)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="put the cube in the box" \
    --dataset.video=true --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true
```

Puntos clave (el resto de parámetros, en la tabla de [06](/es/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay)):

| Elemento | Descripción |
| --- | --- |
| `--dataset.root` | **root es el propio directorio del dataset**; cambia a un directorio nuevo en cada grabación (si ya existe uno con el mismo nombre, se niega a arrancar) |
| Valores por defecto inyectados automáticamente | Codificación de vídeo `h264` e hilos de codificación `2`: `record.py` imprime dos líneas de aviso al arrancar; pasar explícitamente `--dataset.rgb_encoder.vcodec=...` / `--dataset.encoder_threads=...` los sobrescribe (motivos en 07) |
| Ventanas de vista previa | Activadas por defecto (15Hz; se desactivan con `--robot.preview_cameras=false`; `--robot.preview_fps` ajustable) |
| `--dataset.video=true` | Las imágenes de las dos cámaras se almacenan en el dataset (`observation.images.wrist / top`); si solo quieres la cámara de muñeca, elimina `top_camera` |

## 3 · Operación durante la grabación

| Tecla | Acción |
| --- | --- |
| `→` o `n` | Terminar el episodio actual y guardarlo |
| `←` o `r` | Descartar el episodio actual y regrabarlo en el mismo sitio |
| `q` | Terminar toda la sesión y guardar el dataset |

- Al terminar un episodio, **los cubos vuelven solos a su sitio**; solo tienes que devolver el brazo líder a la pose inicial; cuando veas `Recording episode N`, empieza los movimientos del siguiente episodio.
- Durante la fase de guardado (decenas de segundos), la consola imprime `[record.py] reset done; saving the episode + encoding videos now`;
  en ese periodo **las teclas se ignoran de forma segura** (una pulsación accidental no estropea ningún episodio); espera a que aparezca la siguiente línea `Recording episode` para volver a operar.
- Un fallo de codificación tiene **reintento automático como red de seguridad** (imprime `video encode failed ... retrying once` y reintenta a los 3 segundos); los episodios ya guardados nunca se pierden.

## 4 · Inspección

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Cómo leer la salida:

- **Los episodios cuyo action span es todo 0, o cuya pinza es 0** son grabaciones vacías/no válidas; bórralos y vuelve a grabar;
- **Un `max |act-obs|` grande al inicio de cada episodio** es el segmento de convergencia, normal; en la parte media y final debería ser inferior a ~10 unidades.

## 5 · Ver los vídeos

```bash
uv run --frozen python examples/so101_mujoco/export_videos.py \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Productos:

- `examples/so101_mujoco/outputs/videos/so101_sim_vision/epN_top.mp4`, `epN_wrist.mp4` — **un vídeo reproducible con doble clic por episodio y por cámara**;
- `examples/so101_mujoco/outputs/renders/so101_sim_vision_epN_dual.png` — un mosaico por episodio (fila superior cenital, fila inferior muñeca, 6 fotogramas muestreados uniformemente), para una revisión visual rápida (se omite con `--no-strips`).

El dataset también contiene los vídeos empaquetados originales (varios episodios concatenados en orden en un mismo archivo):
`outputs/datasets/so101_sim_vision/videos/observation.images.{top,wrist}/chunk-000/file-000.mp4`.

## 6 · Reproducción (opcional)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0
```

## 7 · Entrenamiento

```bash
uv run --frozen lerobot-train \
    --policy.type=act \
    --policy.push_to_hub=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --output_dir=examples/so101_mujoco/outputs/train/act_so101_sim_vision \
    --steps=100000 --batch_size=8 --save_freq=20000 --log_freq=200 \
    --num_workers=4 --wandb.enable=false --policy.device=cpu
```

| Punto clave | Descripción |
| --- | --- |
| `--policy.type` | Tipo de política; **empieza con `act`** (el que mejor encaja con este volumen de datos/tarea); `ls src/lerobot/policies/` muestra otras opciones (diffusion / smolvla / pi0, etc.) |
| `--policy.push_to_hub=false` | **Obligatorio**: por defecto intenta subir a HuggingFace Hub y, sin `repo_id` configurado, sale con error; para subir, cámbialo a `--policy.repo_id=你的用户名/模型名` (requiere antes `hf auth login`) |
| `--policy.device=cpu` | En esta máquina sin GPU dedicada, usa `cpu`; en una máquina con tarjeta NVIDIA elimina este parámetro (usará cuda automáticamente) |
| Productos | En el directorio de entrenamiento se generan `checkpoints/last/pretrained_model/` (el más reciente, **el que debe usar el despliegue**) y snapshots históricos con el número de paso del guardado (p. ej. `checkpoints/000012/`); el `train_config.json` para reanudar está en `pretrained_model/` |
| Reanudar | Tras una interrupción, añade al comando original: `--resume=true --config_path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model/train_config.json` (la ruta es la posición bajo el `--output_dir` del comando anterior) |

**Velocidad esperada en esta máquina**: solo CPU, unos **2 segundos/paso** (batch 2, dos cámaras a 480p; en la prueba de humo de 12 pasos, la loss bajó de 70 a 22, dirección correcta).
Por eso esta máquina sirve para validar la cadena con pocos pasos: el `outputs/train/smoke_act` incluido en el tutorial es el producto de 12 pasos;
**para el entrenamiento definitivo se recomienda una máquina con GPU** (ACT suele requerir del orden de 100 000 pasos; el comando es exactamente igual).

> Nota sobre dependencias: el extra `training` necesario para entrenar (accelerate, etc.) ya está incluido en la instalación única de [01](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment);
> este capítulo no requiere ningún paso de instalación adicional.

## 8 · Despliegue (hacer que la política trabaje sola en simulación)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/rollout.py \
    --policy.path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model \
    --strategy.type=base \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --task="put the cube in the box" --duration=30
```

| Punto clave | Descripción |
| --- | --- |
| Parámetros de cámara | `--robot.image_camera/--robot.top_camera` **deben coincidir con los del dataset de grabación** (sim_cam + top_cam); de lo contrario la política no recibe las imágenes con las que fue entrenada |
| `--task` | Debe coincidir con el `--dataset.single_task` de la grabación |
| `--duration` | Tras cuántos segundos termina automáticamente (antes de terminar devuelve el brazo a la pose inicial y se desconecta); también se puede detener a mitad con `Ctrl-C` |
| Probar primero la cadena | Basta con el modelo de demostración incluido en el tutorial: `--policy.path=examples/so101_mujoco/outputs/train/smoke_act/checkpoints/last/pretrained_model` (12 pasos de entrenamiento; los movimientos son casi aleatorios, solo valida la cadena) |
| Despliegue solo CPU | La inferencia de la política tiene picos ocasionales de 0.5s y avisa `Control loop is running slower ... than the target FPS`: en simulación funciona pero con tirones; en GPU no ocurre (medido: la prueba de humo de 20s se ejecutó completa y terminó con normalidad) |
| Despliegue en robot real | Cambia `--robot.*` por el robot real: `--robot.type=so101_follower --robot.port=COMxx --robot.id=juxi_so101 --robot.use_degrees=false` (deja espacio en el escritorio) |
| Otros modos | `--strategy.type=sentry / highlight / dagger / episodic`: grabar mientras se ejecuta / guardar con tecla desde búfer circular / corrección humana en el bucle / grabación por episodios; ver `lerobot-rollout --help` |

## Apéndice A · Cambiar a un entorno conda (opcional)

Este repositorio usa por defecto el **`.venv` dentro del proyecto gestionado por uv** (ver [01](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment)); los comandos se ejecutan con
el prefijo `uv run --frozen --with mujoco`. Si prefieres conda, el método es **sustituir el paso de "crear el entorno" por los tres comandos siguientes**;
después, **quita el prefijo uv de todos los comandos** (`python examples/...` se ejecuta directamente) y `UV_CACHE_DIR` ya no será necesario
(es el caso especial de caché entre discos de uv, no tiene relación con conda):

```bash
# 一次性：在仓库根目录建好环境（python 版本对齐 01 的 3.12）
conda create -n lerobot-sim python=3.12 -y
conda activate lerobot-sim
pip install -e .            # 安装本仓库 lerobot 及其依赖（含 torch，Windows 上 pip 默认就是 CPU 版）
pip install "mujoco==3.16"  # uv 路线用 --with mujoco 临时提供，conda 路线装成常驻依赖
```

Después, por ejemplo, grabar queda así:

```bash
python examples/so101_mujoco/record.py --robot.image_camera=sim_cam ...
```

Dos puntos a tener en cuenta:

1. **Alineación de versiones**: `pip install -e .` deja que pip resuelva las versiones por su cuenta y puede no coincidir exactamente con `uv.lock`;
   si quieres la combinación idéntica al entorno medido actual, instala en el entorno conda con uv según el archivo de bloqueo:

   ```bash
   uv pip sync uv.lock --python "$(conda run -n lerobot-sim python -c 'import sys; print(sys.executable)')"
   pip install "mujoco==3.16"
   ```

2. La caché de calibración del brazo líder está en `~/.cache/huggingface/lerobot/calibration/`, es independiente del entorno que se use; al cambiar de entorno no hace falta recalibrar.

## Apéndice B · Consulta rápida de problemas comunes

| Síntoma | En una frase |
| --- | --- |
| El puerto serie no se abre | Enumera primero los puertos; el número puede haber cambiado (paso 0) |
| Al guardar, la consola se queda en silencio decenas de segundos | Está codificando, es normal; cuando veas el aviso `saving the episode...` no pulses teclas |
| La imagen se atasca ocasionalmente durante la grabación | Competencia por recursos de codificación en la ventana de guardado; el bucle de control no se ve afectado (manda la cifra de cadence); detalles en 07 |
| ¿Se puede salvar tras un fallo? | Los episodios ya guardados nunca se pierden; continúa con `record.py --resume=true ... --dataset.num_episodes=N` |
| `lerobot-train` informa `'repo_id' argument missing` | Por defecto intenta subir a Hub: añade `--policy.push_to_hub=false` (para subir, configura `--policy.repo_id` y ejecuta antes `hf auth login`) |
| La política no se mueve o se mueve mal al desplegar | Comprueba primero que `--robot.image_camera/--robot.top_camera` y `--task` coincidan con la grabación; después, si solo se entrenaron muy pocos pasos |

Todos los problemas y soluciones (incluidos memoria escasa, OOM de codificación, episodios vacíos, etc.) en [07 · Preguntas frecuentes](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

<RelatedProducts slugs="so-arm101" />
