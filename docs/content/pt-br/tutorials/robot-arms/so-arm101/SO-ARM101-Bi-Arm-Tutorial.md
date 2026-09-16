---
title: Tutorial de dois braços (dois seguidores) do SO-ARM101
description: "Fluxo completo do sistema SO-ARM101 de dois braços (dois seguidores): conexão e calibração do hardware, teleoperação com dois braços."
---

# Tutorial de dois braços (dois seguidores) do SO-ARM101

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

Este guia apresenta o fluxo completo de treinamento de um sistema robótico SO-ARM de dois braços com o LeRobot, incluindo conexão de hardware, calibração dos dois braços, teleoperação com dois braços, gravação e gerenciamento de dataset, treinamento da política ACT e implantação no robô real. Seguindo este guia, você pode usar dois braços líderes e dois braços seguidores para coletar dados de demonstração, treinar uma política de aprendizado por imitação e executá-la em braços robóticos reais.

Primeiro, conecte os cabos da seguinte forma:

| Papel | Porta |
| --- | --- |
| Braço seguidor esquerdo | `/dev/ttyACM0` |
| Braço seguidor direito | `/dev/ttyACM1` |
| Braço líder esquerdo | `/dev/ttyACM2` |
| Braço líder direito | `/dev/ttyACM3` |

O tipo do braço seguidor é `so101_follower` e o do braço líder é `so101_leader` (no LeRobot, `so100_leader` e `so101_leader` compartilham a mesma implementação).

## Preparação inicial

### Instalar as dependências

Para instalar o ambiente, consulte o [Tutorial de uso do SO-ARM101](./SO-ARM101-Tutorial.md).

### Permissões USB

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. Calibração (etapa fundamental)

### 1.1 Calibrar o braço seguidor esquerdo

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 Calibrar o braço seguidor direito

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 Calibrar o braço líder esquerdo

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 Calibrar o braço líder direito

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

Após a calibração, os arquivos são salvos em:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> Nota sobre os nomes dos diretórios: `so101_follower` e `so100_follower`, assim como `so101_leader` e `so100_leader`, compartilham a mesma implementação, por isso os diretórios são unificados em `so_follower` / `so_leader`; o braço líder é um teleoperator, então seus arquivos de calibração ficam em `teleoperators/` e não em `robots/`.

### (Opcional) Se você já calibrou antes com outro ID

Por exemplo, se você usava `my_awesome_follower_arm1`, `my_awesome_follower_arm2` etc., pode copiar os arquivos de calibração:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. Teleoperação com dois braços

### 2.1 Sem câmera

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 Com câmera

Use `lerobot-find-cameras opencv` para ver os índices das câmeras; você também pode adicionar ou remover câmeras conforme necessário.

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### Dicas de segurança

- Preste atenção ao ambiente ao redor para evitar colisões entre os braços seguidores.

## 3. Gravação do dataset

### 3.1 Salvar localmente (sem envio ao Hub)

Adicione `--dataset.root` (os dados são gravados nesse diretório) e `--dataset.push_to_hub=false`, além de `--dataset.no_stamp=true` para manter o nome do dataset estável (caso contrário, um timestamp é anexado automaticamente ao `repo_id`, e as gravações seguintes, a reprodução e o treinamento não o encontrarão).

> Observação: recomenda-se que o `repo_id` contenha `/` (no formato `nome_de_usuario/nome_do_dataset`); datasets locais não são realmente enviados.

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> A codificação de vídeo já é `libsvtav1` por padrão, não sendo necessário especificá-la; para personalizar, use parâmetros aninhados como `--dataset.rgb_encoder.vcodec=h264`.

Os dados são salvos em `./datasets/bi_so101_task/`, com a estrutura:

```text
├── meta/
│   ├── info.json         # informações do dataset (fps, formato das features etc.)
│   ├── episodes/         # metadados de cada episódio (chunk-000/...)
│   ├── stats.json        # estatísticas de normalização de cada feature
│   └── tasks.parquet     # texto da tarefa → task_index
├── data/                 # dados das features por quadro (chunk-*.parquet)
└── videos/               # um subdiretório por câmera (chunk-*.mp4)
```

### 3.2 Enviar para o Hugging Face Hub

Se você quiser envio automático, mantenha o `HF_USER` e remova `root` e `push_to_hub=false` (o padrão é enviar). As portas e os índices das câmeras devem permanecer consistentes com a tabela de conexão:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> O nome do repositório no Hub após o envio será `${HF_USER}/bi_so101_task`, consistente com o `repo_id` usado no treinamento a partir do Hub na seção 4.2 abaixo. A cópia local é salva primeiro em `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`.

### 3.3 Continuar a coleta (retomar a gravação)

Se a gravação for encerrada acidentalmente (por exemplo, ao sair com o botão direito durante a fase de reset), ou se você quiser completar a coleta em várias sessões, use `--resume` para continuar anexando episódios ao mesmo dataset.

**Atenção**:

