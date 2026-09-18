---
title: "File URDF e materiali di riferimento"
description: "File URDF e risorse di riferimento: URDF Studio, simulazione ROS2, interfaccia grafica LeRobot, teleoperazione da smartphone e calibrazione dei servi."
---

# File URDF e materiali di riferimento

## [File URDF](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf) ufficiale di Lerbot

### URDF Studio

https://urdf.d-robotics.cc/

### Controllo di simulazione ROS2 (realizzabile autonomamente)

https://github.com/holmsslk/so-arm-moveit-hardware

### Interfaccia grafica ufficiale di LeRobot

https://github.com/huggingface/leLab

LeLab è un'applicazione web che integra in un'unica interfaccia del browser l'intero flusso di lavoro di LeRobot: calibrazione, teleoperazione, registrazione, addestramento, riproduzione. È sufficiente collegare il braccio robotico, aprire l'applicazione e si può iniziare a operare. Non servono complicate operazioni da riga di comando, né input da tastiera.

🤗 L'ingresso web nativo di LeRobot, pensato per permettere ai nuovi utenti di completare in pochi minuti l'intero processo dall'"apertura della scatola" all'"addestramento della loro prima policy".

🤗 Con un solo comando è possibile installare ed eseguire tutti i programmi.

## Controllo del braccio passivo dallo smartphone

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### Ricerca e sviluppo di robotica nel cloud: realizzazione su AWS della simulazione e del flusso di dati Lerobot per dispositivi ROS 2 e Isaac Sim

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### Impostare l'ID dei servomotori e la calibrazione del punto medio dalla pagina web

https://bambot.org/feetech.js?lang=zh

1、In base al modello del servomotore inserisci 0 o 1 e fai clic su "Connetti"

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、Scansiona i servomotori con ID da 1~6; puoi confermare il servomotore con l'ID corrispondente in base alla voce FOUND nel risultato della scansione. Ad esempio, nell'immagine è stato scansionato il servomotore con ID 1

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、Impostazione dell'ID e calibrazione del punto medio

①L'ID corrente del servomotore inserito è l'ID del servomotore scansionato

②In "Gestione ID" inserisci un numero e fai clic su "Cambia ID" per impostare l'ID

③Calibrazione del punto medio (il punto medio del servomotore STS3215 è 2047, quello del servomotore SCS0009 è 511)

Servomotore STS: in "Controllo posizione" inserisci 2047 e fai clic su "Set"

Servomotore SCS: in "Controllo posizione" inserisci 511 e fai clic su "Set"

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
