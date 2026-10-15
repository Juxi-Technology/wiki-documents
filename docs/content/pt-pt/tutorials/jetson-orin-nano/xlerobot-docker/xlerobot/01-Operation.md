---
title: Comandos do XLeRobot
---

# Comandos do XLeRobot

> **Pertence a:** [xlerobot/](01-Operation.md) — XLeRobot completo (dois braços + chassis)
> **Pré-requisito:** ter lido [deployment/](../deployment/01-Overview.md) por completo e estar dentro do contendor
> **O outro caminho:** [lerobot/](../lerobot/01-Operation.md) (um único braço SO-101 / LeKiwi)
> **Seguinte:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **Esta página trata apenas do XLeRobot completo** (dois braços + chassis) e de como o pôr a funcionar.

Para operar **um único braço SO-101** ou o **LeKiwi** com a linha de comando
`lerobot-*`, vá para [lerobot/](../lerobot/01-Operation.md) — os dois
caminhos são diferentes.

Esta página abrange: calibração, teleoperação, tabela de teclas, recolha de dados,
treino e inferência.

---

## 0. Escolha primeiro o caminho ⚠️

A imagem contém **dois projetos**, com modos de execução diferentes. **Comece
por consultar esta tabela para determinar qual é o seu**:

| O seu hardware | Qual caminho | Ponto de entrada |
|---|---|---|
| **XLeRobot completo** (dois braços + chassis) | ✅ **Esta página** | Scripts de exemplo em `examples/` |
| **Um único braço SO-101 / SO-100** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Linha de comando `lerobot-*` |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Linha de comando `lerobot-*` |

**Porquê dois caminhos**: as ferramentas de linha de comando `lerobot-calibrate`,
`lerobot-record` e `lerobot-teleoperate` **só conhecem os tipos de robô que
importam explicitamente** (14 robôs originais, **sem `xlerobot`**). Se insistir, surge:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**O ponto de entrada do XLeRobot são os scripts de exemplo em `examples/`**
(importam `XLerobot` diretamente).

Os dois caminhos **partilham o mesmo ambiente** — é possível alternar a qualquer
momento, sem reinstalar nada.

> Apesar de os ficheiros de exemplo mencionarem a utilização de dois processos
> host/client, **essa parte está comentada**; na prática, o que corre é o
> **modo de ligação direta** — basta um único terminal, sem necessidade de
> iniciar um host à parte.

---

## 1. Antes de executar a teleoperação pela primeira vez: instale as duas bibliotecas X11 ⚠️

Faltam duas bibliotecas X11 na imagem; **se não as instalar, a janela de
visualização do rerun vai abaixo**:

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**O robô em si não é afetado** (a teleoperação continua a funcionar e as teclas
respondem); simplesmente não se vê a janela de visualização, e o canal de dados
do rerun fica obstruído, a emitir WARN e a tornar a teleoperação mais lenta.

**Abra outro terminal** e instale no contendor:

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **Não pode omitir o `-u root`** — a imagem corre por omissão com o utilizador
`jetson`, e o `docker exec` entra com essa mesma identidade; instalar pacotes
apt exige privilégios de root. Sem este parâmetro, surge o erro:

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

E mais: **os pacotes não chegam a ficar instalados**, sem qualquer aviso, e o
rerun vai abaixo na mesma — é fácil pensar que «instalou e não serviu de nada».

Depois de instalar, **reinicie o script de teleoperação** (saia com `Ctrl+C` e
volte a executá-lo).

> ⚠️ Esta alteração **só é válida para a execução atual** — o contendor usa
> `--rm` e desaparece ao sair, pelo que é necessário instalar de novo sempre que
> reabrir o contendor.

---

## 2. Localizar a porta serial

```bash
lerobot-find-port
```

Irá pedir-lhe que desligue e volte a ligar o cabo do servo e depois imprime o
nome da porta serial (por exemplo, `/dev/ttyACM0`).

> Este comando é **interativo**; executar `--help` diretamente dá erro EOF — é normal.

**O XLeRobot usa duas portas seriais** (correspondentes a `port1` e `port2` na
configuração):

