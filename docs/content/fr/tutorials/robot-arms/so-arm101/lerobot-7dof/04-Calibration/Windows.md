---
title: "Ordinateur Windows"
description: "Calibrez sous Windows les deux bras avec l'outil LeRobot en indiquant les ports COM, et sachez où sont exportés les fichiers de calibration."
---

# Ordinateur Windows

Il faut brancher simultanément le bras maître et le bras esclave

## Calibrer le bras esclave Follower (articulation « wrist\_yaw » ajoutée)

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Calibrer le bras maître Leader (articulation « wrist\_yaw » ajoutée)

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Emplacement d'export des fichiers

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## Calibrer après avoir changé de bras

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## Points d'attention

### ① Un bras s'arrête après avoir atteint la butée

Une recalibration est nécessaire

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servo introuvable

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

Le servo n'est pas branché ; rebranchez-le et faites pivoter un peu le connecteur



