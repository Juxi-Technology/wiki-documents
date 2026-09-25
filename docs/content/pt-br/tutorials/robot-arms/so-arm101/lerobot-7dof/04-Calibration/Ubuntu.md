---
title: "Computador Ubuntu"
description: "No Ubuntu, calibre os braços seguidor e líder com a ferramenta do LeRobot, confira o arquivo de calibração gerado e veja soluções para os problemas comuns."
---

# Computador Ubuntu

## Conceder permissões à porta

Permitir que todos os usuários tenham permissão de leitura e escrita nesses dispositivos de porta serial

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrar o braço seguidor Follower (nova articulação "wrist\_yaw")

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Calibrar o braço líder Leader (nova articulação "wrist\_yaw")

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Ver o arquivo de configuração de calibração

```Shell
sudo nano /home/tommy/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)



## Observações

### ① Um dos braços para de se mover após atingir o limite

É necessário recalibrar

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servos não encontrados

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

A alimentação do servo não está conectada

