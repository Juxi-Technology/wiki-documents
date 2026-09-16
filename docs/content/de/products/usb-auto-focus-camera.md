---
title: USB-Kamera mit Autofokus
category: compute-vision
description: Juxi Technology USB-Kamera mit Autofokus, treiberfrei — 86° Weitwinkel, 1080P 30FPS, UVC Plug-and-Play für Roboter-Vision und KI-Inferenz, kompatibel mit Windows/Linux/macOS/Jetson/Raspberry Pi
keywords: [usb-kamera, autofokus, 1080p, uvc, treiberfrei, roboter-vision, jetson, raspberry-pi]
---

# USB-Kamera mit Autofokus

> **[Auf Taobao kaufen](https://item.taobao.com/item.htm?id=912105917442)**

## Produktübersicht

Die USB-Kamera mit Autofokus ist ein Plug-and-Play-HD-Kameramodul für Roboter-Vision, KI-Inferenz und Computer-Vision-Anwendungen. Unterstützt **86°-Weitwinkel-Sichtfeld**, Autofokus und **1080P-30FPS**-Videoausgabe über das UVC-Standardprotokoll — keine Treiberinstallation erforderlich.

**Kernfunktionen**:

- USB treiberfrei, UVC-Standardprotokoll, Plug-and-Play
- Kompatibel mit Windows / Linux / macOS / Jetson / Raspberry Pi
- 86°-Weitwinkelobjektiv für einen größeren Sichtbereich
- Autofokus (AF), keine manuelle Einstellung nötig
- 1080P-30FPS-HD-Videostream

---

## Spezifikationen

| Parameter | Spezifikation |
|------|------|
| Auflösung | 1920 × 1080 (1080P) |
| Bildrate | 30 FPS |
| Blickwinkel | 86° Weitwinkel |
| Fokus | Autofokus (AF) |
| Schnittstelle | USB 2.0 |
| Protokoll | UVC (USB Video Class) |
| Systeme | Windows / Linux / macOS / Jetson / Raspberry Pi |

---

## Schnellstart

### 1. Gerät anschließen

USB-Stecker der Kamera in einen USB-Port des Geräts stecken — keine zusätzlichen Treiber erforderlich.

### 2. Geräteerkennung prüfen

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

Eine USB-Kamera stellt in der Regel zwei `video`-Geräte bereit (zum Beispiel die neu hinzugekommenen `/dev/video2` und `/dev/video3`); verwenden Sie das mit der kleineren Nummer.

### 3. Bilder mit Python auslesen

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## Komplette Tutorials

- [Anleitung zur USB-Kamera mit Autofokus — Geräteerkennung, Auswahl bei mehreren Kameras und Python-Beispiele](/de/tutorials/accessories/usb-auto-focus-camera)
- [Autofokus-Kamera unter Jetson verwenden (video-Geräte und GUVCView)](/de/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## Anwendungsfälle

- Roboter-Vision und Teleoperation-Videoübertragung
- KI-Inferenz und Computer-Vision-Projekte
- Multi-Kamera-Lösungen auf Jetson / Raspberry Pi (in Kombination mit CSI-Kameras)
- Live-Streaming, Bildschirmaufnahme und Videoaufnahme

---

## Häufige Fragen

**Q: Kamera wird nicht erkannt?**

**A:** Prüfen Sie, ob das USB-Kabel fest angeschlossen ist, versuchen Sie einen anderen USB-Port und prüfen Sie die USB-Geräteliste mit `lsusb`.

**Q: Bild ist unscharf?**

**A:** Die Kamera verfügt über Autofokus; nach dem ersten Anschließen dauert es 2–3 Sekunden, bis der Fokus automatisch eingestellt ist. Falls das Bild weiterhin unscharf ist, prüfen Sie, ob die Linsenoberfläche sauber ist.

**Q: Wie ändere ich die Auflösung?**

**A:** Verwenden Sie `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` und `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

---

## Support

- 📧 E-Mail: support@juxitech.com
- 🌐 Offizielle Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
