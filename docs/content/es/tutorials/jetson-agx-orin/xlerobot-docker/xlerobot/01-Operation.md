---
title: Comandos de XLeRobot
---

# Comandos de XLeRobot

> **Pertenece a:** [xlerobot/](01-Operation.md) — XLeRobot completo (dos brazos + chasis)
> **Requisito previo:** lea primero [deployment/](../deployment/01-Overview.md) y entre en el contenedor
> **El otro camino:** [lerobot/](../lerobot/01-Operation.md) (un solo brazo SO-101 / LeKiwi)
> **Siguiente:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **Esta página solo trata cómo ejecutar el XLeRobot completo** (dos brazos + chasis).

Para operar **un solo brazo SO-101** o un **LeKiwi** con la línea de comandos
`lerobot-*`, vaya a [lerobot/](../lerobot/01-Operation.md): son dos
rutas diferentes.

Contenido de esta página: calibración, teleoperación, tabla de teclas,
grabación de datos, entrenamiento e inferencia.

---

## 0. Elija primero su ruta ⚠️

En la imagen hay **dos proyectos** con formas de ejecución distintas.
**Consulte primero esta tabla para decidir cuál seguir**:

| Su hardware | Qué ruta seguir | Punto de entrada |
|---|---|---|
| **XLeRobot completo** (dos brazos + chasis) | ✅ **Esta página** | Los scripts de ejemplo de `examples/` |
| **Un solo brazo SO-101 / SO-100** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Línea de comandos `lerobot-*` |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Línea de comandos `lerobot-*` |

**Por qué se dividen en dos rutas**: herramientas de línea de comandos como
`lerobot-calibrate`, `lerobot-record` y `lerobot-teleoperate` **solo reconocen
los tipos de robot que importan explícitamente** (14 robots originales, **sin
`xlerobot`**). Si se fuerza, dará el error:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**El punto de entrada de XLeRobot son los scripts de ejemplo de `examples/`**
(importan `XLerobot` directamente).

Las dos rutas **comparten el mismo entorno**: puede cambiar de una a otra en
cualquier momento, sin reinstalar nada.

> Aunque los archivos de ejemplo mencionan el uso de dos procesos host/client,
> **esa parte está comentada**; en realidad se ejecuta el **modo de conexión
> directa**: basta con un solo terminal, sin necesidad de levantar un host
> aparte.

---

## 1. Antes de la primera teleoperación: instalar dos bibliotecas X11 ⚠️

A la imagen le faltan dos bibliotecas X11; **si no las instala, la ventana de
visualización de rerun se bloqueará**:

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**El robot en sí no se ve afectado** (la teleoperación funciona con
normalidad y las teclas responden); solo que no verá la ventana de
visualización, y además el canal de datos de rerun se saturará emitiendo
WARN, ralentizando la teleoperación.

**Abra otro terminal** e instálelas dentro del contenedor:

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **El `-u root` no se puede omitir**: la imagen se ejecuta por defecto con
el usuario `jetson`, y al entrar con `docker exec` también tendrá esa
identidad por defecto, mientras que instalar paquetes apt requiere permisos
de root. Si omite este parámetro, dará el error:

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

Y además **los paquetes no se instalarán, silenciosamente**; rerun se seguirá
bloqueando y es fácil creer por error que «instalarlas no sirvió de nada».

Cuando termine, **reinicie el script de teleoperación** (salga con `Ctrl+C` y
vuelva a ejecutarlo).

> ⚠️ Este cambio **solo es válido durante esta ejecución**: el contenedor se
> lanza con `--rm` y al salir se pierde, por lo que hay que instalarlas de
> nuevo cada vez que reinicie el contenedor.

---

## 2. Encontrar el puerto serie

```bash
lerobot-find-port
```

Le pedirá que desconecte y vuelva a conectar el cable de los servos, y
después mostrará el nombre del puerto serie (por ejemplo, `/dev/ttyACM0`).

> Este comando es **interactivo**; si ejecuta `--help` directamente dará un
> EOF, lo cual es normal.

**XLeRobot usa dos puertos serie** (correspondientes a `port1` y `port2` en
la configuración):

| Parámetro | Valor predeterminado | A qué se conecta |
|---|---|---|
| `port1` | `/dev/ttyACM0` | Los dos brazos SO-101 + la cámara de la cabeza |
| `port2` | `/dev/ttyACM1` | Servos del chasis (ruedas) |

