---
title: "URDF-Dateien und Referenzmaterial"
description: "Sammelt URDF-Dateien und Referenzmaterial: offizielle URDF, URDF Studio, LeLab-Oberfläche, Smartphone-Teleoperation, AWS mit Isaac Sim und Servo-Kalibrierung."
---

# URDF-Dateien und Referenzmaterial

## Offizielle [URDF-Datei](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf) von Lerbot

### URDF Studio

https://urdf.d-robotics.cc/

### ROS2-Simulationssteuerung (selbst implementierbar)

https://github.com/holmsslk/so-arm-moveit-hardware

### Offizielle grafische Oberfläche von LeRobot

https://github.com/huggingface/leLab

LeLab ist eine Webanwendung, die den gesamten LeRobot-Workflow——Kalibrierung, Fernsteuerung, Aufzeichnung, Training, Wiedergabe——in einer Browser-Oberfläche vereint. Verbinden Sie einfach den Roboterarm, öffnen Sie die Anwendung und legen Sie los. Keine umständlichen Kommandozeilenoperationen und keine Tastatureingaben erforderlich.

🤗 Der native Webeinstieg von LeRobot, der neue Nutzer in wenigen Minuten durch den gesamten Prozess vom „Auspacken“ bis zum „Training ihrer ersten Policy“ führen soll.

🤗 Installation und Ausführung aller Programme mit nur einem einzigen Befehl.

## Steuerung des Folgearms per Smartphone

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### Cloud-basierte Roboterentwicklung：Mit AWS ROS 2-Geräte und Isaac Sim für Lerobot-Simulation und Datenfluss realisieren

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### Servo-ID und Mittelstellungskalibrierung im Web einstellen

https://bambot.org/feetech.js?lang=zh

1、Geben Sie je nach Servomodell 0 oder 1 ein und klicken Sie auf „Verbinden“

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、Scannen Sie die Servos mit den IDs 1~6; anhand von FOUND im Scanergebnis können Sie den Servo mit der entsprechenden ID bestätigen. Im Bild zum Beispiel wurde der Servo mit ID 1 gefunden

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、ID-Einstellung und Mittelstellungskalibrierung

① Bei der aktuellen Servo-ID wird die ID des gefundenen Servos eingegeben

② Geben Sie unter „ID-Verwaltung“ eine Zahl ein und klicken Sie auf „ID ändern“, um die ID festzulegen

③ Mittelstellungskalibrierung (die Mittelstellung des STS3215-Servos ist 2047, die des SCS0009-Servos ist 511)

STS-Servo：Geben Sie unter „Positionssteuerung“ 2047 ein und klicken Sie auf „Set“

SCS-Servo：Geben Sie unter „Positionssteuerung“ 511 ein und klicken Sie auf „Set“

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
