---
title: Raspberry Pi 5
description: "Ce tutoriel utilise la carte mère Raspberry Pi 5 avec l'image officielle 64 bits comme exemple."
---

# Raspberry Pi 5

## 1. Connecter le périphérique

Ce tutoriel utilise la carte mère Raspberry Pi 5 avec l'image officielle 64 bits comme exemple.

Connecter le capteur d'attitude IMU à l'interface I2C de la Raspberry Pi 5 comme illustré ci-dessous.

![1. Connecter le périphérique – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmVjNTEwNDY2MWRiNmUzNWNhYjVmMjhlYWVlZmY1ODhfOWExZWQxZGMwNmIxNzNlNmQzNjRmYWZmMDU0OTE1ODVfSUQ6NzYwMjU3ODcxMzEyOTA2MTMyOF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![1. Connecter le périphérique – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDYzMGZjYWU1ZGUzMzFjZjdhNzk1MGJhNThkY2ViODNfYzA3MTIyZjAxYjc0NTc4ZTM0NWViZGNkYjMyMmJiZTFfSUQ6NzYwMjU3NDczMjM2MjA5MTQ1MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 2. Vérifier l'état du périphérique

Installer d'abord I2Ctool, saisir dans le terminal :

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Vérifier les périphériques I2C

\`\`\`PowerShell
sudo i2cdetect -y -r -a 1
\`\`\`

![2. Vérifier l'état du périphérique – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWM3NzU5ODY2MDUwNTg3MjdlMTNiYjlhOWRiOTI1MDZfZGM4NDM5MzFiNTZlODgyMWE2ZjY3M2VjZGM3MmU0MzNfSUQ6NzYwMjU3OTYzMDY2MjUzNjM4OF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 3. Installer les bibliothèques de pilotes

3.1 **Installer les bibliothèques Python nécessaires au code**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transférer les fichiers

[IMU_ROS2.zip]

Si vous n'êtes pas encore familier avec l'utilisation de MobaXterm pour transférer des fichiers, consultez la page suivante pour l'installation détaillée et le mode d'emploi de MobaXterm : [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Glisser les fichiers décompressés sur la Raspberry Pi 5 avec MobaXterm.

![3. Installer les bibliothèques de pilotes – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGE0OThjMWZiZGZkMmNkODY1MWQ1YTJjZTI1ZTBjYTlfMTVjYzhhOTdjZjAxODdmZjcxYjliMjgzYTkzOTg4YzBfSUQ6NzYwMjU4MjU5NjQ0Njg2NjY1N18xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 4. Afficher les données IMU

**Entrer dans le répertoire ~/IMU_Library et exécuter IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Afficher les données IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI5NzY2YzRiODVkYWExYjk3M2QyNWU2ZjRmMDkxODRfOTMxYTMxMTU4NzVlNjNmY2YxMTUwMzgxOTI0ZTc3ZTJfSUQ6NzYwMjU3NTcxMDk4NDczNTk0OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

Remarque : ce qui précède concerne un IMU 10 axes ; les 6 axes n'ont pas de magnétomètre ni de baromètre, les 9 axes pas de baromètre.

## **5. Calibrage IMU**

**Entrer dans le répertoire ~/IMU_Library et exécuter imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. Calibrage IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTBhMDJlMGQ0ZmZmYzRlYzVmOGNhZTQyYjExYmQxNDhfMjU5YjA0NGRkNGY0YTM1OGE3NzYxOTdlNjcxMGQ2NmRfSUQ6NzYwMjU3NDczMzQ5MDA0NzkzOV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 6. Remarques

Le Raspberry Pi 5 nécessite d'activer au préalable les broches I2C.<br>Procédure :<br>Exécuter dans le terminal

```PowerShell
sudo raspi-config
```

Sélectionner avec les flèches, valider avec Entrée<br>Sélectionner I2C, valider avec Entrée<br>Après sélection d'I2C, appuyer sur Entrée, choisir Yes avec les flèches et confirmer avec Entrée.<br>Confirmer avec Entrée<br>Choisir Finish avec les flèches et quitter avec Entrée.

![6. Remarques – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGFhOGFkMjU0M2ZhZTA3ZTgzN2RmNWNhMTFhYTdmNzBfN2VkMWQ4ZWNjZDY3OThkM2M4MDA5OWE4MTczNTQ0NTRfSUQ6NzYwMjU4MDA1MTM1MjA3OTU3OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Remarques – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzY0NWQ5NTdkNjExNDk4ZTUwMDc2NTEzMDUwZTdiZTNfMTAwMzc2NzNlMTAzZmQ4OGE0YWJiM2YxZjg0ZDc3NDVfSUQ6NzYwMjU4MDIyMjIwMjEyMTQwNF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Remarques – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDUzZjI5OWU2MmQ2OGZjNDBkMmFmMjE3OWUwYmRmMTBfMWY1ZmUwYjdjOTAwZTBiYzg5NTBjNWM5ZTNkOWI0OTdfSUQ6NzYwMjU4MDMxMTA4Mzk0NTE3NF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Remarques – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTRjMDQxNWViMzJiZDVhYzVkMDBkYWZjODg0NTI3NTA3MWExODE2ZjRlOTVlZWM0NDdmZGQ0Yzc4Y2Y1MWJlNmRfSUQ6NzYwMjU4MDM5OTc2MzY4ODM4MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Remarques – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBjZDE2YTYxNGU3OTJlNzA0OWQwMjY0ODY2MTBiZGZfY2Q0ZmU0OTdmYTQyYjliODExMzI2YmM3NTdkMWY5YWRfSUQ6NzYwMjU4MDQ5NjAyNzUzNjU4Nl8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)
