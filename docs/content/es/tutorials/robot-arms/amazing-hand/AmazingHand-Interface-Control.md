---
title: "Tutorial de control de interfaz"
description: "Herramienta de control por GUI de Python / línea de comandos para AmazingHand: selección de mano izquierda y derecha, instalación, calibración, protocolo y preguntas frecuentes."
---

# Tutorial de control de interfaz

## Herramienta de control en Python de AmazingHand (válida para mano izquierda y derecha)

Herramienta GUI y de línea de comandos escrita en Python que controla 8 servos Feetech SCS0009 a través de la placa controladora de servos de bus serie para accionar la mano diestra [AmazingHand de Pollen Robotics](https://github.com/pollen-robotics/AmazingHand).

> **Se admiten ambas manos.** Al iniciar, elegir mano derecha (ID de servo 1-8) o mano izquierda (ID de servo 11-18); --hand permite omitir la pregunta. La biblioteca de poses es común a ambas manos; cada mano mantiene por separado en data/config.yaml su mapeo de servos, el desplazamiento de montaje y los objetivos de valores raw. Ver la selección de mano izquierda/derecha.

![Ilustración](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## Estructura del proyecto

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## Requisitos del entorno

- Python 3.10 o superior (la GUI requiere Tkinter)
- Alimentación externa independiente de 5V para los 8 servos
- Adaptador USB de bus serie con los controladores ya instalados

## Instalación

Se recomienda instalar con pip (lee pyproject.toml):

```bash
pip install -e .
```

O instalar directamente las dependencias:

```bash
pip install -r requirements.txt
```

Entorno de desarrollo y pruebas:

```bash
pip install -r requirements-dev.txt
```

---

## Calibración

El sistema angular de los servos, las poses predefinidas y la posición central dependen de la mano mecánica concreta. Todos estos parámetros están centralizados en data/config.yaml.

### Selección de mano izquierda/derecha

Las dos manos usan servos y estructuras mecánicas distintos, así que hay que elegir antes de que aparezca la interfaz:

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

Para omitir la pregunta:

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

Si no se añade --hand, se usa el valor hand: de data/config.yaml.

**Por qué una mano no es solo cambiar un grupo de ID.** Además de la numeración de servos (mano derecha 1-8, mano izquierda 11-18, y en la mano izquierda la numeración de los dedos es especular — el anular va primero), la mano izquierda tiene otras dos diferencias mecánicas que el programa gestiona automáticamente:

|  | Mano derecha | Mano izquierda |
|---|---|---|
| ID de servo | 1-8 | 11-18 |
| Dedo → ID | Índice 1,2 / Medio 3,4 / Anular 5,6 / Pulgar 7,8 | Anular 11,12 / Medio 13,14 / Índice 15,16 / Pulgar 17,18 |
| MiddlePos del fabricante | [451, 571, …] | [571, 451, …] |
| Desplazamiento de montaje | 0° | **−35.16°**(hands.left.angle_offset) |
| Dos servos por dedo | (a, b) | **(b, a)**(hands.left.mirror_pose) |

Si falta cualquiera de los dos últimos puntos, cualquier gesto se deforma: el desplazamiento de montaje desvía cada dedo 35°, y sin el intercambio entre servos del mismo dedo la dirección de apertura se invierte por completo (en el gesto de V los dos dedos se juntan y los tres dedos que deberían juntarse se abren).

data/hand_config.yaml es **común a ambas manos** y siempre almacena el orden de la mano derecha; la mano izquierda convierte al leer y vuelve a convertir al guardar.

**Calibrar una mano nueva.** Usar como plantilla los valores de hands.left y verificar en este orden:

1. Pulsar **Middle position** y comprobar si la línea Current (0-1023) lee los valores raw esperados
1. Pulsar **Open All** / **Close All** — el recorrido debe llegar al límite mecánico sin que los servos se bloqueen
1. Probar un gesto de apertura (victory forma una V, greeting junta tres dedos)

Si algo no es correcto, qué parámetro ajustar:

| Fenómeno | Qué cambiar |
|---|---|
| La lectura de Middle position no es correcta | `hands.<nombre>.raw_positions.middle` |
| La dirección de apertura está invertida | `hands.<nombre>.mirror_pose` |
| Recorrido insuficiente o excesivo | `hands.<nombre>.raw_positions.open / close` |

### Sistema angular

Tanto la GUI como la CLI usan **valores de ángulo**, que el driver rustypot convierte en los valores raw internos del servo:

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| Ángulo | Significado |
|---|---|
| **−35°** | Totalmente abierto (extendido) |
| **0°** | Posición central, dedos naturalmente algo flexionados |
| **+75°** | Totalmente cerrado (puño) |

Los servos con ID par se mueven en sentido **inverso** al de los de ID impar, de modo que un único valor de pose basta para que los dos servos del mismo dedo se muevan en direcciones opuestas. El programa lo gestiona automáticamente; no es necesario convertir a mano.

### Límites

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max controlan la **apertura lateral**. Como el programa normaliza (u = |side_offset| / |side_min|), **cambiar solo este rango no altera la amplitud real de apertura**, únicamente comprime la escala del control deslizante. Para cambiar de verdad el ángulo de apertura de los dedos hay que modificar también auto_extremes.

### Objetivos de valores raw

Los tres botones de posición global llevan los servos a **valores raw exactos**, sin pasar por el modelo angular:

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close — los dos extremos del recorrido mecánico. Se obtienen accionando cada servo por separado con la herramienta de depuración Feetech del fabricante.
- middle — la **posición central mecánica calibrada** (el MiddlePos del programa de demostración de Arduino del fabricante). Ojo: **no** es el punto medio entre open y close, sino que se desvía unos **±60 raw (±17.6°)** respecto al valor raw 511.

> Estos son **valores de calibración propios de cada mano**. En palabras del fabricante: *"replace values by your calibration results"*.

**Cómo verificar:** el panel Servo Feedback tiene una línea Current (0-1023) que muestra en tiempo real la posición raw. Tras pulsar el botón **Middle position**, esa línea debe leer 451, 571, 451, 571, ….

### Referencia rápida de rangos de los controles

| Control | Rango |
|---|---|
| Control deslizante de apertura/cierre (vertical) | −75 … +75 |
| Control deslizante lateral (horizontal) | −35 … +35 |
| Velocidad | 1 (lenta) … 6 (rápida) |

El valor de velocidad lo pasa el driver al servo como rad/s, por lo que 1–6 corresponde aproximadamente a **57–344 °/s**. Con carga, la velocidad real es de alrededor del **70%** de ese valor — hay que tenerlo en cuenta al establecer los retardos de las secuencias.

---

## Ejecutar la GUI (amazing_hand_gui.py)

Tras instalar con pip se puede invocar directamente:

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

O ejecutar directamente:

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

El desplegable de puertos enumera los puertos serie **realmente presentes** en el equipo (se usa pyserial si está disponible; si no, se lee el registro de Windows), por lo que también aparecen los adaptadores con números más altos. El desplegable permite escribir el puerto directamente a mano. Si el puerto predeterminado de la configuración no está conectado, la GUI arranca automáticamente desde el primer puerto real; para fijar un puerto, pasar --port explícitamente.

### Funciones

- Control deslizante por dedo para apertura/cierre y lateral, con dos modos: **Auto** (apertura/cierre + lateral) y **Raw** (control directo del ángulo de los dos servos)
- Botones rápidos Open / Close / Center por dedo
- Selección de velocidad por dedo (1–6), además de un desplegable global de sincronización de velocidad
- Atajos de teclado para ajustes finos precisos
- **Botones de posición global**: Open All, Close All, Center All, Middle position
- Gestión de poses y secuencias basada en data/hand_config.yaml
- Permite eliminar poses guardadas directamente desde la interfaz (botón 🗑 Delete)
- Curvas de telemetría de los servos en tiempo real (posición, carga, temperatura, voltaje)
- Tabla Servo Feedback con la **posición raw** en tiempo real (0–1023), útil para verificar la calibración

### Operación con teclado

- **1-4**: seleccionar dedo (Ring anular, Middle medio, Pointer índice, Thumb pulgar)
- **Teclas de dirección**: mover el dedo seleccionado
  - Arriba/abajo: cerrar / abrir
  - Izquierda/derecha: movimiento lateral
- **Teclas modificadoras**:
  - Ninguna: 1° por pulsación (ajuste fino)
  - Shift: 5° por pulsación (normal)
  - Ctrl: 10° por pulsación (rápido)
- **Acciones rápidas**:
  - Q: cerrar completamente el dedo seleccionado
  - E: abrir completamente el dedo seleccionado
  - C: recentrar la posición lateral

### Botones globales

| Botón | Apertura/cierre | Lateral |
|---|---|---|
| ✋ **Open All** | Todos los dedos al valor raw open | Recentrar |
| ✊ **Close All** | Todos los dedos al valor raw close | Recentrar |
| ⊙ **Center All** | **Sin cambios** | Recentrar |
| ⊙ **Middle position** | Todos los dedos al valor raw middle | Recentrar |

El desplegable **Global Speed** (1–6) aplica de inmediato la velocidad seleccionada a todos los controles de dedo y sincroniza la visualización de los deslizadores de cada dedo.

Los tres botones de valores raw (Open All, Close All, Middle position) se saltan el modelo angular, por lo que **después de ejecutarlos los deslizadores muestran el valor representable más cercano, no el valor exacto**. Si luego se toca un deslizador, la mano se desvía del objetivo raw como máximo unos 0.3° — es una concesión deliberada para alcanzar con precisión las posiciones calibradas.

> Problema conocido: Center All **no** omite los dedos en modo **Raw** y sobrescribe los ángulos raw ajustados manualmente. El botón ⊙ Center de un solo dedo, en cambio, no lo hace.

---

## Ejecutar la CLI (amazing_hand_cmd.py)

Herramienta de línea de comandos independiente que permite aplicar poses y reproducir secuencias sin arrancar la GUI. Lee el mismo data/hand_config.yaml que la GUI y **envía literalmente** los valores de pose almacenados — exactamente los mismos que emite la GUI.

### Linux: permisos del puerto serie

El adaptador USB serie suele aparecer como /dev/ttyACM0 (Waveshare / CDC-ACM) o /dev/ttyUSB0 (FTDI / CH340).

Cómo encontrarlo:

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

Si aparece **Permission denied**, añadir el usuario actual al grupo dialout y volver a iniciar sesión:

```bash
sudo usermod -aG dialout $USER
```

### Tras la instalación con pip

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### Ejecución directa

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### Parámetros

| Parámetro | Valor predeterminado | Descripción |
|---|---|---|
| --pose NAME | – | Aplicar la pose con el nombre indicado |
| --sequence NAME | – | Reproducir la secuencia con el nombre indicado |
| --list | – | Listar todas las poses y secuencias |
| --loop | Desactivado | Repetir la secuencia hasta Ctrl+C |
| --speed N | 3 | Velocidad del servo 1 (lenta)… 6 (rápida) |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | Número de puerto serie |
| --baudrate N | 1000000 | Velocidad en baudios |
| --config PATH | data/hand_config.yaml | Usar otro archivo de configuración |
| --hand {right,left} | hand de config.yaml | Indicar qué mano usar (mano derecha 1-8, mano izquierda 11-18) |

Al salir del script (incluido Ctrl+C) se desactiva automáticamente el par de todos los servos.

> La CLI no tiene un parámetro --config que corresponda a data/config.yaml; ese archivo siempre se carga desde el directorio del proyecto.

---

## Archivos de configuración

### data/config.yaml

| Sección | Uso |
|---|---|
| serial | Puerto serie predeterminado por plataforma, baudios, lista de baudios opcionales |
| servos | ID de servo correspondiente a cada dedo |
| limits | Rangos angulares de los servos y de los dos controles deslizantes |
| speeds | Valores predeterminados/mínimo/máximo de la escala de velocidad 1–6 |
| auto_extremes | Posición de los servos cuando el control lateral llega al límite |
| raw_positions | Objetivos raw exactos de los botones de posición global |
| paths | Ubicación de los archivos de poses/secuencias |

### Correspondencia entre servos y dedos

| Dedo | ID de servo | Índice en el array de pose |
|---|---|---|
| Pointer índice | 1, 2 | 4, 5 |
| Middle medio | 3, 4 | 2, 3 |
| Ring anular | 5, 6 | 0, 1 |
| Thumb pulgar | 7, 8 | 6, 7 |

**El orden del array de pose es anular, medio, índice, pulgar, no por ID de servo.** Es el punto más fácil de equivocar al editar hand_config.yaml a mano.

> El comentario al principio de amazing_hand_cmd.py dice "index 0→servo1 … 7→servo8"; **ese comentario es incorrecto**; la tabla anterior es el comportamiento real del código.

---

## Poses y secuencias

Todas las poses y secuencias se guardan en data/hand_config.yaml. Si el archivo no existe, la GUI lo crea automáticamente.

### Guardar una pose

1. Colocar la mano en la pose objetivo con los deslizadores o el teclado
1. Escribir el nombre en el campo "Name:"
1. Hacer clic en "➕ Add New" de la zona Pose Management

La velocidad solo afecta a la rapidez de movimiento de los deslizadores; la pose guardada solo registra las 8 posiciones de servo.

### Cargar / eliminar poses

- Seleccionar en el desplegable y pulsar **✓ Apply** para que la mano se mueva a esa pose
- Pulsar **🗑 Delete** a la derecha de Apply; tras confirmar, se elimina de forma permanente

### Gestión de secuencias

1. En Sequence Player, pulsar "🔧 Manage" para abrir el gestor de secuencias
1. **Saved Sequences** (columna izquierda)
  - Ver, ejecutar, editar o eliminar secuencias existentes
  - Doble clic o pulsar "▶ Execute" para ejecutar una vez

1. **Sequence Builder** (columna derecha)
  - Hacer doble clic en una pose de "Available Poses" para añadirla como paso
  - Se puede configurar la velocidad y el retardo de los 8 servos para cada paso; los pasos se guardan como "pose:s1,s2,...,s8|delay"
  - Usar ↑/↓ para ajustar el orden, o el botón "⏱ Delay" para insertar una pausa independiente
  - Tras escribir el nombre, pulsar "💾 Save Sequence" para guardar; "▶ Execute" permite probar sin guardar

1. Volver a la ventana principal y, para reproducción continua, marcar **Loop** en Sequence Player

### Formato de los pasos

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 — las 8 velocidades de servo (1–6) en el orden de la pose
- delay — tiempo de espera hasta el paso siguiente, p. ej. 0.6s. **Se puede omitir**; si se omite, la GUI recurre a una espera automática fija
- La pausa independiente se escribe SLEEP:1.0s (sin lista de velocidades separadas por comas)

**Elección del retardo.** El driver puede leer si el servo se ha detenido, pero la reproducción de secuencias usa retardos fijos. Estimar aproximadamente como recorrido angular / (velocidad × 57.3 × 0.7) segundos, dejando margen — en una mano con carga, un movimiento de más de unos 130° a velocidad 3 necesita 1.0 segundos o más.

### Ejemplo de formato YAML

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

La reproducción en bucle la controla el tiempo de ejecución (la casilla de la GUI) y ya no se escribe en el YAML.

---

## Pruebas

El proyecto incluye 284 pruebas unitarias/de integración/de sistema y 54 pruebas de hardware.

### Ejecutar todas las pruebas (sin hardware)

```text
pytest
```

### Ejecutar las pruebas de hardware de GUI + CLI (requiere servos conectados)

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py verifica la conexión, la aplicación de poses, la lectura de telemetría, la apertura/cierre y el saludo con un solo dedo, el control de velocidad, la ejecución de secuencias y la detección de movimiento.

test_cmd_hardware.py verifica de extremo a extremo la capa CLI: posiciones de pose, parámetros de velocidad, pasos de secuencia, wait_for_motion, la salida de --list y la desactivación del par al salir.

Los criterios de aceptación completos están en docs/REQUIREMENTS.md.

> Nota: las pruebas sin hardware comprueban los **valores predeterminados de reserva** de hand_logic.py, que siguen la escala original de −40…110. En tiempo de ejecución, data/config.yaml los sobrescribe, así que las pruebas pasan sin importar cómo se calibre — pero eso también significa que **las pruebas no validan los parámetros de calibración actuales**.

---

## Configuración de los ID de servo

Tutorial para configurar los ID de servo con el software oficial de Feetech y la placa controladora de bus serie: [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Descarga del software Feetech: [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## Agradecimientos

Proyecto original: [Betatester777](https://github.com/Betatester777/AmazingHandControl) Hardware y firmware de referencia: [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
