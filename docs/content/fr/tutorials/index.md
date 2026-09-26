---
title: Tutoriels
description: "Tutoriels du Wiki Juxi Technology : bras robotiques SO-ARM101 et XLeRobot, main AmazingHand, capteurs et accessoires, classés par catégories."
---

# Tutoriels

Bienvenue sur la page Tutoriels ! Vous y trouverez tous les tutoriels d'utilisation des produits, les guides de configuration et les bonnes pratiques pour démarrer rapidement et exploiter pleinement les capacités des produits.

## Catégories

### Démarrage rapide

- [FAQ](/fr/tutorials/faq)
- [Introduction à ROS](/fr/tutorials/ros-intro)
- [Lark Wiki](/fr/tutorials/lark-wiki)



### Tutoriel du bras SO-ARM101 à 7 axes

- [Tutoriel du bras SO-ARM101 à 7 axes](/tutorials/robot-arms/so-arm101/lerobot-7dof/)
- **1. Installer LeRobot**
  - [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
  - [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
  - [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)
- **2. Remplacer les fichiers (adaptation 7DOF)**
  - [Remplacer les fichiers (adaptation 7DOF)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- **3. Port série**
  - [Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
  - [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
  - [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)
- **4. Calibration**
  - [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
  - [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
  - [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)
- **5. Téléopération**
  - [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
  - [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
  - [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)
- **6. Téléop. caméra**
  - [Ordinateur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
  - [Ordinateur Windows](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
  - [Ordinateur Mac](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)
- **7. Collecte données**
  - [Revisionner et rejouer le dataset](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
  - [Points d'attention pour la collecte de dataset](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
  - [Créer un compte Hugging Face (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
  - [Téléverser le dataset sur HuggingFace (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
  - [Collecte du dataset par démonstration - Poignée de main 200](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
  - [Collecte du dataset par démonstration](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)
- **8. Entraînement**
  - [Configuration de l'environnement d'entraînement sur cloud GPU](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
  - [Commande d'entraînement - ACT (recommandé pour débuter)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
  - [Commande d'entraînement - Diffusion](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
  - [Commande d'entraînement - pi0.5](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
  - [Commande d'entraînement - pi0 (meilleurs résultats)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
  - [Commande d'entraînement - pi0fast](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
  - [Commande d'entraînement - smolvla (recommandé pour progresser)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
  - [Téléverser le modèle sur HuggingFace (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
  - [Algorithmes d'apprentissage par imitation pris en charge par LeRobot](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
  - [Entraînement local sur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
  - [Obtenir les fichiers de poids du modèle](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
  - [Recommandations sur les paramètres d'entraînement](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
  - [Consulter les courbes d'entraînement en temps réel avec wandb](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)
- **9. Inférence**
  - [Description de la ligne de commande](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
  - [Commande d'inférence - ACT](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
  - [Commande d'inférence - Diffusion](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
  - [Commande d'inférence - pi0.5](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
  - [Commande d'inférence - pi0](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
  - [Commande d'inférence - smolvla](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
  - [Bugs courants et solutions](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
  - [Inférence sur NVIDIA DGX Spark](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
  - [Inférence sur D-Robotics RDK S100](/fr/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)

### Kit de développement Jetson AGX Orin

- [Démarrage rapide](/fr/tutorials/jetson-agx-orin/quick-start)
- [Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates)
- [Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system)
- [Interfaces et disposition matérielle](/fr/tutorials/jetson-agx-orin/interfaces)
- [Présentation du produit](/fr/tutorials/jetson-agx-orin/overview)
- [Inférence LLM locale](/fr/tutorials/jetson-agx-orin/local-llm)
- [IA agentique (NemoClaw)](/fr/tutorials/jetson-agx-orin/agentic-ai)
- [Analyse vidéo DeepStream](/fr/tutorials/jetson-agx-orin/deepstream)
- [Robotique (état des lieux)](/fr/tutorials/jetson-agx-orin/robotics)
- [Efficacité mémoire](/fr/tutorials/jetson-agx-orin/memory-efficiency)
- [Migrer depuis JetPack 6.x](/fr/tutorials/jetson-agx-orin/jetpack-6-to-7)
- [Téléchargements](/fr/tutorials/jetson-agx-orin/downloads)
- [FAQ](/fr/tutorials/jetson-agx-orin/faq)
- [Dépannage](/fr/tutorials/jetson-agx-orin/troubleshooting)
- [Glossaire](/fr/tutorials/jetson-agx-orin/glossary)
- [Journal des modifications](/fr/tutorials/jetson-agx-orin/changelog)

### Kit de développement Jetson Orin Nano Super

- [Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)
- [Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)
- [Vérifier votre système](/fr/tutorials/jetson-orin-nano/verify-your-system)
- [Interfaces et disposition matérielle](/fr/tutorials/jetson-orin-nano/interfaces)
- [Présentation du produit](/fr/tutorials/jetson-orin-nano/overview)
- [Inférence LLM locale](/fr/tutorials/jetson-orin-nano/local-llm)
- [IA agentique (NemoClaw)](/fr/tutorials/jetson-orin-nano/agentic-ai)
- [Analyse vidéo DeepStream](/fr/tutorials/jetson-orin-nano/deepstream)
- [Robotique (état des lieux)](/fr/tutorials/jetson-orin-nano/robotics)
- [Efficacité mémoire](/fr/tutorials/jetson-orin-nano/memory-efficiency)
- [Migrer depuis JetPack 6.x](/fr/tutorials/jetson-orin-nano/jetpack-6-to-7)
- [Téléchargements](/fr/tutorials/jetson-orin-nano/downloads)
- [FAQ](/fr/tutorials/jetson-orin-nano/faq)
- [Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)
- [Glossaire](/fr/tutorials/jetson-orin-nano/glossary)
- [Journal des modifications](/fr/tutorials/jetson-orin-nano/changelog)

### Ressources pédagogiques

- [Ressources pédagogiques](/fr/tutorials/learning-resources/)
- [Incompatibilités PyTorch sur Jetson Orin](/fr/tutorials/learning-resources/jetson-orin-pytorch-compatibility)

### Bras robotiques

- [Série bras robotiques](/fr/tutorials/robot-arms/)
- [Guide de sélection](/fr/tutorials/robot-arms/select-guide)
  - **Série SO-ARM101**
    - [Tutoriel bras robotique LeRobot](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
    - [Guide de montage du bras robotique Lerobot](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
    - [Incompatibilité PyTorch sur Jetson Orin](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)
    - [Support de bras et kit caméra d'environnement SO-ARM100&101 – Tutoriel d'installation](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
    - [Installation du support caméra plafond](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
    - [Téléopération sans fil SO-ARM101 (version ESP32-NanoCam)](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
    - [Dépannage de la téléopération](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
    - [Tutoriel SO-ARM101 bi-bras (double suiveur)](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
    - [Tutoriel d'utilisation de l'outil de calibration des servos de la série SoARM](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
      - **Cours LeRobot**
        - [Présentation du cours LeRobot](/fr/tutorials/robot-arms/so-arm101/lerobot/)
          - **1. Installer LeRobot**
            - [Étape 1 : Installation de l'environnement LeRobot (Ubuntu)](/fr/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu)
            - [Étape 1 : Installation de l'environnement LeRobot (Windows)](/fr/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows)
            - [Étape 1 : Installation de l'environnement LeRobot (macOS)](/fr/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS)
          - **2. Port série**
            - [Étape 2 : Vérification du port série (Ubuntu)](/fr/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu)
            - [Étape 2 : Vérification du port série (Windows)](/fr/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows)
            - [Étape 2 : Vérification du port série (macOS)](/fr/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS)
          - **3. Calibration**
            - [Étape 3 : Calibration du bras (Ubuntu)](/fr/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu)
            - [Étape 3 : Calibration du bras (Windows)](/fr/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows)
            - [Étape 3 : Calibration du bras (macOS)](/fr/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS)
          - **4. Téléopération**
            - [Étape 4 : Téléopération (Ubuntu)](/fr/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu)
            - [Étape 4 : Téléopération (Windows)](/fr/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows)
            - [Étape 4 : Téléopération (macOS)](/fr/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS)
          - **5. Téléop. caméra**
            - [Étape 5 : Téléopération avec caméra (Ubuntu)](/fr/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu)
            - [Étape 5 : Téléopération avec caméra (Windows)](/fr/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows)
            - [Étape 5 : Téléopération avec caméra (macOS)](/fr/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS)
          - **6. Collecte données**
            - [Étape 6 : Collecte du jeu de données par démonstration](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)
            - [Étape 6 : Points d'attention pour la collecte](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
            - [Étape 6 : Créer un compte Hugging Face (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)
            - [Étape 6 : Téléverser le jeu de données (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
          - **7. Entraînement**
            - [Étape 7 : Entraînement local sur Ubuntu](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
            - [Étape 7 : Environnement d'entraînement cloud GPU](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)
            - [Étape 7 : Courbes d'entraînement en temps réel (wandb)](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)
            - [Étape 7 : Téléverser le modèle (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
            - [Étape 7 : Obtenir les fichiers de poids du modèle](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)
            - [Étape 7 : Commande d'entraînement ACT](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT)
            - [Étape 7 : Commande d'entraînement pi0](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0)
            - [Étape 7 : Commande d'entraînement pi0.5](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5)
            - [Étape 7 : Commande d'entraînement pi0fast](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast)
            - [Étape 7 : Commande d'entraînement smolvla](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla)
          - **8. Inférence**
            - [Étape 8 : Description de la ligne de commande](/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)
            - [Étape 8 : Bugs courants et solutions](/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs)
            - [Étape 8 : Commande de déploiement ACT](/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT)
            - [Étape 8 : Commande de déploiement pi0](/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0)
            - [Étape 8 : Commande de déploiement pi0.5](/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5)
            - [Étape 8 : Commande de déploiement smolvla](/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla)
          - **Notions de base**
            - [Découvrir LeRobot](/fr/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
            - [Jeux de données LeRobot sur HuggingFace](/fr/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
            - [Ressources pour l'entraînement de modèles](/fr/tutorials/robot-arms/so-arm101/basics/Training-Resources)
            - [Fichiers d'impression 3D officiels du bras SO-ARM 100](/fr/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
            - [Fichiers URDF et références](/fr/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
          - **Compléments**
            - [Simulation et contrôle ROS2](/fr/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
            - [Installation de la pince à doigts parallèles](/fr/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
  - **Cours SO-ARM101 + AmazingHand**
    - [Aperçu du cours](/fr/tutorials/robot-arms/so-arm-amazinghand/)
      - **Linux**
        - [Phase 1 : Configuration de l'environnement (Linux)](/fr/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux)
        - [Étape 2 : calibration main et bras (Linux)](/fr/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux)
        - [Phase 3 : Téléopération (Linux)](/fr/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux)
        - [Phase 4 : Collecte de données (Linux)](/fr/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux)
        - [Phase 5 : Entraînement du modèle (Linux)](/fr/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux)
        - [Étape 6 : déploiement du modèle (Linux)](/fr/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux)
      - **Windows**
        - [Phase 1 : Configuration de l'environnement (Windows)](/fr/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows)
        - [Étape 2 : calibration main et bras (Windows)](/fr/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows)
        - [Phase 3 : Téléopération (Windows)](/fr/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows)
        - [Phase 4 : Collecte de données (Windows)](/fr/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows)
        - [Phase 5 : Entraînement du modèle (Windows)](/fr/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows)
        - [Étape 6 : déploiement du modèle (Windows)](/fr/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows)
  - **Tutoriels XLeRobot**
    - [Aperçu des tutoriels](/fr/tutorials/robot-arms/xlerobot/)
    - [Configuration (macOS)](/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
    - [Configuration (Ubuntu)](/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
    - [Configuration (Windows)](/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
    - [Déplacer les fichiers XLeRobot](/fr/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
    - [Assemblage du kit monté](/fr/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
    - [Assemblage du kit en pièces](/fr/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)
  - **AmazingHand**
    - [Contrôle d'interface main robotique](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
    - [Documentation produit AmazingHand](/fr/tutorials/robot-arms/amazing-hand/product-info)
    - [Tutoriel d'exécution de l'exemple officiel de la main robotique](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
    - [Tutoriel de débogage de la main robotique (servo TTL)](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)
      - **Débogage servo PWM**
        - [01-Contrôle visuel par GUI](/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control)
        - [02-Tutoriel de suivi de gestes](/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking)
        - [03-Version servomoteurs PWM - Manuel d'utilisation](/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual)
        - [04-Version servomoteurs série - Notice d'utilisation](/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide)
      - **Suivi des gestes**
        - [Déploiement et exécution en un clic sous Linux (Ubuntu)](/fr/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu)
        - [Déploiement et exécution en un clic sous Windows](/fr/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows)
        - [Déploiement et exécution en un clic sous Mac](/fr/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS)
  - **Lekiwi**
    - [Tutoriel d'utilisation du robot mobile Lekiwi](/fr/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)
    - [Tutoriel d'assemblage du robot mobile Lekiwi](/fr/tutorials/robot-arms/lekiwi/Lekiwi-Assembly)

### Capteurs

- [Capteurs et perception](/fr/tutorials/sensors/)
- [Calibration IMU](/fr/tutorials/sensors/imu/calibration)
- [Transfert de fichiers à distance](/fr/tutorials/sensors/imu/remote-file-transfer)
- [Transfert de fichiers SSH](/fr/tutorials/sensors/imu/ssh-file-transfer)
  - **Navigation inertielle IMU**
    - [Informations produit](/fr/tutorials/sensors/imu/product-info)
      - **Exemples multi-cartes**
        - [Aperçu des cas multi-hôtes](/fr/tutorials/sensors/imu/multi-board-examples/overview)
        - [Communication PC](/fr/tutorials/sensors/imu/multi-board-examples/pc-communication)
          - **Communication I2C**
            - [Arduino](/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino)
            - [Jetson](/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson)
            - [Raspberry Pi](/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi)
            - [RDK](/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk)
            - [STM32](/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32)
          - **Communication série**
            - [Arduino](/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino)
            - [Jetson](/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson)
            - [Raspberry Pi](/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi)
            - [RDK](/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk)
            - [STM32](/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32)
      - **Exemples ROS**
        - [Application ROS1](/fr/tutorials/sensors/imu/ros-examples/ros1)
        - [Application ROS2](/fr/tutorials/sensors/imu/ros-examples/ros2)
  - **Module GPS & BeiDou**
    - [Informations module](/fr/tutorials/sensors/gps/GPS-Module-Info)
    - [51 MCU : analyse GPS](/fr/tutorials/sensors/gps/51-MCU-GPS-Parsing)
    - [Arduino : lecture de position](/fr/tutorials/sensors/gps/Arduino-Location-Reading)
    - [Arduino : analyse de position](/fr/tutorials/sensors/gps/Arduino-Location-Parsing)
    - [STM32F103 : sortie analyse GPS](/fr/tutorials/sensors/gps/STM32F103-GPS-Parsing)
    - [Jetson : analyse GPS](/fr/tutorials/sensors/gps/Jetson-GPS-Parsing)
    - [Jetson : positionnement AGNSS](/fr/tutorials/sensors/gps/Jetson-AGNSS)
    - [Jetson : API Baidu Maps](/fr/tutorials/sensors/gps/Jetson-Baidu-Map-API)
    - [Raspberry Pi : analyse GPS](/fr/tutorials/sensors/gps/RaspberryPi-GPS-Parsing)
    - [Raspberry Pi : positionnement AGNSS](/fr/tutorials/sensors/gps/RaspberryPi-AGNSS)
    - [Raspberry Pi : API Baidu Maps](/fr/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API)
    - [ROS : préparation](/fr/tutorials/sensors/gps/ROS-Preparation)
    - [ROS : lecture des données GPS](/fr/tutorials/sensors/gps/ROS-Read-GPS-Data)
    - [ROS : tracer la trace GPS](/fr/tutorials/sensors/gps/ROS-Draw-GPS-Track)
    - [Erreur de localisation sur la carte](/fr/tutorials/sensors/gps/Map-Location-Error)

### Accessoires

- [Accessoires robotiques](/fr/tutorials/accessories/)
  - [Caméra USB à autofocus](/fr/tutorials/accessories/usb-auto-focus-camera)
  - [Caméra CSI Jetson](/fr/tutorials/accessories/jetson-csi-camera)
    - **Module de reconnaissance vocale KWS**
      - [Accueil des tutoriels](/fr/tutorials/accessories/KWS-speech-recognition-module/)
      - [Communication série Jetson Nano](/fr/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication)
      - [Communication série Jetson](/fr/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication)
      - [Communication série PC](/fr/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication)
      - [Communication série Raspberry Pi](/fr/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication)
      - [Visualisation ROS2 RViz2](/fr/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)
      - [Flashage du firmware chinois/anglais](/fr/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
    - **Servos Feetech**
      - [Tutoriel de débogage STS3215 & SCS0009](/fr/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
      - [Protocole de communication SCS](/fr/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
      - [Table mémoire du servo STS à encodeur magnétique](/fr/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
      - [Table mémoire du servo SCSCL à potentiomètre](/fr/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)
      - [Tutoriel d'utilisation de l'outil de débogage du servo SCS0009](/fr/tutorials/accessories/feetech/SCS0009-Debug-Tool)
    - **Module de transmission vidéo ESP32-NanoCam**
      - [ESP32-NanoCam Démarrage rapide](/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
      - [ESP32-NanoCam Spécifications matérielles](/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
      - [ESP32-NanoCam Manuel du protocole série](/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
        - **Tutoriel de vision IA (11 chapitres)**
          - [Chapitre 1 : Configuration de l'environnement](/fr/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
          - [Chapitre 2 : Démarrage rapide](/fr/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start)
          - [Chapitre 3 : Bases de la caméra](/fr/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics)
          - [Chapitre 4 : Détection de visage](/fr/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection)
          - [Chapitre 5 : Détection de visage de chat](/fr/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection)
          - [Chapitre 6 : Reconnaissance des couleurs](/fr/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition)
          - [Chapitre 7 : Scan de QR codes](/fr/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning)
          - [Chapitre 8 : Reconnaissance faciale](/fr/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition)
          - [Chapitre 9 : Dialogue vocal](/fr/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat)
          - [Chapitre 10 : Compréhension visuelle par IA](/fr/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding)
          - [Chapitre 11 : Contrôle vocal ESP-Claw](/fr/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control)
    - **Tutoriels caméra CSI**
      - [Configuration caméra CSI Jetson](/fr/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup)
      - [Utilisation de la caméra autofocus](/fr/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)
      - [Utiliser Jupyter Lab](/fr/tutorials/accessories/csi-camera/03-JupyterLab)
      - [Utiliser JetCam](/fr/tutorials/accessories/csi-camera/04-JetCam)
      - [IMX219 sur Raspberry Pi](/fr/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi)
    - **Module d'interaction vocale IA**
      - [Démarrage rapide](/fr/tutorials/accessories/ai-voice-module/Quick-Start)
      - [Informations produit](/fr/tutorials/accessories/ai-voice-module/Product-Info)
      - [Flashage du micrologiciel du module](/fr/tutorials/accessories/ai-voice-module/Firmware-Flashing)
      - [Modifier le mot de réveil et les mots de commande](/fr/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
      - [Création d'entrées de protocole personnalisées](/fr/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
      - [Interaction vocale ROS1](/fr/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction)
      - [Interaction vocale ROS2](/fr/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
      - [Protocole du port série](/fr/tutorials/accessories/ai-voice-module/Serial-Protocol)
      - [Protocole IIC](/fr/tutorials/accessories/ai-voice-module/IIC-Protocol)
      - [Communication PC](/fr/tutorials/accessories/ai-voice-module/PC-Communication)
      - [Arduino: Communication par port série](/fr/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication)
      - [Arduino: Communication IIC](/fr/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
      - [Jetson: Communication par port série](/fr/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication)
      - [Jetson: Communication IIC](/fr/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
      - [RDK: Communication par port série](/fr/tutorials/accessories/ai-voice-module/RDK-Serial-Communication)
      - [RDK: Communication IIC](/fr/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
      - [Raspberry Pi: Communication par port série](/fr/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication)
      - [Raspberry Pi: Communication IIC](/fr/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)
  - [Cardan 2-DOF](/fr/tutorials/accessories/2dof-camera-gimbal)
- [Capteur de fréquence cardiaque et SpO2](/fr/tutorials/accessories/heart-rate-spo2)
- [Écran OLED 0,91 pouce](/fr/tutorials/accessories/0.91-oled-screen-tutorial)
- [Carte de capture HDMI 4K](/fr/tutorials/accessories/4k-hdmi-capture-tutorial)
- [Switch KVM](/fr/tutorials/accessories/kvm-switch-tutorial)
- [Carte son USB sans pilote](/fr/tutorials/accessories/usb-audio-card-tutorial)

## Mode d'emploi

1. **Choisissez une catégorie** : sélectionnez la catégorie de sujet correspondant à vos centres d'intérêt ou à vos besoins
2. **Consultez la liste des tutoriels** : dans chaque catégorie, parcourez les tutoriels et documents disponibles
3. **Suivez les étapes** : suivez les étapes des tutoriels pour apprendre et utiliser le produit progressivement
4. **Pratiquez et explorez** : lors de l'utilisation réelle, essayez différentes fonctions et configurations afin d'accumuler de l'expérience

## Autres ressources

- Pour toute question ou suggestion, visitez notre dépôt GitHub et soumettez une Issue
- Suivez notre blog et nos réseaux sociaux pour connaître les dernières mises à jour produits et informations de tutoriels
