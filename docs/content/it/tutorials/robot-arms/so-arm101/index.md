---
title: "Tutorial del braccio robotico SO-ARM101"
description: "Pagina iniziale del tutorial SO-ARM101: cosa sono l'intelligenza incarnata e LeRobot, il braccio, la configurazione del computer necessaria e cosa significa imitation learning (VLA), con la navigazione completa del corso."
---

# Tutorial del braccio robotico SO-ARM101

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## Che cos'è l'intelligenza embodied?

Intelligenza dotata di un corpo. Collega l'IA a diverse entità hardware fisiche, come:

Robot quadrupedi simili a cani, robot umanoidi bipedi, robot a ruote e zampe, droni, auto a guida autonoma

## Che cos'è LeRobot?

LeRobot è il `framework software open source per robot intelligenti embodied` di HuggingFace

Indirizzo GitHub: https://github.com/huggingface/lerobot

Abbassa la barriera per la **raccolta dati, l'addestramento degli algoritmi e il deployment dell'inferenza** nel reinforcement learning e nell'**imitation learning (VLA)**, con l'**imitation learning (VLA)** come focus principale

- Quali robot si possono sviluppare con LeRobot?

Dal braccio robotico SO-ARM 101 e dal carrello LeKiwi nella fascia dei mille yuan, fino al braccio AgileX piper nella fascia delle decine di migliaia di yuan, al braccio StarAI di Huaxinjing e alla mano dexterous Hope-JR, e ancora al robot umanoide Unitree G1 nella fascia delle centinaia di migliaia di yuan. LeRobot è diventato lo standard per la raccolta dati e l'addestramento degli algoritmi nel settore dell'intelligenza embodied.

Puoi anche adattare il tuo robot al framework LeRobot.

- Dataset e modelli LeRobot

LeRobot definisce un proprio formato di dataset per l'imitation learning. Puoi visualizzare, usare, scaricare e addestrare tutti i dataset e i modelli pubblici su HuggingFace, e puoi anche caricare i tuoi dataset su HuggingFace.

## Che cos'è il braccio robotico SO-ARM 101?

Questo tutorial prende come esempio il braccio robotico SO-ARM 101; utilizza parti strutturali stampate in 3D e servo Feetech, a un costo molto basso.

È un corpo per l'intelligenza embodied che anche uno studente senza grandi mezzi può permettersi, ed è uno dei corpi ufficialmente consigliati da LeRobot.

Il braccio è composto da due bracci: un braccio Leader e un braccio Follower. Ogni braccio ha 5 gradi di libertà più 1 grado di libertà del gripper.

## Quale configurazione del computer mi serve

Un normale portatile Windows gestisce tutto fino all'addestramento.

Un normale Mac gestisce tutto.

Una macchina Ubuntu con una GPU NVIDIA gestisce tutto.

In questo tutorial usiamo una [piattaforma GPU cloud](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) per addestrare i modelli, quindi il tuo computer non ha bisogno di una configurazione di fascia alta.

## Che cos'è l'**Imitation Learning e il VLA**?

Gli esseri umani trascinano il robot per dimostrare le azioni e raccogliere un dataset. Quel dataset viene poi usato per addestrare un algoritmo di imitation learning, che infine viene distribuito sul robot, permettendogli di imitare autonomamente le azioni umane e di generalizzare all'ambiente reale. Non servono teleoperazione né controllo remoto.

Ad esempio, nel video qui sopra, una persona trascina il braccio robotico SO-ARM per afferrare un gambero di fiume, intingerlo nel condimento e lasciarlo cadere nell'olio bollente, e alla fine il braccio esegue quest'azione da solo. Anche con un gambero nuovo, è in grado di reagire e completare l'azione in qualsiasi momento.

L'imitation learning ha anche un nome all'avanguardia e alla moda: VLA (modello di grandi dimensioni Vision-Language-Action). È anche il campo di ricerca sull'intelligenza embodied che oggi si sviluppa più rapidamente, che attira gli investimenti più caldi, che vede la competizione Cina-USA più accesa, che gode dell'ecosistema open source più florido, che richiama un'intensa attenzione mediatica e che attrae innumerevoli studenti di laurea magistrale e dottorato.

Gli algoritmi che LeRobot adatta principalmente sono quelli di imitation learning, come ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS e altri.

L'imitation learning di questo tutorial è esclusivamente VLA.


## Navigazione dei tutorial

### Corsi completi

- [Panoramica del corso LeRobot](/it/tutorials/robot-arms/so-arm101/lerobot/)
- [SO-ARM101 Braccio robotico 7 assi · Tutorial](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### Tutorial di montaggio ed espansione

- [Tutorial braccio robotico LeRobot](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guida di montaggio del braccio robotico Lerobot](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Supporto da braccio e kit camera ambientale SO-ARM100&101 – Tutorial di installazione](/it/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [Installazione del supporto camera overhead](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [Installazione della pinza a dita parallele](/it/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [SO-ARM101 Tutorial bi-braccio (doppio follower)](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [SO-ARM101 Teleoperazione wireless (versione ESP32-NanoCam)](/it/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [Risoluzione problemi di teleoperazione](/it/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [Tutorial d'uso del tool di calibrazione servo della serie SoARM](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [Controllo di simulazione ROS2](/it/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [Incompatibilità PyTorch su Jetson Orin](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### Nozioni di base

- [Conoscere LeRobot](/it/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [Dataset LeRobot su HuggingFace](/it/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [Materiali per l'addestramento del modello](/it/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [File di stampa 3D ufficiali del braccio SO-ARM 100](/it/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [File URDF e materiali di riferimento](/it/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [Staffe e supporti per telecamere consigliati](/it/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### Tutorial LeLab

- [1 · Panoramica](/it/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · Installazione e avvio](/it/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · Collegamento e calibrazione](/it/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · Teleoperazione](/it/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · Registrare un dataset](/it/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · Addestrare ed eseguire l'inferenza](/it/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · Risoluzione dei problemi](/it/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)
,### Tutorial di simulazione MuJoCo,,- [SO-ARM101 × MuJoCo — Tutorial completo del flusso di lavoro (indice)](/it/tutorials/robot-arms/so-arm101/mujoco/),- [01 · Preparazione dell'ambiente](/it/tutorials/robot-arms/so-arm101/mujoco/01-Environment),- [02 · Verifica del modello di simulazione (caricamento e azionamento MJCF)](/it/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification),- [03 · Connessione al robot reale e calibrazione](/it/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration),- [04 · Teleoperazione da tastiera](/it/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop),- [05 · Digital twin del braccio leader (braccio fisico che guida il braccio simulato)](/it/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin),- [06 · Registrazione e riproduzione dei dati](/it/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay),- [07 · Problemi comuni ed esperienze](/it/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting),- [08 · Roadmap](/it/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap),- [09 · Tutorial d'uso completo (avvio del braccio → dataset → visione dei video → addestramento → deployment)](/it/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)

### Tutorial dell'immagine Docker XLeRobot

- [Tutorial XLeRobot Docker — Kit di sviluppo Jetson AGX Orin](/it/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [Tutorial XLeRobot Docker — Kit di sviluppo Jetson Orin Nano Super](/it/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
