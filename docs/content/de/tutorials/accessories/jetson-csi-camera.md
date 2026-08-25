---
title: Jetson-CSI-Kamera
description: "Verwendung des NVIDIA Jetson Orin CSI-Kameramoduls"
---

# Jetson-CSI-Kamera

> **[Im Shop kaufen](https://www.juxitech.com/de/products/79-imx219-csi-camera)**


## Produktübersicht

Das JUXI CSI-Kameramodul wurde für das NVIDIA Jetson Orin Developer Kit entwickelt und bietet über CSI (Camera Serial Interface) eine Videoübertragung mit geringer Latenz und hoher Bandbreite. Geeignet für KI-Vision-Inferenz, Robotik-Wahrnehmung und Edge-Computing.

**Merkmale**:
- CSI-2-Schnittstelle, direkter Anschluss an das Jetson-Orin-Board
- Sofort einsetzbare Beispiele auf Basis von OpenCV und GStreamer
- Videoübertragung mit geringer Latenz
- UVC-Protokoll-kompatibel

## Produktspezifikationen

| Parameter | Spezifikation |
|------|------|
| Schnittstelle | CSI-2 (MIPI) |
| Plattformen | NVIDIA Jetson Orin Serie |
| Videoformat | RAW / YUV |
| SDK-Unterstützung | JetPack 5.0+ |
| Software-Framework | GStreamer / OpenCV |

## Schnellstart

### Hardware-Verbindung

1. Jetson Orin ausschalten
2. CSI-Flachbandkabel am Kameramodul anschließen
3. Anderes Ende in den CSI-Anschluss des Jetson-Orin-Boards stecken
4. Ausrichtung prüfen (Metallkontakte zum Board)

> ⚠️ **Achtung**: Schließen Sie das CSI-Flachbandkabel unbedingt bei ausgeschalteter Stromversorgung an, sonst kann die Hardware beschädigt werden.

### Geräteerkennung prüfen

```bash
# Check CSI camera devices
ls /dev/video*

# View detailed info with v4l2
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Python-Codebeispiel

Abhängigkeiten installieren:

```bash
sudo apt install -y python3-opencv
```

CSI-Kamera mit GStreamer + OpenCV aufnehmen:

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

Basiserfassung (wenn die Kamera im UVC-Modus läuft):

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

## Häufige Fragen

**Q: Kamera wird nicht erkannt?**
Prüfen Sie zuerst Kabelanschluss und Ausrichtung. Führen Sie `ls /dev/video*` aus, um den Geräteknoten zu prüfen. Falls weiterhin nicht erkannt, installieren Sie JetPack neu.

**Q: Fehler in der GStreamer-Pipeline?**
Stellen Sie sicher, dass JetPack ≥ 5.0 ist. Prüfen Sie mit `apt list --installed | grep nvarguscamerasrc`, ob die GStreamer-Plugins installiert sind.

**Q: Wie wechsle ich die Kamera?**
Ändern Sie den Parameter `sensor-id`: `sensor_id=0` für die erste, `sensor_id=1` für die zweite Kamera.

## Technischer Support

- 📧 E-Mail：support@juxitech.com
- 🌐 Offizielle Website：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[Fehler melden](https://github.com/Juxi-Technology/wiki-documents/issues)
