---
title: Kit vision bras robotique SO-ARM101
category: robot
description: "Kit vision SO-ARM101 de Juxi Technology — montage poignet/latéral/dessus, caméra 60FPS fixe ou 30FPS autofocus zoom, compatible ACT/Smolvla/Pi0/GR00T"
keywords: [kit vision, support caméra, so-arm101, vision robotique]
---

# Kit vision bras robotique SO-ARM101

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-wrist-camera-mount)**

## Présentation

Le kit vision SO-ARM101 est un accessoire caméra conçu pour les bras robotiques, avec deux options : **60FPS à focale fixe** et **30FPS autofocus zoom**. Compatible SO-ARM101, LeKiwi et XLerobot, ainsi qu'avec les frameworks d'IA incarnée **ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5**.

**Caractéristiques clés** :

- Trois positions de montage : **poignet / latéral / dessus**
- Double caméra : 60FPS fixe (mouvements rapides) / 30FPS autofocus zoom (vision flexible)
- Adapté au SO-ARM101 sans modification
- Patins de serrage antidérapants inclus

## Spécifications

| Catégorie | Spécification |
|------|------|
| Plateformes | SO-ARM101, LeKiwi, XLerobot, compatibles trous M3 |
| Montage | Poignet / latéral / dessus |
| Caméra | 60FPS fixe / 30FPS autofocus zoom |
| Frameworks | ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 |

## Comparaison caméras

| Caméra | Usage |
|------|---------|
| **60FPS fixe** | Haute cadence, image stable, mouvements rapides, distance fixe |
| **30FPS autofocus zoom** | Focalisation flexible, distance variable |

## Démarrage rapide

### 1. Choisir la position

- **Poignet** : perspective de préhension (recommandé)
- **Latéral** : perspective globale
- **Dessus** : perspective bureau (idéale pour la collecte)

### 2. Montage

Fixer le module caméra au support, connecter en USB à l'hôte (Jetson/Raspberry Pi).

### 3. Intégration framework

Exemple de collecte LeRobot :

```bash
# Rechercher les caméras
python -m lerobot.find_cameras

# Collecter des données avec vision
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```
## FAQ

**Q : Quelle caméra choisir ?**
Mouvements rapides (préhension) : 60FPS fixe ; distance variable : 30FPS autofocus zoom.

**Q : Quels frameworks ?**
ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 — tous les frameworks d'IA incarnée majeurs.

**Q : Autres bras robotiques ?**
SO-ARM101, LeKiwi, XLerobot et plateformes compatibles M3.

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
