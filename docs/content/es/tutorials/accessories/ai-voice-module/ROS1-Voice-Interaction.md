---
title: "Interacción por voz en ROS1"
description: "El módulo de interacción por voz de IA admite los siguientes tres métodos de cableado:"
---

# Interacción por voz en ROS1

## 1、Preparación del entorno

#### Requisitos del sistema

- **Sistema operativo**: Ubuntu 20.04 u 18.04

- **Versión de ROS1**: Noetic (recomendado) o Melodic

#### Instalar las bibliotecas de dependencias

```Bash
# 1. 更新源
sudo apt update

# 2. 安装 ROS1 桌面完整版
# (如果已安装ROS1，跳过)
sudo apt install ros-noetic-desktop-full -y    # Ubuntu 20.04
sudo apt install ros-melodic-desktop-full -y   # Ubuntu 18.04

# 3. 安装本项目依赖（同时支持串口和I2C）
sudo apt install python3-pip ros-noetic-rviz i2c-tools -y
pip3 install pyserial smbus2

# 如果是 Melodic (Python2)
sudo apt install python-pip ros-melodic-rviz i2c-tools -y
pip install pyserial smbus2

# 4. 如果使用 I2C 接线，额外安装
sudo apt install python3-smbus2 -y
```

---

## 2、Descripción de los tres métodos de cableado

El módulo de interacción por voz de IA admite los siguientes tres métodos de cableado:

#### Mecanismo de detección automática

Cuando se inicia el nodo de ROS1, detecta automáticamente el método de cableado en el siguiente orden:

1. Primero prueba el puerto serie: comprueba sucesivamente `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0`

2. Después prueba I2C: comprueba si existe el esclavo `0x2A` en `/dev/i2c-1`

3. Para la detección del puerto serie, basta con que el archivo de dispositivo exista y se pueda abrir para considerarlo disponible; no se requiere verificación adicional

Una vez detectado cualquiera de los métodos, la detección se detiene y se fija ese método para su uso. No se requiere ninguna configuración manual.

---

## 3、Descripción del protocolo IIC

#### Configuración del esclavo IIC

#### Definición de registros

---

## 4、Descripción del protocolo de puerto serie (Type-C / UART)

#### Formato de trama

Cada trama es fija de **5 bytes**:

#### Velocidad en baudios

Fija de **115200** bps.

---

## 5、Crear el espacio de trabajo y la estructura de directorios

#### Crear el espacio de trabajo catkin

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Crear el paquete de ROS

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### Estructura de directorios final

Coloque los archivos proporcionados con este proyecto en las ubicaciones correspondientes:

```Bash
~/juxi_speech_ws/
├── build/
├── devel/
└── src/
    └── juxi_voice/
        ├── CMakeLists.txt      # (替换为本项目提供的)
        ├── package.xml          # (替换为本项目提供的)
        ├── juxi_voice.rviz      # (新建：RViz预配置文件)
        ├── launch/
        │   └── juxi_voice.launch # (新建：一键启动文件)
        └── scripts/
            ├── voice_node.py     # (新建：语音节点)
            └── rviz_control.py   # (新建：RViz控制节点)
```

---

## 6、Contenido y ubicación de los archivos

#### Archivo 1: `voice_node.py` (Nodo de control por voz)

