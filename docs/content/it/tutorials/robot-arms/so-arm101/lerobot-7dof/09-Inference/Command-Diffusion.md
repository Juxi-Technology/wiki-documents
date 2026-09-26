---
title: "Comando di inferenza-Diffusion"
description: "Deployment di una policy Diffusion addestrata sul braccio a 7DOF: rimozione del dataset rollout esistente e comando di inferenza completo."
---

# Comando di inferenza\-Diffusion

> Per il deployment si usa uniformemente `lerobot-rollout`; per l'uso e i parametri vedi [Descrizione dei comandi](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference).

## Ubuntu

- Eliminare il dataset esistente che inizia con rollout (se presente)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- Comando di inferenza

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/Diffusion/15K/pretrained_model
```

## Mac

- Eliminare il dataset esistente che inizia con rollout (se presente)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- Comando di inferenza

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands

lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/Diffusion/5K/pretrained_model
```



