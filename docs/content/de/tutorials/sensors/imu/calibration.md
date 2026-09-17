---
title: "IMU-Kalibrierung"
description: "Juxi Technology IMU-Kalibrierung — Gesamt/Magnetometer/Temperatur, UART & I2C"
keywords: [imu, kalibrierung, magnetometer]
---

# IMU-Kalibrierung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> Kalibrierung vor Erstnutzung empfohlen. Nutzung von `imu_calibration_tool.py` aus `IMU_Library`.

## Kalibrierungstypen

| Typ | Beschreibung | Wann |
|-----|--------------|------|
| **Gesamt** (`imu`) | Beschleunigungsmesser + Gyro + Magnetometer | Erste Installation, nach Änderung der Montageposition |
| **Magnetometer** (`mag`) | Magnetische Störungen entfernen | Nach Aufstellung in der Nähe von Motoren / Metall |
| **Temperatur** (`temp`) | Temperaturdrift kompensieren | Bei großen Temperaturschwankungen |

## Vorbereitung

1. Offizielles Repository klonen:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. IMU-Verbindung zum Host prüfen (seriell oder I2C)

3. **Kalibrierhaltung**: IMU flach und bewegungslos ablegen, fern von starken Magnetquellen (Motoren, Magneten, Metallvorrichtungen)

## Seriell

```bash
cd ~/IMU_Library/IMU_Library

# Alle Kalibrierungen ausführen (Gesamt, Magnetometer, Temperatur)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Nur Gesamtkalibrierung
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Nur Magnetometer
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Nur Temperatur
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C

```bash
# Alle Kalibrierungen ausführen
python3 imu_calibration_tool.py --mode i2c --port 1

# Nur Gesamtkalibrierung
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Nur Magnetometer
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Nur Temperatur
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port`: I2C-Busnummer im I2C-Modus (z. B. 1 auf Raspberry Pi / STM32); Gerätepfad im seriellen Modus (z. B. `/dev/ttyUSB0`, `/dev/imu-serial`).

## Tipps

| Tipp | Beschreibung |
|-----|-------------|
| **Magnetometer** | IMU langsam horizontal drehen (Acht-Form oder Kreise), alle Ausrichtungen abdecken |
| **Bewegungslos** | IMU muss bei der Gesamtkalibrierung völlig stillstehen |
| **Keine Magnete** | Abstand zu Motoren, Transformatoren und Metalltischen halten |
| **Mehrachsig** | Die Magnetometer-Kalibrierung muss Rotationen um alle drei Achsen abdecken |

## FAQ

**F: Die Ausrichtung driftet nach der Kalibrierung weiter?**

**A:** Prüfen, ob die Gesamtkalibrierung (`imu`) ausgeführt wurde; sicherstellen, dass die IMU fest montiert ist (Vibrationen erzeugen Rauschen); bei großen Temperaturänderungen zusätzlich die Temperaturkalibrierung ausführen.

**F: Die Magnetometer-Kalibrierung schlägt fehl?**

**A:** Starke magnetische Störungen in der Umgebung; Flag `--calibrate mag` prüfen; sicherstellen, dass während der Kalibrierung in alle Richtungen rotiert wird.

**F: Welcher Wert für `--port` im I2C-Modus?**

**A:** Die I2C-Busnummer Ihres Hosts. Auf dem Raspberry Pi standardmäßig 1; das I2C-Mapping des STM32 prüfen; mit `i2cdetect -l` verifizieren.

## Verwandte Links

- [IMU-Modul](/de/products/imu-module)
- [IMU-Modul Übersicht (Produktinfo)](/de/tutorials/sensors/imu/product-info)
- [IMU ROS1](/de/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/de/tutorials/sensors/imu/ros-examples/ros2)
- [Offizielles Repository](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
