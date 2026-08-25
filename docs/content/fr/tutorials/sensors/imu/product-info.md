---
title: Présentation du module IMU
description: "Capteur d'attitude IMU haute précision : processeur 72MHz 32 bits, calcul temps réel, jusqu'à 100Hz"
---

# Présentation du module IMU

Capteur d'attitude IMU haute précision avec **processeur 72MHz 32 bits**, calcul d'attitude temps réel et compensation dynamique, jusqu'à **100Hz**. Communication double IIC et série, compatible MCU/hôtes Linux et ROS.

## Versions

| Comparaison | 6 axes | 9 axes | 10 axes |
|-------------|--------|--------|---------|
| Processeur 32 bits | √ | √ | √ |
| Gyroscope 3 axes | √ | √ | √ |
| Accéléromètre 3 axes | √ | √ | √ |
| Magnétomètre 3 axes | - | √ | √ |
| Baromètre | - | - | √ |
| Fusion AHRS | - | √ | √ |
| Usage | Coût | Stabilité+précision | Position 3D |

## Broches

| Broche | Fonction |
|--------|----------|
| SDA / SCL | Données/horloge I2C |
| GND | Masse |
| 3V3 / 5V | Alimentation |
| RX / TX | Série RX/TX |

## Spécifications

| Paramètre | Valeur |
|-----------|--------|
| Baudrate | 115200bps |
| Fréquence de sortie | 25Hz par défaut, 10-100Hz |
| Horloge IIC | 100KHz |
| Sortie | 3 axes accel./angul./gyro/Euler/mag/pression/altitude/temp/quaternion |
| Température | -40°C à +85°C |
| Appareils | PC, RPi, Jetson, RDK, STM32, Arduino |
| Tension | 5V / 3.3V, 11mA |
| Taille/Poids | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1/ROS2 |

## Performance des capteurs

| IMU | Accéléromètre | Gyro | Magnétomètre |
|-----|--------------|------|--------------|
| Plage | ±16g | ±2000°/s | ±8Gauss |

## Navigation

| Paramètre | Valeur |
|-----------|--------|
| Précision Pitch/Roll | 0.0055° (horizontal) |
| Précision Yaw | 0.0055° (horizontal) |