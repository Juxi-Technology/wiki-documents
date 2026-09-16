---
title: "Despliegue y ejecución en Mac en un clic"
description: "Este tutorial se basa en el Demo oficial de AmazingHand (mano diestra de Pollen Robotics) y ya incluye script…"
---

# Despliegue y ejecución en Mac en un clic

[AmazingHand-main.zip]

Este tutorial se basa en el Demo oficial de AmazingHand (mano diestra de Pollen Robotics) y ya incluye scripts de despliegue en un clic. Basta con ejecutarlos en orden numérico. **Todos los scripts se encuentran en la carpeta Demo/Mac一键部署脚本/; en el terminal, ejecute ./nombre-del-script。**

---

## Preparación del hardware

|Hardware|Requisitos|
|---|---|
|Cuerpo de la mano diestra|Mano derecha / mano izquierda / ambas manos|
|Placa controladora de servos|Externa; conexión USB al ordenador|
|Alimentación|**Al menos 5V 4A** (la alimentación por USB es insuficiente; es obligatorio usar una fuente externa)|
|Cámara|Cámara integrada del Mac o cámara USB|

> Los archivos de modelo pueden consultarse o descargarse en [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (incluye URDF).
> 
> 

---

## Obtener permisos de ejecución de los scripts (importante)

**Tras copiar los scripts de Windows / el paquete comprimido a Mac, los permisos de ejecución (****`+x`****) se pierden, y al ejecutarlos directamente se producirá
****`Permission denied`****. Antes de usarlos por primera vez, debe ejecutar obligatoriamente:**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

Después, cada script puede ejecutarse con `./nombre-del-script`.

> Sugerencia: al copiar `AmazingHand-main` a Mac, lo más fiable para conservar los permisos es usar **tar**:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`, o, tras descomprimir, ejecutar una vez `chmod +x *.sh`.
> 
> 

---

## Instalación del entorno (script 1)

En el terminal, entre en el directorio de scripts y ejecute (asegúrese de haber hecho ya el `chmod +x` del paso 2 anterior):

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

Se realiza automáticamente:

1. **Comprobar las herramientas de línea de comandos de Xcode** (necesarias para compilar Rust). Si faltan, se indicará `xcode-select --install`

2. **Instalar Rust** (rustup + cadena de herramientas stable)

3. **Configurar la fuente espejo de Tsinghua para cargo** (`~/.cargo/config.toml`), para acelerar la descarga de crates

4. **Instalar uv** (gestor de paquetes de Python)

5. **Instalar dora-cli 0.5.0** (`cargo install`; la primera compilación tarda unos 10~20 minutos, tenga paciencia). Limpia automáticamente las versiones antiguas de dora

6. **Instalar el paquete pip dora-rs** (opcional)

> **Importante**: tras finalizar el script, **cierre y vuelva a abrir el terminal** para que las variables de entorno surtan efecto. Si el número de versión aparece vacío, añada las rutas siguientes a `~/.zshrc`:
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### Alternativa de instalación manual (si los scripts no están disponibles)

- **Herramientas de línea de comandos de Xcode**: `xcode-select --install`

- **Rust**: `curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**: `curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### Espejo de Tsinghua para cargo ((~/.cargo/config.toml)

```Plain Text
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> Use el **índice disperso sparse** (como arriba); no use un espejo de repositorio git, ya que el método git descarga unos 1GB de índice la primera vez y es fácil que se quede bloqueado en `Updating 'tuna' index`.
> 
> 

---

## Modo de cableado

- Conecte la placa controladora de servos al ordenador por USB y **alimente con una fuente externa de 5V4A**

- El nombre del dispositivo de puerto serie USB en macOS es **/dev/tty.usbmodem\*** o **/dev/cu.usbmodem\*** (no el `/dev/ttyACM*` de Linux)

- Consultar el puerto:

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## Configurar el puerto serie (script 2)

**Ejecute ****`./2-配置串口.sh`**:

1. Le indicará "conecte la placa controladora de servos al ordenador" → pulse Intro para iniciar la detección

2. Se listan automáticamente los puertos serie detectados (`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`)

3. Con un solo puerto, confirme con Intro; con varios puertos, introduzca el número

4. Se escriben automáticamente el `--serialport` de los 3 archivos yml de dataflow y el puerto predeterminado de `AHControl/src/main.rs`

5. El puerto serie USB de macOS suele ser legible y escribible para el usuario; si indica falta de permisos, ejecute manualmente:

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

o vaya a **Configuración del sistema → Privacidad y seguridad → Monitorización de entrada** y permita el acceso al terminal.

> Si está en una máquina virtual, conecte el dispositivo USB a la máquina virtual.
> 
> 

---

## Despliegue del código (script 3)

**Ejecute ****`./3-部署代码.sh`**, que realiza automáticamente:

1. Iniciar el demonio de dora (`dora up`)

2. Crear el entorno virtual de Python 3.12 (`uv venv --python 3.12`)

3. Activar el entorno virtual

4. Compilar el nodo Rust AHControl (`cargo build --release`; la primera vez, unos 10 minutos)

5. Sincronizar las dependencias de AHSimulation y HandTracking (`uv sync`)

6. Instalar obligatoriamente mediapipe==0.10.14 (problema conocido del tutorial; respaldo)

> El despliegue solo debe ejecutarse una vez. Si se vuelve a ejecutar, preguntará si se desea recrear el entorno virtual.
> 
> 

---

## Ejecutar el código (script 4)

**Ejecute ****`./4-运行代码.sh`** y aparecerá un menú interactivo:

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- Seleccione **1**: entorno de simulación; los gestos de la cámara accionan las dos manos simuladas

- Seleccione **2**: entra en un submenú para elegir mano derecha / mano izquierda / ambas manos

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

Una vez elegido, se ejecutan automáticamente `dora build` + `dora run`. Se abre la ventana de la cámara; haga gestos frente a la cámara y la mano diestra los seguirá en tiempo real. **Ctrl+C para detener**; tras finalizar el flujo de datos, pulse Intro para volver al menú principal y podrá elegir otro modo o q para salir.

> **La primera vez que se ejecute, macOS pedirá autorización para la cámara**: Configuración del sistema → Privacidad y seguridad → Cámara; permita que el terminal use la cámara.
> 
> 

---

## Limpieza del proyecto (script 0)

**Ejecute ****`./0-清理项目.sh`**; introduzca Y para confirmar y se limpiará automáticamente:

1. Detener el demonio de dora

2. Eliminar los 3 entornos virtuales (`.venv`)

3. Eliminar los productos de compilación de Rust (`Demo/target`)

4. Eliminar `__pycache__`, las copias de seguridad `.bak`, los registros y `Demo/out` (directorio de registros de dora)

5. **Restaurar el puerto predeterminado** (`--serialport /dev/ttyACM0`) y eliminar los restos del puerto serie de esta máquina

> Tras la limpieza, se puede copiar toda la carpeta `AmazingHand-main` a otra persona, limpia y sin restos. En una máquina nueva, basta con ejecutar en el orden 1 → 2 → 3 → 4.
> 
> 

---

## Preguntas frecuentes y notas

### 9.1 `Permission denied` (los scripts no tienen permisos de ejecución)

- Síntoma: al ejecutar `./1-安装环境.sh` aparece `bash: ./1-安装环境.sh: Permission denied`

- Causa: tras copiar los scripts de Windows / el paquete comprimido a Mac, **se pierde el bit de ejecución**

- Solución:

```Plain Text
chmod +x *.sh
```

### 9.2 cargo se queda bloqueado en `Updating 'tuna' index`

- Causa: la configuración del espejo usa el **método de repositorio git** (`.../git/crates.io-index.git`), que la primera vez descarga un índice de 1GB+

- Solución: cambiar `~/.cargo/config.toml` al **índice disperso sparse** (véase la sección 3.2) o volver a ejecutar directamente `1-安装环境.sh`

### 9.3 mediapipe carece del submódulo solutions / instalación dañada

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- Debe ejecutarse con el entorno virtual activado (en el directorio Demo)

- `3-部署代码.sh` ya realiza este paso automáticamente como respaldo

### 9.4 Versión de dora incompatible (message v0.8.0 vs v0.7.0)

- Síntoma: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: la versión de dora-cli no coincide con dora-node-api. **Deben unificarse en 0.5.0**

    - Comprobación: `dora --version` debería mostrar `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - `1-安装环境.sh` detecta automáticamente las versiones antiguas y las reinstala a la fuerza

**Si en el sistema queda una versión antigua de dora (como la 0.4.1), límpiela antes manualmente:**

```Bash
# 1. Localizar la versión antigua de dora
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Eliminar la versión antigua encontrada (según la ruta real)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Forzar la instalación de 0.5.0
cargo install dora-cli --version 0.5.0 --force

# 4. Confirmar la versión (debe mostrar dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> Si `dora --version` sigue mostrando la versión antigua, significa que hay otros dora antiguos en el PATH; use which dora para localizarlos y eliminarlos uno a uno.
> 
> 

### 9.5 Sin permisos para el puerto serie

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- O bien **Configuración del sistema → Privacidad y seguridad → Monitorización de entrada** → permitir el terminal

- Si está usando un dispositivo `tty.*` y no puede leerlo, use el dispositivo `cu.*` correspondiente (los dispositivos cu son de solo lectura del puerto y más adecuados para el control directo)

### 9.6 Permiso de cámara

- **En la primera ejecución, seleccione "Permitir" en la ventana emergente**, o vaya a **Configuración del sistema → Privacidad y seguridad → Cámara** y permita que el terminal use la cámara

- Confirme que la cámara no esté siendo utilizada por otra aplicación (FaceTime, software de videoconferencia)

### 9.7 El número de puerto cambia cada vez

- Tras volver a enchufar el USB, el nombre del dispositivo puede cambiar; vuelva a ejecutar `2-配置串口.sh`

### 9.8 Falta OpenCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(Ejecutar en el directorio `HandTracking` y con el entorno virtual activado)

### 9.9 La compilación en Apple Silicon es más lenta / Gatekeeper la bloquea en la primera ejecución

- Que la primera `cargo build` en Apple Silicon tarde más en compilar las dependencias de dora es normal; tenga paciencia

- Si aparece "no se puede verificar el desarrollador": Configuración del sistema → Privacidad y seguridad → Abrir de todos modos

---

## Descripción de la estructura del código

### Directorio Demo

|Directorio/Archivo|Descripción|
|---|---|
|AHControl|Nodo Rust, controla los servos. src/main.rs es el punto de entrada|
|AHSimulation|Nodo Python, simulación MuJoCo + cinemática inversa (mink)|
|HandTracking|Nodo Python, seguimiento de manos MediaPipe|
|dataflow_\*.yml|Definición del flujo de datos de dora (grafo de conexión de nodos)|
|Mac一键部署脚本|Este conjunto de scripts de un clic|

### Correspondencia entre los distintos dataflow

|Archivo|Uso|
|---|---|
|dataflow_tracking_simu.yml|Entorno de simulación, gestos de la cámara → manos simuladas|
|dataflow_tracking_real_right.yml|Mano derecha real|
|dataflow_tracking_real_left.yml|Mano izquierda real|
|dataflow_tracking_real_2hands.yml|Ambas manos reales (conectadas a la misma placa controladora)|

### Principio del flujo de datos

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Ubicación de la configuración de puertos

- La línea `args:` de los tres `dataflow_tracking_real_*.yml`: `--serialport /dev/cu.usbmodem...`

- `default_value` de `AHControl/src/main.rs` (valor predeterminado del parámetro de puerto serie)

- `AHControl/config/*.toml`: modelo de servo, ID, desplazamiento (normalmente no es necesario modificarlo)



