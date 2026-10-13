---
title: "Schritt 6: Datensatz ansehen und wiedergeben"
description: "Aufgezeichneten Datensatz im LeRobot Dataset Visualizer prüfen, eine Episode mit lerobot-dataset-viz visualisieren und die Bewegung des Follower-Arms mit lerobot-replay zur Qualitätskontrolle wiedergeben."
---

# Schritt 6: Datensatz ansehen und wiedergeben

## Den gesamten Datensatz visualisieren

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

Geben Sie `TommyZihao/lerobot_zihao_dataset_a` oder einen anderen Datensatz ein

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

Hinweis: Der Befehl und der Zustand sind nicht dasselbe — der Befehl kommt vom Leader-Arm, und der Zustand kommt vom Follower-Arm

## Eine bestimmte Episode visualisieren

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

Ziehen Sie die Zeitleiste, um Kamerabild und Servopositionen zu jedem Zeitpunkt anzusehen

## Die Bewegung des Follower-Arms für eine bestimmte Episode wiedergeben

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Sie hören `Replaying episode`, dann bewegt sich der Follower-Arm und gibt die Bewegung der angegebenen Episode wieder

Eigentlich können Sie damit schon jede Menge Laien beeindrucken, nicht wahr

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
