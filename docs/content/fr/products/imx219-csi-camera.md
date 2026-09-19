---
title: Caméra CSI IMX219 79°
category: compute-vision
description: "Caméra CSI IMX219 79° de Juxi Technology — 8MP, interface CSI native, FOV 77°, vision Jetson à faible latence"
keywords: [imx219, caméra csi, jetson, caméra]
---

# Caméra CSI IMX219 79°

> **[Acheter en boutique](https://www.juxitech.com/fr/products/79-imx219-csi-camera)**

## Présentation

La caméra CSI IMX219 79° est conçue pour la série NVIDIA Jetson Orin. Via CSI (Camera Serial Interface), elle offre une transmission vidéo à faible latence et haute bande passante. 8MP pour l'inférence de vision IA, la perception robotique et l'edge computing.

**Caractéristiques clés** :

- Interface CSI-2, connexion directe aux cartes Jetson Orin
- FOV 77°, 8MP
- Exemples OpenCV + GStreamer prêts à l'emploi
- Transmission vidéo à faible latence

## Spécifications

| Catégorie | Spécification |
|------|------|
| Capteur | IMX219, 8MP |
| Champ de vision | 77° |
| Interface | CSI-2 (MIPI) |
| Plateforme | Série NVIDIA Jetson Orin |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## Démarrage rapide

```python
import cv2
# Pipeline GStreamer de la caméra CSI
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```
## Tutoriels

- [Tutoriel caméra CSI Jetson](/fr/tutorials/accessories/jetson-csi-camera)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
