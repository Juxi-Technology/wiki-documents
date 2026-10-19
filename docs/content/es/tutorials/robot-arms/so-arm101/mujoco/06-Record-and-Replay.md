---
title: "06 · Grabación y reproducción de datos"
---

# 06 · Grabación y reproducción de datos

> Requisito previo: entorno según [01](/es/tutorials/robot-arms/so-arm101/mujoco/01-Environment); para grabar en el robot real también hay que completar [03](/es/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration).
> Los puertos de los comandos (brazo seguidor `COM172` / brazo líder `COM124`) son ejemplos; sustitúyelos por los obtenidos en el capítulo 03; usa como `id` el nombre elegido al calibrar.
> Si quieres el flujo completo ordenado "de arrancar el brazo a ver los vídeos y luego entrenar y desplegar", consulta directamente [09 Tutorial de uso completo](/es/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial);
> este capítulo es el manual de referencia de parámetros y mecanismos.

## Plantilla de comandos de grabación

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 录真机（主动臂 → 真机从动臂）
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/real_run1 \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="pick up the cube" \
    --dataset.video=false --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true

# 录仿真（主动臂 → 仿真从动臂）
#   把 --robot.* 换成: --robot.type=so101_mujoco
# 录仿真（键盘控制）
#   把 --teleop.* 换成: --teleop.type=so101_keyboard --teleop.rate=150
```

## Parámetros clave (los que suelen dar problemas)

| Parámetro | Descripción |
| --- | --- |
| `--dataset.root` | **root es el propio directorio del dataset** (no es un directorio padre + repo_id concatenados); usa un directorio nuevo para cada grabación |
| `--dataset.repo_id` | En grabación local es solo un identificador; el `用户名/名字` real solo hace falta cuando se suba a Hub en el futuro |
| `--dataset.num_episodes` | Número de episodios que se grabarán en esta sesión; al completarlos termina automáticamente (si pulsas `q` a mitad, también se guarda lo ya grabado) |
| `--dataset.single_task` | Cadena de descripción de la tarea; se escribe en el campo task de cada fotograma; **el `--task` del entrenamiento/despliegue debe coincidir con ella** |
| `--dataset.no_stamp=true` | No añade sufijo de marca de tiempo; el directorio/nombre es estable; para regrabar con el mismo nombre hay que borrar antes el directorio antiguo |
| `--dataset.episode_time_s` | **Límite superior** de un episodio (seguro); en operación normal se termina antes con `→` |
| `--dataset.reset_time_s` | Tiempo de recentrado entre episodios que no se graba; durante ese periodo el brazo líder sigue accionando el seguidor en tiempo real. **En grabación simulada, al entrar en esta fase los cubos se teletransportan automáticamente a su posición inicial** (ver más abajo) |
| `--dataset.video` | Actívalo solo cuando se necesiten datos de cámara (los datasets visuales requieren true; el fallback a pyav está verificado y funciona) |
| `--dataset.rgb_encoder.vcodec` | Codificador de vídeo. **En esta máquina, para grabar con dos cámaras se usa `h264`**: `record.py` ya lo inyecta por defecto (el valor predeterminado upstream, libsvtav1, falla en la asignación de memoria al abrir dos codificaciones concurrentes y hace caer toda la sesión; ver [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)); si se pasa explícitamente, no se inyecta |
| `--dataset.encoder_threads` | Número de hilos de codificación. **`record.py` inyecta 2 por defecto**: usar todos los núcleos hace que la imagen de la simulación se atasque claramente durante el guardado (ver [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)); limitando cada codificación a 2 hilos, la simulación se mantiene fluida al guardar; si se pasa explícitamente, no se inyecta |
| `--dataset.push_to_hub` | La conexión directa a HF desde esta máquina requiere proxy; mantén false y sube manualmente después de grabar |

## Teclas de control de episodios (globales, activas durante toda la grabación)

| Tecla | Acción |
| --- | --- |
| `→` o `n` | Terminar el episodio actual (**guardar**) |
| `←` o `r` | Descartar el episodio actual y **regrabarlo en el mismo sitio** (úsalo si un episodio no te convence; no hace falta reiniciar la sesión) |
| `q` | Terminar toda la sesión y guardar el dataset (**recomendado**) |
| `Esc` | Igual que `q` (además desconecta la teleoperación por teclado; se ha verificado que sale limpiamente, pero se prefiere `q`) |

**Consejo de operación**: antes de empezar a grabar, deja el brazo líder cerca de la pose media (evita que se grabe el segmento de convergencia en el que el brazo simulado/real "salta" al inicio);
al empezar, permanece quieto un segundo antes de iniciar el movimiento.

## Reinicio automático de la escena en grabación simulada

Al grabar con el robot real, en la fase "Reset the environment" hay que devolver manualmente los cubos a su sitio. En simulación, el lanzador de grabación (`record.py`)
**teletransporta automáticamente los tres cubos a su posición de origen** al comenzar esa fase (y pone su velocidad a cero), así que tras terminar cada episodio con `→`
solo hay que devolver el brazo líder a la pose inicial; los cubos vuelven solos y el siguiente episodio comienza desde la escena inicial fija.
El brazo seguidor real no tiene este comportamiento (se colocan a mano como siempre); `teleoperate.py`/`replay.py` tampoco lo aplican.

## Inspección tras la grabación

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Muestra por episodio el número de fotogramas, la duración, la amplitud de acción de las seis articulaciones y el error de seguimiento:

- **Los episodios con action span = 0** son grabaciones vacías (nadie movió nada); bórralos y vuelve a grabar;
- **Un |action−obs| grande al principio** es el segmento de convergencia (normal); en la parte media y final suele ser <10 unidades.

## Grabar datos "con imagen" en simulación (cámara de muñeca)

El robot simulado permite grabar en el dataset la cámara de muñeca de la escena (`sim_cam`) como observación de imagen:

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

Puntos clave: `--robot.image_camera=sim_cam` (nombre de la cámara) + `--dataset.video=true` (las imágenes van por codificación de vídeo; el fallback a pyav está verificado y funciona).
En las características del dataset aparecerá `observation.images.wrist` (480×640×3). La resolución y la tasa de fotogramas se ajustan con
`--robot.image_width/--robot.image_height/--robot.image_fps`.
Con ventana activada (`onscreen=true`, valor por defecto), además de la ventana de vista principal se abre **una ventana de vista previa en tiempo real por cada cámara**
(muñeca / cenital, con etiqueta en la esquina superior izquierda), de modo que durante la grabación se ve directamente si ambas señales van bien; si no las necesitas, añade
`--robot.preview_cameras=false`. Las ventanas de vista previa se refrescan a **15Hz** por defecto (`--robot.preview_fps` ajustable):
son indicadores de estado y no necesitan seguir los 50Hz de la ventana principal, lo que reduce mucho la carga de renderizado con 3 ventanas en pantalla.

**Escena y cámara cenital** (desde el 2026-10-16): la escena de simulación incluye un área de trabajo propia: placa de trabajo, cubos de tres colores (34mm) y caja de almacenamiento (ver `so101_assets.add_workspace`,
el diseño se puede afinar renderizando con `preview_workspace.py`); además hay una cámara cenital fija, `top_cam` (la parte superior de la imagen = dirección alejada del brazo).
Añadiendo `--robot.top_camera=top_cam` se graba la vista cenital como `observation.images.top` (grabación simultánea con dos cámaras); si solo quieres la cámara de muñeca, elimina ese parámetro.
La codificación de vídeo tras cada episodio procesa ambas señales a la vez, por lo que un tiempo de espera algo mayor es normal.

## Reproducción

```bash
# 仿真空回放（窗口里看轨迹重演）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0

