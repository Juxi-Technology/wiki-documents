---
title: "Tutoriels du bras robotique SO-ARM101"
description: "Page d'accueil du tutoriel SO-ARM101 : ce que sont l'intelligence incarnée et LeRobot, le bras lui-même, la configuration informatique requise et la signification de l'apprentissage par imitation (VLA), avec la navigation complète du cours."
---

# Tutoriels du bras robotique SO-ARM101

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## Qu'est-ce que l'intelligence incarnée ?

L'intelligence dotée d'un corps. Elle relie l'IA à diverses entités matérielles physiques, telles que :

Les robots quadrupèdes, les robots humanoïdes bipèdes, les robots à roues et jambes, les drones, les voitures autonomes

## Qu'est-ce que LeRobot ?

LeRobot est le `framework logiciel open source de robots intelligents incarnés` de HuggingFace

Adresse GitHub : https://github.com/huggingface/lerobot

Il abaisse la barrière de la **collecte de données, de l'entraînement d'algorithmes et du déploiement d'inférences** pour l'apprentissage par renforcement et l'**apprentissage par imitation (VLA)**, l'**apprentissage par imitation (VLA)** étant l'aspect principal

- Quels robots peut-on développer avec LeRobot ?

Du bras robotique SO-ARM 101 à quelques milliers de yuans, au chariot LeKiwi, jusqu'au bras AgileX piper à plusieurs dizaines de milliers de yuans, au bras Huaxinjing StarAI et à la main dextre Hope-JR, et jusqu'au robot humanoïde Unitree G1 à plusieurs centaines de milliers de yuans. LeRobot est devenu la référence pour la collecte de données et l'entraînement d'algorithmes dans l'industrie de l'intelligence incarnée.

Vous pouvez également adapter votre propre robot au framework LeRobot.

- Jeux de données et modèles LeRobot

LeRobot définit son propre format de jeu de données d'apprentissage par imitation. Vous pouvez consulter, utiliser, télécharger et entraîner tous les jeux de données et modèles publics sur HuggingFace, et vous pouvez aussi téléverser vos propres jeux de données sur HuggingFace.

## Qu'est-ce que le bras robotique SO-ARM 101 ?

Ce tutoriel prend pour exemple le bras robotique SO-ARM 101 ; il utilise des pièces structurelles imprimées en 3D et des servomoteurs Feetech, à un coût très faible.

C'est un corps d'intelligence incarnée même un étudiant sans moyens peut s'offrir, et c'est l'un des corps officiellement recommandés par LeRobot.

Le bras se compose de deux bras : un bras Leader et un bras Follower. Chaque bras possède 5 degrés de liberté plus 1 degré de liberté pour la pince.

## Quelle configuration informatique me faut-il

Un ordinateur portable Windows ordinaire peut tout gérer jusqu'à l'entraînement.

Un Mac ordinaire peut tout gérer.

Une machine Ubuntu dotée d'un GPU NVIDIA peut tout gérer.

Dans ce tutoriel, nous utilisons une [plateforme GPU dans le cloud](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) pour entraîner les modèles, votre propre ordinateur n'a donc pas besoin d'une configuration haut de gamme.

## Qu'est-ce que l'**apprentissage par imitation et le VLA** ?

Un humain fait bouger le robot pour montrer la tâche et collecter un jeu de données. Ce jeu de données sert ensuite à entraîner un algorithme d'apprentissage par imitation, qui est finalement déployé sur le robot, lui permettant de reproduire les actions humaines de façon autonome et de généraliser à l'environnement réel. Aucune téléopération ni commande à distance n'est nécessaire.

Par exemple, dans la vidéo ci-dessus, un humain fait bouger le bras robotique SO-ARM pour attraper une écrevisse, la tremper dans l'assaisonnement et la déposer dans l'huile chaude, et le bras finit par exécuter cette action tout seul. Même avec une nouvelle écrevisse, il peut réagir et accomplir l'action à tout moment.

L'apprentissage par imitation porte aussi un nom à la pointe de la mode : VLA (grand modèle Vision-Langage-Action). C'est également le domaine de recherche en intelligence incarnée qui se développe le plus vite aujourd'hui, qui attire les investissements les plus enthousiastes, qui connaît la concurrence Chine-États-Unis la plus féroce, qui bénéficie de l'écosystème open source le plus florissant, qui suscite l'attention médiatique la plus intense et qui attire d'innombrables étudiants de master et de doctorat.

Les algorithmes que LeRobot adapte principalement sont ceux d'apprentissage par imitation, comme ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS et d'autres.

L'apprentissage par imitation de ce tutoriel est exclusivement du VLA.


## Navigation des tutoriels

### Cours complets

- [Présentation du cours LeRobot](/fr/tutorials/robot-arms/so-arm101/lerobot/)
- [Tutoriel du bras SO-ARM101 à 7 axes](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### Tutoriels de montage et d'extension

- [Tutoriel bras robotique LeRobot](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guide de montage du bras robotique Lerobot](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Support de bras et kit caméra d'environnement SO-ARM100&101 – Tutoriel d'installation](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [Installation du support caméra plafond](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [Installation de la pince à doigts parallèles](/fr/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [Tutoriel SO-ARM101 bi-bras (double suiveur)](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [Téléopération sans fil SO-ARM101 (version ESP32-NanoCam)](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [Dépannage de la téléopération](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [Tutoriel d'utilisation de l'outil de calibration des servos de la série SoARM](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [Simulation et contrôle ROS2](/fr/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [Incompatibilité PyTorch sur Jetson Orin](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### Notions de base

- [Découvrir LeRobot](/fr/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [Jeux de données LeRobot sur HuggingFace](/fr/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [Ressources pour l'entraînement de modèles](/fr/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [Fichiers d'impression 3D officiels du bras SO-ARM 100](/fr/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [Fichiers URDF et références](/fr/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [Supports et fixations de caméra recommandés](/fr/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### Tutoriel LeLab

- [1 · Vue d'ensemble](/fr/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · Installer et lancer](/fr/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · Connexion et calibration](/fr/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · Téléopération](/fr/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · Enregistrer un jeu de données](/fr/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · Entraîner et exécuter l'inférence](/fr/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · Dépannage](/fr/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)

### Tutoriel de l'image Docker XLeRobot

- [Tutoriel XLeRobot Docker — Kit de développement Jetson AGX Orin](/fr/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [Tutoriel XLeRobot Docker — Kit de développement Jetson Orin Nano Super](/fr/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
