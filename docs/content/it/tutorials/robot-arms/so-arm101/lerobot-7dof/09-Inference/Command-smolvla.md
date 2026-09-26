---
title: "Comando di inferenza-smolvla"
description: "Deployment di SmolVLA su Ubuntu e Mac: comandi completi con il percorso del modello e i parametri principali per entrambi i sistemi operativi."
---

# Comando di inferenza\-smolvla

> **Nota:** Le versioni più recenti di LeRobot hanno spostato l'inferenza della policy sul comando dedicato `lerobot-rollout`; ora `lerobot-record` serve solo per la raccolta dati. Il comando `lerobot-record --policy.path` qui sotto si applica alle versioni precedenti.

## Ubuntu

- Eliminare il dataset esistente che inizia con eval (se presente)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Comando di inferenza

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
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model
```

## Mac

- Eliminare il dataset esistente che inizia con eval (se presente)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Comando di inferenza

```Shell
lerobot-record  \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
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



