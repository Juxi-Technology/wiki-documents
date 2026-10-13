---
title: "Étape 6 : Visualiser et rejouer un jeu de données"
description: "Consultez un jeu de données dans le LeRobot Dataset Visualizer, visualisez un épisode précis avec lerobot-dataset-viz, puis rejouez le mouvement du bras suiveur avec lerobot-replay pour vérifier la qualité."
---

# Étape 6 : Visualiser et rejouer un jeu de données

## Visualiser l'ensemble du jeu de données

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

Saisissez `TommyZihao/lerobot_zihao_dataset_a`, ou un autre jeu de données

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

Observation : la commande et l'état ne sont pas identiques — la commande est fournie par le bras Leader, et l'état est fourni par le bras Follower

## Visualiser un épisode précis

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

Faites glisser la chronologie pour consulter le flux vidéo et les positions des servomoteurs à n'importe quel moment

## Rejouer le mouvement du bras Follower pour un épisode précis

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Vous entendrez `Replaying episode`, puis le bras Follower bouge, rejouant et reproduisant le mouvement de l'épisode indiqué

En fait, à ce stade, vous pouvez déjà impressionner beaucoup de profanes, n'est-ce pas

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