| Parâmetro | Valor predefinido | A que está ligado |
|---|---|---|
| `port1` | `/dev/ttyACM0` | SO-101 (dois braços) + câmara da cabeça |
| `port2` | `/dev/ttyACM1` | Servos do chassis (rodas) |

É preciso localizar as duas. Os valores predefinidos são `/dev/ttyACM0` e
`/dev/ttyACM1`; **se não corresponderem à realidade, todos os comandos
seguintes terão de indicar `--robot.port1=` / `--robot.port2=`** (ver a
secção 6).

---

## 3. Calibração: acionada automaticamente ao executar os exemplos, sem comando separado

⚠️ **Não use `lerobot-calibrate --robot.type=xlerobot`**. Esta ferramenta de
linha de comando só conhece o conjunto de robôs que importa explicitamente
(so100/so101/lekiwi, etc.); a configuração do XLeRobot **não consta da lista**
e surgirá o erro `invalid choice: 'xlerobot'`.

A calibração do XLeRobot **está integrada em `XLerobot.connect()`**; a execução
de qualquer exemplo entra nela automaticamente:

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**O que é que ele faz:**

- **Sem ficheiro de calibração** → entra automaticamente na calibração guiada:
  1. Apresenta o aviso «coloque os servos do braço esquerdo e da cabeça a meio do curso e prima Enter»
  2. Depois avisa «percorra todo o curso de cada articulação, uma a uma, e prima Enter para parar»
  3. O mesmo se aplica ao braço direito e ao chassis
- **Com um ficheiro de calibração existente** → pergunta: prima Enter para
  restaurar a calibração ou introduza `c` para recalibrar

O ficheiro de calibração fica em:

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**Este diretório tem de ser montado na máquina anfitriã**; caso contrário, é
necessário recalibrar sempre que reabrir o contendor:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> Se quiser calibrar apenas um braço SO-101 isoladamente (e não todo o
> XLeRobot), pode usar o comando original; o tipo `so101_follower` consta da
> lista de autorizados da CLI:
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> Alguns exemplos (como `examples/0_so100_keyboard_joint_control.py`) usam
> **coeficientes de calibração escritos à mão no código**, e não o fluxo acima.
> Qual deles se aplica depende da variante do robô e do exemplo em questão —
> veja primeiro os comentários no início do ficheiro de exemplo correspondente.

---

## 4. Teleoperação

**Basta um único terminal** (os exemplos usam o modo de ligação direta; não é
necessário iniciar um host à parte):

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**A primeira execução entra automaticamente na calibração guiada** (não é
necessário executar um comando de calibração separado):

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → coloque os servos do braço esquerdo e da cabeça a meio do curso e **prima Enter**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → percorra cada articulação de uma ponta à outra, uma a uma, e **prima Enter** para terminar
3. O mesmo para o braço direito e o chassis.

Da próxima vez, se existir um ficheiro de calibração, pergunta: prima Enter
para restaurar ou introduza `c` para recalibrar.

### Mapeamento de teclas

**Chassis**

| Tecla | Função |
|---|---|
| `i` / `k` | Para a frente / para trás |
| `j` / `l` | Deslocar para a esquerda / para a direita |
| `u` / `o` | Rodar à esquerda / à direita |
| `n` / `m` | Acelerar / desacelerar (três velocidades) |
| `b` | Sair do programa |

**Braço esquerdo**

| Tecla | Articulação |
|---|---|
| `q` / `e` | shoulder_pan (rotação da base) ± |
| `w` / `s` | x (frente/trás) ± |
| `a` / `d` | y (esquerda/direita) ± |
| `z` / `x` | pitch (arfagem) ± |
| `r` / `f` | wrist_roll (rotação do punho) ± |
| `t` / `g` | gripper (garra) abrir / fechar |
| `c` | Regressar à posição zero |
| `y` | Executar trajetória retangular (para demonstração/testes) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**Braço direito**

| Tecla | Articulação |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x (frente/trás) ± |
| `4` / `6` | y (esquerda/direita) ± |
| `1` / `3` | pitch (arfagem) ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper abrir / fechar |
| `0` | Regressar à posição zero |
| `Y` (**em maiúscula**) | Executar trajetória retangular |

**Outros**: `?` → servos da cabeça regressam à posição zero

