---
title: "Autofokus-Kamera verwenden"
description: "Das Ergebnis im Bild zeigt den Anschluss von zwei CSI-Kameras und einer USB-Kamera: Normalerweise wird für ei…"
---

# Autofokus-Kamera verwenden

## 1、Video-Geräte anzeigen

```Plain Text
ls /dev/video*
```

Das Ergebnis im Bild zeigt den Anschluss von zwei CSI-Kameras und einer USB-Kamera: Normalerweise wird für eine CSI-Kamera ein `video`-Gerät und für eine USB-Kamera zwei `video`-Geräte angezeigt. Bei der USB-Kamera wählen Sie das neu hinzugefügte `/dev/video2` mit der kleineren Nummer (beim Anschließen der USB-Kamera fügt das System die Gerätenummern `/dev/video2` und `/dev/video3` hinzu).

![Abb. 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2、GUVCView

GUVCView ist eine Open-Source-Software für Linux-Systeme zum Erfassen und Aufzeichnen von Videos und Bildern, die hauptsächlich für Webcam-Kameras verwendet wird.

### 2.1、GUVCView installieren

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![Abb. 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2、GUVCView verwenden

Öffnen Sie die Anwendungsmenüleiste und klicken Sie auf das Symbol `guvcview`, oder geben Sie den Startbefehl im Terminal ein: Wählen Sie die USB-Kamera; die CSI-Kamera hat kein Vorschaubild.

```Plain Text
guvcview
```

![Abb. 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![Abb. 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3、VLC

VLC media player ist ein freier und quelloffener Multimedia-Player, der zahlreiche Audio- und Videoformate sowie DVD, Audio-CD, VCD und verschiedene Streaming-Protokolle unterstützt.

### 3.1、VLC installieren

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![Abb. 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2、VLC verwenden

Öffnen Sie die Anwendungsmenüleiste und klicken Sie auf das Symbol `VLC media player`, oder geben Sie den Startbefehl im Terminal ein: Wählen Sie die USB-Kamera; die CSI-Kamera hat kein Vorschaubild.

```Plain Text
vlc
```

![Abb. 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![Abb. 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

Wählen Sie die entsprechende Gerätenummer der USB-Kamera:

![Abb. 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![Abb. 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)

<RelatedProducts slugs="usb-auto-focus-camera" />
