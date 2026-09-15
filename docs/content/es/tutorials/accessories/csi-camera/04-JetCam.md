---
title: "Uso de JetCam"
description: "Uso de JetCam"
---

# Uso de JetCam

Uso de JetCam

1. Instalación de JetCam

2. Uso de JetCam

2.1. Cámara CSI

Explicación del código principal

Llamada a la cámara

Obtener la imagen de la cámara

2.1.1. Una sola cámara

2.1.2. Varias cámaras

2.2. Cámara USB

Referencias



JetCam es una biblioteca Python fácil de usar desarrollada por NVIDIA para la plataforma Jetson, destinada a integrar y manejar cámaras USB o cámaras CSI

## 1. Instalación de JetCam

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2. Uso de JetCam

JetCam proporciona programas de ejemplo típicos para demostrar al usuario la llamada a cámaras CSI y USB.

Los ejemplos deben ejecutarse con Jupyter Lab; si utiliza nuestro sistema de imagen de fábrica, puede acceder directamente mediante la IP de la placa:8888!

### 2.1. Cámara CSI

En la interfaz web de Jupyter Lab, acceda a la carpeta donde se encuentra la cámara CSI y abra la carpeta correspondiente:

`/home/jetson/jetcam/notebooks/csi_camera`

**Nota: si no está familiarizado con Jupyter Lab, puede consultar el tutorial de uso de Jupyter Lab para conocer las operaciones básicas!**

#### Explicación del código principal

##### Llamada a la cámara

width: ancho de salida de la imagen

height: alto de salida de la imagen

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### Obtener la imagen de la cámara

`image = camera.read()`

#### 2.1.1. Una sola cámara

> **Ruta del código fuente**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **Resultado de la ejecución**
> 
> 

Después de abrir el archivo de programa, ejecute las celdas una a una de arriba hacia abajo:

![Imagen 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2. Varias cámaras

> **Ruta del código fuente**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **Resultado de la ejecución**
> 
> 

Después de abrir el archivo de programa, ejecute las celdas una a una de arriba hacia abajo:

![Imagen 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2. Cámara USB

En Jupyter Lab, acceda a la carpeta donde se encuentra la cámara USB y abra el archivo; ruta de la carpeta en el sistema de imagen de fábrica:

`/home/jetson/jetcam/notebooks/usb_camera`

![Imagen 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## Referencias

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
