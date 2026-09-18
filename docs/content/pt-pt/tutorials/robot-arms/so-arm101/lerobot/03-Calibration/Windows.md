---
title: "Etapa 3: Calibrar o braço robótico (Windows)"
description: "Como calibrar os braços líder e seguidor no Windows, ligar os dois braços em simultâneo e guardar o ficheiro de calibração na pasta correta."
---

# Etapa 3: Calibrar o braço robótico (Windows)

É necessário ligar ao mesmo tempo o braço líder e o braço seguidor

## Calibrar o braço seguidor Follower

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/1.png)

## Calibrar o braço líder Leader

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/2.png)

## Local de exportação dos ficheiros

C:\Users\<utilizador-Windows>\.cache\huggingface\lerobot\calibration\robots\so101_follower\my_follower_arm.json

C:\Users\<utilizador-Windows>\.cache\huggingface\lerobot\calibration\teleoperators\so101_leader\my_leader_arm.json

## Calibrar com outro braço robótico

lerobot-calibrate --robot.type=so101_follower --robot.port=COM4 --robot.id=my_follower_arm

## Notas

### ① Um dos braços para de se mover depois de atingir o limite

É necessário recalibrar

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Não se encontra o servo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/3.png)

O servo não tem a alimentação ligada; volte a ligá-lo e desligá-lo e rode um pouco a ficha

<RelatedProducts slugs="so-arm101" />
