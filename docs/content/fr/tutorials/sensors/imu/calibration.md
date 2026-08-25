---
title: Guide de calibration IMU
description: Calibration du module IMU Juxi Technology — complète/compas/température, UART et I2C
keywords: [imu, calibration, magnétomètre]
---

# Guide de calibration IMU

> Calibration recommandée avant première utilisation. Utilise `imu_calibration_tool.py` de `IMU_Library`.

## Types de calibration

| Type | Description |
|------|-------------|
| **Complète** (`imu`) | Accéléromètre + gyroscope + magnétomètre |
| **Magnétomètre** (`mag`) | Éliminer les interférences magnétiques |
| **Température** (`temp`) | Compenser la dérive thermique |

## Série

```bash
cd ~/IMU_Library/IMU_Library
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C

```bash
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag
```

## Astuces

- Magnétomètre : tourner lentement, couvrir toutes les orientations
- Calibration complète : module totalement immobile
- Éloigner des moteurs/aimants

## Liens

- [Module IMU](/fr/products/imu-module)