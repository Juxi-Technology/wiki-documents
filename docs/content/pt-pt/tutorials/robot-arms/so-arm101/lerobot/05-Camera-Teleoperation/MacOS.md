---
title: "Etapa 5: Teleoperação com câmara (macOS)"
description: "Teleoperação com câmara no macOS: ligar a câmara ao Mac, procurar os dispositivos disponíveis e testar com uma ou várias câmaras."
---

# Etapa 5: Teleoperação com câmara (macOS)

## Ligar a câmara e o computador

```Shell
lerobot-find-cameras opencv
```

Após a execução será listado o número de cada câmara; anote-o e preencha-o em `index_or_path` no comando abaixo.

> Os parâmetros da câmara (resolução, fps, proporção) devem ser mantidos consistentes ao recolher o conjunto de dados e ao implementar o modelo; o motivo está explicado em [Recolha de conjuntos de dados por ensino](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Este tutorial usa uniformemente `1280×720@30`.

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Uma câmara, teleoperação com exibição da imagem da câmara

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

Após a execução inicia-se a teleoperação

Será aberta a janela rerun.io, mostrando em tempo real as trajetórias de cada articulação dos servos, bem como a imagem em tempo real da câmara

E guarda as imagens no diretório `~/用户名/outputs/captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## Várias câmaras, teleoperação com exibição da imagem da câmara

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
