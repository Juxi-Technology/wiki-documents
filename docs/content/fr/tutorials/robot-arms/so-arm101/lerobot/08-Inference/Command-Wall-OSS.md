---
title: "Étape 8 : Commande de déploiement WALL-OSS"
description: "Exécutez la politique WALL-OSS (wall_x) avec lerobot-rollout sur le SO-ARM101, avec des vidéos de démonstration sur le robot réel."
---

# Étape 8 : Commande de déploiement WALL-OSS

## Ubuntu

- Supprimer le jeu de données existant préfixé par eval (le cas échéant)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Ligne de commande d'inférence

```Shell
lerobot-record  \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/wallx/30K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=1000
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-Wall-OSS/d63-01.png)

[c7b8a795e52ca10689d296d212dc8e53.mp4](/downloads/c7b8a795e52ca10689d296d212dc8e53.mp4)

## Ligne de commande d'inférence - Mac

- Supprimer le jeu de données existant préfixé par eval (le cas échéant)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Ligne de commande d'inférence

```Shell
lerobot-record  \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/wallx/30K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=1000
```

[9f4567abdcce7f983415aef8f42877d0.mp4](/downloads/9f4567abdcce7f983415aef8f42877d0.mp4)

<RelatedProducts slugs="so-arm101" />
