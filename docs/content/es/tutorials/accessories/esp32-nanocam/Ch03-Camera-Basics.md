---
title: "Capítulo 3: Fundamentos de la cámara"
description: "ESP32-NanoCam, capítulo 3: fundamentos de la cámara DVP, transmisión MJPEG en tiempo real y búfer de fotogramas en PSRAM para el vídeo del módulo."
---

# Capítulo 3: Fundamentos de la cámara

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**

**Objetivo de este capítulo**: comprender la cadena de datos de la cámara de NanoCam y conocer los distintos modos de IA integrados en el firmware.

## Principio

NanoCam conecta la cámara mediante la interfaz DVP (vídeo digital en paralelo). El sensor GC2145 emite datos de píxel en paralelo de 8 bits; el periférico LCD_CAM del ESP32-S3 los almacena directamente en la PSRAM mediante DMA y, a continuación, el servidor HTTP transmite el flujo al navegador en formato MJPEG.

### Conceptos clave

- **DVP**: datos en paralelo de 8 líneas + señales de sincronización de 3 líneas (VSYNC/HREF/PCLK)
- **MJPEG**: cada fotograma es una imagen JPEG independiente; el navegador los carga de forma continua para lograr el efecto de vídeo
- **PSRAM**: 8 MB de PSRAM usados como búfer de fotogramas; caben 2-4 fotogramas

## Pasos

### 3.1 Ver la imagen predeterminada

Tras grabar el firmware, el modo predeterminado es el de transmisión; abre `http://<IP>` en el navegador para ver la imagen.

|Comando|Función|
|---|---|
|ai_mode:0\r|Transmisión de vídeo|
|ai_mode:1\r|Detección de cara de gato|
|ai_mode:2\r|Detección de rostros|
|ai_mode:3\r|Reconocimiento de colores|
|ai_mode:4\r|Reconocimiento facial|
|ai_mode:5\r|Reconocimiento de códigos QR|
> Consulta el [manual del protocolo de puerto serie](./ESP32-NanoCam-Serial-Protocol.md) para ver todos los modos de IA y comandos de puerto serie.

Capítulo siguiente: [Capítulo 4: Detección de rostros](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
