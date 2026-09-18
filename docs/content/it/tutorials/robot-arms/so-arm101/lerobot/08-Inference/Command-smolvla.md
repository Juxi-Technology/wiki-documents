---
title: "Passo 8: Comando di deployment SmolVLA"
description: "Deployment di SmolVLA su Ubuntu e Mac: comandi completi con il percorso del modello e i parametri principali per entrambi i sistemi operativi."
---

# Passo 8: Comando di deployment SmolVLA

> Per il deployment si usa uniformemente `lerobot-rollout`; per l'uso e i parametri vedi [Descrizione dei comandi](/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference).

## Ubuntu

- Eliminare il dataset esistente (se presente)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/rollout_lerobot_my_dataset_shake_hands
```

- Comando di deployment

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<nome-utente>/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- Eliminare il dataset esistente (se presente)

```Shell
sudo rm -rf /Users/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/rollout_lerobot_my_dataset_shake_hands
```

- Comando di deployment

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<nome-utente>/Downloads/7-lerobot/shake/smolvla/40K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/2.png)

<RelatedProducts slugs="so-arm101" />
