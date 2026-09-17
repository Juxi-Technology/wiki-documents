---
title: 79° IMX219 CSI-Kamera
category: compute-vision
description: "Juxi Technology 79°-IMX219-CSI-Kamera — 8MP, natives CSI, 77° FOV, NVIDIA-Jetson-Vision mit geringer Latenz"
keywords: [imx219, csi-kamera, jetson, kamera]
---

# 79° IMX219 CSI-Kamera

> **[Im Shop kaufen](https://www.juxitech.com/de/products/79-imx219-csi-camera)**

## Produktübersicht

Die 79°-IMX219-CSI-Kamera ist speziell für die NVIDIA-Jetson-Orin-Serie entwickelt. Über CSI (Camera Serial Interface) liefert sie Videoübertragung mit geringer Latenz und hoher Bandbreite. 8MP für KI-Visionsinferenz, Robotik-Wahrnehmung und Edge Computing.

**Kernfunktionen**:

- CSI-2-Schnittstelle, direkt an Jetson-Orin-Boards
- 77° FOV, 8MP
- OpenCV + GStreamer Beispiele
- Videoübertragung mit geringer Latenz

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Sensor | IMX219, 8MP |
| Sichtfeld | 77° |
| Schnittstelle | CSI-2 (MIPI) |
| Plattform | NVIDIA Jetson Orin Serie |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## Schnellstart

```python
import cv2
# CSI 摄像头 GStreamer 管道
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```
## Verwandte Tutorials

- [Jetson-CSI-Kamera-Tutorial](/de/tutorials/accessories/jetson-csi-camera)

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
