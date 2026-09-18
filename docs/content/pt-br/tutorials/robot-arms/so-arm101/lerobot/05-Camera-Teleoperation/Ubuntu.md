---
title: "Etapa 5: Teleoperação com câmera (Ubuntu)"
description: "No Ubuntu, localize a câmera com a ferramenta do LeRobot e faça a teleoperação com exibição da imagem ao vivo, usando uma ou várias câmeras."
---

# Etapa 5: Teleoperação com câmera (Ubuntu)

## Conectar a câmera e o computador

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Ubuntu/1.png)

## Teleoperação e exibição da imagem da câmera

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

## Várias câmeras, teleoperação e exibição da imagem da câmera

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

<RelatedProducts slugs="so-arm101" />
