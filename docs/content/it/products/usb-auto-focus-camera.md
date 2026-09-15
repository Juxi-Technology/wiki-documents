---
title: Fotocamera USB con autofocus
category: compute-vision
description: Fotocamera USB con autofocus di Juxi Technology — senza driver, grandangolo 86°, 1080P 30FPS, UVC plug-and-play per visione robotica e inferenza IA, compatibile con Windows/Linux/macOS/Jetson/Raspberry Pi
keywords: [fotocamera usb, autofocus, 1080p, uvc, senza driver, visione robotica, jetson, raspberry pi]
---

# Fotocamera USB con autofocus

## Panoramica

La fotocamera USB con autofocus è un modulo fotocamera HD plug-and-play per visione robotica, inferenza IA e applicazioni di computer vision. Offre un **campo visivo grandangolare di 86°**, autofocus e uscita video **1080P 30FPS**, con protocollo standard UVC e senza installazione di driver.

**Caratteristiche principali**:

- USB senza driver, protocollo standard UVC plug-and-play
- Compatibile con Windows / Linux / macOS / Jetson / Raspberry Pi
- Obiettivo grandangolare 86° per un campo visivo più ampio
- Autofocus (AF), nessuna regolazione manuale
- Flusso video HD 1080P 30 FPS

---

## Specifiche

| Parametro | Specifica |
|------|------|
| Risoluzione | 1920 × 1080 (1080P) |
| Frame rate | 30 FPS |
| Angolo di campo | 86° grandangolare |
| Messa a fuoco | Autofocus (AF) |
| Interfaccia | USB 2.0 |
| Protocollo | UVC (USB Video Class) |
| Sistemi | Windows / Linux / macOS / Jetson / Raspberry Pi |

---

## Avvio rapido

### 1. Collegamento del dispositivo

Inserire semplicemente il connettore USB della fotocamera in una porta USB del dispositivo. Nessun driver aggiuntivo necessario.

### 2. Verifica del riconoscimento

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

Una fotocamera USB di solito espone due dispositivi `video` (ad esempio i nuovi `/dev/video2` e `/dev/video3`); in fase di utilizzo, scegliere quello con il numero più basso.

### 3. Lettura dei frame con Python

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

## Tutorial completi

- [Tutorial d'uso della fotocamera USB con autofocus — riconoscimento del dispositivo, selezione di più fotocamere ed esempi Python](/it/tutorials/accessories/usb-auto-focus-camera)
- [Uso della fotocamera autofocus su Jetson (dispositivi video e GUVCView)](/it/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## Casi d'uso

- Visione robotica e trasmissione video per teleoperazione
- Progetti di inferenza IA e computer vision
- Configurazioni multi-camera su Jetson / Raspberry Pi (in abbinamento alle fotocamere CSI)
- Live streaming, registrazione dello schermo e acquisizione video

---

## FAQ

**D: La fotocamera non viene riconosciuta?**
Verificare che il cavo USB sia ben collegato. Provare un'altra porta USB. Eseguire `lsusb` per visualizzare l'elenco dei dispositivi USB.

**D: L'immagine è sfocata?**
La fotocamera dispone di autofocus: dopo il primo collegamento, attendere 2-3 secondi per la messa a fuoco automatica. Se ancora sfocata, controllare che la lente sia pulita.

**D: Come si cambia la risoluzione?**
Utilizzare `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` e `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

---

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
