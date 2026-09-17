---
title: 3D-RealSense-Tiefenkamera
category: compute-vision
description: "Juxi Technology 3D-RealSense-Tiefenkamera — D435i/D405/D405CB, hochpräzise Tiefenwahrnehmung, XLeRobot & SO-ARM101"
keywords: [realsense, tiefenkamera, 3d vision, roboter-vision]
---

# 3D-RealSense-Tiefenkamera

> **[Im Shop kaufen](https://www.juxitech.com/de/products/3d-realsense-depth-camera)**

## Produktübersicht

Die 3D-RealSense-Tiefenkamera ist ein Hochleistungs-Visionsgerät mit drei Modellen: **D435i, D405 und D405CB**. Unterstützt Gesichtsanalyse, Augmented Reality, Objektverfolgung und 3D-Scanning, optimiert für Embodied-AI-Entwicklung.

**Kernfunktionen**:

- Drei Modelle — für unterschiedliche Distanz- und Genauigkeitsanforderungen
- Hochpräzises Tiefenbild, RGB- und IR-Bilder (D435i zusätzlich IMU)
- Für Embodied AI optimiert: autonome Navigation, Objekterkennung, Interaktion
- Optional **XLeRobot** und **SO-ARM101** kompatibel, Plug-and-Play

## Modellvergleich

| Modell | Distanz | Einsatz |
|------|---------|---------|
| **D435i** | Mittel bis fern | Mobile Roboternavigation, 3D-Rekonstruktion |
| **D405** | Nah, hohe Präzision | Roboterarm-Greifen, Nahbereichserkennung |
| **D405CB** | Nah (D405 verstärkt) | Komplexe Umgebungen, Schwachlicht, höhere Präzision |

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Modelle | D435i / D405 / D405CB |
| Kernfunktionen | Gesichtsanalyse, AR, Objektverfolgung, 3D-Scan, Embodied AI |
| Plattformen | XLeRobot / SO-ARM101 (optional) |
| Ausgabe | Tiefenbild, RGB, IR, IMU (D435i) |
| Einsatz | Robotik, KI-Forschung, 3D-Rekonstruktion, Industrie, AR/VR |

## Schnellstart

### 1. Treiber installieren
```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```
### 2. Gerät prüfen
```bash
rs-enumerate-devices
```
Die angeschlossene RealSense-Kamera samt Modell sollte erscheinen.

### 3. Basissbeispiel
```python
import pyrealsense2 as rs
import numpy as np
import cv2

# 创建管道
pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

# 开始
pipeline.start(config)

try:
    while True:
        frames = pipeline.wait_for_frames()
        depth = frames.get_depth_frame()
        color = frames.get_color_frame()
        if not depth or not color:
            continue
        depth_image = np.asanyarray(depth.get_data())
        color_image = np.asanyarray(color.get_data())
        cv2.imshow('Color', color_image)
        cv2.imshow('Depth', depth_image * 80)  # 深度可视化
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```
### 4. LeRobot-Integration

Einsatz in SO-ARM101 / XLeRobot-Projekten:
```bash
# 查找相机 ID
python -m lerobot.find_cameras realsense

# 遥操作时启用 RealSense
lerobot-teleoperate \
  --robot.cameras='{ front: {type: realsense} }' \
  ...
```
## Anwendungen

| Szenario | Beschreibung |
|------|------|
| **Gesichtsanalyse** | Gesichts-/Emotionserkennung, Attributanalyse |
| **Augmented Reality** | AR-Overlay, Raumpositionierung, 3D-Registrierung |
| **Objektverfolgung** | Erkennung, Verfolgung, Zählung |
| **3D-Scan** | 3D-Rekonstruktion, Volumenmessung, Größenprüfung |
| **Embodied AI** | Umgebungswahrnehmung, Hindernisvermeidung, Interaktion |

## Häufige Fragen

**F: Welches Modell?**
Mobile Navigation/3D-Rekonstruktion → D435i; Greifen/Nahbereich → D405; Schwachlicht → D405CB.

**F: Jetson-Unterstützung?**
Ja. pyrealsense2 direkt installierbar, kompatibel mit dem LeRobot-Flow der SO-ARM101-Tutorials.

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
