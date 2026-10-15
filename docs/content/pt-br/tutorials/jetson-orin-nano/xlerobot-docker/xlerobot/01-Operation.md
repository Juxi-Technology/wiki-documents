---
title: Comandos do XLeRobot
---

# Comandos do XLeRobot

> **Pertence a:** [xlerobot/](01-Operation.md) — XLeRobot completo (braços duplos + chassi)
> **Pré-requisito:** ter lido [deployment/](../deployment/01-Overview.md) por completo e estar dentro do contêiner
> **O outro caminho:** [lerobot/](../lerobot/01-Operation.md) (um braço SO-101 / LeKiwi)
> **Próximo:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **Esta página cobre apenas o XLeRobot completo** (braços duplos + chassi) e como colocá-lo para rodar.

Para operar **um braço SO-101 único** ou o **LeKiwi** com a linha de comando
`lerobot-*`, vá para [lerobot/](../lerobot/01-Operation.md) — os dois
caminhos são diferentes.

Esta página cobre: calibração, teleoperação, tabela de teclas, gravação de dados,
treinamento e inferência.

---

## 0. Primeiro escolha o caminho ⚠️

A imagem contém **dois projetos**, com modos de execução diferentes. **Veja
primeiro esta tabela para decidir qual é o seu**:

| Seu hardware | Qual caminho | Ponto de entrada |
|---|---|---|
| **XLeRobot completo** (braços duplos + chassi) | ✅ **Esta página** | Scripts de exemplo em `examples/` |
| **Um braço SO-101 / SO-100** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Linha de comando `lerobot-*` |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | Linha de comando `lerobot-*` |

**Por que dois caminhos**: as ferramentas de linha de comando `lerobot-calibrate`,
`lerobot-record` e `lerobot-teleoperate` **só reconhecem os tipos de robô que
importam explicitamente** (14 robôs originais, **sem `xlerobot`**). Forçar dá:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**O ponto de entrada do XLeRobot são os scripts de exemplo em `examples/`**
(eles importam `XLerobot` diretamente).

Os dois caminhos **compartilham o mesmo ambiente** — dá para alternar a qualquer
momento, sem reinstalar nada.

> Embora os arquivos de exemplo mencionem o uso de dois processos host/client,
> **essa parte está comentada**; na prática, o que roda é o **modo de conexão
> direta** — um único terminal basta, sem precisar iniciar um host separado.

---

## 1. Antes de rodar a teleoperação pela primeira vez: instale as duas bibliotecas X11 ⚠️

Faltam duas bibliotecas X11 na imagem; **sem instalá-las, a janela de
visualização do rerun trava**:

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**O robô em si não é afetado** (a teleoperação continua funcionando e as teclas
respondem); só não dá para ver a janela de visualização, e o canal de dados do
rerun fica entupido imprimindo WARN, deixando a teleoperação mais lenta.

**Abra outro terminal** e instale dentro do contêiner:

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **Não dá para omitir o `-u root`** — a imagem roda por padrão com o usuário
`jetson`, e o `docker exec` também entra com essa identidade; instalar pacotes
apt exige privilégios de root. Sem esse parâmetro, aparece o erro:

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

Além disso, **os pacotes falham silenciosamente**, o rerun trava do mesmo jeito,
e é fácil achar que “instalou e não adiantou nada”.

Depois de instalar, **reinicie o script de teleoperação** (saia com `Ctrl+C` e
rode de novo).

> ⚠️ Essa alteração **vale apenas para esta execução** — o contêiner é iniciado
> com `--rm` e some ao sair, então é preciso instalar tudo de novo a cada vez
> que o contêiner for reaberto.

---

## 2. Encontrar a porta serial

```bash
lerobot-find-port
```

Ele vai pedir para você desconectar e reconectar o cabo do servo e depois
imprime o nome da porta serial (por exemplo, `/dev/ttyACM0`).

> Esse comando é **interativo**; rodar `--help` diretamente dá erro EOF — isso é normal.

**O XLeRobot usa duas portas seriais** (correspondentes a `port1` e `port2` na
configuração):

