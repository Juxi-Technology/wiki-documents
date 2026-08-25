---
title: Guía de calibración del IMU
description: Calibración del módulo IMU de Juxi Technology — completa/imán/temperatura, UART e I2C
keywords: [imu, calibración, magnetómetro]
---

# Guía de calibración del IMU

> **[Comprar en la tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> Se recomienda calibrar antes del primer uso. Usa `imu_calibration_tool.py` de `IMU_Library`.

## Tipos de calibración

| Tipo | Descripción |
|------|-------------|
| **Completa** (`imu`) | Acelerómetro + giroscopio + magnetómetro |
| **Imán** (`mag`) | Eliminar interferencias magnéticas |
| **Temperatura** (`temp`) | Compensar deriva térmica |

## Serie

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

## Consejos

- Imán: girar lentamente, cubrir todas las orientaciones
- Calibración completa: módulo totalmente inmóvil
- Alejarse de motores/imanes

## Enlaces

- [Módulo IMU](/es/products/imu-module)