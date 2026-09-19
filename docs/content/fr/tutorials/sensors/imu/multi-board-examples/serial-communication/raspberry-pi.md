---
title: "Raspberry Pi"
description: "Ce tutoriel utilise la carte mère Raspberry Pi 5 comme exemple."
---

# Raspberry Pi

## 1. Connecter le périphérique

Ce tutoriel utilise la carte mère Raspberry Pi 5 comme exemple.

Brancher le capteur d'attitude IMU sur l'USB de l'hôte via un câble Type-C.

![1. Connecter le périphérique – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/1.jpg)

## 2. Vérifier l'état du périphérique

Vérifier l'ID du périphérique

```PowerShell
lsusb
```

Vérifier le numéro de périphérique

```PowerShell
ls -l /dev/ttyU*
```

Configurer le mapping des ports

```Bash
# Définir le mappage de ports pour éviter les changements après branchement/débranchement
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
# Si gedit est absent, l'installer d'abord
sudo apt install gedit
# Renseigner le mappage
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
# Explication des paramètres
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
# Exemple de sortie
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

## 3. Installer les bibliothèques de pilotes

3.1 **Installer les bibliothèques Python nécessaires au code**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 **Transférer les fichiers**

IMU_ROS2.zip

Si vous n'êtes pas encore familier avec l'utilisation de MobaXterm pour transférer des fichiers, consultez la page suivante pour l'installation détaillée et le mode d'emploi de MobaXterm : [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Glisser les fichiers décompressés sur la Raspberry Pi 5 avec MobaXterm.

![3. Installer les bibliothèques de pilotes – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/2.png)

## 4. Afficher les données IMU

**Entrer dans le répertoire ~/IMU_Library et exécuter IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# Exécuter le fichier de sortie de données série IMU
python3 -m IMU_Library.IMU_Serial_Library
```

![4. Afficher les données IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/3.png)

Remarque : ce qui précède concerne un IMU 10 axes ; les 6 axes n'ont pas de magnétomètre ni de baromètre, les 9 axes pas de baromètre.

## **5. Calibrage IMU**

**Entrer dans le répertoire ~/IMU_Library et exécuter imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library
# Exécuter le script de calibration IMU -- Communication série
# Exécuter toutes les calibrations (globale, magnétomètre, température)
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial
# Calibration globale seule
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu
# Magnétomètre seul
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag
# Température seule
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![5. Calibrage IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/4.png)

## 6. Remarques

Si l'ID du périphérique est visible mais aucun numéro de périphérique, installer le pilote ch34x avec les commandes suivantes

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```
