---
title: "Introducción a ROS"
description: Tutorial ROS de Juxi Technology — instalación ROS 2 Humble, bases de topics/servicios/launch
keywords: [ros, ros2, introducción, robótica]
---

# Introducción a ROS

> Para desarrolladores nuevos en ROS. Basado en Ubuntu 22.04 + ROS 2 Humble, con ejemplos prácticos usando el módulo IMU y el brazo SO-ARM101 de Juxi Technology.

## 1. ¿Qué es ROS?

ROS (Robot Operating System) es el estándar de facto del middleware para robótica:

- **Topics**: comunicación publish/subscribe, punto a punto (p. ej., flujos de datos del IMU)
- **Services**: petición/respuesta (p. ej., activar una acción)
- **Launch**: arranque multi-nodo con un solo comando

ROS 2 (Humble) es la versión principal actual, con mejoras en tiempo real, multimáquina y seguridad.

## 2. Configuración del entorno

### Ubuntu 22.04 + ROS 2 Humble

```bash
# Añadir el repositorio de ROS 2
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Instalación
sudo apt update
sudo apt install -y ros-humble-desktop

# Cargar el entorno (en cada terminal nueva, o añádelo a ~/.bashrc)
source /opt/ros/humble/setup.bash
```

### Verificar la instalación

```bash
# Terminal 1
ros2 run demo_nodes_cpp talker

# Terminal 2
ros2 run demo_nodes_py listener
```

Ver `Hello World: N` repetirse significa que todo funciona.

## 3. Conceptos básicos

| Concepto | Descripción | Ejemplo |
|---------|-------------|---------|
| **Nodo** | Proceso independiente | Nodo IMU, nodo del brazo robótico |
| **Topic** | Flujo de datos publish/subscribe | Actitud en `/imu/data` |
| **Mensaje** | Tipo de datos del topic | `sensor_msgs/Imu` |
| **Servicio** | Petición/respuesta | Reiniciar un servo |
| **Archivo launch** | Orquestación de arranque multi-nodo | `imu_launch.py` |

## 4. Práctica con productos Juxi

### Módulo IMU (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

ros2 launch icm42670p imu_launch.py

# Ver datos
ros2 topic echo /imu/data
```

- [Tutorial ROS2 del IMU](/es/tutorials/sensors/imu/ros-examples/ros2)
- [Tutorial ROS1 del IMU](/es/tutorials/sensors/imu/ros-examples/ros1)

### Módulo KWS (RViz2)

- [Visualización ROS2 RViz2 del KWS](/es/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. Referencia rápida de comandos

```bash
ros2 node list                 # Listar nodos
ros2 topic list                # Listar topics
ros2 topic echo /topic         # Ver datos del topic
ros2 service list              # Listar servicios
ros2 launch pkg file.launch.py # Lanzar
```

## Preguntas frecuentes

**P: ¿Errores al ejecutar `source /opt/ros/humble/setup.bash`?**

**R:** Verifica la versión instalada y la ruta; en Jetson, activa conda primero si lo usas.

**P: ¿Errores de permisos en el puerto?**

**R:** `sudo chmod 666 /dev/ttyACM*`.

**P: ¿Usas Jetson?**

**R:** Ten en cuenta la compatibilidad de PyTorch; consulta [Compatibilidad de PyTorch en Jetson](/es/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Soporte

- 📧 Correo electrónico: support@juxitech.com
- 🌐 Web: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
