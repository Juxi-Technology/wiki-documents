---
title: Comandos do LeRobot original
---

# Comandos do LeRobot original

> **Pertence a:** [lerobot/](01-Operation.md) — um braço SO-101 / SO-100 único, LeKiwi
> **Pré-requisito:** ter lido [deployment/](../deployment/01-Overview.md) por completo e estar dentro do contêiner
> **O outro caminho:** [xlerobot/](../xlerobot/01-Operation.md) (XLeRobot completo)
> **Próximo:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

Opere **um braço SO-101 / SO-100 único** ou o **LeKiwi** com a linha de comando `lerobot-*`.

> ⚠️ Para rodar o **XLeRobot completo**, volte para [xlerobot/](../xlerobot/01-Operation.md).
> Essas ferramentas de linha de comando **não suportam `xlerobot`** — o motivo está na seção 0 abaixo.

---

## 0. Quando seguir este caminho

| Seu hardware | Qual caminho | Por quê |
|---|---|---|
| **Um braço SO-101 / SO-100** | ✅ **Esta página** (CLI `lerobot-*`) | As ferramentas originais dão suporte direto |
| **LeKiwi** | ✅ **Esta página** (CLI `lerobot-*`) | As ferramentas originais dão suporte direto |
| **XLeRobot completo** (braços duplos + chassi) | ❌ Siga o [04](../xlerobot/01-Operation.md) | Não há `xlerobot` na lista de permitidos da CLI |

**Por que dois caminhos**: ferramentas de linha de comando como o `lerobot-calibrate`
têm no código-fonte uma lista fixa de importações de robôs (14 robôs originais;
a lista completa está na seção 11), **e `xlerobot` não está nela**. Forçar dá:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

Por outro lado, os scripts em `examples/` são escritos para o XLeRobot completo
e não servem para um braço único.

**Os dois caminhos compartilham o mesmo ambiente** — o pacote instalado na imagem
se chama `lerobot`, e o XLeRobot só adiciona três cópias de código ao diretório
`robots/`. Por isso **dá para alternar a qualquer momento, sem reinstalar nada**,
e os dois podem ser importados juntos no mesmo processo.

---

## 1. Fluxo completo

```
Preparar       Calibrar          Usar                        Treinar       Implantar
────────       ────────          ────                        ───────       ─────────
find-port   →  calibrate      →  teleoperate  ┐
find-cameras                     record       ┴→  train    →  rollout
                                 replay
```

Uma linha de comando por etapa; cada uma é explicada a seguir.

---

## 2. Preparação: encontrar a porta serial e as câmeras

```bash
lerobot-find-port          # interativo: siga as instruções para desconectar e reconectar o cabo do servo; imprime o nome da porta serial
lerobot-find-cameras opencv   # testa as câmeras uma a uma e salva capturas de tela
```

O `lerobot-find-cameras` salva as capturas em `outputs/captured_images/`; se você
vir a imagem, a câmera funciona. **Testado e funcionando** (identificou
`/dev/video0` e capturou com sucesso).

> Os dois comandos são **interativos**; rodar `--help` diretamente dá erro EOF — isso é normal.

---

## 3. Primeira vez com servos novos: gravar o ID

Servos que saem da fábrica têm todos o ID 1; é preciso alterá-los um a um para
1–6 para que possam conviver no mesmo barramento:

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

Ele avisa "conecte apenas um servo e pressione Enter"; depois de alterar um,
conecte o próximo.

> Só é necessário para braços recém-montados ou quando se troca um servo. Se o
> braço já se comunica normalmente, pule esta etapa.

---

## 4. Calibração

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **Sem arquivo de calibração** → entra no guia: primeiro coloque o braço no
  meio do curso e pressione Enter; depois percorra o curso completo de cada
  articulação
- **Com arquivo de calibração existente** → pergunta se você quer restaurar ou
  recalibrar

O arquivo de calibração fica em
`~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`.
**O contêiner é iniciado com `-v ~/.cache/huggingface` montado** (veja
[03-Deployment](../deployment/03-Deployment.md)), então reabrir o contêiner não perde nada.

No caso de braço mestre/escravo, **calibre o escravo e o mestre uma vez cada**:

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. Teleoperação

### Usar o braço mestre para mover o escravo (modo mestre-escravo)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### Não tem braço mestre? Use o teclado

Existe um `keyboard` em `--teleop.type`; não precisa de um segundo hardware:

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

Você também pode usar `--teleop.type=gamepad` com um controle de Xbox (exige `pip install "lerobot[gamepad]"`).

### Com câmera para ver a imagem

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> Usar a visualização do rerun também exige instalar primeiro as duas
> bibliotecas X11; veja a seção 1 de
> [xlerobot/](../xlerobot/01-Operation.md).

---

## 6. Coletar dados de demonstração

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<your-username>/<my-first-dataset> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**Descrição dos parâmetros:**

| Parâmetro | Função |
|---|---|
| `--robot.cameras` | Configuração das câmeras, **sintaxe de dicionário aninhado**, `nome: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | ID do conjunto de dados no Hugging Face (dá para gravar localmente e enviar depois) |
| `--dataset.num_episodes` | Quantos episódios gravar |
| `--dataset.single_task` | Descrição da tarefa; útil no treinamento |
| `--dataset.root` | Adicione isto para salvar em outro diretório; por padrão fica no diretório de cache |

**Teclas durante a gravação** (o terminal exibe as instruções):

| Tecla | Função |
|---|---|
| `→` (seta direita) | Encerra o episódio atual mais cedo e entra na fase de reset |
| `←` (seta esquerda) | Descarta o episódio atual e regrava este |
| `Esc` | Encerra a gravação inteira |

Depois de gravar, já dá para usar localmente. Para enviar ao Hub:

```bash
--dataset.push_to_hub=true
```

(Lembre-se de que o contêiner foi iniciado com `-e HF_ENDPOINT=https://hf-mirror.com`.)

