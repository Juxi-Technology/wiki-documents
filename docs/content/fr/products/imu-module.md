---
title: Module IMU inertiel de haute précision
category: sensor
description: "Module IMU de Juxi Technology — attitude 100Hz, options 6/9/10 axes, IIC+UART, intégration ROS"
keywords: [imu, inertiel, capteur d'attitude, ahrs, ros]
---

# Module IMU inertiel de haute précision

> **[Acheter en boutique](https://www.juxitech.com/fr/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Présentation

Le capteur d'attitude IMU de haute précision embarque un processeur 32 bits à 72MHz pour le calcul d'attitude en temps réel et la compensation dynamique, jusqu'à **100Hz**. Communication double mode IIC et série, compatible microcontrôleurs et hôtes Linux, intégration ROS transparente.

**Sélection de version** :

| Version | Gyroscope | Accéléromètre | Magnétomètre | Baromètre | AHRS |
|------|--------|---------|--------|--------|------|
| 6 axes | ✅ | ✅ | - | - | - |
| 9 axes | ✅ | ✅ | ✅ | - | ✅ |
| 10 axes | ✅ | ✅ | ✅ | ✅ | ✅ |

## Spécifications

| Catégorie | Spécification |
|------|------|
| Processeur | 72MHz 32 bits |
| Fréquence | 25Hz par défaut, 10–100Hz |
| Interface | IIC (100KHz) / UART (115200bps) |
| Sortie | 3 axes accel/gyro/euler/mag/pression/temp/quaternion |
| Alimentation | 5V ou 3.3V, 11mA |
| Taille/Poids | 27.4×22.6×12mm, 3.8g |
| Température de fonctionnement | -40°C ~ +85°C (stockage -40°C ~ +100°C) |
| Résistance aux chocs | 20kg (carte nue) |
| ROS | ROS1 / ROS2 |

## Démarrage rapide
```bash
# ROS2 启动
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# 校准(首次使用)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```
## Tutoriels

- [Présentation du module IMU](/fr/tutorials/sensors/imu/product-info)
- [Guide de calibration IMU](/fr/tutorials/sensors/imu/calibration)
- [IMU ROS2](/fr/tutorials/sensors/imu/ros-examples/ros2)
- [Exemples multi-cartes IMU](/fr/tutorials/sensors/imu/multi-board-examples/overview)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
