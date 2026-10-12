---
title: Solución de problemas y referencia rápida
---

# Solución de problemas y referencia rápida

> **Pertenece a:** [troubleshooting/](01-Troubleshooting.md)
> **Véase también:** [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## Preguntas frecuentes

### No se ve el puerto serie del robot dentro del contenedor

```bash
# Confirmar en la máquina anfitriona que los dispositivos existen
ls /dev/ttyACM*
# Confirmar que el usuario está en el grupo dialout
groups | grep dialout
```

Si no está en el grupo, ejecute `sudo usermod -aG dialout $USER` y después
**vuelva a iniciar sesión**.

### La descarga de la imagen se queda atascada / agota el tiempo

No ha configurado el acelerador de espejos. Véase la sección 2 de
[02-Environment-Setup](../deployment/02-Environment-Setup.md).

### Falla la descarga de modelos / no se puede conectar a huggingface

Configure `-e HF_ENDPOINT=https://hf-mirror.com`.
Véase la sección 4 de [02-Environment-Setup](../deployment/02-Environment-Setup.md).

### La ventana de visualización de rerun se bloquea

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

Faltan las bibliotecas X11. **El robot en sí no se ve afectado**; solo que no
verá la ventana. El comando de instalación y los avisos están en la sección 1
de [xlerobot/](../xlerobot/01-Operation.md): lo clave es que
`docker exec` **debe llevar `-u root`**.

### Dentro del contenedor, `torch.cuda.is_available()` devuelve False

- Si usa la imagen `cpu` / `cpu-slim` → es normal; estas versiones no traen
  GPU de por sí
- Si usa la imagen `jetson` → compruebe si ha utilizado `--runtime nvidia`
  (**hay que usar `--device nvidia.com/gpu=all`**) y si se ha generado la
  especificación CDI

### El contenedor no arranca y da un error de CDI

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

Un servicio de actualización automática de la máquina anfitriona generó una
especificación que hace referencia a un `card0` inexistente. Solución:

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(Este problema se reproduce en cada reinicio en nuestra propia placa; para
más detalles, véase
developer/03-Board-Remote-Testing.md.)

### Hay que recalibrar cada vez

Los archivos de calibración se guardan dentro del contenedor y desaparecen en
cuanto se elimina; monte el directorio de caché al iniciarlo:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh` ya se encarga de esto.

### El comando de calibración da `invalid choice: 'xlerobot'`

No es una avería; es el comportamiento previsto. La herramienta de línea de
comandos `lerobot-calibrate` no admite XLeRobot; la calibración se activa
automáticamente en los scripts de ejemplo. Véanse las secciones 0 y 3 de
[xlerobot/](../xlerobot/01-Operation.md).

### Al operar con conjuntos de datos aparece una gran cantidad de errores de torchcodec

Si usa un entorno **instalado por usted mismo** en lugar de la imagen, puede
que vea `libnvrtc.so.13: cannot open shared object file`. Se debe a que
torchcodec no puede cargarse en un entorno solo CPU; lerobot recurre
automáticamente a pyav y la funcionalidad no se ve afectada. En la imagen ya
está desinstalado, así que este error no aparecerá.

### Importar dos variantes del robot dentro del contenedor da error

```
Cannot register ... as xlerobot because ... is already registered
```

Solo ocurre entre **el par `xlerobot` y `xlerobot_mecanum`**: ambos se
registran en el código fuente como `"xlerobot"` (la configuración de mecanum
es una copia y no se le cambió el nombre de registro); es un bug del propio
XLeRobot.

**Ninguna otra combinación entra en conflicto**: todos los robots del LeRobot
original + XLeRobot pueden **coexistir en el mismo proceso** (probado: 8
tipos registrados a la vez), y `xlerobot_2wheels` tampoco entra en conflicto.

Un robot solo usa una variante, así que el uso real no se ve afectado. Si de
verdad necesita usarlas a la vez (por ejemplo, para escribir un script de
comparación), ejecútelas en procesos separados.

---

## Problemas con los comandos `lerobot-*` originales

### `lerobot-record` da errores relacionados con las cámaras / los datos grabados no tienen imagen

Las cámaras deben pasarse mediante `--robot.cameras` con **sintaxis de
diccionario anidado**, no como parámetros independientes de nivel superior:

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

Ojo: es `index_or_path` (no `index`); `front` es el nombre de la cámara y
pueden definirse varias. El ejemplo completo está en la sección 6 de
[lerobot/](../lerobot/01-Operation.md).

### `lerobot-eval` no funciona en el robot real

`lerobot-eval` está pensado para **benchmarks de simulación**
(`--env.type=aloha/pusht/libero/metaworld...`), **no es una herramienta de
despliegue en un robot real**.

Para ejecutar una política entrenada en un robot real hay que usar
**`lerobot-rollout`**:

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tu-usuario>/<mi-modelo> --strategy.type=base
```

### No está claro si usar `examples/` o `lerobot-*`

| Su hardware | Cuál usar |
|---|---|
| XLeRobot completo (dos brazos + chasis) | Scripts de `examples/` → [xlerobot/](../xlerobot/01-Operation.md) |
| Un solo brazo SO-101 / SO-100, LeKiwi | Línea de comandos `lerobot-*` → [lerobot/](../lerobot/01-Operation.md) |

El criterio es sencillo: en la lista blanca de robots de `lerobot-*` **no
está `xlerobot`** (la lista completa está en la sección 11 de
[lerobot/](../lerobot/01-Operation.md)).

### Se pasa `--robot.type` pero da `invalid choice`

Compare con la lista completa de la sección 11 de
[lerobot/](../lerobot/01-Operation.md): solo se pueden usar esos 14
tipos originales. `xlerobot` no está entre ellos; para eso hay que usar los
scripts de `examples/`.

---

## Tabla de referencia rápida

### General (ambas rutas)

```bash
# Descargar la imagen
docker pull chenyang310/xlerobot:cpu-slim

# Iniciar (genérica)
bash scripts/run.sh cpu

# Iniciar (Jetson, con GPU)
bash scripts/run.sh jetson

# Ya dentro del contenedor — configuración inicial
lerobot-find-port                     # Buscar el puerto serie (interactivo; siga las indicaciones para desconectar y reconectar el cable de los servos)

# Instalar las dos bibliotecas X11 que necesita rerun (en otro terminal; el -u root no se puede omitir)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# Entrenamiento (compartido por las dos rutas: no necesita robot.type)
lerobot-train --policy.type=act --dataset.repo_id=<tu-usuario>/<nombre-del-dataset>

# Autocomprobación
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot

```bash
# Teleoperación: basta con un terminal; la primera vez entra automáticamente en la calibración guiada
python examples/4_xlerobot_teleop_keyboard.py

# Versión con chasis de dos ruedas
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ No pase xlerobot a lerobot-calibrate / lerobot-record / lerobot-teleoperate:
#    no está en la lista blanca y solo dará invalid choice. XLeRobot usa los scripts de examples/.
```

Para más detalles, véase [xlerobot/](../xlerobot/01-Operation.md).

### B · brazo SO-101 único / LeKiwi (CLI `lerobot-*`)

```bash
# Buscar los dispositivos
lerobot-find-port
lerobot-find-cameras opencv

# Escribir el ID de servos nuevos (solo hace falta en brazos recién montados)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# Calibración
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# Teleoperación (con teclado; no necesita brazo maestro)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# Grabar el conjunto de datos
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<tu-usuario>/<nombre-del-dataset> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# Comprobar con reproducción
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<tu-usuario>/<nombre-del-dataset> --dataset.episode=0

# Desplegar en el robot real la política entrenada (⚠️ no es lerobot-eval; ese es para simulación)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<tu-usuario>/<nombre-del-modelo> --strategy.type=base
```

Para más detalles, véase [lerobot/](../lerobot/01-Operation.md).

### Referencia rápida de teclas

| Parte | Teclas | Acción |
|---|---|---|
| Chasis | `i` `k` `j` `l` | Adelante / atrás / izquierda / derecha |
| Chasis | `u` `o` `n` `m` | Girar a la izquierda / a la derecha / acelerar / desacelerar |
| Chasis | `b` | Salir |
| Brazo izquierdo | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| Brazo izquierdo | `r/f` `t/g` `c` `y` | wrist / pinza / volver a cero / trayectoria rectangular |
| Brazo izquierdo | `<` `>` `,` `.` | Servos de la cabeza 1 / 2 |
| Brazo derecho | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| Brazo derecho | `/` `*` `+` `-` `0` | wrist / pinza / volver a cero |
| Brazo derecho | `Y` (**mayúscula**) | Trayectoria rectangular |
| Otras | `?` | Volver a cero los servos de la cabeza |

La explicación completa está en la sección 4 de [xlerobot/](../xlerobot/01-Operation.md).

---

## Apéndice: por qué las cosas que menciona este tutorial son así

| Decisión | Motivo |
|---|---|
| Python 3.12 es obligatorio | lerobot 0.6.2 usa sintaxis de PEP 695 (`type X = ...`, `class Foo[T]:`), que ni siquiera compila en 3.10/3.11 |
| En China continental hay que configurar el acelerador de espejos | La conexión directa a Docker Hub agota el tiempo de espera; medido: `context deadline exceeded` |
| Hay que configurar HF_ENDPOINT | `huggingface.co` es completamente inalcanzable desde China continental; `hf-mirror.com` sí responde |
| En Jetson se usa CDI y no `--runtime nvidia` | En el entorno cgroup v2 de JetPack 6/7, `--runtime nvidia` no inyecta los nodos de dispositivo |
| No se instala la biblioteca de cinemática placo | No tiene ruedas para cp312/aarch64; XLeRobot usa su propio IK analítico y no depende de ella |

Para más detalles técnicos, véase
developer/01-Jetson-Environment.md.

---

## Enlaces relacionados

- [Proyecto XLeRobot](https://github.com/Vector-Wangel/XLeRobot)
- [Documentación oficial de LeRobot](https://huggingface.co/docs/lerobot)
- [Uso y límites de Docker Hub](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **Volver al principio:** [deployment/01-Overview](../deployment/01-Overview.md)
> **El otro camino:** [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
