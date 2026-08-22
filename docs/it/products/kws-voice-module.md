---
title: Modulo di interazione vocale KWS
description: "Modulo di interazione vocale JUXI KWS – parole di attivazione cinesi/inglesi, visualizzazione seriale/RViz2, compatibile con Jetson/Raspberry Pi, firmware open source"
keywords: [KWS, riconoscimento vocale, interazione vocale, parola di attivazione]
---

# Modulo di interazione vocale KWS

> **[Acquista nel negozio](https://www.juxitech.com/it/products/ai-voice-recognition-module)**

## Panoramica del prodotto

**Caratteristiche principali**:

- Firmware cinese/inglese (download e flashing)
- Comunicazione seriale (PC/Jetson/Raspberry Pi/Jetson Nano)
- Visualizzazione ROS2 + RViz2
- Repository open source, esempio seriale Python

## Specifiche del prodotto

| Categoria | Specifica |
|------|------|
| Comunicazione | Seriale (UART) |
| Riconoscimento | Parole di attivazione cinesi/inglesi |
| Piattaforma | Jetson, Nano, Raspberry Pi, PC |
| Visualizzazione | ROS2 RViz2 |
| Firmware | Strumento di flashing open source |

## Guida rapida

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Risultato riconoscimento: {data}")
```

## Tutorial correlati

- [Tutorial della serie modulo KWS](/it/tutorials/accessories/KWS-speech-recognition-module/)
- [Flashing firmware cinese/inglese](/it/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [Visualizzazione ROS2 RViz2](/it/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
