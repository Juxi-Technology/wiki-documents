---
title: Pince flexible en TPU SO-ARM101
description: Pince flexible TPU SO-ARM101 de Juxi Technology — saisie sûre des objets irréguliers/fragiles, caméra bras, zoom 30FPS ou fixe 60FPS
keywords: [pince, tpu, flexible, so-arm101, préhension]
---

# Pince flexible en TPU SO-ARM101

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-tpu-flexible-gripper)**

## Présentation

Cette pince flexible TPU SO-ARM101 est conçue pour le bras XLerobot et accepte le support/kit caméra de bras SO-ARM101. Le **TPU souple** saisit les objets irréguliers et fragiles sans les endommager. Avec caméra optionnelle (zoom 30FPS / fixe 60FPS) pour le développement de préhension et la vision guidée.

**Caractéristiques clés** :

- Montage direct sur le bras XLerobot, sans modification
- TPU souple : flexible, résistant à l'abrasion, antidérapant
- Compatible support/kit caméra SO-ARM101 (préhension guidée)
- Fixation par vis, plug-and-play, sans câblage complexe

## Spécifications

| Catégorie | Spécification |
|------|------|
| Bras compatible | SO-ARM101 (série XLerobot) |
| Matériau | TPU souple (flexible, résistant, antidérapant) |
| Actionnement | Servo |
| Caméra optionnelle | Zoom 30FPS / fixe 60FPS |
| Montage | Vis directes, plug-and-play |

## Contenu du kit

| Kit | Contenu |
|------|------|
| **Pince de base** | 1× pince TPU flexible |
| **Kit caméra zoom** | Pince + caméra zoom autofocus 30FPS |
| **Kit caméra fixe** | Pince + caméra fixe 60FPS |

## Démarrage rapide

1. Aligner les trous de vis avec l'effecteur du bras
2. Fixation par vis (aucune modification de câblage)
3. Ajouter le support caméra SO-ARM101 pour la vision guidée

### Préhension guidée par vision

Avec caméra bras et LeRobot :

```bash
# 录制视觉抓取数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```
## FAQ

**Q : Pourquoi saisir aussi les objets irréguliers/fragiles ?**
Le TPU souple épouse la forme de l'objet et répartit la force — aucun endommagement.

**Q : Quelle caméra ?**
Zoom 30FPS : focus flexible ; fixe 60FPS : haute cadence.

**Q : Quelles plateformes ?**
Série SO-ARM101 / XLerobot, compatible ACT, Smolvla, Pi0, etc.

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
