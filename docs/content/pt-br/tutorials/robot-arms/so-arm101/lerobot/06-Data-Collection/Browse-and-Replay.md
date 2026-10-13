---
title: "Etapa 6: Visualizar e reproduzir um dataset"
description: "Confira um dataset no LeRobot Dataset Visualizer, visualize um episódio específico com o lerobot-dataset-viz e reproduza o movimento do braço seguidor com o lerobot-replay para verificar a qualidade da coleta."
---

# Etapa 6: Visualizar e reproduzir um dataset

## Visualizar o Conjunto de Dados Inteiro

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

Digite `TommyZihao/lerobot_zihao_dataset_a`, ou outro conjunto de dados

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

Observação: o comando e o estado não são a mesma coisa — o comando é fornecido pelo braço Leader, e o estado é fornecido pelo braço Follower

## Visualizar um Episódio Específico

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

Arraste a linha do tempo para ver o feed da câmera e as posições dos servos em qualquer momento

## Reproduzir o Movimento do Braço Follower para um Episódio Específico

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Você ouvirá `Replaying episode`, e então o braço Follower se move, reproduzindo e recriando o movimento do episódio especificado

Na verdade, a esta altura você já consegue impressionar muita gente leiga, não é mesmo

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
