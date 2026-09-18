---
title: "Paso 3: Calibrar el brazo robótico (Windows)"
description: "Calibra ambos brazos en Windows con la herramienta de LeRobot, consulta dónde se exportan los archivos de calibración y soluciona los fallos habituales."
---

# Paso 3: Calibrar el brazo robótico (Windows)

Es necesario conectar al mismo tiempo el brazo líder y el brazo seguidor

## Calibrar el brazo seguidor Follower

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/1.png)

## Calibrar el brazo líder Leader

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/2.png)

## Ubicación de exportación de archivos

C:\Users\<usuario-Windows>\.cache\huggingface\lerobot\calibration\robots\so101_follower\my_follower_arm.json

C:\Users\<usuario-Windows>\.cache\huggingface\lerobot\calibration\teleoperators\so101_leader\my_leader_arm.json

## Calibrar otro brazo robótico

lerobot-calibrate --robot.type=so101_follower --robot.port=COM4 --robot.id=my_follower_arm

## Notas

### ① Uno de los brazos llega al límite y deja de moverse

Es necesario recalibrar

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② No se encuentra el servomotor

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/3.png)

El servomotor no está enchufado; vuelve a enchufarlo y desenchufarlo, y gira un poco el conector

<RelatedProducts slugs="so-arm101" />
