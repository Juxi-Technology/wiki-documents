---
title: "Rever e reproduzir o conjunto de dados"
description: "Visualize um conjunto de dados gravado no visualizador de datasets do LeRobot e reproduza-o no braço para verificar os episodes antes do treino."
---

# Rever e reproduzir o conjunto de dados

## Visualizar o conjunto de dados completo

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

Introduza `TommyZihao/lerobot_zihao_dataset_a`, ou outro conjunto de dados

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

Observação: a instrução e o estado não coincidem; a instrução é fornecida pelo braço líder Leader e o estado pelo braço seguidor Follower

## Visualizar um episode específico

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

Arraste a linha temporal para ver a imagem da câmara e a posição dos servos em qualquer momento

## Reproduzir os movimentos do braço seguidor de um episode específico

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Ouve-se o som `Replaying episode` e, em seguida, o braço seguidor move-se, reproduzindo os movimentos do episode especificado


