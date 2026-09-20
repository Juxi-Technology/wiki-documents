---
title: "RDK"
description: "Communication I2C du capteur d'attitude IMU avec la carte RDK X5 : câblage sur le bus I2C, vérification du périphérique et affichage des données."
---

# RDK

## 1. Connecter le périphérique

Ce tutoriel utilise la carte mère RDK X5 comme exemple.

Connecter le capteur d'attitude IMU à l'interface I2C de la RDK X5 comme illustré ci-dessous.

![1. Connecter le périphérique – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/1.jpg)

![1. Connecter le périphérique – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/2.jpg)

## 2. Vérifier l'état du périphérique

Vérifier les périphériques I2C

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

![2. Vérifier l'état du périphérique – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/3.png)

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

Glisser les fichiers décompressés sur la RDK X5 avec MobaXterm.

![3. Installer les bibliothèques de pilotes – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/4.png)

## 4. Afficher les données IMU

**Entrer dans le répertoire ~/IMU_Library et exécuter IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# ou
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# Exécuter le fichier de sortie de données série IMU
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Afficher les données IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/5.png)

Remarque : ce qui précède concerne un IMU 10 axes ; les 6 axes n'ont pas de magnétomètre ni de baromètre, les 9 axes pas de baromètre.

## **5. Calibrage IMU**

**Entrer dans le répertoire ~/IMU_Library et exécuter imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# Exécuter le script de calibration IMU -- I2C
# Exécuter toutes les calibrations (globale, magnétomètre, température)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# Calibration globale seule
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# Magnétomètre seul
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# Température seule
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5. Calibrage IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/6.png)

## 6. Remarques

Avec la RDK X5, le numéro du bus I2C doit être adapté à la situation – voir la figure ci-dessous. Habituellement bus 0

![6. Remarques – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/7.png)

![6. Remarques – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/8.png)






