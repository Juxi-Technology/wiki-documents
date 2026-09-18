---
title: "Paso 5: Teleoperación con cámara (macOS)"
description: "Detecta las cámaras disponibles en macOS y teleopera con una o varias, manteniendo la resolución, los fps y la relación de aspecto del conjunto de datos."
---

# Paso 5: Teleoperación con cámara (macOS)

## Conectar la cámara y la computadora

```Shell
lerobot-find-cameras opencv
```

Tras ejecutarlo se listará el número de cada cámara; anótalo y colócalo en `index_or_path` del siguiente comando.

> Los parámetros de la cámara (resolución, fps, relación de aspecto) deben mantenerse coherentes al recopilar el conjunto de datos y al desplegar el modelo; consulta la explicación en [Recopilación del conjunto de datos por enseñanza](/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Este tutorial utiliza de forma unificada `1280×720@30`.

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Una cámara: teleoperar y mostrar la imagen de la cámara

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

Tras ejecutarlo se inicia la teleoperación

Se abrirá la ventana de rerun.io, que muestra en tiempo real las trayectorias de cada articulación del servomotor, así como la imagen de la cámara en tiempo real

Y guarda las imágenes en el directorio `~/用户名/outputs/captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## Varias cámaras: teleoperar y mostrar la imagen de la cámara

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/3.jpg)

<RelatedProducts slugs="so-arm101" />
