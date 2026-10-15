---
title: Resolução de problemas e referência rápida
---

# Resolução de problemas e referência rápida

> **Pertence a:** [troubleshooting/](01-Troubleshooting.md)
> **Ver também:** [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## Problemas frequentes

### A porta serial do robô não está visível dentro do contendor

```bash
# Confirme na máquina anfitriã que o dispositivo existe
ls /dev/ttyACM*
# Confirme que o utilizador está no grupo dialout
groups | grep dialout
```

Se não estiver no grupo, execute `sudo usermod -aG dialout $USER` e **faça login novamente**.

### O descarregamento da imagem encrava ou expira

Não configurou um acelerador de espelhos. Ver [02-Environment-Setup](../deployment/02-Environment-Setup.md) secção 2.

### Falha ao descarregar o modelo / não liga ao huggingface

Configure `-e HF_ENDPOINT=https://hf-mirror.com`.
Ver [02-Environment-Setup](../deployment/02-Environment-Setup.md) secção 4.

### A janela de visualização do rerun vai abaixo

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

Faltam as bibliotecas X11. **O robô em si não é afetado**; simplesmente não se
vê a janela.
O comando de instalação e os cuidados a ter estão em [xlerobot/](../xlerobot/01-Operation.md) secção 1 —
o ponto-chave é que o `docker exec` **tem obrigatoriamente de incluir `-u root`**.

### `torch.cuda.is_available()` devolve False no contendor

A GPU é obrigatória, pelo que isto é sempre um problema de configuração —
verifique as duas coisas:

- Se iniciou o contendor com `--device nvidia.com/gpu=all` — **não com
  `--runtime nvidia`**, que não injeta os nós dos dispositivos
- Se a especificação CDI existe na máquina anfitriã (`/etc/cdi/nvidia.yaml`) — ver
  [03-Deployment §4](../deployment/03-Deployment.md)

### O contendor não arranca e apresenta um erro de CDI

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

O serviço de atualização automática na máquina anfitriã gerou uma especificação
que referencia um `card0` inexistente. Para corrigir:

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(Este problema reproduz-se a cada reinício.)

### A calibração tem de ser repetida sempre

Os ficheiros de calibração ficam dentro do contendor e desaparecem quando este é
eliminado. Monte o diretório de cache ao iniciar:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

O `scripts/run.sh` já trata disso.

### O comando de calibração devolve `invalid choice: 'xlerobot'`

Não é uma avaria — é o comportamento previsto. A ferramenta de linha de comando
`lerobot-calibrate` não suporta o XLeRobot; a calibração é acionada
automaticamente nos scripts de exemplo. Ver as secções 0 e 3 de
[xlerobot/](../xlerobot/01-Operation.md).

### Aparece uma série de erros do torchcodec ao trabalhar com conjuntos de dados

Se estiver a usar um ambiente instalado **por conta própria** em vez da imagem,
poderá ver `libnvrtc.so.13: cannot open shared object file`. Isto deve-se ao
facto de o torchcodec não conseguir carregar em ambiente exclusivamente CPU; o
lerobot recorre automaticamente ao pyav e a funcionalidade não é afetada. Na
imagem já foi removido, pelo que este erro não surge.

### Erro ao fazer `import` de duas variantes do robô no contendor

```
Cannot register ... as xlerobot because ... is already registered
```

Só ocorre **entre o par `xlerobot` e `xlerobot_mecanum`** — ambos se registam
como `"xlerobot"` no código-fonte (a configuração da mecanum foi copiada sem
alterar o nome de registo); trata-se de um bug do upstream do XLeRobot.

**As restantes combinações não entram em conflito**: todos os robôs do LeRobot
original + XLeRobot **podem coexistir no mesmo processo** (8 tipos registados em
simultâneo nos testes), e o `xlerobot_2wheels` também não conflita.

Cada robô utiliza apenas uma variante, pelo que a utilização real não é afetada.
Se realmente precisar de usar ambas ao mesmo tempo (por exemplo, para escrever
um script de comparação), execute em processos separados.

---

## Problemas ao usar os comandos originais `lerobot-*`

### O `lerobot-record` dá erro relacionado com a câmara / os dados gravados não têm imagem

As câmaras têm de ser passadas através de `--robot.cameras` como um
**dicionário aninhado**, e não como parâmetros separados de nível superior:

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

Atenção: é `index_or_path` (e não `index`); `front` é o nome da câmara, e é
possível definir várias. O exemplo completo está na secção 6 de
[lerobot/](../lerobot/01-Operation.md).

### O `lerobot-eval` não funciona no robô real

O `lerobot-eval` destina-se a **benchmarks de simulação**
(`--env.type=aloha/pusht/libero/metaworld...`); **não é uma ferramenta de
implementação no robô real**.

Para executar uma política treinada num robô real, utilize o **`lerobot-rollout`**:

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> --strategy.type=base
```

### Dúvida entre `examples/` e `lerobot-*`

| O seu hardware | Use qual |
|---|---|
| XLeRobot completo (dois braços + chassis) | Scripts em `examples/` → [xlerobot/](../xlerobot/01-Operation.md) |
| Um único braço SO-101 / SO-100, LeKiwi | Linha de comando `lerobot-*` → [lerobot/](../lerobot/01-Operation.md) |

O critério é simples: a lista de autorizados de robôs do `lerobot-*` **não inclui
`xlerobot`** (a lista completa consta da secção 11 de
[lerobot/](../lerobot/01-Operation.md)).

### Passo `--robot.type` mas recebo `invalid choice`

Compare com a lista completa da secção 11 de
[lerobot/](../lerobot/01-Operation.md) — só aqueles 14 tipos originais
estão disponíveis. O `xlerobot` não consta da lista; para isso, utilize os
scripts em `examples/`.

---

## Tabela de referência rápida

### Geral (ambos os caminhos)

```bash
# Descarregar a imagem
docker pull chenyang310/xlerobot:jetson

# Iniciar
bash scripts/run.sh jetson

# Depois de entrar no contendor — configuração inicial
lerobot-find-port                     # Localizar a porta serial (interativo; siga as instruções para desligar e voltar a ligar o cabo do servo)

# Instalar as duas bibliotecas X11 exigidas pelo rerun (noutro terminal; não pode omitir o -u root)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# Treino (partilhado pelos dois caminhos: não necessita de robot.type)
lerobot-train --policy.type=act --dataset.repo_id=<username>/<dataset-name>

# Verificação rápida
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot completo (dois braços + chassis)

```bash
# Teleoperação: basta um terminal; na primeira vez, entra automaticamente na calibração guiada
python examples/4_xlerobot_teleop_keyboard.py

# Versão com chassis de duas rodas
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ Não passe xlerobot ao lerobot-calibrate / lerobot-record / lerobot-teleoperate:
#    não consta da lista de autorizados e só apresenta invalid choice. O XLeRobot usa os scripts em examples/.
```

Consulte os detalhes em [xlerobot/](../xlerobot/01-Operation.md).

### B · Um único braço SO-101 / LeKiwi (linha de comando `lerobot-*`)

```bash
# Localizar os dispositivos
lerobot-find-port
lerobot-find-cameras opencv

# Gravar o ID em servos novos (apenas para braços acabados de montar)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# Calibrar
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# Teleoperar (teclado; não necessita de braço líder)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# Gravar conjunto de dados
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<username>/<dataset-name> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# Verificação com replay
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<username>/<dataset-name> --dataset.episode=0

# Implementar a política treinada (⚠️ não é o lerobot-eval, esse é para simulação)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<username>/<model-name> --strategy.type=base
```

Consulte os detalhes em [lerobot/](../lerobot/01-Operation.md).

### Referência rápida de teclas

| Parte | Tecla | Função |
|---|---|---|
| Chassis | `i` `k` `j` `l` | Frente / trás / esquerda / direita |
| Chassis | `u` `o` `n` `m` | Rodar à esquerda / à direita / acelerar / desacelerar |
| Chassis | `b` | Sair |
| Braço esquerdo | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| Braço esquerdo | `r/f` `t/g` `c` `y` | wrist / garra / posição zero / trajetória retangular |
| Braço esquerdo | `<` `>` `,` `.` | servos da cabeça 1 / 2 |
| Braço direito | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| Braço direito | `/` `*` `+` `-` `0` | wrist / garra / posição zero |
| Braço direito | `Y` (**em maiúscula**) | trajetória retangular |
| Outros | `?` | cabeça à posição zero |

A explicação completa consta de [xlerobot/](../xlerobot/01-Operation.md) secção 4.

---

## Apêndice: porque é que as coisas mencionadas neste tutorial são assim

| Decisão | Razão |
|---|---|
| Obrigatório usar Python 3.12 | O lerobot 0.6.2 utiliza sintaxe do PEP 695 (`type X = ...`, `class Foo[T]:`); no 3.10/3.11 nem sequer compila |
| Na China continental, é obrigatório configurar aceleradores de imagem | O acesso direto ao Docker Hub expira; medido: `context deadline exceeded` |
| É obrigatório configurar o HF_ENDPOINT | O `huggingface.co` é completamente inacessível a partir da China continental; o `hf-mirror.com` está acessível |
| Usar CDI em vez de `--runtime nvidia` no Jetson | Em ambientes cgroup v2 do JetPack 6/7, o `--runtime nvidia` não injeta os nós dos dispositivos |
| Não instalar a biblioteca de cinemática placo | Não existem wheels cp312/aarch64; o XLeRobot usa a sua própria IK analítica, sem depender dela |

---

## Ligações relacionadas

- [Projeto XLeRobot](https://github.com/Vector-Wangel/XLeRobot)
- [Documentação oficial do LeRobot](https://huggingface.co/docs/lerobot)
- [Utilização e limites do Docker Hub](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **Voltar ao início:** [01-Overview](../deployment/01-Overview.md)
> **O outro caminho:** [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
