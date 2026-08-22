---
title: Module d'interaction vocale KWS
description: "Module d'interaction vocale JUXI KWS – mots de réveil chinois/anglais, visualisation série/RViz2, compatible Jetson/Raspberry Pi, firmware open source"
keywords: [KWS, reconnaissance vocale, interaction vocale, mot de réveil]
---

# Module d'interaction vocale KWS

> **[Acheter en boutique](https://www.juxitech.com/fr/products/ai-voice-recognition-module)**

## Présentation du produit

**Caractéristiques principales** :

- Firmware chinois/anglais (téléchargement et flashage)
- Communication série (PC/Jetson/Raspberry Pi/Jetson Nano)
- Visualisation ROS2 + RViz2
- Dépôt open source, exemple série Python

## Spécifications du produit

| Catégorie | Spécification |
|------|------|
| Communication | Série (UART) |
| Reconnaissance | Mots de réveil chinois/anglais |
| Plateforme | Jetson, Nano, Raspberry Pi, PC |
| Visualisation | ROS2 RViz2 |
| Firmware | Outil de flashage open source |

## Démarrage rapide

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Résultat de reconnaissance : {data}")
```

## Tutoriels associés

- [Tutoriels de la série module KWS](/fr/tutorials/accessories/KWS-speech-recognition-module/)
- [Flashage du firmware chinois/anglais](/fr/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [Visualisation ROS2 RViz2](/fr/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
