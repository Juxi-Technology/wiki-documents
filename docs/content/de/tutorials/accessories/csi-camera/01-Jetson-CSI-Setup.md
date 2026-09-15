---
title: "01、CSI-Kamera verwenden"
description: "Wählen Sie mit der Pfeiltaste nach unten Configure Jetson 24pin CSI Connector. Drücken Sie dann Enter, um zur…"
---

# 01、CSI-Kamera verwenden

## 1、CSI-Kamera-Pins konfigurieren

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![Abb. 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

Wählen Sie mit der Pfeiltaste nach unten **Configure Jetson 24pin CSI Connector**. Drücken Sie dann Enter, um zur nächsten Option zu gelangen.

![Abb. 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

Wählen Sie **Configure for compatible hardware** und drücken Sie dann Enter.

![Abb. 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

Wählen Sie mit der Pfeiltaste nach unten **Camera IMX219 Dual** und drücken Sie dann Enter.

Falls nach dem anschließenden Neustart bei der Kameravorschau ein Fehler auftritt oder der Bildschirm schwarz bleibt, wählen Sie hier Camera IMX219-C.

![Abb. 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

Wählen Sie **Save pin changes** und drücken Sie dann Enter.

![Abb. 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

Wählen Sie mit der Pfeiltaste nach unten **Save and reboot to reconfigure pins** und drücken Sie dann Enter.

![Abb. 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

Wenn die folgende Oberfläche erscheint, drücken Sie direkt die Enter-Taste, die Hauptplatine wird neu gestartet.

![Abb. 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2、Video-Geräte anzeigen

```Plain Text
ls /dev/video*
```

Das Ergebnis im Bild zeigt den Anschluss von zwei CSI-Kameras: Normalerweise wird für eine CSI-Kamera ein `video`-Gerät angezeigt.

![Abb. 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3、Kamerabild in der Vorschau anzeigen

Geben Sie im Terminal den folgenden Befehl ein; das System öffnet automatisch ein Fenster mit dem Kamerabild: Standardmäßig wird das Gerät `/dev/video0` geöffnet.

```Plain Text
nvgstcapture-1.0
```

![Abb. 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1、Kamera festlegen

Bei mehreren Kameras können Sie die Kamera-ID festlegen:

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![Abb. 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2、Vorschauauflösung festlegen

Wenn nur eine CSI-Kamera vorhanden ist, können Sie `--sensor-id=1` in `--sensor-id=0` ändern:

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![Abb. 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)



