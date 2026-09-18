---
title: "Fichiers URDF et références"
description: "Les fichiers URDF officiels et les ressources du SO-ARM101 : URDF Studio, contrôle en simulation ROS2, interface LeLab et téléopération depuis un téléphone."
---

# Fichiers URDF et références

## [Fichier URDF](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf) officiel de Lerbot

### URDF Studio

https://urdf.d-robotics.cc/

### Contrôle en simulation ROS2 (à implémenter soi-même)

https://github.com/holmsslk/so-arm-moveit-hardware

### Interface graphique officielle de LeRobot

https://github.com/huggingface/leLab

LeLab est une application web qui intègre l'ensemble du flux de travail de LeRobot — calibration, téléopération, enregistrement, entraînement, relecture — dans une seule interface de navigateur. Il suffit de connecter le bras robotisé et d'ouvrir l'application pour commencer à opérer. Aucune opération fastidieuse en ligne de commande, ni saisie au clavier.

🤗 Le portail web natif de LeRobot, conçu pour permettre aux nouveaux utilisateurs d'accomplir en quelques minutes l'ensemble du parcours, du « déballage » à « l'entraînement de leur première politique ».

🤗 Une seule commande suffit pour installer et exécuter l'ensemble des programmes.

## Contrôle du bras esclave depuis un téléphone

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### Développement de robots dans le cloud : simulation Lerobot et flux de données entre appareils ROS 2 et Isaac Sim sur AWS

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### Configuration de l'ID de servomoteur et calibration du point milieu sur le web

https://bambot.org/feetech.js?lang=zh

1、Saisissez 0 ou 1 selon le modèle de servomoteur, puis cliquez sur « Connecter »

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、Scannez les servomoteurs d'ID 1~6 ; vous pouvez confirmer le servomoteur correspondant à un ID grâce à FOUND dans les résultats du scan. Par exemple, sur l'image, le servomoteur d'ID 1 a été détecté

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、Réglage de l'ID et calibration du point milieu

①Saisissez comme ID de servomoteur actuel l'ID du servomoteur détecté

②Dans « Gestion des ID », saisissez un nombre et cliquez sur « Modifier l'ID » pour définir l'ID

③Calibration du point milieu (le point milieu du servomoteur STS3215 est 2047, celui du servomoteur SCS0009 est 511)

Servomoteur STS : dans « Contrôle de position », saisissez 2047 et cliquez sur « Set »

Servomoteur SCS : dans « Contrôle de position », saisissez 511 et cliquez sur « Set »

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
