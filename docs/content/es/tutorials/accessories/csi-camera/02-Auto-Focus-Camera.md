---
title: "02. Uso de la cámara con enfoque automático"
description: "El resultado de la imagen corresponde a dos cámaras CSI y una cámara USB conectadas: normalmente una cámara C…"
---

# 02. Uso de la cámara con enfoque automático

## 1. Ver el dispositivo de vídeo

```Plain Text
ls /dev/video*
```

El resultado de la imagen corresponde a dos cámaras CSI y una cámara USB conectadas: normalmente una cámara CSI muestra un dispositivo `video`, una cámara USB muestra dos dispositivos `video`, y para la cámara USB se selecciona el `/dev/video2` recién añadido y de número menor (al conectar la cámara USB el sistema añade los números de dispositivo `/dev/video2` y `/dev/video3`)

![Imagen 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2. GUVCView

GUVCView es un software de código abierto para sistemas Linux, utilizado para capturar y grabar vídeo e imágenes, principalmente para cámaras web.

### 2.1. Instalación de GUVCView

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![Imagen 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2. Uso de GUVCView

Acceda a la barra de menú de aplicaciones y haga clic en el icono `guvcview`, o introduzca el comando de inicio en el terminal: seleccione la cámara USB; la cámara CSI no muestra imagen de previsualización

```Plain Text
guvcview
```

![Imagen 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![Imagen 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3. VLC

VLC media player es un reproductor multimedia libre y de código abierto que admite diversos formatos de audio y vídeo, así como DVD, CD de audio, VCD y varios protocolos de transmisión multimedia.

### 3.1. Instalación de VLC

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![Imagen 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2. Uso de VLC

Acceda a la barra de menú de aplicaciones y haga clic en el icono `VLC media player`, o introduzca el comando de inicio en el terminal: seleccione la cámara USB; la cámara CSI no muestra imagen de previsualización

```Plain Text
vlc
```

![Imagen 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![Imagen 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

Seleccione el número de dispositivo correspondiente a la cámara USB:

![Imagen 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![Imagen 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)