Hay que encontrar los dos. Los valores predeterminados son `/dev/ttyACM0` y
`/dev/ttyACM1`; **si en su caso no coinciden, en cada comando posterior
tendrá que especificarlos con `--robot.port1=` / `--robot.port2=`** (véase
la sección 6).

---

## 3. Calibración: se activa al ejecutar los ejemplos, no hace falta un comando aparte

⚠️ **No use `lerobot-calibrate --robot.type=xlerobot`**. Esa herramienta de
línea de comandos solo reconoce la lista de robots que importa explícitamente
(so100/so101/lekiwi, etc.); la configuración de XLeRobot **no está en esa
lista** y dará `invalid choice: 'xlerobot'`.

La calibración de XLeRobot **está integrada en `XLerobot.connect()`**; al
ejecutar cualquier ejemplo entrará automáticamente en ella:

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**Qué hará:**

- **Si no hay archivo de calibración** → entra en la calibración guiada:
  1. Le pide «mueva los servos del brazo izquierdo y de la cabeza al punto medio de su recorrido y pulse Intro»
  2. Después le pide «recorra con cada articulación todo su recorrido, una por una, y pulse Intro para terminar»
  3. Lo mismo para el brazo derecho y el chasis
- **Si ya hay archivo de calibración** → le pregunta: pulse Intro para restaurar la calibración, o escriba `c` para recalibrar

Los archivos de calibración se guardan en:

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**Hay que montar este directorio en la máquina anfitriona**; de lo contrario,
habrá que recalibrar cada vez que reinicie el contenedor:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> Si solo quiere calibrar un brazo SO-101 por separado (no todo el XLeRobot),
> puede usar el comando original; el tipo `so101_follower` sí está en la
> lista blanca de la CLI:
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> Algunos ejemplos (por ejemplo, `examples/0_so100_keyboard_joint_control.py`)
> usan **coeficientes de calibración escritos a mano en el código**, en lugar
> del proceso anterior. Cuál se usa depende de la variante de su robot y del
> ejemplo en cuestión: eche primero un vistazo a los comentarios al principio
> del archivo del ejemplo correspondiente.

---

## 4. Teleoperación

**Basta con un solo terminal** (el ejemplo usa el modo de conexión directa;
no hace falta levantar un host aparte):

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**La primera ejecución entra automáticamente en la calibración guiada** (no
hace falta ejecutar un comando de calibración aparte):

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → Lleve los servos del brazo izquierdo y de la cabeza al centro de su recorrido y **pulse Intro**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → Recorra cada articulación de principio a fin, una tras otra, y **pulse Intro** para terminar
3. Lo mismo para el brazo derecho y el chasis

Cuando ya exista un archivo de calibración, le preguntará: pulse Intro para
restaurar, o escriba `c` para recalibrar.

### Mapa de teclas

**Chasis**

| Tecla | Acción |
|---|---|
| `i` / `k` | Avanzar / retroceder |
| `j` / `l` | Desplazamiento lateral a la izquierda / a la derecha |
| `u` / `o` | Girar a la izquierda / a la derecha |
| `n` / `m` | Acelerar / desacelerar (tres niveles) |
| `b` | Salir del programa |

**Brazo izquierdo**

| Tecla | Articulación |
|---|---|
| `q` / `e` | shoulder_pan (rotación de la base) ± |
| `w` / `s` | x (adelante/atrás) ± |
| `a` / `d` | y (izquierda/derecha) ± |
| `z` / `x` | pitch (inclinación) ± |
| `r` / `f` | wrist_roll (rotación de la muñeca) ± |
| `t` / `g` | gripper (pinza) abrir / cerrar |
| `c` | Volver a la posición cero |
| `y` | Recorrer una trayectoria rectangular (para demostración/pruebas) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**Brazo derecho**

| Tecla | Articulación |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x (adelante/atrás) ± |
| `4` / `6` | y (izquierda/derecha) ± |
| `1` / `3` | pitch (inclinación) ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper abrir / cerrar |
| `0` | Volver a la posición cero |
| `Y` (**mayúscula**) | Recorrer la trayectoria rectangular |

**Otras**: `?` → los servos de la cabeza vuelven a la posición cero

