---
title: Módulo de interacción de voz KWS
description: "Módulo de interacción de voz JUXI KWS – palabras de activación chinas/inglesas, visualización serie/RViz2, compatible con Jetson/Raspberry Pi, firmware de código abierto"
keywords: [KWS, reconocimiento de voz, interacción de voz, palabra de activación]
---

# Módulo de interacción de voz KWS

> **[Comprar en la tienda](https://www.juxitech.com/es/products/ai-voice-recognition-module)**

## Descripción del producto

**Características principales**:

- Firmware chino/inglés (descarga y grabación)
- Comunicación serie (PC/Jetson/Raspberry Pi/Jetson Nano)
- Visualización ROS2 + RViz2
- Repositorio de código abierto, ejemplo serie en Python

## Especificaciones del producto

| Categoría | Especificación |
|------|------|
| Comunicación | Serie (UART) |
| Reconocimiento | Palabras de activación chinas/inglesas |
| Plataforma | Jetson, Nano, Raspberry Pi, PC |
| Visualización | ROS2 RViz2 |
| Firmware | Herramienta de grabación de código abierto |

## Inicio rápido

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Resultado de reconocimiento: {data}")
```

## Tutoriales relacionados

- [Tutoriales de la serie del módulo KWS](/es/tutorials/accessories/KWS-speech-recognition-module/)
- [Grabación de firmware chino/inglés](/es/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [Visualización ROS2 RViz2](/es/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
