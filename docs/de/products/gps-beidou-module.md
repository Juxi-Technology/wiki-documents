---
title: GPS- & Beidou-GNSS-Positionsmodul
description: "JUXI GPS- & Beidou-GNSS-Modul – ATGM336H-5N-Chip, kombiniertes Positioning mit vier Satellitensystemen, 2,5 m Genauigkeit, ROS-fähig"
keywords: [GPS, Beidou, GNSS, Positionierung, ATGM336H]
---

# GPS- & Beidou-GNSS-Positionsmodul

> **[Im Shop kaufen](https://www.juxitech.com/de/products/gps-beidou-gnss-positioning-module)**

## Produktübersicht

**Hauptmerkmale**:

- Unterstützt **BDS/GPS/QZSS/GLONASS** (einzeln oder beliebig kombiniert)
- **32-Kanal**-Empfänger mit hoher Empfindlichkeit, stabile Positionierung
- Genauigkeit **2,5 m (CEP50)**, Kaltstart 32 s
- Plug-and-Play USB-Serial + TTL-Serial
- Open-Source-Tutorials für Arduino/Jetson/Raspberry Pi/ROS

## Produktspezifikationen

| Kategorie | Spezifikation |
|------|------|
| Chip | ATGM336H-5N |
| Satellitensysteme | BDS / GPS / QZSS / GLONASS |
| Kanäle | 32 Kanäle, gleichzeitiger Mehrsystem-Empfang |
| Genauigkeit | <2,5 m (CEP50) |
| Aktualisierungsrate | Standard 1 Hz, max. 10 Hz |
| Baudrate | 4800–115200 bps (Standard 9600) |
| Empfindlichkeit | Kaltstart −148 dBm, Tracking −162 dBm |
| Leistung | 25 mA @ 3,3 V |
| Betriebstemperatur | −40 °C ~ +85 °C |
| Schnittstellen | USB Type-C / TTL-Serial (PH2.0) |

## Schnellstart

```bash
# USB-Serial prüfen
ls /dev/ttyUSB*
# Daten empfangen (z. B. /dev/ttyUSB0, 9600 bps)
sudo gpsd /dev/ttyUSB0 -n
cgps
```

## Verwandte Tutorials

- [Offizielles Repository](https://github.com/Juxi-Technology)

## Technischer Support

- 📧 E-Mail：support@juxitech.com
- 🌐 Offizielle Website：[www.juxitech.com](https://www.juxitech.com)
