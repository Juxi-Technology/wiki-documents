---
title: "Etapa 5: Teleoperação com câmera (Windows)"
description: "No Windows, conecte a câmera, faça a teleoperação com exibição ao vivo e veja como corrigir a falha de conexão da câmera ajustando o backend do OpenCV."
---

# Etapa 5: Teleoperação com câmera (Windows)

## Conectar a câmera e o computador

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Teleoperação e exibição da imagem da câmera

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

A tela do rerun.io será aberta, exibindo em tempo real as trajetórias de cada junta dos servos, bem como a imagem ao vivo da câmera

E salva as imagens no diretório `C:\Users\<usuario-Windows>\outputs\captured_images`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/2.jpg)

## Se você encontrar o seguinte tipo de erro

A câmera não conecta, mas ao alternar a câmera no Tencent Meeting, ela ainda consegue abrir normalmente

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Modifique o arquivo `lerobot\src\lerobot\cameras\utils.py` e altere o backend do OpenCV para `cv2.CAP_DSHOW`

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> Este é um bug que nem o Doubao consegue resolver; a culpa é que a biblioteca lerobot está encapsulada de forma muito profunda, e é muito difícil para iniciantes depurarem
> 
> 

[wx_camera_1768139334330.mp4](/downloads/wx_camera_1768139334330.mp4)

## Conectar várias câmeras, teleoperação e exibição da imagem da câmera

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/5.jpg)

<RelatedProducts slugs="so-arm101" />
