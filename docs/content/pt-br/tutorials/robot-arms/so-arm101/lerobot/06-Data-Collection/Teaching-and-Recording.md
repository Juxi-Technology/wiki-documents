---
title: "Etapa 6: Coleta de dados por demonstração"
description: "Aprenda a coletar o conjunto de dados por demonstração: substitua os placeholders, grave episódios das tarefas de exemplo e confira os cuidados com câmera."
---

# Etapa 6: Coleta de dados por demonstração

## Os placeholders nos comandos: substitua-os primeiro pelas suas próprias informações

O tutorial descreve etapas de operação genéricas, portanto, a partir desta etapa, os comandos usarão dois placeholders que representam informações que só você possui. Substitua-os conforme as instruções abaixo e, ao substituir, **remova também os sinais de menor e maior**:

| Placeholder | O que ele representa | Como substituir |
|---|---|---|
| `<你的用户名>` | O nome de usuário do sistema do seu computador, ou seja, o nome do diretório home | Digite `whoami` no terminal para vê-lo |
| `<用户名>` | O nome da sua conta do HuggingFace | Após fazer login no HuggingFace, veja o nome da conta ao lado do avatar no canto superior direito |

Um exemplo. Suponha que a saída de `whoami` no terminal seja `zhangsan` e que o nome da sua conta do HuggingFace também seja `zhangsan`; então

- `/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/` deve ser escrito como `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/`
- `<用户名>/lerobot_my_dataset_a` deve ser escrito como `zhangsan/lerobot_my_dataset_a`

> Substitua esses dois placeholders em todos os comandos seguintes da mesma forma.

> **Atenção**: o primeiro comando abaixo é `sudo rm -rf`, cuja função é excluir diretórios. Confirme que o caminho já foi substituído pelo seu antes de pressionar Enter.

## Excluir o conjunto de dados com o mesmo nome já existente (se houver)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a
```

## Uma câmera, coletar o conjunto de dados - Computador Mac

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

## Duas câmeras, coletar o conjunto de dados - Computador Mac

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

## Coletando

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

Operações com as teclas de seta do teclado:
→ (seta para a direita) Encerra antecipadamente o episode atual; avança para o próximo episode.
← (seta para a esquerda) Cancela o episode atual; grava novamente.
ESC, para imediatamente, codifica o vídeo e envia o conjunto de dados.

## Coleta concluída, diretório de salvamento do conjunto de dados

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

Após a coleta, o conjunto de dados de aperto de mão será salvo em:

```Shell
/Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_shake_hands
```

## Sobre os dois conjuntos de dados usados no tutorial

Este artigo demonstra duas tarefas, cada uma com uma finalidade diferente:

- **Pegar laranjas `lerobot_my_dataset_a`**: corresponde aos dois comandos de coleta "uma câmera" e "duas câmeras" acima, e também é o exemplo usado no artigo [Treinamento local no Ubuntu](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
- **Aperto de mão `lerobot_my_dataset_shake_hands`**: corresponde ao comando "Aperto de mão" acima. Do treinamento na sétima etapa até a implantação na oitava etapa, o tutorial usa esse conjunto como exemplo de forma unificada, por isso você verá que tanto `--dataset.repo_id` quanto `--dataset.root` nos comandos de treinamento apontam para ele

Ou seja, **o conjunto de dados de aperto de mão é o exemplo principal da segunda metade do tutorial**, portanto colete-o dessa forma. Quanto a parâmetros como `--dataset.num_episodes=30` e `--dataset.episode_time_s=12` no comando, basta ajustá-los de acordo com a sua própria tarefa.

## Alguns pontos a observar durante a coleta

- O braço líder não deve aparecer na imagem, caso contrário o modelo aprenderá o braço líder como característica também; para detalhes, consulte [Observações sobre a coleta de conjuntos de dados](/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
- Após cada rodada de coleta, coloque o objeto de volta no ponto de partida e mantenha os movimentos o mais consistentes possível; a consistência do conjunto de dados é mais importante que a quantidade
- **Os parâmetros da câmera (resolução, fps, proporção) durante a coleta e a inferência devem ser exatamente iguais**. A resolução é gravada nos metadados do conjunto de dados e é validada durante o treinamento e a inferência; qualquer divergência causará um erro direto. Mesmo que não haja erro, uma resolução diferente significa um campo de visão (área de enquadramento) diferente, e o mundo que o modelo vê não corresponde ao do seu ensino. Este tutorial usa uniformemente `1280×720@30`; se quiser alterar para outro valor, os comandos dos três locais (coleta, teleoperação e implantação) devem ser alterados juntos
- Se sair no meio do processo, não pare na fase de reset, caso contrário esta rodada falhará ao ser salva por não ter nenhum frame (isso não afeta os dados já coletados)
- Se você sair no meio do processo e quiser continuar coletando, use `--resume=true`, e `--dataset.root` e `--dataset.repo_id` devem ser exatamente iguais aos da primeira vez

## Após a coleta

Os dados são salvos por padrão em `~/.cache/huggingface/lerobot/<用户名>/`. A seguir:

1. Se quiser fazer backup do conjunto de dados na nuvem, consulte [Enviar o conjunto de dados para o HuggingFace (opcional)](/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
2. Se estiver pronto para começar o treinamento, continue com [Sétima etapa: treinar o modelo](/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); esse artigo primeiro orientará você a enviar os dados para a plataforma de GPU na nuvem e preparar o ambiente

<RelatedProducts slugs="so-arm101" />