> Os braços esquerdo e direito são **espelhados**: o esquerdo usa a zona das
> letras (`q/e`, `w/a/s/d`) e o direito, o bloco numérico (`7/9`, `4/6`,
> `8/2`, `1/3`). A tecla `reset` também é diferente — braço esquerdo `c`, braço
> direito `0`. Atenção: no braço esquerdo, a tecla da trajetória retangular é o
> `y` minúsculo; no direito, é o `Y` **maiúsculo**.

### Outros exemplos

| Exemplo | Descrição | É preciso instalar algo adicional? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | Versão com chassis de duas rodas | Não (também é preciso instalar primeiro as duas bibliotecas) |
| `5_xlerobot_teleop_xbox.py` | Comando de Xbox | Requer `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | Falta o módulo `joyconrobotics`; não é utilizável |
| `8_xlerobot_teleop_vr.py` | VR | Requer a montagem adicional do diretório XLeVR |

---

## 5. Recolher dados de demonstração

⚠️ `lerobot-record --robot.type=xlerobot` **não dá para usar** (pela mesma razão
da secção 0).

O XLeRobot só tem o caminho de gravação por VR, que depende do módulo `XLeVR` —
que não vem incluído na imagem.

**Se quiser utilizá-lo, terá de escrever o seu próprio script** com a API
LeRobotDataset (a biblioteca está incluída na imagem):

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<your-username>/<dataset-name>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# No ciclo de teleoperação:
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # Chamada obrigatória; caso contrário, os metadados não são guardados em disco
```

Pode tomar como referência o `examples/8_vr_teleop_with_dataset_recording.py` da
imagem e substituir a parte de VR pela teleoperação com teclado.

**Não se esqueça de acrescentar `-e HF_ENDPOINT=https://hf-mirror.com`**; caso
contrário, o envio do conjunto de dados para o Hub falhará.

> Há uma armadilha ao escrever conjuntos de dados: depois de `save_episode()`,
> **é obrigatório chamar `ds.finalize()`**; caso contrário, os metadados do
> episódio não são guardados em disco e não será possível lê-los mais tarde (é
> apresentado o erro `Provided directory does not contain any parquet file`).

---

## 6. O que fazer quando a porta serial não é a ACM0/ACM1

Os exemplos **não incluem argparse**; a porta serial assume o valor predefinido
de `XLerobotConfig()`:

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

Altere para indicar as portas explicitamente:

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

Depois de alterar, basta voltar a executar (o código-fonte é montado;
alterações no ficheiro da máquina anfitriã produzem efeito imediato).

---

## 7. Implementar o modelo treinado

A política ACT **não requer dependências adicionais** e está pronta a usar na
imagem:

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<your-username>/<model-name>")
policy.eval()

# Depois de ligar o robô, inferir em ciclo
# action = policy.select_action(batch)
```

Políticas já incluídas na imagem:

| Política | Dependências | Notas |
|---|---|---|
| **ACT** | Nenhuma | A mais utilizada; testada e a funcionar |
| **Diffusion** | `diffusers` | Requer a imagem completa |
| SmolVLA / pi0 / groot | transformers | **Não vem incluída**; o pacote é muito grande e não corre na CPU |

> No mesmo processo, **não é possível importar duas variantes do robô ao mesmo
> tempo** — a `xlerobot_mecanum` regista a sua própria configuração como
> `"xlerobot"` e entra em conflito com a versão base, dando origem ao erro
> `Cannot register ... already registered`. Cada robô usa apenas uma variante;
> desde que sejam executados em processos separados, não há problema.

---

## 8. Treino

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-dataset-name>
```

> O `lerobot-train` **não necessita de `robot.type`** (apenas consome o conjunto
> de dados e o tipo de política), pelo que este comando funciona e não está
> sujeito à limitação da secção 0.
>
> O treino exige muito poder de computação. Na CPU só é possível treinar a uma
> escala minúscula; para uma utilização prática, é necessária a GPU do Jetson.

---

> **Seguinte:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Se algo correr mal, consulte aqui
> **O outro caminho:** [lerobot/](../lerobot/01-Operation.md) (operar um único braço / LeKiwi com a linha de comando `lerobot-*`)
