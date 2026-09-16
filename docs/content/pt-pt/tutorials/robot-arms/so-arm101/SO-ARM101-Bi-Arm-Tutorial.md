---
title: Tutorial do braço duplo SO-ARM101 (dois braços seguidores)
description: "Apresenta o fluxo completo do sistema de braço duplo SO-ARM101 (dois braços seguidores): cablagem e calibração de hardware, teleoperação do braço duplo."
---

# Tutorial do braço duplo SO-ARM101 (dois braços seguidores)

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

Este guia apresenta o fluxo completo para treinar um sistema robótico SO-ARM de braço duplo com o LeRobot, incluindo ligação de hardware, calibração do braço duplo, teleoperação do braço duplo, recolha e gestão de datasets, treino de políticas ACT e implantação no robô real. Seguindo este guia, pode usar dois braços líder e dois braços seguidores para recolher dados de demonstração, treinar políticas de aprendizagem por imitação e executá-las nas máquinas reais.

Primeiro, faça as ligações da seguinte forma:

| Papel | Porta |
| --- | --- |
| Braço seguidor esquerdo | `/dev/ttyACM0` |
| Braço seguidor direito | `/dev/ttyACM1` |
| Braço líder esquerdo | `/dev/ttyACM2` |
| Braço líder direito | `/dev/ttyACM3` |

O tipo do braço seguidor é `so101_follower` e o do braço líder é `so101_leader` (no LeRobot, `so100_leader` e `so101_leader` partilham a mesma implementação).

## Preparação prévia

### Instalar dependências

Para a instalação do ambiente, consulte o [Tutorial de utilização do SO-ARM101](./SO-ARM101-Tutorial.md).

### Permissões USB

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. Calibração (passo crítico)

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

Após a calibração, os ficheiros ficam guardados em:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> Nota sobre os nomes dos diretórios: `so101_follower` e `so100_follower`, tal como `so101_leader` e `so100_leader`, partilham a mesma implementação, pelo que os diretórios são uniformizados como `so_follower` / `so_leader`; o braço líder é um teleoperator, por isso os ficheiros de calibração ficam em `teleoperators/` e não em `robots/`.

### (Opcional) Se já calibrou antes com outros IDs

Por exemplo, se antes usou `my_awesome_follower_arm1`, `my_awesome_follower_arm2`, etc., pode copiar os ficheiros de calibração:

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

## 2. Teleoperação do braço duplo

### 2.1 Sem câmara

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

### 2.2 Com câmara

Pode usar `lerobot-find-cameras opencv` para ver os índices das câmaras; além disso, pode adicionar ou remover câmaras conforme necessário.

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

### Aviso de segurança

- Tenha atenção ao ambiente em redor, para evitar colisões do braço seguidor.

## 3. Recolha de datasets

### 3.1 Guardar localmente (sem enviar para o Hub)

Adicione `--dataset.root` (os dados são escritos nesse diretório) e `--dataset.push_to_hub=false`, e acrescente `--dataset.no_stamp=true` para manter o nome do dataset estável (caso contrário, é acrescentado automaticamente um timestamp ao `repo_id`, e a recolha continuada, a reprodução e o treino posteriores deixam de o encontrar).

> Nota: recomenda-se que o `repo_id` inclua `/` (no formato `nome-de-utilizador/nome-do-dataset`); os datasets locais não são realmente enviados.

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

> A codificação de vídeo já é `libsvtav1` por predefinição, sem necessidade de a especificar; se quiser personalizar, use parâmetros aninhados como `--dataset.rgb_encoder.vcodec=h264`.

Os dados são guardados em `./datasets/bi_so101_task/`, com a estrutura:

```text
├── meta/
│   ├── info.json         # informações do dataset (fps, formas das características, etc.)
│   ├── episodes/         # metadados de cada episódio (chunk-000/...)
│   ├── stats.json        # estatísticas de normalização de cada característica
│   └── tasks.parquet     # texto da tarefa → task_index
├── data/                 # dados de cada fotograma (chunk-*.parquet)
└── videos/               # um subdiretório por câmara (chunk-*.mp4)
```

### 3.2 Enviar para o Hugging Face Hub

Se preferir o envio automático, mantenha `HF_USER` e remova `root` e `push_to_hub=false` (por predefinição é enviado). As portas e os índices das câmaras devem estar consistentes com a tabela de ligações:

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

> Após o envio, o repositório no Hub passa a chamar-se `${HF_USER}/bi_so101_task`, igual ao `repo_id` usado mais abaixo em 4.2 para treinar a partir do Hub. A cópia local é primeiro guardada em `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`.

### 3.3 Continuar a recolha (retomar de onde parou)

Se a recolha terminar de forma inesperada (por exemplo, ao sair com a tecla direita durante a fase de reset), ou se quiser completá-la em várias sessões, pode usar `--resume` para continuar a acrescentar episódios ao mesmo dataset.

**Atenção**:

