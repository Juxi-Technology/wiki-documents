---
title: Modulo IMU inerziale di alta precisione
category: sensor
description: "Modulo IMU di Juxi Technology — assetto 100Hz, opzioni 6/9/10 assi, IIC+UART, integrazione ROS"
keywords: [imu, inerziale, sensore di assetto, ahrs, ros]
---

# Modulo IMU inerziale di alta precisione

> **[Acquista nel negozio](https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Panoramica

Il sensore di assetto IMU di alta precisione integra un processore a 32 bit da 72MHz per il calcolo dell'assetto in tempo reale e la compensazione dinamica, fino a **100Hz**. Comunicazione duale IIC e seriale, compatibile con microcontrollori e host Linux, integrazione ROS trasparente.

**Selezione versione**:

| Versione | Giroscopio | Accelerometro | Magnetometro | Barometro | AHRS |
|------|--------|---------|--------|--------|------|
| 6 assi | ✅ | ✅ | - | - | - |
| 9 assi | ✅ | ✅ | ✅ | - | ✅ |
| 10 assi | ✅ | ✅ | ✅ | ✅ | ✅ |

## Specifiche

| Categoria | Specifica |
|------|------|
| Processore | 72MHz 32 bit |
| Frequenza dati | 25Hz predefinito, 10–100Hz |
| Interfaccia | IIC (100KHz) / UART (115200bps) |
| Uscita | 3 assi accel/giro/euler/mag/pressione/temp/quaternione |
| Alimentazione | 5V o 3.3V, 11mA |
| Dimensioni/Peso | 27.4×22.6×12mm, 3.8g |
| Temperatura di lavoro | -40°C ~ +85°C (magazzinaggio -40°C ~ +100°C) |
| Resistenza agli urti | 20kg (scheda nuda) |
| ROS | ROS1 / ROS2 |

## Avvio rapido
```bash
# Avvio ROS2
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# Calibrazione (primo utilizzo)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```
## Tutorial

- [Panoramica modulo IMU](/it/tutorials/sensors/imu/product-info)
- [Guida alla calibrazione IMU](/it/tutorials/sensors/imu/calibration)
- [IMU ROS2](/it/tutorials/sensors/imu/ros-examples/ros2)
- [Esempi multi-scheda IMU](/it/tutorials/sensors/imu/multi-board-examples/overview)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
