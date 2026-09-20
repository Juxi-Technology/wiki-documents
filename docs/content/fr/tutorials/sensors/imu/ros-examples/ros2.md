---
title: Application ROS2
description: "Application ROS2 du module IMU sous Ubuntu 22.04 : installer ROS2 Humble, compiler le paquet et afficher les données d'attitude sur les topics."
---

# Application ROS2

> **[Acheter en boutique](https://www.juxitech.com/fr/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configuration système : ubuntu22.04**

**Version ROS2 : humble**

### Configuration de l'environnement ROS2

1. **Mettre à jour les sources de téléchargement**

```PowerShell
sudo apt update
```

2. **Saisir la commande de téléchargement ROS2**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
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

```PowerShell
sudo service udev reload
```

```PowerShell
sudo service udev restart
```

5. **Vérifier**

```PowerShell
ll /dev/imu-serial
```

### Importer l'archive préparée

1. **Dans le même répertoire que Feishu** : [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **Transférer dans la machine virtuelle avec le logiciel de transfert**

3. **Installer la bibliothèque IMU_Library**

```PowerShell
# Après avoir téléchargé et décompressé l'archive IMU_ROS2, entrer dans le répertoire IMU_Library et exécuter setup.py
cd IMU_ROS2/IMU_Library
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

### Construire le projet ROS2

1. **Revenir au répertoire ~/IMU_ROS2**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **Ajouter le répertoire de travail ~/IMU_ROS2 aux variables d'environnement**

```PowerShell
# Éditer ~/.bashrc
sudo gedit ~/.bashrc
# Écrire la commande suivante à la fin
source ~/IMU_ROS2/install/setup.bash
```

Après la compilation réussie, vérifier avec la commande suivante si le paquet imu_ros2 contient des exécutables
`ros2 pkg executables imu_ros2`

### Démarrer le nœud ROS2

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### Afficher les données IMU

1. **Ouvrir un nouveau terminal, afficher les topics imu**

```PowerShell
ros2 topic list
```

2. **Afficher les données du topic /imu/data**

```PowerShell
ros2 topic echo /imu/data
```

3. **Ouvrir un nouveau terminal, afficher le topic msg**

```PowerShell
ros2 topic echo /imu/mag
```

### Visualisation RViz2

1. **Exécuter la commande pour ouvrir l'interface rviz**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### Questions fréquentes

1. Si le démarrage du nœud échoue, essayer ces commandes

```PowerShell
# Exécuter dans le répertoire ~/IMU_ROS2
source install/setup.bash
# Problème de numéro de port
sudo chmod 666 /dev/imu-serial
```
