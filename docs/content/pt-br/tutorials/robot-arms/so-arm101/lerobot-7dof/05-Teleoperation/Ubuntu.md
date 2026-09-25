---
title: "Computador Ubuntu"
description: "No Ubuntu, faça a teleoperação do SO-ARM101: conceda permissões à porta serial e controle o braço seguidor com o braço líder pela ferramenta do LeRobot."
---

# Computador Ubuntu

## Conceder permissões à porta

Permitir que todos os usuários tenham permissão de leitura e escrita nesses dispositivos de porta serial

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



