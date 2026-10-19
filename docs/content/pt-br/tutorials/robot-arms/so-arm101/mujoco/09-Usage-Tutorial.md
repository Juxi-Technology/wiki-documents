---
title: "09 · Tutorial de uso completo (iniciar o braço → conjunto de dados → assistir aos vídeos → treinamento → implantação)"
---

# 09 · Tutorial de uso completo (iniciar o braço → conjunto de dados → assistir aos vídeos → treinamento → implantação)

> Manual de operação de ponta a ponta: basta seguir uma vez para ir de "conectar o braço líder" até "a política treinada trabalhando sozinha na simulação".
> Execute este documento na ordem dos capítulos — todas as dependências (incluindo o extra `training` usado no treinamento) são instaladas de uma vez no [01](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment),
> sem necessidade de instalar nada no meio do caminho.
> Pré-requisito: ambiente instalado conforme o [01](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment) e braço líder calibrado conforme o [03](/pt-br/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)
> (nesta máquina, `juxi_leader` / COM124). Todas as armadilhas relacionadas à gravação estão concentradas no [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

## 0 · Preparação única

```bash
# 本机所有 uv 命令都要先设（跨盘缓存特例，见 07）
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
```

Conecte o braço líder e confirme a porta serial (**o número pode mudar a cada conexão**):

```bash
uv run --frozen python -c "from serial.tools import list_ports; print([p.device for p in list_ports.comports()])"
```

Deixe espaço na mesa: a gravação abre **3 janelas** (visão principal + `wrist camera - live` + `top camera - live`).

## 1 · Aquecimento de teleoperação (recomendado)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

Mova o braço líder e confirme que o braço simulado acompanha; antes de sair (Ctrl-C), pare o braço líder **perto da pose central**, para não haver um grande trecho de convergência no instante em que a gravação começar.

## 2 · Gravação (comando principal)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="put the cube in the box" \
    --dataset.video=true --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true
```

Pontos principais (os demais parâmetros estão na tabela de parâmetros do [06](/pt-br/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay)):

| Item | Descrição |
| --- | --- |
| `--dataset.root` | **o root é o próprio diretório do conjunto de dados**; troque por um diretório novo a cada sessão (se já existir um diretório com o mesmo nome, a inicialização é recusada) |
| Valores padrão injetados automaticamente | Codificação de vídeo `h264`, threads de codificação `2` — o `record.py` imprime duas linhas de aviso ao iniciar; passar explicitamente `--dataset.rgb_encoder.vcodec=...` / `--dataset.encoder_threads=...` sobrescreve (motivo no 07) |
| Janelas de pré-visualização | Abertas por padrão (15 Hz; `--robot.preview_cameras=false` desativa; `--robot.preview_fps` ajustável) |
| `--dataset.video=true` | Imagens das duas câmeras gravadas no conjunto de dados (`observation.images.wrist / top`); se quiser apenas a câmera de punho, remova `top_camera` |

## 3 · Operação durante a gravação

| Tecla | Função |
| --- | --- |
| `→` ou `n` | Encerra o episódio atual e salva |
| `←` ou `r` | Descarta o episódio atual e regrava no mesmo lugar |
| `q` | Encerra a sessão inteira e salva o conjunto de dados |

- Após o fim do episódio, **os cubos voltam automaticamente ao lugar**; basta puxar o braço líder de volta à pose inicial; comece os movimentos do próximo episódio quando aparecer `Recording episode N`.
- Na fase de salvamento (dezenas de segundos), o console imprime `[record.py] reset done; saving the episode + encoding videos now` —
  durante esse período **as teclas são ignoradas com segurança** (pressões acidentais não corrompem nenhum episódio); só opere quando aparecer a próxima linha `Recording episode`.
- Falhas de codificação têm **nova tentativa automática como garantia** (após imprimir `video encode failed ... retrying once`, tenta de novo automaticamente em 3 segundos); episódios já salvos nunca são perdidos.

## 4 · Inspeção

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Como interpretar a saída:

- **Episódios em que o action span é todo 0, ou a garra é 0** são gravações vazias/inválidas; exclua e regrave;
- **Um `max |act-obs|` grande no início de cada episódio** é o trecho de convergência, normal; no meio e no fim, deve ficar abaixo de cerca de 10 unidades.

## 5 · Assistir aos vídeos

```bash
uv run --frozen python examples/so101_mujoco/export_videos.py \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

Artefatos:

- `examples/so101_mujoco/outputs/videos/so101_sim_vision/epN_top.mp4`, `epN_wrist.mp4` — **um vídeo por episódio e por câmera, que pode ser aberto com duplo clique**;
- `examples/so101_mujoco/outputs/renders/so101_sim_vision_epN_dual.png` — uma montagem por episódio (linha de cima: visão superior; linha de baixo: punho; 6 quadros amostrados uniformemente), para inspeção visual rápida (`--no-strips` permite pular).

O conjunto de dados também contém os vídeos empacotados originais (vários episódios concatenados em ordem no mesmo arquivo):
`outputs/datasets/so101_sim_vision/videos/observation.images.{top,wrist}/chunk-000/file-000.mp4`.

## 6 · Reprodução (opcional)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0
```

## 7 · Treinamento

```bash
uv run --frozen lerobot-train \
    --policy.type=act \
    --policy.push_to_hub=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --output_dir=examples/so101_mujoco/outputs/train/act_so101_sim_vision \
    --steps=100000 --batch_size=8 --save_freq=20000 --log_freq=200 \
    --num_workers=4 --wandb.enable=false --policy.device=cpu
```

| Ponto | Descrição |
| --- | --- |
| `--policy.type` | Tipo de política; **comece com `act`** (o que melhor combina com a escala destes dados/tarefa); `ls src/lerobot/policies/` mostra outras opções (diffusion / smolvla / pi0 etc.) |
| `--policy.push_to_hub=false` | **Obrigatório** — por padrão ele quer enviar ao HuggingFace Hub e, sem `repo_id` configurado, erro e saída imediatos; para enviar, troque por `--policy.repo_id=你的用户名/模型名` (é preciso antes `hf auth login`) |
| `--policy.device=cpu` | Nesta máquina sem GPU dedicada, use `cpu`; em máquinas com placa NVIDIA, remova o parâmetro (usa cuda automaticamente) |
| Artefatos | O diretório de treinamento gera `checkpoints/last/pretrained_model/` (o mais recente, **para onde a implantação aponta**) e snapshots históricos nomeados pelo passo de salvamento (por exemplo `checkpoints/000012/`); o `train_config.json` para retomada fica em `pretrained_model/` |
| Retomada | Após uma interrupção, adicione ao comando original: `--resume=true --config_path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model/train_config.json` (o caminho é a posição sob o `--output_dir` do comando acima) |

**Expectativa de velocidade nesta máquina**: em CPU pura, cerca de **2 segundos/passo** (batch 2, 480p com duas câmeras; no smoke test de 12 passos, a loss caiu de 70 para 22, direção normal).
Portanto, esta máquina serve para validar o fluxo com poucos passos — o `outputs/train/smoke_act` incluído no tutorial é o produto de 12 passos;
**para o treinamento oficial, recomenda-se trocar para uma máquina com GPU** (ACT normalmente na casa de 100 mil passos; o comando é exatamente o mesmo).

> Nota sobre dependências: o extra `training` necessário ao treinamento (accelerate etc.) já está incluído na instalação única do [01](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment);
> este capítulo não exige nenhum passo extra de instalação.

## 8 · Implantação (fazendo a política trabalhar sozinha na simulação)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/rollout.py \
    --policy.path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model \
    --strategy.type=base \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --task="put the cube in the box" --duration=30
```

| Ponto | Descrição |
| --- | --- |
| Parâmetros de câmera | `--robot.image_camera/--robot.top_camera` **devem ser iguais aos usados ao gravar o conjunto de dados** (sim_cam + top_cam), caso contrário a política não recebe as imagens com que foi treinada |
| `--task` | Igual ao `--dataset.single_task` usado na gravação |
| `--duration` | Quantos segundos executar antes de encerrar automaticamente (antes de encerrar, o braço é enviado de volta à pose inicial e então desconectado); `Ctrl-C` no meio também para |
| Para testar o fluxo primeiro | Use o modelo de demonstração incluído no tutorial: `--policy.path=examples/so101_mujoco/outputs/train/smoke_act/checkpoints/last/pretrained_model` (treinamento de 12 passos, ações quase aleatórias, serve apenas para validar o fluxo) |
| Implantação em CPU pura | A inferência da política tem picos ocasionais de 0,5 s e mostra `Control loop is running slower ... than the target FPS` — roda na simulação, mas com engasgos; em GPU não há esse problema (no smoke test de 20 s, rodou o tempo todo e encerrou normalmente) |
| Implantação no robô real | Troque `--robot.*` pelo robô real: `--robot.type=so101_follower --robot.port=COMxx --robot.id=juxi_so101 --robot.use_degrees=false` (lembre-se de deixar espaço na mesa) |
| Outros modos | `--strategy.type=sentry / highlight / dagger / episodic`: gravar enquanto executa / salvar por tecla a partir de buffer circular / correção com humano no loop / gravação por episódios; veja `lerobot-rollout --help` |

## Apêndice A · Trocar para um ambiente conda (opcional)

Este repositório usa por padrão **o `.venv` isolado dentro do projeto, gerenciado pelo uv** (veja [01](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment)); os comandos de execução precisam do prefixo
`uv run --frozen --with mujoco`. Se você prefere o conda, o procedimento é **substituir o passo de "criar o ambiente" pelos três comandos abaixo**; depois,
**remova o prefixo uv de todos os comandos** (`python examples/...` roda diretamente) e o `UV_CACHE_DIR` deixa de ser necessário
(é o caso especial do cache uv entre discos, sem relação com o conda):

```bash
# 一次性：在仓库根目录建好环境（python 版本对齐 01 的 3.12）
conda create -n lerobot-sim python=3.12 -y
conda activate lerobot-sim
pip install -e .            # 安装本仓库 lerobot 及其依赖（含 torch，Windows 上 pip 默认就是 CPU 版）
pip install "mujoco==3.16"  # uv 路线用 --with mujoco 临时提供，conda 路线装成常驻依赖
```

Depois, por exemplo, a gravação passa a ser:

```bash
python examples/so101_mujoco/record.py --robot.image_camera=sim_cam ...
```

Dois pontos de atenção:

1. **Alinhamento de versões**: o `pip install -e .` resolve as versões por conta própria e pode não coincidir exatamente com o `uv.lock`;
   para obter a combinação idêntica ao ambiente medido atual, use o uv para instalar no ambiente conda conforme o arquivo de lock:

   ```bash
   uv pip sync uv.lock --python "$(conda run -n lerobot-sim python -c 'import sys; print(sys.executable)')"
   pip install "mujoco==3.16"
   ```

2. O cache de calibração do braço líder fica em `~/.cache/huggingface/lerobot/calibration/` e não depende de qual ambiente é usado; ao migrar de ambiente, não é preciso recalibrar.

## Apêndice B · Consulta rápida de armadilhas comuns

| Sintoma | Em uma frase |
| --- | --- |
| A porta serial não abre | Liste as portas primeiro; o número pode ter mudado (passo 0) |
| O console fica silencioso por dezenas de segundos ao salvar | Está codificando, é normal; ao ver o aviso `saving the episode...`, não pressione teclas |
| Travamentos ocasionais na imagem durante a gravação | Disputa por recursos de codificação na janela de salvamento; o loop de controle em si não é afetado (confie nos números de cadence); detalhes no 07 |
| Deu crash uma vez; ainda dá para salvar? | Episódios já salvos nunca são perdidos; continue gravando com `record.py --resume=true ... --dataset.num_episodes=N` |
| `lerobot-train` reporta `'repo_id' argument missing` | O padrão quer enviar ao Hub: adicione `--policy.push_to_hub=false` (para enviar, configure `--policy.repo_id` e faça `hf auth login` antes) |
| Na implantação, a política não se move ou se move de forma errática | Verifique primeiro se `--robot.image_camera/--robot.top_camera` e `--task` são iguais aos da gravação; depois veja se o treinamento teve poucos passos |

Todas as armadilhas e soluções (incluindo memória apertada, OOM de codificação, episódios vazios etc.) estão em [07 · Perguntas frequentes](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).

<RelatedProducts slugs="so-arm101" />
