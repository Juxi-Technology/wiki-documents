---
title: "Descrição da linha de comando"
description: "Entenda a linha de comando de implantação do LeRobot: os modos base e episodic, a validação dos parâmetros da câmera e o uso de modelos do Hugging Face."
---

# Descrição da linha de comando

> **Atenção:** as versões mais recentes do LeRobot moveram a inferência de política para o comando dedicado `lerobot-rollout`; o `lerobot-record` agora serve apenas para a coleta de dados. O comando `lerobot-record --policy.path` abaixo aplica-se às versões anteriores.

## Descrição da linha de comando

Com visualização em tempo real: \-\-display\_data=true

Sem visualização em tempo real: \-\-display\_data=false

Quando `--display_data=true`, a interface de visualização do rerun\.io é iniciada, mas no diretório `/Users/tommy/.cache/huggingface/lerobot/eval_lerobot_my_dataset_a/images/observation.images.front/episode-000000` a imagem de cada frame é salva, o que ocupa bastante espaço. Depois, pode ser definido como `--display_data=false`



Inferência de um modelo do Repo de modelos do HuggingFace: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Usando a tarefa de pegar laranjas como exemplo

- Inferência de um modelo local (com visualização em tempo real)

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferência de um modelo local (sem visualização em tempo real)

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferência de um modelo do Repo de modelos do HuggingFace

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

Após a execução, o modelo será baixado

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









