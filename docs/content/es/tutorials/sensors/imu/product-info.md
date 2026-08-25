---
title: Presentación del módulo IMU
description: "Sensor de actitud IMU de alta precisión: procesador 72MHz 32 bits, cálculo en tiempo real, hasta 100Hz"
---

# Presentación del módulo IMU

> **[Comprar en la tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


Sensor de actitud IMU de alta precisión con **procesador 72MHz 32 bits**, cálculo de actitud en tiempo real y compensación dinámica, hasta **100Hz**. Comunicación dual IIC y serie, compatible con MCU/hosts Linux y ROS.

## Versiones

| Comparación | 6 ejes | 9 ejes | 10 ejes |
|-------------|--------|--------|---------|
| Procesador 32 bits | √ | √ | √ |
| Giroscopio 3 ejes | √ | √ | √ |
| Acelerómetro 3 ejes | √ | √ | √ |
| Magnetómetro 3 ejes | - | √ | √ |
| Barómetro | - | - | √ |
| Fusión AHRS | - | √ | √ |
| Uso | Coste | Estabilidad+precisión | Posición 3D |

## Pines

| Pin | Función |
|-----|---------|
| SDA / SCL | Datos/reloj I2C |
| GND | Masa |
| 3V3 / 5V | Alimentación |
| RX / TX | Serie RX/TX |

## Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Baudrate | 115200bps |
| Frecuencia de salida | 25Hz por defecto, 10-100Hz |
| Reloj IIC | 100KHz |
| Salida | 3 ejes acel./angul./giro/Euler/mag/presión/altitud/temp/cuaternión |
| Temperatura | -40°C a +85°C |
| Dispositivos | PC, RPi, Jetson, RDK, STM32, Arduino |
| Tensión | 5V / 3.3V, 11mA |
| Tamaño/Peso | 27.4×22.6×12mm, 3.8g |
| ROS | ROS1/ROS2 |

## Rendimiento de sensores

| IMU | Acelerómetro | Giro | Magnetómetro |
|-----|--------------|------|--------------|
| Rango | ±16g | ±2000°/s | ±8Gauss |

## Navegación

| Parámetro | Valor |
|-----------|-------|
| Precisión Pitch/Roll | 0.0055° (horizontal) |
| Precisión Yaw | 0.0055° (horizontal) |