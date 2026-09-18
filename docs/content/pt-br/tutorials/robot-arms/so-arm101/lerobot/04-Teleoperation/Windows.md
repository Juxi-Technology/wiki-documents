---
title: "Etapa 4: Teleoperação (Windows)"
description: "No Windows, faça a teleoperação do braço SO-ARM101 informando as portas COM dos braços seguidor e líder em um único comando do LeRobot."
---

# Etapa 4: Teleoperação (Windows)

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

<RelatedProducts slugs="so-arm101" />
