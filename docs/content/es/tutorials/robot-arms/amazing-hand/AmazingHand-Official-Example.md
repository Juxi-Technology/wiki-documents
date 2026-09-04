---
title: Tutorial de ejecución del ejemplo oficial de la mano robótica
description: "Descargue el paquete comprimido de código de este tutorial para la demo, o clone el repositorio de código abierto oficial https://github.com/pollen-robotics/AmazingHand.git ; el código oficial puede contener errores."
---

# Tutorial de ejecución del ejemplo oficial de la mano robótica

> **[Comprar en la tienda](https://www.juxitech.com/es/products/amazinghand)**


## 1. Descarga del código

Descargue el paquete comprimido de código de este tutorial para la demo, o clone el repositorio de código abierto oficial https://github.com/pollen-robotics/AmazingHand.git ; el código oficial puede contener errores.

Archivo de código Windows
[AmazingHand-main.zip]

Archivo de código Linux
[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Instalación del entorno

Instalar Rust, uv y dora-rs según el sistema

**1. Instalar Rust:** https://www.rust-lang.org/tools/install
Windows: configurar las variables de entorno de Rust (¡importante!) ver https://zhuanlan.zhihu.com/p/1933164131969659101
Linux: configurar variables de entorno:



![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)



La primera instalación puede requerir el Instalador de Visual Studio

**Configurar el espejo de Cargo**

En la carpeta `.cargo`, crear el archivo de configuración `config.toml` y configurar el espejo `crates.io-index` de Tsinghua. Cargo descargará los crates a través del espejo de Tsinghua.

```Bash
[source.crates-io]
replace-with = 'tuna'
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. Instalar uv:** https://docs.astral.sh/uv/getting-started/installation/
En Windows, abrir PowerShell, pegar y ejecutar el comando
**Linux: configurar variables de entorno:**



**3. Instalar dora-rs:** ver https://dora-rs.ai/docs/guides/Installation/installing
Linux: configurar variables de entorno:



## 3. Conexión

Fuente de alimentación de al menos 5V/3A. Conectar la placa driver de servos externa y conectarla al PC por USB



## 4. Demo de ejemplo

### **1. Averiguar el número de puerto de la placa driver**

- Windows normalmente COM11 – puerto en el Administrador de dispositivos o en el software host de Feetech



- Ubuntu/Linux normalmente /dev/ttyACM0
Verificar el puerto desde la línea de comandos:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)


Si en la VM `ls /dev/ttyUSB* /dev/ttyACM*` no encuentra nada, compruebe abajo a la derecha de la VM si la mano está conectada al PC. Si lo está, desconéctela y conéctela a la VM

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)



### **2. Modificar el número de puerto en el código**

①Abrir `main.rs` en AmazingHand-main\Demo\AHControl\src con un editor de texto y cambiarlo al puerto encontrado (Windows COM*, Ubuntu/Linux normalmente /dev/ttyACM*)



②Buscar el archivo de instancia correspondiente
**Mano derecha** …\Demo\dataflow_tracking_real_right.yml
**Mano izquierda** …\Demo\dataflow_tracking_real_left.yml
**Dos manos** …\Demo\dataflow_tracking_real_2hands.yml
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)


Abrir en editor de texto y cambiar al puerto encontrado (Windows COM*, Ubuntu/Linux normalmente /dev/ttyACM*)







### **3. Despliegue del código**

- Abrir la carpeta Demo



- Windows: escribir `Powershell` en el directorio y pulsar Enter



- Iniciar el proceso demonio (cada vez):
Linux: abrir directamente en la consola, iniciar el demonio (cada vez):
```Plain Text
dora up
```

- Luego en la consola, ejecutar desde este directorio (¡basta con una vez al configurar el entorno!! Volver a ejecutar sobrescribe el entorno virtual!!) Crear el entorno virtual:
```Plain Text
uv venv --python 3.12
```

- Activar el entorno virtual (cada vez) según el sistema:
```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```



¡Asegúrese de que el entorno virtual está activado en la consola!

- Sincronizar dependencias, entrar en AHControl
```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Luego `cd ..` y Enter para volver a Demo! Entrar en AHSimulation
```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Luego `cd ..` y Enter para volver a Demo! Entrar en HandTracking
```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Resultado

- Abrir la carpeta Demo! Escribir `Powershell` y Enter, iniciar el demonio (cada vez):
```Plain Text
dora up
```

- Activar el entorno virtual (cada vez) según el sistema:
Windows:
```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux:
```Plain Text
source .venv/bin/activate
```

### Entorno de simulación

- Ejecutar la demo de seguimiento de la mano por webcam solo en simulación:
```Plain Text
dora build dataflow_tracking_simu.yml --uv   #(solo una vez)
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```





### Ejecución con hardware real (seguimiento de la mano)

- Ejecutar la demo con hardware real:
    #### Mano derecha
    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #(solo una vez)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Mano izquierda
    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #(solo una vez)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Dos manos (¡ambas en una sola placa driver!)


![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)


    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #(solo una vez)
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)





### Ejemplo simple: controlar los ángulos de los dedos en simulación

- Ejecutar un ejemplo simple para controlar los ángulos de los dedos en simulación:
    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #(solo una vez)
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```





Descripción
- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) contiene un nodo dora-rs para controlar los motores y utilidades para configurarlos.
- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) contiene un nodo dora-rs que simula el movimiento de la mano y obtiene la cinemática inversa.
- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) contiene un nodo dora-rs que sigue la mano por webcam y la usa como objetivo de control AH!.

