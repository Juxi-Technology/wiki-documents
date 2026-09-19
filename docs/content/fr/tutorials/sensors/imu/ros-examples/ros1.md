---
title: Application ROS1
description: "Application ROS1 du module IMU sous Ubuntu 20.04 : installer ROS Noetic, transférer la bibliothèque et construire le projet pour publier l'attitude."
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
# Après avoir téléchargé et décompressé l'archive IMU_ROS1, entrer dans le répertoire IMU_Library et exécuter la commande suivante
cd IMU_Library
# Installer la bibliothèque et ses dépendances
pip install -e .
# Ou installer avec setup.py
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
# Copier le dossier IMU_ROS1 dans le répertoire src nouvellement créé
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Ajouter le répertoire de travail ~/imu_ros1 aux variables d'environnement**

```PowerShell
# Éditer ~/.bashrc
sudo gedit ~/.bashrc
# Écrire la commande suivante à la fin
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### Démarrer le nœud ROS1

1. **Ouvrir un terminal, saisir roscore pour démarrer le nœud**

```PowerShell
# Lancer roscore
roscore
# Ouvrir un nouveau terminal, configurer l'environnement et lancer le nœud
source ~/imu_ros1/devel/setup.bash
```

2. **Donner les droits d'exécution aux scripts Python (important)**

Entrer dans le répertoire `scripts` des scripts et exécuter `chmod +x` pour donner les droits d'exécution (`+x` = ajouter l'exécution) :

```PowerShell
# Se placer dans le répertoire contenant imu_driver.py (selon votre chemin réel)
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# Donner les permissions d'exécution (une seule fois, effet permanent)
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
# Afficher tous les topics publiés actuellement
rostopic list
```

2. **Afficher les données des topics**

```PowerShell
# Afficher les données brutes de l'IMU
rostopic echo /imu/data_raw
# Afficher les données du magnétomètre
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
# Exécuter dans le répertoire ~/imu_ros1
source devel/setup.bash
# Problème de numéro de port
sudo chmod 666 /dev/imu-serial
```

2. Si les axes sont affichés très petits dans RViz, recocher Enable axes


![Image 1](../../../../../../public/images/tutorials/sensors/imu/ros-examples/ros1/1.png)