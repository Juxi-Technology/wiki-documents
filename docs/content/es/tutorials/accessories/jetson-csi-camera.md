---
title: Cámara CSI Jetson
description: "Uso del módulo de cámara CSI NVIDIA Jetson Orin"
---

# Cámara CSI Jetson

## Descripción del producto

El módulo de cámara CSI de JUXI está diseñado para el kit de desarrollador NVIDIA Jetson Orin y ofrece transmisión de video de baja latencia y alto ancho de banda a través de CSI (Camera Serial Interface). Adecuado para inferencia de visión IA, percepción robótica y computación en el borde.

**Características**:
- Interfaz CSI-2, conexión directa a la placa Jetson Orin
- Ejemplos listos para usar basados en OpenCV y GStreamer
- Transmisión de video de baja latencia
- Compatible con protocolo UVC

## Especificaciones del producto

| Parámetro | Especificación |
|------|------|
| Interfaz | CSI-2 (MIPI) |
| Plataformas | Serie NVIDIA Jetson Orin |
| Formato de video | RAW / YUV |
| Soporte SDK | JetPack 5.0+ |
| Framework de software | GStreamer / OpenCV |

## Inicio rápido

### Conexión de hardware

1. Apague el Jetson Orin
2. Conecte un extremo del cable plano CSI al módulo de cámara
3. Inserte el otro extremo en el conector CSI de la placa Jetson Orin
4. Verifique la orientación del cable (contactos metálicos hacia la placa)

> ⚠️ **Nota**: conecte el cable plano CSI siempre con la alimentación apagada; de lo contrario podría dañarse el hardware.

### Verificar reconocimiento del dispositivo

```bash
# Check CSI camera devices
ls /dev/video*

# View detailed info with v4l2
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Ejemplo de código Python

Instalar dependencias:

```bash
sudo apt install -y python3-opencv
```

Capturar la cámara CSI con GStreamer + OpenCV:

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

Captura básica (si la cámara funciona en modo UVC):

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

## Preguntas frecuentes

**Q: ¿La cámara no se reconoce?**
Primero verifique la conexión y orientación del cable plano. Ejecute `ls /dev/video*` para revisar el nodo del dispositivo. Si aún no se reconoce, reinstale JetPack.

**Q: ¿Error en el pipeline de GStreamer?**
Confirme que JetPack sea ≥ 5.0. Ejecute `apt list --installed | grep nvarguscamerasrc` para verificar que los plugins de GStreamer estén instalados.

**Q: ¿Cómo cambio de cámara?**
Modifique el parámetro `sensor-id`: `sensor_id=0` para la primera cámara, `sensor_id=1` para la segunda.

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Reportar problema](https://github.com/Juxi-Technology/wiki-documents/issues)
