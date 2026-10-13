---
title: "Etapa 8: Comando de inferência — Diffusion"
description: "Execute a policy Diffusion treinada no SO-ARM101 com o lerobot-rollout, com vídeos de demonstração no robô real."
---

# Etapa 8: Comando de inferência — Diffusion

## Ubuntu

- Exclua o conjunto de dados existente com prefixo eval (se houver)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Linha de comando de inferência

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

- Exclua o conjunto de dados existente com prefixo eval (se houver)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Linha de comando de inferência

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

## Resultados: engasgos perceptíveis

[ea9ffc82e6501aa1c3af9d74dc551650.mp4](/downloads/ea9ffc82e6501aa1c3af9d74dc551650.mp4)

[02cfb7022f0828428e6fb10d62dc0e77.mp4](/downloads/02cfb7022f0828428e6fb10d62dc0e77.mp4)

<RelatedProducts slugs="so-arm101" />
