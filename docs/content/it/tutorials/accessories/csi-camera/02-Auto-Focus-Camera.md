---
title: "Uso della fotocamera autofocus"
description: "Uso della fotocamera autofocus su Jetson: elencare i dispositivi video, scegliere il nodo giusto per la USB e acquisire anteprime e video con GUVCView e VLC."
---

# Uso della fotocamera autofocus

## 1. Visualizzare il dispositivo video

```Plain Text
ls /dev/video*
```

Il risultato dell'immagine corrisponde a due fotocamere CSI e una fotocamera USB collegate: di norma una fotocamera CSI mostra un dispositivo `video`, una fotocamera USB mostra due dispositivi `video`, e per la fotocamera USB si seleziona il `/dev/video2` appena aggiunto e con numero inferiore (collegando la fotocamera USB il sistema aggiunge i numeri di dispositivo `/dev/video2` e `/dev/video3`)

![Immagine 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2. GUVCView

GUVCView è un software open source per sistemi Linux, utilizzato per catturare e registrare video e immagini, principalmente per webcam.

### 2.1. Installazione di GUVCView

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![Immagine 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2. Uso di GUVCView

Accedere alla barra dei menu delle applicazioni e fare clic sull'icona `guvcview`, oppure digitare il comando di avvio nel terminale: selezionare la fotocamera USB; la fotocamera CSI non mostra l'anteprima

```Plain Text
guvcview
```

![Immagine 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![Immagine 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3. VLC

VLC media player è un lettore multimediale libero e open source che supporta vari formati audio e video, nonché DVD, CD audio, VCD e diversi protocolli di streaming.

### 3.1. Installazione di VLC

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![Immagine 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2. Uso di VLC

Accedere alla barra dei menu delle applicazioni e fare clic sull'icona `VLC media player`, oppure digitare il comando di avvio nel terminale: selezionare la fotocamera USB; la fotocamera CSI non mostra l'anteprima

```Plain Text
vlc
```

![Immagine 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![Immagine 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

Selezionare il numero di dispositivo corrispondente alla fotocamera USB:

![Immagine 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![Immagine 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)

<RelatedProducts slugs="usb-auto-focus-camera" />