- É obrigatório adicionar `--resume=true`, caso contrário `LeRobotDataset.create()` dá erro porque o diretório já existe.
- O `--dataset.root` e o `--dataset.repo_id` do comando de retomada devem ser exatamente iguais aos da primeira gravação (3.1) (o `resume` exige `root` explícito).
- `--dataset.num_episodes` indica **quantos episódios gravar nesta vez**, não o total desejado. Por exemplo, se já gravou 15 e quer chegar a 50, escreva `35`.
- Ao sair, prefira sair durante a gravação de um episódio ou após o término natural, evitando sair na fase "Reset the environment" (isso faz a gravação de um episódio vazio falhar).

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 Reproduzir e excluir episódios

#### Reproduzir um episódio específico

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` é um índice com base 0; `24` representa o 25º episódio.

#### Excluir um episódio específico

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

Após a exclusão, o dataset é reescrito no local e os dados originais são copiados para `./datasets/bi_so101_task_old/`. Depois de confirmar que o novo dataset está correto, você pode excluir o backup manualmente:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### Excluir todo o dataset

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. Treinamento ACT

### 4.1 Treinar a partir do dataset local

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` aponta para o diretório do dataset gravado em 3.1 (o `repo_id` deve ser o mesmo da gravação). Se o diretório `--output_dir` já existir, ocorrerá diretamente um `FileExistsError`; use um novo diretório de saída ou adicione `--resume=true` para continuar o treinamento.

### 4.2 Treinar a partir do Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> Acima foram usados os parâmetros padrão do ACT (`chunk_size=100`, `dim_model=512` etc.).

> O `repo_id` deve ser igual ao nome do repositório do envio em 3.2 (a seção 3.2 inclui `--dataset.no_stamp=true`, então o nome do repositório é fixo em `${HF_USER}/bi_so101_task`). No treinamento não é necessário `--dataset.root`; o download é feito automaticamente do Hub.

## 5. Implantação no robô real

> Atenção: o `lerobot-record` serve apenas para coletar dados de demonstração. Para implantar uma política treinada, use o `lerobot-rollout` — a versão atual do `lerobot-record` não aceita mais `--policy.path` e também rejeita nomes de dataset com o prefixo `eval_`.

### 5.1 Avaliação em campo (sem gravar dados)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` é o número de segundos de execução; `0` significa sem limite de tempo.
- Se precisar assumir o controle ou parar no meio, adicione `--interactive=true` e use comandos como `/stop` e `/reset` no terminal.

### 5.2 Avaliar e gravar dados (local)

Use a estratégia `episodic` (comportamento semelhante à versão antiga do `lerobot-record`, gravando por episódio e com fase de reset):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> O nome do dataset de implantação deve começar com `rollout_` (regra obrigatória da versão atual). Ao gravar localmente, recomenda-se adicionar `--dataset.root` e `--dataset.no_stamp=true` para evitar que um timestamp seja anexado ao nome do diretório.

### 5.3 Enviar os dados de avaliação para o Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. Perguntas frequentes

| Problema | Causa | Solução |
| --- | --- | --- |
| Solicitação de recalibração durante a teleoperação | O `bi_so_follower` não encontra os arquivos de calibração com sufixo `_left` / `_right` | Recalibre com IDs que tenham `_left` / `_right` ou copie os arquivos de calibração existentes |
| Não é possível arrastar o braço líder | Torque do leader não foi desativado | Recalibre ou verifique os motores |
| Erro de diretório já existente ao continuar a coleta | Faltou `--resume=true` | Adicione `--resume=true` ao comando `lerobot-record` |
| Ao usar `--resume=true`, erro exigindo `root` | A retomada exige especificar explicitamente o diretório do dataset | Adicione `--dataset.root=./datasets/bi_so101_task` ao comando de retomada, mantendo-o igual ao da primeira gravação |
| Nome do diretório do dataset com timestamp extra; reprodução/treinamento não o encontram | `no_stamp` não foi definido na gravação e um timestamp foi anexado automaticamente ao `repo_id` | Adicione `--dataset.no_stamp=true` na gravação/retomada |
| `--dataset.vcodec=...` retorna parâmetro inexistente | Parâmetro da versão antiga; os parâmetros atuais de codificação de vídeo passaram a ser aninhados | Use `--dataset.rgb_encoder.vcodec=h264` (o padrão já é `libsvtav1`) |
| Na implantação, `lerobot-record` dá erro de `--policy.path` / `eval_` | A versão atual do `lerobot-record` não inclui mais capacidade de implantação de política | Use `lerobot-rollout --strategy.type=episodic` para implantar, com o nome do dataset começando com `rollout_` |
| Braços esquerdo e direito invertidos | Configuração de porta incorreta | Troque `left_arm_config.port` e `right_arm_config.port` |
| Dataset não encontrado no treinamento | O dataset local não teve `root` especificado | Adicione `--dataset.root=./datasets/xxx` no treinamento |
| Dataset enviado automaticamente | `push_to_hub=false` não foi definido | Adicione `--dataset.push_to_hub=false` na gravação |
| Ao sair, erro `You must add one or several frames before calling add_episode` | Saída durante a fase de reset, sem quadros no episódio atual | Não afeta os dados já gravados; use `--resume=true` para continuar a coleta |

<RelatedProducts slugs="so-arm101" />
