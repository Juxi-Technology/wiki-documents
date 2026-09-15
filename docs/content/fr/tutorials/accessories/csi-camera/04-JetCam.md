---
title: "Utiliser JetCam"
description: "Utiliser la bibliothèque JetCam de NVIDIA sur Jetson : installer JetCam et piloter une ou plusieurs caméras CSI ou USB depuis des programmes Python."
---

# Utiliser JetCam

Utilisation de JetCam

1、Installation de JetCam

2、Utilisation de JetCam

2.1、Caméra CSI

Explication du code principal

Appeler la caméra

Obtenir l'image de la caméra

2.1.1、Caméra unique

2.1.2、Caméras multiples

2.2、Caméra USB

Références



JetCam est une bibliothèque Python facile à utiliser développée par NVIDIA pour la plateforme Jetson, destinée à intégrer et à piloter des caméras USB ou CSI.

## 1、Installation de JetCam

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2、Utilisation de JetCam

JetCam fournit des exemples de programmes typiques pour démontrer aux utilisateurs l'appel des caméras CSI et USB.

Les exemples doivent être exécutés avec Jupyter Lab ; avec notre système d'image d'usine, vous pouvez y accéder directement via l'IP de la carte:8888 !

### 2.1、Caméra CSI

Sur l'interface web de Jupyter Lab, accédez au dossier de la caméra CSI et ouvrez le dossier correspondant :

`/home/jetson/jetcam/notebooks/csi_camera`

**Remarque : si vous n'êtes pas familier avec Jupyter Lab, consultez le tutoriel d'utilisation de Jupyter Lab pour découvrir les opérations de base !**

#### Explication du code principal

##### Appeler la caméra

width : largeur de sortie de l'image

height : hauteur de sortie de l'image

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### Obtenir l'image de la caméra

`image = camera.read()`

#### 2.1.1、Caméra unique

> **Chemin du code source**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **Comportement observé**
> 
> 

Ouvrez le fichier du programme, puis exécutez les cellules une par une de haut en bas :

![Image 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2、Caméras multiples

> **Chemin du code source**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **Comportement observé**
> 
> 

Ouvrez le fichier du programme, puis exécutez les cellules une par une de haut en bas :

![Image 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2、Caméra USB

Dans Jupyter Lab, accédez au dossier de la caméra USB et ouvrez le fichier ; chemin du dossier dans le système d'image d'usine :

`/home/jetson/jetcam/notebooks/usb_camera`

![Image 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## Références

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
