---
title: Comandos do LeRobot original
---

# Comandos do LeRobot original

> **Pertence a:** [lerobot/](01-Operation.md) — um único braço SO-101 / SO-100, LeKiwi
> **Pré-requisito:** ter lido [deployment/](../deployment/01-Overview.md) por completo e estar dentro do contendor
> **O outro caminho:** [xlerobot/](../xlerobot/01-Operation.md) (XLeRobot completo)
> **Seguinte:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

Opere **um único braço SO-101 / SO-100** ou o **LeKiwi** com a linha de comando `lerobot-*`.

> ⚠️ Para executar o **XLeRobot completo**, regresse a [xlerobot/](../xlerobot/01-Operation.md).
> Estas ferramentas de linha de comando **não suportam o `xlerobot`** — o motivo consta da secção 0 abaixo.

---

## 0. Em que situações deve seguir este caminho

| O seu hardware | Qual caminho | Porquê |
|---|---|---|
| **Um único braço SO-101 / SO-100** | ✅ **Esta página** (CLI `lerobot-*`) | As ferramentas originais suportam-no diretamente |
| **LeKiwi** | ✅ **Esta página** (CLI `lerobot-*`) | As ferramentas originais suportam-no diretamente |
| **XLeRobot completo** (dois braços + chassis) | ❌ Siga o [04](../xlerobot/01-Operation.md) | Não existe `xlerobot` na lista de autorizados da CLI |

**Porquê dois caminhos**: ferramentas de linha de comando como o
`lerobot-calibrate` têm no código-fonte uma lista fixa de importações de robôs
(14 robôs originais; a lista completa consta da secção 11), **sem `xlerobot`**.
Se insistir, surge:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

Por outro lado, os scripts na pasta `examples/` foram escritos para o XLeRobot
completo e não servem para um braço único.

**Os dois caminhos partilham o mesmo ambiente** — o pacote instalado na imagem
chama-se `lerobot`, e o XLeRobot limita-se a acrescentar três cópias de código
ao diretório `robots/`. Por isso, **é possível alternar a qualquer momento, sem
reinstalar nada**, e ambos podem ser importados juntos no mesmo processo.

---

## 1. Fluxo completo

```
Preparar       Calibrar          Utilizar                    Treinar       Implementar
────────       ────────          ────────                    ───────       ───────────
find-port   →  calibrate      →  teleoperate  ┐
find-cameras                     record       ┴→  train    →  rollout
                                 replay
```

Um comando por etapa; cada uma é descrita a seguir.

---

## 2. Preparação: localizar a porta serial e as câmaras

```bash
lerobot-find-port          # interativo: siga as instruções para desligar e voltar a ligar o cabo do servo; imprime o nome da porta serial
lerobot-find-cameras opencv   # testa as câmaras uma a uma e guarda capturas de ecrã
```

O `lerobot-find-cameras` guarda as capturas em `outputs/captured_images/`; se
vir a imagem, a câmara está operacional. **Testado e a funcionar** (identificou
`/dev/video0` e capturou com êxito).

> Ambos os comandos são **interativos**; executar `--help` diretamente dá erro EOF — é normal.

---

## 3. Primeira utilização de servos novos: gravar o ID

Os servos novos saem de fábrica todos com o ID 1; é necessário alterá-los um a
um para 1–6 para poderem partilhar o mesmo barramento:

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

Irá pedir-lhe que «ligue apenas um servo e prima Enter»; depois de alterar um,
ligue o seguinte.

> Só é necessário em braços acabados de montar ou quando se substitui um servo.
> Se o braço já comunica normalmente, salte este passo.

---

## 4. Calibração

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **Sem ficheiro de calibração** → entra no guia: comece por colocar o braço a
  meio do curso e prima Enter; depois percorra o curso completo de cada
  articulação
- **Com um ficheiro de calibração existente** → pergunta se pretende restaurar
  ou recalibrar

O ficheiro de calibração fica em
`~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`.
**O contendor é iniciado com `-v ~/.cache/huggingface` montado** (ver
[03-Deployment](../deployment/03-Deployment.md)), pelo que reabrir o contendor não o perde.

No caso de braço líder/seguidor, **calibre o seguidor e o líder uma vez cada um**:

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. Teleoperação

### Utilizar o braço líder para mover o seguidor (modo líder-seguidor)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### Não tem braço líder? Utilize o teclado

Existe um `keyboard` em `--teleop.type`; não é preciso um segundo hardware:

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

Também pode usar `--teleop.type=gamepad` com um comando de Xbox (requer `pip install "lerobot[gamepad]"`).

### Com câmara para ver a imagem

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> A visualização com rerun também exige instalar primeiro as duas bibliotecas
> X11; ver a secção 1 de [xlerobot/](../xlerobot/01-Operation.md).

---

## 6. Recolher dados de demonstração

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
| `--robot.cameras` | Configuração das câmaras, **sintaxe de dicionário aninhado**, `nome: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | ID do conjunto de dados no Hugging Face (também é possível gravá-lo localmente e enviá-lo depois) |
| `--dataset.num_episodes` | Quantos episódios gravar |
| `--dataset.single_task` | Descrição da tarefa, utilizada no treino |
| `--dataset.root` | Acrescente isto para guardar noutro diretório; por omissão fica no diretório de cache |

**Teclas durante a gravação** (o terminal apresenta as instruções):

| Tecla | Função |
|---|---|
| `→` (seta para a direita) | Termina o episódio atual mais cedo e passa à fase de reposição |
| `←` (seta para a esquerda) | Descarta o episódio atual e repete-o |
| `Esc` | Para a gravação inteira |

Depois de gravar, já funciona localmente. Para enviar para o Hub:

```bash
--dataset.push_to_hub=true
```

(Lembre-se de que o contendor foi iniciado com `-e HF_ENDPOINT=https://hf-mirror.com`.)

