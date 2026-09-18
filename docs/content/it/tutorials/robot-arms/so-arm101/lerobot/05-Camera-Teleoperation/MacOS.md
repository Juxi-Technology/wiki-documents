---
title: "Passo 5: Teleoperazione con telecamera (macOS)"
description: "Su Mac elencare le telecamere con lo strumento LeRobot, annotare gli indici e avviare la teleoperazione con una o due telecamere a 1280x720."
---

# Passo 5: Teleoperazione con telecamera (macOS)

## Collegare la telecamera al computer

```Shell
lerobot-find-cameras opencv
```

Dopo l'esecuzione verrà elencato il numero di ciascuna telecamera; annotalo e inseriscilo nel `index_or_path` del comando seguente.

> I parametri della telecamera (risoluzione, fps, rapporto d'aspetto) devono rimanere coerenti durante la raccolta del dataset e il deployment del modello; per i motivi, vedi le spiegazioni in [Raccolta del dataset tramite insegnamento](/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Questo tutorial utilizza uniformemente `1280×720@30`.

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Una telecamera: teleoperazione e visualizzazione dell'immagine della telecamera

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

Dopo l'esecuzione viene avviata la teleoperazione

Si aprirà la schermata rerun.io, che mostra in tempo reale le traiettorie di ciascuna articolazione dei servomotori e l'immagine in tempo reale della telecamera

e salva le immagini nella directory `~/用户名/outputs/captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## Più telecamere: teleoperazione e visualizzazione dell'immagine della telecamera

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
