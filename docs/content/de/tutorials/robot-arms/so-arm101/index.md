---
title: "SO-ARM101 Roboterarm-Tutorials"
description: "Tutorial-Startseite zum SO-ARM101: Was embodied AI und LeRobot sind, was der Arm kann, welche Computer-Konfiguration nötig ist und was Imitationslernen (VLA) bedeutet – plus die komplette Kursnavigation."
---

# SO-ARM101 Roboterarm-Tutorials

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## Was ist verkörperte Intelligenz?

Intelligenz mit einem Körper. Sie verbindet KI mit verschiedenen physischen Hardware-Einheiten, wie zum Beispiel:

Vierbeinige Roboterhunde, zweibeinige humanoide Roboter, radgetriebene Roboter, Drohnen, selbstfahrende Autos

## Was ist LeRobot?

LeRobot ist HuggingFaces quelloffenes `Software-Framework für verkörperte intelligente Roboter`

GitHub-Adresse: https://github.com/huggingface/lerobot

Es senkt die Hürden für **Datenerfassung, Algorithmustraining und Inferenz-Deployment** für bestärkendes Lernen und **Imitationslernen (VLA)**, wobei **Imitationslernen (VLA)** im Mittelpunkt steht

- Welche Roboter lassen sich mit LeRobot entwickeln?

Vom Roboterarm SO-ARM 101 in der Tausende-Yuan-Klasse und dem LeKiwi-Wagen über den AgileX-Piper-Arm in der Zehntausende-Yuan-Klasse, den StarAI-Arm von Huaxinjing und die Hope-JR-Fingerhand bis hin zum humanoiden Unitree-G1-Roboter in der Hunderttausende-Yuan-Klasse. LeRobot hat sich zum Standard für Datenerfassung und Algorithmustraining in der Branche der verkörperten Intelligenz entwickelt.

Sie können auch Ihren eigenen Roboter an das LeRobot-Framework anpassen.

- LeRobot-Datensätze und -Modelle

LeRobot definiert ein eigenes Datensatzformat für das Imitationslernen. Sie können alle öffentlichen Datensätze und Modelle auf HuggingFace ansehen, verwenden, herunterladen und damit trainieren; außerdem können Sie Ihre eigenen Datensätze auf HuggingFace hochladen.

## Was ist der Roboterarm SO-ARM 101?

Dieses Tutorial verwendet den Roboterarm SO-ARM 101 als Beispiel; er nutzt 3D-gedruckte Strukturteile und Feetech-Servos und ist damit sehr kostengünstig.

Das ist ein Körper für verkörperte Intelligenz, den sich selbst ein armer Student leisten kann, und einer der von LeRobot offiziell empfohlenen Körper.

Der Arm besteht aus zwei Armen: einem Leader-Arm und einem Follower-Arm. Jeder Arm hat 5 Freiheitsgrade plus 1 Freiheitsgrad für den Greifer.

## Welche Computer-Konfiguration brauche ich

Ein gewöhnlicher Windows-Laptop bewältigt alles bis zum Training.

Ein gewöhnlicher Mac bewältigt alles.

Ein Ubuntu-Rechner mit einer NVIDIA-GPU bewältigt alles.

In diesem Tutorial nutzen wir eine [Cloud-GPU-Plattform](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) zum Trainieren der Modelle, sodass Ihr eigener Computer keine High-End-Konfiguration benötigt.

## Was ist **Imitationslernen und VLA**?

Menschen führen den Roboter, um etwas vorzumachen, und erfassen dabei einen Datensatz. Dieser Datensatz wird dann zum Trainieren eines Imitationslern-Algorithmus verwendet, der schließlich auf dem Roboter eingesetzt wird und ihn menschliche Aktionen autonom nachahmen und auf die reale Umgebung übertragen lässt. Teleoperation oder Fernsteuerung ist dafür nicht nötig.

Im obigen Video zieht beispielsweise ein Mensch den SO-ARM-Roboterarm, um einen Flusskrebs zu greifen, ihn in Gewürz zu tauchen und in heißes Öl fallen zu lassen; am Ende führt der Arm diese Aktion selbstständig aus. Selbst mit einem neuen Flusskrebs kann er jederzeit reagieren und die Aktion abschließen.

Imitationslernen hat auch einen hochmodernen, modischen Namen: VLA (Vision-Language-Action-Großmodell). Das ist zugleich das Forschungsfeld der verkörperten Intelligenz, das sich derzeit am schnellsten entwickelt, die heißesten Investitionen anzieht, den schärfsten Wettbewerb zwischen China und den USA erlebt, das blühendste Open-Source-Ökosystem genießt, starke Medienaufmerksamkeit erregt und unzählige Master- und Doktoranden anzieht.

Die Algorithmen, die LeRobot hauptsächlich adaptiert, sind solche des Imitationslernens, darunter ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS und weitere.

Das Imitationslernen in diesem Tutorial ist ausschließlich VLA.


## Tutorial-Navigation

### Komplette Kurse

- [LeRobot-Komplettkurs](/de/tutorials/robot-arms/so-arm101/lerobot/)
- [SO-ARM101 Roboterarm 7-Achsen Tutorial](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### Montage- und Erweiterungs-Tutorials

- [LeRobot-Roboterarm-Tutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Lerobot-Roboterarm-Montageanleitung](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [SO-ARM100&101 Armhalterung und Umgebungskamera-Kit – Montage-Tutorial](/de/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [Overhead-Kamera-Halterung Montage](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [Montageanleitung für den Parallelbacken-Greifer](/de/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [SO-ARM101 Zweiarm-Tutorial (zwei Folgearme)](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [SO-ARM101 Drahtlose Teleoperation (ESP32-NanoCam-Version)](/de/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [Teleoperation-Fehlerbehebung](/de/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [SoARM-Servo-Kalibrierungstool – Anleitung](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [ROS2-Simulationssteuerung](/de/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [PyTorch-Inkompatibilität auf Jetson Orin](/de/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### Grundlagen

- [LeRobot kennenlernen](/de/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [LeRobot-Datensätze auf HuggingFace](/de/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [Materialien zum Modelltraining](/de/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [Offizielle 3D-Druckdateien für den SO-ARM 100 Roboterarm](/de/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [URDF-Dateien und Referenzmaterial](/de/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [Empfohlene Kamera-Halterungen und -Montagevorrichtungen](/de/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### LeLab-Tutorial

- [1 · Überblick](/de/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · Installation und Start](/de/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · Verbinden und kalibrieren](/de/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · Teleoperation](/de/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · Ein Dataset aufzeichnen](/de/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · Trainieren und Inferenz ausführen](/de/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · Fehlerbehebung](/de/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)

### XLeRobot-Docker-Image-Tutorial

- [XLeRobot Docker Tutorial — Jetson AGX Orin Developer Kit](/de/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [XLeRobot Docker Tutorial — Jetson Orin Nano Super Developer Kit](/de/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
