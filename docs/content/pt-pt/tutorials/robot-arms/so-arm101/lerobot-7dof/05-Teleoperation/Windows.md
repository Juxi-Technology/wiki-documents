---
title: "Computador Windows"
description: "Teleoperação no Windows para controlar o braço seguidor com o braço líder, através da linha de comando com as portas COM já registadas."
---

# Computador Windows

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```


