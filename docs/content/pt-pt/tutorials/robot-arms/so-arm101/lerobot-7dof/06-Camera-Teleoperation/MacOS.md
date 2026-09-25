---
title: "Computador Mac"
description: "Teleoperação com câmara no macOS: ligar a câmara ao Mac, procurar os dispositivos disponíveis e testar com uma ou várias câmaras."
---

# Computador Mac

## Ligar a câmara e o computador

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## Uma câmara, teleoperação com exibição da imagem da câmara

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

Após a execução inicia-se a teleoperação

Será aberta a janela rerun\.io, mostrando em tempo real as trajetórias de cada articulação dos servos, bem como a imagem em tempo real da câmara

E guarda as imagens no diretório `~/<utilizador>/outputs/captured_images`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## Várias câmaras, teleoperação com exibição da imagem da câmara

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1920, height: 1080, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```