| Parâmetro | Valor padrão | O que conecta |
|---|---|---|
| `port1` | `/dev/ttyACM0` | SO-101 (dois braços) + câmera da cabeça |
| `port2` | `/dev/ttyACM1` | Servos relacionados ao chassi (rodas) |

É preciso encontrar as duas. Os valores padrão são `/dev/ttyACM0` e
`/dev/ttyACM1`; **se no seu caso forem outros, cada comando adiante precisará
especificar `--robot.port1=` / `--robot.port2=`** (veja a seção 6).

---

## 3. Calibração: disparada automaticamente ao rodar os exemplos, sem comando separado

⚠️ **Não use `lerobot-calibrate --robot.type=xlerobot`**. Essa ferramenta de
linha de comando só reconhece o lote de robôs que importa explicitamente
(so100/so101/lekiwi etc.); a configuração do XLeRobot **não está na lista** e o
erro `invalid choice: 'xlerobot'` será exibido.

A calibração do XLeRobot **é integrada a `XLerobot.connect()`**; basta rodar
qualquer exemplo para entrar nela automaticamente:

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**O que ele faz:**

- **Sem arquivo de calibração** → entra automaticamente na calibração guiada:
  1. Avisa “mova os servos do braço esquerdo e da cabeça até o meio do curso e pressione Enter”
  2. Depois avisa “percorra todo o curso de cada articulação, uma a uma, e pressione Enter para parar”
  3. O mesmo vale para o braço direito e o chassi
- **Com arquivo de calibração existente** → pergunta: pressione Enter para
  restaurar a calibração ou digite `c` para recalibrar

O arquivo de calibração fica em:

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**Esse diretório precisa ser montado na máquina host**; caso contrário, será
preciso recalibrar toda vez que o contêiner for reaberto:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> Se você quiser calibrar apenas um braço SO-101 isolado (e não o XLeRobot
> inteiro), pode usar o comando original; o tipo `so101_follower` está na lista
> de permitidos da CLI:
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> Alguns exemplos (como `examples/0_so100_keyboard_joint_control.py`) usam
> **coeficientes de calibração escritos à mão no código**, em vez do fluxo
> acima. Qual dos dois se aplica depende da variante do seu robô e do exemplo
> usado — dê uma olhada nos comentários no começo do arquivo de exemplo
> correspondente.

---

## 4. Teleoperação

**Um único terminal basta** (os exemplos usam o modo de conexão direta; não é
preciso iniciar um host separado):

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**A primeira execução entra automaticamente na calibração guiada** (não é
preciso rodar um comando de calibração separado):

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → coloque os servos do braço esquerdo e da cabeça no meio do curso e **pressione Enter**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → percorra cada articulação do início ao fim, uma a uma, e **pressione Enter** para terminar
3. O mesmo para o braço direito e o chassi.

Da próxima vez que houver um arquivo de calibração, ele pergunta: pressione
Enter para restaurar ou digite `c` para recalibrar.

### Mapeamento de teclas

**Chassi**

| Tecla | Função |
|---|---|
| `i` / `k` | Para frente / para trás |
| `j` / `l` | Para a esquerda / para a direita |
| `u` / `o` | Virar à esquerda / à direita |
| `n` / `m` | Acelerar / desacelerar (três níveis) |
| `b` | Sair do programa |

**Braço esquerdo**

| Tecla | Articulação |
|---|---|
| `q` / `e` | shoulder_pan (rotação da base) ± |
| `w` / `s` | x (frente/trás) ± |
| `a` / `d` | y (esquerda/direita) ± |
| `z` / `x` | pitch (inclinação) ± |
| `r` / `f` | wrist_roll (rotação do pulso) ± |
| `t` / `g` | gripper (garra) abrir / fechar |
| `c` | Voltar à posição zero |
| `y` | Executar trajetória retangular (para demonstração/teste) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**Braço direito**

| Tecla | Articulação |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x (frente/trás) ± |
| `4` / `6` | y (esquerda/direita) ± |
| `1` / `3` | pitch (inclinação) ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper abrir / fechar |
| `0` | Voltar à posição zero |
| `Y` (**maiúsculo**) | Executar trajetória retangular |

