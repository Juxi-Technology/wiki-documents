---
title: Cámara con cardán 2-DOF
description: "Cardán de cámara Juxi Technology 2-DOF: seguimiento de color, detección facial, seguimiento automático"
---

# Cámara con cardán 2-DOF

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**


## Presentación

Plataforma de estabilización de cámara open source 2-DOF. Control Python, seguimiento de color, detección facial y seguimiento automático de objetivo.

**Características**
- 2 DOF (Pitch/Yaw) servos
- Seguimiento color, rostro, código QR
- Python puro, fácil de ampliar
- Cámara USB + servos serie
- Open source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## Especificaciones

| Parámetro | Spec |
|-----------|------|
| DOF | 2 (Pitch + Yaw) |
| Servos | Busservos serie (SCS) |
| Interfaz | USB serie |
| Cámara | USB UVC |
| Seguimiento | Color/rostro/QR |
| Lenguaje | Python 3 |

## Control básico

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

## Seguimiento de color

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

**Q: ¿La conexión serie falla?**
Verificar el puerto. Windows `COMx`, Linux `/dev/ttyUSBx`.

**Q: ¿El servo no responde?**
Verificar alimentación (SCS: 6-8.4V externa).

**Q: ¿Seguimiento inestable?**
Ajustar PID, reducir resolución.

## Soporte

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)