---
title: "Schritt 3: Roboterarm kalibrieren (Windows)"
description: "Zeigt die Kalibrierung beider Arme unter Windows über ihre COM-Ports, den Speicherort der Kalibrierungsdateien und Hinweise zu häufigen Fehlern."
---

# Schritt 3: Roboterarm kalibrieren (Windows)

Führungsarm und Folgearm müssen gleichzeitig angeschlossen sein

## Follower-Folgearm kalibrieren

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/1.png)

## Leader-Führungsarm kalibrieren

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/2.png)

## Speicherort des Dateiexports

C:\Users\<你的Windows用户名>\.cache\huggingface\lerobot\calibration\robots\so101_follower\my_follower_arm.json

C:\Users\<你的Windows用户名>\.cache\huggingface\lerobot\calibration\teleoperators\so101_leader\my_leader_arm.json

## Roboterarm zum Kalibrieren wechseln

lerobot-calibrate --robot.type=so101_follower --robot.port=COM4 --robot.id=my_follower_arm

## Hinweise

### ① Ein Arm bleibt nach Erreichen des Endanschlags stehen

Eine erneute Kalibrierung ist erforderlich

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servo wird nicht gefunden

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/3.png)

Das Servo ist nicht an die Stromversorgung angeschlossen; ziehen Sie es ab und stecken Sie es wieder ein und drehen Sie dabei den Anschluss etwas.

<RelatedProducts slugs="so-arm101" />
