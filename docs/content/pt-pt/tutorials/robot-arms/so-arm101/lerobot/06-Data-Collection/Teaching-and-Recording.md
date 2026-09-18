---
title: "Etapa 6: Recolha de conjuntos de dados por ensino"
description: "Recolha de conjuntos de dados por ensino: gravação de episódios com uma ou duas câmaras, marcadores de posição e cuidados a ter durante a demonstração."
---

# Etapa 6: Recolha de conjuntos de dados por ensino

## Marcadores de posição nos comandos: substitua-os primeiro pelas suas próprias informações

O tutorial descreve passos de operação genéricos; por isso, a partir deste passo, os comandos usarão dois marcadores de posição que representam informações que só você possui. Substitua-os conforme as instruções abaixo e, ao substituir, **remova também os sinais de menor e maior**:

| Marcador de posição | O que representa | Como substituir |
|---|---|---|
| `<你的用户名>` | O nome de utilizador do sistema do seu computador, ou seja, o nome do diretório pessoal | Basta escrever `whoami` no terminal para o ver |
| `<用户名>` | O nome da sua conta HuggingFace | Após iniciar sessão no HuggingFace, veja o nome da conta junto ao avatar no canto superior direito |

Um exemplo. Suponha que a saída de `whoami` no terminal seja `zhangsan` e que o nome da sua conta HuggingFace também seja `zhangsan`; então

- `/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/` deve ser escrito como `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/`
- `<用户名>/lerobot_my_dataset_a` deve ser escrito como `zhangsan/lerobot_my_dataset_a`

> Substitua estes dois marcadores de posição em todos os comandos seguintes da mesma forma.

> **Atenção**: o primeiro comando abaixo é `sudo rm -rf`, cuja função é eliminar o diretório. Confirme que o caminho já foi substituído pelo seu antes de premir Enter.

## Eliminar o conjunto de dados com o mesmo nome já existente (se houver)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a
```

## Uma câmara, recolher o conjunto de dados-Computador Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Duas câmaras, recolher o conjunto de dados-Computador Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Em recolha

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

Operações com as teclas de seta do teclado:
→ (seta para a direita) Encerra antecipadamente o episode atual; avança para o próximo episode.
← (seta para a esquerda) Cancela o episode atual; grava novamente.
ESC, para imediatamente, codifica o vídeo e carrega o conjunto de dados.

## Recolha concluída, diretório de guarda do conjunto de dados

```Shell
/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a
```

## Aperto de mão

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

Após a recolha, o conjunto de dados de aperto de mão é guardado em:

```Shell
/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_shake_hands
```

## Sobre os dois conjuntos de dados usados no tutorial

Este artigo demonstra duas tarefas, cada uma com uma finalidade diferente:

- **Apanhar laranjas `lerobot_my_dataset_a`**: corresponde aos dois comandos de recolha "uma câmara" e "duas câmaras" acima, e é também o exemplo usado no artigo [Treino local no Ubuntu](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
- **Aperto de mão `lerobot_my_dataset_shake_hands`**: corresponde ao comando "Aperto de mão" acima. Do treino no sétimo passo até à implementação no oitavo passo, o tutorial usa-o de forma unificada como exemplo, por isso verá que tanto `--dataset.repo_id` como `--dataset.root` nos comandos de treino apontam para ele

Ou seja, **o conjunto de dados de aperto de mão é o exemplo principal da segunda metade do tutorial**; recolha-o de acordo com ele. Quanto a parâmetros como `--dataset.num_episodes=30` e `--dataset.episode_time_s=12` no comando, basta ajustá-los de acordo com a sua própria tarefa.

## Alguns pontos a que deve estar atento durante a recolha

- O braço líder não deve aparecer na imagem, caso contrário o modelo também aprenderá o braço líder como característica; para detalhes, consulte [Notas sobre a recolha de conjuntos de dados](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
- Após cada ronda de recolha, coloque o objeto de volta no ponto de partida e mantenha os movimentos o mais consistentes possível; a consistência do conjunto de dados é mais importante do que a quantidade
- **Os parâmetros da câmara (resolução, fps, proporção) durante a recolha e a inferência devem ser exatamente iguais**. A resolução é gravada nos metadados do conjunto de dados e é validada durante o treino e a inferência; qualquer divergência causará um erro direto. Mesmo que não haja erro, uma resolução diferente significa um campo de visão (área de enquadramento) diferente, e o mundo que o modelo vê não corresponde ao do seu ensino. Este tutorial usa uniformemente `1280×720@30`; se quiser alterar para outro valor, os comandos dos três locais (recolha, teleoperação e implementação) devem ser alterados em conjunto
- Se sair a meio do processo, não pare na fase de reset, caso contrário esta ronda falhará ao ser guardada por não ter nenhuma frame (isto não afeta os dados já recolhidos)
- Se sair a meio do processo e quiser continuar a recolher, use `--resume=true`, e `--dataset.root` e `--dataset.repo_id` devem ser exatamente iguais aos da primeira vez

## Após a recolha

Os dados são guardados por predefinição em `~/.cache/huggingface/lerobot/<用户名>/`. A seguir:

1. Se quiser fazer uma cópia de segurança do conjunto de dados na nuvem, consulte [Carregar o conjunto de dados para o HuggingFace (opcional)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
2. Se estiver pronto para começar o treino, continue com [Sétimo passo: treinar o modelo](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); esse artigo começará por o orientar a carregar os dados para a plataforma de GPU na nuvem e a preparar o ambiente

<RelatedProducts slugs="so-arm101" />
