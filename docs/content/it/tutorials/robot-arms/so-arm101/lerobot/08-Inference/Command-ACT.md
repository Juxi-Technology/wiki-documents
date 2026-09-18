---
title: "Passo 8: Comando di deployment ACT"
description: "Deployment di ACT su Ubuntu e Mac: comandi per i due sistemi, rimozione del dataset di rollout esistente e avvio del modello addestrato sulla stretta di mano."
---

# Passo 8: Comando di deployment ACT

> Per il deployment si usa uniformemente `lerobot-rollout`; per l'uso e i parametri vedi [Descrizione dei comandi](/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference).

## Ubuntu

- Eliminare il dataset esistente (se presente)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- Comando di deployment

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<你的用户名>/Downloads/lerobot_output/shake/ACT/5K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- Eliminare il dataset esistente (se presente)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- Comando di deployment

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/shake/ACT/5K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
