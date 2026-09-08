---
title: Câmera CSI IMX219 79°
category: compute-vision
description: Câmera CSI IMX219 79° da Juxi Technology — 8MP nativa CSI-2, FOV 77°, visão de baixa latência para NVIDIA Jetson
keywords: [imx219, câmera csi, jetson]
---

# Câmera CSI IMX219 79°

> **[Comprar na loja](https://www.juxitech.com/products/79-imx219-csi-camera)**

## Visão Geral

A câmera CSI IMX219 79° é projetada para a série NVIDIA Jetson Orin, oferecendo vídeo de baixa latência e alta largura de banda via CSI (Camera Serial Interface). Imagens de 8MP para inferência de visão por IA, percepção robótica e computação de borda.

**Principais recursos**:

- Conexão nativa CSI-2 ao Jetson Orin
- FOV 77°, 8MP
- Exemplos prontos OpenCV + GStreamer
- Vídeo de baixa latência

## Especificações

| Categoria | Especificação |
|----------|------|
| Sensor | IMX219, 8MP |
| FOV | 77° |
| Interface | CSI-2 (MIPI) |
| Plataformas | Série NVIDIA Jetson Orin |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## Início Rápido

```python
import cv2
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```

## Tutoriais

- [Tutorial de Câmera CSI Jetson](/pt-br/tutorials/accessories/jetson-csi-camera)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
