---
title: IMU-Modul Übersicht
description: "Hochpräzises IMU-Attitude-Sensor: 72MHz 32-Bit-Prozessor, Echtzeit-Attitude, bis 100Hz"
---

# IMU-Modul Übersicht

Hochpräzises IMU-Attitude-Sensor mit **72MHz 32-Bit-Prozessor**, Echtzeit-Attitude-Berechnung und dynamischer Kompensation, bis **100Hz** Datenrate. IIC- und serielle Dual-Kommunikation, kompatibel mit MCU/Linux-Hosts und ROS.

## Versionen

| Vergleich | 6-Achsen | 9-Achsen | 10-Achsen |
|-----------|----------|----------|-----------|
| 32-Bit-Prozessor | √ | √ | √ |
| 3-Achsen-Gyro | √ | √ | √ |
| 3-Achsen-Akzelerometer | √ | √ | √ |
| 3-Achsen-Magnetometer | - | √ | √ |
| Barometer | - | - | √ |
| AHRS-Fusion | - | √ | √ |
| Einsatz | Kostenfokus | Stabilität+Genauigkeit | 3D-Position |

## Pinout

| Pin | Funktion |
|-----|----------|
| SDA / SCL | I2C-Daten/-Takt |
| GND | Masse |
| 3V3 / 5V | Stromversorgung |
| RX / TX | Seriell RX/TX |

## Spezifikationen

| Parameter | Wert |
|-----------|------|
| Baudrate | 115200bps |
| Ausgabefrequenz | Standard 25Hz, 10-100Hz |
| IIC-Takt | 100KHz |
| Ausgabe | 3-Achsen Beschl./Winkel/Gyro/Euler/Mag/Druck/Höhe/Temp/Quaternion |
| Betriebstemp | -40°C bis +85°C |
| Geräte | PC, RPi, Jetson, RDK, STM32, Arduino |
| Spannung | 5V / 3.3V, 11mA |
| Größe/Gewicht | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1/ROS2 |

## Sensorleistung

| IMU | Akzelerometer | Gyro | Magnetometer |
|-----|--------------|------|--------------|
| Bereich | ±16g | ±2000°/s | ±8Gauss |

## Navigation

| Parameter | Wert |
|-----------|------|
| Pitch/Roll Genauigkeit | 0.0055° (horizontal) |
| Yaw Genauigkeit | 0.0055° (horizontal) |