- É obrigatório adicionar `--resume=true`; caso contrário, o `LeRobotDataset.create()` dá erro por o diretório já existir.
- O `--dataset.root` e o `--dataset.repo_id` do comando de continuação têm de ser exatamente iguais aos da primeira gravação (3.1) (o `resume` exige explicitamente um `root`).
- `--dataset.num_episodes` refere-se a **quantos episódios gravar nesta sessão**, não ao objetivo total. Por exemplo, se já gravou 15 e quer chegar aos 50, escreva `35`.
- Ao sair, faça-o de preferência durante a gravação de um episódio ou logo após o seu término natural, para evitar sair na fase «Reset the environment» (o que faria falhar a gravação de um episódio vazio).

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

### 3.4 Reprodução e eliminação de episódios

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

> O `episode` é um índice com base 0; `24` significa o 25.º episódio.

#### Eliminar um episódio específico

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

Após a eliminação, o dataset é reescrito no local e os dados originais são salvaguardados em `./datasets/bi_so101_task_old/`. Depois de confirmar que o novo dataset está correto, pode eliminar manualmente a cópia de segurança:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### Eliminar o dataset completo

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. Treino ACT

### 4.1 Treinar a partir de um dataset local

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

> O `--dataset.root` aponta para o diretório do dataset gravado em 3.1 (o `repo_id` tem de ser igual ao da gravação). Se o diretório `--output_dir` já existir, é apresentado diretamente um `FileExistsError`; mude para um novo diretório de saída ou acrescente `--resume=true` para continuar o treino.

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

> Acima são usados os parâmetros predefinidos do ACT (`chunk_size=100`, `dim_model=512`, etc.).

> O `repo_id` tem de ser igual ao nome do repositório do envio em 3.2 (em 3.2 já foi acrescentado `--dataset.no_stamp=true`, pelo que o nome do repositório fica fixo em `${HF_USER}/bi_so101_task`). No treino não é preciso `--dataset.root`; o download a partir do Hub é feito automaticamente.

## 5. Implantação no robô real

> Nota: o `lerobot-record` serve apenas para recolher dados de demonstração. Para implantar uma política treinada, use o `lerobot-rollout` — na versão atual, o `lerobot-record` já não aceita `--policy.path` e também rejeita nomes de dataset com o prefixo `eval_`.

### 5.1 Avaliação em direto (sem gravar dados)

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
- Para assumir o controlo ou parar a meio, acrescente `--interactive=true` e use no terminal comandos como `/stop` e `/reset`.

### 5.2 Avaliar e gravar dados (local)

Use a estratégia `episodic` (comportamento semelhante ao antigo `lerobot-record`, grava por episódio com uma fase de reset):

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

> O nome do dataset de implantação tem de começar por `rollout_` (convenção obrigatória da versão atual). Ao gravar localmente, recomenda-se acrescentar `--dataset.root` e `--dataset.no_stamp=true` para evitar que seja acrescentado um timestamp ao nome do diretório.

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
| A teleoperação pede para recalibrar | O `bi_so_follower` não encontra os ficheiros de calibração com sufixo `_left` / `_right` | Recalibrar com IDs com `_left` / `_right`, ou copiar os ficheiros de calibração existentes |
| O braço líder não se deixa arrastar | O binário do leader não foi desativado | Recalibrar ou verificar os motores |
| A continuação da recolha dá erro de diretório já existente | Não foi adicionado `--resume=true` | Acrescentar `--resume=true` ao comando `lerobot-record` |
| Com `--resume=true` dá erro a exigir `root` | A recolha continuada exige a especificação explícita do diretório do dataset | Acrescentar `--dataset.root=./datasets/bi_so101_task` ao comando de continuação, mantendo-o consistente com a primeira gravação |
| O nome do diretório do dataset fica com um timestamp e a reprodução/treino não o encontram | Na gravação não foi definido `no_stamp` e o `repo_id` ficou com um timestamp acrescentado automaticamente | Acrescentar `--dataset.no_stamp=true` na gravação/continuação |
| `--dataset.vcodec=...` dá erro de parâmetro inexistente | Parâmetro de versão antiga; na versão atual os parâmetros de codificação de vídeo passaram a ser aninhados | Usar `--dataset.rgb_encoder.vcodec=h264` (o valor predefinido já é `libsvtav1`) |
| Na implantação, o `lerobot-record` dá erro de `--policy.path` / `eval_` | Na versão atual, o `lerobot-record` já não inclui capacidade de implantação de políticas | Na implantação, usar `lerobot-rollout --strategy.type=episodic`, com o nome do dataset a começar por `rollout_` |
| Braços esquerdo e direito trocados | Configuração de portas incorreta | Trocar `left_arm_config.port` e `right_arm_config.port` |
| O treino não encontra o dataset | O dataset local não tem `root` especificado | Acrescentar `--dataset.root=./datasets/xxx` no treino |
| O dataset é enviado automaticamente | Não foi definido `push_to_hub=false` | Acrescentar `--dataset.push_to_hub=false` na gravação |
| Ao sair dá o erro `You must add one or several frames before calling add_episode` | Saída durante a fase de reset; o episódio atual não tem fotogramas | Não afeta os dados já gravados; usar `--resume=true` para continuar a recolha |

<RelatedProducts slugs="so-arm101" />
