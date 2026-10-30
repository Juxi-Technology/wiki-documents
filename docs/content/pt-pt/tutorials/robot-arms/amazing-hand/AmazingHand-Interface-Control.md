---
title: "Tutorial de controlo de interface"
description: "Ferramenta de controlo por GUI Python / linha de comandos do AmazingHand: seleção de mão esquerda e direita, instalação, calibração, protocolo e perguntas frequentes."
---

# Tutorial de controlo de interface

## Ferramenta de controlo em Python do AmazingHand (para mão esquerda e direita)

Ferramenta de GUI e linha de comandos escrita em Python que controla 8 servos Feetech SCS0009 através da placa de acionamento de servos de barramento série, acionando a mão hábil [AmazingHand da Pollen Robotics](https://github.com/pollen-robotics/AmazingHand).

> **As duas mãos são suportadas.** Na inicialização, escolha a mão direita (IDs de servo 1-8) ou a mão esquerda (IDs de servo 11-18); a opção --hand permite saltar a pergunta. A biblioteca de poses é partilhada entre as duas mãos; cada mão mantém, em data/config.yaml, o seu próprio mapeamento de servos, offset de montagem e alvos de valores brutos. Consulte a secção Seleção de mão esquerda e direita para mais detalhes.

![Imagem](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## Estrutura do projeto

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## Requisitos de ambiente

- Python 3.10 ou superior (a GUI requer Tkinter incluído)
- Fonte de alimentação externa de 5 V independente para os 8 servos
- Adaptador USB de barramento série com driver já instalado

## Instalação

Recomenda-se instalar com pip (lê o pyproject.toml):

```bash
pip install -e .
```

Ou instalar diretamente as dependências:

```bash
pip install -r requirements.txt
```

Ambiente de desenvolvimento e testes:

```bash
pip install -r requirements-dev.txt
```

---

## Calibração

O sistema de ângulos, as poses predefinidas e a posição central dos servos dependem da mão mecânica específica. Todos esses parâmetros estão centralizados em data/config.yaml.

### Seleção de mão esquerda e direita

As duas mãos usam servos e estruturas mecânicas diferentes, por isso a escolha é feita antes de a interface aparecer:

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

Para saltar a pergunta:

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

Sem --hand, é utilizado o valor hand: de data/config.yaml.

**Porque uma mão não é apenas trocar um conjunto de IDs.** Além da numeração dos servos (direita 1-8, esquerda 11-18, e a numeração dos dedos da mão esquerda é espelhada — o anelar vem primeiro), a mão esquerda tem duas diferenças mecânicas, que o programa trata automaticamente:

|  | Mão direita | Mão esquerda |
|---|---|---|
| ID do servo | 1-8 | 11-18 |
| Dedo → ID | Indicador 1,2 / Médio 3,4 / Anelar 5,6 / Polegar 7,8 | Anelar 11,12 / Médio 13,14 / Indicador 15,16 / Polegar 17,18 |
| MiddlePos do fabricante | [451, 571, …] | [571, 451, …] |
| Offset de montagem | 0° | **−35.16°** (hands.left.angle_offset) |
| Dois servos por dedo | (a, b) | **(b, a)** (hands.left.mirror_pose) |

Se qualquer uma das duas últimas diferenças for ignorada, as poses ficam deformadas: o offset de montagem desvia cada dedo em 35°, e sem a troca entre os servos do mesmo dedo a direção de abertura inverte-se por completo (na pose de V, os dois dedos juntam-se e os três dedos que deveriam ficar juntos abrem-se).

O data/hand_config.yaml é **partilhado entre as duas mãos** e armazena sempre a ordem da mão direita; para a mão esquerda, os valores são convertidos na leitura e convertidos de volta ao guardar.

**Calibrar uma mão nova.** Use os valores em hands.left como modelo e verifique por esta ordem:

1. Pressione **Middle position** e veja se a linha Current (0-1023) mostra os valores brutos esperados
1. Pressione **Open All** / **Close All** — o curso deve chegar aos limites mecânicos sem bloquear os servos
1. Teste uma pose de abertura (victory formando um V; greeting com três dedos juntos)

Se algo estiver errado, ajuste o parâmetro correspondente:

| Sintoma | O que ajustar |
|---|---|
| Leitura de Middle position incorreta | `hands.<nome>.raw_positions.middle` |
| Direção de abertura invertida | `hands.<nome>.mirror_pose` |
| Curso insuficiente ou excessivo | `hands.<nome>.raw_positions.open / close` |

### Sistema de ângulos

Tanto a GUI como a CLI usam **valores em graus**, convertidos pelo driver rustypot nos valores brutos internos dos servos:

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| Ângulo | Significado |
|---|---|
| **−35°** | Totalmente aberto (estendido) |
| **0°** | Posição central, dedos naturalmente semiflexionados |
| **+75°** | Totalmente fechado (punho) |

Os servos com ID par são **invertidos** em relação aos de ID ímpar, de modo que um único valor de pose faz os dois servos do mesmo dedo moverem-se em direções opostas. Isto é tratado automaticamente pelo programa; não é necessário converter manualmente.

### Limites

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max controlam a **abertura lateral**. Como o programa normaliza (u = |side_offset| / |side_min|), **alterar apenas este intervalo não muda a amplitude real de abertura** — apenas comprime a escala do slider. Para alterar de facto o ângulo de abertura dos dedos, é necessário alterar também auto_extremes.

### Alvos de valores brutos

Os três botões de posição global levam os servos a **valores brutos exatos**, sem passar pelo modelo de ângulos:

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close — os dois extremos do curso mecânico. Medidos ao acionar os servos individualmente com a ferramenta de depuração Feetech do fabricante.
- middle — a **posição central mecânica após calibração** (ou seja, o MiddlePos do programa de demonstração Arduino do fabricante). Note que **não** é o ponto médio entre open e close, mas sim cerca de **±60 raw (±17.6°)** afastado de raw 511.

> Estes são **valores de calibração de cada mão**. Nas palavras do fabricante: *"replace values by your calibration results"*.

**Como verificar:** o painel Servo Feedback tem uma linha Current (0-1023) que mostra a posição bruta em tempo real. Depois de pressionar **Middle position**, essa linha deve mostrar 451, 571, 451, 571, ….

### Referência rápida dos intervalos dos controlos

| Controlo | Intervalo |
|---|---|
| Slider de abrir/fechar (vertical) | −75 … +75 |
| Slider lateral (horizontal) | −35 … +35 |
| Velocidade | 1 (lento) … 6 (rápido) |

O valor de velocidade é enviado pelo driver aos servos como rad/s, por isso 1–6 corresponde aproximadamente a **57–344 °/s**. Sob carga, a velocidade real fica em cerca de **70%** desse valor — tenha isto em conta ao definir os atrasos das sequências.

---

## Executar a GUI (amazing_hand_gui.py)

Após instalar com pip, é possível chamar diretamente:

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

Ou executar diretamente:

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

A lista pendente de portas mostra as portas série que **realmente existem** na máquina (dá prioridade ao pyserial; se não estiver disponível, lê o registo do Windows), pelo que até adaptadores com numeração mais alta aparecem. É possível escrever o número da porta diretamente na lista pendente. Se a porta predefinida da configuração não estiver ligada, a GUI arranca automaticamente na primeira porta real; para fixar uma porta, passe --port explicitamente.

### Funcionalidades

- Sliders por dedo para abrir/fechar e movimento lateral, com dois modos: **Auto** (abrir/fechar + lateral) e **Raw** (controlo direto do ângulo dos dois servos)
- Botões rápidos Open / Close / Center por dedo
- Seleção de velocidade por dedo (1–6), além de uma lista pendente de velocidade global sincronizada
- Atalhos de teclado para ajustes finos precisos
- **Botões de posição global**: Open All, Close All, Center All, Middle position
- Gestão de poses e sequências com base em data/hand_config.yaml
- Eliminação direta de poses guardadas na interface (botão 🗑 Delete)
- Curvas de telemetria dos servos em tempo real (posição, carga, temperatura, tensão)
- Tabela Servo Feedback com a **posição bruta** em tempo real (0–1023), útil para verificar a calibração

### Operação pelo teclado

- **1-4**: selecionar o dedo (Ring = anelar, Middle = médio, Pointer = indicador, Thumb = polegar)
- **Teclas de direção**: mover o dedo selecionado
  - Cima/baixo: fechar / abrir
  - Esquerda/direita: movimento lateral
- **Teclas modificadoras**:
  - Nenhuma: 1° por vez (ajuste fino)
  - Shift: 5° por vez (normal)
  - Ctrl: 10° por vez (rápido)
- **Ações rápidas**:
  - Q: fechar completamente o dedo selecionado
  - E: abrir completamente o dedo selecionado
  - C: recentralizar a posição lateral

### Botões globais

| Botão | Abrir/fechar | Lateral |
|---|---|---|
| ✋ **Open All** | Todos os dedos para o valor bruto open | Recentralizar |
| ✊ **Close All** | Todos os dedos para o valor bruto close | Recentralizar |
| ⊙ **Center All** | **Sem alteração** | Recentralizar |
| ⊙ **Middle position** | Todos os dedos para o valor bruto middle | Recentralizar |

A lista pendente **Global Speed** (1–6) aplica imediatamente a velocidade selecionada a todos os controlos dos dedos e sincroniza a apresentação dos sliders de cada dedo.

Os três botões de valores brutos (Open All, Close All, Middle position) contornam o modelo de ângulos, por isso **após a execução os sliders mostram o valor representável mais próximo, e não o valor exato**. Se em seguida mexer num slider, a mão afasta-se do alvo bruto em até cerca de 0.3° — um compromisso deliberado para acertar com precisão nas posições calibradas.

> Problema conhecido: o Center All **não** ignora os dedos em modo **Raw** e substitui os ângulos brutos definidos manualmente. Já o botão ⊙ Center de um dedo individual não o faz.

---

## Executar a CLI (amazing_hand_cmd.py)

Ferramenta de linha de comandos independente que aplica poses e reproduz sequências sem iniciar a GUI. Lê o mesmo data/hand_config.yaml da GUI e **envia literalmente** os valores de pose armazenados — exatamente os mesmos que a GUI envia.

### Linux: permissões da porta série

Os adaptadores USB-série normalmente aparecem como /dev/ttyACM0 (Waveshare / CDC-ACM) ou /dev/ttyUSB0 (FTDI / CH340).

Como encontrar:

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

Se aparecer **Permission denied**, adicione o utilizador atual ao grupo dialout e volte a iniciar sessão:

```bash
sudo usermod -aG dialout $USER
```

### Após instalar com pip

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### Execução direta

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### Parâmetros

| Parâmetro | Valor predefinido | Descrição |
|---|---|---|
| --pose NAME | – | Aplica a pose com o nome indicado |
| --sequence NAME | – | Reproduz a sequência com o nome indicado |
| --list | – | Lista todas as poses e sequências |
| --loop | desligado | Reproduz a sequência em loop até Ctrl+C |
| --speed N | 3 | Velocidade dos servos 1 (lento)… 6 (rápido) |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | Número da porta série |
| --baudrate N | 1000000 | Taxa de baud |
| --config PATH | data/hand_config.yaml | Indica outro ficheiro de configuração |
| --hand {right,left} | hand do config.yaml | Indica qual a mão a usar (direita 1-8, esquerda 11-18) |

Ao sair do script (incluindo com Ctrl+C), o binário de todos os servos é desativado automaticamente.

> A CLI não tem um parâmetro --config para o data/config.yaml; esse ficheiro é sempre carregado a partir do diretório do projeto.

---

## Ficheiros de configuração

### data/config.yaml

| Secção | Utilização |
|---|---|
| serial | Porta série predefinida, taxa de baud e lista de taxas disponíveis de cada plataforma |
| servos | IDs dos servos correspondentes a cada dedo |
| limits | Intervalos de ângulo dos servos e dos dois sliders |
| speeds | Valores predefinidos/mínimo/máximo da escala de velocidade 1–6 |
| auto_extremes | Posição dos servos quando o slider lateral chega ao limite |
| raw_positions | Alvos de valores brutos exatos dos botões de posição global |
| paths | Localização dos ficheiros de poses/sequências |

### Correspondência entre servos e dedos

| Dedo | ID do servo | Índice no array de pose |
|---|---|---|
| Pointer (indicador) | 1, 2 | 4, 5 |
| Middle (médio) | 3, 4 | 2, 3 |
| Ring (anelar) | 5, 6 | 0, 1 |
| Thumb (polegar) | 7, 8 | 6, 7 |

**A ordem do array de pose é anelar, médio, indicador, polegar — não é por ordem de ID de servo.** Este é o ponto mais fácil de errar ao editar o hand_config.yaml manualmente.

> O comentário no topo do amazing_hand_cmd.py diz "index 0→servo1 … 7→servo8", mas **esse comentário está errado**; a tabela acima é o comportamento real do código.

---

## Poses e sequências

Todas as poses e sequências são armazenadas em data/hand_config.yaml. Se o ficheiro não existir, a GUI cria-o automaticamente.

### Guardar poses

1. Coloque a mão na pose desejada com os sliders ou o teclado
1. Introduza um nome no campo "Name:"
1. Clique em "➕ Add New" na área Pose Management

A velocidade afeta apenas a rapidez de movimento dos sliders; uma pose guardada regista somente as 8 posições dos servos.

### Carregar / eliminar poses

- Selecione na lista pendente e clique em **✓ Apply** para mover a mão para essa pose
- Clique em **🗑 Delete**, à direita de Apply, e confirme para eliminar permanentemente

### Gestão de sequências

1. No Sequence Player, clique em "🔧 Manage" para abrir o gestor de sequências
1. **Saved Sequences** (coluna esquerda)
  - Ver, executar, editar ou eliminar sequências existentes
  - Duplo clique ou clique em "▶ Execute" para executar uma vez

1. **Sequence Builder** (coluna direita)
  - Duplo clique numa pose em "Available Poses" para a adicionar como passo
  - É possível definir, para cada passo, a velocidade e o atraso dos 8 servos; os passos são guardados no formato "pose:s1,s2,...,s8|delay"
  - Use ↑/↓ para ajustar a ordem, ou o botão "⏱ Delay" para inserir uma pausa independente
  - Depois de preencher o nome, clique em "💾 Save Sequence" para guardar; clique em "▶ Execute" para testar sem guardar

1. De volta à janela principal, marque **Loop** no Sequence Player para reprodução contínua

### Formato dos passos

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 — velocidades dos 8 servos na ordem da pose (1–6)
- delay — tempo de espera até ao passo seguinte, por exemplo 0.6s. **Pode ser omitido**; nesse caso a GUI recorre a uma espera automática fixa
- Uma pausa independente é escrita como SLEEP:1.0s (sem lista de velocidades separadas por vírgulas)

**Como escolher o atraso.** O driver consegue ler se o servo parou, mas a reprodução de sequências usa atrasos fixos. Estime aproximadamente por curso_em_graus / (velocidade × 57.3 × 0.7) segundos e deixe uma margem — numa mão com carga, um movimento de mais de cerca de 130° na velocidade 3 demora mais de 1.0 segundo.

### Exemplo de formato YAML

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

A reprodução em loop é controlada em tempo de execução (caixa de seleção da GUI) e já não é escrita no YAML.

---

## Testes

O projeto inclui 284 testes de unidade/integração/sistema e 54 testes de hardware.

### Executar todos os testes (sem hardware)

```text
pytest
```

### Executar os testes de hardware da GUI + CLI (requer servos ligados)

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

O test_system_hardware.py valida a ligação, a aplicação de poses, a leitura de telemetria, abrir/fechar e acenar com um dedo, o controlo de velocidade, a execução de sequências e a deteção de movimento.

O test_cmd_hardware.py valida ponta a ponta a camada CLI: posições das poses, parâmetros de velocidade, passos de sequência, wait_for_motion, saída do --list e desativação do binário ao sair.

Os critérios de aceitação completos estão em docs/REQUIREMENTS.md.

> Atenção: os testes sem hardware verificam os **valores predefinidos de fallback** em hand_logic.py, que continuam a usar a escala original de −40…110. Em tempo de execução, o data/config.yaml substitui esses valores, por isso os testes passam independentemente da sua calibração — mas isso também significa que **os testes não validam os seus parâmetros de calibração atuais**.

---

## Configuração dos IDs dos servos

Tutorial de configuração dos IDs dos servos com o software oficial da Feetech e a placa de acionamento de servos de barramento série: [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Descarregamento do software Feetech: [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## Agradecimentos

Projeto original: [Betatester777](https://github.com/Betatester777/AmazingHandControl) Hardware e firmware de referência: [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
