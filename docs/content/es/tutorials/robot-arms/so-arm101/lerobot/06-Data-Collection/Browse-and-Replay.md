---
title: "Paso 6: Ver y reproducir un conjunto de datos"
description: "Consulta un conjunto de datos en el LeRobot Dataset Visualizer, visualiza un episodio concreto con lerobot-dataset-viz y reproduce el movimiento del brazo seguidor con lerobot-replay para verificar la calidad."
---

# Paso 6: Ver y reproducir un conjunto de datos

## Visualizar todo el conjunto de datos

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

Introduce `TommyZihao/lerobot_zihao_dataset_a`, u otro conjunto de datos

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

Observación: el comando y el estado no son lo mismo — el comando lo proporciona el brazo Leader y el estado lo proporciona el brazo Follower

## Visualizar un episodio concreto

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

Arrastra la línea de tiempo para ver la imagen de la cámara y las posiciones de los servos en cualquier momento

## Reproducir el movimiento del brazo Follower para un episodio concreto

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Oirás `Replaying episode` y, a continuación, el brazo Follower se moverá, reproduciendo y recreando el movimiento del episodio especificado

En realidad, a estas alturas ya puedes impresionar a mucha gente, ¿verdad?

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
