---
title: Guida alla calibrazione IMU
description: Calibrazione del modulo IMU Juxi Technology — completa/magnetometro/temperatura, UART e I2C
keywords: [imu, calibrazione, magnetometro]
---

# Guida alla calibrazione IMU

> Calibrazione consigliata prima del primo utilizzo. Usa `imu_calibration_tool.py` di `IMU_Library`.

## Tipi di calibrazione

| Tipo | Descrizione |
|------|-------------|
| **Completa** (`imu`) | Accelerometro + giroscopio + magnetometro |
| **Magnetometro** (`mag`) | Eliminare interferenze magnetiche |
| **Temperatura** (`temp`) | Compensare la deriva termica |

## Seriale

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

## Consigli

- Magnetometro: ruotare lentamente, coprire tutte le orientazioni
- Calibrazione completa: modulo completamente fermo
- Lontano da motori/magneti

## Collegamenti

- [Modulo IMU](/it/products/imu-module)