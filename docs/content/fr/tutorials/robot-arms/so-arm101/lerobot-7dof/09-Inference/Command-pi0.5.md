---
title: "Commande d'inférence - pi0.5"
description: "Déployez le modèle pi0.5 sous Ubuntu et sur Mac, avec les paramètres de calcul adaptés à chaque machine et des explications si l'inférence est très lente."
---

# Commande d'inférence \- pi0\.5

> **Remarque :** Les versions récentes de LeRobot ont déplacé l'inférence de politique vers la commande dédiée `lerobot-rollout` ; `lerobot-record` sert désormais uniquement à la collecte de données. La commande `lerobot-record --policy.path` ci-dessous s'applique aux versions antérieures.

## Ubuntu

- Supprimer le dataset existant commençant par eval (le cas échéant)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- Commande d'inférence

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/pi05/50K/pretrained_model
```













## Mac

- Supprimer le dataset existant commençant par eval (le cas échéant)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Commande d'inférence

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.freeze_vision_encoder=false \
  --policy.dtype=bfloat16 \
  --policy.compile_model=true \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.device=cpu \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/pi0/50K/pretrained_model
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

## Pourquoi l'inférence est très lente

- Le dataset est trop petit

- La VRAM de la carte graphique est insuffisante ; il faut passer à une carte graphique de la série 50