> Los brazos son **simétricos como un espejo**: el izquierdo usa la zona de
> letras (`q/e`, `w/a/s/d`) y el derecho, el teclado numérico o la zona de
> números (`7/9`, `4/6`, `8/2`, `1/3`). La tecla de `reset` tampoco es la
> misma: brazo izquierdo `c`, brazo derecho `0`. Ojo: la tecla de la
> trayectoria rectangular es la `y` minúscula en el brazo izquierdo y la `Y`
> **mayúscula** en el derecho.

### Otros ejemplos

| Ejemplo | Descripción | ¿Requiere instalación adicional? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | Versión con chasis de dos ruedas | No (pero también hay que instalar antes las dos bibliotecas) |
| `5_xlerobot_teleop_xbox.py` | Mando de Xbox | Sí: `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | Falta el módulo `joyconrobotics`; no se puede usar |
| `8_xlerobot_teleop_vr.py` | VR | Hay que montar además el directorio XLeVR |

---

## 5. Recopilar datos de demostración

⚠️ `lerobot-record --robot.type=xlerobot` **no funciona** (por el mismo
motivo que en la sección 0).

XLeRobot solo tiene la vía de grabación por VR, y esta depende del módulo
`XLeVR`, que no está en la imagen.

**Si quiere usarla, tendrá que escribir su propio script** con la API de
LeRobotDataset (la biblioteca sí está en la imagen):

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<tu-usuario>/<nombre-del-dataset>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# En el bucle de teleoperación:
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # Hay que llamarla obligatoriamente; si no, los metadatos no se graban en disco
```

Puede tomar como referencia
`examples/8_vr_teleop_with_dataset_recording.py` de la imagen y sustituir la
parte de VR por teleoperación con teclado.

**Recuerde añadir `-e HF_ENDPOINT=https://hf-mirror.com`**; de lo contrario,
el envío del conjunto de datos al Hub fallará.

> Al escribir conjuntos de datos hay un escollo: después de `save_episode()`
> **hay que llamar obligatoriamente a `ds.finalize()`**; de lo contrario, los
> metadatos del episodio no se escribirán en disco y después no podrá volver
> a leerlos (error
> `Provided directory does not contain any parquet file`).

---

## 6. Qué hacer si el puerto serie no es ACM0/ACM1

Los ejemplos **no tienen argparse**; el puerto serie usa el valor
predeterminado de `XLerobotConfig()`:

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

Para especificarlos explícitamente:

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

Después de cambiarlo, simplemente vuelva a ejecutarlo (el código fuente está
montado; los cambios en los archivos de la máquina anfitriona surten efecto
de inmediato).

---

## 7. Desplegar un modelo entrenado

La política ACT **no necesita dependencias adicionales**; funciona
directamente en la imagen:

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<tu-usuario>/<nombre-del-modelo>")
policy.eval()

# Inferencia en bucle tras conectar el robot
# action = policy.select_action(batch)
```

Políticas ya preinstaladas en la imagen:

| Política | Dependencias | Notas |
|---|---|---|
| **ACT** | Ninguna | La más habitual; probada y funcional |
| **Diffusion** | `diffusers` | Requiere la imagen completa |
| SmolVLA / pi0 / groot | transformers | **No preinstaladas**; los paquetes son enormes y no funcionan en CPU |

> En un mismo proceso **no se pueden importar a la vez dos variantes del
> robot**: `xlerobot_mecanum` registra su propia configuración como
> `"xlerobot"` y choca con el nombre de la variante básica, dando
> `Cannot register ... already registered`. Un robot solo usa una variante;
> ejecutándolas en procesos separados no hay problema.

---

## 8. Entrenamiento

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<tu-usuario>/<nombre-de-mi-dataset>
```

> `lerobot-train` **no necesita `robot.type`** (solo acepta el conjunto de
> datos y el tipo de política), así que este comando sí funciona: no está
> sujeto a la limitación de la sección 0.
>
> El entrenamiento consume muchos recursos. En CPU solo se puede entrenar a
> escala minúscula; para que resulte práctico se necesita la GPU de una
> Jetson.

---

> **Siguiente:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Consulte aquí si algo va mal
> **El otro camino:** [lerobot/](../lerobot/01-Operation.md) (ejecutar un solo brazo / LeKiwi con la línea de comandos `lerobot-*`)
