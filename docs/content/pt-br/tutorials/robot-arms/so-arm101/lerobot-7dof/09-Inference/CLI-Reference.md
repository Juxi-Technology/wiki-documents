---
title: "Descrição da linha de comando"
description: "Entenda a linha de comando de implantação do LeRobot: os modos base e episodic, a validação dos parâmetros da câmera e o uso de modelos do Hugging Face."
---

# Descrição da linha de comando

## Nota sobre a versão (importante, leia primeiro)

A partir do LeRobot **0.6.0**, os modelos treinados precisam ser implantados com `lerobot-rollout`. A forma antiga `lerobot-record --policy.path=...` já foi removida na versão **0.5.2**.

A primeira etapa deste tutorial instala o LeRobot com `git clone`, obtendo a versão mais recente do momento, portanto use as linhas de comando `lerobot-rollout` abaixo. Se você insistir em usar `lerobot-record`, o programa exibirá um erro direto e indicará que você mude para `lerobot-rollout`.

A divisão de funções entre os dois comandos é a seguinte:

- `lerobot-record`: responsável apenas por **coletar dados de demonstração** (é o que a etapa 7 usa); atualmente ele rejeita nomes de dataset que começam com `eval_`
- `lerobot-rollout`: responsável por **implantar os modelos treinados**, usando `--strategy.type` para escolher o modo de trabalho

## Parâmetros da linha de comando do rollout

| Parâmetro | Descrição |
|---|---|
| `--strategy.type` | Modo de trabalho. `base` apenas executa o modelo, sem gravar dados, para observar o efeito no local; `episodic` grava por episode e inclui uma fase de reset, com comportamento próximo ao do `lerobot-record` da versão antiga |
| `--policy.path` | Caminho do modelo, apontando para `checkpoints/last/pretrained_model` na saída do treinamento |
| `--task` | Descrição da tarefa, usada em conjunto com `--strategy.type=base` |
| `--duration` | Número de segundos de execução; `0` significa sem limite de tempo |
| `--interactive` | Adicione-o quando precisar assumir o controle no meio do processo; permite controlar no terminal com comandos como `/stop` e `/reset` |
| `--display_data` | Define se a interface de visualização do rerun.io é iniciada |
| `--policy.device` | Dispositivo de computação, como `cuda` e `cpu` |

## Descrição da linha de comando

Com visualização em tempo real: \-\-display\_data=true

Sem visualização em tempo real: \-\-display\_data=false

Quando `--display_data=true`, a interface de visualização do rerun\.io é iniciada, mas no diretório `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` a imagem de cada frame é salva, o que ocupa bastante espaço. Depois, pode ser definido como `--display_data=false`



Inferência de um modelo do Repo de modelos do HuggingFace: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Usando a tarefa de pegar laranjas como exemplo

- Inferência de um modelo local (com visualização em tempo real)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferência de um modelo local (sem visualização em tempo real)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inferência de um modelo do Repo de modelos do HuggingFace

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

Após a execução, o modelo será baixado

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









