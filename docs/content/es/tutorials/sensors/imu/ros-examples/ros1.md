---
title: Aplicación ROS1
description: "Módulo IMU en ROS1: configura el entorno Noetic en Ubuntu 20.04, conecta el sensor por puerto serie y visualiza los datos de actitud."
---

# Aplicación ROS1

> **[Comprar en la tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configuración del sistema: ubuntu20.04**

**Versión ROS1: noetic**

### Configuración del entorno ROS1

1. **Configurar la fuente de instalación de ROS1**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Configurar la clave**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **Instalar ROS1 (descarga oficial)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

Instalar ROS1 con descarga acelerada por proxy
wget http://fishros.com/install -O fishros && . fishros

4. **Configurar variables de entorno**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
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

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **Verificar**

```PowerShell
ll /dev/imu-serial
```

```Bash
sudo usermod -aG dialout ash
```

### Importar el paquete comprimido preparado

1. **En el mismo directorio que Feishu**: [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **Descomprimir y transferir a la máquina virtual con el software de transferencia**

3. **Instalar la biblioteca IMU_Library**

```PowerShell
cd IMU_ROS1
# Después de descargar y descomprimir el archivo IMU_ROS1, entrar en el directorio IMU_Library y ejecutar los siguientes comandos
cd IMU_Library
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

**Si hay problemas de renderizado, ejecutar el siguiente comando**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### Construir el proyecto ROS1

1. **Abrir un terminal nuevo en /home, crear el workspace ros1**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **Copiar la carpeta IMU_ROS1 transferida a ~/imu_ros1/src/**

```PowerShell
# Copiar la carpeta IMU_ROS1 en el directorio src recién creado
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Añadir el directorio de trabajo ~/imu_ros1 a las variables de entorno**

```PowerShell
# Editar ~/.bashrc
sudo gedit ~/.bashrc
# Escribir los siguientes comandos al final
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### Iniciar el nodo ROS1

1. **Abrir un terminal, escribir roscore para iniciar el nodo**

```PowerShell
# Iniciar roscore
roscore
# Abrir un terminal nuevo, cargar el entorno e iniciar el nodo
source ~/imu_ros1/devel/setup.bash
```

2. **Dar permisos de ejecución a los scripts Python (importante)**

Entrar en el directorio `scripts` de los scripts y ejecutar `chmod +x` para dar permisos de ejecución (`+x` = añadir ejecución):

```PowerShell
# Entrar en el directorio donde se encuentra imu_driver.py (según tu ruta real)
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# Dar permisos de ejecución (solo hay que hacerlo una vez; es permanente)
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

Volver a la carpeta imu_ros1 y ejecutar imu_driver.py
```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### Imprimir datos IMU

1. **Abrir un terminal nuevo, ver los topics imu**

```PowerShell
# Ver todos los temas publicados actualmente
rostopic list
```

2. **Imprimir datos de los topics**

```PowerShell
# Imprimir los datos IMU sin procesar
rostopic echo /imu/data_raw
# Imprimir los datos del magnetómetro
rostopic echo /imu/mag
```

### Visualización RViz

1. **Ejecutar el comando para iniciar rviz**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### Preguntas frecuentes

1. Si el nodo no arranca, probar estos comandos

```PowerShell
# Ejecutar en el directorio ~/imu_ros1
source devel/setup.bash
# Problema del número de puerto
sudo chmod 666 /dev/imu-serial
```

2. Si los ejes se ven muy pequeños en RViz, volver a marcar Enable axes


![Imagen 1](../../../../../../public/images/tutorials/sensors/imu/ros-examples/ros1/1.png)