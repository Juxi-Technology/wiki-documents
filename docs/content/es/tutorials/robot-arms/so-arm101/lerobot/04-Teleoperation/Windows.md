---
title: "Paso 4: Teleoperación (Windows)"
description: "Inicia la teleoperación del brazo robótico en Windows usando los puertos COM del brazo seguidor y del brazo líder con la herramienta de LeRobot."
---

# Paso 4: Teleoperación (Windows)

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

<RelatedProducts slugs="so-arm101" />
