---
title: "04、JetCam verwenden"
description: "JetCam verwenden"
---

# 04、JetCam verwenden

JetCam verwenden

1、JetCam installieren

2、JetCam verwenden

2.1、CSI-Kamera

Erläuterung des wichtigsten Codes

Kamera aufrufen

Kamerabild abrufen

2.1.1、Einzelkamera

2.1.2、Mehrere Kameras

2.2、USB-Kamera

Referenzen



JetCam ist eine benutzerfreundliche Python-Bibliothek, die von NVIDIA für die Jetson-Plattform entwickelt wurde, um USB-Kameras oder CSI-Kameras zu integrieren und anzusteuern.

## 1、JetCam installieren

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2、JetCam verwenden

JetCam bietet typische Beispielprogramme, mit denen Benutzern der Aufruf von CSI- und USB-Kameras demonstriert wird.

Die Beispiele müssen mit Jupyter Lab ausgeführt werden; mit unserem werksseitigen Image-System können Sie direkt über Platinen-IP:8888 zugreifen!

### 2.1、CSI-Kamera

Öffnen Sie auf der Jupyter Lab-Weboberfläche den Ordner der CSI-Kamera und öffnen Sie den entsprechenden Ordner:

`/home/jetson/jetcam/notebooks/csi_camera`

**Hinweis: Wenn Sie mit Jupyter Lab nicht vertraut sind, lesen Sie die Anleitung zur Verwendung von Jupyter Lab, um die grundlegenden Bedienungsschritte kennenzulernen!**

#### Erläuterung des wichtigsten Codes

##### Kamera aufrufen

width: Breite der Bildausgabe

height: Höhe der Bildausgabe

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### Kamerabild abrufen

`image = camera.read()`

#### 2.1.1、Einzelkamera

> **Quellcodepfad**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **Beobachtetes Verhalten**
> 
> 

Öffnen Sie die Programmdatei und führen Sie die einzelnen Zellen von oben nach unten aus:

![Abb. 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2、Mehrere Kameras

> **Quellcodepfad**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **Beobachtetes Verhalten**
> 
> 

Öffnen Sie die Programmdatei und führen Sie die einzelnen Zellen von oben nach unten aus:

![Abb. 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2、USB-Kamera

Öffnen Sie in Jupyter Lab den Ordner der USB-Kamera und öffnen Sie die Datei; der Ordnerpfad im werksseitigen Image-System:

`/home/jetson/jetcam/notebooks/usb_camera`

![Abb. 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## Referenzen

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

