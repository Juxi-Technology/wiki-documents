---
title: "Computador Windows"
description: "No Windows, calibre os braços líder e seguidor pelas portas COM, veja onde ficam os arquivos de calibração exportados e as observações sobre erros frequentes."
---

# Computador Windows

É necessário conectar ao mesmo tempo o braço líder e o braço seguidor

## Calibrar o braço seguidor Follower (nova articulação "wrist\_yaw")

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Calibrar o braço líder Leader (nova articulação "wrist\_yaw")

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## Local de exportação dos arquivos

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## Calibrar com outro braço robótico

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## Observações

### ① Um dos braços para de se mover após atingir o limite

É necessário recalibrar

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servos não encontrados

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

A alimentação do servo não está conectada; conecte novamente e gire um pouco o conector



