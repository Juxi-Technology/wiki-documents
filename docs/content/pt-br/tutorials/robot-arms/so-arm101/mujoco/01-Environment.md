---
title: "01 · Preparação do ambiente"
description: "Operação única."
---

# 01 · Preparação do ambiente

Operação única. Este repositório usa o **uv para gerenciar um `.venv` isolado dentro do projeto** — o `uv run` usa apenas o ambiente desse diretório
e não mexe no seu conda (esse design é intencional, veja [07 Perguntas frequentes](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)).

## Instalação

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

Finalidade dos quatro extras:

| extra | O que fornece | Quem precisa |
| --- | --- | --- |
| `core_scripts` | Entradas oficiais record / teleoperate / calibrate / replay + conjunto de dados + dependências de visualização | Todos |
| `feetech` | `scservo_sdk` (protocolo serial dos servomotores STS3215) | Operações com o robô real |
| `pynput-dep` | Escuta global do teclado | Teleoperação por teclado, teclas de controle de episódios na gravação |
| `training` | `accelerate` / `wandb` etc. | Treinamento com `lerobot-train`, implantação de políticas (`lerobot-rollout`) |

Quando necessário, adicione o MuJoCo temporariamente (não entra no arquivo de lock, é carregado sob demanda):

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

Como ler as três partes: `uv run` executa o comando com o `.venv` deste repositório; `--frozen` usa estritamente as versões bloqueadas no `uv.lock`,
sem resolver dependências novamente; `--with mujoco` adiciona o pacote MuJoCo temporariamente **apenas para este comando** — o próximo comando sem esse
prefixo não o terá no ambiente, por isso todos os comandos de simulação do 02–09 carregam esse prefixo.

Depois de concluir este capítulo, todos os comandos do 02–09 podem ser executados diretamente: o extra `training` (necessário para treinamento/implantação)
já está incluído no `uv sync` acima, e **não é preciso instalar nenhuma outra dependência** depois.

**Prefere usar um ambiente conda**? Então os comandos de execução não precisam do prefixo `uv run` — os três comandos para criar o ambiente e os pontos de atenção estão em
[09 Tutorial de uso completo · Apêndice A](/pt-br/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial).

## Verificação

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## Perguntas frequentes

- **`uv sync` reporta `failed to persist temporary file ... os error 17`**: caso especial do diretório de cache do uv desta máquina entre discos diferentes; use o prefixo `UV_CACHE_DIR` acima, detalhes em [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting).
- **Não use o Python da Microsoft Store**: escolha o Python 3.12 gerenciado automaticamente pelo uv.
- O primeiro `uv run --with mujoco` baixa um wheel do mujoco de cerca de 5,6 MB; depois disso, usa o cache.

<RelatedProducts slugs="so-arm101" />
