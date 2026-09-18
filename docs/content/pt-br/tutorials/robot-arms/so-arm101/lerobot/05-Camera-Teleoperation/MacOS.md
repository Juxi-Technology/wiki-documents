---
title: "Etapa 5: Teleoperação com câmera (macOS)"
description: "No macOS, descubra o número de cada câmera e faça a teleoperação com exibição da imagem ao vivo, mantendo resolução e fps iguais aos da coleta."
---

# Etapa 5: Teleoperação com câmera (macOS)

## Conectar a câmera e o computador

```Shell
lerobot-find-cameras opencv
```

Após a execução, o número de cada câmera será listado; anote-o e preencha no `index_or_path` do comando abaixo.

> Os parâmetros da câmera (resolução, fps, proporção) devem ser mantidos consistentes ao coletar o conjunto de dados e ao implantar o modelo; o motivo está na explicação em [Coletar conjunto de dados por demonstração](/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Este tutorial usa uniformemente `1280×720@30`.

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Uma câmera, teleoperação e exibição da imagem da câmera

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

Após a execução, a teleoperação é iniciada

A tela do rerun.io será aberta, exibindo em tempo real as trajetórias de cada junta dos servos, bem como a imagem ao vivo da câmera

E salva as imagens no diretório `~/<usuario>/outputs/captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## Várias câmeras, teleoperação e exibição da imagem da câmera

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/3.jpg)

<RelatedProducts slugs="so-arm101" />
