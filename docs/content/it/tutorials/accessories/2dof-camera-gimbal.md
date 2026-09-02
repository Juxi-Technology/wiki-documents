---
title: Camera gimbal 2-DOF
description: "Gimbal camera Juxi Technology 2-DOF: tracking colore, rilevamento volto, tracking automatico"
---

# Camera gimbal 2-DOF

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**


## Presentazione

Piattaforma di stabilizzazione camera open source 2-DOF. Controllo Python, tracking colore, rilevamento volto e tracking automatico del target.

**Caratteristiche**
- 2 DOF (Pitch/Yaw) servo
- Tracking colore, volto, QR code
- Python puro, facile da estendere
- Camera USB + servo seriali
- Open source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## Specifiche

| Parametro | Spec |
|-----------|------|
| DOF | 2 (Pitch + Yaw) |
| Servo | Servo bus seriali (SCS) |
| Interfaccia | USB seriale |
| Camera | USB UVC |
| Tracking | Colore/volto/QR |
| Linguaggio | Python 3 |

## Controllo base

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

## Tracking colore

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

## FAQ

**Q: La connessione seriale fallisce?**

**A:** Verificare la porta. Windows `COMx`, Linux `/dev/ttyUSBx`.

**Q: Il servo non risponde?**

**A:** Verificare l'alimentazione (SCS: 6-8.4V esterna).

**Q: Tracking instabile?**

**A:** Regolare PID, ridurre la risoluzione.

## Supporto

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)