---
title: "Étape 5 : Téléopération avec caméra (Ubuntu)"
description: "Ajoutez une caméra à la téléopération sous Ubuntu : identification du périphérique, affichage en temps réel et configuration de une ou plusieurs caméras."
---

# Étape 5 : Téléopération avec caméra (Ubuntu)

## Connecter la caméra et l'ordinateur

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Ubuntu/1.png)

## Téléopération avec affichage de l'image de la caméra

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

## Plusieurs caméras, téléopération avec affichage de l'image des caméras

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

<RelatedProducts slugs="so-arm101" />
