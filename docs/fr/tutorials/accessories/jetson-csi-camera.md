---
title: Caméra CSI Jetson
description: "Utilisation du module caméra CSI NVIDIA Jetson Orin"
---

# Caméra CSI Jetson

## Présentation du produit

Le module caméra CSI JUXI est conçu pour le kit développeur NVIDIA Jetson Orin et offre une transmission vidéo à faible latence et haut débit via CSI (Camera Serial Interface). Adapté à l'inférence vision IA, à la perception robotique et à l'informatique de périphérie.

**Caractéristiques** :
- Interface CSI-2, connexion directe à la carte Jetson Orin
- Exemples prêts à l'emploi basés sur OpenCV et GStreamer
- Transmission vidéo à faible latence
- Compatible protocole UVC

## Spécifications du produit

| Paramètre | Spécification |
|------|------|
| Interface | CSI-2 (MIPI) |
| Plateformes | Série NVIDIA Jetson Orin |
| Format vidéo | RAW / YUV |
| Support SDK | JetPack 5.0+ |
| Framework logiciel | GStreamer / OpenCV |

## Démarrage rapide

### Connexion matérielle

1. Couper l'alimentation du Jetson Orin
2. Brancher une extrémité du câble plat CSI sur le module caméra
3. Insérer l'autre extrémité dans le connecteur CSI de la carte Jetson Orin
4. Vérifier le sens du câble (contacts métalliques vers la carte)

> ⚠️ **Attention** : branchez impérativement le câble plat CSI hors tension, sinon le matériel risque d'être endommagé.

### Vérification de la reconnaissance

```bash
# Check CSI camera devices
ls /dev/video*

# View detailed info with v4l2
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Exemple de code Python

Installer les dépendances :

```bash
sudo apt install -y python3-opencv
```

Capturer la caméra CSI avec GStreamer + OpenCV :

```python
import cv2

# GStreamer pipeline for the CSI camera
def gstreamer_pipeline(
    sensor_id=0,
    capture_width=1920,
    capture_height=1080,
    display_width=960,
    display_height=540,
    framerate=30,
    flip_method=0,
):
    return (
        "nvarguscamerasrc sensor-id=%d ! "
        "video/x-raw(memory:NVMM), "
        "width=(int)%d, height=(int)%d, "
        "format=(string)NV12, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            sensor_id,
            capture_width,
            capture_height,
            framerate,
            flip_method,
            display_width,
            display_height,
        )
    )

cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)

if not cap.isOpened():
    print("Failed to open CSI camera")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('CSI Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Capture basique (si la caméra fonctionne en mode UVC) :

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## Questions fréquentes

**Q : La caméra n'est pas reconnue ?**
Vérifiez d'abord le branchement et le sens du câble plat. Exécutez `ls /dev/video*` pour vérifier le nœud de périphérique. Si toujours non reconnue, réinstallez JetPack.

**Q : Erreur de pipeline GStreamer ?**
Vérifiez que JetPack ≥ 5.0. Exécutez `apt list --installed | grep nvarguscamerasrc` pour confirmer que les plugins GStreamer sont installés.

**Q : Comment changer de caméra ?**
Modifiez le paramètre `sensor-id` : `sensor_id=0` pour la première caméra, `sensor_id=1` pour la deuxième.

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues : [Signaler un problème](https://github.com/Juxi-Technology/wiki-documents/issues)
