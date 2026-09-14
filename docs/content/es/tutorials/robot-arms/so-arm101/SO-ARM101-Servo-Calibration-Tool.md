---
title: Tutorial de uso de la herramienta de calibración de servos de la serie SoARM
description: "Herramienta de calibración de fábrica FTServo y de calibración LeRobot para brazos robóticos de la serie SoARM 10X; admite calibración central, control de servos individuales, lectura/escritura de parámetros del depurador FT y copia/restauración de parámetros xdat."
---

# Tutorial de uso de la herramienta de calibración de servos de la serie SoARM

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**


**La herramienta de calibración de la serie SoARM** es un conjunto de herramientas de calibración de fábrica de servos FTServo y de calibración LeRobot diseñado para brazos robóticos de la serie SoARM 10X (como el [kit de desarrollo SO-ARM101](/es/products/so-arm101)). A través de la interfaz gráfica se pueden realizar operaciones como la calibración central de los servos, el control de servos individuales, la lectura/escritura de parámetros, la copia/restauración de parámetros xdat y la teleoperación sincronizada de doble puerto, además de generar archivos de calibración JSON en formato LeRobot. Para el montaje del brazo robótico y la instalación de los servos, consulte primero el [tutorial de montaje del brazo robótico Lerobot](./SO-ARM101-Assembly.md).

