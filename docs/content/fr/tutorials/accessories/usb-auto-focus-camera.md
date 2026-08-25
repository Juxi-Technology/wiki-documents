---
title: Caméra USB à autofocus
description: "Utilisation de la caméra JUXI USB : sans pilote, grand angle 86°, autofocus, 1080P"
---

# Caméra USB à autofocus

## Présentation du produit

La caméra USB à autofocus JUXI est un module caméra haute définition plug-and-play, adapté à la vision robotique, à l'inférence IA et aux applications de vision par ordinateur. Prend en charge un champ de vision de 86°, l'autofocus et une sortie vidéo 1080P à 30 FPS.

**Caractéristiques** :
- USB sans pilote, compatible Windows / Linux / macOS / Jetson / Raspberry Pi
- Objectif grand angle 86° pour un champ de vision plus large
- Autofocus (AF), réglage manuel inutile
- Flux vidéo HD 1080P 30 FPS
- Protocole standard UVC, plug-and-play

## Spécifications du produit

| Paramètre | Spécification |
|------|------|
| Résolution | 1920 × 1080 (1080P) |
| Fréquence d'images | 30 FPS |
| Angle de vue | 86° grand angle |
| Mise au point | Autofocus (AF) |
| Interface | USB 2.0 |
| Protocole | UVC (USB Video Class) |
| Systèmes | Windows / Linux / macOS / Jetson / Raspberry Pi |

## Démarrage rapide

### Connexion de l'appareil

Insérez simplement la prise USB de la caméra dans un port USB de l'appareil. Aucun pilote supplémentaire n'est nécessaire.

### Vérification de la reconnaissance

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# Should see /dev/video0 or /dev/video1

# View detailed information
v4l2-ctl --list-devices
```

### Exemple de code Python

Installer OpenCV :

```bash
pip install opencv-python
```

Capture d'image de base :

```python
import cv2

# Open the camera
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("Failed to open camera")
    exit()

print(f"Resolution: {cap.get(cv2.CAP_PROP_FRAME_WIDTH)}×{cap.get(cv2.CAP_PROP_FRAME_HEIGHT)}")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Sélection de plusieurs caméras :

```python
import cv2

def list_cameras(max_devices=5):
    available = []
    for i in range(max_devices):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            available.append(i)
            cap.release()
    return available

print(f"Available cameras: {list_cameras()}")

# Select a specific camera
camera_index = 1  # second camera
cap = cv2.VideoCapture(camera_index)
```

## Utilisation sur Jetson

```bash
# Check the camera
v4l2-ctl --list-devices

# Use a GStreamer pipeline for better performance
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## Questions fréquentes

**Q : La caméra n'est pas reconnue ?**
Vérifiez que le câble USB est bien connecté. Essayez un autre port USB. Exécutez `lsusb` pour afficher la liste des périphériques USB.

**Q : L'image est floue ?**
La caméra dispose de l'autofocus : après la première connexion, attendez 2 à 3 secondes que la mise au point se fasse automatiquement. Si toujours flou, vérifiez la propreté de l'objectif.

**Q : Comment changer la résolution ?**
Utilisez `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` et `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues : [Signaler un problème](https://github.com/Juxi-Technology/wiki-documents/issues)
