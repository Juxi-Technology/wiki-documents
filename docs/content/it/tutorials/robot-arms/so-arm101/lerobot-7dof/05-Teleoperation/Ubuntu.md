---
title: "Computer Ubuntu"
description: "Su Ubuntu avviare la teleoperazione del braccio SO-ARM101: concedere i permessi alle porte seriali e usare le porte del follower e del leader."
---

# Computer Ubuntu

## Concedere le autorizzazioni alle porte

Consentire a tutti gli utenti di leggere e scrivere su questi dispositivi seriali

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Teleoperazione

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



