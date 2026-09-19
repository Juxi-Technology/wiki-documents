---
title: IMU Hochpräzisions-Trägheitsnavigationsmodul
category: sensor
description: "Juxi Technology IMU — 100Hz-Attitüdenberechnung, 6/9/10-Achsen-Optionen, IIC+UART, ROS-Integration"
keywords: [imu, trägheitsnavigation, lagesensor, ahrs, ros]
---

# IMU Hochpräzisions-Trägheitsnavigationsmodul

> **[Im Shop kaufen](https://www.juxitech.com/de/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Produktübersicht

Der hochpräzise IMU-Lagesensor nutzt einen 72MHz-32-Bit-Prozessor für Echtzeit-Attitüdenberechnung und dynamische Kompensation, mit bis zu **100Hz** Datenrate. Unterstützt IIC- und serielle Dual-Mode-Kommunikation, kompatibel mit Mikrocontrollern und Linux-Hosts, nahtlose ROS-Integration.

**Versionsauswahl**:

| Version | Gyroskop | Beschleunigung | Magnetometer | Barometer | AHRS |
|------|--------|---------|--------|--------|------|
| 6 Achsen | ✅ | ✅ | - | - | - |
| 9 Achsen | ✅ | ✅ | ✅ | - | ✅ |
| 10 Achsen | ✅ | ✅ | ✅ | ✅ | ✅ |

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Prozessor | 72MHz 32 Bit |
| Datenrate | Standard 25Hz, 10–100Hz einstellbar |
| Schnittstelle | IIC (100KHz) / UART (115200bps) |
| Ausgabe | 3-Achsen-Beschl./Gyro/Euler/Mag/Druck/Temp/Quaternion |
| Stromversorgung | 5V oder 3.3V, 11mA |
| Größe/Gewicht | 27.4×22.6×12mm, 3.8g |
| Betriebstemperatur | -40°C ~ +85°C (Lagerung -40°C ~ +100°C) |
| Stoßfestigkeit | 20kg (nackte Platine) |
| ROS | ROS1 / ROS2 |

## Schnellstart
```bash
# ROS2-Start
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# Kalibrierung (bei Erstverwendung)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```
## Verwandte Tutorials

- [IMU-Modulübersicht](/de/tutorials/sensors/imu/product-info)
- [IMU-Kalibrierungsanleitung](/de/tutorials/sensors/imu/calibration)
- [IMU ROS2](/de/tutorials/sensors/imu/ros-examples/ros2)
- [IMU Multi-Board-Beispiele](/de/tutorials/sensors/imu/multi-board-examples/overview)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
