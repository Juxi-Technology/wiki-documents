---
title: "Etapa 6: Ver e reproduzir um conjunto de dados"
description: "Consulte um conjunto de dados no LeRobot Dataset Visualizer, visualize um episódio específico com o lerobot-dataset-viz e reproduza o movimento do braço seguidor com o lerobot-replay para verificar a qualidade."
---

# Etapa 6: Ver e reproduzir um conjunto de dados

## Visualizar todo o conjunto de dados

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

Introduza `TommyZihao/lerobot_zihao_dataset_a`, ou outro conjunto de dados

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

Observação: o comando e o estado não são a mesma coisa — o comando é fornecido pelo braço Leader, e o estado é fornecido pelo braço Follower

## Visualizar um episódio específico

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

Arraste a linha temporal para ver a imagem da câmara e as posições dos servos em qualquer momento

## Reproduzir o movimento do braço Follower para um episódio específico

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Ouvirá `Replaying episode`, e depois o braço Follower move-se, reproduzindo e recriando o movimento do episódio especificado

Na verdade, a esta altura já consegue impressionar muita gente leiga, não é verdade

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
