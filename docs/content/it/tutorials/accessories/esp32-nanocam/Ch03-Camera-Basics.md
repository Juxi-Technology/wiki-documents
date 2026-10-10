---
title: "Capitolo 3: Nozioni di base sulla fotocamera"
description: "Tutorial ESP32-NanoCam, capitolo 3: interfaccia DVP della fotocamera, streaming MJPEG, frame buffer in PSRAM e modalità di visione artificiale del firmware."
---

# Capitolo 3: Nozioni di base sulla fotocamera

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: comprendere la catena di dati della fotocamera di NanoCam e conoscere le modalità AI integrate nel firmware.

## Funzionamento

NanoCam collega la fotocamera tramite l'interfaccia DVP (video digitale parallelo). Il sensore GC2145 emette dati pixel paralleli a 8 bit; la periferica LCD_CAM dell'ESP32-S3 li memorizza direttamente nella PSRAM tramite DMA, poi il server HTTP invia lo stream in formato MJPEG al browser.

### Concetti chiave

- **DVP**: 8 linee di dati paralleli + 3 linee di segnale di sincronizzazione (VSYNC/HREF/PCLK)
- **MJPEG**: ogni frame è un'immagine JPEG indipendente; il browser le carica in sequenza per ottenere l'effetto video
- **PSRAM**: 8MB di PSRAM usati come frame buffer, in grado di contenere 2-4 frame

## Procedura

### 3.1 Visualizzare l'immagine predefinita

Dopo il flashing del firmware la modalità predefinita è quella di streaming; apri `http://<IP>` nel browser per vedere l'immagine.

|Comando|Funzione|
|---|---|
|ai_mode:0\r|Modulo di trasmissione video|
|ai_mode:1\r|Rilevamento del muso dei gatti|
|ai_mode:2\r|Rilevamento volti|
|ai_mode:3\r|Riconoscimento dei colori|
|ai_mode:4\r|Riconoscimento facciale|
|ai_mode:5\r|Riconoscimento codici QR|
> Per tutte le modalità AI e i comandi seriali vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

Capitolo successivo: [Capitolo 4: Rilevamento volti](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
