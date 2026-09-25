---
title: "Computador Windows"
description: "Como calibrar os braços líder e seguidor no Windows, ligar os dois braços em simultâneo e guardar o ficheiro de calibração na pasta correta."
---

# Computador Windows

É necessário ligar ao mesmo tempo o braço líder e o braço seguidor

## Calibrar o braço seguidor Follower (nova articulação «wrist\_yaw»)

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Calibrar o braço líder Leader (nova articulação «wrist\_yaw»)

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Local de exportação dos ficheiros

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## Calibrar com outro braço robótico

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## Notas

### ① Um dos braços para de se mover depois de atingir o limite

É necessário recalibrar

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Não se encontra o servo

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

O servo não tem a alimentação ligada; volte a ligá-lo e desligá-lo e rode um pouco a ficha


