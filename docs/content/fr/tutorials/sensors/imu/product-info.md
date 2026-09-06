---
title: Présentation du module IMU
description: "Capteur d'attitude IMU haute précision : processeur 72MHz 32 bits, calcul temps réel, jusqu'à 100Hz"
---

# Présentation du module IMU

> **[Acheter en boutique](https://www.juxitech.com/fr/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


Capteur d'attitude IMU haute précision intégrant un **processeur 32 bits haute performance à 72MHz**, capable de calcul d'attitude en temps réel et de compensation dynamique, avec une fréquence de mise à jour des données pouvant atteindre 100Hz, alliant les avantages d'une réponse rapide et d'une sortie stable. Il prend en charge les deux modes de communication IIC et série, est compatible avec les microcontrôleurs et les contrôleurs hôtes Linux, et peut s'intégrer en toute transparence au système ROS ; il s'applique largement aux scénarios d'application hautes performances tels que le contrôle du mouvement des robots, la stabilisation d'attitude des drones et la navigation et le positionnement intelligents.

# 1. Présentation des versions

| Comparaison des performances |                                                     |                                                              |                                                              |
| ---------------------------- | --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|                              | 6 axes                                              | 9 axes                                                       | 10 axes                                                      |
| Processeur 32 bits haute performance | √                                            | √                                                            | √                                                            |
| Gyroscope 3 axes             | √                                                    | √                                                            | √                                                            |
| Accéléromètre 3 axes         | √                                                    | √                                                            | √                                                            |
| Magnétomètre 3 axes          | -                                                    | √                                                            | √                                                            |
| Baromètre                    | -                                                    | -                                                            | √                                                            |
| Algorithme de fusion de données d'attitude AHRS | -                                | √                                                            | √                                                            |
| Algorithme de filtre de Mahony | √                                                   | √                                                            | √                                                            |
| Interface de communication   | Type-C (carte de base requise) / connecteur de broches IIC |                                                              |                                                              |
| Mode de communication        | IIC / série                                          |                                                              |                                                              |
| Positionnement / Scénarios d'application | Conçu pour les applications sensibles au coût, répondant aux exigences des applications à réponse dynamique élevée | Construit sur l'architecture matérielle 6 axes avec un module magnétomètre 3 axes intégré, réglé grâce à l'algorithme de fusion de données d'attitude AHRS, améliorant considérablement la stabilité et la précision de mesure des données de sortie | Ajoute un baromètre à l'architecture de détection 9 axes, capable de fournir des informations d'altitude précises, adapté aux scénarios d'application exigeant une meilleure perception de l'attitude spatiale 3D et de la position |

## Description des broches

| SDA  | Ligne de données série I2C           |
| ---- | ------------------------------------ |
| SCL  | Ligne d'horloge série I2C            |
| GND  | Masse                                |
| 3V3  | 3V3                                  |
| RX   | Broche de réception de données série |
| TX   | Broche d'émission de données série   |
| GND  | Masse                                |
| 5V   | 5V                                   |

# 2. Paramètres du produit

| Paramètres du produit |                                                              |
| --------------------- | ------------------------------------------------------------ |
|                       | Remarques                                                    |
| Débit en bauds série  | 115200bps                                                    |
| Fréquence de sortie série | 25Hz par défaut, réglable de 10Hz à 100Hz                 |
| Fréquence d'horloge IIC | 100KHz                                                      |
| Données de sortie     | Accélération 3 axes, vitesse angulaire 3 axes, gyroscope 3 axes, angles d'Euler 3 axes, magnétomètre 3 axes, pression barométrique, altitude, température, quaternion (*texte rouge : versions 9 axes/10 axes uniquement ; texte bleu : version 10 axes uniquement) |
| Temps de démarrage    | 5000ms                                                       |
| Température de fonctionnement | -40°C~+85°C                                             |
| Température de stockage | -40°C~+100°C                                               |
| Résistance aux chocs  | 20kg (carte nue)                                             |
| Appareils pris en charge | Hôtes Linux : PC, Raspberry Pi, série Jetson, série RDK ; hôtes MCU : STM32, MSPM0, ESP32, Pico, Arduino |
| Tension de fonctionnement | 5V ou 3.3V                                                 |
| Courant de fonctionnement | 11mA                                                       |
| Dimensions du produit | 27.4mm*22.6mm*12mm                                           |
| Poids du produit      | 3.8g                                                         |
| Support ROS           | ROS1/ROS2                                                    |

# 3. Paramètres de performance des capteurs

Paramètres de performance des données IMU

| IMU                    | Accéléromètre    | Gyroscope         | Magnétomètre    |
| ---------------------- | ---------------- | ----------------- | --------------- |
| Plage                  | ±16g             | ±2000°/s          | ±8Gauss         |
| Résolution             | 0.0005(g/LSB)    | 0.061(°/s)/(LSB)  | 0.244mGauss/LSB |
| Bruit RMS (bande passante 100Hz) | 1.0mg-RMS | 0.07°/S-RMS       | /               |
| Dérive en température | ±0.15mg/C        | 0.015°/s/°C       | /               |
| Bande passante        | 12.5~1600Hz      | 12.5~1600Hz       | /               |

Paramètres de performance des données de navigation

| Paramètre                           | Valeur typique |                 |
| ----------------------------------- | -------------- | --------------- |
| Angle de tangage/roulis (placement horizontal) | Plage | X:±180°, Y:±90° |
| Précision                           | 0.0055°        |                 |
| Angle de cap (placement horizontal) | Plage          | Z:±180°         |
| Précision                           | 0.0055°        |                 |

Paramètres de performance du baromètre

| Paramètre          | Condition     | Valeur typique |
| ------------------ | ------------- | -------------- |
| Plage              |               | 300~2000hPa    |
| Bruit RMS          | Mode standard | 1Pa-RMS        |
| Précision relative |               | ±0.12hPa       |

# 4. Paramètres de dimensions

![Description des broches – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjA3NmQ5NzIzMzdkYWZlMzZkYzcwOGIyOGRmMmYxYWJfNTAxNTBiYzRjZTk4MzJiY2YzMWZhMWY4NDI5ZTFjYTZfSUQ6NzYzODkyMjc2MDI5MDcxNjYwMl8xNzgwMzE3OTcyOjE3ODA0MDQzNzJfVjM)

