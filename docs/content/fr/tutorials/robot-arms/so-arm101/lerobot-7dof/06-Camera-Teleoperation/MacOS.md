---
title: "Ordinateur Mac"
description: "Ajoutez une ou deux caméras à la téléopération sur Mac, avec affichage des trajectoires et des images, en gardant des paramètres identiques pour la suite."
---

# Ordinateur Mac

## Connecter la caméra et l'ordinateur

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Une caméra, téléopération avec affichage de l'image de la caméra

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

La téléopération démarre après l'exécution

La fenêtre rerun\.io s'ouvre et affiche en temps réel la trajectoire de chaque articulation de servo, ainsi que l'image en direct de la caméra

Et enregistre les images dans le répertoire `~/<nom-utilisateur>/outputs/captured_images`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## Plusieurs caméras, téléopération avec affichage de l'image des caméras

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



