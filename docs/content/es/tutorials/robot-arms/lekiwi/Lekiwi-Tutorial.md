---
title: Tutorial de uso del robot móvil Lekiwi
description: "Guía completa del robot móvil Lekiwi basado en LeRobot: instalación, configuración de motores, teleoperación, recolección de datos, entrenamiento y evaluación"
---

# Tutorial de uso del robot móvil Lekiwi

> **[Comprar en la tienda](https://www.juxitech.com/es/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

El brazo activo negro usa un adaptador de alimentación de 5V 6A, mientras que el brazo pasivo blanco usa un adaptador de alimentación de 12V 5A

lerobot-Lekiwi.zip

El código del repositorio de este tutorial se mantiene en la versión estable de Lerobot probada antes del 1 de marzo de 2026. Actualmente, Huggingface ha realizado una actualización muy importante de Lerobot, añadiendo una gran cantidad de funciones nuevas. Si necesita probar el tutorial más reciente, siga la [documentación oficial para la operación](https://huggingface.co/docs/lerobot/lekiwi).

[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) es un proyecto de carro robótico totalmente open source iniciado por [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Incluye archivos de impresión 3D detallados y guías de operación, y está diseñado para ser compatible con el framework de aprendizaje por imitación [LeRobot](https://github.com/huggingface/lerobot/tree/main). Es compatible con el brazo robótico SO101, lo que permite un proceso completo de aprendizaje por imitación.

[*Las posiciones precisas de los componentes se pueden visualizar en Fusion360 Online CAD*](https://a360.co/4k1P8yO).

[Archivo URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Vista previa de URDF en línea https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

### Características principales

1. **Código abierto y bajo costo**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) ofrece una solución de carro robótico open source de bajo costo.

2. **Integración con LeRobot**: diseñado específicamente para la integración con la [plataforma LeRobot](https://github.com/huggingface/lerobot).

3. **Recursos de aprendizaje abundantes**: proporciona recursos de aprendizaje open source completos, incluidas guías de ensamblaje y calibración, así como tutoriales de pruebas, recolección de datos, entrenamiento y despliegue, para ayudar a los usuarios a empezar rápidamente y desarrollar aplicaciones robóticas.

4. **Compatible con Nvidia**: puede usarse junto con el reComputer Mini J4012 Orin NX 16 GB.

5. **Aplicación en múltiples escenarios**: adecuado para la educación, la investigación científica, la producción automatizada y el campo de la robótica, ayudando a los usuarios a lograr operaciones robóticas eficientes y precisas en diversas tareas complejas.

JUXI solo es responsable de la calidad del hardware en sí. Los tutoriales se actualizan estrictamente según la documentación oficial. Si encuentra problemas de software o de dependencias del entorno que realmente no pueda resolver, repórtelos oportunamente a la [plataforma LeRobot](https://github.com/huggingface/lerobot) o al [canal de Discord de LeRobot](https://discord.gg/8TnwDdjFGU).

**Atención**

- Todos los servos del chasis Lekiwi requieren una fuente de alimentación de 12V. Para los usuarios que usan un brazo robótico de 5V, proporcionamos un módulo convertidor reductor de 12V a 5V. Tenga en cuenta que deberá modificar el circuito por su cuenta.

- Fuente de alimentación de 12V: si la necesita, puede seleccionar esta opción al finalizar la compra. Si ya tiene una fuente de alimentación de 12V, basta con convertir la interfaz de salida de alimentación a un enchufe DC 5521.

- Controlador Raspberry Pi y cámara: deben comprarse por separado a través de la interfaz de pedido.

### Lista de materiales (BOM)

### Entorno de sistema inicial

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

- Raspberry Pi 5 de 4G~16G

#### Configurar SSH

Tras configurar el Raspberry Pi, habilite y configure [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol), para poder iniciar sesión en el Raspberry Pi desde su portátil sin conectar pantalla, teclado y ratón al Raspberry Pi. Puede encontrar [un buen tutorial aquí](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Puede iniciar sesión en el Raspberry Pi mediante el símbolo del sistema (cmd) o, si usa VSCode, puede usar [esta](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extensión.

### Guía de impresión 3D

#### Piezas

Proporcionamos archivos STL imprimibles para las siguientes piezas impresas en 3D. Estas piezas se pueden imprimir en impresoras FDM de grado de consumo con filamentos PLA genéricos. Las probamos en la impresora Bambu Lab P1S. Para todos los componentes, simplemente los cargamos en bambuslicer, se rotaron y organizaron automáticamente, se activaron los soportes recomendados y luego se imprimieron.

#### Parámetros de impresión

Los archivos STL proporcionados se pueden imprimir directamente en muchas impresoras FDM. Los siguientes son los ajustes probados y recomendados; otros ajustes también pueden funcionar.

- Material: PLA+

- Diámetro y precisión de la boquilla: boquilla de 0,2 mm, altura de capa de 0,2 mm

- Densidad de relleno: 15%

- Velocidad de impresión: 150 mm/s

- Si es necesario, suba el G-code (archivo laminado) a la impresora e imprima

## Instalar LeRobot

En su Raspberry Pi:

#### 1. [Instalar Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

#### 2. Reiniciar el Shell

Copie y pegue el siguiente comando en su Shell: `source ~/.bashrc`; o, para usuarios de Mac: `source ~/.bash_profile` o `source ~/.zshrc` (si usa zshell)

#### 3. Crear y activar un nuevo entorno Conda para LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Luego active su entorno de Conda (¡debe hacerlo cada vez que abra el Shell para usar LeRobot!):

```Bash
conda activate lerobot
```

#### 4. Clonar LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

#### 5. Instalar ffmpeg en su entorno:

Cuando use `miniconda`, instale `ffmpeg` en su entorno:

```PowerShell
conda install ffmpeg -c conda-forge
```

Esto suele instalar ffmpeg 7.X compilado con el codificador libsvtav1 para su plataforma. Si libsvtav1 no es compatible (puede comprobar los codificadores compatibles con `ffmpeg -encoders`), puede:

【Para todas las plataformas】Instale explícitamente ffmpeg 7.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

[Solo Linux] Instale las dependencias de compilación de ffmpeg y compílelo desde el código fuente con soporte libsvtav1, y asegúrese de que el ejecutable de ffmpeg utilizado sea el correcto, lo que puede confirmarse con `which ffmpeg`.

Si encuentra el siguiente error, también puede usar los comandos anteriores para resolverlo.

![5. Instalar ffmpeg en su entorno: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### 6. Instalar LeRobot con las dependencias de motores feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

#### 7. Configurar el tiempo de conexión

Buscar config_lekiwi.py en el directorio `lerobot\src\lerobot\robots\lekiwi`

connection_time_s: int = 7200 # 也就是2小时

![7. Configurar el tiempo de conexión – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



### C. Instalar LeRobot en el portátil

Si ya instaló LeRobot en su portátil, puede saltarse este paso; si no, siga los **mismos pasos** que hicimos en el Raspberry Pi.

> [!Tip] Usaremos con frecuencia el símbolo del sistema (cmd). Si no está familiarizado con el uso de cmd o desea repasar el uso de la línea de comandos, puede consultar esto: [Curso intensivo de línea de comandos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
> 
> 

En su ordenador:

#### 1. [Instalar Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

#### 2. Reiniciar el Shell

Copie y pegue el siguiente comando en su Shell: `source ~/.bashrc`; o, para usuarios de Mac: `source ~/.bash_profile` o `source ~/.zshrc` (si usa zshell)

![2. Reiniciar el Shell – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### 3. Crear y activar un nuevo entorno Conda para LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Luego active su entorno de Conda (¡debe hacerlo cada vez que abra el Shell para usar LeRobot!):

```Bash
conda activate lerobot
```

#### 4. Clonar LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

#### 5. Instalar ffmpeg en su entorno:

Cuando use `miniconda`, instale `ffmpeg` en su entorno:

```PowerShell
conda install ffmpeg -c conda-forge
```

Esto suele instalar ffmpeg 7.X compilado con el codificador libsvtav1 para su plataforma. Si libsvtav1 no es compatible (puede comprobar los codificadores compatibles con `ffmpeg -encoders`), puede:

【Para todas las plataformas】Instale explícitamente ffmpeg 7.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

[Solo Linux] Instale las dependencias de compilación de ffmpeg y compílelo desde el código fuente con soporte libsvtav1, y asegúrese de que el ejecutable de ffmpeg utilizado sea el correcto, lo que puede confirmarse con `which ffmpeg`.

Si encuentra el siguiente error, también puede usar los comandos anteriores para resolverlo.

![5. Instalar ffmpeg en su entorno: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### 6. Instalar LeRobot con las dependencias de motores feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## Configurar los motores

![6. Instalar LeRobot con las dependencias de motores feetech: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![6. Instalar LeRobot con las dependencias de motores feetech: – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

#### **1. Encontrar el puerto USB asociado al brazo robótico**

Para encontrar el puerto correcto de un solo motor, ejecute dos veces el siguiente script de utilidad:

```Bash
lerobot-find-port
```

Ejemplo de salida (p. ej., `/dev/tty.usbmodem575E0031751` en Mac, o `/dev/ttyACM0` en Linux):

Ejemplo de salida (p. ej., `/dev/tty.usbmodem575E0032081` en Mac, o `/dev/ttyACM1` en Linux):

Solución de problemas: en Linux, puede ser necesario conceder acceso al puerto USB con el siguiente comando:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

#### **2. Configurar su motor (los productos terminados pueden saltarse este paso)**

Inserte cada motor de su chasis en secuencia y ejecute el siguiente script. Primero inicializará los servos del brazo robótico (ID 6..1), luego inicializará los servos del chasis, estableciendo sus IDs (ID 9..7). Si ya calibró el brazo robótico, puede pulsar Enter continuamente para sobrescribir y saltar:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![2. Configurar su motor los productos terminados pueden saltarse este paso – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

#### 3. Configurar el espejo doméstico de HuggingFace

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

##### ① Crear token

https://huggingface.co/settings/tokens

![① Crear token – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![① Crear token – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![① Crear token – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

##### ② Anotar el token

Por ejemplo, el mío es:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

##### ③ Vincular el token

```Shell
hf auth login

hf auth whoami
```

![③ Vincular el token – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

##### ④ Crear el repositorio del dataset

**Anote el nombre del propietario (Owner) y el nombre del dataset, que son el \<hf_username\> y el \<dateset_repo_id\> necesarios más adelante**

![④ Crear el repositorio del dataset – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![④ Crear el repositorio del dataset – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![④ Crear el repositorio del dataset – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

#### 4. ¡¡¡Actualizar la configuración!!!

Los archivos de configuración en LeKiwi LeRobot y en el portátil deben ser coherentes. Primero, debemos encontrar la **dirección IP** del Raspberry Pi del brazo robótico móvil. Es la misma dirección IP usada para SSH. También debemos encontrar el **puerto USB** de la placa del controlador de servos del brazo activo en el portátil y el **puerto de la placa del controlador de servos en LeKiwi**. Estos puertos se pueden encontrar con el siguiente script.

En Linux, puede ser necesario conceder acceso al puerto USB ejecutando el siguiente comando:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Nota importante: una vez obtenidos el número de puerto del brazo activo y la dirección IP del brazo robótico Lekiwi, actualice **ip** en la configuración de red, **port** en la configuración del brazo activo y **port, remote_ip** en la configuración de LeKiwi.

Modifique estos cuatro archivos en el directorio example\lekiwi

![4. ¡¡¡Actualizar la configuración!!! – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

##### ① Modificar teleoperate.py

remote_ip: dirección IP del Raspberry Pi

port: número de puerto cuando el brazo activo está conectado a una computadora o a Linux

![① Modificar teleoperate.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

##### ② Modificar record.py

HF_REPO_ID: [nombre de usuario y de dataset en Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote_ip: dirección IP del Raspberry Pi

port: número de puerto cuando el brazo activo está conectado a una computadora o a Linux

![② Modificar record.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

##### ③ Modificar replay.py

remote_ip: dirección IP del Raspberry Pi

\<hf_username\>/\<dataset_repo_id\>, es decir, [el nombre de usuario y de dataset de Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![③ Modificar replay.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### Calibración

Ahora debemos calibrar el brazo activo y el brazo pasivo. El servo de dirección de la rueda omnidireccional no necesita calibración.

#### Calibrar el brazo seguidor (montado en la base Lekiwi)

Ejecute el siguiente comando en su computadora para calibrar el brazo activo. Nota: la imagen mostrada aquí es un ejemplo del modelo SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

Ahora ejecute el siguiente comando en su Raspberry Pi para calibrar el brazo esclavo en LeKiwi. Ignore su posición actual sobre la mesa: la calibración normal debe realizarse cuando esté instalado en el chasis Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Unificamos los métodos de calibración para la mayoría de los robots. Primero, debemos mover el robot a una posición donde cada articulación esté en su **punto medio del rango de movimiento** y luego pulsar el botón. Segundo, movemos todas las articulaciones a través de su **recorrido completo**. Puede encontrar [aquí](https://huggingface.co/docs/lerobot/en/so101#calibration-video) un video del mismo proceso de calibración para SO101 como referencia.

## F. Operación remota

Abra un nuevo Anaconda Prompt

![Calibrar el brazo seguidor montado en la base Lekiwi – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> Si usa una Mac, puede ser necesario conceder al «Terminal» el permiso de acceso al teclado para las operaciones remotas. Vaya a «System Preferences» \> «Security &amp; Privacy» \> «Input Monitoring» y marque la casilla «Terminal».
> 
> 

Para realizar operaciones remotas, inicie sesión en su Raspberry Pi por SSH y ejecute el siguiente comando para activar el entorno `conda activate lerobot`; luego ejecute el siguiente script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![Calibrar el brazo seguidor montado en la base Lekiwi – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

A continuación, en su portátil, ejecute también el siguiente comando para activar el entorno `conda activate lerobot` y luego ejecute el siguiente script:

```Bash
python examples/lekiwi/teleoperate.py
```

La pantalla de su portátil debería mostrar una interfaz similar a esta: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Ahora puede mover el brazo de control y usar las teclas (W, A, S, D) del teclado para controlar el robot: avanzar, girar a la izquierda, retroceder y girar a la derecha. Use las teclas (Z, X) para controlar el giro del robot a la izquierda o a la derecha. Use las teclas (R, F) para aumentar o reducir la velocidad del robot móvil. Hay tres modos de velocidad en total; consulte la siguiente tabla:

Si usa un teclado diferente, puede cambiar la configuración de las teclas de cada comando [en LeKiwiClientConfig](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

### Solución de problemas de fallos de comunicación

Si encuentra problemas al conectar el robot móvil SO101, siga los pasos siguientes para diagnosticar y resolver el problema.

#### 1. Verificar la configuración de la dirección IP

Asegúrese de que la dirección IP correcta del Raspberry Pi esté establecida en el archivo de configuración. Para comprobar la dirección IP del Raspberry Pi, ejecute el siguiente comando (en la línea de comandos del Pi):

```Bash
hostname -I
```

#### 2. Comprobar si el portátil/PC puede acceder al Pi

Intente hacer ping al Raspberry Pi desde el portátil:

```Bash
ping <your_pi_ip_address>
```

Si el ping falla:

- Asegúrese de que el Pi esté encendido y conectado a la misma red.

- Compruebe si SSH está habilitado en el Pi.

#### 3. Intentar la conexión SSH

Si no puede iniciar sesión en el Pi por SSH, puede deberse a una conexión incorrecta. Use el siguiente comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Por ejemplo, `ssh pi@192.168.0.106`

Si ocurre un error de conexión:

- Para asegurarse de que SSH esté habilitado en el Pi, puede ejecutar el siguiente comando:

```Bash
sudo raspi-config
```

- Luego navegue hasta: **Interfacing Options -\> SSH** y habilítelo.

#### 4. ¡¡¡Coherencia de los archivos de configuración!!!

Asegúrese de que los archivos de configuración del portátil/PC y del Raspberry Pi sean exactamente iguales.

## G. Grabar el dataset

Después de familiarizarse con la operación remota, puede usar LeKiwi para grabar su primer dataset.

Para iniciar el programa en LeKiwi, conéctese a su Raspberry Pi por SSH y ejecute los siguientes comandos para activar el entorno e iniciar el script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Si desea usar la función de hub de Hugging Face para subir un dataset y no ha iniciado sesión previamente, asegúrese de iniciar sesión con un token que tenga permisos de escritura, el cual puede generarse en [los ajustes de Hugging Face](https://huggingface.co/settings/tokens):

```Bash
hf auth login
```

Guarde el nombre de su repositorio de Hugging Face en una variable para ejecutar el siguiente comando:

```Bash
hf auth whoami
```

Luego ejecute el siguiente comando en su portátil para grabar 2 rondas y subir el dataset al hub:

```Bash
python examples/lekiwi/record.py
```

## H. Visualizar el dataset

Si ha subido un dataset, puede [visualizar su dataset en línea](https://huggingface.co/spaces/lerobot/visualize_dataset) y copiar y pegar el ID del repositorio generado por el siguiente comando:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Si no ha subido un dataset, también puede realizar la visualización en local (la ventana del navegador puede abrir la herramienta de visualización mediante `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

#### Visualizar un dataset (opcional, puede intentarse)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Si ha subido un dataset, también puede visualizarlo en local con el siguiente comando:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Si no ha subido un dataset, también puede visualizarlo en local con el siguiente comando:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Aquí, `juxi` es el nombre `repo_id` personalizado durante la recolección de datos.

##### Técnicas de recolección de datos

Una vez que esté familiarizado con la grabación de datos, puede crear datasets más grandes para el entrenamiento. Una buena tarea inicial es agarrar objetos desde diferentes posiciones y colocarlos en contenedores. Recomendamos grabar al menos 50 episodios, con 10 episodios por cada posición. Mantenga fija la posición de la cámara y gestos de agarre consistentes durante toda la grabación. Además, asegúrese de que los objetos que manipula sean claramente visibles en el encuadre de la cámara. Un criterio simple es que pueda completar esta tarea solo con observar la imagen de la cámara.

En los siguientes capítulos entrenará su red neuronal. Después de lograr un rendimiento de agarre fiable, puede empezar a introducir más variaciones durante el proceso de adquisición de datos, como aumentar las posiciones de agarre, adoptar diferentes técnicas de agarre y cambiar las posiciones de la cámara.

Evite añadir demasiados cambios demasiado rápido, ya que puede afectar sus resultados.

Si desea profundizar en este importante tema, consulte [nuestra publicación de blog sobre qué hace que un dataset sea excelente](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset).

##### Solución de problemas:

En sistemas Linux, si las teclas de flecha izquierda y derecha y la tecla Esc no funcionan durante la adquisición de datos, asegúrese de que la variable de entorno `$DISPLAY` esté configurada. Consulte [Limitaciones de pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## I. Reproducir una ronda

Ahora intente reproducir la primera ronda en su robot:

```Bash
python examples/lekiwi/replay.py
```

¡Felicitaciones 🎉! Su robot está listo para tareas de aprendizaje autónomo. Siga la sección de entrenamiento de este tutorial para empezar a entrenarlo: [Introducción a los robots del mundo real](https://huggingface.co/docs/lerobot/il_robots)

### K. Evaluar su estrategia

Asegúrese de cambiar remote_ip, port y HF_MODEL_ID

##### Modificar evaluate.py

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>" debe modificarse al nombre del dataset subido a Hugging Face después del entrenamiento (si se subió a Hugging Face) o al directorio donde se exportó el modelo en local después del entrenamiento

HF_DATASET_ID = "\< hf_username \>/\< eval_dataset_id \>" Cambie el nombre de usuario y el nombre del dataset eval_ que creó

remote_ip: dirección IP del Raspberry Pi

![Modificar evaluate.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

Luego ejecute el siguiente comando:

```Bash
python examples/lekiwi/evaluate.py
```

1. El nombre del dataset comienza con `eval` para reflejar que está ejecutando inferencia (p. ej., `${HF_USER}/eval_act_lekiwi_test`).

2. Si la fase de evaluación encuentra `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, elimine primero la carpeta que comienza con `eval_` y vuelva a ejecutar el programa.

El entrenamiento en simulación puede consultarse en

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim

### Ayuda 🙋

Para problemas de hardware, contacte con el servicio de atención al cliente. Para problemas de uso, únase a Discord.

[Plataforma LeRobot](https://github.com/huggingface/lerobot)

[Canal de Discord de LeRobot](https://discord.gg/8TnwDdjFGU)

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />
