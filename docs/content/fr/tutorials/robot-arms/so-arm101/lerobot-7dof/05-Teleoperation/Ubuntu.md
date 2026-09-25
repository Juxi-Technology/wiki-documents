---
title: "Ordinateur Ubuntu"
description: "Lancez sous Ubuntu la téléopération du bras esclave piloté par le bras maître, après avoir accordé les permissions sur les ports série."
---

# Ordinateur Ubuntu

## Accorder les permissions au port

Permettre à tous les utilisateurs de lire et d'écrire ces périphériques série

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Téléopération

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



