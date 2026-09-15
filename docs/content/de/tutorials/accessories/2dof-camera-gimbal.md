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
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)   # yaw
time.sleep(1)
gimbal.set_angle(1, -20)  # pitch
```

### Farbverfolgung

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
