---
title: "Etapa 3: Calibrar o braço robótico (macOS)"
description: "Como calibrar os braços líder e seguidor no macOS, rever primeiro os números das portas e confirmar o ficheiro de calibração exportado."
---

# Etapa 3: Calibrar o braço robótico (macOS)

## Rever os números das portas

Braço seguidor：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Braço líder：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Calibrar o braço seguidor Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## Calibrar o braço líder Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## Ver o ficheiro de configuração de calibração

```Shell
sudo nano /Users/<utilizador>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
```

## Bugs comuns

- Não se encontra um ou vários dos servos

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)

## Notas

### ① Um dos braços para de se mover depois de atingir o limite

É necessário recalibrar

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Não se encontra o servo

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

O servo não tem a alimentação ligada

<RelatedProducts slugs="so-arm101" />
