---
title: "Capitolo 3: Fondamenti della fotocamera"
description: "Tutorial ESP32-NanoCam, capitolo 3: interfaccia DVP della fotocamera, streaming MJPEG, frame buffer in PSRAM e modalità di visione artificiale del firmware."
---

# Capitolo 3: Fondamenti della fotocamera

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: comprendere la catena di dati della fotocamera di NanoCam e conoscere le modalità AI integrate nel firmware.

## Come funziona

NanoCam collega la fotocamera tramite l'interfaccia DVP (Digital Video Port, video digitale parallelo). Il sensore GC2145 emette dati pixel paralleli a 8 bit; la periferica LCD_CAM dell'ESP32-S3 li salva direttamente nella PSRAM via DMA, poi il server HTTP li trasmette in streaming al browser in formato MJPEG.

### Concetti chiave

- **DVP**: dati paralleli a 8 linee + segnali di sincronizzazione a 3 linee (VSYNC/HREF/PCLK)

- **MJPEG**: ogni fotogramma è un'immagine JPEG indipendente; il browser li carica in sequenza ottenendo l'effetto video

- **PSRAM**: 8 MB di PSRAM usati come frame buffer, possono contenere 2-4 fotogrammi

## Passaggi

### 3.1 Visualizzare l'immagine predefinita

Dopo il flashing del firmware la modalità predefinita è lo streaming: aprire `http://<IP>` nel browser per vedere l'immagine.

|Comando|Funzione|
|---|---|
|`ai_mode:0\r`|Trasmissione video|
|`ai_mode:1\r`|Rilevamento del muso del gatto|
|`ai_mode:2\r`|Rilevamento del volto|
|`ai_mode:3\r`|Riconoscimento dei colori|
|`ai_mode:4\r`|Riconoscimento facciale|
|`ai_mode:5\r`|Riconoscimento codici QR|

> Per tutte le modalità AI e i comandi seriali vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

Capitolo successivo: [Capitolo 4: Rilevamento del volto](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
