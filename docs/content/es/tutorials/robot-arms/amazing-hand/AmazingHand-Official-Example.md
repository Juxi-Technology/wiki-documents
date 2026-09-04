---
title: Tutorial de ejecución del ejemplo oficial de la mano robótica
description: "Descargue el paquete comprimido de código de este tutorial para la demo, o clone el repositorio de código abierto oficial https://github.com/pollen-robotics/AmazingHand.git ; el código oficial puede contener errores."
---

# Tutorial de ejecución del ejemplo oficial de la mano robótica

> **[Comprar en la tienda](https://www.juxitech.com/es/products/amazinghand)**

## 1. Descarga del código

Se recomienda descargar el paquete comprimido del código de este tutorial para la demostración del ejemplo Demo, o clonar el repositorio de código abierto oficial https://github.com/pollen-robotics/AmazingHand.git . Tenga en cuenta que el código fuente abierto oficial puede contener errores u omisiones.

[Tutorial de ejecución del ejemplo oficial de AmazingHand](https://juxitech.feishu.cn/wiki/SfUCweM6ni4IookxjOMcLf5cnwd)

Paquete comprimido de código para Windows

[AmazingHand-main.zip]

Paquete comprimido de código para Linux

[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Instalación del entorno

Instale Rust, uv y dora-rs según el proceso de autoinstalación del sistema

**1. Instalar Rust:** [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

Referencia para la configuración de las variables de entorno de Rust en Windows (¡importante!) https://zhuanlan.zhihu.com/p/1958936613276087180

Configuración de las variables de entorno en Linux:

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

La primera instalación puede requerir el Instalador de Visual Studio

**Configurar la fuente de espejo de Cargo**

Cree el archivo de configuración `config.toml` en la carpeta `.cargo` y configure el espejo `crates.io-index` de Tsinghua para que Cargo use la fuente de espejo de la Universidad de Tsinghua para descargar los crates.

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. Instalar uv:** [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

Abra la terminal de PowerShell en Windows, copie e introduzca este comando para instalar

**Configuración de las variables de entorno en Linux:**

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

**3. Instalar dora-rs:** para la descarga e instalación, consulte [https://dora-rs.ai/docs/guides/Installation/installing](https://dora-rs.ai/docs/guides/Installation/installing)

Configuración de las variables de entorno en Linux:

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

## 3. Método de conexión

La fuente de alimentación requiere al menos 5V3A, se conecta externamente a una placa de controlador de servos y se conecta a la computadora por USB

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

## 4. Demostración del ejemplo

### **1. Verificar el número de puerto de la placa del controlador de servos**

- En el sistema Windows suele ser COM11; el número de puerto de la placa del controlador de servos se puede encontrar en el Administrador de dispositivos o en el programa de host de servos Feite

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

- En los sistemas Ubuntu y Linux suele ser /dev/ttyACM0

Verifique el número de puerto de la placa del controlador de servos desde la línea de comandos:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

Si el comando «ls /dev/ttyUSB\* /dev/ttyACM\*» no encuentra el directorio en la máquina virtual, compruebe en la esquina inferior derecha de la máquina virtual si la mano robótica está conectada a la computadora. Si lo está, desconéctela y conéctela a la máquina virtual.

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### **2. Modificar el número de puerto en el código**

① Localice el archivo de código main.rs en el directorio AmazingHand-main\Demo\AHControl\src, ábralo con un editor de texto y cámbielo al número de puerto encontrado en su propio host (COM\* en Windows y, en general, /dev/ttyACM\* en los sistemas Ubuntu y Linux)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

② Localice el archivo de instancia correspondiente

**Mano diestra** Encuentre dataflow_tracking_real_right.yml en el directorio AmazingHand-main\Demo

**Mano zurda** Encuentre dataflow_tracking_real_left.yml en el directorio AmazingHand-main\Demo

**Dos manos** Encuentre dataflow_tracking_real_2hands.yml en el directorio AmazingHand-main\Demo

Ábralo en formato de texto y cámbielo al número de puerto encontrado en su propio host (COM\* en Windows y, en general, /dev/ttyACM\* en los sistemas Ubuntu y Linux)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

### **3. Despliegue del código**

- Abra la carpeta Demo

En el sistema Windows, en el directorio, escriba Powershell y pulse Enter para abrirlo; luego inicie el proceso demonio (cada vez):

En los sistemas Linux, ábralo directamente desde la consola e inicie el proceso demonio (cada vez):

```Plain Text
dora up
```

- Luego ejecute desde este directorio en la consola (¡al configurar el entorno, puede ejecutarlo una vez! ¡Volver a ejecutarlo sobrescribirá el entorno virtual!) Cree un entorno virtual:

```Plain Text
uv venv --python 3.12
```

- Active el entorno virtual (cada vez) introduciendo y ejecutando lo siguiente según el sistema:

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

¡Asegúrese de que la consola haya activado el entorno virtual!

- Sincronice las dependencias y entre en la carpeta AHControl

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Luego introduzca `cd..` y pulse Enter para volver al directorio Demo. Entre en la carpeta AHSimulation

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Luego introduzca `cd..` y pulse Enter para volver al directorio Demo. Entre en la carpeta HandTracking

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Resultados de ejecución

- ¡Abra la carpeta Demo! Escriba Powershell en el directorio y pulse Enter para abrirlo; luego inicie el proceso demonio (cada vez):

```Plain Text
dora up
```

- Active el entorno virtual (cada vez). Introduzca y ejecute según el sistema:

Comando para activar el entorno virtual en la plataforma Windows:

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Comando para activar el entorno virtual en la plataforma Linux:

```Plain Text
source .venv/bin/activate
```

### Entorno de simulación

- Ejecute la demo de seguimiento de la mano por webcam solo en el entorno de simulación:

```Plain Text
dora build dataflow_tracking_simu.yml --uv   *#(Execute only once)*
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/5.png)

### Operación con hardware real (seguimiento de la mano)

- Ejecute la demo de seguimiento de la mano por webcam con hardware real:

    #### Mano diestra

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Mano zurda

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Dos manos (tenga en cuenta que ambas están conectadas a una placa de controlador de servos)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/6.png)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)

### Ejemplo simple para controlar el ángulo del dedo simulado

- Ejecute un ejemplo simple para controlar el ángulo del dedo en la simulación:

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

Descripción

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) incluye un nodo dora-rs para controlar los motores, así como utilidades para configurarlos.

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) incluye un nodo dora-rs que simula el movimiento de la mano y obtiene la cinemática inversa.

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) incluye un nodo dora-rs que rastrea las manos desde una webcam y las utiliza como objetivo para controlar la AH.

## Precauciones

### 1. Problema de versión de mediapipe

En pyproject.toml está configurado mediapipe>=0.10.14, pero el paquete de mediapipe instalado no incluye el submódulo solutions. Lo más probable es que la versión de mediapipe sea incompatible con Python 3.12 (las versiones más recientes de mediapipe tienen problemas con el soporte de Python 3.12), o que los archivos del paquete se hayan dañado durante la instalación.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Incompatibilidad de versión de Dora, formato de mensaje (v0.7.0 vs v0.8.0)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

Respuesta: ① Primero, en el directorio .cargo/registry/src/github.xxxxxxxx/ del directorio de usuario de la unidad C, elimine únicamente los paquetes de dependencias correspondientes.

**`dora-message-0.7.0`** (¡Clave! Es la carpeta del formato de mensaje antiguo y debe eliminarse)

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16` (biblioteca auxiliar de la que depende Dora, debe eliminarse junto con la versión antigua)

② Abra la carpeta Demo/AHControl y modifique dora-node-api="0.5.0" y dora-message="0.8.0" en Cargo.toml

③ En la consola, navegue al directorio AHControl y vuelva a ejecutar cargo build --release

④ Vuelva a seguir la «[operación con hardware real](https://juxitech.feishu.cn/docx/FnF9dE1w7oFLtSx2p2ocU96Knpe#doxcnI3XybJ3CPPpdlSk5iH8wug)» para reconstruir

Modifique la versión correspondiente según el error real. Por ejemplo, si dora-message requiere la versión 0.6.0, cámbielo a dora-node-api="0.4.0" dora-message="0.6.0".

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

### 3. Falta la biblioteca de dependencias openCV

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

Introduzca el siguiente comando en el directorio HandTracking

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. Habilitar el permiso de cámara (computadora)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### 5. La máquina virtual 22.04 usa la cámara

Consulte https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Instalación de la cámara de escritorio

#### Pasos de instalación del soporte del kit de cámara ambiental

1. Primero, fije el soporte de ángulo de ajuste fino

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

2. Vista lateral del kit de cámara ambiental

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

## La máquina virtual 22.04 ejecuta directamente el seguimiento de la mano

Descargue estos cuatro archivos, colóquelos en un mismo directorio con nombre en inglés y, a continuación, use el software de máquina virtual para abrir directamente el archivo .ovf y entrar en el sistema

Contraseña ubuntu

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand-file1.iso]

**1. Abra la consola en el directorio Demo:**

```Plain Text
dora up
```

**Y active el entorno virtual:**

```Plain Text
source .venv/bin/activate
```

**2. Permiso de cámara en la máquina virtual**

Referencia para que la máquina virtual 22.04 use la cámara https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Verifique el puerto de la placa del controlador de servos desde la línea de comandos:**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Modificar el número de puerto en el archivo de código**

① Localice el archivo de código main.rs en el directorio AmazingHand-main\Demo\AHControl\src, ábralo en modo texto y cámbielo al número de puerto encontrado en su propio host (COM\* en Windows y, en general, /dev/ttyACM\* en los sistemas Ubuntu y Linux)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

② Encuentre el archivo de instancia correspondiente

**Mano diestra** Encuentre dataflow_tracking_real_right.yml en el directorio AmazingHand-main\Demo

**Mano zurda** Encuentre dataflow_tracking_real_left.yml en el directorio AmazingHand-main\Demo

**Dos manos** Encuentre el archivo dataflow_tracking_real_2hands.yml en el directorio AmazingHand-main\Demo

Ábralo en formato de texto y cámbielo al número de puerto encontrado en su propio host (COM\* en Windows y, en general, /dev/ttyACM\* en los sistemas Ubuntu y Linux)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![Image](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

**5. Ejecute el seguimiento de la mano derecha**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
