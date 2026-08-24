---
title: KWS-Sprachinteraktionsmodul
description: Juxi Technology KWS-Spracherkennungsmodul — chinesische/englische Wake-Words, seriell/RViz2-Visualisierung, Jetson/Raspberry Pi, Open-Source-Firmware
keywords: [kws, spracherkennung, sprachinteraktion, wake-word, ai voice]
---

# KWS-Sprachinteraktionsmodul

> **[Im Shop kaufen](https://www.juxitech.com/de/products/ai-voice-recognition-module)**

## Produktübersicht

Das KWS-Modul (Keyword Spotting) unterstützt das Herunterladen und Brennen chinesischer/englischer Erkennungswörter. Der Sprachchip muss **nach Erhalt zuerst mit der Werksfirmware gebrannt** werden. Kommunikation per Seriellschnittstelle mit Jetson, Raspberry Pi usw.; ROS2-RViz2-Visualisierung.

**Kernfunktionen**:

- CN/EN-Erkennungswort-Firmware (Download & Brennen)
- Serielle Kommunikation (PC/Jetson/Raspberry Pi/Jetson Nano)
- ROS2 + RViz2-Visualisierung
- Open-Source-Repository, Python-Serial-Beispiele
- 100% Offline-Erkennung, keine Internetverbindung (Datenschutz + geringe Latenz)
- >95% Genauigkeit in normalen Umgebungen, Antwort <300ms
- Bis zu 100 benutzerdefinierte Sprachbefehle, anpassbare Wake-Words
- Niedriger Stromverbrauch: <50mA im Mittel

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Kommunikation | Seriell (UART) |
| Erkennung | CN/EN-Wake-Words |
| Plattformen | Jetson, Nano, Raspberry Pi, PC |
| Visualisierung | ROS2 RViz2 |
| Firmware | Open-Source-Brenntool |

## Schnellstart

```bash
# 烧录固件(参考教程)
# Python 串口通信示例
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"识别结果: {data}")
```
## Verwandte Tutorials

- [KWS-Spracherkennungsmodul-Serie](/de/tutorials/accessories/KWS-speech-recognition-module/)
- [Firmware für Wake-Wörter herunterladen und flashen](/de/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2-Visualisierung](/de/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
