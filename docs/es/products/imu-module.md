---
title: Módulo inercial IMU
description: Actitud 100Hz, 6/9/10 ejes, IIC+UART, ROS
keywords: [imu-module]
---

# Módulo inercial IMU

> **[Comprar en tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Resumen

IMU de alta precisión con procesador de 72MHz 32 bits. Datos de actitud hasta 100Hz, doble comunicación IIC/serie, integración ROS.

## Especificaciones

| カテゴリ | 仕様 |
|------|------|
| Velocidad | 25Hz por defecto, 10-100Hz |
| Interfaz | IIC (100KHz) / UART (115200bps) |
| Voltaje | 5V o 3.3V, 11mA |
| Tamaño | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1 / ROS2 |

## Inicio rápido

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data
```

---

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio web: [www.juxitech.com](https://www.juxitech.com)
