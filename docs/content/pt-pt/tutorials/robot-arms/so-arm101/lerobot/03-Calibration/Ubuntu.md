---
title: "Etapa 3: Calibrar o braço robótico (Ubuntu)"
description: "Passos para calibrar os braços líder e seguidor no Ubuntu, com as permissões das portas, o processo guiado e o ficheiro de calibração final."
---

# Etapa 3: Calibrar o braço robótico (Ubuntu)

## Dar permissões às portas

Permitir que todos os utilizadores tenham permissão de leitura e escrita nestes dispositivos de porta série

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrar o braço seguidor Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## Calibrar o braço líder Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## Ver o ficheiro de configuração de calibração

```Shell
sudo nano /home/<utilizador>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## Notas

### ① Um dos braços para de se mover depois de atingir o limite

É necessário recalibrar

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Não se encontra o servo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

O servo não tem a alimentação ligada

<RelatedProducts slugs="so-arm101" />
