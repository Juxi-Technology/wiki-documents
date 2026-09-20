---
title: GPS- & Beidou-GNSS-Positionsmodul
category: sensor
description: "Juxi Technology GNSS-Modul — ATGM336H-5N-Chip, Vier-Konstellation-Kombination, 2.5m Genauigkeit, ROS-Unterstützung"
keywords: [gps, beidou, gnss, positionsmodul, ros]
---

# GPS- & Beidou-GNSS-Positionsmodul

> **[Im Shop kaufen](https://www.juxitech.com/de/products/gps-beidou-gnss-positioning-module)**

## Produktübersicht

Das GPS- & BDS-Modul basiert auf dem **ATGM336H-5N**-Chip von Unicore und unterstützt Beidou Gen. 2/3 (alle Satelliten 1-63), GPS, GLONASS und QZSS. Mehrere Systeme gleichzeitig für kombinierte Positionsbestimmung, Navigation und Zeitsynchronisation.

**Kernfunktionen**:

- **BDS/GPS/QZSS/GLONASS** vier Satellitensysteme (einzeln oder kombiniert)
- **32-Kanal**-Hochempfindlichkeitsempfänger, stabile Positionierung
- Genauigkeit **2.5m (CEP50)**, Kaltstart 32 s
- Plug-and-Play USB-Serial + TTL-Serial
- Open-Source-Tutorials für Arduino/Jetson/Raspberry Pi/ROS

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Chip | ATGM336H-5N |
| Satellitensysteme | BDS / GPS / QZSS / GLONASS |
| Kanäle | 32 Kanäle, Mehrsystem-Empfang |
| Genauigkeit | <2.5m (CEP50) |
| Aktualisierungsrate | Standard 1Hz, max. 10Hz |
| Baudrate | 4800–115200bps (Standard 9600) |
| Empfindlichkeit | Kaltstart -148dBm, Tracking -162dBm |
| Leistung | 25mA @ 3.3V |
| Betriebstemperatur | -40℃ ~ +85℃ |
| Schnittstellen | USB Type-C / TTL-Serial (PH2.0) |

## Pinbeschreibung

| Pin | Funktion |
|------|------|
| 5V | Stromversorgung |
| RES | Modul-Reset |
| PPS | Puls pro Sekunde |
| TX | Serielle Datenausgabe |
| RX | Serielle Dateneingabe (optional) |

## Schnellstart

### 1. Antenne anschließen

3-m-Aktiv-GPS-Antenne am Modul anschließen und frei platzieren (draußen oder am Fenster) für schnellen Satellitenempfang.

### 2. USB-Verbindung

Type-C-Datenkabel direkt anschließen, Plug-and-Play (Standard 9600bps).

### 3. Position prüfen

```bash
# pynmea2 installieren, um NMEA-Daten zu parsen
pip install pynmea2

# Beispiel zum Auslesen der Positionsdaten
import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith(('$GPRMC', '$GNRMC')):
        msg = pynmea2.parse(line)
        print(f'纬度: {msg.latitude}, 经度: {msg.longitude}')
```
### 4. ROS-Integration

Unterstützt ROS-Positionsknoten für Fusion mit IMU und Move_Base-Navigation.

## Tools und Ressourcen

- **GnssToolKit3**: Visualisierung — Satellitenstatus, Datenaufzeichnung, KML-Export
- **Koordinatentransformation**: WGS-84 → GCJ-02 → BD-09 Komplettlösung
- **Beispielcode**: Arduino / Python / Jetson-Nano-Tutorials
- [Offizielles Repository](https://github.com/Juxi-Technology)(IMU-/Positionscode)

## Häufige Fragen

**F: Langsame Positionsbestimmung oder kein Signal?**
Antenne frei platzieren (draußen/Fenster); Anschluss prüfen; Kaltstart dauert 32 s — beim ersten Start etwas Geduld.

**F: Welche Satellitensysteme?**
BDS, GPS, QZSS, GLONASS — einzeln oder kombiniert.

**F: An Mikrocontroller anschließbar?**
Ja, TTL-Serial (PH2.0) für MCU-Boards, mit 51/Arduino/STM32-Tutorials.

**F: Ausgabeformat?**
Standard NMEA 0183.

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