# 真机回放（同款机制，注意周围环境与录制时一致）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/juxi_teleop_run1 --dataset.episode=0
```

> El punto de entrada oficial `lerobot-replay` no carga los plugins de este proyecto; usarlo directamente da `invalid choice: 'so101_mujoco'`,
> por eso se usa siempre el lanzador `replay.py`.

## Formato y ubicación del dataset

El dataset es LeRobotDataset v3: tanto `action` como `observation.state` son vectores de 6 dimensiones
(`shoulder_pan.pos … gripper.pos`), igual que los datasets oficiales de robot real, y pueden mezclarse directamente para entrenar.

```
examples/so101_mujoco/outputs/datasets/
└── juxi_teleop_run1/   真机键盘遥操（1 回合 / 2430 帧 / 81s）✅ 保留的真机数据
```

> Limpieza del 2026-10-16: se han eliminado todas las grabaciones simuladas antiguas (`sim_run2`, `sim_vision_demo`, `sim_vision_run1/2/3`).
> **El dataset definitivo `so101_sim_vision` (dos cámaras / 5 episodios / 10610 fotogramas / 353.8s / h264)
> se grabó esa misma noche ✅**; los vídeos exportados por episodio y por cámara están en `outputs/videos/so101_sim_vision/`,
> y los mosaicos de vista previa de las dos cámaras en `outputs/renders/sim_vision_epN_dual.png`.

## Registro de mediciones de esta sesión (2026-10-15)

| Sesión | Contenido | Resultado |
| --- | --- | --- |
| Robot real run1 | Grabación en robot real con teleoperación por teclado | 1 episodio de 81s, amplitud de las seis articulaciones de 75–140 unidades, estable a 30Hz |
| Reproducción robot real | Reproducción del mismo episodio | 2430 fotogramas reproducidos completos, sin anomalías |
| Simulación run2 | Grabación en simulación con teleoperación por brazo líder | 5 episodios, 157s, error de seguimiento <12 unidades en ep1–4 |
| Reproducción simulación ep1 | Repetición en ventana | Trayectoria coherente con la operación (confirmado) |

## Mediciones adicionales (2026-10-16)

| Sesión | Contenido | Resultado |
| --- | --- | --- |
| Nuevo brazo líder (COM124) | Recalibración (brazo/servos nuevos) | ✅ Calibración correcta; la compensación de punto cero de `so101_leader_trim` se adapta automáticamente a la nueva calibración |
| Visión run1 | Grabación en simulación con teleoperación por brazo líder (con imagen) | 2 episodios / 3177 fotogramas / 106s @ 29.97Hz; error de seguimiento ≤2 unidades en todo el recorrido (solo 0.5s de convergencia en el primer fotograma); vídeo de `observation.images.wrist` almacenado en el dataset y verificado por decodificación ✅ |
| Visión run2 | Grabación continua con dos cámaras (`--resume`) | ep0 (2776 fotogramas / 92.6s) sin pérdidas; al guardar ep1, el codificador libsvtav1 sufrió OOM y toda la sesión se cayó → se cambió el codificador a h264 (inyectado por defecto en `record.py`) y se validó de extremo a extremo (2 episodios × codificación dual); restos limpiados y la regrabación definitiva pasó a run3 |
| Visión run3 | Grabación definitiva con dos cámaras (h264) | 1.ª tanda: ep0 (185.2s / 5554 fotogramas) + ep1 (72.8s / 2186 fotogramas) almacenados correctamente y aprobados en la inspección; durante la pausa de codificación entre tandas, pulsar `→` repetidamente provocó un fallo con episodio vacío (mecanismo y protección en [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) → se continuó la grabación en otra tanda para los episodios restantes (plan de 5 episodios) |
| Primer intento de la grabación definitiva (so101_sim_vision) | Dos cámaras (h264 + 2 hilos + ventanas de vista previa a 15Hz) | Al guardar ep0 (82.3s / 2469 fotogramas) falló la asignación de memoria del codificador y toda la sesión se cayó (commit del sistema casi lleno, ver [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) → se añadieron **reintento automático al fallar la codificación** y **silenciado de la consola** (ambos verificados, 26 pruebas de humo superadas); pendiente de reiniciar la máquina para regrabar definitivamente |
| Grabación definitiva (so101_sim_vision) ✅ | Teleoperación con brazo líder y dos cámaras, 5 episodios | **5/5 episodios almacenados**: 61.5 / 53.4 / 101.1 / 62.4 / 75.4 s, 10610 fotogramas en total @29.97Hz, 0 ticks fuera de presupuesto, cero caídas; las seis articulaciones + pinza con acción válida en todo el recorrido; verificación por decodificación de los vídeos duales superada |

<RelatedProducts slugs="so-arm101" />
