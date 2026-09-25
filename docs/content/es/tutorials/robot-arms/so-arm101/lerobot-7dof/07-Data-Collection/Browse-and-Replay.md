---
title: "Revisar y reproducir el conjunto de datos"
description: "Visualice el conjunto de datos grabado en el visualizador de LeRobot y reprodúzcalo en el brazo seguidor para comprobar los episodes antes de entrenar."
---

# Revisar y reproducir el conjunto de datos

## Visualizar todo el conjunto de datos

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

Introduce `TommyZihao/lerobot_zihao_dataset_a`, u otro conjunto de datos

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

Observación: la instrucción y el estado no coinciden; la instrucción la proporciona el brazo líder Leader y el estado lo proporciona el brazo seguidor Follower

## Visualizar un episode concreto

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

Arrastra la línea de tiempo para ver la imagen de la cámara y la posición de los servos en cualquier momento

## Reproducir el movimiento del brazo seguidor de un episode concreto

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Se oirá `Replaying episode` y, a continuación, el brazo seguidor se moverá, reproduciendo el movimiento del episode indicado



