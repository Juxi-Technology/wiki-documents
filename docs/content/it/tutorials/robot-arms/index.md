---
title: Serie bracci robotici
description: "Home dei tutorial dei bracci robotici di Juxi Technology — SO-ARM101, AmazingHand, Lekiwi, XLeRobot"
---

# Serie bracci robotici

Benvenuti nei tutorial della serie bracci robotici! Guide complete per bracci robotici open source e mani dexterous.

---

## Elenco prodotti

- [Guida alla scelta](./select-guide.md)

### SO-ARM101

Braccio robotico da scrivania open source a 6 assi, compatibile con framework IA come LeRobot.

- [Tutorial SO-ARM101](./so-arm101/SO-ARM101-Tutorial.md)
- [Montaggio SO-ARM101](./so-arm101/SO-ARM101-Assembly.md)
- [Compatibilità PyTorch Jetson Orin SO-ARM101](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [SO-ARM101 Teleoperazione wireless (versione ESP32-NanoCam)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [SO-ARM101 Tutorial bi-braccio (doppio follower)](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [Strumento di calibrazione servomotori serie SoARM](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### Serie SO-ARM101
- [Installazione del supporto camera overhead](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. Ambiente LeRobot
- [Passo 1: Installare l\'ambiente LeRobot (Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [Passo 1: Installare l\'ambiente LeRobot (Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [Passo 1: Installare l\'ambiente LeRobot (macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. Porte seriali
- [Passo 2: Visualizzare le porte seriali (Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [Passo 2: Visualizzare le porte seriali (Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [Passo 2: Visualizzare le porte seriali (macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. Calibrazione
- [Passo 3: Calibrare il braccio robotico (Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [Passo 3: Calibrare il braccio robotico (Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [Passo 3: Calibrare il braccio robotico (macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. Teleoperazione
- [Passo 4: Teleoperazione (Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [Passo 4: Teleoperazione (Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [Passo 4: Teleoperazione (macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. Con telecamera
- [Passo 5: Teleoperazione con telecamera (Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [Passo 5: Teleoperazione con telecamera (Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [Passo 5: Teleoperazione con telecamera (macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. Raccolta dataset
- [Passo 6: Raccolta del dataset tramite insegnamento](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [Passo 6: Note sulla raccolta del dataset](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [Passo 6: Registrare un account Hugging Face (opzionale)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [Passo 6: Caricare il dataset su HuggingFace (opzionale)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. Addestramento
- [Passo 7: Addestramento su Ubuntu locale](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [Passo 7: Ambiente di addestramento su GPU cloud](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [Passo 7: Curve di addestramento in tempo reale con wandb](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [Passo 7: Caricare il modello su HuggingFace (opzionale)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [Passo 7: Ottenere il file dei pesi del modello](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [Passo 7: Comando di addestramento ACT](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [Passo 7: Comando di addestramento pi0](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [Passo 7: Comando di addestramento pi0.5](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [Passo 7: Comando di addestramento pi0fast](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [Passo 7: Comando di addestramento SmolVLA](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. Deployment
- [Passo 8: Descrizione dei comandi di deployment](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [Passo 8: Bug comuni e soluzioni](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [Passo 8: Comando di deployment ACT](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [Passo 8: Comando di deployment pi0](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [Passo 8: Comando di deployment pi0.5](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [Passo 8: Comando di deployment SmolVLA](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### Nozioni di base
- [Conoscere LeRobot](./so-arm101/basics/Understanding-LeRobot.md)
- [Dataset LeRobot su HuggingFace](./so-arm101/basics/HF-Datasets.md)
- [Materiali per l\'addestramento del modello](./so-arm101/basics/Training-Resources.md)
- [File di stampa 3D ufficiali del braccio SO-ARM 100](./so-arm101/basics/Official-3D-Print-Files.md)
- [File URDF e materiali di riferimento](./so-arm101/basics/URDF-Reference.md)

#### Approfondimenti
- [Controllo di simulazione ROS2](./so-arm101/ROS2-Simulation-Control.md)
- [Installazione della pinza a dita parallele](./so-arm101/Parallel-Finger-Gripper-Installation.md)

- [Supporto da braccio e kit camera ambientale SO-ARM100&101 – Tutorial di installazione](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)


### SO-ARM101 Braccio robotico 7 assi · Tutorial

- [SO-ARM101 Braccio robotico 7 assi · Tutorial](/tutorials/robot-arms/so-arm101/lerobot-7dof/)
- **1. Ambiente LeRobot**
  - [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
  - [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
  - [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)
- **2. Sostituire i file (adattamento a 7DOF)**
  - [Sostituire i file (adattamento a 7DOF)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- **3. Porte seriali**
  - [Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
  - [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
  - [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)
- **4. Calibrazione**
  - [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
  - [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
  - [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)
- **5. Teleoperazione**
  - [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
  - [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
  - [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)
- **6. Con telecamera**
  - [Computer Ubuntu](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
  - [Computer Windows](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
  - [Computer Mac](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)
- **7. Raccolta dataset**
  - [Rivedere e riprodurre il dataset](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
  - [Note sulla raccolta del dataset](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
  - [Registrare un account Hugging Face (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
  - [Caricare il dataset su HuggingFace (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
  - [Raccolta del dataset tramite insegnamento-Stretta di mano 200](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
  - [Raccolta del dataset tramite insegnamento](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)
- **8. Addestramento**
  - [Configurazione dell'ambiente di addestramento su GPU cloud](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
  - [Comando di addestramento-ACT (consigliato per iniziare)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
  - [Comando di addestramento-Diffusion](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
  - [Comando di addestramento-pi0.5](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
  - [Comando di addestramento-pi0 (risultati migliori)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
  - [Comando di addestramento-pi0fast](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
  - [Comando di addestramento-smolvla (consigliato per progredire)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
  - [Caricare il modello su HuggingFace (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
  - [Algoritmi di apprendimento per imitazione supportati da LeRobot](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
  - [Addestramento su Ubuntu locale](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
  - [Ottenere il file dei pesi del modello](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
  - [Suggerimenti sui parametri di addestramento](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
  - [Curve di addestramento in tempo reale con wandb](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)
- **9. Deployment**
  - [Descrizione dei comandi](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
  - [Comando di inferenza-ACT](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
  - [Comando di inferenza-Diffusion](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
  - [Comando di inferenza-pi0.5](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
  - [Comando di inferenza-pi0](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
  - [Comando di inferenza-smolvla](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
  - [Bug comuni e soluzioni](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
  - [Inferenza su NVIDIA DGX Spark](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
  - [Inferenza su D-Robotics RDK S100](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)

### AmazingHand

Mano dexterous open source con manipolazione multi-dito ad alta precisione.

- [Controllo interfaccia AmazingHand](./amazing-hand/AmazingHand-Interface-Control.md)
- [Esempio ufficiale AmazingHand](./amazing-hand/AmazingHand-Official-Example.md)
- [Debug TTL AmazingHand](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [Scheda prodotto AmazingHand](./amazing-hand/product-info.md)

#### Debug servo PWM
- [01-Controllo visuale tramite GUI](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutorial del tracciamento dei gesti](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-Versione con servomotori PWM-Manuale d\'uso](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Versione con servomotori seriali-Istruzioni per l\'uso](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### Tracciamento gesti
- [Distribuzione ed esecuzione in un clic su Linux（Ubuntu）](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Distribuzione ed esecuzione in un clic su Windows](./amazing-hand/gesture-tracking/02-Windows.md)
- [Distribuzione ed esecuzione in un clic su Mac](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

Robot mobile completamente open source, compatibile con LeRobot imitation learning e braccio SO101.

- [Tutorial Lekiwi](./lekiwi/Lekiwi-Tutorial.md)
- [Montaggio Lekiwi](./lekiwi/Lekiwi-Assembly.md)
- [Informazioni sul prodotto](./lekiwi/Lekiwi-Product-Info.md)

### Corso SO-ARM101 + AmazingHand

Flusso completo SO-ARM101 + AmazingHand: configurazione, calibrazione, teleoperazione, raccolta dati, addestramento e deployment (Windows / Linux).

- [Panoramica del corso](./so-arm-amazinghand/index.md)

#### Linux

- [Fase 1: configurazione ambiente (Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [Fase 2: calibrazione mano e bracci (Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [Fase 3: teleoperazione (Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [Fase 4: raccolta dati (Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [Fase 5: addestramento modello (Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [Fase 6: deployment modello (Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [Fase 1: configurazione ambiente (Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [Fase 2: calibrazione mano e bracci (Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [Fase 3: teleoperazione (Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [Fase 4: raccolta dati (Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [Fase 5: addestramento modello (Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [Fase 6: deployment modello (Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### Tutorial XLeRobot

Tutorial XLeRobot: configurazione, distribuzione file, montaggio (kit assemblato/a pezzi).

- [Panoramica dei tutorial](./xlerobot/index.md)
- [Configurazione (macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [Configurazione (Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [Configurazione (Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [Spostare i file XLeRobot](./xlerobot/02-Move-Xlerobot-Files.md)
- [Montaggio kit assemblato](./xlerobot/03-Assembly-Assembled-Kit.md)
- [Montaggio kit a pezzi](./xlerobot/04-Assembly-Parts-Kit.md)

---

## Supporto

Per domande, contattaci:

- 📧 E-mail: support@juxitech.com
- 💬 GitHub Issues: [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
