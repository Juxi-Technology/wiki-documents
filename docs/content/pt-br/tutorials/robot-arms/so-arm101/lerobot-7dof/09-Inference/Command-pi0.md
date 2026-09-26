---
title: "Comando de inferência-pi0"
description: "Comando de inferência do modelo pi0 para Ubuntu e macOS: ajuste as variáveis de ambiente e os parâmetros de compilação e veja o motivo do travamento no Mac."
---

# Comando de inferência\-pi0

> **Atenção:** as versões mais recentes do LeRobot moveram a inferência de política para o comando dedicado `lerobot-rollout`; o `lerobot-record` agora serve apenas para a coleta de dados. O comando `lerobot-record --policy.path` abaixo aplica-se às versões anteriores.

## Ubuntu

- Excluir o conjunto de dados existente que começa com eval (se houver)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
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
  --dataset.push_to_hub=false \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/pi0/50K/pretrained_model
```

![b04cfa2962f16a1e354063623e5f86e3\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/1.png)

![a5c84c9e12afe207fc64f99d1116e770\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/3.png)



## Mac

- Excluir o conjunto de dados existente que começa com eval (se houver)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- Linha de comando de inferência

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

## Motivo do movimento travado do braço robótico ao usar inferência no Mac

- O conjunto de dados é pequeno demais

- A VRAM da placa de vídeo não é suficiente; é preciso usar uma placa da série 50



