---
title: "Línea de comandos de inferencia-pi0"
description: "Comando de despliegue del modelo pi0 en Ubuntu y Mac, con los parámetros específicos para CPU, y explicación de los tirones del brazo al inferir en Mac."
---

# Línea de comandos de inferencia\-pi0

> **Nota:** Las versiones más recientes de LeRobot trasladaron la inferencia de políticas al comando dedicado `lerobot-rollout`; `lerobot-record` ahora se usa únicamente para recopilar datos. El comando `lerobot-record --policy.path` que aparece a continuación se aplica a versiones anteriores.

## Ubuntu

- Eliminar el conjunto de datos existente que empieza por eval (si lo hay)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
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
  --dataset.push_to_hub=false \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/pi0/50K/pretrained_model
```

![b04cfa2962f16a1e354063623e5f86e3\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/1.png)

![a5c84c9e12afe207fc64f99d1116e770\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/3.png)



## Mac

- Eliminar el conjunto de datos existente que empieza por eval (si lo hay)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Línea de comandos de inferencia

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.freeze_vision_encoder=false \
  --policy.dtype=bfloat16 \
  --policy.compile_model=true \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.device=cpu \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/pi0/50K/pretrained_model
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

## Por qué al inferir con Mac el brazo robótico da tirones

- El conjunto de datos es demasiado pequeño

- La VRAM de la tarjeta gráfica no es suficiente; hay que pasar a una tarjeta de la serie 50