Esta herramienta está basada en una modificación y mejora del proyecto [Seeed_RoboController de Seeed Studio](https://github.com/Seeed-Studio), publicado originalmente bajo licencia MIT. Sobre la base de conservar las funciones principales originales, este proyecto ha reconstruido la interfaz gráfica (GUI) y ha añadido funciones mejoradas como el depurador FT, la copia/restauración de parámetros xdat y la compatibilidad multiplataforma.

## Aviso de compatibilidad

> ⚠️ **Actualmente esta herramienta solo admite servos Feetech (serie STS3215)**. La tabla de registros, el formato de parámetros xdat y la tabla de tasas de baudios están diseñados para la serie STS3215 de Feetech; no se garantiza la compatibilidad con servos de otras marcas o modelos.

## Características

| Característica | Descripción |
| ---- | ---- |
| Detección automática de puertos | Identifica de forma inteligente los puertos serie USB y filtra automáticamente los dispositivos virtuales |
| Compatibilidad multiplataforma | Compatible con Windows / Ubuntu / macOS |
| Sincronización de doble puerto | Los dos puertos serie, izquierdo y derecho, funcionan de forma independiente; admite teleoperación sincronizada maestro-esclavo de doble puerto |
| Cambio chino/inglés | Cambio de idioma chino / inglés con un clic en la interfaz; la selección se recuerda automáticamente |
| Calibración central | Graba la posición actual del servo como posición central 2048 (persistente en EEPROM) |
| Prueba central | Activa el par y mueve el servo a la posición central para verificar el resultado de la calibración |
| Desactivación de motores | Desactiva el par de todos los servos con un clic para facilitar el ajuste manual |
| Escaneo automático | Detecta automáticamente todos los servos en línea en el rango de ID 1–20 |
| Control de servos individuales | Control en tiempo real de la posición de cada servo y del interruptor de par mediante deslizador |
| Depurador FT | Conexión serie, escaneo, lectura/escritura de parámetros, control de posición, modificación de la tasa de baudios, restauración de fábrica, copia de parámetros xdat |
| Parámetros xdat | Guardar los parámetros EEPROM del servo actual / abrir una copia de seguridad para restaurarla |
| Calibración LeRobot | Generar archivos de calibración JSON en formato LeRobot |
| Ejecución a la posición central desde el archivo de calibración | Mover el brazo robótico a la posición central según el archivo de calibración |

## Descripción de la interfaz

El programa principal contiene tres pestañas:

```
┌─────────────────────────────────────────────────────────────┐
│  SoARM 系列校准工具         [串口1▾] [串口2▾] [🔄]  [🎮遥控][EN]│  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┬──────────────────────────────┐ │
│  │ 串口1 - 舵机标定        │ 串口2 - 舵机标定            │ │
│  │  [🔴未连接] 当前舵机:…   │  [🔴未连接] 当前舵机:…      │ │
│  │  舵机1~6 状态表格        │  舵机1~6 状态表格           │ │
│  │  [中位校准][中位测试]…   │  [中位校准][中位测试]…      │ │
│  └─────────────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **Barra superior**: título de la aplicación, menú desplegable de selección de puerto serie, botón de actualizar, botón de teleoperación y botón de cambio de idioma.
- **🦾 Tab1 Calibración de servos**: operaciones rápidas de los paneles izquierdo y derecho (calibración central, prueba central, desactivación de motores) y estado en tiempo real.
- **🎚️ Tab2 Control de servos individuales**: para cada servo en línea, ajuste fino de la posición con un deslizador y activación/desactivación del par.
- **🔬 Tab3 Depurador FT**: conexión serie, escaneo, lectura/escritura de parámetros (56 registros), control de posición, tasa de baudios/restauración de fábrica, copia y restauración de parámetros xdat.

## Instalación y puesta en marcha

Requisitos del entorno:

| Dependencia | Versión | Descripción |
| ---- | ---- | ---- |
| Python | >= 3.8 | Se recomienda 3.10+; descárguelo desde [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework de GUI |
| pyserial | >= 3.5 | Comunicación por puerto serie |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ compatible con Apple Silicon / Intel |

Conexión de hardware: utilice un adaptador USB a serie (como CH340 / CP2102) para conectar la placa de control del brazo robótico y alimente los servos (para la versión estándar se recomienda DC 5V 5A; para la versión Pro, DC 12V 5A).

### Windows

1. Instale [Python 3.10+](https://www.python.org/downloads/) (durante la instalación, asegúrese de marcar **Add Python to PATH**; de lo contrario, la línea de comandos no encontrará `python`). Verifique la instalación:

```bash
python --version
```

2. Cree un entorno virtual e instale las dependencias:

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> Consejo: tras la activación, aparecerá el prefijo `(.venv)` en la línea de comandos.

3. Compruebe el entorno e inicie la aplicación:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

Si aparece `[OK] 环境检查通过，可以运行项目`, el entorno es correcto.

4. En el Administrador de dispositivos (`Win+X` → Administrador de dispositivos), confirme el número de puerto serie en «Puertos (COM y LPT)»:

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Anote el número COM** y selecciónelo en la barra superior tras el inicio; también puede especificar el puerto manualmente (cuando el puerto serie esté ocupado):

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
```

Ver los puertos disponibles:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Instale las fuentes chinas y las dependencias (las fuentes chinas son necesarias para mostrar la interfaz en chino; las fuentes emoji se usan para iconos como ✅⚠️ en los registros):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Añadir permisos de puerto serie (grupo dialout) [obligatorio]** (por defecto, un usuario normal de Linux no puede acceder a `/dev/ttyUSB*` / `/dev/ttyACM*`):

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

Verificación (la salida debe contener `dialout`):

```bash
groups
```

> Si no surte efecto: reinicie el equipo; en algunas distribuciones el nombre del grupo es `uucp` (Arch) o `tty`.

3. Cree el entorno virtual, instale las dependencias e inicie la aplicación:

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> Si pip muestra el error externally managed environment, puede usar `pip install --break-system-packages -r requirements.txt` o utilizar un entorno virtual.

4. Identifique el dispositivo USB a serie (tras insertar el adaptador):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Salida típica:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

Ver información detallada del fabricante:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> Con varios dispositivos, `ttyUSB0` / `ttyUSB1` se asignan según el orden de conexión y pueden resultar inestables. Se recomienda usar `/dev/ttyACM*` o fijarlos por fabricante (véase la subsección udev más abajo).

Especificar el puerto manualmente:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> Si solo hay un puerto serie, la herramienta establecerá automáticamente el segundo puerto como «deshabilitado».

5. Opcional: fijar el nombre del dispositivo con udev (para evitar que la numeración cambie tras conectar y desconectar). Cree `/etc/udev/rules.d/99-servo.rules` y fíjelo por USB ID:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Después, `ls -l /dev/ttyServo` permitirá acceder con el nombre fijo; consulte el ID del fabricante con `lsusb`.

### macOS

1. Instale Python con Homebrew (para evitar que la versión de Python incluida en el sistema sea demasiado antigua):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Verificación:

```bash
python3 --version
```

2. Cree el entorno virtual, instale las dependencias e inicie la aplicación (actívelo con `source`, no con `.bat`):

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

3. **⚠️ Nomenclatura de puertos serie**: macOS coloca los dispositivos USB a serie en `/dev`, con **dos conjuntos de nombres**:

| Prefijo | Significado | ¿Utilizable? |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | Estilo módem (bloqueante) | Puede quedarse bloqueado, no recomendado |
| `/dev/cu.usbserial-*` | Estilo llamada/terminal (**no bloqueante**) | ✅ Recomendado |

Consulte el nombre de su puerto serie:

```bash
ls /dev/cu.*
```

Salida típica:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> El programa prioriza automáticamente los dispositivos `cu.*`; al especificar el puerto manualmente, use `cu.` en lugar de `tty.`.

Especificar el puerto manualmente:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. Controladores USB: macOS incluye controladores para la mayoría de los chips comunes (CH340, CP2102, FTDI), plug-and-play. Si el dispositivo no se reconoce:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: los lotes más antiguos requieren instalar el controlador oficial de WCH;
- En general, basta con que `ls /dev/cu.*` muestre el dispositivo.

5. Consejos de uso:
   - **El nombre del puerto puede cambiar**: el nombre `cu.*` puede variar al conectar y desconectar en distintos puertos USB; basta con seleccionarlo en el menú desplegable de la barra superior en cada inicio.
   - **Ahorro de energía**: macOS puede suspenderse y provocar la desconexión del puerto serie; mantenga el equipo despierto durante la operación o aumente el tiempo de suspensión.
   - **Permisos de privacidad**: si en la primera ejecución aparece el aviso «acceso a discos extraíbles», haga clic en permitir.

## Pasos de uso

### 1. Conexión y reconocimiento de los servos

1. Conecte la placa de control del brazo robótico mediante el adaptador USB a serie y alimente los servos.
2. Abra la GUI y seleccione el puerto correspondiente en el menú desplegable de la barra superior (o haga clic en `🔄` para actualizar).
3. En la parte superior del panel se muestra `🟢 已连接` y se escanean automáticamente los servos en línea en el rango de ID 1–20 (normalmente 1–6).

> Si aparece un aviso de puerto serie ocupado, confirme que ningún otro programa (monitor de puerto serie o una instancia anterior de la herramienta sin cerrar) esté ocupando dicho puerto.

### 2. Calibración central (establecer la posición actual como 2048)

> Antes de calibrar, coloque físicamente el brazo robótico de modo que cada articulación quede en la «posición cero / central» deseada.

1. Haga clic en el botón **Calibración central del puerto X** del panel.
2. El programa desactiva primero los servos y le pide que los ajuste manualmente a la posición central deseada.
3. Tras la confirmación, el programa ejecuta para cada servo: desbloquear EEPROM → escribir el comando de calibración (valor 128 en la dirección 40) → volver a bloquear la EEPROM.
4. Tras la calibración, puede verificarla con la «prueba central»: si los servos permanecen en su sitio (desplazamiento muy pequeño), la calibración fue correcta.

### 3. Prueba central

1. Haga clic en **Prueba central del puerto X**.
2. El programa activa el par y mueve todos los servos a 2048.
3. Si los servos apenas se mueven de su posición actual, la calibración es correcta; si se mueven mucho, el valor de calibración no es fiable y es necesario recalibrar.

### 4. Desactivación de motores (ajuste manual)

- Haga clic en **Desactivar motores del puerto X** para desactivar el par de todos los servos de ese puerto y poder girarlos manualmente con libertad.
- Los servos individuales pueden activarse/desactivarse por separado en la página **Control de servos individuales** mediante el interruptor de par situado bajo el deslizador.

### 5. Control de servos individuales (Tab2)

1. En la página **🎚️ Control de servos individuales**, cada servo en línea tiene un deslizador de posición y un interruptor de par.
2. **Arrastrar el deslizador → soltar**: el servo se mueve a la posición objetivo.
3. El interruptor de par situado bajo el deslizador permite activar/desactivar el par de ese servo individualmente.

### 6. Depurador FT (lectura/escritura de parámetros y control de posición)

En la página **🔬 Depurador FT**:

1. **Conexión serie**: seleccione el puerto y la tasa de baudios (por defecto 1M); tras conectar, ejecute **Escanear servos** para detectar los servos en línea.
2. **Leer parámetros**: lee todos los registros (EEPROM + SRAM).
3. **Tabla de parámetros**: muestra los 56 registros en 5 columnas; al seleccionar una fila se vincula automáticamente la «dirección de escritura».
4. **Control de posición**: establezca la posición / velocidad objetivo y ejecútelo; al completarse el movimiento se indica que se desactive el par.
5. La modificación de la tasa de baudios, la restauración de fábrica y la copia/restauración de parámetros xdat se describen en las secciones siguientes.

### 7. Modificar el ID del servo

1. Entre en la página **🔬 Depurador FT**, conecte el puerto serie y escanee los servos.
2. Seleccione el servo objetivo, modifique el valor del «ID del servo» (dirección 0x05) en la tabla de parámetros y haga clic en escribir.
3. El programa ejecuta: desbloquear → escribir en la dirección 5 → verificar el nuevo ID → volver a bloquear.

> ⚠️ Antes de modificar el ID, asegúrese de que solo este servo esté conectado al bus para evitar conflictos de ID.

### 8. Modificar la tasa de baudios / restaurar los valores de fábrica

- **Modificar la tasa de baudios**: en el área «Tasa de baudios / Restauración de fábrica» de la página del depurador FT, seleccione la nueva tasa de baudios (38400 – 1000000 bps) y aplique el cambio. Tras la escritura, se cambia automáticamente la tasa de baudios del puerto serie y se verifica con ping; si falla, se revierte automáticamente.
- **Restaurar los valores de fábrica**: el servo vuelve a los valores predeterminados de fábrica (ID=1, tasa de baudios=1000000); después es necesario volver a escanear.

### 9. Copia de seguridad y restauración de parámetros xdat

En el área «Parámetros xdat (solo guarda EEPROM)» de la página del depurador FT:

1. **💾 Guardar servo actual**: guarda los parámetros EEPROM del servo seleccionado actualmente como archivo xdat (copia de seguridad).
2. Tras modificar libremente los parámetros del servo, si desea restaurarlos:
3. **📂 Abrir xdat**: carga el archivo de copia de seguridad.
4. **📤 Restaurar parámetros al servo**: escribe la copia de seguridad de nuevo en la EEPROM del servo actual.

### 10. Teleoperación sincronizada de doble puerto

> ⚠️ **Dirección: el puerto 1 controla el puerto 2**. El puerto 1 (maestro) solo lee los ángulos de los servos; el puerto 2 (esclavo) se controla de forma sincronizada.

1. Haga clic en **🎮 Teleoperación** en la barra superior (el puerto 1 lee los ángulos → el puerto 2 controla de forma sincronizada los servos con el mismo ID).
2. Los ID de los servos de ambos puertos deben coincidir; solo se sincronizan los servos de la intersección.
3. Haga clic de nuevo en el mismo botón para detener; después, los hilos de escaneo de los paneles izquierdo y derecho se reanudan automáticamente.

### 11. Calibración LeRobot (línea de comandos)

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

Flujo: desactivar los servos → llevar cada articulación a la posición central y registrar `homing_offset` → girar lentamente todo el recorrido y registrar `range_min/max` (`wrist_roll` es una articulación de rotación continua; su rango es fijo `[0,4095]`) → guardar el JSON.

Ejecutar hasta la posición central según el archivo de calibración:

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

La instalación del entorno LeRobot y el flujo de recopilación de datos se detallan en el [tutorial del brazo robótico LeRobot](./SO-ARM101-Tutorial.md).

## Herramientas de línea de comandos

Además de la interfaz gráfica, la herramienta ofrece las siguientes entradas de línea de comandos (sin necesidad de GUI):

```bash
# 扫描舵机
python -m src.tools.scan_id

# 舵机快速中位校准
python -m src.tools.servo_quick_calibration

# 舵机中位测试
python -m src.tools.servo_center_test

# 失能全部舵机
python -m src.tools.servo_disable

# LeRobot 风格校准
python -m src.tools.lerobot_calibrate

# LeRobot 风格校准（指定串口）
python -m src.tools.lerobot_calibrate /dev/ttyACM0

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## Notas

1. **La seguridad es lo primero**: la calibración central persiste en la EEPROM. Antes de calibrar, confirme que la alimentación es estable y que el brazo robótico no golpeará a personas ni objetos.
2. **Alimentación**: para el SO-ARM101 versión estándar se recomienda DC 5V 5A; para la versión Pro, DC 12V 5A. Una alimentación insuficiente provoca pérdida de pasos o fallos de comunicación en los servos.
3. **Exclusividad del puerto serie**: en Windows el puerto serie queda en uso exclusivo del programa; el mismo puerto no puede ser ocupado a la vez por el hilo de escaneo de la GUI y el subproceso de calibración. La herramienta detiene primero el hilo de escaneo y finaliza el proceso antiguo antes de operar; no haga clic repetidamente de forma manual.
4. **Permisos de puerto serie en Linux**: para acceder a `/dev/ttyUSB*` / `/dev/ttyACM*` es necesario añadir el usuario al grupo `dialout` (véase la subsección «Linux» más arriba).
5. **Nomenclatura de puertos serie en macOS**: use `/dev/cu.*` (no bloqueante) en lugar de `/dev/tty.*` (bloqueante, puede quedarse bloqueado); véase la subsección «macOS» más arriba.
6. **Conexión en caliente**: tras desconectar el USB, el programa intentará reconectarse automáticamente; al volver a conectarlo, haga clic en `🔄` para actualizar la lista de puertos.
7. **Protección contra sobretemperatura / sobretensión**: el programa supervisa la tensión y la temperatura (alerta si la temperatura > 60°C). Si los servos se calientan de forma continua, detenga el sistema para que se enfríen.
8. **La calibración central es irreversible**: tras la escritura, el desplazamiento original se sobrescribe y no puede deshacerse. Se recomienda registrar la posición original antes de calibrar.
9. **Riesgo al modificar el ID**: si la escritura o la verificación fallan, el programa informa de un error y reanuda el escaneo, pero en casos extremos el servo puede «perderse». Si esto ocurre, pruebe «Restaurar los valores de fábrica» (tras el reinicio, el ID vuelve a 1).
10. **Problemas de codificación**: si aparecen caracteres emoji corruptos en la consola de Windows, establezca `PYTHONIOENCODING=utf-8` antes de ejecutar las herramientas de línea de comandos. En Linux / macOS con UTF-8 nativo, este problema normalmente no ocurre.

## Solución de problemas

| Síntoma | Posible causa | Solución |
| ---- | -------- | -------- |
| No se puede abrir el puerto serie / puerto ocupado | Otro programa lo ocupa | Cierre programas como monitores de puerto serie, o cambie de puerto y reinicie la herramienta |
| En Windows, al abrir el puerto serie se produce PermissionError | Otro proceso ocupa ese puerto COM | Asegúrese de que ningún otro proceso ocupe ese puerto COM |
| No se detectan servos al escanear | Alimentación insuficiente / cableado incorrecto / tasa de baudios incorrecta | Compruebe la alimentación y el cableado; confirme que los servos usan una tasa de baudios de 1M |
| Los servos se descontrolan tras la calibración central | El brazo no se colocó correctamente antes de calibrar | Repita «desactivar → posicionar manualmente → calibración central» |
| Aumento de temperatura demasiado rápido | Carga excesiva o bloqueo del motor | Compruebe si hay atascos en el mecanismo y reduzca la velocidad/aceleración |
| No se encuentra el servo tras modificar el ID | Conflicto de ID o fallo de escritura | Restaure los valores de fábrica y vuelva a escanear |
| La teleoperación no se sincroniza | Los ID de ambos puertos no coinciden | Confirme que los servos con el mismo ID están en línea en los puertos maestro y esclavo |
| Windows no encuentra el puerto serie | Falta el controlador | Compruebe el controlador en el Administrador de dispositivos; cambie de puerto USB; instale el controlador CH340 |
| Linux no encuentra el puerto serie | El dispositivo no se reconoce | `ls /dev/ttyUSB* /dev/ttyACM*`; confirme el dispositivo con `lsusb` |
| Permission denied: /dev/ttyUSB0 | El usuario no pertenece al grupo dialout | Ejecute `sudo usermod -a -G dialout $USER` y vuelva a iniciar sesión; o `sudo chmod 666 /dev/ttyUSB0` (temporal) |
| El nombre del dispositivo cambia en Linux | El orden de conexión afecta a la numeración ttyUSB | Fíjelo con reglas udev (véase la subsección «Linux» más arriba) o selecciónelo en cada inicio |
| En macOS, el nombre de puerto con `tty.` se queda bloqueado | Se usó un nombre de dispositivo bloqueante | Use dispositivos con el prefijo `cu.` |
| macOS no encuentra el dispositivo | El dispositivo no se reconoce | `ls /dev/cu.*`; desconecte y vuelva a conectar; compruebe con `system_profiler SPUSBDataType` |
| Problemas de permisos en macOS | Control de acceso del sistema | Normalmente no se requieren permisos adicionales; si aparece el control de acceso, permita el acceso al terminal |
| La interfaz en chino aparece en blanco | Faltan fuentes chinas | En Linux, instale `fonts-noto-cjk`; si hay problemas en macOS, instale Noto Sans CJK |
| Los emoji se muestran como cuadros | Faltan fuentes de emoji | Instale `fonts-noto-color-emoji` |
| Falla la instalación con pip | El Python del sistema está protegido (externally managed environment) | Use un entorno virtual; o `pip install --break-system-packages -r requirements.txt` |
| El programa no se inicia | Faltan dependencias o la versión no coincide | Confirme la versión con `python3 --version`; compruebe las dependencias con `pip list` |
| Falla la activación del entorno virtual en macOS | Se usó el script de activación incorrecto | Use `source .venv/bin/activate` (no `.bat`) |
| Errores de compilación en macOS Apple Silicon | Se usó un Python antiguo bajo Rosetta | Use Python 3.10+ (compatible de forma nativa con Apple Silicon) |

## Estructura de directorios

```
Juxi_ServoController/
├── docs/                    # 分系统教程
│   ├── Windows教程.md
│   ├── Linux教程.md
│   └── macOS教程.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主工具（双串口标定 + 遥控 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器（参数读写 / xdat 备份）
│   │   ├── calibration_wizard.py         # LeRobot 校准向导
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── tools/                # 命令行工具
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   ├── port_utils.py         # 串口检测
│   └── calibration_manager.py# LeRobot 校准文件管理
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

El repositorio de esta herramienta está compuesto por módulos como `src/gui` (interfaz gráfica PySide6), `src/tools` (herramientas de línea de comandos), `scservo_sdk` (SDK de comunicación de servos FTServo) y `setup.py` (script de comprobación del entorno).

<RelatedProducts slugs="so-arm101,servo-driver-board" />
