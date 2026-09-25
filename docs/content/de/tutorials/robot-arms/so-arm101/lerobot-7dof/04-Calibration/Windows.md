---
title: "Windows-Computer"
description: "Zeigt die Kalibrierung beider Arme unter Windows über ihre COM-Ports, den Speicherort der Kalibrierungsdateien und Hinweise zu häufigen Fehlern."
---

# Windows\-Computer

Führungsarm und Folgearm müssen gleichzeitig angeschlossen sein

## Follower\-Folgearm kalibrieren (neu hinzugefügtes Gelenk „wrist\_yaw")

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Leader\-Führungsarm kalibrieren (neu hinzugefügtes Gelenk „wrist\_yaw")

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Speicherort des Dateiexports

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## Roboterarm zum Kalibrieren wechseln

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## Hinweise

### ① Ein Arm bleibt nach Erreichen des Endanschlags stehen

Eine erneute Kalibrierung ist erforderlich

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servo wird nicht gefunden

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

Das Servo ist nicht an die Stromversorgung angeschlossen; ziehen Sie es ab und stecken Sie es wieder ein und drehen Sie dabei den Anschluss etwas.



