---
title: Häufige Fragen (FAQ)
description: Juxi Technology Produkt-FAQ — Roboterarme, Sensoren, Zubehör
keywords: [faq, troubleshooting]
---

# Häufige Fragen (FAQ)

Häufige Fragen nach Produktkategorie.

## Roboterarme · SO-ARM101

**Q: Port wird nicht erkannt?**

Mit `lerobot-find-port` prüfen. USB-Verbindung prüfen; unter Linux `sudo chmod 666 /dev/ttyACM*`.

**Q: Fehler `Could not connect on port "/dev/ttyACM0"`?**

Prüfe, ob `/dev/ttyACM*` existiert und Rechte gesetzt sind.

## Sensoren · IMU

**Q: IMU-Daten driften?**

[Kalibrierung](/de/tutorials/sensors/imu/calibration) ausführen. Befestigung prüfen.

## Zubehör · KWS

**Q: Sprachmodul reagiert nicht?**

Firmware-Flash prüfen. Siehe [Firmware-Download](/de/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

## Allgemein

**Q: Support?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)