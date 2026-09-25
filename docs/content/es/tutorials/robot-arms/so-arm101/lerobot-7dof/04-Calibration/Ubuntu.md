---
title: "Equipo Ubuntu"
description: "Calibra el brazo seguidor y el brazo líder en Ubuntu con la herramienta oficial de LeRobot, revisa el archivo de configuración y resuelve los errores comunes."
---

# Equipo Ubuntu

## Otorgar permisos al puerto

Permitir que todos los usuarios tengan permiso de lectura y escritura en estos dispositivos de puerto serie

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrar el brazo seguidor Follower (con la nueva articulación "wrist\_yaw")

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Calibrar el brazo líder Leader (con la nueva articulación "wrist\_yaw")

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Ver el archivo de configuración de calibración

```Shell
sudo nano /home/tommy/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)



## Notas

### ① Uno de los brazos llega al límite y deja de moverse

Es necesario recalibrar

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② No se encuentra el servomotor

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

El servomotor no está enchufado

