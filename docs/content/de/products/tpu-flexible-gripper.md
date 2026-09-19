---
title: SO-ARM101 TPU-Flex-Greifer
category: robot
description: "Juxi Technology SO-ARM101 TPU-Flex-Greifer — weiches TPU greift unregelmäßige/zerbrechliche Objekte sicher, Armkamera, 30FPS-Zoom oder 60FPS-Fixfokus"
keywords: [greifer, tpu, flex, so-arm101, greifen]
---

# SO-ARM101 TPU-Flex-Greifer

> **[Im Shop kaufen](https://www.juxitech.com/de/products/so-arm101-tpu-flexible-gripper)**

## Produktübersicht

Dieser SO-ARM101-TPU-Flex-Greifer ist für den XLerobot-Roboterarm konzipiert und unterstützt SO-ARM101-Armkamera-Mounts/Kits. Das weiche **TPU-Material** greift unregelmäßige und zerbrechliche Objekte beschädigungsfrei. Mit optionaler Kamera (Zoom 30FPS / Fixfokus 60FPS) für Greifentwicklung und visuell geführtes Greifen.

**Kernfunktionen**:

- Direkte Montage am XLerobot-Arm, keine Modifikationen
- Weiches TPU: flexibel, abriebfest, rutschfest — sichere Griffe
- Kompatibel mit SO-ARM101-Armkamera (visuell geführtes Greifen)
- Schraubmontage, Plug-and-Play, kein Verkabelungsaufwand

## Spezifikationen

| Kategorie | Spezifikation |
|------|------|
| Roboterarm | SO-ARM101 (XLerobot-Serie) |
| Material | Weiches TPU (flexibel, abriebfest, rutschfest) |
| Antrieb | Servo |
| Optionale Kamera | Zoom 30FPS / Fixfokus 60FPS |
| Montage | Schraubverbindung, Plug-and-Play |

## Kit-Inhalt

| Kit | Inhalt |
|------|------|
| **Basis-Greifer** | 1× TPU-Flex-Greifer |
| **Zoom-Kamera-Kit** | Greifer + 30FPS-Autofokus-Zoom |
| **Fixfokus-Kamera-Kit** | Greifer + 60FPS-Fixfokus |

## Schnellstart

1. Schraublöcher am Arm-Effektor ausrichten
2. Schraubmontage (keine Verkabelungsänderung)
3. Für visuell geführtes Greifen Armkamera-Mount anbringen

### Visuell geführtes Greifen

Mit Armkamera und LeRobot:

```bash
# Visuelle Greifdaten aufzeichnen
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```
## Häufige Fragen

**F: Warum auch unregelmäßige/zerbrechliche Objekte?**
Das weiche TPU passt sich der Objektform an und verteilt die Kraft gleichmäßig — keine Beschädigung.

**F: Welche Kamera?**
Zoom 30FPS: flexibler Fokus; Fixfokus 60FPS: hohe Bildrate.

**F: Welche Plattformen?**
SO-ARM101 / XLerobot-Serie, kompatibel mit ACT, Smolvla, Pi0 usw.

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
