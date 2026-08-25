---
title: IMU-Kalibrierungsanleitung
description: Juxi Technology IMU-Kalibrierung — Gesamt/Magnetometer/Temperatur, UART & I2C
keywords: [imu, kalibrierung, magnetometer]
---

# IMU-Kalibrierungsanleitung

> Kalibrierung vor Erstnutzung empfohlen. Nutzung von `imu_calibration_tool.py` aus `IMU_Library`.

## Kalibrierungstypen

| Typ | Beschreibung |
|-----|--------------|
| **Gesamt** (`imu`) | Beschleunigungsmesser + Gyro + Magnetometer |
| **Magnetometer** (`mag`) | Magnetische Störungen entfernen |
| **Temperatur** (`temp`) | Temperaturdrift kompensieren |

## Seriell

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

## Tipps

- Magnetometer: langsam horizontal drehen, alle Richtungen
- Gesamtkalibrierung: Modul komplett still halten
- Abstand zu Motoren/Magneten

## Verwandt

- [IMU-Modul]( /de/products/imu-module)