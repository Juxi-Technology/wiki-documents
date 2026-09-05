---
title: Modulo di interazione vocale KWS
category: accessory
description: Modulo di riconoscimento vocale KWS di Juxi Technology — parole di attivazione cinese/inglese, seriale/RViz2, Jetson/Raspberry Pi, firmware open source
keywords: [kws, riconoscimento vocale, interazione vocale, parola di attivazione, ai voice]
---

# Modulo di interazione vocale KWS

> **[Acquista nel negozio](https://www.juxitech.com/it/products/ai-voice-recognition-module)**

## Panoramica

Il modulo KWS (Keyword Spotting) supporta il download e il flashing di parole di riconoscimento cinese/inglese. Il chip vocale deve essere **prima flashato con il firmware di fabbrica** dopo la ricezione. Comunicazione seriale con Jetson, Raspberry Pi, ecc. ; visualizzazione ROS2 RViz2.

**Caratteristiche principali**:

- Firmware parole CN/EN (download e flashing)
- Comunicazione seriale (PC/Jetson/Raspberry Pi/Jetson Nano)
- Visualizzazione ROS2 + RViz2
- Repository open source, esempi seriale Python
- Riconoscimento 100% offline, senza internet (privacy + bassa latenza)
- Precisione >95% in ambienti normali, risposta <300ms
- Fino a 100 comandi vocali personalizzati, parole di attivazione configurabili
- Basso consumo: <50mA medi

## Specifiche

| Categoria | Specifica |
|------|------|
| Comunicazione | Seriale (UART) |
| Riconoscimento | Parole di attivazione CN/EN |
| Piattaforme | Jetson, Nano, Raspberry Pi, PC |
| Visualizzazione | ROS2 RViz2 |
| Firmware | Strumento di flashing open source |

## Avvio rapido

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
## Tutorial

- [Serie del modulo di riconoscimento vocale KWS](/it/tutorials/accessories/KWS-speech-recognition-module/)
- [Flashing firmware cinese/inglese](/it/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [Visualizzazione ROS2 RViz2](/it/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
