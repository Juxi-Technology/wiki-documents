---
title: "Despliegue y ejecución en Windows en un clic"
description: "Despliegue en un clic del seguimiento de gestos AmazingHand en Windows: haga doble clic en los scripts y controle la mano simulada o real con gestos."
---

# Despliegue y ejecución en Windows en un clic

**AmazingHand-main.zip**（AmazingHand-main.zip, supera el límite de tamaño por archivo del sitio — solicítalo a support@juxitech.com）

Este tutorial se basa en el Demo oficial de AmazingHand (mano diestra de Pollen Robotics) y ya incluye scripts de despliegue en un clic.
Basta con ejecutarlos en orden numérico. **Todos los scripts se encuentran en la carpeta ****`Demo\Windows一键部署脚本\`****; haga doble clic para ejecutarlos.**

---

## Preparación del hardware

> Los archivos de modelo pueden consultarse o descargarse en [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (incluye URDF).
> 
> 

---

## Instalación del entorno (script 1)

**Haga doble clic en ****`1-安装环境.bat`**, que realiza automáticamente:

1. **Comprobar las herramientas de compilación MSVC** (cl.exe) ——necesarias para compilar Rust. Si faltan, se indicará que se instale
Visual Studio 2022 Build Tools; marque "Desarrollo de escritorio con C++" y, tras la instalación, vuelva a abrir el terminal.

2. **Instalar Rust** (rustup + cadena de herramientas stable-msvc)

3. **Configurar la fuente espejo de Tsinghua para cargo** (`C:\Users\<usuario>\.cargo\config.toml`), para acelerar la descarga de crates

4. **Instalar uv** (gestor de paquetes de Python)

5. **Instalar dora-cli 0.5.0** (`cargo install`; la primera compilación tarda unos 10~20 minutos, tenga paciencia)

6. **Instalar el paquete pip dora-rs** (opcional; se instalará en el entorno virtual)

> **Importante**: tras finalizar el script, **cierre y vuelva a abrir el terminal** para que las variables de entorno surtan efecto. El proceso de instalación puede ser lento por la red; tenga paciencia y no lo cierre a mitad.
> 
> 

### Alternativa de instalación manual (si los scripts no están disponibles)

- **Rust**: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - En Windows, use rustup-init.exe y seleccione la cadena de herramientas MSVC predeterminada

    - Variables de entorno: añadir `%USERPROFILE%.cargo\bin` al PATH

- **uv**: en PowerShell, ejecute `irm ``https://astral.sh/uv/install.ps1`` | iex`

    - Variables de entorno: añadir `%USERPROFILE%.local\bin` al PATH

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

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

- En el ordenador, busque el número de puerto: **Administrador de dispositivos → Puertos (COM y LPT)**, por ejemplo `COM11`

---

## Configurar el puerto serie (script 2)

**Haga doble clic en ****`2-配置串口.bat`** (la lógica real está en `2-配置串口.ps1`):

1. Le indicará "conecte la placa controladora de servos al ordenador" → pulse Intro para iniciar la detección

2. Se listan automáticamente los puertos COM detectados (con el nombre del dispositivo)

3. Con un solo puerto, confirme con Intro; con varios puertos, introduzca el número

4. Se escriben automáticamente el `--serialport` de los 3 archivos yml de dataflow y el puerto predeterminado de `AHControl\src\main.rs`

5. El archivo original se copia automáticamente a `.bak`

> Si vuelve a enchufar o desenchufar el USB, el número de puerto puede cambiar y habrá que volver a ejecutar este script.
> 
> 

---

## Despliegue del código (script 3)

**Haga doble clic en ****`3-部署代码.bat`**, que realiza automáticamente:

1. Iniciar el demonio de dora (`dora up`)

2. Crear el entorno virtual de Python 3.12 (`uv venv --python 3.12`)

3. Activar el entorno virtual

4. Compilar el nodo Rust AHControl (`cargo build --release`; la primera vez, unos 10 minutos)

5. Sincronizar las dependencias de AHSimulation y HandTracking (`uv sync`)

6. Instalar obligatoriamente mediapipe==0.10.14

> El despliegue solo debe ejecutarse una vez. Si se vuelve a ejecutar, preguntará si se desea recrear el entorno virtual.
> 
> 

---

## Ejecutar el código (script 4)

**Haga doble clic en ****`4-运行代码.bat`** y aparecerá un menú interactivo:

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

