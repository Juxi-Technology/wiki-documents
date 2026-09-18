---
title: "Étape 5 : Téléopération avec caméra (macOS)"
description: "Ajoutez une ou deux caméras à la téléopération sur Mac, avec affichage des trajectoires et des images, en gardant des paramètres identiques pour la suite."
---

# Étape 5 : Téléopération avec caméra (macOS)

## Connecter la caméra et l'ordinateur

```Shell
lerobot-find-cameras opencv
```

Après l'exécution, le numéro de chaque caméra est listé ; notez-le et renseignez-le dans `index_or_path` de la commande ci-dessous.

> Les paramètres de la caméra (résolution, fps, rapport largeur/hauteur) doivent rester identiques lors de la collecte du jeu de données et du déploiement du modèle ; pour la raison, voir l'explication dans [Collecte de jeu de données par démonstration](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Ce tutoriel utilise uniformément `1280×720@30`.

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Une caméra, téléopération avec affichage de l'image de la caméra

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

La téléopération démarre après l'exécution

La fenêtre rerun.io s'ouvre et affiche en temps réel la trajectoire de chaque articulation de servomoteur, ainsi que l'image en direct de la caméra

Et enregistre les images dans le répertoire `~/用户名/outputs/captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## Plusieurs caméras, téléopération avec affichage de l'image des caméras

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
