---
title: Applicazione ROS1
description: "Applicazione ROS1 del modulo IMU su Ubuntu 20.04: installare ROS Noetic, costruire il progetto e avviare il nodo del driver per stampare i dati di assetto."
---

# Applicazione ROS1

> **[Acquista nel negozio](https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configurazione di sistema: ubuntu20.04**

**Versione ROS1: noetic**

### Configurazione dell'ambiente ROS1

1. **Configurare la sorgente di installazione di ROS1**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Configurare la chiave**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **Installare ROS1 (download ufficiale)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

Installare ROS1 con download accelerato via proxy
wget http://fishros.com/install -O fishros && . fishros

4. **Configurare le variabili di ambiente**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
```

### Collegare il dispositivo alla macchina virtuale

1. **Verificare il dispositivo**

```PowerShell
ll /dev/ttyUSB*
```

2. **Creare il mapping delle porte**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **Compilare il contenuto del file di mapping**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **Salvare e uscire, eseguire i comandi per attivare le regole**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **Verificare**

```PowerShell
ll /dev/imu-serial
```

```Bash
sudo usermod -aG dialout ash
```

### Importare l'archivio preparato

1. **Nella stessa directory di Feishu**: [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **Estrarre e trasferire nella macchina virtuale con il software di trasferimento**

3. **Installare la libreria IMU_Library**

```PowerShell
cd IMU_ROS1
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library
# 安装库及其依赖
pip install -e .
# 或使用setup.py安装
python setup.py install
```

### Installare le librerie Python

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

**Se si verificano problemi di rendering, eseguire il comando seguente**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### Costruire il progetto ROS1

1. **Aprire un nuovo terminale in /home, creare il workspace ros1**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **Copiare la cartella IMU_ROS1 trasferita in ~/imu_ros1/src/**

```PowerShell
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Aggiungere la directory di lavoro ~/imu_ros1 alle variabili di ambiente**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### Avviare il nodo ROS1

1. **Aprire un terminale, digitare roscore per avviare il nodo**

```PowerShell
# 启动roscore
roscore
# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **Dare i permessi di esecuzione agli script Python (importante)**

Entrare nella directory `scripts` degli script ed eseguire `chmod +x` per dare i permessi di esecuzione (`+x` = aggiungi esecuzione):

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# 赋予可执行权限（仅需执行1次，永久生效）
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

Tornare alla cartella imu_ros1 ed eseguire imu_driver.py
```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### Stampare i dati IMU

1. **Aprire un nuovo terminale, vedere i topic imu**

```PowerShell
# 查看当前发布的所有话题
rostopic list
```

2. **Stampare i dati dei topic**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw
# 打印磁力计数据
rostopic echo /imu/mag
```

### Visualizzazione RViz

1. **Eseguire il comando per avviare rviz**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### Domande frequenti

1. Se l'avvio del nodo fallisce, provare questi comandi

```PowerShell
# 在~/imu_ros1目录下运行
source devel/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. Se gli assi in RViz sono visualizzati molto piccoli, riselezionare Enable axes
