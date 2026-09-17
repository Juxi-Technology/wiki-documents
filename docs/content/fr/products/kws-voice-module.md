---
title: Module d'interaction vocale KWS
category: accessory
description: "Module de reconnaissance vocale KWS de Juxi Technology — mots de réveil chinois/anglais, série/RViz2, Jetson/Raspberry Pi, firmware open source"
keywords: [kws, reconnaissance vocale, interaction vocale, mot de réveil, ai voice]
---

# Module d'interaction vocale KWS

> **[Acheter en boutique](https://www.juxitech.com/fr/products/ai-voice-recognition-module)**

## Présentation

Le module KWS (Keyword Spotting) prend en charge le téléchargement et le flashage de mots de reconnaissance chinois/anglais. La puce vocale doit **d'abord être flashée avec le firmware d'usine** après réception. Communication série avec Jetson, Raspberry Pi, etc. ; visualisation ROS2 RViz2.

**Caractéristiques clés** :

- Firmware de mots CN/EN (téléchargement & flashage)
- Communication série (PC/Jetson/Raspberry Pi/Jetson Nano)
- Visualisation ROS2 + RViz2
- Dépôt open source, exemples série Python
- Reconnaissance 100% hors ligne, sans internet (confidentialité + faible latence)
- Précision >95% en environnement normal, réponse <300ms
- Jusqu'à 100 commandes vocales personnalisées, mots de réveil configurables
- Faible consommation : <50mA en moyenne

## Spécifications

| Catégorie | Spécification |
|------|------|
| Communication | Série (UART) |
| Reconnaissance | Mots de réveil CN/EN |
| Plateformes | Jetson, Nano, Raspberry Pi, PC |
| Visualisation | ROS2 RViz2 |
| Firmware | Outil de flashage open source |

## Démarrage rapide

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
## Tutoriels

- [Série du module de reconnaissance vocale KWS](/fr/tutorials/accessories/KWS-speech-recognition-module/)
- [Flashage du firmware chinois/anglais](/fr/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [Visualisation ROS2 RViz2](/fr/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
