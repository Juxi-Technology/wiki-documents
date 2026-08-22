---
title: Módulo de reconocimiento de voz KWS
description: "Tutoriales de la serie del módulo de reconocimiento de voz KWS – comunicación serie, grabación de firmware, visualización ROS2"
---

# Módulo de reconocimiento de voz KWS

¡Bienvenido al módulo de reconocimiento de voz KWS! Aquí está el índice de todos los tutoriales relacionados.

## Lista de tutoriales

- [Comunicación serie Jetson Nano](./Jetson-Nano-serial-communication.md)
- [Comunicación serie Jetson](./Jetson-serial-communication.md)
- [Comunicación serie PC](./PC-serial-communication.md)
- [Visualización ROS2 RViz2](./ROS2-rviz2-visualization.md)
- [Descarga y grabación de firmware chino/inglés](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [Comunicación serie Raspberry Pi](./raspberry-pi-serial-communication.md)


---

## Ejemplo del repositorio oficial

JUXI proporciona código de código abierto para el módulo de reconocimiento de voz KWS: [GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Comunicación serie en Python

El ejemplo de Python del repositorio muestra cómo comunicarse con el módulo KWS a través del puerto serie y obtener el resultado de reconocimiento de la palabra de activación:

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
