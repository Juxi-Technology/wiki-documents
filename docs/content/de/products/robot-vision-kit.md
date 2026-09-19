---
title: SO-ARM101 Robotik-Visions-Kit
category: robot
description: "Juxi Technology SO-ARM101 Vision-Kit — Handgelenk/Seitlich/Draufsicht, 60FPS-Fixfokus oder 30FPS-Autofokus-Zoom, ACT/Smolvla/Pi0/GR00T kompatibel"
keywords: [visions-kit, kamerahalterung, so-arm101, robotik-vision]
---

# SO-ARM101 Robotik-Visions-Kit

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-wrist-camera-mount)**

## Produktübersicht

Das SO-ARM101 Robotik-Visions-Kit ist ein speziell für Roboterarme entwickeltes Kamera-Zubehör mit zwei Kamera-Optionen: **60FPS-Fixfokus** und **30FPS-Autofokus-Zoom**. Kompatibel mit SO-ARM101, LeKiwi und XLerobot sowie den wichtigsten Embodied-AI-Trainingsframeworks **ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5**.

**Kernfunktionen**:

- Drei Montagepositionen: **Handgelenk / seitlich / Draufsicht**
- Doppel-Kamera-Option: 60FPS-Fixfokus (schnelle Bewegung) / 30FPS-Autofokus-Zoom (flexible Vision)
- Perfekte SO-ARM101-Passform, keine Modifikationen nötig
- Rutschfeste Klemmauflagen inklusive

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Plattformen | SO-ARM101, LeKiwi, XLerobot, M3-Loch-kompatible |
| Montage | Handgelenk / seitlich / Draufsicht |
| Kamera | 60FPS-Fixfokus / 30FPS-Autofokus-Zoom |
| Frameworks | ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 |

## Kameravergleich

| Kamera | Einsatz |
|------|---------|
| **60FPS-Fixfokus** | Hohe Bildrate, stabiles Bild, schnelle Bewegung, feste Distanz |
| **30FPS-Autofokus-Zoom** | Flexibler Fokus, variable Distanz |

## Schnellstart

### 1. Montageposition wählen

- **Handgelenk**: Greifperspektive (empfohlen für Greifaufgaben)
- **Seitlich**: globale Umgebungsperspektive
- **Draufsicht**: Desktop-Arbeitsperspektive (für Datenerfassung)

### 2. Montage

Kamera am entsprechenden Träger befestigen, per USB mit Host (Jetson/Raspberry Pi) verbinden.

### 3. Framework-Integration

LeRobot-Datenerfassung als Beispiel:

```bash
# Kamera suchen
python -m lerobot.find_cameras

# Datenerfassung mit Kameradaten
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```
## Häufige Fragen

**F: Welche Kamera wählen?**
Schnelle Bewegung (z. B. Greifen): 60FPS-Fixfokus; variable Distanz: 30FPS-Autofokus-Zoom.

**F: Welche Frameworks werden unterstützt?**
ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 — alle wichtigen Embodied-AI-Frameworks.

**F: Andere Roboterarme?**
SO-ARM101, LeKiwi, XLerobot und M3-kompatible Plattformen.

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
