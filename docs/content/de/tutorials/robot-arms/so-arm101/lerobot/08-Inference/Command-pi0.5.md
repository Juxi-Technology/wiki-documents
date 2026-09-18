---
title: "Schritt 8: Deploy-Befehl für pi0.5"
description: "Zeigt den Deployment-Befehl für das verbesserte pi0-Modell unter Ubuntu und macOS sowie mögliche Ursachen für eine langsame Inferenz."
---

# Schritt 8: Deploy-Befehl für pi0.5

> Für das Deployment wird einheitlich `lerobot-rollout` verwendet; Verwendung und Parameter siehe [Erläuterung der Befehle](/de/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference).

## Ubuntu

- Vorhandenen Datensatz löschen (falls vorhanden)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<Benutzername>/.cache/huggingface/lerobot/<Benutzername>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- Deploy-Befehl

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<Benutzername>/Downloads/lerobot_output/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- Vorhandenen Datensatz löschen (falls vorhanden)

```Shell
sudo rm -rf /Users/<Benutzername>/.cache/huggingface/lerobot/<Benutzername>/rollout_lerobot_my_dataset_shake_hands
```

- Deploy-Befehl

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
  --policy.path=/Users/<Benutzername>/Downloads/7-lerobot/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/2.jpg)

## Ursachen für langsames Inferieren

- Der Datensatz ist zu klein

- Der VRAM der Grafikkarte reicht nicht aus, es wird eine 50er-Grafikkartenserie benötigt

<RelatedProducts slugs="so-arm101" />
