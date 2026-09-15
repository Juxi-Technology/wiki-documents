---
title: "Calibración IMU"
description: Calibración del módulo IMU de Juxi Technology — completa/imán/temperatura, UART e I2C
keywords: [imu, calibración, magnetómetro]
---

# Calibración IMU

> **[Comprar en la tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> Calibra tu módulo IMU antes del primer uso para obtener la mejor precisión de actitud. Basado en el `imu_calibration_tool.py` oficial de `IMU_Library`.

## Tipos de calibración

| Tipo | Descripción | Cuándo |
|------|-------------|------|
| **Completa** (`imu`) | Acelerómetro + giroscopio + magnetómetro | Primera instalación, tras cambiar la posición de montaje |
| **Magnetómetro** (`mag`) | Eliminar interferencias magnéticas ambientales | Tras mover cerca de motores / metal |
| **Temperatura** (`temp`) | Compensar la deriva térmica | Grandes variaciones de temperatura |

---

## Preparación

1. Clona el repositorio oficial:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. Verifica la conexión del IMU a tu host (serie o I2C)

3. **Pose de calibración**: coloca el IMU plano y estacionario, lejos de fuentes magnéticas fuertes (motores, imanes, fijaciones metálicas)

---

## Serie

```bash
cd ~/IMU_Library/IMU_Library

# Ejecutar todas las calibraciones (completa, magnetómetro, temperatura)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Solo calibración completa
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Solo magnetómetro
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C

```bash
# Ejecutar todas las calibraciones
python3 imu_calibration_tool.py --mode i2c --port 1

# Solo calibración completa
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Solo magnetómetro
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port`: número de bus I2C para el modo I2C (p. ej., 1 en Raspberry Pi/STM32); ruta del dispositivo para el modo serie (p. ej., `/dev/ttyUSB0`, `/dev/imu-serial`).

---

## Consejos de calibración

| Consejo | Descripción |
|-----|-------------|
| **Magnetómetro** | Gira el IMU lentamente en horizontal (ocho o círculos), cubriendo todas las orientaciones |
| **Estacionario** | El IMU debe permanecer completamente inmóvil durante la calibración completa |
| **Sin imanes** | Mantente alejado de motores, transformadores y mesas metálicas |
| **Multieje** | La calibración del magnetómetro debe cubrir la rotación en los tres ejes |

---

## FAQ

**Q: ¿La actitud sigue derivando después de la calibración?**

**A:** Verifica que se ejecutó la calibración completa (`imu`); comprueba que el IMU esté firmemente montado (la vibración añade ruido); añade la calibración de temperatura para cambios térmicos grandes.

**Q: ¿La calibración del magnetómetro falla?**

**A:** Fuerte interferencia magnética en el entorno; verifica la bandera `--calibrate mag`; asegúrate de rotar en todas las orientaciones durante la calibración.

**Q: ¿Qué valor debo usar para `--port` en modo I2C?**

**A:** El número de bus I2C de tu host. Por defecto 1 en Raspberry Pi; consulta el mapeo de I2C por hardware del STM32; verifica con `i2cdetect -l`.

---

## Enlaces relacionados

- [Módulo IMU](/es/products/imu-module)
- [Información del producto (visión general del IMU)](/es/tutorials/sensors/imu/product-info)
- [IMU ROS1](/es/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/es/tutorials/sensors/imu/ros-examples/ros2)
- [Repositorio oficial](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## Soporte

- 📧 Correo electrónico: support@juxitech.com
- 🌐 Sitio web: [www.juxitech.com](https://www.juxitech.com)