## Notas

### 1. Problema de versión de mediapipe

`pyproject.toml` configura mediapipe>=0.10.14; si el paquete instalado no tiene el submódulo `solutions`, probablemente sea una incompatibilidad de mediapipe con Python 3.12 (las versiones recientes tienen problemas con Python 3.12) o archivos dañados.

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Incompatibilidad de versión de Dora, formato de mensaje (v0.7.0 vs v0.8.0)



Solución: ①En el directorio de usuario, bajo .cargo/registry/src/github.xxxxxxxx/, elimine solo los paquetes correspondientes!
**`dora-message-0.7.0`** (¡crucial! carpeta de formato de mensaje antiguo, debe eliminarse)
`dora-core-0.4.1`
`dora-node-api-0.4.1`
`dora-arrow-convert-0.4.1`
`dora-metrics-0.4.1`
`dora-tracing-0.4.1`
`const-random-macro-0.1.16` (biblioteca auxiliar de Dora, eliminar con la versión antigua)

②Abrir Demo/AHControl, cambiar en Cargo.toml: dora-node-api="0.5.0" dora-message="0.8.0"
③En la consola, entrar en AHControl y volver a ejecutar `cargo build --release`
④Reconstruir según [«Ejecución con hardware real»](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg?node-id=1759567650651511609&from=from_node_link)
Adaptar las versiones según el error – p. ej., si se necesita dora-message 0.6.0: dora-node-api="0.4.0" dora-message="0.6.0"
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)






### 3. Falta la biblioteca openCV



En HandTracking:
```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4. Activar el permiso de cámara (PC)







### 5. Usar la cámara en la VM 22.04

Ver https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Instalar la cámara de escritorio

#### Instalación del soporte del kit de cámara ambiental

1. Fijar primero el soporte de ángulo de ajuste fino



2. Kit de cámara ambiental lateral



## Ejecutar el seguimiento de la mano directamente en una VM 22.04

Descargue estos cuatro archivos, póngalos en un mismo directorio en inglés y abra el archivo .ovf directamente con el software de VM
Contraseña ubuntu
[ubuntu22.04_amazinghand.ovf]
[ubuntu22.04_amazinghand-disk1.vmdk]
[ubuntu22.04_amazinghand.mf]
[ubuntu22.04_amazinghand-file1.iso]

**1. Abrir la consola en el directorio Demo:**
```Plain Text
dora up
```

**Activar el entorno virtual:**
```Plain Text
source .venv/bin/activate
```

**2. Permiso de cámara de la VM**
Para la cámara en VM 22.04: https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Verificar el puerto de la placa driver:**
```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```
![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)


```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Modificar el puerto en el código**
①Abrir `main.rs` en AmazingHand-main\Demo\AHControl\src, cambiar al puerto encontrado (Windows COM*, Ubuntu/Linux normalmente /dev/ttyACM*)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)



②Buscar el archivo de instancia
**Mano derecha** …\Demo\dataflow_tracking_real_right.yml
**Mano izquierda** …\Demo\dataflow_tracking_real_left.yml
**Dos manos** …\Demo\dataflow_tracking_real_2hands.yml

Abrir en editor de texto, cambiar al puerto encontrado (Windows COM*, Ubuntu/Linux normalmente /dev/ttyACM*)







**5. Lanzar el seguimiento de la mano derecha**
```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
