---
title: "2-DOF-Gimbal"
description: "Juxi Technology 2-DOF Kamera-Gimbal: Farbverfolgung, Gesichtserkennung, Auto-Tracking"
---

# 2-DOF-Gimbal

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**


## Produktübersicht

Open-Source-2-DOF-Kamera-Stabilisierungsplattform. Python-Steuerung, Farbverfolgung, Gesichtserkennung und automatische Zielverfolgung.

**Eigenschaften**
- 2 DOF (Pitch/Yaw) Servosteuerung
- Farbverfolgung, Gesichtserkennung, QR-Code
- Reines Python, leicht erweiterbar
- USB-Kamera + serielle Servos
- Open Source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## Spezifikationen

| Parameter | Spec |
|-----------|------|
| DOF | 2 (Pitch + Yaw) |
| Servos | Serielle Busservos (SCS) |
| Schnittstelle | USB-Seriell |
| Kamera | USB UVC |
| Tracking | Farbe/Gesicht/QR |
| Sprache | Python 3 |

## Schnellstart

### Hardware-Anschluss

1. Servo an die serielle Busschnittstelle anschließen
2. USB-zu-Seriell-Modul mit Computer/Jetson/Raspberry Pi verbinden
3. Kamera an der Gimbal-Halterung montieren
4. USB-Kamera anschließen

### Abhängigkeiten installieren

```bash
pip install -r requirements.txt
# Oder manuell installieren
pip install opencv-python pyserial numpy
```

### Grundsteuerung

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# Servo-Controller initialisieren
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ Seriell verbunden")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # Winkel setzen (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # Zurück in die Mittelstellung
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### Farbverfolgung

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# Kamera und Gimbal initialisieren
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Für die Farberkennung in HSV konvertieren
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Roter Farbbereich
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # Größte Kontur finden
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # Pixelkoordinaten auf Servowinkel abbilden
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

## Erweiterte Funktionen

### Gesichtserkennungs-Tracking

Der Gesichtsdetektor `src/detectors/face_detector.py` im Repository basiert auf OpenCV-DNN und kann für die automatische Gesichtsverfolgung genutzt werden.

### Automatisches Tracking

`examples/auto_tracking_demo.py` im Repository implementiert einen vollständigen Auto-Tracking-Ablauf, inklusive Zielauswahl, PID-Regelung und ruhigem Nachführen.

## FAQ

**Q: Serielle Verbindung schlägt fehl?**

**A:** Port prüfen. Windows `COMx`, Linux `/dev/ttyUSBx`.

**Q: Servo reagiert nicht?**

**A:** Servo-Stromversorgung prüfen (SCS: 6-8.4V extern).

**Q: Tracking instabil?**

**A:** PID anpassen, Auflösung reduzieren.

## Support

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)
