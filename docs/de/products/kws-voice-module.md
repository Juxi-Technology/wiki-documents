---
title: KWS-Sprachinteraktionsmodul
description: "JUXI KWS-Spracherkennungsmodul – chinesische/englische Wake-Wörter, serielle/RViz2-Visualisierung, kompatibel mit Jetson/Raspberry Pi, Open-Source-Firmware"
keywords: [KWS, Spracherkennung, Sprachinteraktion, Wake-Wort]
---

# KWS-Sprachinteraktionsmodul

> **[Im Shop kaufen](https://www.juxitech.com/de/products/ai-voice-recognition-module)**

## Produktübersicht

**Hauptmerkmale**:

- Firmware für chinesische/englische Erkennungswörter (Download & Flashen)
- Serielle Kommunikation (PC/Jetson/Raspberry Pi/Jetson Nano)
- ROS2 + RViz2-Visualisierung
- Open-Source-Repository, Python-Serial-Beispiel

## Produktspezifikationen

| Kategorie | Spezifikation |
|------|------|
| Kommunikation | Seriell (UART) |
| Erkennung | Chinesische/englische Wake-Wörter |
| Plattform | Jetson, Nano, Raspberry Pi, PC |
| Visualisierung | ROS2 RViz2 |
| Firmware | Open-Source-Flash-Tool |

## Schnellstart

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Erkennungsergebnis: {data}")
```

## Verwandte Tutorials

- [Tutorials zur KWS-Spracherkennungsmodul-Serie](/de/tutorials/accessories/KWS-speech-recognition-module/)
- [Firmware für Wake-Wörter herunterladen und flashen](/de/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2-Visualisierung](/de/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Technischer Support

- 📧 E-Mail：support@juxitech.com
- 🌐 Offizielle Website：[www.juxitech.com](https://www.juxitech.com)
