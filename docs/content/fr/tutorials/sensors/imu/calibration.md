---
title: "Calibration IMU"
description: "Calibration du module IMU Juxi Technology — complète/compas/température, UART et I2C"
keywords: [imu, calibration, magnétomètre]
---

# Calibration IMU

> **[Acheter en boutique](https://www.juxitech.com/fr/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> Calibration recommandée avant première utilisation. Utilise `imu_calibration_tool.py` de `IMU_Library`.

## Types de calibration

| Type | Description | Quand |
|------|-------------|------|
| **Complète** (`imu`) | Accéléromètre + gyroscope + magnétomètre | Première installation, après changement de position de montage |
| **Magnétomètre** (`mag`) | Éliminer les interférences magnétiques | Après déplacement à proximité de moteurs / métal |
| **Température** (`temp`) | Compenser la dérive thermique | Grandes variations de température |

---

## Préparation

1. Cloner le dépôt officiel :

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. Vérifier la connexion du module IMU à votre hôte (série ou I2C)

3. **Position de calibration** : poser le module IMU à plat et immobile, loin des sources magnétiques fortes (moteurs, aimants, fixations métalliques)

---

## Série

```bash
cd ~/IMU_Library/IMU_Library

# Lancer toutes les calibrations (complète, magnétomètre, température)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Calibration complète uniquement
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Magnétomètre uniquement
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Température uniquement
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C

```bash
# Lancer toutes les calibrations
python3 imu_calibration_tool.py --mode i2c --port 1

# Calibration complète uniquement
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Magnétomètre uniquement
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Température uniquement
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port` : numéro de bus I2C pour le mode I2C (p. ex. 1 sur Raspberry Pi/STM32) ; chemin du périphérique pour le mode série (p. ex. `/dev/ttyUSB0`, `/dev/imu-serial`).

---

## Astuces

| Astuce | Description |
|-----|-------------|
| **Magnétomètre** | Faire tourner lentement le module IMU à l'horizontale (en forme de 8 ou en cercles), en couvrant toutes les orientations |
| **Immobile** | Le module IMU doit rester parfaitement immobile pendant la calibration complète |
| **Sans aimants** | Rester à l'écart des moteurs, des transformateurs et des tables métalliques |
| **Multi-axe** | La calibration du magnétomètre doit couvrir la rotation sur les trois axes |

## FAQ

**Q : L'attitude dérive encore après calibration ?**

**R :** Vérifiez que la calibration complète (`imu`) a bien été exécutée ; vérifiez que le module IMU est solidement fixé (les vibrations ajoutent du bruit) ; ajoutez la calibration de température en cas de grandes variations thermiques.

**Q : La calibration du magnétomètre échoue ?**

**R :** Fortes interférences magnétiques dans l'environnement ; vérifiez l'option `--calibrate mag` ; assurez une rotation complète dans toutes les orientations pendant la calibration.

**Q : Quelle valeur pour `--port` en mode I2C ?**

**R :** Le numéro de bus I2C de votre hôte. Par défaut 1 sur Raspberry Pi ; vérifiez le mapping I2C matériel du STM32 ; contrôlez avec `i2cdetect -l`.

---

## Liens

- [Module IMU](/fr/products/imu-module)
- [Vue d'ensemble du module IMU (infos produit)](/fr/tutorials/sensors/imu/product-info)
- [IMU ROS1](/fr/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/fr/tutorials/sensors/imu/ros-examples/ros2)
- [Dépôt officiel](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## Support

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)