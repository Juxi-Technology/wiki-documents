---
title: "Computer Mac"
description: "Su Mac elencare le telecamere con lo strumento LeRobot, annotare gli indici e avviare la teleoperazione con una o due telecamere a 1280x720."
---

# Computer Mac

## Collegare la telecamera al computer

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Una telecamera: teleoperazione e visualizzazione dell'immagine della telecamera

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

Dopo l'esecuzione viene avviata la teleoperazione

Si aprirà la schermata rerun\.io, che mostra in tempo reale le traiettorie di ciascuna articolazione dei servomotori e l'immagine in tempo reale della telecamera

e salva le immagini nella directory `~/nome-utente/outputs/captured_images`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## Più telecamere: teleoperazione e visualizzazione dell'immagine della telecamera

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1920, height: 1080, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```



