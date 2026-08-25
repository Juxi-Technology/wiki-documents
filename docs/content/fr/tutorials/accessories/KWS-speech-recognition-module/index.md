---
title: Module de reconnaissance vocale KWS
description: "Tutoriels de la série module de reconnaissance vocale KWS – communication série, flashage du firmware, visualisation ROS2"
---

# Module de reconnaissance vocale KWS

> **[Acheter en boutique](https://www.juxitech.com/fr/products/ai-voice-recognition-module)**


Bienvenue sur le module de reconnaissance vocale KWS ! Voici le sommaire de tous les tutoriels associés.

## Liste des tutoriels

- [Communication série Jetson Nano](./Jetson-Nano-serial-communication.md)
- [Communication série Jetson](./Jetson-serial-communication.md)
- [Communication série PC](./PC-serial-communication.md)
- [Visualisation ROS2 RViz2](./ROS2-rviz2-visualization.md)
- [Téléchargement et flashage du firmware chinois/anglais](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [Communication série Raspberry Pi](./raspberry-pi-serial-communication.md)


---

## Exemple du dépôt officiel

JUXI fournit un code open source pour le module de reconnaissance vocale KWS : [GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Communication série Python

L'exemple Python du dépôt montre comment communiquer avec le module KWS via la série et obtenir le résultat de reconnaissance du mot de réveil :

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
