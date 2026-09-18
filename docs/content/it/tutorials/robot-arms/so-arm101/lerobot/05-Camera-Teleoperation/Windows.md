---
title: "Passo 5: Teleoperazione con telecamera (Windows)"
description: "Su Windows collegare la telecamera, avviare la teleoperazione con visualizzazione e risolvere il problema di apertura passando al backend DirectShow."
---

# Passo 5: Teleoperazione con telecamera (Windows)

## Collegare la telecamera al computer

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Teleoperazione e visualizzazione dell'immagine della telecamera

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

Si aprirà la schermata rerun.io, che mostra in tempo reale le traiettorie di ciascuna articolazione dei servomotori e l'immagine in tempo reale della telecamera

e salva le immagini nella directory `C:\Users\用户\outputs\captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/2.jpg)

## Se si incontra il seguente errore

La telecamera non si collega, ma commutando la telecamera in Tencent Meeting si riesce comunque ad avviarla normalmente

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Modifica il file `lerobot\src\lerobot\cameras\utils.py`, cambiando il backend OpenCV in `cv2.CAP_DSHOW`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> Questo è un bug che nemmeno Doubao riesce a risolvere; la colpa è del fatto che la libreria lerobot è incapsulata troppo in profondità, ed è molto difficile per i principianti fare dubug
> 
> 

[wx_camera_1768139334330.mp4](/downloads/wx_camera_1768139334330.mp4)

## Collegare più telecamere: teleoperazione e visualizzazione dell'immagine della telecamera

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/5.jpg)

<RelatedProducts slugs="so-arm101" />
