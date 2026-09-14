---
title: "Kapitel 3: Kamera-Grundlagen"
description: "Kapitel 3 des ESP32-NanoCam-Tutorials: Verständnis der DVP-Kameraschnittstelle, des MJPEG-Streamings und des PSRAM-Framebuffer-Prinzips; Anzeige des Standardbilds und Kennenlernen der in der Firmware integrierten ai_mode-Modi."
---

# Kapitel 3: Kamera-Grundlagen

> **[Im Shop kaufen](https://www.juxitech.com/de/products/esp32-s3-wifi-video-module)**

**Ziel dieses Kapitels**: Die Kamera-Datenkette des NanoCam verstehen und die in der Firmware integrierten KI-Modi kennenlernen.

## Funktionsprinzip

NanoCam verbindet die Kamera über die DVP-Schnittstelle (Digital Video Parallel). Der GC2145-Sensor gibt 8-Bit-Parallelpixeldaten aus; das LCD_CAM-Peripheriemodul des ESP32-S3 speichert sie per DMA direkt im PSRAM, und der HTTP-Server streamt sie im MJPEG-Format zum Browser.

### Schlüsselkonzepte

- **DVP**: 8 parallele Datenleitungen + 3 Synchronisationsleitungen (VSYNC/HREF/PCLK)

- **MJPEG**: Jedes Bild ist ein eigenständiges JPEG; der Browser lädt sie fortlaufend und erzeugt so einen Videoeffekt

- **PSRAM**: 8 MB PSRAM dienen als Framebuffer und fassen 2-4 Frames

## Schritte

### 3.1 Das Standardbild anzeigen

Nach dem Flashen der Firmware befindet sich das Gerät standardmäßig im Streaming-Modus; öffnen Sie `http://<IP>` im Browser, um das Bild zu sehen.

|Befehl|Funktion|
|---|---|
|`ai_mode:0\r`|Videoübertragung|
|`ai_mode:1\r`|Katzengesicht-Erkennung|
|`ai_mode:2\r`|Gesichtsdetektion|
|`ai_mode:3\r`|Farberkennung|
|`ai_mode:4\r`|Gesichtserkennung|
|`ai_mode:5\r`|QR-Code-Scan|

> Alle KI-Modi und seriellen Befehle finden Sie im [Handbuch zum seriellen Protokoll](./ESP32-NanoCam-Serial-Protocol.md).

Nächstes Kapitel: [Kapitel 4: Gesichtsdetektion](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
