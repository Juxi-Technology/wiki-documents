---
title: Module inertiel IMU
description: Attitude 100Hz, 6/9/10 axes, IIC+UART, ROS
keywords: [imu-module]
---

# Module inertiel IMU

> **[Acheter en boutique](https://www.juxitech.com/fr/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Aperçu

IMU haute précision avec processeur 72MHz 32 bits. Données d'attitude jusqu'à 100Hz, double communication IIC/ série, intégration ROS.

## Spécifications

| カテゴリ | 仕様 |
|------|------|
| Débit | 25Hz par défaut, 10-100Hz |
| Interface | IIC (100KHz) / UART (115200bps) |
| Tension | 5V ou 3.3V, 11mA |
| Taille | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1 / ROS2 |

## Démarrage rapide

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data
```

---

## Support

- 📧 E-mail: support@juxitech.com
- 🌐 Site web: [www.juxitech.com](https://www.juxitech.com)
