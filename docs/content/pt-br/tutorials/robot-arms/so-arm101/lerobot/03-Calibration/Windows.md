---
title: "Etapa 3: Calibrar o braço robótico (Windows)"
description: "No Windows, calibre os braços líder e seguidor pelas portas COM, veja onde ficam os arquivos de calibração exportados e as observações sobre erros frequentes."
---

# Etapa 3: Calibrar o braço robótico (Windows)

É necessário conectar ao mesmo tempo o braço líder e o braço seguidor

## Calibrar o braço seguidor (Follower)

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/1.png)

## Calibrar o braço líder (Leader)

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/2.png)

## Local de exportação dos arquivos

C:\Users\<usuario-Windows>\.cache\huggingface\lerobot\calibration\robots\so101_follower\my_follower_arm.json

C:\Users\<usuario-Windows>\.cache\huggingface\lerobot\calibration\teleoperators\so101_leader\my_leader_arm.json

## Calibrar com outro braço robótico

lerobot-calibrate --robot.type=so101_follower --robot.port=COM4 --robot.id=my_follower_arm

## Observações

### ① Um dos braços para de se mover após atingir o limite

É necessário recalibrar

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servos não encontrados

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/3.png)

A alimentação do servo não está conectada; conecte novamente e gire um pouco o conector

<RelatedProducts slugs="so-arm101" />
