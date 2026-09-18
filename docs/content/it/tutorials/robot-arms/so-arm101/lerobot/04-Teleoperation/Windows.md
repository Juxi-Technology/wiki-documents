---
title: "Passo 4: Teleoperazione (Windows)"
description: "Su Windows avviare la teleoperazione con un solo comando LeRobot, indicando le porte COM del braccio passivo follower e del braccio attivo leader."
---

# Passo 4: Teleoperazione (Windows)

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

<RelatedProducts slugs="so-arm101" />
