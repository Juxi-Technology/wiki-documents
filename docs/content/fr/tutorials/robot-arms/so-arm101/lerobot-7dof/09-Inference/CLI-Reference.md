---
title: "Description de la ligne de commande"
description: "Comprenez la commande de déploiement LeRobot : rôle de chaque paramètre, différence entre les modes base et episodic, et pièges sur les paramètres caméra."
---

# Description de la ligne de commande

## Description de la ligne de commande

Avec visualisation en temps réel : \-\-display\_data=true

Sans visualisation en temps réel : \-\-display\_data=false

Avec `--display_data=true`, l'interface de visualisation très sympa de rerun\.io se lance, mais dans le répertoire `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`, l'image de chaque frame est enregistrée, ce qui occupe pas mal d'espace. Vous pouvez ensuite la définir à `--display_data=false`



Inférence d'un modèle depuis un Repo de modèle HuggingFace : \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Exemple avec la tâche de saisie d'oranges

- Inférence d'un modèle local (avec visualisation en temps réel)

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

- Inférence d'un modèle local (sans visualisation en temps réel)

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

- Inférence d'un modèle depuis un Repo de modèle HuggingFace

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

Le modèle sera téléchargé après l'exécution

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









