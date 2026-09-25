---
title: "Ordinateur Mac"
description: "Calibrez sur Mac le bras esclave et le bras maître avec l'outil LeRobot, puis vérifiez la configuration dans le fichier de calibration exporté."
---

# Ordinateur Mac

## Rappel des numéros de port

Bras esclave :

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

Bras maître :

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## Calibrer le bras esclave Follower (articulation « wrist\_yaw » ajoutée)

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=zihao_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Calibrer le bras maître Leader (articulation « wrist\_yaw » ajoutée)

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=zihao_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Consulter le fichier de configuration de calibration

```Shell
sudo nano /Users/tommy/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/zihao_leader_arm.json
```



## Bugs courants

- Un ou plusieurs servos introuvables (sans conséquence)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)



## Points d'attention

### ① Un bras s'arrête après avoir atteint la butée

Une recalibration est nécessaire

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servo introuvable

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

Le servo n'est pas branché

