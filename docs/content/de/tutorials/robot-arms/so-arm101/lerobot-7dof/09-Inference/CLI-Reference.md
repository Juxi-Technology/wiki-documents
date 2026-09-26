---
title: "Erläuterung der Befehle"
description: "Erläutert den Deployment-Befehl der neuen LeRobot-Version, die Arbeitsweisen base und episodic, die wichtigsten Parameter und die Kameraparameter-Regel."
---

# Erläuterung der Befehle

## Erläuterung der Befehle

Mit Echtzeit\-Visualisierung: \-\-display\_data=true

Ohne Echtzeit\-Visualisierung: \-\-display\_data=false

Bei `--display_data=true` startet die coole Visualisierungsoberfläche von rerun\.io, aber im Verzeichnis `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` wird das Bild jedes Frames gespeichert, was viel Speicherplatz belegt. Später kann `--display_data=false` gesetzt werden.



Inferenz eines Modells im HuggingFace\-Modell\-Repo: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Am Beispiel der Orangen\-Greifaufgabe

- Inferenz eines lokalen Modells (mit Echtzeit\-Visualisierung)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferenz eines lokalen Modells (ohne Echtzeit\-Visualisierung)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferenz eines Modells im HuggingFace\-Modell\-Repo

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

Nach dem Ausführen wird das Modell heruntergeladen

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









