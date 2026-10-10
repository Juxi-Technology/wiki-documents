---
title: Tutorial de uso del robot móvil Lekiwi
description: "Guía completa del robot móvil Lekiwi basado en LeRobot: instalación, configuración de motores, teleoperación, recolección de datos, entrenamiento y evaluación"
---

# Tutorial de uso del robot móvil Lekiwi

> **[Comprar en la tienda](https://www.juxitech.com/es/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

El brazo líder negro utiliza un adaptador de alimentación de 5 V y 6 A, y el brazo seguidor blanco utiliza un adaptador de alimentación de 12 V y 5 A.

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

El código de este repositorio de tutoriales se mantiene en la versión probada y estable de LeRobot anterior al 1 de octubre de 2026. Desde entonces, Hugging Face ha llevado a cabo una actualización muy grande de LeRobot, añadiendo muchísimas funciones nuevas. Si desea probar el tutorial más reciente, consulte la [documentación oficial](https://huggingface.co/docs/lerobot/lekiwi).



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) es un proyecto de coche robótico totalmente de código abierto iniciado por [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Incluye archivos detallados de impresión 3D e instrucciones de funcionamiento, y está diseñado para ser compatible con el framework de aprendizaje por imitación [LeRobot](https://github.com/huggingface/lerobot/tree/main). Admite el brazo robótico SO101, lo que permite un flujo de trabajo completo de aprendizaje por imitación.

[*En el CAD en línea de Fusion360*](https://a360.co/4k1P8yO)* puede visualizar las posiciones exactas de los componentes.*

[Archivo URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Vista previa del URDF en línea https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## Características principales

1. **Código abierto y bajo coste**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) ofrece una solución de coche robótico de código abierto y bajo coste.
2. **Integración con LeRobot**: diseñado para integrarse con la [plataforma LeRobot](https://github.com/huggingface/lerobot).
3. **Recursos de aprendizaje completos**: recursos de aprendizaje de código abierto integrales, que incluyen guías de montaje y calibración, además de tutoriales para probar, recopilar datos, entrenar y desplegar, lo que ayuda a los usuarios a empezar rápidamente y crear aplicaciones robóticas.
4. **Compatible con Nvidia**: se puede utilizar con el reComputer Mini J4012 Orin NX 16 GB.
5. **Aplicaciones multiescenario**: adecuado para educación, investigación científica, producción automatizada y robótica, y ayuda a los usuarios a lograr un funcionamiento robótico eficiente y preciso en una gran variedad de tareas complejas.

JUXI solo se responsabiliza de la calidad del propio hardware. Este tutorial se actualiza estrictamente de acuerdo con la documentación oficial. Si se encuentra con problemas de software o de dependencias del entorno que realmente no pueda resolver, notifíquelos cuanto antes a la [plataforma LeRobot](https://github.com/huggingface/lerobot) o al [canal de Discord de LeRobot](https://discord.gg/8TnwDdjFGU).

**Nota**
- Todos los servos del chasis Lekiwi requieren una fuente de alimentación de 12 V. Para los usuarios con un brazo robótico de 5 V, proporcionamos un módulo reductor de tensión de 12 V a 5 V. Tenga en cuenta que deberá modificar el cableado usted mismo.
- Fuente de alimentación de 12 V: puede seleccionar esta opción en el momento de la compra si es necesario. Si ya dispone de una fuente de alimentación de 12 V, solo tiene que convertir su conector de salida de alimentación a un enchufe de CC de 5521.
- Controlador Raspberry Pi y cámaras: deben adquirirse por separado a través de la página de pedido.

## Lista de materiales (BOM)


## Entorno inicial del sistema

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

- Raspberry Pi 5, 4G\~16G

### Configuración de SSH

Después de configurar la Raspberry Pi, debería habilitar y configurar [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell) para poder iniciar sesión en la Raspberry Pi desde su portátil sin conectar una pantalla, un teclado y un ratón a la Pi. Puede encontrar un excelente tutorial [aquí](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Puede iniciar sesión en la Raspberry Pi a través del símbolo del sistema (cmd) o, si utiliza VSCode, puede usar [esta](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extensión.

## Guía de impresión 3D

### Piezas

Proporcionamos archivos STL imprimibles para las siguientes piezas impresas en 3D. Estas piezas se pueden imprimir en impresoras FDM de gama de consumo con filamento PLA de uso general. Las probamos en una impresora Bambu Lab P1S. Para cada componente, simplemente lo cargamos en Bambu Studio, dejamos que se autorrote y autororganice, habilitamos los soportes recomendados e imprimimos.


### Ajustes de impresión

Los archivos STL proporcionados se pueden imprimir directamente en muchas impresoras FDM. A continuación figuran los ajustes probados y recomendados; es posible que otros ajustes también funcionen.

- Material: PLA+
- Diámetro y precisión de la boquilla: diámetro de boquilla de 0.2mm, altura de capa de 0.2mm
- Densidad de relleno: 15%
- Velocidad de impresión: 150 mm/s
- Si es necesario, suba el G-code (archivo laminado) a la impresora e imprima

## A. Instalación de LeRobot en la Raspberry Pi

En su Raspberry Pi:

### 1. [Instalar Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Reiniciar el shell

Copie y pegue el siguiente comando en su shell: `source ~/.bashrc` o, para usuarios de Mac: `source ~/.bash_profile` o `source ~/.zshrc` (si utiliza zshell).

### 3. Crear y activar un nuevo entorno Conda para LeRobot

```Python
conda create -y -n lerobot python=3.10
```

A continuación, active su entorno Conda (¡debe hacerlo cada vez que abra un shell para usar LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonar LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar ffmpeg en su entorno:

Cuando utilice `miniconda`, instale `ffmpeg` en su entorno:

```PowerShell
conda install ffmpeg -c conda-forge
```

Normalmente, esto instala ffmpeg 7.X compilado con el codificador libsvtav1 para su plataforma. Si libsvtav1 no es compatible (puede consultar los codificadores admitidos con `ffmpeg -encoders`), puede:
[Para todas las plataformas] Instalar ffmpeg 7.X explícitamente:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Solo Linux] Instalar las dependencias de compilación de ffmpeg y compilar ffmpeg con soporte de libsvtav1 desde el código fuente, y asegurarse de que el ejecutable de ffmpeg en uso sea el correcto, lo que puede confirmar con `which ffmpeg`.
Si se encuentra con el error que aparece a continuación, los comandos anteriores también pueden solucionarlo.

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. Instalar LeRobot con la dependencia del motor feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Establecer el tiempo de conexión

Busque config_lekiwi.py en el directorio `lerobot\src\lerobot\robots\lekiwi`.

 connection_time_s: int = 7200 # es decir, 2 horas

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. Instalación de LeRobot en un portátil

Si ya ha instalado LeRobot en su portátil, puede omitir este paso; de lo contrario, siga los **mismos pasos** que utilizamos en la Raspberry Pi.

> [!Tip] Usaremos el símbolo del sistema (cmd) con frecuencia. Si no está familiarizado con cmd o desea repasar el uso de la línea de comandos, puede consultar esto: [Curso intensivo de línea de comandos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

En su ordenador:

### 1. [Instalar Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

anaconda.com/download/success

O haga clic en este enlace para descargar el instalador directamente

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## Cambiar las fuentes de paquetes de conda

```Shell
# Primero, borre la configuración de fuentes existente (para evitar conflictos)
conda config --remove-key channels

# Sustituya las fuentes predeterminadas de conda y las fuentes de terceros habituales por el espejo de Tsinghua
# Añada las fuentes de paquetes predeterminadas (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Añada las fuentes de terceros habituales
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Muestre la fuente de descarga, para que al instalar paquetes se muestre la URL de descarga concreta
conda config --set show_channel_urls yes

# Borre la caché de índices para que las nuevas fuentes surtan efecto
conda clean -i

# Muestre la configuración actual (para verificar que las fuentes se añadieron correctamente)
conda config --show-sources
```

### 2. Reiniciar el shell

Copie y pegue el siguiente comando en su shell: `source ~/.bashrc` o, para usuarios de Mac: `source ~/.bash_profile` o `source ~/.zshrc` (si utiliza zshell).

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. Crear y activar un nuevo entorno Conda para LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

A continuación, active su entorno Conda (¡debe hacerlo cada vez que abra un shell para usar LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonar LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar ffmpeg en su entorno:

Cuando utilice `miniconda`, instale `ffmpeg` en su entorno:

```PowerShell
conda install ffmpeg -c conda-forge
```

Normalmente, esto instala ffmpeg 7.X compilado con el codificador libsvtav1 para su plataforma. Si libsvtav1 no es compatible (puede consultar los codificadores admitidos con `ffmpeg -encoders`), puede:
[Para todas las plataformas] Instalar ffmpeg 7.X explícitamente:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Solo Linux] Instalar las dependencias de compilación de ffmpeg y compilar ffmpeg con soporte de libsvtav1 desde el código fuente, y asegurarse de que el ejecutable de ffmpeg en uso sea el correcto, lo que puede confirmar con `which ffmpeg`.
Si se encuentra con el error que aparece a continuación, los comandos anteriores también pueden solucionarlo.

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-07.png)

### 6. Instalar LeRobot con la dependencia del motor feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## C. Configuración de los motores

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-09.png)

### **1. Encontrar el puerto USB asociado al brazo robótico**

Para encontrar el puerto correcto de un motor individual, ejecute el siguiente script de utilidad dos veces:

```Bash
lerobot-find-port
```

Salida de ejemplo (por ejemplo, `/dev/tty.usbmodem575E0031751` en Mac, o posiblemente `/dev/ttyACM0` en Linux):

Salida de ejemplo (por ejemplo, `/dev/tty.usbmodem575E0032081` en Mac, o posiblemente `/dev/ttyACM1` en Linux):

Solución de problemas: en Linux, es posible que deba conceder acceso al puerto USB con los siguientes comandos:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurar los motores (omita este paso si la unidad ya viene montada)**

Conecte cada motor de su chasis uno a uno y ejecute el siguiente script. Primero inicializa los servos del brazo robótico (ID 6..1) y, a continuación, inicializa los servos del chasis, asignándoles los ID 9..7. Si ya ha calibrado el brazo robótico, puede seguir pulsando Intro para sobrescribir y omitir:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- pegue aquí el puerto encontrado en el paso anterior
```

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-10.png)

### 3. Configurar el espejo de Hugging Face para China

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Añada al final del archivo
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Salida
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Añada al final del archivo
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Salida
# https://hf-mirror.com
```

#### ① Crear un token

https://huggingface.co/settings/tokens

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-11.png)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-12.png)

#### ② Registrar el token

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③ Vincular el token

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④ Crear un repositorio de conjunto de datos

**Anote el Owner y el nombre del Dateset, es decir, el <hf_username> y el <dateset_repo_id> que necesitará más adelante**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4. ¡¡¡Actualice la configuración!!!

Los archivos de configuración de LeKiwi LeRobot y del portátil deben mantenerse coherentes. Primero, debemos encontrar la **dirección IP** de la Raspberry Pi que controla el brazo móvil. Es la misma dirección IP que se utiliza para SSH. También debemos encontrar el **puerto USB** de la placa controladora de servos del brazo líder en el portátil y el **puerto de la placa controladora de servos del LeKiwi**. Puede encontrar estos puertos con el siguiente script.

En Linux, es posible que deba conceder acceso al puerto USB ejecutando los siguientes comandos:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Importante: ahora que tiene el puerto del brazo líder y la dirección IP del brazo del Lekiwi, actualice la **ip** en la configuración de red, el **port** en la configuración del brazo líder y el **port, remote_ip** en la configuración del LeKiwi.

Modifique estos cuatro archivos en el directorio example\lekiwi

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ① Modificar teleoperate.py

remote_ip: la dirección IP de la Raspberry Pi

port: el número de puerto cuando el brazo líder está conectado al ordenador o Linux

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ② Modificar record.py

HF_REPO_ID: [nombre de usuario de Hugging Face y nombre del conjunto de datos](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip: la dirección IP de la Raspberry Pi

port: el número de puerto cuando el brazo líder está conectado al ordenador o Linux

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③ Modificar replay.py

remote_ip: la dirección IP de la Raspberry Pi

<hf_username>/<dataset_repo_id>, es decir, el [nombre de usuario de Hugging Face y nombre del conjunto de datos](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D. Calibración

Ahora debemos calibrar el brazo líder y el brazo seguidor. Los servos de las ruedas omnidireccionales no necesitan calibración.

### Calibración del brazo seguidor (montado en la base del Lekiwi)

Ejecute el siguiente comando en su ordenador para calibrar el brazo líder. Nota: las imágenes que se muestran aquí son ejemplos para el modelo SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ # cambie por el puerto que encontró
    --teleop.id=my_awesome_leader_arm
```

Ahora ejecute el siguiente comando en su Raspberry Pi para calibrar el brazo seguidor del LeKiwi. Ignore su posición actual sobre la mesa: la calibración correcta debe hacerse con el brazo montado en el chasis del Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Hemos estandarizado el método de calibración en la mayoría de los robots. Primero, debemos mover el robot de modo que cada articulación quede en el **punto medio de su rango de movimiento** y, a continuación, pulsar el botón. Después, movemos todas las articulaciones por su **rango completo de movimiento** una vez. Puede encontrar un vídeo del mismo proceso de calibración para el SO101 [aquí](https://huggingface.co/docs/lerobot/en/so101#calibration-video) `Enter`.

## E. Teleoperación

Abra un nuevo Anaconda Prompt

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> Si utiliza un Mac, es posible que deba conceder permiso a "Terminal" para acceder al teclado y poder teleoperar. Vaya a "System Preferences" > "Security & Privacy" > "Input Monitoring" y marque la casilla "Terminal".

Para teleoperar, inicie sesión en su Raspberry Pi por SSH, ejecute el siguiente comando para activar el entorno `conda activate lerobot` y, a continuación, ejecute el siguiente script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

A continuación, en su portátil, ejecute también el siguiente comando para activar el entorno `conda activate lerobot` y, después, ejecute el siguiente script:

```Bash
python examples/lekiwi/teleoperate.py
```

La pantalla de su portátil debería mostrar algo como esto: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Ahora puede mover el brazo de control y usar las teclas (W, A, S, D) del teclado para conducir el robot hacia delante, a la izquierda, hacia atrás y a la derecha. Use las teclas (Z, X) para girar el robot a la izquierda o a la derecha. Use las teclas (R, F) para aumentar o disminuir la velocidad del robot. Hay tres modos de velocidad; consulte la tabla a continuación:



Si utiliza un teclado diferente, puede cambiar la combinación de teclas de cada comando en [`LeKiWiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Solución de problemas de comunicación

Si tiene problemas para conectar el robot móvil SO101, siga los pasos a continuación para diagnosticar y solucionar el problema.

### 1. Verificar la configuración de la dirección IP

Asegúrese de que la dirección IP correcta de la Raspberry Pi esté definida en el archivo de configuración. Para comprobar la dirección IP de la Raspberry Pi, ejecute el siguiente comando (en la línea de comandos de la Pi):

```Bash
hostname -I
```

### 2. Comprobar si el portátil/PC puede alcanzar la Pi

Intente hacer ping a la Raspberry Pi desde el portátil:

```Bash
ping <your_pi_ip_address>
```

Si el ping falla:

- Asegúrese de que la Pi esté encendida y conectada a la misma red.
- Compruebe si SSH está habilitado en la Pi.

### 3. Probar una conexión SSH

Si no puede iniciar sesión en la Pi por SSH, es posible que la conexión sea incorrecta. Utilice el siguiente comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Por ejemplo `ssh pi@192.168.0.106`

Si obtiene un error de conexión:

- Asegúrese de que SSH esté habilitado en la Pi; puede ejecutar el siguiente comando:

```Bash
sudo raspi-config
```

- A continuación, navegue a: **Interfacing Options -> SSH** y habilítelo.

### 4. ¡¡¡Coherencia de los archivos de configuración!!!

Asegúrese de que los archivos de configuración del portátil/PC y de la Raspberry Pi sean exactamente iguales.

## F. Grabación de un conjunto de datos

Una vez que se sienta cómodo con la teleoperación, puede usar el LeKiwi para grabar su primer conjunto de datos.

Para iniciar el programa en el LeKiwi, conéctese a su Raspberry Pi por SSH y ejecute los siguientes comandos para activar el entorno e iniciar el script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Si desea usar el Hugging Face Hub para subir conjuntos de datos y no ha iniciado sesión antes, asegúrese de iniciar sesión con un token con permisos de escritura, que puede generar en [los ajustes de Hugging Face](https://huggingface.co/settings/tokens):

```Bash
hf auth login
```

Guarde el nombre de su repositorio de Hugging Face en una variable para ejecutar el siguiente comando:

```Bash
hf auth whoami
```

A continuación, ejecute el siguiente comando en su portátil para grabar 2 episodios y subir el conjunto de datos al Hub:

```Bash
python examples/lekiwi/record.py
```

## G. Visualización de un conjunto de datos

Si subió el conjunto de datos, puede [visualizarlo en línea](https://huggingface.co/spaces/lerobot/visualize_dataset); copie y pegue el ID de repositorio que genera el siguiente comando:

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Si no subió el conjunto de datos, también puede visualizarlo localmente (la herramienta de visualización se abre en una ventana del navegador en `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### Visualizar un conjunto de datos (opcional, vale la pena probarlo)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Si subió el conjunto de datos, también puede visualizarlo localmente con el siguiente comando:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Si no subió el conjunto de datos, también puede visualizarlo localmente con el siguiente comando:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Aquí, `juxi` es un nombre `repo_id` personalizado definido durante la recopilación de datos.



#### Consejos para la recopilación de datos

Una vez que se sienta cómodo con la grabación de datos, puede crear conjuntos de datos más grandes para el entrenamiento. Una buena tarea inicial es recoger objetos de distintas posiciones y colocarlos en un contenedor. Recomendamos grabar al menos 50 episodios, 10 por posición. Mantenga fija la posición de la cámara y mantenga el movimiento de agarre constante durante toda la grabación. Además, asegúrese de que los objetos que manipula sean claramente visibles en el encuadre de la cámara. Una regla sencilla: debería poder completar la tarea solo con ver la imagen de la cámara.

En las secciones siguientes, entrenará su red neuronal. Una vez que logre un rendimiento de agarre fiable, puede empezar a introducir más variación en la recopilación de datos, como añadir posiciones de agarre, usar distintas técnicas de agarre y cambiar las posiciones de la cámara.

Evite introducir demasiada variación demasiado rápido, ya que puede perjudicar sus resultados.

Si desea profundizar en este importante tema, consulte nuestra [entrada de blog sobre qué hace que un conjunto de datos sea bueno.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Solución de problemas:

En Linux, si las teclas de flecha izquierda/derecha y la tecla Esc no funcionan durante la grabación de datos, asegúrese de que la variable de entorno `$DISPLAY` esté definida. Consulte las [limitaciones de pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## H. Reproducción de un episodio

Ahora intente reproducir el primer episodio en su robot:

```Bash
python examples/lekiwi/replay.py
```

Enhorabuena 🎉: su robot está listo para aprender tareas por sí solo. Siga la sección de entrenamiento de este tutorial para empezar a entrenarlo: [Introducción a los robots del mundo real](https://huggingface.co/docs/lerobot/il_robots)

## I. Evaluación de su política

Asegúrese de cambiar remote_ip, port, HF_MODEL_ID

### Modificar evaluate.py

HF_MODEL_ID="<hf_username>/<model_repo_id>" cámbielo por el nombre del conjunto de datos subido a Hugging Face después del entrenamiento (si lo subió a Hugging Face), o por el directorio local donde se exportó el modelo después del entrenamiento

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" cámbielo por el nombre de usuario que creó y el nombre del conjunto de datos de evaluación (eval_)

remote_ip: la dirección IP de la Raspberry Pi

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

A continuación, ejecute el siguiente comando:

```Bash
python examples/lekiwi/evaluate.py
```

1. El nombre del conjunto de datos empieza por `eval` para reflejar que está ejecutando la inferencia (por ejemplo, `${HF_USER}/eval_act_lekiwi_test`).
2. Si durante la evaluación encuentra `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, primero elimine la carpeta cuyo nombre empiece por `eval_` y ejecute el programa de nuevo.



Para el entrenamiento en simulación, consulte

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## Ayuda 🙋

Para problemas de hardware, póngase en contacto con el servicio de atención al cliente. Para preguntas de uso, únase a Discord.

[Plataforma LeRobot](https://github.com/huggingface/lerobot)

[Canal de Discord de LeRobot](https://discord.gg/8TnwDdjFGU)

##   
  
Instalación de Miniconda en un Mac

## Conceder permisos

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## Instalar Miniconda

https://www.anaconda.com/download

## Cambiar la fuente de paquetes de pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Cambiar la fuente de paquetes de conda

```Shell
# Borre la configuración .condarc existente (opcional, para evitar conflictos)
echo "" > ~/.condarc

# Escriba la configuración del espejo de Tsinghua
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# Borre la caché para aplicar la configuración
conda clean -i
```

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />

