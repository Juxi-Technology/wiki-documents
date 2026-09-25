---
title: "Equipo Mac"
description: "Repasa los números de puerto y calibra el brazo seguidor y el líder en macOS, abre el archivo de calibración y resuelve los errores más frecuentes."
---

# Equipo Mac

## Repasar los números de puerto

Brazo seguidor:

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

Brazo líder:

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## Calibrar el brazo seguidor Follower (con la nueva articulación "wrist\_yaw")

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=zihao_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Calibrar el brazo líder Leader (con la nueva articulación "wrist\_yaw")

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=zihao_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Ver el archivo de configuración de calibración

```Shell
sudo nano /Users/tommy/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/zihao_leader_arm.json
```



## Errores comunes

- No se encuentra uno o varios de los servomotores (no afecta)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)



## Notas

### ① Uno de los brazos llega al límite y deja de moverse

Es necesario recalibrar

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② No se encuentra el servomotor

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

El servomotor no está enchufado