---

## 7. Conferir com replay

Depois de gravar, faça primeiro um replay para conferir se os dados estão bons
antes de treinar:

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<your-username>/<my-first-dataset> \
  --dataset.episode=0
```

---

## 8. Treinamento

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-first-dataset>
```

> O `lerobot-train` **não precisa de `robot.type`** (consome apenas o conjunto de
> dados e o tipo de política), por isso este comando é **compartilhado** com o
> caminho do XLeRobot — os dados que você gravou no XLeRobot também podem ser
> treinados assim.
>
> Treinamento consome muito poder de processamento. Na CPU só dá para treinar
> em escala minúscula; para uso prático, é necessária a GPU do Jetson.

Políticas opcionais (`--policy.type`): `act` (a mais usada), `diffusion`,
`smolvla`, `pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet` etc.

---

## 9. Implantação no robô real: rodar a política treinada

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> \
  --strategy.type=base
```

| Parâmetro | Descrição |
|---|---|
| `--policy.path` | O modelo treinado (ID no Hub ou caminho local) |
| `--strategy.type` | `base` é o mais usado; também há `sentry`, `highlight`, `episodic`, `dagger` |
| `--inference.type` | `sync` (padrão) ou `rtc` |

> ⚠️ **Não use o `lerobot-eval` para rodar em robô real** — ele serve para
> **benchmark de simulação** (`--env.type=aloha/pusht/libero/metaworld...`), não
> para implantação real. Para robô real, use o `lerobot-rollout`.

---

## 10. Tabela completa das ferramentas de linha de comando

| Comando | Função | Precisa de `robot.type`? |
|---|---|---|
| `lerobot-find-port` | Encontrar a porta serial | Não |
| `lerobot-find-cameras` | Encontrar as câmeras | Não |
| `lerobot-setup-motors` | Gravar o ID em servos novos | Sim |
| `lerobot-calibrate` | Calibrar | Sim |
| `lerobot-teleoperate` | Teleoperar | Sim |
| `lerobot-record` | Gravar conjuntos de dados | Sim |
| `lerobot-replay` | Reproduzir dados | Sim |
| `lerobot-train` | Treinar a política | **Não** (compartilhado com o XLeRobot) |
| `lerobot-rollout` | Implantar a política em **robô real** | Sim |
| `lerobot-eval` | Avaliação de benchmark de **simulação** | Não (usa `--env.type`) |
| `lerobot-edit-dataset` | Editar conjuntos de dados | Não |
| `lerobot-dataset-viz` | Visualizar conjuntos de dados | Não |
| `lerobot-info` | Imprimir informações do ambiente e das versões | Não |

---

## 11. Tipos de robô suportados pela CLI (lista completa)

Estes são todos os tipos que a linha de comando `lerobot-*` **realmente
reconhece** (extraídos da lista de permitidos do código-fonte). **Não há
`xlerobot`** — é por isso que existem dois caminhos.

**Robôs (`--robot.type`) — 14 tipos:**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**Teleoperadores (`--teleop.type`) — inclui:**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> A lista completa é a do `--help` da sua própria imagem; versões diferentes
> podem ter adições e remoções.

---

## 12. Um exemplo completo (do zero até rodar)

```bash
# 1. Encontrar os dispositivos
lerobot-find-port                          # anote a porta serial; abaixo usamos /dev/ttyACM0
lerobot-find-cameras opencv                # anote a câmera; abaixo usamos /dev/video0

# 2. Gravar o ID nos servos novos (só para braços recém-montados)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. Calibrar
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. Testar com o teclado se ele se mexe
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. Gravar 10 episódios
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<your-username>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. Treinar
lerobot-train --policy.type=act --dataset.repo_id=<your-username>/my-first-dataset

# 7. Deixar o braço rodar sozinho
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/my-first-dataset --strategy.type=base
```

---

## Situação da verificação

Os comandos desta página foram **realmente executados** na imagem
`chenyang310/xlerobot:jetson` do JetPack 7.2:

| Item | Resultado |
|---|---|
| Análise dos parâmetros dos 14 `--robot.type` originais | ✅ Passou |
| Análise dos parâmetros de `--teleop.type` (incluindo `keyboard`) | ✅ Passou |
| Fluxo completo do `lerobot-calibrate` | ✅ Seguiu até abrir a porta serial e parou (na época não havia servo conectado) |
| Fluxo completo do `lerobot-teleoperate --teleop.type=keyboard` | ✅ O mesmo acima |
| `lerobot-find-cameras opencv` | ✅ **Hardware real**: identificou `/dev/video0` e capturou imagens com sucesso |
| Análise da sintaxe aninhada de `--robot.cameras` | ✅ Passou |
| Robôs originais e XLeRobot **coexistindo no mesmo processo** | ✅ 8 tipos registrados simultaneamente com sucesso |

Como não havia braço robótico conectado, **a verificação no nível dos movimentos
ainda não foi feita**. Depois de conectar o seu SO-101, rode a seção 12 de ponta
a ponta; se algum passo não funcionar, me avise.

---

> **Próximo:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Se algo der errado, procure aqui
