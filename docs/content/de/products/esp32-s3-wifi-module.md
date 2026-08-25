---
title: ESP32-S3 WiFi-Videomodul
description: Juxi Technology ESP32-S3 WiFi-Videoübertragungsmodul — 2MP-Kamera, WiFi-Echtzeitübertragung, KI-Vision (Farbe/Gesicht/QR), AP+STA-Dualmodus
keywords: [esp32, wifi, videoübertragung, kamera, ai vision]
---

# ESP32-S3 WiFi-Videomodul

> **[Im Shop kaufen](https://www.juxitech.com/de/products/esp32-s3-wifi-video-module)**

## Produktübersicht

Das ESP32-WiFi-Videoübertragungsmodul ist eine kompakte, kostengünstige KI-Vision-Lösung mit Dual-Board-Modulararchitektur (Kernverarbeitungsboard + Kommunikationsboard). Das Kernboard nutzt den **ESP32-S3** Hochleistungsprozessor mit 2MP-Kamera für WiFi-Videostreaming, Gesichts- und Farberkennung — Firmware vorinstalliert, sofort einsatzbereit.

**Kernfunktionen**:

- 2MP-Kamera (1600×1200@30FPS)
- **AP + STA-Dualmodus** WiFi-Echtzeitübertragung
- KI-Vision: Farbschwellen-Segmentierung + leichtes CNN (Farbe/Gesicht/QR)
- Type-C-Firmware-Update per Knopfdruck
- Standard-PH2.0-I2C/UART-Schnittstelle

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| MCU | ESP32-S3 (Espressif, Dual-Core) |
| Kamera | 2MP CMOS (1600×1200@30FPS) |
| Sichtfeld | Diagonal 68°, horizontal 49.5° |
| Funk | WiFi (BT-Dualmodus) AP/STA + Hochgewinnantenne |
| Schnittstellen | Type-C / I2C / UART (PH2.0) |
| Tasten | Reset + programmierbare Taste |
| Erkennung | Farbe, Gesicht, QR-Code |

## Schnellstart

### 1. Einschalten und verbinden

Vorinstallierte Firmware — nach dem Einschalten erstellt das Modul einen eigenen WiFi-Hotspot:

- Smartphone/PC mit Hotspot verbinden
- Browser öffnet die angegebene Adresse für Live-Video

### 2. Zwei Betriebsmodi

| Modus | Beschreibung |
|------|------|
| **AP-Modus** | Modul erstellt eigenen Hotspot, Endgerät verbindet direkt |
| **STA-Modus** | Modul verbindet mit vorhandenem Router, Übertragung im selben Netz |

### 3. Host-Verbindung

**UART-Kommunikation** (Raspberry Pi/Jetson Orin):

```
ESP32 模块 RX → 主控 TX
ESP32 模块 TX → 主控 RX
```

**I2C-Kommunikation**: Standard-PH2.0-I2C-Schnittstelle, kann **Koordinatendaten** der Gesichts-/Farberkennung ausgeben.

### 4. Eigenentwicklung

Per Type-C am PC, Firmware-Update per Knopfdruck; Erkennungsziel (Farbe/Gesicht/QR) über UART/I2C-Befehle wechseln.

---

## Anwendungsfälle

- Drahtlose Videoübertragung (AP/STA-Dualmodus)
- KI-Vision-Entwicklung (Farbe/Gesicht/QR)
- IoT/AIoT-Projekte
- Robotik-Visionserweiterung

---

## Häufige Fragen

**F: Wie sehe ich das Live-Video?**
Die vorinstallierte Firmware erstellt einen AP-Hotspot. Nach Verbindung per Smartphone/PC über die angegebene Webseite oder App ansehen.

**F: Welche Erkennungen werden unterstützt?**
Farbschwellen-Segmentierung + leichtes CNN für Farbe, Gesicht und QR-Code; per Kommunikationsbefehl umschaltbar.

**F: Können Erkennungskoordinaten zurückgegeben werden?**
Ja. Über die I2C/UART-Schnittstelle werden Koordinatendaten der Gesichts-/Farberkennung für die Eigenentwicklung ausgegeben.

**F: Wie aktualisiere ich die Firmware?**
Type-C am PC, Firmware-Update per Knopfdruck.

---

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)