**Ubicación**: `~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**Funciones principales**:

- Detecta automáticamente el método de cableado Type-C / UART / IIC

- Tabla unificada de asignación de palabras de comando (114 palabras de comando, totalmente coherente con la tabla de protocolo V1 de Excel)

- Utiliza el backend de comunicación correspondiente (puerto serie / I2C) según el método de cableado

**Arquitectura clave**:

```Bash
# 统一命令数据: ID → (串口字节2, 串口字节3, 命令文本, 播报模式)
CMD_DATA = {
    1:   (0x01, 0x00, "欢迎语", "被"),
    3:   (0x03, 0x00, "你好小犀", "主"),
    14:  (0x00, 0x04, "小车前进", "主"),
    84:  (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自动检测函数
def detect_connection():
    # 1. 尝试串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    # 2. 尝试 I2C /dev/i2c-1 (从机地址 0x2A)
    ...
```

(Para ver el código completo, consulte el archivo `voice_node.py` proporcionado con el proyecto)

#### Archivo 2: `rviz_control.py` (Nodo de control de RViz)

**Ubicación**: `~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

Se suscribe al tema `/juxi_voice_cmd` para recibir el texto del comando y actualiza la visualización del cubo según el comando.

(Para ver el código completo, consulte el archivo `rviz_control.py` proporcionado con el proyecto)

#### Archivo 3: `CMakeLists.txt` y `package.xml`

Ya se proporcionan en este proyecto; simplemente reemplace los archivos predeterminados generados automáticamente por `catkin_create_pkg`.

---

## 7、Compilar y ejecutar

#### Compilar

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### Variables de entorno

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
```

#### Configuración de permisos

```Bash
# I2C 权限
sudo chmod 666 /dev/i2c-1
# 串口权限
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# 或加入用户组
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
# 设置后需要重新登录生效
```

#### Ejecutar los nodos

**Método 1: Inicio con un solo clic (recomendado)**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

Al iniciar, se abren automáticamente el nodo de voz, el nodo de control de RViz y la interfaz de visualización de RViz.

**Método 2: Inicio por pasos (3 terminales)**

**Terminal 1**: iniciar roscore

```Bash
roscore
```

**Terminal 2**: nodo de voz

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

Al iniciar, se muestra el método de cableado detectado:

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

o

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

Si no se detecta ningún dispositivo:

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**Terminal 3**: nodo de control de RViz

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**Terminal 4**: visualización de RViz (carga directamente el archivo preconfigurado, sin necesidad de configuración manual)

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

O bien abra primero RViz y luego cárguelo:

```Bash
rviz
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、Descripción de la preconfiguración de RViz

`juxi_voice.rviz` ya viene preconfigurado con lo siguiente; se puede usar directamente al iniciarlo, sin necesidad de ninguna operación manual:

- **Fixed Frame**: `map`

- **Visualización de Marker**: suscrito a `/juxi_visual_marker` (marcador único)

- **Visualización de MarkerArray**: suscrito a `/juxi_visual_markers` (marcadores múltiples: brazo robótico, nivel de batería, alarma, etc.)

- **Punto de vista**: observado desde arriba en diagonal, con el centro en el origen

---

## 9、Método de uso

#### Activación

Diga **"你好小犀"** al módulo → el módulo responde "我在"

#### Enviar comandos

- "小车前进" → el cubo avanza

- "亮红灯" → el cubo se vuelve rojo

- "打开流水灯" → el color cambia cíclicamente

- "报警" → esfera roja pulsante

- "显示电量" → texto del nivel de batería

#### Reproducción activada por el anfitrión

```Bash
# 被动播报 (I2C → 写 0xD1, 串口 → 发 FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# 功能词播报 (I2C → 写 0xD2, 串口 → 发 FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# 命令词播报 (I2C → 写 0xD3, 串口 → 发 FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、Tabla de referencia de ID de palabras de comando

> Un total de 114 palabras de comando, totalmente coherente con `命令词播报词协议列表V1_中文.xlsx`.
> 
> 

### Palabras de función (ID 1-10)

### Palabras de comando (ID 11-83, 113)

### Palabras de reproducción pasiva (ID 84-112, 114)

---

## 11、Descripción de los temas de ROS1

---

## 12、Solución de problemas

**1. Al iniciar se muestra "módulo de interacción por voz de IA no detectado"**

Compruebe si existe el archivo de dispositivo correspondiente al método de cableado:

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**2. Error de permisos del puerto serie**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
# 或加入 dialout 用户组（需要重新登录）
sudo usermod -aG dialout $USER
```

**3. Error de permisos de I2C**

```Bash
sudo chmod 666 /dev/i2c-1
# 或加入 i2c 用户组（需要重新登录）
sudo usermod -aG i2c $USER
```

**4. No aparece ningún cubo en RViz**

- Compruebe si Fixed Frame es `map`

- Compruebe si el Topic es `/juxi_visual_marker`

- Confirme que el nodo rviz_control.py se ha iniciado

**5. No hay reacción a los comandos tras la activación**

```Bash
rostopic echo /juxi_voice_cmd
```

Si hay datos → problema de configuración de RViz; si no hay datos → anomalía de cableado/comunicación.

**6. rosrun no encuentra el nodo**

Confirme que ya se han ejecutado la compilación y el source:

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7. Se informa de un error de sintaxis**

```Bash
# 确认 Python 脚本有执行权限
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```

<RelatedProducts slugs="ai-voice-module" />
