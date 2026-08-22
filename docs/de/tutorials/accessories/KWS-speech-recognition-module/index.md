---
title: KWS-Spracherkennungsmodul
description: "Tutorials zur KWS-Spracherkennungsmodul-Serie – serielle Kommunikation, Firmware-Flashing, ROS2-Visualisierung"
---

# KWS-Spracherkennungsmodul

Willkommen beim KWS-Spracherkennungsmodul! Hier finden Sie das Verzeichnis aller zugehörigen Tutorials.

## Tutorial-Liste

- [Jetson Nano serielle Kommunikation](./Jetson-Nano-serial-communication.md)
- [Jetson serielle Kommunikation](./Jetson-serial-communication.md)
- [PC serielle Kommunikation](./PC-serial-communication.md)
- [ROS2 RViz2-Visualisierung](./ROS2-rviz2-visualization.md)
- [Firmware für chinesische/englische Wake-Wörter herunterladen und flashen](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [Raspberry Pi serielle Kommunikation](./raspberry-pi-serial-communication.md)


---

## Beispiel aus dem offiziellen Repository

JUXI stellt Open-Source-Code für das KWS-Spracherkennungsmodul bereit: [GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Python serielle Kommunikation

Das Python-Beispiel im Repository zeigt, wie über die serielle Schnittstelle mit dem KWS-Modul kommuniziert und das Wake-Word-Erkennungsergebnis abgerufen wird:

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
