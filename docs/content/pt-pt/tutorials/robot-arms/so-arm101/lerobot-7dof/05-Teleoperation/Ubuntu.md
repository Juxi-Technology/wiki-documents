---
title: "Computador Ubuntu"
description: "Teleoperação no Ubuntu com os braços líder e seguidor, incluindo as permissões das portas série e o comando de teleoperação."
---

# Computador Ubuntu

## Dar permissões às portas

Permitir que todos os utilizadores tenham permissão de leitura e escrita nestes dispositivos de porta série

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Teleoperação

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-04-Teleoperation-Ubuntu/1.png)


