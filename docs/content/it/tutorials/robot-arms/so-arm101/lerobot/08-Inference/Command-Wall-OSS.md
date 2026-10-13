---
title: "Passo 8: Comando di deployment WALL-OSS"
description: "Esegui la policy WALL-OSS (wall_x) con lerobot-rollout sul SO-ARM101, con video dimostrativi sul robot reale."
---

# Passo 8: Comando di deployment WALL-OSS

## Ubuntu

- Elimina il dataset esistente con prefisso eval (se presente)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Riga di comando di inferenza

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

## Riga di comando di inferenza - Mac

- Elimina il dataset esistente con prefisso eval (se presente)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Riga di comando di inferenza

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
