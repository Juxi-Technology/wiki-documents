---
title: "Étape 8 : Commande de déploiement pi0.5"
description: "Déployez le modèle pi0.5 sous Ubuntu et sur Mac, avec les paramètres de calcul adaptés à chaque machine et des explications si l'inférence est très lente."
---

# Étape 8 : Commande de déploiement pi0.5

> Le déploiement utilise uniformément `lerobot-rollout` ; pour l'usage et les paramètres, voir [Description de la ligne de commande](/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference).

## Ubuntu

- Supprimer le dataset existant (le cas échéant)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- Ligne de commande de déploiement

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<你的用户名>/Downloads/lerobot_output/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- Supprimer le dataset existant (le cas échéant)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- Ligne de commande de déploiement

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.freeze_vision_encoder=false \
  --policy.dtype=bfloat16 \
  --policy.compile_model=true \
  --policy.device=cpu \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/2.jpg)

## Pourquoi l'inférence est très lente

- Le dataset est trop petit

- La VRAM de la carte graphique est insuffisante ; il faut passer à une carte graphique de la série 50

<RelatedProducts slugs="so-arm101" />
