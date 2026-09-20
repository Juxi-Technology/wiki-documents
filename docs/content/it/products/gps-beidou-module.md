---
title: Modulo di posizionamento GNSS GPS e Beidou
category: sensor
description: "Modulo GNSS di Juxi Technology — chip ATGM336H-5N, combinazione di quattro costellazioni, precisione 2.5m, supporto ROS"
keywords: [gps, beidou, gnss, modulo di posizionamento, ros]
---

# Modulo di posizionamento GNSS GPS e Beidou

> **[Acquista nel negozio](https://www.juxitech.com/it/products/gps-beidou-gnss-positioning-module)**

## Panoramica

Il modulo GPS e BDS si basa sul chip **ATGM336H-5N** di Unicore e supporta Beidou Gen. 2/3 (tutti i satelliti 1-63), GPS, GLONASS e QZSS, con ricezione simultanea multi-sistema per posizionamento, navigazione e sincronizzazione temporale.

**Caratteristiche principali**:

- Quattro sistemi **BDS/GPS/QZSS/GLONASS** (singoli o combinati)
- Ricevitore **32 canali** ad alta sensibilità, posizionamento stabile
- Precisione **2.5m (CEP50)**, avvio a freddo 32 s
- USB seriale + TTL seriale plug-and-play
- Tutorial open source Arduino/Jetson/Raspberry Pi/ROS

## Specifiche

| Categoria | Specifica |
|------|------|
| Chip | ATGM336H-5N |
| Sistemi satellitari | BDS / GPS / QZSS / GLONASS |
| Canali | 32 canali, multi-sistema simultaneo |
| Precisione | <2.5m (CEP50) |
| Frequenza di aggiornamento | 1Hz predefinito, max. 10Hz |
| Baud rate | 4800–115200bps (9600 predefinito) |
| Sensibilità | Avvio a freddo -148dBm, tracking -162dBm |
| Consumo | 25mA @ 3.3V |
| Temperatura di lavoro | -40℃ ~ +85℃ |
| Interfacce | USB Type-C / TTL seriale (PH2.0) |

## Descrizione dei pin

| Pin | Funzione |
|------|------|
| 5V | Alimentazione |
| RES | Reset del modulo |
| PPS | Impulso al secondo |
| TX | Uscita seriale |
| RX | Ingresso seriale (opzionale) |

## Avvio rapido

### 1. Collegare antenna e modulo

Antenna GPS attiva da 3 m collegata al modulo, posizionata in area aperta (esterno o finestra) per una rapida acquisizione.

### 2. Collegamento USB

Cavo Type-C diretto, plug-and-play (9600bps predefinito).

### 3. Verifica del posizionamento

```bash
# Installa pynmea2 per analizzare i dati NMEA
pip install pynmea2

# Esempio di lettura dei dati di posizionamento
import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith(('$GPRMC', '$GNRMC')):
        msg = pynmea2.parse(line)
        print(f'纬度: {msg.latitude}, 经度: {msg.longitude}')
```
### 4. Integrazione ROS

Nodo di posizionamento ROS compatibile, fusione IMU e navigazione Move_Base.

## Strumenti e risorse

- **GnssToolKit3** : visualizzazione, stato satelliti, registrazione, export KML
- **Conversione coordinate** : WGS-84 → GCJ-02 → BD-09
- **Codice di esempio** : tutorial Arduino / Python / Jetson Nano
- [Repository ufficiale](https://github.com/Juxi-Technology)(codice IMU/posizionamento)

## FAQ

**D: Posizionamento lento o nessun segnale?**
Posizionare l'antenna in area aperta (esterno/finestra); verificare il collegamento; l'avvio a freddo richiede 32 s.

**D: Quali sistemi satellitari?**
BDS, GPS, QZSS, GLONASS — singoli o combinati.

**D: Collegabile a microcontrollori?**
Sì, TTL seriale (PH2.0) per schede MCU, tutorial 51/Arduino/STM32 inclusi.

**D: Formato di uscita?**
Protocollo standard NMEA 0183.

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