**Outros**: `?` → servos da cabeça voltam à posição zero

> Os braços esquerdo e direito são **espelhados**: o esquerdo usa a área das
> letras (`q/e`, `w/a/s/d`) e o direito, o teclado numérico (`7/9`, `4/6`,
> `8/2`, `1/3`). A tecla de `reset` também é diferente — braço esquerdo `c`,
> braço direito `0`. Atenção: a tecla da trajetória retangular é o `y`
> minúsculo no braço esquerdo e o **`Y` maiúsculo** no direito.

### Outros exemplos

| Exemplo | Descrição | Precisa instalar algo extra? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | Versão com chassi de duas rodas | Não (também exige instalar primeiro as duas bibliotecas) |
| `5_xlerobot_teleop_xbox.py` | Controle de Xbox | Exige `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | Falta o módulo `joyconrobotics`; não funciona |
| `8_xlerobot_teleop_vr.py` | VR | Exige montar adicionalmente o diretório XLeVR |

---

## 5. Coletar dados de demonstração

⚠️ `lerobot-record --robot.type=xlerobot` **não funciona** (pelo mesmo motivo da
seção 0).

O XLeRobot só tem o caminho de gravação via VR, e ele depende do módulo `XLeVR`,
que não está na imagem.

**Se quiser usar isso, você terá de escrever o próprio script** com a API
LeRobotDataset (a biblioteca está na imagem):

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<seu-usuário>/<nome-do-dataset>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# No loop de teleoperação:
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # Obrigatório chamar; caso contrário, os metadados não são gravados
```

Você pode usar como referência o
`examples/8_vr_teleop_with_dataset_recording.py` da imagem, substituindo a
parte de VR pela teleoperação por teclado.

**Lembre-se de adicionar `-e HF_ENDPOINT=https://hf-mirror.com`**; senão, o
envio do conjunto de dados para o Hub vai falhar.

> Uma pegadinha ao gravar conjuntos de dados: depois de `save_episode()`,
> **é obrigatório chamar `ds.finalize()`**; caso contrário, os metadados do
> episódio não são gravados em disco e não dá para lê-los depois (o erro é
> `Provided directory does not contain any parquet file`).

---

## 6. O que fazer se a porta serial não for ACM0/ACM1

Os exemplos **não têm argparse**; a porta serial vem do valor padrão de
`XLerobotConfig()`:

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

Altere para especificar as portas de forma explícita:

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

Depois de alterar, basta rodar de novo (o código-fonte é montado; mudanças no
arquivo da máquina host têm efeito imediato).

---

## 7. Implantar o modelo treinado

A política ACT **não exige dependências extras** e funciona direto na imagem:

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<seu-usuário>/<nome-do-modelo>")
policy.eval()

# Depois de conectar o robô, inferir em loop
# action = policy.select_action(batch)
```

Políticas já pré-instaladas na imagem:

| Política | Dependências | Observações |
|---|---|---|
| **ACT** | Nenhuma | A mais usada; testada e funcionando |
| **Diffusion** | `diffusers` | Exige a imagem completa |
| SmolVLA / pi0 / groot | transformers | **Não vem pré-instalada**; o pacote é grande e não roda na CPU |

> No mesmo processo, **não dá para importar duas variantes de robô ao mesmo
> tempo** — a `xlerobot_mecanum` registra a própria configuração como
> `"xlerobot"` e colide com a versão básica, gerando o erro
> `Cannot register ... already registered`. Cada robô usa apenas uma variante;
> rodando em processos separados, não há problema.

---

## 8. Treinamento

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-dataset-name>
```

> O `lerobot-train` **não precisa de `robot.type`** (consome apenas o conjunto
> de dados e o tipo de política), por isso esse comando funciona e não é
> afetado pela restrição da seção 0.
>
> Treinamento consome muito poder de processamento. Na CPU só dá para treinar
> em escala minúscula; para uso prático, é necessária a GPU do Jetson.

---

> **Próximo:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — Se algo der errado, procure aqui
> **O outro caminho:** [lerobot/](../lerobot/01-Operation.md) (operar um braço único / LeKiwi com a linha de comando `lerobot-*`)
