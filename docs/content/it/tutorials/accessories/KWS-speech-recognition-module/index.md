---
title: Modulo di riconoscimento vocale KWS
description: "Tutorial della serie modulo di riconoscimento vocale KWS – comunicazione seriale, flashing firmware, visualizzazione ROS2"
---

# Modulo di riconoscimento vocale KWS

> **[Acquista nel negozio](https://www.juxitech.com/it/products/ai-voice-recognition-module)**


Benvenuto al modulo di riconoscimento vocale KWS! Qui trovi l'indice di tutti i tutorial correlati.

## Elenco tutorial

- [Comunicazione seriale Jetson Nano](./Jetson-Nano-serial-communication.md)
- [Comunicazione seriale Jetson](./Jetson-serial-communication.md)
- [Comunicazione seriale PC](./PC-serial-communication.md)
- [Visualizzazione ROS2 RViz2](./ROS2-rviz2-visualization.md)
- [Download e flashing firmware cinese/inglese](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [Comunicazione seriale Raspberry Pi](./raspberry-pi-serial-communication.md)


---

## Esempio dal repository ufficiale

JUXI fornisce codice open source per il modulo di riconoscimento vocale KWS: [GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Comunicazione seriale Python

L'esempio Python del repository mostra come comunicare con il modulo KWS via seriale e ottenere il risultato di riconoscimento della parola di attivazione:

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
