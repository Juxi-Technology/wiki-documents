---
title: Série bras robotiques
description: "Accueil des tutoriels de bras robotiques de Juxi Technology — SO-ARM101, AmazingHand, Lekiwi, XLeRobot"
---

# Série bras robotiques

Bienvenue dans les tutoriels de la série bras robotiques ! Guides complets pour bras robotiques open source et mains dextres.

---

## Liste des produits

- [Guide de sélection](./select-guide.md)

### SO-ARM101

Bras robotique de bureau open source 6 axes, compatible avec les frameworks IA comme LeRobot.

- [Tutoriel SO-ARM101](./so-arm101/SO-ARM101-Tutorial.md)
- [Montage SO-ARM101](./so-arm101/SO-ARM101-Assembly.md)
- [Compatibilité PyTorch Jetson Orin SO-ARM101](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [Téléopération sans fil SO-ARM101 (version ESP32-NanoCam)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [Tutoriel SO-ARM101 bi-bras (double suiveur)](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [Mise à niveau 7-DOF du SO-ARM101 et utilisation avec LeRobot](./so-arm101/SO-ARM101-7DOF-LeRobot.md)
- [Outil de calibration des servomoteurs série SoARM](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### Série SO-ARM101
- [Installation du support caméra plafond](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. Installer LeRobot
- [Étape 1 : Installation de l\'environnement LeRobot (Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [Étape 1 : Installation de l\'environnement LeRobot (Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [Étape 1 : Installation de l\'environnement LeRobot (macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. Port série
- [Étape 2 : Vérification du port série (Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [Étape 2 : Vérification du port série (Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [Étape 2 : Vérification du port série (macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. Calibration
- [Étape 3 : Calibration du bras (Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [Étape 3 : Calibration du bras (Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [Étape 3 : Calibration du bras (macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. Téléopération
- [Étape 4 : Téléopération (Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [Étape 4 : Téléopération (Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [Étape 4 : Téléopération (macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. Téléop. caméra
- [Étape 5 : Téléopération avec caméra (Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [Étape 5 : Téléopération avec caméra (Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [Étape 5 : Téléopération avec caméra (macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. Collecte données
- [Étape 6 : Collecte du jeu de données par démonstration](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [Étape 6 : Points d\'attention pour la collecte](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [Étape 6 : Créer un compte Hugging Face (facultatif)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [Étape 6 : Téléverser le jeu de données (facultatif)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. Entraînement
- [Étape 7 : Entraînement local sur Ubuntu](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [Étape 7 : Environnement d\'entraînement cloud GPU](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [Étape 7 : Courbes d\'entraînement en temps réel (wandb)](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [Étape 7 : Téléverser le modèle (facultatif)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [Étape 7 : Obtenir les fichiers de poids du modèle](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [Étape 7 : Commande d\'entraînement ACT](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [Étape 7 : Commande d\'entraînement pi0](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [Étape 7 : Commande d\'entraînement pi0.5](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [Étape 7 : Commande d\'entraînement pi0fast](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [Étape 7 : Commande d\'entraînement smolvla](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. Inférence
- [Étape 8 : Description de la ligne de commande](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [Étape 8 : Bugs courants et solutions](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [Étape 8 : Commande de déploiement ACT](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [Étape 8 : Commande de déploiement pi0](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [Étape 8 : Commande de déploiement pi0.5](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [Étape 8 : Commande de déploiement smolvla](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### Notions de base
- [Découvrir LeRobot](./so-arm101/basics/Understanding-LeRobot.md)
- [Jeux de données LeRobot sur HuggingFace](./so-arm101/basics/HF-Datasets.md)
- [Ressources pour l\'entraînement de modèles](./so-arm101/basics/Training-Resources.md)
- [Fichiers d\'impression 3D officiels du bras SO-ARM 100](./so-arm101/basics/Official-3D-Print-Files.md)
- [Fichiers URDF et références](./so-arm101/basics/URDF-Reference.md)

#### Compléments
- [Simulation et contrôle ROS2](./so-arm101/ROS2-Simulation-Control.md)
- [Installation de la pince à doigts parallèles](./so-arm101/Parallel-Finger-Gripper-Installation.md)

- [Support de bras et kit caméra d'environnement SO-ARM100&101 – Tutoriel d'installation](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)

### AmazingHand

Main dexterous open source offrant une manipulation multi-doigts de haute précision.

- [Contrôle d'interface AmazingHand](./amazing-hand/AmazingHand-Interface-Control.md)
- [Exemple officiel AmazingHand](./amazing-hand/AmazingHand-Official-Example.md)
- [Débogage TTL AmazingHand](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [Documentation produit AmazingHand](./amazing-hand/product-info.md)

#### Débogage servo PWM
- [01-Contrôle visuel par GUI](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutoriel de suivi de gestes](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-Version servomoteurs PWM - Manuel d\'utilisation](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Version servomoteurs série - Notice d\'utilisation](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### Suivi des gestes
- [Déploiement et exécution en un clic sous Linux (Ubuntu)](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Déploiement et exécution en un clic sous Windows](./amazing-hand/gesture-tracking/02-Windows.md)
- [Déploiement et exécution en un clic sous Mac](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

Robot mobile entièrement open source, compatible LeRobot imitation learning et bras SO101.

- [Tutoriel Lekiwi](./lekiwi/Lekiwi-Tutorial.md)
- [Montage Lekiwi](./lekiwi/Lekiwi-Assembly.md)

### Cours SO-ARM101 + AmazingHand

Flux complet SO-ARM101 + AmazingHand : configuration, calibration, téléopération, collecte de données, entraînement et déploiement (Windows / Linux).

- [Aperçu du cours](./so-arm-amazinghand/index.md)

#### Linux

- [Étape 1 : configuration de l'environnement (Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [Étape 2 : calibration main et bras (Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [Étape 3 : téléopération (Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [Étape 4 : collecte de données (Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [Étape 5 : entraînement du modèle (Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [Étape 6 : déploiement du modèle (Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [Étape 1 : configuration de l'environnement (Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [Étape 2 : calibration main et bras (Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [Étape 3 : téléopération (Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [Étape 4 : collecte de données (Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [Étape 5 : entraînement du modèle (Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [Étape 6 : déploiement du modèle (Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### Tutoriels XLeRobot

Tutoriels XLeRobot : configuration, déploiement des fichiers, assemblage (kit monté/en pièces).

- [Aperçu des tutoriels](./xlerobot/index.md)
- [Configuration (macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [Configuration (Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [Configuration (Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [Déplacer les fichiers XLeRobot](./xlerobot/02-Move-Xlerobot-Files.md)
- [Assemblage du kit monté](./xlerobot/03-Assembly-Assembled-Kit.md)
- [Assemblage du kit en pièces](./xlerobot/04-Assembly-Parts-Kit.md)

---

## Support

En cas de question, contactez-nous :

- 📧 E-mail : support@juxitech.com
- 💬 GitHub Issues : [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
