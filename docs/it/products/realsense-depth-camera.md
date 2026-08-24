---
title: Fotocamera di profondità 3D RealSense
description: Fotocamera di profondità 3D RealSense di Juxi Technology — D435i/D405/D405CB, percezione di profondità ad alta precisione, XLeRobot e SO-ARM101
keywords: [realsense, fotocamera di profondità, visione 3d, visione robotica]
---

# Fotocamera di profondità 3D RealSense

> **[Acquista nel negozio](https://www.juxitech.com/it/products/3d-realsense-depth-camera)**

## Panoramica

La fotocamera di profondità 3D RealSense è un dispositivo di visione ad alte prestazioni in tre modelli: **D435i, D405 e D405CB**. Analisi facciale, realtà aumentata, tracciamento oggetti e scansione 3D, ottimizzata per lo sviluppo di IA incarnata.

**Caratteristiche principali**:

- Tre modelli per distanze e precisioni diverse
- Immagine di profondità ad alta precisione, RGB e IR (D435i con IMU)
- Ottimizzata per IA incarnata: navigazione autonoma, riconoscimento oggetti, interazione
- Compatibile **XLeRobot** e **SO-ARM101** (opzionale), plug-and-play

## Confronto modelli

| Modello | Distanza | Uso |
|------|---------|---------|
| **D435i** | Media/lunga | Navigazione robot mobile, ricostruzione 3D |
| **D405** | Vicino, alta precisione | Presa robotica, riconoscimento ravvicinato |
| **D405CB** | Vicino (D405 potenziato) | Ambienti complessi, poca luce, maggiore precisione |

## Specifiche

| Categoria | Specifica |
|------|------|
| Modelli | D435i / D405 / D405CB |
| Funzioni | Analisi facciale, AR, tracciamento oggetti, scansione 3D, IA incarnata |
| Piattaforme | XLeRobot / SO-ARM101 (opzionale) |
| Uscita | Profondità, RGB, IR, IMU (D435i) |
| Uso | Robotica, ricerca IA, ricostruzione 3D, industria, AR/VR |

## Avvio rapido

### 1. Installare il driver
```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```
### 2. Verificare il dispositivo
```bash
rs-enumerate-devices
```
Dovrebbe apparire la fotocamera RealSense collegata e il suo modello.

### 3. Esempio di base
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
### 4. Integrazione LeRobot

Nei progetti SO-ARM101 / XLeRobot:
```bash
# 查找相机 ID
python -m lerobot.find_cameras realsense

# 遥操作时启用 RealSense
lerobot-teleoperate \
  --robot.cameras='{ front: {type: realsense} }' \
  ...
```
## Casi d'uso

| Scenario | Descrizione |
|------|------|
| **Analisi facciale** | Riconoscimento, espressioni, attributi |
| **Realtà aumentata** | Overlay AR, localizzazione spaziale, registrazione 3D |
| **Tracciamento oggetti** | Rilevamento, tracciamento, conteggio |
| **Scansione 3D** | Ricostruzione 3D, misurazione volume, controllo dimensionale |
| **IA incarnata** | Percezione, evitamento ostacoli, interazione |

## FAQ

**D: Quale modello scegliere?**
Navigazione mobile/ricostruzione → D435i; presa/vicino → D405; poca luce → D405CB.

**D: Supporto Jetson?**
Sì. pyrealsense2 si installa direttamente, compatibile con il flusso LeRobot dei tutorial SO-ARM101.

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
