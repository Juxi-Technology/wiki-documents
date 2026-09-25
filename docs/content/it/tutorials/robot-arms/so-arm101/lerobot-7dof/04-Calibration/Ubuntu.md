---
title: "Computer Ubuntu"
description: "Su Ubuntu calibrare follower e leader con lo strumento LeRobot, controllare il file di calibrazione generato e risolvere gli errori comuni."
---

# Computer Ubuntu

## Concedere le autorizzazioni alle porte

Consentire a tutti gli utenti di leggere e scrivere su questi dispositivi seriali

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrare il braccio passivo Follower (nuovo giunto "wrist\_yaw")

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Calibrare il braccio attivo Leader (nuovo giunto "wrist\_yaw")

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Visualizzare il file di configurazione della calibrazione

```Shell
sudo nano /home/tommy/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)



## Note

### ① Un braccio si ferma dopo aver raggiunto il limite

È necessario ricalibrare

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Non si trova il servomotore

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

L'alimentazione del servomotore non è collegata

