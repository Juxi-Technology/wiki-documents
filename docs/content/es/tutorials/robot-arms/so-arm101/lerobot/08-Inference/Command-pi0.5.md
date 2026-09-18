---
title: "Paso 8: Comando de despliegue pi0.5"
description: "Comando de despliegue del modelo pi0.5 en Ubuntu y Mac, con los parámetros de inferencia en CPU y las causas de la lentitud al desplegar en Mac."
---

# Paso 8: Comando de despliegue pi0.5

> El despliegue usa siempre `lerobot-rollout`; para el uso y los parámetros, consulta [Descripción de la línea de comandos](/es/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference).

## Ubuntu

- Eliminar el conjunto de datos existente (si lo hay)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- Línea de comandos de despliegue

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

- Eliminar el conjunto de datos existente (si lo hay)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- Línea de comandos de despliegue

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

## Por qué la inferencia es muy lenta

- El conjunto de datos es demasiado pequeño

- La VRAM de la tarjeta gráfica no es suficiente; hay que pasar a una tarjeta de la serie 50

<RelatedProducts slugs="so-arm101" />
