---
title: Presentación del módulo IMU
description: "Sensor de actitud IMU de alta precisión: procesador 72MHz 32 bits, cálculo en tiempo real, hasta 100Hz"
---

# Presentación del módulo IMU

> **[Comprar en la tienda](https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


El sensor de actitud IMU de alta precisión integra un **procesador 32 bits de alto rendimiento a 72MHz**, capaz de realizar el cálculo de actitud en tiempo real y la compensación dinámica, con una frecuencia de actualización de datos de hasta 100Hz, combinando las ventajas de respuesta rápida y salida estable. Admite los modos de comunicación IIC y serie, es compatible con microcontroladores y hosts Linux, y puede integrarse sin problemas con el sistema ROS, siendo ampliamente aplicable a escenarios de alto rendimiento como el control de movimiento de robots, la estabilización de actitud de drones y la navegación y el posicionamiento inteligentes.

# 1. Descripción general de versiones

| Comparación de rendimiento |                                                     |                                                              |                                                              |
| -------------------------- | --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|                            | 6 ejes                                              | 9 ejes                                                       | 10 ejes                                                      |
| Procesador 32 bits de alto rendimiento | √                                            | √                                                            | √                                                            |
| Giroscopio 3 ejes          | √                                                    | √                                                            | √                                                            |
| Acelerómetro 3 ejes        | √                                                    | √                                                            | √                                                            |
| Magnetómetro 3 ejes        | -                                                    | √                                                            | √                                                            |
| Barómetro                  | -                                                    | -                                                            | √                                                            |
| Algoritmo de fusión de datos de actitud AHRS | -                                        | √                                                            | √                                                            |
| Algoritmo de filtro Mahony | √                                                   | √                                                            | √                                                            |
| Interfaz de comunicación   | Type-C (requiere placa base) / conector de pines IIC |                                                              |                                                              |
| Método de comunicación     | IIC / serie                                         |                                                              |                                                              |
| Posicionamiento / Escenarios de aplicación | Diseñado para aplicaciones sensibles al coste, cumple el estándar para aplicaciones de alta respuesta dinámica | Construido sobre la arquitectura de hardware de 6 ejes con un módulo magnetómetro de 3 ejes integrado, ajustado con el algoritmo de fusión de datos de actitud AHRS, lo que mejora enormemente la estabilidad y la precisión de medición de la salida de datos | Añade un barómetro sobre la arquitectura de sensores de 9 ejes, capaz de emitir información precisa de altitud, adecuado para escenarios de aplicación con mayores requisitos de percepción de actitud y posición espacial en 3D |

## Descripción de funciones de pines

| SDA  | Línea de datos serie I2C        |
| ---- | ------------------------------- |
| SCL  | Línea de reloj serie I2C        |
| GND  | Masa                            |
| 3V3  | 3V3                             |
| RX   | Pin de recepción de datos serie |
| TX   | Pin de transmisión de datos serie |
| GND  | Masa                            |
| 5V   | 5V                              |

# 2. Parámetros del producto

| Parámetros del producto    |                                                              |
| -------------------------- | ------------------------------------------------------------ |
|                            | Notas                                                        |
| Velocidad de baudios serie | 115200bps                                                    |
| Frecuencia de salida serie | 25Hz por defecto, ajustable de 10Hz a 100Hz                  |
| Frecuencia de reloj IIC    | 100KHz                                                       |
| Datos de salida            | Aceleración 3 ejes, velocidad angular 3 ejes, giroscopio 3 ejes, ángulos de Euler 3 ejes, magnetómetro 3 ejes, presión barométrica, altitud, temperatura, cuaternión (*texto rojo: solo versiones de 9/10 ejes; texto azul: solo versión de 10 ejes) |
| Tiempo de arranque         | 5000ms                                                       |
| Temperatura de funcionamiento | -40°C~+85°C                                               |
| Temperatura de almacenamiento | -40°C~+100°C                                             |
| Resistencia a golpes       | 20kg (placa desnuda)                                         |
| Dispositivos compatibles   | Hosts Linux: PC, Raspberry Pi, serie Jetson, serie RDK; hosts MCU: STM32, MSPM0, ESP32, Pico, Arduino |
| Tensión de funcionamiento  | 5V o 3.3V                                                    |
| Corriente de funcionamiento | 11mA                                                        |
| Dimensiones del producto   | 27.4mm*22.6mm*12mm                                           |
| Peso del producto          | 3.8g                                                         |
| Soporte ROS                | ROS1/ROS2                                                    |

# 3. Parámetros de rendimiento del sensor

Parámetros de rendimiento de datos IMU

| IMU                  | Acelerómetro     | Giroscopio       | Magnetómetro     |
| -------------------- | ---------------- | ---------------- | ---------------- |
| Rango                | ±16g             | ±2000°/s         | ±8Gauss          |
| Resolución           | 0.0005(g/LSB)    | 0.061(°/s)/(LSB) | 0.244mGauss/LSB  |
| Ruido RMS (ancho de banda de 100Hz) | 1.0mg-RMS | 0.07°/S-RMS      | /                |
| Deriva de temperatura | ±0.15mg/C       | 0.015°/s/°C      | /                |
| Ancho de banda       | 12.5~1600Hz      | 12.5~1600Hz      | /                |

Parámetros de rendimiento de datos de navegación

| Parámetro                          | Valor típico |                 |
| ---------------------------------- | ------------ | --------------- |
| Ángulo de cabeceo/alabeo (colocación horizontal) | Rango | X:±180°, Y:±90° |
| Precisión                          | 0.0055°      |                 |
| Ángulo de rumbo (colocación horizontal) | Rango      | Z:±180°         |
| Precisión                          | 0.0055°      |                 |

Parámetros de rendimiento del barómetro

| Parámetro          | Condición     | Valor típico |
| ------------------ | ------------- | ------------ |
| Rango              |               | 300~2000hPa  |
| Ruido RMS          | Modo estándar | 1Pa-RMS      |
| Precisión relativa |               | ±0.12hPa     |

# 4. Parámetros de dimensiones

![Descripción de funciones de pines – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjA3NmQ5NzIzMzdkYWZlMzZkYzcwOGIyOGRmMmYxYWJfNTAxNTBiYzRjZTk4MzJiY2YzMWZhMWY4NDI5ZTFjYTZfSUQ6NzYzODkyMjc2MDI5MDcxNjYwMl8xNzgwMzE3OTcyOjE3ODA0MDQzNzJfVjM)
