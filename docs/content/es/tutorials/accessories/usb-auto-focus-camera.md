---
title: Cámara USB con enfoque automático
description: "Uso de la cámara JUXI USB: sin controlador, gran angular 86°, enfoque automático, 1080P"
---

# Cámara USB con enfoque automático

## Descripción del producto

La cámara USB con enfoque automático de JUXI es un módulo de cámara HD plug-and-play, adecuado para visión robótica, inferencia de IA y aplicaciones de visión por computadora. Admite campo de visión de 86°, enfoque automático y salida de video 1080P a 30 FPS.

**Características**:
- USB sin controlador, compatible con Windows / Linux / macOS / Jetson / Raspberry Pi
- Lente gran angular de 86° para un campo de visión más amplio
- Enfoque automático (AF), sin ajuste manual
- Flujo de video HD 1080P 30 FPS
- Protocolo estándar UVC, plug-and-play

## Especificaciones del producto

| Parámetro | Especificación |
|------|------|
| Resolución | 1920 × 1080 (1080P) |
| Frecuencia de cuadros | 30 FPS |
| Ángulo de visión | 86° gran angular |
| Enfoque | Automático (AF) |
| Interfaz | USB 2.0 |
| Protocolo | UVC (USB Video Class) |
| Sistemas | Windows / Linux / macOS / Jetson / Raspberry Pi |

## Inicio rápido

### Conexión del dispositivo

Simplemente inserte el conector USB de la cámara en un puerto USB del dispositivo. No se necesitan controladores adicionales.

### Verificar reconocimiento del dispositivo

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# Should see /dev/video0 or /dev/video1

# View detailed information
v4l2-ctl --list-devices
```

### Ejemplo de código Python

Instalar OpenCV:

```bash
pip install opencv-python
```

Captura de imagen básica:

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

Selección de múltiples cámaras:

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

## Uso en Jetson

```bash
# Check the camera
v4l2-ctl --list-devices

# Use a GStreamer pipeline for better performance
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## Preguntas frecuentes

**Q: ¿La cámara no se reconoce?**
Compruebe que el cable USB esté bien conectado. Pruebe con otro puerto USB. Ejecute `lsusb` para ver la lista de dispositivos USB.

**Q: ¿La imagen está borrosa?**
La cámara tiene enfoque automático: tras la primera conexión, espere 2-3 segundos a que se ajuste automáticamente. Si sigue borrosa, compruebe que la lente esté limpia.

**Q: ¿Cómo cambio la resolución?**
Use `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` y `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Reportar problema](https://github.com/Juxi-Technology/wiki-documents/issues)
