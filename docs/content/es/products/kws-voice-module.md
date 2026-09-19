---
title: Módulo de interacción por voz KWS
category: accessory
description: "Módulo de reconocimiento de voz KWS de Juxi Technology — palabras de activación chino/inglés, serie/RViz2, Jetson/Raspberry Pi, firmware open source"
keywords: [kws, reconocimiento de voz, interacción por voz, palabra de activación, ai voice]
---

# Módulo de interacción por voz KWS

> **[Comprar en la tienda](https://www.juxitech.com/es/products/ai-voice-recognition-module)**

## Descripción general

El módulo KWS (Keyword Spotting) admite la descarga y grabación de palabras de reconocimiento chino/inglés. El chip de voz debe **grabarse primero con el firmware de fábrica** tras su recepción. Comunicación serie con Jetson, Raspberry Pi, etc. ; visualización ROS2 RViz2.

**Características clave**:

- Firmware de palabras CN/EN (descarga y grabación)
- Comunicación serie (PC/Jetson/Raspberry Pi/Jetson Nano)
- Visualización ROS2 + RViz2
- Repositorio open source, ejemplos serie Python
- Reconocimiento 100% sin conexión, sin internet (privacidad + baja latencia)
- Precisión >95% en entornos normales, respuesta <300ms
- Hasta 100 comandos de voz personalizados, palabras de activación configurables
- Bajo consumo: <50mA promedio

## Especificaciones

| Categoría | Especificación |
|------|------|
| Comunicación | Serie (UART) |
| Reconocimiento | Palabras de activación CN/EN |
| Plataformas | Jetson, Nano, Raspberry Pi, PC |
| Visualización | ROS2 RViz2 |
| Firmware | Herramienta de grabación open source |

## Inicio rápido

```bash
# Grabar el firmware (consultar el tutorial)
# Ejemplo de comunicación por puerto serie en Python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"识别结果: {data}")
```
## Tutoriales

- [Serie del módulo de reconocimiento de voz KWS](/es/tutorials/accessories/KWS-speech-recognition-module/)
- [Grabación de firmware chino/inglés](/es/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [Visualización ROS2 RViz2](/es/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
