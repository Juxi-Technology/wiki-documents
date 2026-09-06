---
title: Cámara con cardán 2-DOF
description: "Cardán de cámara Juxi Technology 2-DOF: seguimiento de color, detección facial, seguimiento automático"
---

# Cámara con cardán 2-DOF

> **[Comprar en la tienda](https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit)**


## Presentación

El cardán de cámara 2-DOF de Juxi Technology es una plataforma open source de estabilización de cámara con dos grados de libertad que admite control basado en Python, seguimiento de color, detección facial y seguimiento automático de objetivo. Es adecuado para aplicaciones de visión robótica, vigilancia y automatización.

**Características**
- Control de servos de 2 DOF (Pitch/Yaw)
- Seguimiento de color, detección facial, detección de código QR
- Implementación en Python puro, fácil de personalizar
- Admite cámara USB y servos de bus serie
- Código open source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## Especificaciones

| Parámetro | Especificación |
|-----------|------|
| Grados de libertad | 2 ejes (Pitch + Yaw) |
| Tipo de servo | Servo de bus serie (protocolo SCS) |
| Interfaz de control | USB serie |
| Soporte de cámara | Cámara USB UVC |
| Algoritmos de seguimiento | Seguimiento de color / detección facial / detección de código QR |
| Lenguaje de programación | Python 3 |

## Inicio rápido

### Conexión del hardware

1. Conecta el servo a la interfaz de bus serie
2. Conecta el módulo USB-a-serie a tu ordenador/Jetson/Raspberry Pi
3. Monta la cámara en el soporte del cardán
4. Conecta la cámara USB

### Instalar dependencias

```bash
pip install -r requirements.txt
# O instalar manualmente
pip install opencv-python pyserial numpy
```

### Código de control básico

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# Inicializar el controlador del servo
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ Serie conectada")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # Ajustar ángulo (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # Volver al centro
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### Ejemplo de seguimiento de color

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# Inicializar cámara y cardán
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convertir a HSV para la detección de color
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Rango del color rojo
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # Buscar el contorno más grande
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # Mapear las coordenadas de píxel a ángulos del servo
        frame_h, frame_w = frame.shape[:2]
        yaw = int((center_x / frame_w - 0.5) * 180)
        pitch = int((0.5 - center_y / frame_h) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow('Seguimiento de color', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

gimbal.disable_all()
cap.release()
cv2.destroyAllWindows()
```

## Funciones avanzadas

### Seguimiento con detección facial

El archivo `src/detectors/face_detector.py` del repositorio proporciona un detector facial basado en OpenCV DNN que puede utilizarse para el seguimiento facial automático.

### Seguimiento automático

El archivo `examples/auto_tracking_demo.py` del repositorio implementa un flujo completo de seguimiento automático, que incluye selección de objetivo, control PID y seguimiento suave.

## FAQ

**Q: ¿La conexión serie falla?**

**A:** Verifica el nombre correcto del puerto. Windows usa `COMx`, Linux `/dev/ttyUSBx`. Ejecuta `python examples/list_ports.py` para listar los puertos disponibles.

**Q: ¿El servo no responde?**

**A:** Comprueba que la alimentación del servo sea suficiente. Los servos SCS requieren alimentación externa (6-8,4 V).

**Q: ¿El seguimiento es inestable?**

**A:** Ajusta los parámetros PID y la frecuencia de seguimiento. Reducir la resolución del fotograma puede mejorar el rendimiento en tiempo real.

## Soporte

- 📧 Correo electrónico: support@juxitech.com
- 🌐 Sitio web: [www.juxitech.com](https://www.juxitech.com)
- 💻 Repositorio open source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)
