---
title: "Ubuntu-Computer"
description: "Erklärt, wie Sie unter Ubuntu zuerst die Portrechte setzen und dann die Teleoperation starten, bei der der Folgearm den Bewegungen des Führungsarms folgt."
---

# Ubuntu\-Computer

## Port\-Berechtigungen erteilen

Allen Benutzern Lese\- und Schreibzugriff auf diese seriellen Geräte geben

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Teleoperation

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-04-Teleoperation-Ubuntu/1.png)



