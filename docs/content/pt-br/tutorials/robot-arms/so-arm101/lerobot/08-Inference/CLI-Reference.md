---
title: "Etapa 8: Descrição da linha de comando"
description: "Entenda a linha de comando de implantação do LeRobot: os modos base e episodic, a validação dos parâmetros da câmera e o uso de modelos do Hugging Face."
---

# Etapa 8: Descrição da linha de comando

## Nota sobre a versão (importante, leia primeiro)

A partir do LeRobot **0.6.0**, os modelos treinados precisam ser implantados com `lerobot-rollout`. A forma antiga `lerobot-record --policy.path=...` já foi removida na versão **0.5.2**.

A primeira etapa deste tutorial instala o LeRobot com `git clone`, obtendo a versão mais recente do momento, portanto use as linhas de comando `lerobot-rollout` abaixo. Se você insistir em usar `lerobot-record`, o programa exibirá um erro direto e indicará que você mude para `lerobot-rollout`.

A divisão de funções entre os dois comandos é a seguinte:

- `lerobot-record`: responsável apenas por **coletar dados de demonstração** (é o que a etapa 6 usa); atualmente ele rejeita nomes de dataset que começam com `eval_`
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

## Os parâmetros da câmera devem ser iguais aos da coleta

Nos comandos abaixo, todos os `--robot.cameras` usam `1280×720@30`, valor padronizado com [Coleta de dataset por demonstração](/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Na implantação, é obrigatório manter a resolução, o fps e a proporção usados na coleta: a resolução é gravada nos metadados do dataset e passa por validação, e qualquer inconsistência gera erro imediato; mesmo que passe por sorte, um campo de visão diferente fará com que o "mundo visto" pelo modelo seja diferente do que você demonstrou, e o resultado piorará visivelmente.

## Sobre a visualização

`--display_data=true` inicia a interface de visualização do rerun.io e, ao mesmo tempo, salva no diretório `/Users/<你的用户名>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` a imagem de cada frame, o que ocupa bastante espaço; no uso oficial, pode ser definido como `--display_data=false`.

## Usando a tarefa de pegar laranjas como exemplo

- Avaliação no local (com visualização em tempo real)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

- Avaliação no local (sem visualização em tempo real)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=false
```

- Fazer inferência de um modelo no repositório de modelos do HuggingFace

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<用户名>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

Após a execução, o modelo será baixado

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- Avaliar e gravar dados (`--strategy.type=episodic`)

Se quiser gravar o processo como um dataset enquanto executa, troque `base` por `episodic`. Neste modo, não se escreve `--task`; em vez disso, usa-se `--dataset.single_task`, e é obrigatório informar `--dataset.repo_id`:

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<用户名>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
