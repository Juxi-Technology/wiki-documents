---
title: Application ROS1
description: "Configuration système : ubuntu20.04"
---

# Application ROS1

> **[Acheter en boutique](https://www.juxitech.com/fr/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configuration système : ubuntu20.04**

**Version ROS1 : noetic**

### Configuration de l'environnement ROS1

1. **Configurer la source d'installation ROS1**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Configurer la clé**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **Installer ROS1 (téléchargement officiel)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

Installer ROS1 avec accélération par proxy
wget http://fishros.com/install -O fishros && . fishros

4. **Configurer les variables d'environnement**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
```

### Connecter le périphérique à la machine virtuelle

1. **Vérifier le périphérique**

```PowerShell
ll /dev/ttyUSB*
```

2. **Créer le mapping des ports**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **Remplir le contenu du fichier de mapping**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **Enregistrer et quitter, exécuter les commandes pour activer les règles**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **Vérifier**

```PowerShell
ll /dev/imu-serial
```

```Bash
sudo usermod -aG dialout ash
```

### Importer l'archive préparée

1. **Dans le même répertoire que Feishu** : [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **Extraire puis transférer dans la machine virtuelle avec le logiciel de transfert**

3. **Installer la bibliothèque IMU_Library**

```PowerShell
cd IMU_ROS1
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library
# 安装库及其依赖
pip install -e .
# 或使用setup.py安装
python setup.py install
```

### Installer les bibliothèques Python

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

**En cas de problème de rendu, exécuter la commande suivante**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### Construire le projet ROS1

1. **Ouvrir un nouveau terminal dans /home, créer le workspace ros1**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **Copier le dossier IMU_ROS1 transféré dans ~/imu_ros1/src/**

```PowerShell
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Ajouter le répertoire de travail ~/imu_ros1 aux variables d'environnement**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### Démarrer le nœud ROS1

1. **Ouvrir un terminal, saisir roscore pour démarrer le nœud**

```PowerShell
# 启动roscore
roscore
# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **Donner les droits d'exécution aux scripts Python (important)**

Entrer dans le répertoire `scripts` des scripts et exécuter `chmod +x` pour donner les droits d'exécution (`+x` = ajouter l'exécution) :

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# 赋予可执行权限（仅需执行1次，永久生效）
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

Revenir au dossier imu_ros1 et exécuter imu_driver.py
```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### Afficher les données IMU

1. **Ouvrir un nouveau terminal, afficher les topics imu**

```PowerShell
# 查看当前发布的所有话题
rostopic list
```

2. **Afficher les données des topics**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw
# 打印磁力计数据
rostopic echo /imu/mag
```

### Visualisation RViz

1. **Exécuter la commande pour démarrer rviz**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### Questions fréquentes

1. Si le démarrage du nœud échoue, essayer ces commandes

```PowerShell
# 在~/imu_ros1目录下运行
source devel/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. Si les axes sont affichés très petits dans RViz, recocher Enable axes
