---
title: "Etapa 8: Comando de inferência — pi0.5"
description: "Comando de inferência do modelo pi05 para Ubuntu e macOS, com os parâmetros extras usados no Mac e a explicação da velocidade baixa de inferência."
---

# Etapa 8: Comando de inferência — pi0.5

> A implantação usa sempre `lerobot-rollout`; para o uso e os parâmetros, consulte [Descrição da linha de comando](/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)。

## Ubuntu

- Excluir o dataset existente (se houver)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- Linha de comando de implantação

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

## Motivos da inferência lenta

- O dataset é pequeno demais

- A VRAM da placa de vídeo não é suficiente; é preciso usar uma placa da série 50

<RelatedProducts slugs="so-arm101" />
