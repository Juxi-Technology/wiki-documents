---
title: "Inferenzbefehl-smolvla"
description: "Zeigt den Deployment-Befehl für SmolVLA unter Ubuntu und macOS mit dem Handschlag-Modell, der Aufgabenbeschreibung und einer kurzen Laufzeit."
---

# Inferenzbefehl\-smolvla

> Für das Deployment wird einheitlich `lerobot-rollout` verwendet; Verwendung und Parameter siehe [Erläuterung der Befehle](/de/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference).

## Ubuntu

- Vorhandenen Datensatz, dessen Name mit rollout beginnt, löschen (falls vorhanden)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
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
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model
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
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/smolvla/40K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=2000
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/2.png)



