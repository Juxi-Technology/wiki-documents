---
title: Tutorial de uso del robot móvil Lekiwi
description: "Guía completa del robot móvil Lekiwi basado en LeRobot: instalación, configuración de motores, teleoperación, recolección de datos, entrenamiento y evaluación"
---

# Tutorial de uso del robot móvil Lekiwi

> **[Comprar en la tienda](https://www.juxitech.com/es/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


> [!Nota] Este tutorial sigue la documentación oficial de LeRobot. Si encuentra problemas de software o dependencias insolubles, repórtelos a la [plataforma LeRobot](https://github.com/huggingface/lerobot) o al [canal de Discord de LeRobot](https://discord.gg/8TnwDdjFGU).

## Características principales

1. **Código abierto y bajo costo**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) ofrece una solución de robot móvil open source de bajo costo.
2. **Integración con LeRobot**: diseñado para integrarse con la [plataforma LeRobot](https://github.com/huggingface/lerobot).
3. **Recursos de aprendizaje completos**: guías de ensamblaje y calibración, tutoriales de prueba, recolección de datos, entrenamiento y despliegue para empezar rápido.
4. **Compatible con Nvidia**: usable con el reComputer Mini J4012 Orin NX 16 GB.
5. **Múltiples escenarios**: educación, investigación científica, producción automatizada y robótica: operaciones robóticas eficientes y precisas.

JUXI solo es responsable de la calidad del hardware. Los tutoriales siguen estrictamente la documentación oficial.

**Nota**
- Todos los servos del chasis Lekiwi necesitan alimentación de 12 V. Para brazos de 5 V, proporcionamos un módulo reductor 12 V→5 V; las modificaciones del circuito son por su cuenta.
- Alimentación de 12 V – opción disponible al finalizar la compra. Si ya tiene una fuente de 12 V, basta convertir la salida a un enchufe DC 5521.
- Controlador Raspberry Pi y cámara – se compran por separado mediante la interfaz de pedido.

## Lista de materiales (BOM)



## Entorno de sistema inicial

**Para Ubuntu x86:**
- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**Para Jetson Orin:**
- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**Para Raspberry Pi:**
- Raspberry Pi 5, 4G~16G

### Configurar SSH

Tras configurar el Raspberry Pi, habilite y configure [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol) para iniciar sesión desde su portátil sin pantalla, teclado ni ratón. Hay un buen [tutorial](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh) aquí. Puede conectarse por el símbolo del sistema (cmd) o, con VSCode, mediante [esta](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extensión.

## Guía de impresión 3D

### Piezas

Proporcionamos archivos STL imprimibles para las siguientes piezas. Se pueden imprimir en una impresora FDM de consumo con filamento PLA estándar. Probadas en una Bambu Lab P1S: basta cargarlas en bambuslicer, dejar que gire/ordene automáticamente y activar los soportes recomendados.

### Parámetros de impresión

Los STL se imprimen directamente en muchas FDM. Ajustes probados y recomendados (otros pueden funcionar):

- Material: PLA+
- Diámetro y precisión de boquilla: boquilla de 0,2 mm, altura de capa de 0,2 mm
- Densidad de relleno: 15 %
- Velocidad de impresión: 150 mm/s
- Si es necesario, subir el G-code (archivo laminado) e imprimir

# Instalar LeRobot

En su Raspberry Pi:

### 1. [Instalar Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Reiniciar el Shell

Pegue en su Shell: `source ~/.bashrc` o, para Mac: `source ~/.bash_profile` o `source ~/.zshrc` (si usa zshell)

### 3. Crear y activar un nuevo entorno Conda para LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Luego active el entorno Conda (cada vez que abra un Shell para usar LeRobot):

```Bash
conda activate lerobot
```

### 4. Clonar LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar ffmpeg en su entorno:

Con `miniconda`, instalar `ffmpeg` en el entorno:

```PowerShell
conda install ffmpeg -c conda-forge
```

Esto normalmente instala ffmpeg 7.X compilado con el codificador libsvtav1. Si libsvtav1 no está soportado (comprobable con `ffmpeg -encoders`):

【Todas las plataformas】instalar explícitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Solo Linux】instalar las dependencias de compilación de ffmpeg y compilarlo desde el código fuente con soporte libsvtav1; verificar con `which ffmpeg` que se usa el ejecutable correcto.

Si encuentra el error siguiente, los comandos anteriores también lo resuelven.


![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)


### 6. Instalar LeRobot con las dependencias de motores feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

### 7. Configurar el tiempo de conexión

En `lerobot\src\lerobot\robots\lekiwi`, encontrar config_lekiwi.py
connection_time_s: int = 7200 # es decir, 2 horas



## C. Instalar LeRobot en el portátil

Si LeRobot ya está instalado en el portátil, salte este paso; si no, siga los **mismos pasos** que en el Raspberry Pi.

> [!Consejo] Usaremos con frecuencia el símbolo del sistema (cmd). Si no está familiarizado: [curso rápido de línea de comandos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line).

En su ordenador:

### 1. [Instalar Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

### 2. Reiniciar el Shell

Pegue: `source ~/.bashrc` o, para Mac: `source ~/.bash_profile` o `source ~/.zshrc` (si usa zshell)



### 3. Crear y activar un entorno Conda para LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Luego active el entorno (cada vez que use LeRobot):

```Bash
conda activate lerobot
```

### 4. Clonar LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar ffmpeg:

Con `miniconda`, instalar `ffmpeg`:

```PowerShell
conda install ffmpeg -c conda-forge
```
![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)


Esto normalmente instala ffmpeg 7.X con libsvtav1. Si no está soportado (`ffmpeg -encoders`):

【Todas las plataformas】instalar explícitamente ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Solo Linux】instalar dependencias de compilación y compilar ffmpeg con libsvtav1; verificar con `which ffmpeg`.

Si encuentra el error siguiente, los comandos anteriores también lo resuelven.



### 6. Instalar LeRobot con dependencias feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# Configurar los motores





### **1. Encontrar el puerto USB asociado al brazo robótico**

Para el puerto correcto de un motor, ejecute dos veces este script de utilidad:

```Bash
lerobot-find-port
```

Ejemplo de salida (por ej. `/dev/tty.usbmodem575E0031751` en Mac, o `/dev/ttyACM0` en Linux):

Ejemplo de salida (por ej. `/dev/tty.usbmodem575E0032081` en Mac, o `/dev/ttyACM1` en Linux):

Solución de problemas: en Linux, quizá haya que conceder acceso al puerto USB:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurar sus motores (salteable en el producto terminado)**

Inserte cada motor del chasis uno por uno y ejecute este script: primero inicializa los servos del brazo (ID 6..1) y luego los del chasis, estableciendo sus IDs (ID 9..7). Si el brazo ya está calibrado, puede pulsar Enter continuamente para sobrescribir y saltar:

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



### 3. Configurar el espejo de HuggingFace

- Ubuntu

```Shell
sudo nano ~/.bashrc
# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT
# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc
# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc
# 输出
# https://hf-mirror.com
```

#### ①Crear token

https://huggingface.co/settings/tokens



![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)



![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)



#### ②Anotar el token

Por ejemplo, el mío:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③Vincular el token

```Shell
hf auth login
hf auth whoami
```



## Teleoperación

Conéctese al Raspberry Pi por SSH, active el entorno y lance el script host:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```



Luego, en el portátil, active `conda activate lerobot` y lance:

```Bash
python examples/lekiwi/teleoperate.py
```

La pantalla del portátil debe mostrar: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`Ahora puede mover el brazo de control y usar (W, A, S, D) para avanzar, girar a la izquierda, retroceder y girar a la derecha. (Z, X) para girar a izquierda/derecha. (R, F) para aumentar/reducir la velocidad. Hay tres modos de velocidad – ver tabla:

Con otro teclado, cambie las teclas en [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Solución de problemas de comunicación

Si tiene problemas al conectar el robot móvil SO101, siga estos pasos.

### 1. Verificar la configuración de la dirección IP

Asegúrese de que la IP correcta del Raspberry Pi esté en el archivo de configuración. Para comprobarla (en la consola del Pi):

```Bash
hostname *-I*
```

### 2. Verificar que el portátil/PC alcanza el Pi

Ping desde el portátil:

```Bash
ping <your_pi_ip_address>
```

Si el ping falla:
- ¿Está encendido el Pi y en la misma red?
- ¿Está activado SSH en el Pi?

### 3. Intentar conexión SSH

Si no hay login SSH: la conexión quizá no es correcta. Comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

por ej. `ssh pi@192.168.0.106`

Si hay error de conexión:
- Active SSH en el Pi:

```Bash
sudo raspi-config
```

- Luego navegue: **Interfacing Options -\> SSH** y actívelo.

### 4. ¡Coherencia de los archivos de configuración!!!

Asegúrese de que los archivos de configuración del portátil/PC y del Raspberry Pi sean exactamente iguales.

# G. Grabar un dataset
![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)


Tras familiarizarse con la teleoperación, grabe su primer dataset con LeKiwi.

Para iniciar, conéctese al Raspberry Pi por SSH, active el entorno y lance el script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Para subir al Hub, si no ha iniciado sesión, conéctese con un token de escritura (generable en [Hugging Face Settings](https://huggingface.co/settings/tokens)):
![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)


```Shell
hf auth login
hf auth whoami
```

Guarde el nombre del repositorio de Hugging Face en una variable:

```Bash
hostname *-I*
```

Luego, en el portátil, grabe 2 episodios y suba el dataset al hub:

```Bash
python examples/lekiwi/record.py
```

# H. Visualizar el dataset

Un dataset subido se visualiza [en línea](https://huggingface.co/spaces/lerobot/visualize_dataset) – copie el ID de repositorio generado:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Sin subida, también en local (navegador en `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### Visualizar un dataset (salteable, opcional)

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Con subida, también en local:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Sin subida, también en local:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Aquí, `juxi` es el `repo_id` personalizado en la recolección.

#### Consejos de recolección

Tras familiarizarse, cree datasets más grandes. Buena tarea inicial: agarrar objetos en distintas posiciones y ponerlos en un contenedor. Al menos 50 episodios, 10 por posición. Cámara fija, gesto de agarre consistente. El objeto debe verse claramente; criterio simple: la tarea debe poder completarse mirando solo la imagen de la cámara.

En el siguiente capítulo entrenará la red neuronal. Tras un rendimiento fiable de agarre, introduzca más variación (más posiciones, técnicas diferentes, cambio de cámara).

Evite demasiada variación demasiado rápido: puede afectar los resultados.

Para profundizar: [artículo de blog sobre buenos datasets](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

#### Solución de problemas:
