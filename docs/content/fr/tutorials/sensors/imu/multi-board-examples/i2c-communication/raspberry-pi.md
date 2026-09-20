---
title: "Raspberry Pi"
description: "Ce tutoriel utilise la carte mère Raspberry Pi 5 avec l'image officielle 64 bits comme exemple."
---

# Raspberry Pi

## 1. Connecter le périphérique

Ce tutoriel utilise la carte mère Raspberry Pi 5 avec l'image officielle 64 bits comme exemple.

Connecter le capteur d'attitude IMU à l'interface I2C de la Raspberry Pi 5 comme illustré ci-dessous.

![1. Connecter le périphérique – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/1.jpg)

![1. Connecter le périphérique – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/2.png)

## 2. Vérifier l'état du périphérique

Installer d'abord I2Ctool, saisir dans le terminal :

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Vérifier les périphériques I2C

```PowerShell
sudo i2cdetect -y -r -a 1
```

![2. Vérifier l'état du périphérique – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/3.png)

## 3. Installer les bibliothèques de pilotes

3.1 **Installer les bibliothèques Python nécessaires au code**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transférer les fichiers

IMU_ROS2.zip

Si vous n'êtes pas encore familier avec l'utilisation de MobaXterm pour transférer des fichiers, consultez la page suivante pour l'installation détaillée et le mode d'emploi de MobaXterm : [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Glisser les fichiers décompressés sur la Raspberry Pi 5 avec MobaXterm.

![3. Installer les bibliothèques de pilotes – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/4.png)

## 4. Afficher les données IMU

**Entrer dans le répertoire ~/IMU_Library et exécuter IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# Exécuter le fichier de sortie de données série IMU
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Afficher les données IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/5.png)

Remarque : ce qui précède concerne un IMU 10 axes ; les 6 axes n'ont pas de magnétomètre ni de baromètre, les 9 axes pas de baromètre.

## **5. Calibrage IMU**

**Entrer dans le répertoire ~/IMU_Library et exécuter imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# Exécuter le script de calibration IMU -- I2C
# Exécuter toutes les calibrations (globale, magnétomètre, température)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# Calibration globale seule
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# Magnétomètre seul
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# Température seule
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. Calibrage IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/6.png)

## 6. Remarques

Le Raspberry Pi 5 nécessite d'activer au préalable les broches I2C.<br>Procédure :<br>Exécuter dans le terminal

```PowerShell
sudo raspi-config
```

Sélectionner avec les flèches, valider avec Entrée<br>Sélectionner I2C, valider avec Entrée<br>Après sélection d'I2C, appuyer sur Entrée, choisir Yes avec les flèches et confirmer avec Entrée.<br>Confirmer avec Entrée<br>Choisir Finish avec les flèches et quitter avec Entrée.

![6. Remarques – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/7.png)

![6. Remarques – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/8.png)

![6. Remarques – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/9.png)

![6. Remarques – 4](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/10.png)

![6. Remarques – 5](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/11.png)
