---
title: "Cardan 2-DOF"
description: "Cardan caméra Juxi Technology 2-DOF : suivi de couleur, détection visage, suivi automatique"
---

# Cardan 2-DOF

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**


## Présentation

Plateforme de stabilisation de caméra open source 2-DOF. Contrôle Python, suivi de couleur, détection de visage et suivi automatique de cible.

**Caractéristiques**
- 2 DOF (Pitch/Yaw) servos
- Suivi couleur, visage, QR code
- Python pur, facile à étendre
- Caméra USB + servos série
- Open source : [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## Spécifications

| Paramètre | Spec |
|-----------|------|
| DOF | 2 (Pitch + Yaw) |
| Servos | Busservos série (SCS) |
| Interface | USB série |
| Caméra | USB UVC |
| Suivi | Couleur/visage/QR |
| Langage | Python 3 |

## Démarrage rapide

### Connexion matérielle

1. Connecter le servo à l'interface du bus série
2. Connecter le module USB-série à votre PC / Jetson / Raspberry Pi
3. Monter la caméra sur le support du cardan
4. Connecter la caméra USB

### Installation des dépendances

```bash
pip install -r requirements.txt
# Ou installation manuelle
pip install opencv-python pyserial numpy
```

### Contrôle de base

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# Initialiser le contrôleur de servo
servo = SCServo("COM3")  # Linux : "/dev/ttyUSB0"
if servo.connect():
    print("✓ Connexion série réussie")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # Définir l'angle (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw : -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch : -45~45
    time.sleep(1)

    # Retour au centre
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### Suivi de couleur

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# Initialiser la caméra et le cardan
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convertir en HSV pour la détection de couleur
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Plage de couleur rouge
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # Trouver le plus grand contour
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # Convertir les coordonnées pixel en angles de servo
        frame_h, frame_w = frame.shape[:2]
        yaw = int((center_x / frame_w - 0.5) * 180)
        pitch = int((0.5 - center_y / frame_h) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

gimbal.disable_all()
cap.release()
cv2.destroyAllWindows()
```

## Fonctions avancées

### Suivi par détection de visage

Le fichier `src/detectors/face_detector.py` du dépôt fournit un détecteur de visage basé sur OpenCV DNN, utilisable pour le suivi automatique de visage.

### Suivi automatique

Le fichier `examples/auto_tracking_demo.py` du dépôt implémente un flux complet de suivi automatique, incluant la sélection de cible, le contrôle PID et un suivi fluide.

## FAQ

**Q : Connexion série échoue ?**
Vérifier le port. Windows `COMx`, Linux `/dev/ttyUSBx`.

**Q : Servo ne répond pas ?**
Vérifier l'alimentation (SCS : 6-8.4V externe).

**Q : Suivi instable ?**
Ajuster PID, réduire la résolution.

## Support

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)
- 💻 Dépôt open source : [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)