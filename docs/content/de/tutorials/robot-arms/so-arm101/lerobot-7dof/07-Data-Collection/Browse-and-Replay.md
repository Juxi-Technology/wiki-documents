---
title: "Datensatz ansehen und wiedergeben"
description: "Sehen Sie sich aufgezeichnete Datensätze im LeRobot-Visualizer an und spielen Sie Episoden zur Kontrolle vor dem Training auf dem Arm ab."
---

# Datensatz ansehen und wiedergeben

## Gesamten Datensatz visualisieren

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

`TommyZihao/lerobot_zihao_dataset_a` eingeben, oder einen anderen Datensatz

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

Beobachtung: Der Befehl und der Zustand stimmen nicht überein; der Befehl wird vom Leader\-Führungsarm geliefert, der Zustand vom Follower\-Folgearm

## Eine bestimmte episode visualisieren

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

Ziehen Sie an der Zeitachse, um das Kamerabild und die Servopositionen zu jedem Zeitpunkt zu sehen

## Aktionen des Folgearms für eine bestimmte episode wiedergeben

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Sie hören die Ansage `Replaying episode`, dann bewegt sich der Folgearm und die Aktionen der angegebenen episode werden wiedergegeben



