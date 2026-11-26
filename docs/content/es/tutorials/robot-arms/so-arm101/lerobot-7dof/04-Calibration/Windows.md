---
title: "Equipo Windows"
description: "Calibra ambos brazos en Windows con la herramienta de LeRobot, consulta dónde se exportan los archivos de calibración y soluciona los fallos habituales."
---

# Equipo Windows

Es necesario conectar al mismo tiempo el brazo líder y el brazo seguidor

Antes de pulsar Enter para iniciar la calibración, coloque el brazo robótico en la posición media: cada articulación en el centro de su rango utilizable.

Observe los valores mínimo y máximo de cada articulación. Si un mínimo cruza 0 y empieza a decrecer desde 4095, o un máximo supera 4095 y empieza a crecer desde 0, realice una calibración de posición media con el software de PC de Feetech y vuelva a calibrar el brazo robótico.

## Calibrar el brazo seguidor Follower (con la nueva articulación "wrist\_yaw")

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Calibrar el brazo líder Leader (con la nueva articulación "wrist\_yaw")

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Ubicación de exportación de archivos

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## Calibrar otro brazo robótico

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## Notas

### ① Uno de los brazos llega al límite y deja de moverse

Es necesario recalibrar

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② No se encuentra el servomotor

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

El servomotor no está enchufado; vuelve a enchufarlo y desenchufarlo, y gira un poco el conector