> La primera vez que se ejecute, Windows puede bloquear el permiso de la cámara; basta con hacer clic en "Permitir".
> 
> 

---

## Limpieza del proyecto (script 0)

**Haga doble clic en ****`0-清理项目.bat`**; introduzca `Y` para confirmar y se limpiará automáticamente:

1. Detener el demonio de dora

2. Eliminar los 3 entornos virtuales (`.venv`)

3. Eliminar los productos de compilación de Rust (`Demo\target`)

4. Eliminar `pycache`, las copias de seguridad `.bak`, los registros y `Demo\out` (directorio de registros de dora)

5. **Restaurar el puerto predeterminado** (`--serialport /dev/ttyACM0`) y eliminar los restos del puerto serie de esta máquina

> Tras la limpieza, se puede copiar toda la carpeta `AmazingHand-main` a otra persona, limpia y sin restos. En una máquina nueva, basta con ejecutar en el orden 1 → 2 → 3 → 4.
> 
> 

---

## Preguntas frecuentes y notas

### 8.1 cargo se queda bloqueado en `Updating 'tuna' index`

- Causa: la configuración del espejo usa el **método de repositorio git** (`.../git/crates.io-index.git`), que la primera vez descarga un índice de 1GB+

- Solución: cambiar `C:\Users\<usuario>\.cargo\config.toml` al **índice disperso sparse** (véase la sección 2.2) o volver a ejecutar directamente `1-安装环境.bat`

### 8.2 mediapipe carece del submódulo solutions / instalación dañada

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Debe ejecutarse con el entorno virtual activado (en el directorio `Demo`)

- `3-部署代码.bat` ya realiza este paso automáticamente como respaldo

### 8.3 Versión de dora incompatible (message v0.8.0 vs v0.7.0)

- Síntoma: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: la versión de dora-cli no coincide con dora-node-api. **Deben unificarse en 0.5.0**

    - Comprobación: `dora --version` debería mostrar `dora-cli 0.5.0`, `dora-message: 0.8.0`

    - Solución: `cargo install dora-cli --version 0.5.0 --force`

    - Si en el PATH hay varios dora (como la versión antigua de `C:\Users\xxx\.dora\bin`), asegúrese de que `.cargo\bin` esté delante, o elimine la versión antigua

### 8.4 MuJoCo / mediapipe no pueden cargar el modelo (rutas en chino)

- Síntoma: `ParseXML: Error opening file '...\scene.xml'` o `Can't find file: ....tflite`

- Causa: el cargador de C++ de MuJoCo 3.x / mediapipe en Windows **no puede abrir rutas absolutas que contengan chino** (como `D:\Claude工作区...`)

- Este proyecto ya incorpora la corrección:

    - `AHSimulation\AHSimulation\mj_mink_*.py` cambia el directorio de trabajo antes de cargar el modelo

    - `HandTracking\mediapipe_patch.py` lo evita usando la ruta corta 8.3 + rutas relativas

- No elimine este código de corrección

### 8.5 Permiso de cámara

- En la primera ejecución, seleccione "Permitir" en la ventana emergente

- Configuración → Privacidad → Cámara → Permitir el acceso a aplicaciones de escritorio

### 8.6 El número de puerto cambia cada vez

- Tras volver a enchufar el USB, el número COM puede cambiar; vuelva a ejecutar `2-配置串口.bat`

### 8.7 Falta OpenCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(Ejecutar en el directorio `HandTracking` y con el entorno virtual activado)

---

## Descripción de la estructura del código

### Directorio Demo

### Correspondencia entre los distintos dataflow

### Principio del flujo de datos

```Bash
Cámara → HandTracking (reconocimiento de gestos con MediaPipe)
              ↓ Coordenadas de los puntos clave de la mano
         AHSimulation (simulación MuJoCo + cinemática inversa)
              ↓ Ángulos objetivo de las articulaciones
         AHControl (puerto serie → placa controladora de servos → mano diestra)
```

### Ubicación de la configuración de puertos

- La línea `args:` de los tres `dataflow_tracking_real_*.yml`: `--serialport COMxx`

- `default_value = "COMxx"` de `AHControl\src\main.rs` (valor predeterminado del parámetro de puerto serie)

- `AHControl\config\*.toml`: modelo de servo, ID, desplazamiento (normalmente no es necesario modificarlo)

