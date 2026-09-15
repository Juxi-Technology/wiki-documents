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
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library
# 安装库及其依赖
pip install -e .
# 或使用setup.py安装
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
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Añadir el directorio de trabajo ~/imu_ros1 a las variables de entorno**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### Iniciar el nodo ROS1

1. **Abrir un terminal, escribir roscore para iniciar el nodo**

```PowerShell
# 启动roscore
roscore
# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **Dar permisos de ejecución a los scripts Python (importante)**

Entrar en el directorio `scripts` de los scripts y ejecutar `chmod +x` para dar permisos de ejecución (`+x` = añadir ejecución):

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# 赋予可执行权限（仅需执行1次，永久生效）
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
# 查看当前发布的所有话题
rostopic list
```

2. **Imprimir datos de los topics**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw
# 打印磁力计数据
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
# 在~/imu_ros1目录下运行
source devel/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. Si los ejes se ven muy pequeños en RViz, volver a marcar Enable axes
