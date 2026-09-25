---
title: "Computer Windows"
description: "Su Windows calibrare follower e leader con le porte COM corrette, verificare dove vengono salvati i file di calibrazione e usare un altro braccio se serve."
---

# Computer Windows

È necessario collegare contemporaneamente il braccio attivo e il braccio passivo

## Calibrare il braccio passivo Follower (nuovo giunto "wrist\_yaw")

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Calibrare il braccio attivo Leader (nuovo giunto "wrist\_yaw")

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Posizione di esportazione del file

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## Calibrare con un altro braccio robotico

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## Note

### ① Un braccio si ferma dopo aver raggiunto il limite

È necessario ricalibrare

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Non si trova il servomotore

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

L'alimentazione del servomotore non è collegata; ricollega e ruota un po' il connettore



