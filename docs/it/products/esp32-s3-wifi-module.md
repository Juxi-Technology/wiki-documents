---
title: Modulo video WiFi ESP32-S3
description: Modulo video WiFi ESP32-S3 di Juxi Technology — fotocamera 2MP, trasmissione WiFi in tempo reale, visione AI (colore/viso/QR), doppia modalità AP+STA
keywords: [esp32, wifi, trasmissione video, fotocamera, visione ai]
---

# Modulo video WiFi ESP32-S3

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

## Panoramica

Il modulo video WiFi ESP32 è una soluzione di visione AI compatta ed economica con architettura modulare a doppia scheda (scheda di elaborazione + scheda di espansione comunicazione). La scheda principale monta il processore **ESP32-S3** e una fotocamera 2MP per streaming video WiFi, riconoscimento facciale e dei colori — firmware preinstallato, pronto all'uso.

**Caratteristiche principali**:

- Fotocamera HD 2MP (1600×1200@30FPS)
- **Doppia modalità AP + STA** trasmissione WiFi in tempo reale
- Visione AI: segmentazione a soglia colore + CNN leggera (colore/viso/QR)
- Aggiornamento firmware con un clic via Type-C
- Interfacce I2C / UART standard PH2.0

## Specifiche

| Categoria | Specifica |
|------|------|
| MCU | ESP32-S3 (Espressif, dual-core) |
| Fotocamera | CMOS 2MP (1600×1200@30FPS) |
| Campo visivo | Diagonale 68°, orizzontale 49.5° |
| Wireless | WiFi (BT doppia modalità) AP/STA + antenna ad alto guadagno |
| Interfacce | Type-C / I2C / UART (PH2.0) |
| Tasti | Reset + tasto programmabile |
| Riconoscimento | Colore, viso, codice QR |

## Avvio rapido

### 1. Accensione

Firmware preinstallato — all'accensione il modulo crea il proprio hotspot WiFi:

- Collegare smartphone/PC all'hotspot
- Aprire l'indirizzo indicato nel browser per il video in diretta

### 2. Due modalità operative

| Modalità | Descrizione |
|------|------|
| **Modalità AP** | Il modulo crea il proprio hotspot, il terminale si collega direttamente |
| **Modalità STA** | Il modulo si collega a un router WiFi esistente, trasmissione sulla stessa rete |

### 3. Collegamento all'host

**Comunicazione UART** (Raspberry Pi/Jetson Orin):

```
ESP32 模块 RX → 主控 TX
ESP32 模块 TX → 主控 RX
```

**Comunicazione I2C**: interfaccia I2C standard PH2.0, può emettere i **dati di coordinate** del rilevamento viso/colore.

### 4. Sviluppo personalizzato

Type-C al PC, aggiornamento firmware con un clic; cambiare il bersaglio di riconoscimento (colore/viso/QR) tramite comandi UART/I2C.

---

## Casi d'uso

- Trasmissione video wireless (doppia modalità AP/STA)
- Sviluppo visione AI (colore/viso/QR)
- Progetti IoT/AIoT
- Estensione visione robotica

---

## FAQ

**D: Come vedo il video in tempo reale?**
Il firmware preinstallato crea un hotspot AP. Collega lo smartphone/PC e apri la pagina o l'app indicata.

**D: Quali riconoscimenti supporta?**
Segmentazione a soglia colore + CNN leggera per colore, viso e QR; commutabile via comando.

**D: Può restituire le coordinate di riconoscimento?**
Sì. Le coordinate di rilevamento viso/colore vengono emesse via I2C/UART per lo sviluppo personalizzato.

**D: Come aggiorno il firmware?**
Type-C al PC, aggiornamento con un clic.

---

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)