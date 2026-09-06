---
title: Caméra à cardan 2-DOF
description: "Cardan caméra Juxi Technology 2-DOF : suivi de couleur, détection visage, suivi automatique"
---

# Caméra à cardan 2-DOF

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
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux : /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)   # yaw
time.sleep(1)
gimbal.set_angle(1, -20)  # pitch
```

### Suivi de couleur

```python
import cv2, sys
sys.path.append('../src')
from sc_servo import SCServo, Gimbal

cap = cv2.VideoCapture(0)
servo = SCServo("COM3"); servo.connect()
gimbal = Gimbal(servo); gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret: break
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (0,100,100), (10,255,255))
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x,y,w,h = cv2.boundingRect(largest)
        cx, cy = x+w//2, y+h//2
        fh, fw = frame.shape[:2]
        yaw = int((cx/fw - 0.5) * 180)
        pitch = int((0.5 - cy/fh) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))
    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
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