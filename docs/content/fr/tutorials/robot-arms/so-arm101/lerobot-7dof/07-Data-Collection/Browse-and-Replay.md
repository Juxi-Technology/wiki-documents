---
title: "Revisionner et rejouer le dataset"
description: "Contrôlez vos données avant l'entraînement : visualisez le dataset enregistré dans le visualiseur de datasets LeRobot, puis rejouez un épisode sur le bras."
---

# Revisionner et rejouer le dataset

## Visualiser tout le dataset

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

Saisissez `TommyZihao/lerobot_zihao_dataset_a`, ou un autre dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

Observation : la commande et l'état sont différents ; la commande est fournie par le bras maître Leader, et l'état par le bras esclave Follower

## Visualiser un épisode donné

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

Faites glisser la barre temporelle pour voir l'image de la caméra et la position des servos à n'importe quel instant

## Rejouer les mouvements du bras esclave pour un épisode donné

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Vous entendez `Replaying episode`, puis le bras esclave bouge et reproduit les mouvements de l'épisode donné