---

## 7. Verificação com replay

Depois de gravar, faça primeiro um replay para confirmar que os dados estão bem
antes do treino:

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<your-username>/<my-first-dataset> \
  --dataset.episode=0
```

---

## 8. Treino

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-first-dataset>
```

> O `lerobot-train` **não necessita de `robot.type`** (apenas consome o conjunto
> de dados e o tipo de política), pelo que este comando é **partilhado** com o
> caminho do XLeRobot — os dados do XLeRobot que gravou também podem ser
> treinados desta forma.
>
> O treino exige muito poder de computação. Na CPU só é possível treinar a uma
> escala minúscula; para uma utilização prática, é necessária a GPU do Jetson.

Políticas opcionais (`--policy.type`): `act` (a mais utilizada), `diffusion`,
`smolvla`, `pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet`, etc.

---

## 9. Implementação no robô real: executar a política treinada

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> \
  --strategy.type=base
```

| Parâmetro | Descrição |
|---|---|
| `--policy.path` | O modelo treinado (ID no Hub ou caminho local) |
| `--strategy.type` | `base` é o mais utilizado; existem também `sentry`, `highlight`, `episodic`, `dagger` |
| `--inference.type` | `sync` (por omissão) ou `rtc` |

> ⚠️ **Não utilize o `lerobot-eval` no robô real** — destina-se a
> **benchmarks de simulação** (`--env.type=aloha/pusht/libero/metaworld...`),
> não à implementação real. No robô real, utilize o `lerobot-rollout`.

---

## 10. Tabela completa das ferramentas de linha de comando

| Comando | Função | Necessita de `robot.type`? |
|---|---|---|
| `lerobot-find-port` | Localizar a porta serial | Não |
| `lerobot-find-cameras` | Localizar as câmaras | Não |
| `lerobot-setup-motors` | Gravar o ID em servos novos | Sim |
| `lerobot-calibrate` | Calibrar | Sim |
| `lerobot-teleoperate` | Teleoperar | Sim |
| `lerobot-record` | Gravar conjuntos de dados | Sim |
| `lerobot-replay` | Reproduzir dados | Sim |
| `lerobot-train` | Treinar a política | **Não** (partilhado com o XLeRobot) |
| `lerobot-rollout` | Implementar a política no **robô real** | Sim |
| `lerobot-eval` | Avaliação de benchmarks de **simulação** | Não (usa `--env.type`) |
| `lerobot-edit-dataset` | Editar conjuntos de dados | Não |
| `lerobot-dataset-viz` | Visualização de conjuntos de dados | Não |
| `lerobot-info` | Imprimir informações do ambiente e das versões | Não |

---

## 11. Tipos de robô suportados pela CLI (lista completa)

Estes são todos os tipos que a linha de comando `lerobot-*` **reconhece
efetivamente** (extraídos da lista de autorizados do código-fonte). **Não há
`xlerobot`** — é esta a razão de existirem dois caminhos.

**Robôs (`--robot.type`) — 14 tipos:**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**Teleoperadores (`--teleop.type`) — incluem:**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> A lista completa é a que constar do `--help` da sua própria imagem; versões
> diferentes poderão ter adições ou remoções.

---

## 12. Um exemplo completo (do zero até funcionar)

```bash
# 1. Localizar os dispositivos
lerobot-find-port                          # anote a porta serial; abaixo usa-se /dev/ttyACM0
lerobot-find-cameras opencv                # anote a câmara; abaixo usa-se /dev/video0

# 2. Gravar o ID em servos novos (apenas para braços acabados de montar)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. Calibrar
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. Testar com o teclado se o braço se mexe
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

# 7. Deixar o braço funcionar sozinho
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/my-first-dataset --strategy.type=base
```

---

## Estado da verificação

Os comandos desta página foram **efetivamente executados** na imagem
`chenyang310/xlerobot:jetson` do JetPack 7.2:

| Item | Resultado |
|---|---|
| Interpretação dos parâmetros dos 14 `--robot.type` originais | ✅ Passou |
| Interpretação dos parâmetros de `--teleop.type` (incluindo `keyboard`) | ✅ Passou |
| Cadeia completa do `lerobot-calibrate` | ✅ Avançou até à abertura da porta serial e aí parou (na altura não havia servo ligado) |
| Cadeia completa do `lerobot-teleoperate --teleop.type=keyboard` | ✅ Idêntico ao anterior |
| `lerobot-find-cameras opencv` | ✅ **Hardware real**: identificou `/dev/video0` e capturou imagens com êxito |
| Interpretação da sintaxe aninhada de `--robot.cameras` | ✅ Passou |
| Robôs originais e XLeRobot **coexistindo no mesmo processo** | ✅ 8 tipos registados em simultâneo com êxito |

Como não estava nenhum braço robótico ligado, **a verificação ao nível dos
movimentos ainda não foi feita**. Depois de ligar o seu SO-101, execute a
secção 12 de ponta a ponta; se algum passo falhar, avise-me.

---

> **Seguinte:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Se algo correr mal, consulte aqui
