---
title: Fotocamera CSI IMX219 79°
category: compute-vision
description: "Fotocamera CSI IMX219 79° di Juxi Technology — 8MP, interfaccia CSI nativa, FOV 77°, visione Jetson a bassa latenza"
keywords: [imx219, fotocamera csi, jetson, fotocamera]
---

# Fotocamera CSI IMX219 79°

> **[Acquista nel negozio](https://www.juxitech.com/it/products/79-imx219-csi-camera)**

## Panoramica

La fotocamera CSI IMX219 79° è progettata per la serie NVIDIA Jetson Orin. Via CSI (Camera Serial Interface) offre trasmissione video a bassa latenza e alta banda. 8MP per inferenza visione AI, percezione robotica ed edge computing.

**Caratteristiche principali**:

- Interfaccia CSI-2, collegamento diretto alle schede Jetson Orin
- FOV 77°, 8MP
- Esempi OpenCV + GStreamer pronti all'uso
- Trasmissione video a bassa latenza

## Specifiche

| Categoria | Specifica |
|------|------|
| Sensore | IMX219, 8MP |
| Campo visivo | 77° |
| Interfaccia | CSI-2 (MIPI) |
| Piattaforma | Serie NVIDIA Jetson Orin |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## Avvio rapido

```python
import cv2
# CSI 摄像头 GStreamer 管道
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```
## Tutorial

- [Tutorial fotocamera CSI Jetson](/it/tutorials/accessories/jetson-csi-camera)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
