---
title: Caméra USB à autofocus
category: compute-vision
description: Caméra USB à autofocus sans pilote de Juxi Technology — grand angle 86°, 1080P 30 FPS, UVC plug-and-play pour la vision robotique et l'inférence IA, compatible Windows/Linux/macOS/Jetson/Raspberry Pi
keywords: [caméra usb, autofocus, 1080p, uvc, sans pilote, vision robotique, jetson, raspberry pi]
---

# Caméra USB à autofocus

> **[Acheter sur Taobao](https://item.taobao.com/item.htm?id=912105917442)**

## Présentation

La caméra USB à autofocus est un module caméra haute définition plug-and-play, adapté à la vision robotique, à l'inférence IA et aux applications de vision par ordinateur. Elle prend en charge un **champ de vision grand angle de 86°**, l'autofocus et une sortie vidéo **1080P 30 FPS** via le protocole standard UVC, sans installation de pilote.

**Caractéristiques clés** :

- USB sans pilote, protocole standard UVC, plug-and-play
- Compatible Windows / Linux / macOS / Jetson / Raspberry Pi
- Objectif grand angle 86° pour un champ de vision plus large
- Autofocus (AF), aucun réglage manuel nécessaire
- Flux vidéo HD 1080P 30 FPS

---

## Spécifications

| Paramètre | Spécification |
|------|------|
| Résolution | 1920 × 1080 (1080P) |
| Fréquence d'images | 30 FPS |
| Angle de vue | 86° grand angle |
| Mise au point | Autofocus (AF) |
| Interface | USB 2.0 |
| Protocole | UVC (USB Video Class) |
| Systèmes | Windows / Linux / macOS / Jetson / Raspberry Pi |

---

## Démarrage rapide

### 1. Connecter la caméra

Branchez la prise USB de la caméra sur un port USB de l'appareil — aucun pilote supplémentaire n'est nécessaire.

### 2. Vérifier la reconnaissance de la caméra

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

Une caméra USB expose généralement deux périphériques `video` (par exemple les nouveaux `/dev/video2` et `/dev/video3`) ; utilisez celui dont le numéro est le plus petit.

### 3. Lire des images en Python

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## Tutoriels complets

- [Tutoriel de la caméra USB à autofocus — détection de l'appareil, sélection parmi plusieurs caméras et exemples Python](/fr/tutorials/accessories/usb-auto-focus-camera)
- [Utilisation de la caméra autofocus sur Jetson (périphériques video et GUVCView)](/fr/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## Cas d'usage

- Vision robotique et flux vidéo de téléopération
- Inférence IA et projets de vision par ordinateur
- Solutions multicaméras Jetson / Raspberry Pi (avec les caméras CSI)
- Diffusion en direct, enregistrement d'écran et capture vidéo

---

## FAQ

**Q : La caméra n'est pas reconnue ?**
Vérifiez que le câble USB est bien connecté, essayez un autre port USB et exécutez `lsusb` pour afficher la liste des périphériques USB.

**Q : L'image est floue ?**
La caméra dispose de l'autofocus : après la première connexion, attendez 2 à 3 secondes que la mise au point automatique se fasse ; si l'image reste floue, vérifiez que la surface de l'objectif est propre.

**Q : Comment changer la résolution ?**
Utilisez `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` et `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

---

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
