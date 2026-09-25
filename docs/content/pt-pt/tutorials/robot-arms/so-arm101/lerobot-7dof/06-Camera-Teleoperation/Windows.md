---
title: "Computador Windows"
description: "Teleoperação com câmara no Windows, com procura de câmaras, exibição de imagem e solução de erros do backend OpenCV na câmara."
---

# Computador Windows

## Ligar a câmara e o computador

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Teleoperação com exibição da imagem da câmara

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

Será aberta a janela rerun\.io, mostrando em tempo real as trajetórias de cada articulação dos servos, bem como a imagem em tempo real da câmara

E guarda as imagens no diretório `C:\Users\<utilizador-Windows>\outputs\captured_images`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## Se encontrar o seguinte tipo de erro

A câmara não se liga, mas ao mudar de câmara no Tencent Meeting, ainda abre normalmente

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Modifique o ficheiro `lerobot\src\lerobot\cameras\utils.py`, alterando o backend OpenCV para `cv2.CAP_SHOW`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> Este é um bug que nem o Doubao consegue resolver; a culpa é do encapsulamento demasiado profundo da biblioteca lerobot, sendo muito difícil para os principiantes depurarem
> 
> 

[wx\_camera\_1768139334330\.mp4](/downloads/wx_camera_1768139334330.mp4)

## Ligar várias câmaras, teleoperação com exibição da imagem da câmara

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```


