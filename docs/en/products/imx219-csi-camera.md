---
title: 79° IMX219 CSI Camera
description: Juxi Technology 79° IMX219 CSI camera — 8MP native CSI-2, 77° FOV, NVIDIA Jetson low-latency vision
keywords: [imx219, csi camera, jetson]
---

# 79° IMX219 CSI Camera

> **[Buy in Store](https://www.juxitech.com/products/79-imx219-csi-camera)**

## Overview

The 79° IMX219 CSI camera is designed for NVIDIA Jetson Orin series, providing low-latency, high-bandwidth video via the CSI (Camera Serial Interface). 8MP imaging for AI vision inference, robot perception, and edge computing.

**Key features**:

- CSI-2 native connection to Jetson Orin
- 77° FOV, 8MP
- OpenCV + GStreamer ready examples
- Low-latency video

## Specifications

| Category | Spec |
|----------|------|
| Sensor | IMX219, 8MP |
| FOV | 77° |
| Interface | CSI-2 (MIPI) |
| Platforms | NVIDIA Jetson Orin series |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## Quick Start

```python
import cv2
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```

## Tutorials

- [Jetson CSI Camera Tutorial](/en/tutorials/accessories/jetson-csi-camera)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
