---
title: Fotocamera USB con autofocus
description: "Utilizzo della fotocamera JUXI USB: senza driver, grandangolo 86°, autofocus, 1080P"
---

# Fotocamera USB con autofocus

## Panoramica del prodotto

La fotocamera USB con autofocus JUXI è un modulo fotocamera HD plug-and-play, adatto a visione robotica, inferenza IA e applicazioni di computer vision. Supporta campo visivo a 86°, autofocus e uscita video 1080P a 30 FPS.

**Caratteristiche**:
- USB senza driver, compatibile con Windows / Linux / macOS / Jetson / Raspberry Pi
- Obiettivo grandangolare 86° per un campo visivo più ampio
- Autofocus (AF), nessuna regolazione manuale
- Flusso video HD 1080P 30 FPS
- Protocollo standard UVC, plug-and-play

## Specifiche del prodotto

| Parametro | Specifica |
|------|------|
| Risoluzione | 1920 × 1080 (1080P) |
| Frame rate | 30 FPS |
| Angolo di campo | 86° grandangolare |
| Messa a fuoco | Autofocus (AF) |
| Interfaccia | USB 2.0 |
| Protocollo | UVC (USB Video Class) |
| Sistemi | Windows / Linux / macOS / Jetson / Raspberry Pi |

## Guida rapida

### Collegamento del dispositivo

Inserire semplicemente il connettore USB della fotocamera in una porta USB del dispositivo. Nessun driver aggiuntivo necessario.

### Verifica del riconoscimento

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# Should see /dev/video0 or /dev/video1

# View detailed information
v4l2-ctl --list-devices
```

### Esempio di codice Python

Installare OpenCV:

```bash
pip install opencv-python
```

Acquisizione immagine di base:

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

Selezione di più fotocamere:

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

## Utilizzo su Jetson

```bash
# Check the camera
v4l2-ctl --list-devices

# Use a GStreamer pipeline for better performance
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## Domande frequenti

**D: La fotocamera non viene riconosciuta?**
Verificare che il cavo USB sia ben collegato. Provare un'altra porta USB. Eseguire `lsusb` per visualizzare l'elenco dei dispositivi USB.

**D: L'immagine è sfocata?**
La fotocamera dispone di autofocus: dopo il primo collegamento, attendere 2-3 secondi per la messa a fuoco automatica. Se ancora sfocata, controllare che la lente sia pulita.

**D: Come si cambia la risoluzione?**
Utilizzare `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` e `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Segnala un problema](https://github.com/Juxi-Technology/wiki-documents/issues)
