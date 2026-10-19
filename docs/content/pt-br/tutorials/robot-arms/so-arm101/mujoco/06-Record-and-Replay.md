---
title: "06 · Gravação e reprodução de dados"
---

# 06 · Gravação e reprodução de dados

> Pré-requisito: ambiente conforme o [01](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment); para gravar no robô real, também é preciso concluir o [03](/pt-br/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration).
> As portas nos comandos (braço seguidor `COM172` / braço líder `COM124`) são exemplos; substitua pelas encontradas no capítulo 03; use para `id` o nome escolhido na calibração.
> Para o fluxo completo na ordem "do primeiro acionamento do braço aos vídeos e ao treinamento e implantação", veja diretamente o [09 Tutorial de uso completo](/pt-br/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial);
> este capítulo é o manual de referência de parâmetros e mecanismos.

## Modelo de comando de gravação

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 录真机（主动臂 → 真机从动臂）
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/real_run1 \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="pick up the cube" \
    --dataset.video=false --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true

# 录仿真（主动臂 → 仿真从动臂）
#   把 --robot.* 换成: --robot.type=so101_mujoco
# 录仿真（键盘控制）
#   把 --teleop.* 换成: --teleop.type=so101_keyboard --teleop.rate=150
```

## Pontos importantes dos parâmetros (os que costumam causar problemas)

| Parâmetro | Descrição |
| --- | --- |
| `--dataset.root` | **o root é o próprio diretório do conjunto de dados** (não é o diretório pai + concatenação do repo_id); use um diretório novo a cada gravação |
| `--dataset.repo_id` | Na gravação local é apenas um identificador; só é necessário um `用户名/名字` real quando for enviar ao Hub no futuro |
| `--dataset.num_episodes` | Número de episódios a gravar nesta sessão; ao completar, encerra automaticamente (pressionar `q` no meio também salva a parte já gravada) |
| `--dataset.single_task` | String de descrição da tarefa, gravada no campo task de cada quadro; **o `--task` no treinamento/implantação deve ser idêntico a ela** |
| `--dataset.no_stamp=true` | Não adiciona sufixo de timestamp; o diretório/nome fica estável; para regravar com o mesmo nome, é preciso excluir o diretório antigo antes |
| `--dataset.episode_time_s` | **Limite** máximo por episódio (segurança); na operação normal, pressione `→` para terminar antes |
| `--dataset.reset_time_s` | Tempo de reposicionamento não gravado entre episódios; durante esse período, o braço líder continua acionando o seguidor em tempo real. **Na gravação em simulação, os cubos são teleportados automaticamente de volta à posição inicial ao entrar nessa fase** (veja abaixo) |
| `--dataset.video` | Ative apenas quando precisar de dados de câmera (conjuntos de dados visuais exigem true; o fallback pyav foi verificado e funciona) |
| `--dataset.rgb_encoder.vcodec` | Codificador de vídeo. **Nesta máquina, a gravação com duas câmeras usa `h264`**: o `record.py` já o injeta por padrão (o padrão upstream libsvtav1 falha na alocação de memória e derruba a sessão inteira quando as duas codificações abrem em paralelo — veja [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)); se for passado explicitamente, não é injetado |
| `--dataset.encoder_threads` | Número de threads de codificação. **O `record.py` injeta 2 por padrão**: usar todos os núcleos por padrão deixa a imagem da simulação visivelmente travada durante o salvamento (veja [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)); limitar cada codificação a 2 threads mantém a simulação fluida durante o salvamento; se for passado explicitamente, não é injetado |
| `--dataset.push_to_hub` | Nesta máquina, a conexão direta com o HF exige proxy; mantenha false por enquanto e envie manualmente após a gravação |

## Teclas de controle de episódio (globais, válidas durante toda a gravação)

| Tecla | Função |
| --- | --- |
| `→` ou `n` | Encerra o episódio atual (**salva**) |
| `←` ou `r` | Descarta o episódio atual e **regrava no mesmo lugar** (use quando um episódio não ficou bom; não é preciso reiniciar a sessão) |
| `q` | Encerra a sessão inteira e salva o conjunto de dados (**recomendado**) |
| `Esc` | O mesmo que `q` (também desconecta a teleoperação por teclado; a saída limpa foi verificada, mas ainda prefira `q`) |

**Recomendação de operação**: antes de iniciar a gravação, pare o braço líder perto da pose central (para evitar que o trecho de convergência em que o braço simulado/real "dispara" no primeiro instante seja gravado);
após iniciar, fique um segundo parado antes de começar a se mover.

## Redefinição automática da cena na gravação em simulação

Na gravação no robô real, a fase "Reset the environment" exige que você coloque os cubos de volta no lugar manualmente. Na simulação, o iniciador de gravação (`record.py`)
**teleporta automaticamente os três cubos de volta à posição de origem** no início dessa fase (zerando também as velocidades), então, após encerrar cada episódio com `→`,
basta mover o braço líder de volta à pose inicial; os cubos voltam sozinhos e o próximo episódio começa a partir da cena inicial fixa.
O braço seguidor real não tem esse comportamento (é preciso posicionar manualmente, como de costume); `teleoperate.py`/`replay.py` também não estão envolvidos.

## Inspeção após a gravação

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

A saída mostra, por episódio, o número de quadros, a duração, a amplitude de ação das seis juntas e o erro de acompanhamento:

- **Episódios com action span = 0** são gravações vazias (ninguém se moveu); basta excluir e regravar;
- **Um |action−obs| grande no início** é o trecho de convergência (normal); no meio e no fim, geralmente <10 unidades.

## Gravar dados "com imagem" na simulação (câmera wrist)

O robô simulado permite gravar a câmera de punho da cena (`sim_cam`) como observação de imagem no conjunto de dados:

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

Pontos principais: `--robot.image_camera=sim_cam` (nome da câmera) + `--dataset.video=true` (as imagens passam pela codificação de vídeo; o fallback pyav foi verificado e funciona).
Nas características do conjunto de dados aparecerá `observation.images.wrist` (480×640×3). Resolução e taxa de quadros podem ser ajustadas com
`--robot.image_width/--robot.image_height/--robot.image_fps`.
Ao abrir a janela (`onscreen=true`, padrão), além da janela da visão principal, é aberta **uma janela de pré-visualização em tempo real para cada câmera**
(punho / visão superior, com rótulo no canto superior esquerdo da janela), permitindo ver diretamente durante a gravação se os dois fluxos de imagem estão normais; se não precisar, adicione
`--robot.preview_cameras=false`. As janelas de pré-visualização atualizam a **15 Hz** por padrão (`--robot.preview_fps` ajustável) —
são apenas exibição de estado e não precisam acompanhar os 50 Hz da janela principal; assim, com 3 janelas na mesma tela, a carga de renderização é bem menor.

**Cena e câmera de visão superior** (desde 2026-10-16): a cena de simulação já vem com uma área de trabalho — tapete, cubos de três cores (34 mm) e caixa de armazenamento (veja `so101_assets.add_workspace`,
o layout pode ser ajustado renderizando com `preview_workspace.py`); há também uma câmera fixa de visão superior `top_cam` (parte superior da imagem = direção oposta ao braço robótico).
Adicione `--robot.top_camera=top_cam` para gravar a imagem de visão superior como `observation.images.top` (duas câmeras gravadas ao mesmo tempo); se quiser apenas a câmera de punho, remova esse parâmetro.
A codificação de vídeo após o fim de cada episódio processa os dois fluxos ao mesmo tempo; um tempo de espera um pouco maior é normal.

## Reprodução

```bash
# 仿真空回放（窗口里看轨迹重演）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0

