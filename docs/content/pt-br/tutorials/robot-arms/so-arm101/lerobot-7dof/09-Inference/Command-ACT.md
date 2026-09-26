---
title: "Comando de inferência-ACT"
description: "Comando de inferência do modelo ACT para Ubuntu e macOS: limpe a pasta de saída anterior e execute a tarefa de aperto de mão com o braço real."
---

# Comando de inferência\-ACT

> A implantação usa sempre `lerobot-rollout`; para o uso e os parâmetros, consulte [Descrição da linha de comando](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference).

## Ubuntu

- Excluir o conjunto de dados existente que começa com rollout (se houver)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- Linha de comando de inferência

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
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/ACT/5K/pretrained_model
```

## Mac

- Excluir o conjunto de dados existente que começa com rollout (se houver)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- Linha de comando de inferência

```Shell
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
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/ACT/5K/pretrained_model
```



