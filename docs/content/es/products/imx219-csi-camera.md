---
title: Cámara CSI IMX219 79°
category: compute-vision
description: Cámara CSI IMX219 79° de Juxi Technology — 8MP, interfaz CSI nativa, FOV 77°, visión Jetson de baja latencia
keywords: [imx219, cámara csi, jetson, cámara]
---

# Cámara CSI IMX219 79°

> **[Comprar en la tienda](https://www.juxitech.com/es/products/79-imx219-csi-camera)**

## Descripción general

La cámara CSI IMX219 79° está diseñada para la serie NVIDIA Jetson Orin. A través de CSI (Camera Serial Interface) ofrece transmisión de video de baja latencia y alto ancho de banda. 8MP para inferencia de visión IA, percepción robótica y computación perimetral.

**Características clave**:

- Interfaz CSI-2, conexión directa a placas Jetson Orin
- FOV 77°, 8MP
- Ejemplos OpenCV + GStreamer listos para usar
- Transmisión de video de baja latencia

## Especificaciones

| Categoría | Especificación |
|------|------|
| Sensor | IMX219, 8MP |
| Campo de visión | 77° |
| Interfaz | CSI-2 (MIPI) |
| Plataforma | Serie NVIDIA Jetson Orin |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## Inicio rápido

```python
import cv2
# CSI 摄像头 GStreamer 管道
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```
## Tutoriales

- [Tutorial de cámara CSI Jetson](/es/tutorials/accessories/jetson-csi-camera)

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
