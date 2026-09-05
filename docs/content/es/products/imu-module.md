---
title: Módulo IMU inercial de alta precisión
category: sensor
description: Módulo IMU de Juxi Technology — actitud 100Hz, opciones 6/9/10 ejes, IIC+UART, integración ROS
keywords: [imu, inercial, sensor de actitud, ahrs, ros]
---

# Módulo IMU inercial de alta precisión

> **[Comprar en la tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Descripción general

El sensor de actitud IMU de alta precisión incorpora un procesador de 32 bits a 72MHz para el cálculo de actitud en tiempo real y la compensación dinámica, hasta **100Hz**. Comunicación dual IIC y serie, compatible con microcontroladores y hosts Linux, integración perfecta con ROS.

**Selección de versión**:

| Versión | Giroscopio | Acelerómetro | Magnetómetro | Barómetro | AHRS |
|------|--------|---------|--------|--------|------|
| 6 ejes | ✅ | ✅ | - | - | - |
| 9 ejes | ✅ | ✅ | ✅ | - | ✅ |
| 10 ejes | ✅ | ✅ | ✅ | ✅ | ✅ |

## Especificaciones

| Categoría | Especificación |
|------|------|
| Procesador | 72MHz 32 bits |
| Frecuencia | 25Hz por defecto, 10–100Hz |
| Interfaz | IIC (100KHz) / UART (115200bps) |
| Salida | 3 ejes acel/giro/euler/mag/presión/temp/cuaternión |
| Alimentación | 5V o 3.3V, 11mA |
| Tamaño/Peso | 27.4×22.6×12mm, 3.8g |
| Temperatura de trabajo | -40°C ~ +85°C (almacenamiento -40°C ~ +100°C) |
| Resistencia a impactos | 20kg (placa desnuda) |
| ROS | ROS1 / ROS2 |

## Inicio rápido
```bash
# ROS2 启动
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# 校准(首次使用)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```
## Tutoriales

- [Presentación del módulo IMU](/es/tutorials/sensors/imu/product-info)
- [Guía de calibración IMU](/es/tutorials/sensors/imu/calibration)
- [IMU ROS2](/es/tutorials/sensors/imu/ros-examples/ros2)
- [Ejemplos multi-placa IMU](/es/tutorials/sensors/imu/multi-board-examples/overview)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
