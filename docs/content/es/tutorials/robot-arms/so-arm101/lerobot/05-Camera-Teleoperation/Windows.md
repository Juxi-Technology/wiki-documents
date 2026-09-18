---
title: "Paso 5: Teleoperación con cámara (Windows)"
description: "Teleopera con cámara en Windows y visualiza las trayectorias y la imagen en tiempo real, con la solución al fallo de conexión cambiando el backend de OpenCV."
---

# Paso 5: Teleoperación con cámara (Windows)

## Conectar la cámara y la computadora

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Teleoperar y mostrar la imagen de la cámara

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

Se abrirá la ventana de rerun.io, que muestra en tiempo real las trayectorias de cada articulación del servomotor, así como la imagen de la cámara en tiempo real

Y guarda las imágenes en el directorio `C:\Users\<usuario-Windows>\outputs\captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/2.jpg)

## Si te encuentras con el siguiente tipo de error

La cámara no se puede conectar, pero al cambiar de cámara en Tencent Meeting, todavía se puede abrir con normalidad

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Modifica el archivo `lerobot\src\lerobot\cameras\utils.py` y cambia el backend de OpenCV a `cv2.CAP_DSHOW`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> Este es un bug que ni Doubao puede resolver; la culpa es de que la biblioteca lerobot está encapsulada demasiado profundamente, y a los principiantes les resulta muy difícil depurarlo
> 
> 

[wx_camera_1768139334330.mp4](/downloads/wx_camera_1768139334330.mp4)

## Conectar varias cámaras: teleoperar y mostrar la imagen de la cámara

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/5.jpg)

<RelatedProducts slugs="so-arm101" />
