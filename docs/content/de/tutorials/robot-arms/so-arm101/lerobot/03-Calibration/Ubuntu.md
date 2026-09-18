---
title: "Schritt 3: Roboterarm kalibrieren (Ubuntu)"
description: "Beschreibt die Kalibrierung von Folgearm und Führungsarm unter Ubuntu mit dem Kalibrierungswerkzeug von LeRobot sowie das Prüfen der gespeicherten Datei."
---

# Schritt 3: Roboterarm kalibrieren (Ubuntu)

## Port Berechtigungen erteilen

Allen Benutzern Lese- und Schreibzugriff auf diese seriellen Geräte geben

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Follower-Folgearm kalibrieren

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## Leader-Führungsarm kalibrieren

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## Kalibrierungskonfigurationsdatei anzeigen

```Shell
sudo nano /home/<Benutzername>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## Hinweise

### ① Ein Arm bleibt nach Erreichen des Endanschlags stehen

Eine erneute Kalibrierung ist erforderlich

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servo wird nicht gefunden

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

Das Servo ist nicht an die Stromversorgung angeschlossen

<RelatedProducts slugs="so-arm101" />
