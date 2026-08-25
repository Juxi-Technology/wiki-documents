---
title: Presentazione del modulo IMU
description: "Sensore di assetto IMU ad alta precisione: processore 72MHz 32 bit, calcolo in tempo reale, fino a 100Hz"
---

# Presentazione del modulo IMU

Sensore di assetto IMU ad alta precisione con **processore 72MHz 32 bit**, calcolo dell'assetto in tempo reale e compensazione dinamica, fino a **100Hz**. Comunicazione doppia IIC e seriale, compatibile con MCU/host Linux e ROS.

## Versioni

| Confronto | 6 assi | 9 assi | 10 assi |
|-----------|--------|--------|---------|
| Processore 32 bit | √ | √ | √ |
| Giroscopio 3 assi | √ | √ | √ |
| Accelerometro 3 assi | √ | √ | √ |
| Magnetometro 3 assi | - | √ | √ |
| Barometro | - | - | √ |
| Fusione AHRS | - | √ | √ |
| Uso | Costo | Stabilità+precisione | Posizione 3D |

## Pin

| Pin | Funzione |
|-----|----------|
| SDA / SCL | Dati/clock I2C |
| GND | Massa |
| 3V3 / 5V | Alimentazione |
| RX / TX | Seriale RX/TX |

## Specifiche

| Parametro | Valore |
|-----------|--------|
| Baudrate | 115200bps |
| Frequenza di uscita | 25Hz di default, 10-100Hz |
| Clock IIC | 100KHz |
| Uscita | 3 assi accel./angul./giro/Eulero/mag/pressione/altitudine/temp/quaternione |
| Temperatura | -40°C a +85°C |
| Dispositivi | PC, RPi, Jetson, RDK, STM32, Arduino |
| Tensione | 5V / 3.3V, 11mA |
| Dimensioni/Peso | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1/ROS2 |

## Prestazioni sensori

| IMU | Accelerometro | Giro | Magnetometro |
|-----|---------------|------|--------------|
| Range | ±16g | ±2000°/s | ±8Gauss |

## Navigazione

| Parametro | Valore |
|-----------|--------|
| Precisione Pitch/Roll | 0.0055° (orizzontale) |
| Precisione Yaw | 0.0055° (orizzontale) |