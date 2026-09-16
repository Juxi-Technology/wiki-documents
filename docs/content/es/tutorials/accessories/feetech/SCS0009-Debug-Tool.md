---
title: Tutorial de uso de la herramienta de depuración del servo SCS0009
description: "Herramienta de depuración FTServo diseñada específicamente para el servo Feetech SCS0009 (retroalimentación por potenciómetro, resolución de 10 bits 0–1023)."
---

# Tutorial de uso de la herramienta de depuración del servo SCS0009

> **[Comprar en la tienda](https://www.juxitech.com/es/products/feetech-scs0009-serial-bus-servo)**


**La herramienta de depuración del servo SCS0009** es una herramienta de depuración FTServo diseñada específicamente para el servo SCS0009 (retroalimentación por potenciómetro, resolución de 10 bits 0–1023) de los [servos de bus Feetech](/es/products/feetech-servo). A través de la interfaz gráfica se pueden realizar operaciones como la conexión por puerto serie, el escaneo de servos, la lectura/escritura de parámetros, el control de posición, la modificación de la tasa de baudios, la restauración de los valores de fábrica y la copia/restauración de parámetros xdat.

Esta herramienta ha sido desarrollada y mantenida por JUXI_Technology y se publica bajo licencia MIT. Funciones como el depurador FT, la copia/restauración de parámetros xdat y la compatibilidad multiplataforma son implementaciones propias.

## Aviso de compatibilidad

> ⚠️ **Actualmente esta herramienta solo admite el servo Feetech SCS0009 (serie SCS, retroalimentación de posición por potenciómetro, resolución de 10 bits 0–1023)**. La tabla de registros, el formato de parámetros xdat y la tabla de tasas de baudios están diseñados para el SCS0009 de Feetech; no se garantiza la compatibilidad con servos de otras marcas o modelos.

## Características

| Característica | Descripción |
| ---- | ---- |
| Detección automática de puertos | Identifica de forma inteligente los puertos serie USB y filtra automáticamente los dispositivos virtuales |
| Compatibilidad multiplataforma | Compatible con Windows / Ubuntu / macOS |
| Cambio chino/inglés | Cambio de idioma chino / inglés con un clic en la interfaz; la selección se recuerda automáticamente |
| Conexión por puerto serie | Selección manual/automática del puerto serie, 8 tasas de baudios (38400~1M) |
| Escaneo de servos | Detección automática de servos en línea (ID 1–254), visualización en tiempo real |
| Lectura de parámetros | Lee los 44 registros (EEPROM + SRAM) |
| Tabla de parámetros | Visualización en 5 columnas (dirección/registro/valor/área de almacenamiento/lectura-escritura), selección vinculada |
| Control de posición | Control de posición/velocidad objetivo; al completar el movimiento se indica que se desactive el par |
| Modificación de la tasa de baudios | Modifica la tasa de baudios del servo; revierte automáticamente si falla |
| Restauración de fábrica | Restaura la configuración predeterminada de fábrica con un clic |
| Parámetros xdat | Guarda los parámetros EEPROM del servo actual / abre una copia de seguridad para restaurarla |

## Descripción de la interfaz

El programa principal tiene un diseño de panel único (depurador FT); cuando la altura de la ventana es insuficiente aparece automáticamente una barra de desplazamiento y, al maximizar, se adapta de forma elástica:

```
┌─────────────────────────────────────────────────────────────┐
│  SCS0009 舵机调试工具                     [EN / English]     │  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  🔌 串口连接   [端口▾][🔄][波特率▾][连接] [🔴未连接]         │
│  🎯 舵机      [🔍扫描][舵机▾][读取参数][读取状态]            │
│               ┌ 扫描到的舵机列表 ┐                           │
│  📋 参数表    地址|寄存器|值|存储区域|读写  (44 个寄存器)      │
│  🎯 位置控制  目标位置|速度|移动|力矩开|力矩关 | 状态         │
│  🔧 波特率/恢复出厂  新波特率|修改波特率|恢复出厂            │
│  📁 xdat 参数(仅保存EEPROM) 保存当前舵机|打开xdat|恢复参数    │
│  📜 日志                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **Barra superior**: título de la aplicación, botón de cambio de idioma.
- **🔌 Conexión por puerto serie**: selección de puerto, tasa de baudios, conexión/desconexión.
- **🎯 Servo**: escaneo, selección de servo, lectura de parámetros/estado.
- **📋 Tabla de parámetros**: 44 registros en 5 columnas (dirección/registro/valor/área de almacenamiento/lectura-escritura); al seleccionar se vincula automáticamente la dirección de escritura.
- **🎯 Control de posición**: posición/velocidad objetivo; al completar el movimiento, la barra de estado indica que se desactive el par.
- **🔧 Tasa de baudios/Restauración de fábrica**: modificar la tasa de baudios (con reversión si falla), restauración de fábrica.
- **📁 Parámetros xdat (solo guarda EEPROM)**: guardar los parámetros del servo actual, abrir una copia de seguridad, restaurar.

## Instalación y puesta en marcha

Requisitos del entorno:

| Dependencia | Versión | Descripción |
| ---- | ---- | ---- |
| Python | >= 3.8 | Se recomienda 3.10+; descárguelo desde [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework de GUI |
| pyserial | >= 3.5 | Comunicación por puerto serie |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ compatible con Apple Silicon / Intel |

Conexión de hardware: utilice un adaptador USB a serie (como CH340 / CP2102) para conectar la placa de control de los servos y alimente los servos (para la versión estándar se recomienda DC 5V 5A; para la versión Pro, DC 12V 5A).

### Windows

1. Instale [Python 3.10+](https://www.python.org/downloads/) (durante la instalación, asegúrese de marcar **Add Python to PATH**; de lo contrario, la línea de comandos no encontrará `python`). Verifique la instalación:

```bash
python --version
```

2. Cree un entorno virtual e instale las dependencias:

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **El entorno virtual solo hay que crearlo una vez**. Ejecutar `python -m venv .venv` repetidamente restablece/sobrescribe el entorno original (borrando las dependencias ya instaladas); a partir de entonces basta con activarlo con `activate` cada vez.

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

> **Anote el número COM** y selecciónelo tras el inicio; también puede especificar el puerto manualmente (cuando el puerto serie esté ocupado):

```bash
python -m src.gui.factory_calibration_tool --port COM3
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
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **El entorno virtual solo hay que crearlo una vez**. Ejecutar `python3 -m venv .venv` repetidamente sobrescribe el entorno original (borrando las dependencias ya instaladas); a partir de entonces basta con `source .venv/bin/activate` cada vez.

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
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

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
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **El entorno virtual solo hay que crearlo una vez**. Ejecutar `python3 -m venv .venv` repetidamente sobrescribe el entorno original (borrando las dependencias ya instaladas); a partir de entonces basta con `source .venv/bin/activate` cada vez.

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
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. Controladores USB: macOS incluye controladores para la mayoría de los chips comunes (CH340, CP2102, FTDI), plug-and-play. Si el dispositivo no se reconoce:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: los lotes más antiguos requieren instalar el controlador oficial de WCH;
- En general, basta con que `ls /dev/cu.*` muestre el dispositivo.

5. Consejos de uso:
   - **El nombre del puerto puede cambiar**: el nombre `cu.*` puede variar al conectar y desconectar en distintos puertos USB; basta con seleccionarlo en el área «🔌 Conexión por puerto serie» en cada inicio.
   - **Ahorro de energía**: macOS puede suspenderse y provocar la desconexión del puerto serie; mantenga el equipo despierto durante la operación o aumente el tiempo de suspensión.
   - **Permisos de privacidad**: si en la primera ejecución aparece el aviso «acceso a discos extraíbles», haga clic en permitir.

## Pasos de uso

### 1. Conexión y reconocimiento de los servos

1. Conecte la placa de control de los servos mediante el adaptador USB a serie y alimente los servos.
2. Abra la GUI y seleccione el puerto en el área «🔌 Conexión por puerto serie» (o haga clic en `🔄` para actualizar); ajuste la tasa de baudios (por defecto 1M).
3. Haga clic en **Conectar**; el estado muestra `🟢 Conectado`.

> Si aparece un aviso de puerto serie ocupado, confirme que ningún otro programa (monitor de puerto serie o una instancia anterior de la herramienta sin cerrar) esté ocupando dicho puerto.

> Si solo hay un puerto serie, la herramienta ajusta automáticamente el segundo puerto a «desactivado».

### 2. Escanear servos

1. Haga clic en **🔍 Escanear servos** para detectar los servos en línea en el rango de ID 1–254.
2. Los resultados del escaneo se muestran en tiempo real en la lista de servos (con el modelo).
3. Al hacer clic en una fila de la lista de servos, se rellena automáticamente en el menú desplegable «Servo».

### 3. Leer parámetros

1. Tras seleccionar un servo, haga clic en **📖 Leer parámetros** para leer uno a uno los 44 registros.
2. La tabla de parámetros muestra 5 columnas (dirección/registro/valor/área de almacenamiento/lectura-escritura), con colores distintos para EPROM / SRAM / DEFAULT.
3. El área de registro muestra el resultado de lectura de cada registro y el motivo del fallo.

Para el significado de cada registro, consulte [Análisis de la tabla de memoria del servo SCSCL con potenciómetro](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md).

### 4. Modificar parámetros / escritura

1. En la tabla de parámetros, haga clic en la fila del registro que desea modificar → se vinculan automáticamente «dirección de escritura», «longitud» y «valor».
2. Modifique el nuevo valor en el campo «valor» y haga clic en **✏️ Escribir**.
3. El programa ejecuta: desbloquear EEPROM → escribir → volver a bloquear.
4. Al escribir aparece una ventana emergente: en caso de éxito, un aviso verde «✅ Escritura correcta»; en caso de fallo, un aviso rojo «❌ Fallo de escritura» (con el motivo).

### 5. Modificar el ID del servo

1. En la tabla de parámetros, localice la fila «ID del servo» (dirección 0x05) y haga clic para seleccionarla.
2. Modifique el «valor» por el nuevo ID y haga clic en **✏️ Escribir**.
3. El programa ejecuta: desbloquear → escribir en la dirección 5 → volver a bloquear.

> ⚠️ Antes de modificar el ID, asegúrese de que solo este servo esté conectado al bus para evitar conflictos de ID.

### 6. Control de posición

1. En el área «🎯 Control de posición», **arrastre el deslizador** para ajustar la posición objetivo (0–1023, resolución de 10 bits del potenciómetro); el campo numérico se sincroniza; también puede introducir el valor directamente en el campo numérico y el deslizador le seguirá.
2. Haga clic en **▶ Mover**; el servo comienza a moverse y la barra de estado muestra «En movimiento...».
3. Al completarse el movimiento se muestra «✅ Movimiento completado, desactive el par»; haga clic en **⏹ Desactivar par**.

### 7. Modificar la tasa de baudios / restaurar los valores de fábrica

- **Modificar la tasa de baudios**: en el área «🔧 Tasa de baudios/Restauración de fábrica», seleccione la nueva tasa (38400 – 1000000 bps) y haga clic en **🔧 Modificar tasa de baudios**. Tras la escritura se cambia automáticamente la tasa de baudios del puerto serie y se verifica con ping; si falla, se revierte automáticamente.
- **Restaurar los valores de fábrica**: haga clic en **🔄 Restaurar de fábrica**; el servo vuelve a los valores predeterminados de fábrica (ID=1, tasa de baudios=1000000); después es necesario volver a escanear.

### 8. Copia de seguridad y restauración de parámetros xdat

En el área «📁 Parámetros xdat (solo guarda EEPROM)»:

1. **💾 Guardar servo actual**: guarda los parámetros EEPROM del servo seleccionado actualmente como archivo xdat (copia de seguridad).
2. Tras modificar libremente los parámetros del servo, si desea restaurarlos:
3. **📂 Abrir xdat**: carga el archivo de copia de seguridad.
4. **📤 Restaurar parámetros al servo**: escribe la copia de seguridad de nuevo en la EEPROM del servo actual.

## Notas

1. **La seguridad es lo primero**: escribir parámetros los persiste en la EEPROM. Antes de escribir, confirme que la alimentación es estable y que el brazo robótico no golpeará a personas ni objetos.
2. **Alimentación**: para el SoARM 101 versión estándar se recomienda DC 5V 5A; para la versión Pro, DC 12V 5A. Una alimentación insuficiente provoca pérdida de pasos o fallos de comunicación en los servos.
3. **Exclusividad del puerto serie**: en Windows el puerto serie queda en uso exclusivo del programa y un mismo puerto no puede ser ocupado por dos programas a la vez. No utilice esta herramienta mientras otro programa (un monitor de puerto serie) tenga abierto el mismo puerto.
4. **Permisos de puerto serie en Linux**: para acceder a `/dev/ttyUSB*` / `/dev/ttyACM*` es necesario añadir el usuario al grupo `dialout` (véase la subsección «Linux» más arriba).
5. **Nomenclatura de puertos serie en macOS**: use `/dev/cu.*` (no bloqueante) en lugar de `/dev/tty.*` (bloqueante, puede quedarse bloqueado); véase la subsección «macOS» más arriba.
6. **Conexión en caliente**: tras desconectar el USB, el programa intentará reconectarse automáticamente; al volver a conectarlo, haga clic en `🔄` para actualizar la lista de puertos.
7. **Protección contra sobretemperatura / sobretensión**: el programa supervisa la tensión y la temperatura (alerta si la temperatura > 60°C). Si los servos se calientan de forma continua, detenga el sistema para que se enfríen.
8. **La escritura de parámetros es irreversible**: tras escribir en la EEPROM, el valor original se sobrescribe y no puede deshacerse. Se recomienda hacer una copia de seguridad con «Guardar servo actual (xdat)» antes de modificar.
9. **Riesgo al modificar el ID**: si la escritura o la verificación fallan, el programa informa de un error, pero en casos extremos el servo puede «perderse». Si esto ocurre, pruebe «Restaurar los valores de fábrica» (tras el reinicio, el ID vuelve a 1).
10. **Problemas de codificación**: si aparecen caracteres emoji corruptos en la consola de Windows, establezca `PYTHONIOENCODING=utf-8` antes de ejecutar las herramientas de línea de comandos. En Linux / macOS con UTF-8 nativo, este problema normalmente no ocurre.

## Solución de problemas

| Síntoma | Posible causa | Solución |
| ---- | -------- | -------- |
| No se puede abrir el puerto serie / puerto ocupado | Otro programa lo ocupa | Cierre programas como monitores de puerto serie, o cambie de puerto y reinicie la herramienta |
| En Windows, al abrir el puerto serie se produce PermissionError | Otro proceso ocupa ese puerto COM | Asegúrese de que ningún otro proceso ocupe ese puerto COM |
| No se detectan servos al escanear | Alimentación insuficiente / cableado incorrecto / tasa de baudios incorrecta | Compruebe la alimentación y el cableado; confirme que los servos usan una tasa de baudios de 1M |
| Falla la lectura de parámetros | Puerto serie ocupado / el servo no responde | Cierre otros programas; vuelva a conectar; compruebe si la dirección es correcta |
| Falla la escritura | Alimentación del servo insuficiente o registro de destino no escribible | Compruebe la alimentación y la conexión del servo; confirme que el registro de destino se puede escribir |
| Aumento de temperatura demasiado rápido | Carga excesiva o bloqueo del motor | Compruebe si hay atascos en el mecanismo y reduzca la velocidad/aceleración |
| No se encuentra el servo tras modificar el ID | Conflicto de ID o fallo de escritura | Restaure los valores de fábrica y vuelva a escanear |
| Windows no encuentra el puerto serie | Falta el controlador | Compruebe el controlador en el Administrador de dispositivos; cambie de puerto USB; instale el controlador CH340 |
| Linux no encuentra el puerto serie | El dispositivo no se reconoce | `ls /dev/ttyUSB* /dev/ttyACM*`; confirme el dispositivo con `lsusb` |
| Permission denied: /dev/ttyUSB0 | El usuario no pertenece al grupo dialout | Ejecute `sudo usermod -a -G dialout $USER` y vuelva a iniciar sesión; o `sudo chmod 666 /dev/ttyUSB0` (temporal) |
| El nombre del dispositivo cambia en Linux | El orden de conexión afecta a la numeración ttyUSB | Fíjelo con reglas udev (véase la subsección «Linux» más arriba) o selecciónelo en cada inicio |
| En macOS, el nombre de puerto con `tty.` se queda bloqueado | Se usó un nombre de dispositivo bloqueante | Use dispositivos con el prefijo `cu.` |
| macOS no encuentra el dispositivo | El dispositivo no se reconoce | `ls /dev/cu.*`; desconecte y vuelva a conectar; compruebe con `system_profiler SPUSBDataType` |
| Problemas de permisos en macOS | Control de acceso del sistema | Normalmente no se requieren permisos adicionales; si aparece el control de acceso, permita el acceso al terminal |
| La interfaz en chino aparece en blanco | Faltan fuentes chinas | En Windows, Microsoft YaHei de forma predeterminada (instale una fuente china si hay problemas); en Linux, instale `fonts-noto-cjk`; en macOS, PingFang de forma predeterminada (instale Noto Sans CJK si hay problemas) |
| Los emoji se muestran como cuadros | Faltan fuentes de emoji | Instale `fonts-noto-color-emoji` |
| Falla la instalación con pip | El Python del sistema está protegido (externally managed environment) | Use un entorno virtual; o `pip install --break-system-packages -r requirements.txt` |
| El programa no se inicia | Faltan dependencias o la versión no coincide | Confirme la versión con `python3 --version`; compruebe las dependencias con `pip list` |
| Falla la activación del entorno virtual en macOS | Se usó el script de activación incorrecto | Use `source .venv/bin/activate` (no `.bat`) |
| Errores de compilación en macOS Apple Silicon | Se usó un Python antiguo bajo Rosetta | Use Python 3.10+ (compatible de forma nativa con Apple Silicon) |

## Estructura de directorios

```
SCS0009_ServoController/
├── docs/                    # 分系统教程（中英文）
│   ├── zh/                  # 中文教程
│   │   ├── Windows教程.md
│   │   ├── Linux教程.md
│   │   └── macOS教程.md
│   └── en/                  # 英文教程
│       ├── Windows.md
│       ├── Linux.md
│       └── macOS.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主窗口（FT 调试器 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器面板（参数读写 / xdat 备份）
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   └── port_utils.py         # 串口检测
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

El repositorio de esta herramienta está compuesto por módulos como `src/gui` (interfaz gráfica PySide6 y depurador FT), `scservo_sdk` (SDK de comunicación de servos FTServo) y `setup.py` (script de comprobación del entorno).

<RelatedProducts slugs="feetech-servo" />
