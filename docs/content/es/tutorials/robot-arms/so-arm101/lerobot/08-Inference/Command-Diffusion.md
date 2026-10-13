---
title: "Paso 8: Comando de despliegue Diffusion"
description: "Ejecuta la política Diffusion entrenada en el SO-ARM101 con lerobot-rollout, con vídeos de demostración en el robot real."
---

# Paso 8: Comando de despliegue Diffusion

## Ubuntu

- Elimina el conjunto de datos existente con prefijo eval (si lo hay)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Línea de comandos de inferencia

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
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/Diffusion/15K/pretrained_model
```

## Mac

- Elimina el conjunto de datos existente con prefijo eval (si lo hay)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Línea de comandos de inferencia

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands

lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/Diffusion/5K/pretrained_model
```

## Resultados: tartamudeo perceptible

[ea9ffc82e6501aa1c3af9d74dc551650.mp4](/downloads/ea9ffc82e6501aa1c3af9d74dc551650.mp4)

[02cfb7022f0828428e6fb10d62dc0e77.mp4](/downloads/02cfb7022f0828428e6fb10d62dc0e77.mp4)

<RelatedProducts slugs="so-arm101" />
