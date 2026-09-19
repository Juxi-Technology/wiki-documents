---
title: "Interacción por voz en ROS2"
description: "Módulo de voz IA en ROS2: entorno Ubuntu 22.04 con ROS2 Humble, detección automática del cableado serie o I2C y nodo de interacción por voz."
---

# Interacción por voz en ROS2

## 1、Preparación del entorno

#### Requisitos del sistema

- **Sistema operativo**: Ubuntu 22.04

- **Versión de ROS2**: Humble

#### Instalar bibliotecas de dependencias

```Bash
# 1. Actualizar las fuentes
sudo apt update

# 2. Instalar los paquetes básicos de ROS2
# (si ROS2 ya está instalado, omitir)
sudo apt install ros-humble-desktop -y

# 3. Instalar las dependencias de este proyecto (compatible con puerto serie e I2C)
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial smbus2

# 4. Si se usa el cableado I2C, instalar además
sudo apt install python3-smbus2 i2c-tools -y
```

---

## 2、Descripción de los tres métodos de cableado

El módulo de interacción por voz de IA admite los siguientes tres métodos de cableado:

#### Mecanismo de detección automática

Cuando se inicia el nodo de ROS2, detecta automáticamente el método de cableado en el siguiente orden:

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

#### Crear el directorio

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Crear el paquete de ROS2

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Estructura de directorios final

```Bash
~/juxi_speech_ws/
├── build/
├── install/
├── log/
└── src/
    └── juxi_voice/
        ├── package.xml
        ├── setup.py           # (sustituir por el proporcionado en este proyecto)
        ├── juxi_voice.rviz    # (nuevo: archivo de preconfiguración de RViz)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/
            ├── __init__.py
            ├── voice_node.py    # (nuevo: nodo de voz)
            └── rviz_control.py  # (nuevo: nodo de control de RViz)
```

---

## 6、Contenido y ubicación de los archivos

#### Archivo 1: `voice_node.py` (Nodo de control por voz)

**Ubicación**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**Funciones principales**: 

- Detección automática del método de cableado Type-C / UART / IIC

- Tabla unificada de asignación de palabras de comando (114 palabras de comando)

- Utiliza el backend de comunicación correspondiente según el método de cableado

**Arquitectura clave**: 

```Bash
# Datos de comando unificados: ID → (byte 2 del puerto serie, byte 3 del puerto serie, texto del comando, modo de reproducción)
CMD_DATA = {
    1:  (0x01, 0x00, "欢迎语", "被"),
    3:  (0x03, 0x00, "你好小犀", "主"),
    14: (0x00, 0x04, "小车前进", "主"),
    84: (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# Función de detección automática
def detect_connection(logger):
    # 1. Probar I2C
    # 2. Probar el puerto serie /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    ...
```

(Para ver el código completo, consulte el archivo `voice_node.py` proporcionado con el proyecto)

#### Archivo 2: `rviz_control.py` (Nodo de control de RViz)

**Ubicación**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

Se suscribe al tema `/juxi_voice_cmd` para recibir el texto del comando y actualiza la visualización del cubo según el comando.

(Para ver el código completo, consulte el archivo `rviz_control.py` proporcionado con el proyecto)

#### Archivo 3: Modificar `setup.py`

**Ubicación**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、Compilar y ejecutar

#### Compilar

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Variables de entorno

```Bash
source ~/juxi_speech_ws/install/setup.bash
# o añadirlo a ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### Configuración de permisos

```Bash
# Permisos de I2C
sudo chmod 666 /dev/i2c-1
# Permisos del puerto serie
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# o unirse al grupo de usuarios
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
```

#### Ejecutar los nodos (3 terminales)

**Terminal 1**: nodo de voz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

Al iniciar, se muestra el método de cableado detectado:

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

o

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**Terminal 2**: nodo de control de RViz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**Terminal 3**: visualización de RViz (carga directamente el archivo preconfigurado, sin necesidad de configuración manual)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

O bien abra primero RViz y luego cárguelo:

```Bash
rviz2
# Barra de menú: File → Open Config → seleccionar juxi_voice.rviz
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
# Reproducción pasiva
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# Reproducción de palabra de función
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# Reproducción de palabra de comando
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、Tabla de referencia de ID de palabras de comando

### Palabras de función (ID 1-10)

### Palabras de comando (ID 11-83, 113)

### Palabras de reproducción pasiva (ID 84-112, 114)

---

## 11、Descripción de los temas de ROS2

---

## 12、Solución de problemas

**Al iniciar se muestra "módulo de interacción por voz de IA no detectado"**

Compruebe si existe el archivo de dispositivo correspondiente al método de cableado:

```Bash
# Cableado I2C
ls /dev/i2c-1
sudo i2cdetect -y 1   # Debería verse 0x2A

# Cableado Type-C
ls /dev/ttyUSB0 /dev/ttyACM0

# Cableado UART
ls /dev/ttyAMA0 /dev/ttyS0
```

**Error de permisos del puerto serie**

```Bash
sudo chmod 666 /dev/ttyUSB0   # o /dev/ttyACM0, etc.
```

**Error de permisos de I2C**

```Bash
sudo chmod 666 /dev/i2c-1
```

**No aparece ningún cubo en RViz**

- Compruebe si Fixed Frame es `map`

- Compruebe si el Topic es `/juxi_visual_marker`

**No hay reacción a los comandos tras la activación**

```Bash
ros2 topic echo /juxi_voice_cmd
```

Si hay datos → problema de configuración de RViz; si no hay datos → anomalía de cableado/comunicación.

<RelatedProducts slugs="ai-voice-module" />
