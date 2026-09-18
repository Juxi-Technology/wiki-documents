---
title: "Etapa 8: Descrição da linha de comando"
description: "Descrição dos parâmetros da linha de comando de implantação, das diferenças entre versões do LeRobot e dos modos base e episódico."
---

# Etapa 8: Descrição da linha de comando

## Nota sobre a versão (importante, ler primeiro)

A partir do LeRobot **0.6.0**, os modelos treinados têm de ser implantados com `lerobot-rollout`. A forma antiga `lerobot-record --policy.path=...` já tinha sido removida na versão **0.5.2**.

A primeira etapa deste tutorial instala o LeRobot com `git clone`, obtendo a versão mais recente do momento, pelo que deve usar as linhas de comando `lerobot-rollout` abaixo. Se insistir em usar `lerobot-record`, o programa apresenta imediatamente um erro e indica que mude para `lerobot-rollout`.

A divisão de funções entre os dois comandos é a seguinte:

- `lerobot-record`: responsável apenas por **recolher dados de demonstração** (é o que a etapa 6 usa); atualmente rejeita nomes de dataset que começam por `eval_`
- `lerobot-rollout`: responsável por **implantar os modelos treinados**, usando `--strategy.type` para escolher o modo de funcionamento

## Parâmetros da linha de comando do rollout

| Parâmetro | Descrição |
|---|---|
| `--strategy.type` | Modo de funcionamento. `base` apenas executa o modelo, sem gravar dados, para observar o efeito no local; `episodic` grava por episode e inclui uma fase de reset, com comportamento próximo do `lerobot-record` da versão antiga |
| `--policy.path` | Caminho do modelo, apontando para `checkpoints/last/pretrained_model` na saída do treino |
| `--task` | Descrição da tarefa, usada em conjunto com `--strategy.type=base` |
| `--duration` | Número de segundos de execução; `0` significa sem limite de tempo |
| `--interactive` | Acrescente-o quando precisar de assumir o controlo a meio do processo; permite controlar no terminal com comandos como `/stop` e `/reset` |
| `--display_data` | Define se a interface de visualização do rerun.io é iniciada |
| `--policy.device` | Dispositivo de computação, como `cuda` e `cpu` |

## Os parâmetros da câmara têm de ser iguais aos da recolha

Nos comandos abaixo, todos os `--robot.cameras` usam `1280×720@30`, valor uniformizado com [Recolha de dataset por demonstração](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Na implantação, é obrigatório manter a resolução, o fps e a proporção usados na recolha: a resolução é gravada nos metadados do dataset e passa por validação, e qualquer inconsistência gera erro imediato; mesmo que passe por sorte, um campo de visão diferente fará com que o "mundo visto" pelo modelo seja diferente daquele que demonstrou, e o resultado piora visivelmente.

## Sobre a visualização

`--display_data=true` inicia a interface de visualização do rerun.io e, ao mesmo tempo, guarda no diretório `/Users/<utilizador>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` a imagem de cada frame, o que ocupa bastante espaço; no uso oficial, pode ser definido como `--display_data=false`.

## Usando a tarefa de apanhar laranjas como exemplo

- Avaliação no local (com visualização em tempo real)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<utilizador>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
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
  --policy.path=/Users/<utilizador>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
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
  --policy.path=<utilizador>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

Após a execução, o modelo será descarregado

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- Avaliar e gravar dados (`--strategy.type=episodic`)

Se quiser gravar o processo como um dataset enquanto executa, substitua `base` por `episodic`. Neste modo, não se escreve `--task`; em vez disso usa-se `--dataset.single_task`, e é obrigatório indicar `--dataset.repo_id`:

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<utilizador>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<utilizador>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
