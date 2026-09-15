---
title: "Configuración de cámara CSI en Jetson"
description: "Pulse la tecla de flecha abajo para seleccionar Configure Jetson 24pin CSI Connector. A continuación, pulse E…"
---

# Configuración de cámara CSI en Jetson

## 1. Configurar los pines de la cámara CSI

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![Imagen 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

Pulse la tecla de flecha abajo para seleccionar **Configure Jetson 24pin CSI Connector**. A continuación, pulse Enter para pasar a la siguiente opción

![Imagen 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

Seleccione **Configure for compatible hardware** y, a continuación, pulse Enter.

![Imagen 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

Pulse la tecla de flecha abajo para seleccionar **Camera IMX219 Dual** y, a continuación, pulse Enter.

Si después de reiniciar aparece un error o una pantalla negra al ejecutar la previsualización de la cámara, cambie aquí a Camera IMX219-C

![Imagen 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

Seleccione **Save pin changes** y, a continuación, pulse Enter.

![Imagen 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

Pulse la tecla de flecha abajo para seleccionar **Save and reboot to reconfigure pins** y, a continuación, pulse Enter.

![Imagen 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

Cuando aparezca la siguiente interfaz, pulse directamente la tecla Enter y la placa se reiniciará.

![Imagen 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2. Ver el dispositivo de vídeo

```Plain Text
ls /dev/video*
```

El resultado de la imagen corresponde a dos cámaras CSI conectadas: normalmente una cámara CSI muestra un dispositivo `video`

![Imagen 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3. Previsualizar la imagen de la cámara

Introduzca el siguiente comando en el terminal y el sistema abrirá automáticamente la ventana de imagen de la cámara: de forma predeterminada abre el dispositivo `/dev/video0`

```Plain Text
nvgstcapture-1.0
```

![Imagen 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1. Especificar la cámara

Si hay varias cámaras, puede especificar el ID de la cámara:

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![Imagen 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2. Especificar la resolución de previsualización

Si solo hay una cámara CSI, puede cambiar `--sensor-id=1` por `--sensor-id=0`:

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![Imagen 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)

<RelatedProducts slugs="imx219-csi-camera" />
