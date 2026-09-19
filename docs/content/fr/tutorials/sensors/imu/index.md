---
title: Tutoriel capteur d'attitude IMU haute précision
description: "Tutoriel du capteur d'attitude IMU haute précision : installer la bibliothèque, configurer le mappage des ports, communication série ou IIC et calibration."
---

# Tutoriel capteur d'attitude IMU haute précision

### Téléchargez l'archive [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb) ou [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb), extrayez-la puis allez dans ~/IMU_Library

1. **Installer les bibliothèques Python requises**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **Installer la bibliothèque IMU_Library**

```PowerShell
# Installer les bibliothèques Python requises
pip install -e .

# Installer la bibliothèque et ses dépendances
python setup.py install
```

3. **Configurer le mappage de ports**

```PowerShell
# Définir le mappage de ports pour éviter les changements après branchement/débranchement
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# Si gedit est absent, l'installer d'abord
sudo apt install gedit

# Renseigner le mappage
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# Explication des paramètres :
`--mode`: Mode de communication : `serial` (série) ou `i2c`
`--port`: Nom du port série (ex. `/dev/ttyUSB0`) ou numéro de port I2C (ex. `7`)
`--rate`: Fréquence d'affichage (Hz), 10Hz par défaut
`--debug`: Activer le mode débug, afficher les détails

# Enregistrer et quitter, exécuter les commandes pour activer les règles
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# Vérifier
ll /dev/imu-serial

# Exemple de sortie :
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### Communication série

1. **Entrer dans ~/IMU_Library et exécuter IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library
# Exécuter le fichier de sortie de données série IMU
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# ou
python3 IMU_Serial_Library.py
```

### Communication I2C

1. **Entrer dans ~/IMU_Library et exécuter IMU_I2C_Library.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Exécuter le fichier de sortie de données I2C IMU
python3 IMU_I2C_Library.py
```

### Calibration IMU

1. **Entrer dans ~/IMU_Library et exécuter imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Exécuter le script de calibration IMU -- Communication série
# Exécuter toutes les calibrations (globale, magnétomètre, température)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Calibration globale seule
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Magnétomètre seul
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Température seule
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# Calibration I2C
# Exécuter le script de calibration IMU -- I2C
python3 imu_calibration_tool.py --mode i2c --port 1

# Calibration globale seule
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Magnétomètre seul
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Température seule
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```


---

## Exemple du dépôt officiel

Juxi Technology fournit le code open source complet pour le module IMU : [GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### Exemples ROS1 / ROS2

Le dépôt prend en charge nativement ROS1 et ROS2, avec des outils de calibration et des nœuds de visualisation :

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Outil de calibration Python

```bash
# 运行六面校准获取精确的加速度计和陀螺仪零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```

- **Dernière mise à jour (UTC)**
  - [Calibration IMU](./calibration.md)
  - [Transfert de fichiers à distance](./remote-file-transfer.md)
  - [Transfert de fichiers SSH](./ssh-file-transfer.md)
- **Navigation inertielle IMU**
  - [Informations produit](./product-info.md)
- **Exemples multi-cartes**
  - [Aperçu des cas multi-hôtes](./multi-board-examples/overview.md)
  - [Communication PC](./multi-board-examples/pc-communication.md)
- **Communication I2C**
  - [Arduino](./multi-board-examples/i2c-communication/arduino.md)
  - [Jetson](./multi-board-examples/i2c-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/i2c-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/i2c-communication/rdk.md)
  - [STM32](./multi-board-examples/i2c-communication/stm32.md)
- **Communication série**
  - [Arduino](./multi-board-examples/serial-communication/arduino.md)
  - [Jetson](./multi-board-examples/serial-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/serial-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/serial-communication/rdk.md)
  - [STM32](./multi-board-examples/serial-communication/stm32.md)
- **Exemples ROS**
  - [Application ROS1](./ros-examples/ros1.md)
  - [Application ROS2](./ros-examples/ros2.md)
