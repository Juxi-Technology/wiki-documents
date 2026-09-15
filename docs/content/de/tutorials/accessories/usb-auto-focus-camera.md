---
title: USB-Kamera mit Autofokus
description: "Anleitung zur JUXI USB-Kamera: treiberfrei, 86° Weitwinkel, Autofokus, 1080P"
---

# USB-Kamera mit Autofokus

## Produktübersicht

Die JUXI USB-Kamera mit Autofokus ist ein plug-and-play High-Definition-Kameramodul für Roboter-Vision, KI-Inferenz und Computer-Vision-Anwendungen. Unterstützt 86° Weitwinkel, Autofokus und 1080P-30FPS-Videoausgabe.

**Merkmale**:
- USB treiberfrei, kompatibel mit Windows / Linux / macOS / Jetson / Raspberry Pi
- 86°-Weitwinkelobjektiv für größeren Sichtbereich
- Autofokus (AF), keine manuelle Einstellung nötig
- 1080P-30FPS-HD-Videostream
- UVC-Standardprotokoll, Plug-and-Play

## Produktspezifikationen

| Parameter | Spezifikation |
|------|------|
| Auflösung | 1920 × 1080 (1080P) |
| Bildrate | 30 FPS |
| Blickwinkel | 86° Weitwinkel |
| Fokus | Autofokus (AF) |
| Schnittstelle | USB 2.0 |
| Protokoll | UVC (USB Video Class) |
| Systeme | Windows / Linux / macOS / Jetson / Raspberry Pi |

## Schnellstart

### Gerät anschließen

USB-Stecker der Kamera einfach in einen USB-Port des Geräts stecken. Keine zusätzlichen Treiber erforderlich.

### Geräteerkennung prüfen

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# Should see /dev/video0 or /dev/video1

# View detailed information
v4l2-ctl --list-devices
```

### Python-Codebeispiel

OpenCV installieren:

```bash
pip install opencv-python
```

Bildaufnahme:

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

Mehrere Kameras auswählen:

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

## Verwendung auf Jetson

```bash
# Check the camera
v4l2-ctl --list-devices

# Use a GStreamer pipeline for better performance
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## Häufige Fragen

**Q: Kamera wird nicht erkannt?**

**A:** Prüfen Sie, ob das USB-Kabel fest sitzt. Versuchen Sie einen anderen USB-Port. Führen Sie `lsusb` aus, um die USB-Geräteliste anzuzeigen.

**Q: Bild ist unscharf?**

**A:** Die Kamera verfügt über Autofokus; nach dem ersten Anschließen dauert es 2–3 Sekunden, bis der Fokus automatisch eingestellt ist. Falls weiterhin unscharf, reinigen Sie die Linsenoberfläche.

**Q: Wie ändere ich die Auflösung?**

**A:** Verwenden Sie `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` und `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

## Technischer Support

- 📧 E-Mail:support@juxitech.com
- 🌐 Offizielle Website:[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues:[Fehler melden](https://github.com/Juxi-Technology/wiki-documents/issues)

<RelatedProducts slugs="usb-auto-focus-camera" />
