---
title: Serie Roboterarme
description: "Juxi Technology Tutorial-Homepage Roboterarme — SO-ARM101, AmazingHand, Lekiwi, XLeRobot"
---

# Serie Roboterarme

Willkommen zur Tutorial-Serie Roboterarme! Hier finden Sie vollständige Anleitungen für Open-Source-Roboterarme und Greifhände.

---

## Produktliste

- [Auswahlhilfe](./select-guide.md)

### SO-ARM101

6-Achsen-Desktop-Roboterarm, unterstützt KI-Frameworks wie LeRobot.

- [SO-ARM101-Tutorial](./so-arm101/SO-ARM101-Tutorial.md)
- [SO-ARM101-Montage](./so-arm101/SO-ARM101-Assembly.md)
- [SO-ARM101 Jetson-Orin-PyTorch-Kompatibilität](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [SO-ARM101 Drahtlose Teleoperation (ESP32-NanoCam-Version)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [SO-ARM101 Zweiarm-Tutorial (zwei Folgearme)](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [SoARM-Servo-Kalibrierungstool](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### SO-ARM101-Serie
- [SO-ARM100&101 Armhalterung und Umgebungskamera-Kit – Montage-Tutorial](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)
- [Overhead-Kamera-Halterung Montage](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. LeRobot-Umgebung
- [Schritt 1: LeRobot-Umgebung installieren (Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [Schritt 1: LeRobot-Umgebung installieren (Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [Schritt 1: LeRobot-Umgebung installieren (macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. Serielle Ports
- [Schritt 2: Ports der seriellen Geräte anzeigen (Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [Schritt 2: Ports der seriellen Geräte anzeigen (Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [Schritt 2: Ports der seriellen Geräte anzeigen (macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. Kalibrierung
- [Schritt 3: Roboterarm kalibrieren (Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [Schritt 3: Roboterarm kalibrieren (Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [Schritt 3: Roboterarm kalibrieren (macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. Teleoperation
- [Schritt 4: Teleoperation (Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [Schritt 4: Teleoperation (Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [Schritt 4: Teleoperation (macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. Teleop mit Kamera
- [Schritt 5: Teleoperation mit Kamera (Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [Schritt 5: Teleoperation mit Kamera (Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [Schritt 5: Teleoperation mit Kamera (macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. Datenerfassung
- [Schritt 6: Datensatz durch Demonstration erfassen](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [Schritt 6: Hinweise zum Erfassen von Datensätzen](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [Schritt 6: Hugging-Face-Konto registrieren (optional)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [Schritt 6: Datensatz auf HuggingFace hochladen (optional)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. Modelltraining
- [Schritt 7: Lokales Training unter Ubuntu](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [Schritt 7: Cloud-GPU-Trainingsumgebung einrichten](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [Schritt 7: Trainingskurven in Echtzeit mit wandb anzeigen](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [Schritt 7: Modell zu HuggingFace hochladen (optional)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [Schritt 7: Modelldateien abrufen](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [Schritt 7: Trainingsbefehl für ACT](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [Schritt 7: Trainingsbefehl für pi0](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [Schritt 7: Trainingsbefehl für pi0.5](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [Schritt 7: Trainingsbefehl für pi0fast](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [Schritt 7: Trainingsbefehl für SmolVLA](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. Modell-Inferenz
- [Schritt 8: Erläuterung der Befehle](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [Schritt 8: Häufige Bugs und Lösungen](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [Schritt 8: Deploy-Befehl für ACT](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [Schritt 8: Deploy-Befehl für pi0](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [Schritt 8: Deploy-Befehl für pi0.5](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [Schritt 8: Deploy-Befehl für SmolVLA](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### Grundlagen
- [LeRobot kennenlernen](./so-arm101/basics/Understanding-LeRobot.md)
- [LeRobot-Datensätze auf HuggingFace](./so-arm101/basics/HF-Datasets.md)
- [Materialien zum Modelltraining](./so-arm101/basics/Training-Resources.md)
- [Offizielle 3D-Druckdateien für den SO-ARM 100 Roboterarm](./so-arm101/basics/Official-3D-Print-Files.md)
- [URDF-Dateien und Referenzmaterial](./so-arm101/basics/URDF-Reference.md)

#### Weitere Themen
- [ROS2-Simulationssteuerung](./so-arm101/ROS2-Simulation-Control.md)
- [Montageanleitung für den Parallelbacken-Greifer](./so-arm101/Parallel-Finger-Gripper-Installation.md)


### SO-ARM101 Roboterarm 7-Achsen Tutorial

- [SO-ARM101 Roboterarm 7-Achsen Tutorial](/tutorials/robot-arms/so-arm101/lerobot-7dof/)
- **1. LeRobot-Umgebung**
  - [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
  - [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
  - [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)
- **2. Dateien ersetzen (Anpassung an 7-DOF)**
  - [Dateien ersetzen (Anpassung an 7-DOF)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- **3. Serielle Ports**
  - [Ubuntu](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
  - [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
  - [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)
- **4. Kalibrierung**
  - [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
  - [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
  - [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)
- **5. Teleoperation**
  - [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
  - [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
  - [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)
- **6. Teleop mit Kamera**
  - [Ubuntu-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
  - [Windows-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
  - [Mac-Computer](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)
- **7. Datenerfassung**
  - [Datensatz ansehen und wiedergeben](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
  - [Hinweise zum Erfassen von Datensätzen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
  - [Hugging Face-Konto registrieren (optional)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
  - [Datensatz auf HuggingFace hochladen (optional)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
  - [Datensatz durch Demonstration erfassen-Handschlag 200](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
  - [Datensatz durch Demonstration erfassen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)
- **8. Modelltraining**
  - [Cloud-GPU-Trainingsumgebung einrichten](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
  - [Trainingsbefehl-ACT (empfohlen für den Einstieg)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
  - [Trainingsbefehl-Diffusion](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
  - [Trainingsbefehl-pi0.5](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
  - [Trainingsbefehl-pi0 (beste Ergebnisse)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
  - [Trainingsbefehl-pi0fast](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
  - [Trainingsbefehl-smolvla (empfohlen für Fortgeschrittene)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
  - [Modell zu HuggingFace hochladen (optional)](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
  - [Von LeRobot unterstützte Imitation-Learning-Algorithmen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
  - [Lokales Training unter Ubuntu](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
  - [Modelldateien abrufen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
  - [Empfehlungen für Trainingsparameter](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
  - [Trainingskurven in Echtzeit mit wandb anzeigen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)
- **9. Modell-Inferenz**
  - [Erläuterung der Befehle](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
  - [Inferenzbefehl-ACT](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
  - [Inferenzbefehl-Diffusion](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
  - [Inferenzbefehl-pi0.5](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
  - [Inferenzbefehl-pi0](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
  - [Inferenzbefehl-smolvla](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
  - [Häufige Bugs und Lösungen](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
  - [Inferenz mit dem NVIDIA DGX Spark](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
  - [Inferenz mit dem D-Robotics RDK S100](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)

### AmazingHand

Open-Source-Greifhand mit hochpräziser Mehrfinger-Manipulation.

- [AmazingHand-Schnittstellensteuerung](./amazing-hand/AmazingHand-Interface-Control.md)
- [AmazingHand Offizielles Beispiel](./amazing-hand/AmazingHand-Official-Example.md)
- [AmazingHand-TTL-Debugging](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [AmazingHand Fingerhand Produktinformationen](./amazing-hand/product-info.md)

#### PWM-Servo-Debugging
- [01-GUI-visuelle Steuerung](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-Gesten-Tracking-Tutorial](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM-Servo-Version - Handbuch](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Serienservo-Version - Benutzungshinweise](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### Gestenverfolgung
- [Linux（Ubuntu）Ein-Klick-Deployment und -Ausführung](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Windows Ein-Klick-Deployment und -Ausführung](./amazing-hand/gesture-tracking/02-Windows.md)
- [Mac Ein-Klick-Deployment und -Ausführung](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

Vollständig Open-Source-Mobilroboter, kompatibel mit LeRobot Imitation-Learning und SO101-Arm.

- [Lekiwi-Tutorial](./lekiwi/Lekiwi-Tutorial.md)
- [Lekiwi-Montage](./lekiwi/Lekiwi-Assembly.md)
- [Produktinformationen](./lekiwi/Lekiwi-Product-Info.md)

### SO-ARM101 + AmazingHand Kurs

Kompletter Workflow für SO-ARM101-Folgearm + AmazingHand: Einrichtung, Kalibrierung, Teleoperation, Datenerfassung, Modelltraining und Deployment (Windows/Linux).

- [Kursübersicht](./so-arm-amazinghand/index.md)

#### Linux

- [Stufe 1: Umgebung einrichten (Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [Stufe 2: Hand- & Arm-Kalibrierung (Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [Stufe 3: Teleoperation (Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [Stufe 4: Datenerfassung (Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [Stufe 5: Modelltraining (Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [Stufe 6: Modell-Deployment (Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [Stufe 1: Umgebung einrichten (Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [Stufe 2: Hand- & Arm-Kalibrierung (Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [Stufe 3: Teleoperation (Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [Stufe 4: Datenerfassung (Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [Stufe 5: Modelltraining (Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [Stufe 6: Modell-Deployment (Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### XLeRobot-Tutorials

XLeRobot-Tutorials: Umgebung einrichten, Dateien verteilen, Montage (fertig/Einzelteile).

- [Tutorial-Übersicht](./xlerobot/index.md)
- [Umgebung einrichten (macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [Umgebung einrichten (Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [Umgebung einrichten (Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [XLeRobot-Dateien verschieben](./xlerobot/02-Move-Xlerobot-Files.md)
- [Montage (fertiger Bausatz)](./xlerobot/03-Assembly-Assembled-Kit.md)
- [Montage (Einzelteile)](./xlerobot/04-Assembly-Parts-Kit.md)

---

## Support

Bei Fragen kontaktieren Sie uns:

- 📧 E-Mail:support@juxitech.com
- 💬 GitHub Issues:[Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
