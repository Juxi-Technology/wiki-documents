---
title: Fotocamera CSI Jetson
description: "Utilizzo del modulo fotocamera CSI NVIDIA Jetson Orin"
---

# Fotocamera CSI Jetson

> **[Acquista nel negozio](https://www.juxitech.com/it/products/79-imx219-csi-camera)**


## Panoramica del prodotto

Il modulo fotocamera CSI JUXI è progettato per il kit sviluppatori NVIDIA Jetson Orin e offre trasmissione video a bassa latenza e grande larghezza di banda tramite CSI (Camera Serial Interface). Adatto a inferenza visione IA, percezione robotica ed edge computing.

**Caratteristiche**:
- Interfaccia CSI-2, collegamento diretto alla scheda Jetson Orin
- Esempi pronti all'uso basati su OpenCV e GStreamer
- Trasmissione video a bassa latenza
- Compatibile con protocollo UVC

## Specifiche del prodotto

| Parametro | Specifica |
|------|------|
| Interfaccia | CSI-2 (MIPI) |
| Piattaforme | Serie NVIDIA Jetson Orin |
| Formato video | RAW / YUV |
| Supporto SDK | JetPack 5.0+ |
| Framework software | GStreamer / OpenCV |

## Guida rapida

### Collegamento hardware

1. Spegnere il Jetson Orin
2. Collegare un'estremità del cavo piatto CSI al modulo fotocamera
3. Inserire l'altra estremità nel connettore CSI della scheda Jetson Orin
4. Verificare il verso del cavo (contatti metallici verso la scheda)

> ⚠️ **Attenzione**: collegare il cavo piatto CSI solo a dispositivo spento, altrimenti si rischia di danneggiare l'hardware.

### Verifica del riconoscimento

```bash
# Check CSI camera devices
ls /dev/video*

# View detailed info with v4l2
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Esempio di codice Python

Installare le dipendenze:

```bash
sudo apt install -y python3-opencv
```

Acquisizione della fotocamera CSI con GStreamer + OpenCV:

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

Acquisizione base (se la fotocamera funziona in modalità UVC):

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

## Domande frequenti

**D: La fotocamera non viene riconosciuta?**
Verificare prima il collegamento e il verso del cavo piatto. Eseguire `ls /dev/video*` per controllare il nodo del dispositivo. Se ancora non riconosciuta, reinstallare JetPack.

**D: Errore nel pipeline GStreamer?**
Verificare che JetPack sia ≥ 5.0. Eseguire `apt list --installed | grep nvarguscamerasrc` per confermare che i plugin GStreamer siano installati.

**D: Come si cambia fotocamera?**
Modificare il parametro `sensor-id`: `sensor_id=0` per la prima fotocamera, `sensor_id=1` per la seconda.

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Segnala un problema](https://github.com/Juxi-Technology/wiki-documents/issues)
