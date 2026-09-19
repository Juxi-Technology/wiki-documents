---
title: "Despliegue y ejecución en Linux (Ubuntu) en un clic"
description: "Despliegue en un clic del seguimiento de gestos AmazingHand en Ubuntu: ejecute los scripts en la terminal y controle la mano simulada o real con gestos."
---

# Despliegue y ejecución en Linux (Ubuntu) en un clic

AmazingHand-main.zip

Este tutorial se basa en el Demo oficial de AmazingHand (mano diestra de Pollen Robotics) y ya incluye scripts de despliegue en un clic.
Basta con ejecutarlos en orden numérico. **Todos los scripts se encuentran en la carpeta ****`Demo/Linux(Ubuntu)一键部署脚本/`****; en el terminal, ejecute ****`./nombre-del-script`****.**

---

## Preparación del hardware

> Los archivos de modelo pueden consultarse o descargarse en [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (incluye URDF).
> 
> 

---

## Obtener permisos de ejecución de los scripts (importante)

**Tras copiar los scripts de Windows / el paquete comprimido a Linux, los permisos de ejecución (****`+x`****) se pierden**, y al ejecutarlos directamente se producirá el error
`Permission denied`. **Antes de usarlos por primera vez, debe ejecutar obligatoriamente:**

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
chmod +x *.sh
```

Después, cada script puede ejecutarse con `./nombre-del-script`. También se pueden combinar los dos pasos:

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本" && chmod +x *.sh && ./1-安装环境.sh
```

> Sugerencia: al copiar `AmazingHand-main` a Linux, lo más fiable para conservar los permisos es usar **tar**:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main` (empaquetar en cualquier extremo de Windows/Linux y descomprimir en Linux),
> o, tras descomprimir, ejecutar una vez `chmod +x *.sh`.
> 
> 

---

## Instalación del entorno (script 1)

En el terminal, entre en el directorio de scripts y ejecute (asegúrese de haber hecho ya el `chmod +x` del paso 2 anterior):

```Bash
cd "Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
./1-安装环境.sh
```

Se realiza automáticamente:

1. **Instalar Rust** (rustup + cadena de herramientas stable)

2. **Configurar la fuente espejo de Tsinghua para cargo** (`~/.cargo/config.toml`), para acelerar la descarga de crates

3. **Instalar uv** (gestor de paquetes de Python)

4. **Instalar dora-cli 0.5.0** (`cargo install`; la primera compilación tarda unos 10~20 minutos, tenga paciencia)

5. **Instalar el paquete pip dora-rs** (opcional)

> **Importante**: tras finalizar el script, **cierre y vuelva a abrir el terminal** para que las variables de entorno surtan efecto. Si el número de versión aparece vacío, añada las rutas siguientes a `~/.bashrc`:
> 
> export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
> 
> 

### Alternativa de instalación manual (si los scripts no están disponibles)

- **Rust**:

```Bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- **uv**:

```Bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

- **dora-cli**:

```Bash
cargo install dora-cli --version 0.5.0
```

### Configuración del espejo de Tsinghua para cargo (~/.cargo/config.toml)

```Bash
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

- Consultar el número de puerto:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

- Normalmente es `/dev/ttyACM0`

---

## Configurar el puerto serie (script 2)

**Ejecute ****`./2-配置串口.sh`**:

1. Le indicará "conecte la placa controladora de servos al ordenador" → pulse Intro para iniciar la detección

2. Se listan automáticamente los puertos serie detectados (`/dev/ttyACM*` / `/dev/ttyUSB*`)

3. Con un solo puerto, confirme con Intro; con varios puertos, introduzca el número

4. Se escriben automáticamente el `--serialport` de los 3 archivos yml de dataflow y el puerto predeterminado de `AHControl/src/main.rs`

5. **Configurar automáticamente los permisos del puerto serie**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

6. Se recomienda añadir el usuario actual al grupo dialout (para no tener que introducir la contraseña cada vez; requiere cerrar sesión y volver a iniciarla):

```Bash
sudo usermod -aG dialout $USER
```

> Si en la máquina virtual `ls /dev/ttyUSB* /dev/ttyACM*` no da resultado, conecte el dispositivo USB a la máquina virtual en la configuración de esta.
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

Una vez elegido, se ejecutan automáticamente `dora build` + `dora run`. Se abre la ventana de la cámara; haga gestos frente a la cámara y la mano diestra los seguirá en tiempo real. **Ctrl+C para detener**; tras finalizar el flujo de datos, pulse Intro para volver al menú principal y podrá elegir otro modo o `q` para salir.

> El escritorio de Linux necesita permiso de cámara (por ejemplo, la configuración de privacidad de Ubuntu → Cámara), y hay que confirmar que la cámara no esté siendo utilizada por otra aplicación.
> Si la cámara no se abre en la máquina virtual, véase  9.6 Permiso de cámara / La máquina virtual no abre la cámara.
> 
> 

---

## Limpieza del proyecto (script 0)

**Ejecute ****`./0-清理项目.sh`**; introduzca `Y` para confirmar y se limpiará automáticamente:

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

- Causa: tras copiar los scripts de Windows / el paquete comprimido a Linux, **se pierde el bit de ejecución**

- Solución: dar permisos de ejecución a todos los scripts

```Bash
chmod +x *.sh
```

- Después ejecutarlos con `./nombre-del-script` (no use `bash 脚本名`, ya que se saltaría el aviso interactivo del paso 2 de este tutorial)

### 9.2 cargo se queda bloqueado en `Updating 'tuna' index`

- Causa: la configuración del espejo usa el **método de repositorio git** (`.../git/crates.io-index.git`), que la primera vez descarga un índice de 1GB+

- Solución: cambiar `~/.cargo/config.toml` al **índice disperso sparse** (véase la sección 3.2) o volver a ejecutar directamente `1-安装环境.sh`

### 9.3 mediapipe carece del submódulo solutions / instalación dañada

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Debe ejecutarse con el entorno virtual activado (en el directorio `Demo`)

- `3-部署代码.sh` ya realiza este paso automáticamente como respaldo

### 9.4 Versión de dora incompatible (message v0.8.0 vs v0.7.0)

- Síntoma: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: la versión de dora-cli no coincide con dora-node-api. **Deben unificarse en 0.5.0**

    - Comprobación: `dora --version` debería mostrar `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - `1-安装环境.sh` ahora **detecta la versión automáticamente**: si no es la 0.5.0, la limpia y la reinstala a la fuerza

**Si en el sistema queda una versión antigua de dora (como la 0.4.1), límpiela manualmente antes de reinstalar:**

```Bash
# 1. Localizar dónde está la versión antigua de dora
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Eliminar la versión antigua encontrada (eliminar según la ruta real, puede haber varias)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Forzar la instalación de 0.5.0 (instalar en ~/.cargo/bin)
cargo install dora-cli --version 0.5.0 --force

# 4. Confirmar la versión (debe mostrar dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> Si `dora --version` sigue mostrando la versión antigua, significa que hay otra ubicación con un dora antiguo escondido en el PATH; use `which dora` para localizarlos y eliminarlos uno a uno, y asegúrese de que `~/.cargo/bin` esté al principio del PATH.
> 
> 

### 9.5 Sin permisos para el puerto serie (Permission denied)

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

- Los permisos pueden restablecerse cada vez que se vuelve a enchufar el dispositivo

- Solución definitiva: `sudo usermod -aG dialout $USER`, cerrar sesión y volver a iniciarla

### 9.6 Permiso de cámara / La máquina virtual no abre la cámara

**Máquina real**:

- Ubuntu: Configuración → Privacidad → Cámara → Permitir el acceso a las aplicaciones

- Confirme que la cámara no esté siendo utilizada por otra aplicación (la app Cámara, Zoom, etc.)

**Máquina virtual (VMware) que no abre la cámara**:

Síntoma: `open VIDEOIO(V4L2:/dev/video0): can't open camera by index` o `select() timeout`,
mientras que `ls /dev/video0` existe y `v4l2-ctl` puede capturar fotogramas, pero OpenCV `cap.read()` devuelve siempre `ret = False`.

Diagnóstico y solución (en orden):

1. **Reenviar la cámara a la máquina virtual**: menú → Máquina virtual → Dispositivos extraíbles → Cámara → Conectar

2. **Cambiar la versión del controlador USB (solución habitual y más eficaz en VMware)**:

    - Máquina virtual → Configuración → **Controlador USB** → cambiar entre `USB 2.0` / `USB 3.1`

    - Tras el cambio, **reinicie la máquina virtual** y vuelva a intentarlo

3. Verificar que el dispositivo existe:

```Plain Text
ls -l /dev/video0
sudo usermod -aG video $USER   # Unirse al grupo video y volver a iniciar sesión
```

4. Verificar con v4l2 si la cámara realmente puede generar fotogramas (si los genera = el controlador funciona; el problema está en la compatibilidad con OpenCV):

```Bash
v4l2-ctl --device=/dev/video0 --set-fmt-video=width=640,height=480,pixelformat=MJPG --stream-mmap --stream-count=1 --stream-to=/tmp/frame.jpg
ls -l /tmp/frame.jpg   # Decenas a cientos de KB = flujo correcto
```

### 9.7 El número de puerto cambia cada vez

- Tras volver a enchufar el USB, el número de dispositivo puede cambiar; vuelva a ejecutar `2-配置串口.sh`

### 9.8 Falta OpenCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(Ejecutar en el directorio `HandTracking` y con el entorno virtual activado)

---

## Descripción de la estructura del código

### Directorio Demo

### Correspondencia entre los distintos dataflow

### Principio del flujo de datos

```Plain Text
Cámara → HandTracking (reconocimiento de gestos con MediaPipe)
              ↓ Coordenadas de los puntos clave de la mano
         AHSimulation (simulación MuJoCo + cinemática inversa)
              ↓ Ángulos objetivo de las articulaciones
         AHControl (puerto serie → placa controladora de servos → mano diestra)
```

### Ubicación de la configuración de puertos

- La línea `args:` de los tres `dataflow_tracking_real_*.yml`: `--serialport /dev/ttyACMx`

- `default_value = "/dev/ttyACM0"` de `AHControl/src/main.rs` (valor predeterminado del parámetro de puerto serie)

- `AHControl/config/*.toml`: modelo de servo, ID, desplazamiento (normalmente no es necesario modificarlo)

