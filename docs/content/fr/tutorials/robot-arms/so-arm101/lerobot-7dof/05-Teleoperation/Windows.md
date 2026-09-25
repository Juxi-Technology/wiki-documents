---
title: "Ordinateur Windows"
description: "Lancez sous Windows la téléopération avec les ports COM du bras esclave et du bras maître, en une seule ligne de commande à recopier."
---

# Ordinateur Windows

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```



