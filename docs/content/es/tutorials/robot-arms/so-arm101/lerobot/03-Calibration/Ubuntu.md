---
title: "Paso 3: Calibrar el brazo robótico (Ubuntu)"
description: "Calibra el brazo seguidor y el brazo líder en Ubuntu con la herramienta oficial de LeRobot, revisa el archivo de configuración y resuelve los errores comunes."
---

# Paso 3: Calibrar el brazo robótico (Ubuntu)

## Otorgar permisos al puerto

Permitir que todos los usuarios tengan permiso de lectura y escritura en estos dispositivos de puerto serie

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrar el brazo seguidor Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## Calibrar el brazo líder Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## Ver el archivo de configuración de calibración

```Shell
sudo nano /home/<usuario>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## Notas

### ① Uno de los brazos llega al límite y deja de moverse

Es necesario recalibrar

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② No se encuentra el servomotor

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

El servomotor no está enchufado

<RelatedProducts slugs="so-arm101" />
