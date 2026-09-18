---
title: "Etapa 8: Comando de implantação ACT"
description: "Linha de comando de implantação do modelo ACT no Ubuntu e no macOS, com a eliminação do conjunto de dados existente antes de executar."
---

# Etapa 8: Comando de implantação ACT

> A implantação usa sempre `lerobot-rollout`; para o uso e os parâmetros, consulte [Descrição da linha de comando](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)。

## Ubuntu

- Eliminar o dataset existente (se existir)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- Linha de comando de implantação

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

- Eliminar o dataset existente (se existir)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- Linha de comando de implantação

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
