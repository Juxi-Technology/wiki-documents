---
title: "Étape 5 : Téléopération avec caméra (Windows)"
description: "Ajoutez une caméra à la téléopération sous Windows : identification, fenêtre de visualisation rerun, et correction de l'erreur de connexion OpenCV."
---

# Étape 5 : Téléopération avec caméra (Windows)

## Connecter la caméra et l'ordinateur

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Téléopération avec affichage de l'image de la caméra

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

La fenêtre rerun.io s'ouvre et affiche en temps réel la trajectoire de chaque articulation de servomoteur, ainsi que l'image en direct de la caméra

Et enregistre les images dans le répertoire `C:\Users\用户\outputs\captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/2.jpg)

## Si vous rencontrez l'erreur suivante

La caméra ne se connecte pas, mais changer de caméra dans Tencent Meeting fonctionne toujours normalement

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Modifiez le fichier `lerobot\src\lerobot\cameras\utils.py` et remplacez le backend OpenCV par `cv2.CAP_DSHOW`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> C'est un bug que même Doubao ne parvient pas à résoudre ; c'est la faute à l'encapsulation trop profonde de la bibliothèque lerobot, difficile à déboguer pour un débutant
> 
> 

[wx_camera_1768139334330.mp4](/downloads/wx_camera_1768139334330.mp4)

## Connecter plusieurs caméras, téléopération avec affichage de l'image des caméras

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/5.jpg)

<RelatedProducts slugs="so-arm101" />
