---
title: "Etapa 8: Comando de inferência — SmolVLA"
description: "Comando de inferência do modelo SmolVLA para Ubuntu e macOS: remova a pasta de saída anterior e execute o modelo na tarefa de aperto de mão."
---

# Etapa 8: Comando de inferência — SmolVLA

> A implantação usa sempre `lerobot-rollout`; para o uso e os parâmetros, consulte [Descrição da linha de comando](/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)。

## Ubuntu

- Excluir o dataset existente (se houver)

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
  --policy.path=/home/<你的用户名>/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- Excluir o dataset existente (se houver)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- Linha de comando de implantação

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/shake/smolvla/40K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/2.png)

<RelatedProducts slugs="so-arm101" />
