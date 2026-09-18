---
title: "Paso 4: Teleoperación (Ubuntu)"
description: "Ejecuta la teleoperación del brazo robótico en Ubuntu: otorga permisos al puerto serie y controla el brazo seguidor moviendo el brazo líder."
---

# Paso 4: Teleoperación (Ubuntu)

## Otorgar permisos al puerto

Permitir que todos los usuarios tengan permiso de lectura y escritura en estos dispositivos de puerto serie

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Teleoperación

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-04-Teleoperation-Ubuntu/1.png)

<RelatedProducts slugs="so-arm101" />
