---
title: Modulo di posizionamento GNSS GPS e Beidou
description: "Modulo GNSS GPS e Beidou JUXI – chip ATGM336H-5N, posizionamento combinato di quattro sistemi satellitari, precisione 2,5 m, supporto ROS"
keywords: [GPS, Beidou, GNSS, posizionamento, ATGM336H]
---

# Modulo di posizionamento GNSS GPS e Beidou

> **[Acquista nel negozio](https://www.juxitech.com/it/products/gps-beidou-gnss-positioning-module)**

## Panoramica del prodotto

**Caratteristiche principali**:

- Supporta **BDS/GPS/QZSS/GLONASS** (singolo o combinato)
- Ricevitore **32 canali** ad alta sensibilità, posizionamento stabile
- Precisione **2,5 m (CEP50)**, cold start 32 s
- Seriale USB e TTL plug-and-play
- Tutorial open source per Arduino/Jetson/Raspberry Pi/ROS

## Specifiche del prodotto

| Categoria | Specifica |
|------|------|
| Chip | ATGM336H-5N |
| Sistemi satellitari | BDS / GPS / QZSS / GLONASS |
| Canali | 32 canali, ricezione multi-sistema simultanea |
| Precisione | <2,5 m (CEP50) |
| Frequenza di aggiornamento | 1 Hz predefinito, max 10 Hz |
| Baudrate | 4800–115200 bps (9600 predefinito) |
| Sensibilità | Cold start −148 dBm, tracking −162 dBm |
| Consumo | 25 mA @ 3,3 V |
| Temperatura operativa | −40 °C ~ +85 °C |
| Interfacce | USB Type-C / seriale TTL (PH2.0) |

## Guida rapida

```bash
# Verificare la porta seriale USB
ls /dev/ttyUSB*
# Ricevere i dati (es. /dev/ttyUSB0, 9600 bps)
sudo gpsd /dev/ttyUSB0 -n
cgps
```

## Tutorial correlati

- [Repository ufficiale](https://github.com/Juxi-Technology)

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
