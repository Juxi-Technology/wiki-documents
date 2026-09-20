---
title: "Gimbal 2-DOF"
description: "Gimbal camera Juxi Technology 2-DOF: tracking colore, rilevamento volto, tracking automatico"
---

# Gimbal 2-DOF

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

## Guida rapida

### Collegamento hardware

1. Collegare il servo all'interfaccia del bus seriale
2. Collegare il modulo USB-seriale a computer/Jetson/Raspberry Pi
3. Montare la camera sul supporto del gimbal
4. Collegare la camera USB

### Installare le dipendenze

```bash
pip install -r requirements.txt
# Oppure installazione manuale
pip install opencv-python pyserial numpy
```

### Controllo base

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# Inizializza il controller del servo
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ Connessione seriale riuscita")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # Imposta l'angolo (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # Torna al centro
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### Tracking colore

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# Inizializza la camera e il gimbal
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Converte in HSV per il rilevamento del colore
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Intervallo del colore rosso
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # Trova il contorno più grande
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # Mappa le coordinate dei pixel agli angoli del servo
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

## Funzionalità avanzate

### Rilevamento del volto

Il file `src/detectors/face_detector.py` del repository fornisce un rilevatore di volti basato su OpenCV DNN, utilizzabile per il tracciamento automatico del volto.

### Tracking automatico

L'esempio `examples/auto_tracking_demo.py` del repository implementa un flusso di tracking automatico completo, che include selezione del target, controllo PID e inseguimento fluido.

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
- 💻 Repository open source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)