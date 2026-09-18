---
title: "Passo 3: Calibrare il braccio robotico (Ubuntu)"
description: "Su Ubuntu calibrare follower e leader con lo strumento LeRobot, controllare il file di calibrazione generato e risolvere gli errori comuni."
---

# Passo 3: Calibrare il braccio robotico (Ubuntu)

## Concedere le autorizzazioni alle porte

Consentire a tutti gli utenti di leggere e scrivere su questi dispositivi seriali

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrare il braccio passivo Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## Calibrare il braccio attivo Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## Visualizzare il file di configurazione della calibrazione

```Shell
sudo nano /home/<nome-utente>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## Note

### ① Un braccio si ferma dopo aver raggiunto il limite

È necessario ricalibrare

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Non si trova il servomotore

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

L'alimentazione del servomotore non è collegata

<RelatedProducts slugs="so-arm101" />
