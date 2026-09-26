---
title: "Inferenzbefehl-pi0.5"
description: "Zeigt den Deployment-Befehl für das verbesserte pi0-Modell unter Ubuntu und macOS sowie mögliche Ursachen für eine langsame Inferenz."
---

# Inferenzbefehl\-pi0\.5

> Für das Deployment wird einheitlich `lerobot-rollout` verwendet; Verwendung und Parameter siehe [Erläuterung der Befehle](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference).

## Ubuntu

- Vorhandenen Datensatz, dessen Name mit rollout beginnt, löschen (falls vorhanden)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- Inferenzbefehl

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
  --dataset.push_to_hub=false \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/pi05/50K/pretrained_model
```













## Mac

- Vorhandenen Datensatz, dessen Name mit rollout beginnt, löschen (falls vorhanden)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- Inferenzbefehl

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.freeze_vision_encoder=false \
  --policy.dtype=bfloat16 \
  --policy.compile_model=true \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.device=cpu \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/pi0/50K/pretrained_model
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

## Ursachen für langsames Inferieren

- Der Datensatz ist zu klein

- Der VRAM der Grafikkarte reicht nicht aus, es wird eine 50er\-Grafikkartenserie benötigt



