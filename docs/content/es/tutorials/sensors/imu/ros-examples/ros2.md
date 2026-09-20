---
title: Aplicación ROS2
description: "Módulo IMU en ROS2: configura Humble en Ubuntu 22.04, conecta el sensor por puerto serie y visualiza los datos de actitud."
---

# Aplicación ROS2

> **[Comprar en la tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configuración del sistema: ubuntu22.04**

**Versión ROS2: humble**

### Configuración del entorno ROS2

1. **Actualizar las fuentes de descarga**

```PowerShell
sudo apt update
```

2. **Introducir el comando de descarga de ros2**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
```

### Conectar el dispositivo a la máquina virtual

1. **Comprobar el dispositivo**

```PowerShell
ll /dev/ttyUSB*
```

2. **Crear el mapeo de puertos**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **Rellenar el contenido del archivo de mapeo**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **Guardar y salir, ejecutar los comandos para activar las reglas**

```PowerShell
sudo udevadm trigger
```

```PowerShell
sudo service udev reload
```

```PowerShell
sudo service udev restart
```

5. **Verificar**

```PowerShell
ll /dev/imu-serial
```

### Importar el paquete comprimido preparado

1. **En el mismo directorio que Feishu**: [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **Transferir a la máquina virtual con el software de transferencia**

3. **Instalar la biblioteca IMU_Library**

```PowerShell
# Después de descargar y descomprimir el archivo IMU_ROS2, entrar en el directorio IMU_Library y ejecutar setup.py
cd IMU_ROS2/IMU_Library
# Instalar la biblioteca y sus dependencias
pip install -e .
# o instalarlo con setup.py
python setup.py install
```

### Instalar bibliotecas Python

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

### Construir el proyecto ROS2

1. **Volver al directorio ~/IMU_ROS2**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **Añadir el directorio de trabajo ~/IMU_ROS2 a las variables de entorno**

```PowerShell
# Editar ~/.bashrc
sudo gedit ~/.bashrc
# Escribir los siguientes comandos al final
source ~/IMU_ROS2/install/setup.bash
```

Tras compilar correctamente, verificar con el siguiente comando si el paquete imu_ros2 contiene ejecutables
`ros2 pkg executables imu_ros2`

### Iniciar el nodo ROS2

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### Imprimir datos IMU

1. **Abrir un terminal nuevo, ver los topics imu**

```PowerShell
ros2 topic list
```

2. **Imprimir datos del topic /imu/data**

```PowerShell
ros2 topic echo /imu/data
```

3. **Abrir un terminal nuevo, ver el topic msg**

```PowerShell
ros2 topic echo /imu/mag
```

### Visualización RViz2

1. **Ejecutar el comando para abrir la interfaz rviz**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### Preguntas frecuentes

1. Si el nodo no arranca, probar estos comandos

```PowerShell
# Ejecutar en el directorio ~/IMU_ROS2
source install/setup.bash
# Problema del número de puerto
sudo chmod 666 /dev/imu-serial
```
