---
title: "Passo 3: Calibrare il braccio robotico (macOS)"
description: "Su Mac rivedere i numeri di porta, calibrare i due bracci con lo strumento LeRobot e consultare il file di configurazione della calibrazione."
---

# Passo 3: Calibrare il braccio robotico (macOS)

## Rivedere i numeri di porta

Braccio passivo:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Braccio attivo:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Calibrare il braccio passivo Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Calibrare il braccio attivo Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Visualizzare il file di configurazione della calibrazione

```Shell
sudo nano /Users/<你的用户名>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
```

## Bug comuni

- Non viene trovato uno o più servomotori

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)

## Note

### ① Un braccio si ferma dopo aver raggiunto il limite

È necessario ricalibrare

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Non si trova il servomotore

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

L'alimentazione del servomotore non è collegata

<RelatedProducts slugs="so-arm101" />
