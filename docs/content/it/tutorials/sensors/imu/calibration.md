---
title: "Calibrazione IMU"
description: "Calibrazione del modulo IMU Juxi Technology — completa/magnetometro/temperatura, UART e I2C"
keywords: [imu, calibrazione, magnetometro]
---

# Calibrazione IMU

> **[Acquista nel negozio](https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> Calibrazione consigliata prima del primo utilizzo. Usa `imu_calibration_tool.py` di `IMU_Library`.

## Tipi di calibrazione

| Tipo | Descrizione | Quando |
|------|-------------|--------|
| **Completa** (`imu`) | Accelerometro + giroscopio + magnetometro | Prima installazione, dopo aver cambiato la posizione di montaggio |
| **Magnetometro** (`mag`) | Eliminare interferenze magnetiche | Dopo essersi avvicinati a motori / metallo |
| **Temperatura** (`temp`) | Compensare la deriva termica | Forti variazioni di temperatura |

## Preparazione

1. Clonare il repository ufficiale:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. Verificare il collegamento del modulo IMU all'host (seriale o I2C)

3. **Postura di calibrazione**: posizionare il modulo IMU in piano e fermo, lontano da fonti magnetiche forti (motori, magneti, strutture metalliche)

## Seriale

```bash
cd ~/IMU_Library/IMU_Library

# Eseguire tutte le calibrazioni (completa, magnetometro, temperatura)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Solo calibrazione completa
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Solo magnetometro
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C

```bash
# Eseguire tutte le calibrazioni
python3 imu_calibration_tool.py --mode i2c --port 1

# Solo calibrazione completa
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Solo magnetometro
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port`: numero del bus I2C per la modalità i2c (es. 1 su Raspberry Pi/STM32); percorso del dispositivo per la modalità seriale (es. `/dev/ttyUSB0`, `/dev/imu-serial`).

## Consigli

| Suggerimento | Descrizione |
|-----|-------------|
| **Magnetometro** | Ruotare lentamente il modulo IMU in orizzontale (a forma di 8 o in cerchi), coprendo tutte le orientazioni |
| **Immobile** | Il modulo IMU deve restare completamente fermo durante la calibrazione completa |
| **Niente magneti** | Tenersi lontani da motori, trasformatori e tavoli metallici |
| **Multi-asse** | La calibrazione del magnetometro deve coprire la rotazione su tutti e tre gli assi |

## FAQ

**D: L'assetto continua a derivare dopo la calibrazione?**

**R:** Verificare che sia stata eseguita la calibrazione completa (`imu`); controllare che il modulo IMU sia montato saldamente (le vibrazioni aggiungono rumore); aggiungere la calibrazione della temperatura per grandi variazioni termiche.

**D: La calibrazione del magnetometro fallisce?**

**R:** Forte interferenza magnetica nell'ambiente; verificare il flag `--calibrate mag`; assicurarsi che durante la calibrazione la rotazione copra tutte le orientazioni.

**D: Quale valore per `--port` in modalità I2C?**

**R:** Il numero del bus I2C dell'host. Predefinito 1 su Raspberry Pi; controllare la mappatura I2C hardware dell'STM32; verificare con `i2cdetect -l`.

## Collegamenti

- [Modulo IMU](/it/products/imu-module)
- [Panoramica del modulo IMU (info sul prodotto)](/it/tutorials/sensors/imu/product-info)
- [IMU ROS1](/it/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/it/tutorials/sensors/imu/ros-examples/ros2)
- [Repository ufficiale](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## Supporto

- 📧 Email: support@juxitech.com
- 🌐 Sito web: [www.juxitech.com](https://www.juxitech.com)