# 真机回放（同款机制，注意周围环境与录制时一致）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/juxi_teleop_run1 --dataset.episode=0
```

> A entrada oficial `lerobot-replay` não carrega os plugins deste projeto; usá-la diretamente gera `invalid choice: 'so101_mujoco'` —
> por isso, use sempre o iniciador `replay.py`.

## Formato e local do conjunto de dados

O conjunto de dados é LeRobotDataset v3: `action` e `observation.state` são vetores de 6 dimensões
(`shoulder_pan.pos … gripper.pos`), iguais aos conjuntos de dados oficiais de robô real, e podem ser misturados diretamente no treinamento.

```
examples/so101_mujoco/outputs/datasets/
└── juxi_teleop_run1/   真机键盘遥操（1 回合 / 2430 帧 / 81s）✅ 保留的真机数据
```

> Limpeza de 2026-10-16: as gravações antigas de simulação (`sim_run2`, `sim_vision_demo`, `sim_vision_run1/2/3`)
> foram todas excluídas. **O conjunto de dados oficial `so101_sim_vision` (duas câmeras / 5 episódios / 10610 quadros / 353,8 s / h264)
> foi gravado naquela noite ✅**; os vídeos por episódio e por câmera foram exportados para `outputs/videos/so101_sim_vision/`,
> e as montagens de pré-visualização das duas câmeras estão em `outputs/renders/sim_vision_epN_dual.png`.

## Registro de medições desta vez (2026-10-15)

| Sessão | Conteúdo | Resultado |
| --- | --- | --- |
| Robô real run1 | Gravação no robô real com teleoperação por teclado | 1 episódio de 81 s, amplitude das seis juntas de 75–140 unidades, estável a 30 Hz |
| Reprodução no robô real | Reexecução do mesmo episódio | 2430 quadros reproduzidos por completo, sem anomalias |
| Simulação run2 | Gravação em simulação com teleoperação pelo braço líder | 5 episódios, 157 s, erro de acompanhamento dos ep1–4 <12 unidades |
| Reprodução em simulação ep1 | Reexecução na janela | Trajetória consistente com a operação (confirmado) |

## Medições adicionais (2026-10-16)

| Sessão | Conteúdo | Resultado |
| --- | --- | --- |
| Novo braço líder (COM124) | Recalibração (braço/servos novos) | ✅ Calibração bem-sucedida; a compensação de zero do `so101_leader_trim` se adapta automaticamente à nova calibração |
| Visual run1 | Gravação em simulação com teleoperação pelo braço líder (com imagem) | 2 episódios / 3177 quadros / 106 s @ 29.97 Hz; erro de acompanhamento ≤2 unidades durante todo o percurso (apenas 0,5 s de convergência no primeiro quadro); vídeo `observation.images.wrist` gravado no conjunto de dados e validado por decodificação ✅ |
| Visual run2 | Gravação contínua com duas câmeras (`--resume`) | ep0 (2776 quadros / 92,6 s) intacto; ao salvar o ep1, o codificador libsvtav1 sofreu OOM e derrubou a sessão inteira → o codificador foi trocado para h264 (injetado por padrão pelo `record.py`) e o teste ponta a ponta passou (2 episódios × codificação dupla); os resíduos foram limpos e a regravação oficial passou para o run3 |
| Visual run3 | Gravação oficial com duas câmeras (h264) | 1ª sessão: ep0 (185,2 s / 5554 quadros) + ep1 (72,8 s / 2186 quadros) gravados intactos e aprovados na inspeção; pressionar `→` repetidamente durante a pausa de codificação entre sessões disparou um crash de episódio vazio (mecanismo e proteção em [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) → sessão seguinte gravou os episódios restantes (plano de 5 episódios) |
| Primeira tentativa de gravação oficial (so101_sim_vision) | Duas câmeras (h264 + 2 threads + janelas de pré-visualização a 15 Hz) | Ao salvar o ep0 (82,3 s / 2469 quadros), a alocação de memória do codificador falhou e derrubou a sessão inteira (commit do sistema quase no limite; veja [07](/pt-br/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) → foram adicionados **nova tentativa automática em caso de falha de codificação** e **silenciamento do console** (ambos verificados em teste, os 26 itens do smoke test passaram); a regravação oficial aguarda reinício da máquina |
| Gravação oficial (so101_sim_vision) ✅ | Teleoperação com braço líder e duas câmeras, 5 episódios | **5/5 episódios gravados no conjunto de dados**: 61,5 / 53,4 / 101,1 / 62,4 / 75,4 s, total de 10610 quadros @29.97 Hz, 0 ticks acima do orçamento, zero crashes; ação válida em todos os seis eixos + garra durante todo o percurso; decodificação dos dois vídeos verificada |

<RelatedProducts slugs="so-arm101" />
