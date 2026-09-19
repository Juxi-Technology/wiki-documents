---
title: Caméra de profondeur 3D RealSense
category: compute-vision
description: "Caméra de profondeur 3D RealSense de Juxi Technology — D435i/D405/D405CB, perception de profondeur haute précision, XLeRobot & SO-ARM101"
keywords: [realsense, caméra de profondeur, vision 3d, vision robotique]
---

# Caméra de profondeur 3D RealSense

> **[Acheter en boutique](https://www.juxitech.com/fr/products/3d-realsense-depth-camera)**

## Présentation

La caméra de profondeur 3D RealSense est un dispositif de vision haute performance en trois modèles : **D435i, D405 et D405CB**. Analyse faciale, réalité augmentée, suivi d'objets et scan 3D, optimisée pour le développement d'IA incarnée.

**Caractéristiques clés** :

- Trois modèles pour toutes les distances et précisions
- Image de profondeur haute précision, RGB et IR (D435i : données IMU supplémentaires)
- Optimisée IA incarnée : navigation autonome, reconnaissance d'objets, interaction
- Compatible **XLeRobot** et **SO-ARM101** (option), plug-and-play

## Comparaison des modèles

| Modèle | Distance | Usage |
|------|---------|---------|
| **D435i** | Moyenne/longue | Navigation robot mobile, reconstruction 3D |
| **D405** | Proche, haute précision | Préhension robotique, reconnaissance proche |
| **D405CB** | Proche (D405 renforcé) | Environnements complexes, faible lumière, précision accrue |

## Spécifications

| Catégorie | Spécification |
|------|------|
| Modèles | D435i / D405 / D405CB |
| Fonctions | Analyse faciale, AR, suivi d'objets, scan 3D, IA incarnée |
| Plateformes | XLeRobot / SO-ARM101 (option) |
| Sortie | Profondeur, RGB, IR, IMU (D435i) |
| Usage | Robotique, recherche IA, reconstruction 3D, industrie, AR/VR |

## Démarrage rapide

### 1. Installer le pilote
```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```
### 2. Vérifier l'appareil
```bash
rs-enumerate-devices
```
La caméra RealSense connectée et son modèle doivent apparaître.

### 3. Exemple de base
```python
import pyrealsense2 as rs
import numpy as np
import cv2

# Créer le pipeline
pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

# Démarrer
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
        cv2.imshow('Depth', depth_image * 80)  # Visualisation de la profondeur
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```
### 4. Intégration LeRobot

Dans les projets SO-ARM101 / XLeRobot :
```bash
# Trouver l'ID de la caméra
python -m lerobot.find_cameras realsense

# Activer RealSense pendant la téléopération
lerobot-teleoperate \
  --robot.cameras='{ front: {type: realsense} }' \
  ...
```
## Cas d'usage

| Scénario | Description |
|------|------|
| **Analyse faciale** | Reconnaissance, expressions, attributs |
| **Réalité augmentée** | Superposition AR, localisation spatiale, enregistrement 3D |
| **Suivi d'objets** | Détection, suivi, comptage |
| **Scan 3D** | Reconstruction 3D, mesure de volume, contrôle dimensionnel |
| **IA incarnée** | Perception, évitement d'obstacles, interaction |

## FAQ

**Q : Quel modèle choisir ?**
Navigation mobile/reconstruction → D435i ; préhension/proche → D405 ; faible lumière → D405CB.

**Q : Support Jetson ?**
Oui. pyrealsense2 s'installe directement, compatible avec le flux LeRobot des tutoriels SO-ARM101.

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
