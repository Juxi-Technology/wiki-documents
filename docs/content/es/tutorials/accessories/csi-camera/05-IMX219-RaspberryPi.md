---
title: "IMX219 en Raspberry Pi"
description: "Cámara CSI IMX219 en Raspberry Pi: habilita la cámara, verifica su detección y toma fotografías con el comando raspistill."
---

# IMX219 en Raspberry Pi

##### 1. En primer lugar, utilice el comando "ls" para comprobar si existe el nodo de dispositivo vchiq: introduzca ls /dev

![Imagen 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

Si no existe, puede deberse a un problema del kernel o del hardware del dispositivo; puede intentar volver a grabar el sistema o cambiar el hardware.

##### 2. Ejecute el comando "sudo raspi-config" para habilitar la cámara CSI de Raspberry Pi

![Imagen 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![Imagen 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![Imagen 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![Imagen 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

A continuación, salga y ejecute el comando sudo reboot para reiniciar la Raspberry Pi

##### 3. Introduzca "vcgencmd get_camera" para comprobar si la cámara actual y su habilitación están disponibles

![Imagen 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

Si detected=0, significa que el módulo de cámara no está bien conectado; revise de nuevo el hardware. detected=1 indica que la cámara CSI está conectada correctamente. supported=1 indica que la cámara ya está habilitada y puede utilizarse. supported=0 indica que la cámara CSI no está habilitada y es necesario habilitar el módulo de cámara.

## **3. Tomar fotografías con el comando rapistill**

Introduzca **"raspistill -o image.jpg"** para tomar y guardar la fotografía correctamente; en ese momento la cámara encenderá una luz roja. Para más parámetros, utilice raspistill --help

![Imagen 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

Transfiera la imagen image.jpg al escritorio de Windows y ábrala para ver el resultado de la fotografía

<RelatedProducts slugs="imx219-csi-camera" />
