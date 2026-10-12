---
title: Solução de problemas e referência rápida
---

# Solução de problemas e referência rápida

> **Pertence a:** [troubleshooting/](01-Troubleshooting.md)
> **Veja também:** [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## Problemas comuns

### A porta serial do robô não aparece dentro do contêiner

```bash
# Confirme no host que o dispositivo existe
ls /dev/ttyACM*
# Confirme que o usuário está no grupo dialout
groups | grep dialout
```

Se você não estiver no grupo, rode `sudo usermod -aG dialout $USER` e **faça login novamente**.

### O download da imagem trava ou dá timeout

Você não configurou um acelerador de espelho. Veja [02-Environment-Setup](../deployment/02-Environment-Setup.md) seção 2.

### Falha ao baixar o modelo / não conecta ao huggingface

Configure `-e HF_ENDPOINT=https://hf-mirror.com`.
Veja [02-Environment-Setup](../deployment/02-Environment-Setup.md) seção 4.

### A janela de visualização do rerun trava

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

Faltam as bibliotecas X11. **O robô em si não é afetado**; só não dá para ver a janela.
O comando de instalação e os cuidados a tomar estão em [xlerobot/](../xlerobot/01-Operation.md) seção 1 —
o ponto principal é que o `docker exec` **precisa do `-u root`**.

### `torch.cuda.is_available()` retorna False no contêiner

- Usando as imagens `cpu` / `cpu-slim` → normal; essas versões não têm GPU mesmo
- Usando a imagem `jetson` → verifique se você usou `--runtime nvidia`
  (**é obrigatório usar `--device nvidia.com/gpu=all`**) e se a especificação CDI foi gerada

### O contêiner não sobe e exibe um erro de CDI

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

O serviço de atualização automática na máquina host gerou uma especificação que
faz referência a um `card0` inexistente. Como corrigir:

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(Este problema se repete a cada reinicialização nas nossas próprias placas; veja
detalhes em developer/03-Board-Remote-Testing.md.)

### A calibração precisa ser refeita toda vez

Os arquivos de calibração ficam dentro do contêiner e desaparecem quando ele é
removido. Monte o diretório de cache ao iniciar:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

O `scripts/run.sh` já faz isso.

### O comando de calibração retorna `invalid choice: 'xlerobot'`

Não é um defeito — é de propósito. A ferramenta de linha de comando
`lerobot-calibrate` não suporta o XLeRobot, e a calibração é disparada
automaticamente nos scripts de exemplo. Veja as seções 0 e 3 de
[xlerobot/](../xlerobot/01-Operation.md).

### Uma enxurrada de erros do torchcodec aparece ao operar conjuntos de dados

Se você estiver usando um ambiente instalado **por conta própria** em vez da
imagem, talvez veja `libnvrtc.so.13: cannot open shared object file`. Isso
acontece porque o torchcodec não consegue carregar em ambiente só de CPU; o
lerobot faz fallback automático para o pyav e a funcionalidade não é afetada.
Na imagem ele já foi desinstalado, então esse erro não aparece.

### Erro ao fazer `import` de duas variantes de robô no contêiner

```
Cannot register ... as xlerobot because ... is already registered
```

Só acontece **entre o par `xlerobot` e `xlerobot_mecanum`** — os dois se registram
como `"xlerobot"` no código-fonte (a config da mecanum foi copiada sem mudar o
nome de registro); é um bug do upstream do XLeRobot.

**As outras combinações não conflitam**: todos os robôs do LeRobot original +
XLeRobot **podem coexistir no mesmo processo** (8 tipos registrados
simultaneamente em teste), e o `xlerobot_2wheels` também não conflita.

Um robô só usa uma variante, então o uso real não é afetado. Se precisar mesmo
usar as duas ao mesmo tempo (por exemplo, para escrever um script de comparação),
rode em processos separados.

---

## Problemas ao usar os comandos originais `lerobot-*`

### O `lerobot-record` dá erro de câmera / os dados gravados não têm imagem

As câmeras devem ser passadas por `--robot.cameras` como um **dicionário
aninhado**, e não como parâmetros de nível superior separados:

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

Atenção: é `index_or_path` (não `index`); `front` é o nome da câmera, e dá para
criar várias. O exemplo completo está na seção 6 de
[lerobot/](../lerobot/01-Operation.md).

### O `lerobot-eval` não funciona em robô real

O `lerobot-eval` serve para **benchmark de simulação**
(`--env.type=aloha/pusht/libero/metaworld...`); **não é uma ferramenta de
implantação em robô real**.

Para rodar uma política treinada em um robô real, use o **`lerobot-rollout`**:

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=seu-usuário/meu-modelo --strategy.type=base
```

### Não sei se devo usar `examples/` ou `lerobot-*`

| Seu hardware | Use qual |
|---|---|
| XLeRobot completo (braços duplos + chassi) | Scripts `examples/` → [xlerobot/](../xlerobot/01-Operation.md) |
| Um braço SO-101 / SO-100, LeKiwi | Linha de comando `lerobot-*` → [lerobot/](../lerobot/01-Operation.md) |

O critério é simples: a lista de permitidos de robôs do `lerobot-*` **não tem
`xlerobot`** (a lista completa está na seção 11 de
[lerobot/](../lerobot/01-Operation.md)).

### Passei `--robot.type` mas dá `invalid choice`

Compare com a lista completa da seção 11 de
[lerobot/](../lerobot/01-Operation.md) — só aqueles 14 tipos originais
funcionam. `xlerobot` não está nela; para isso, use os scripts de `examples/`.

---

## Tabela de consulta rápida

### Geral (os dois caminhos)

```bash
# Baixar a imagem
docker pull chenyang310/xlerobot:cpu-slim

# Iniciar (genérica)
bash scripts/run.sh cpu

# Iniciar (Jetson, com GPU)
bash scripts/run.sh jetson

# Depois de entrar no contêiner — configuração inicial
lerobot-find-port                     # Localizar a porta serial (interativo; siga as instruções para desconectar e reconectar o cabo do servo)

# Instalar as duas bibliotecas X11 exigidas pelo rerun (em outro terminal; não dá para omitir o -u root)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# Treinamento (compartilhado pelos dois caminhos: não precisa de robot.type)
lerobot-train --policy.type=act --dataset.repo_id=seu-usuário/meu-dataset

# Autoverificação
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot completo (braços duplos + chassi)

```bash
# Teleoperação: um terminal basta; na primeira vez, entra automaticamente na calibração guiada
python examples/4_xlerobot_teleop_keyboard.py

# Versão com chassi de duas rodas
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ Não passe xlerobot para lerobot-calibrate / lerobot-record / lerobot-teleoperate:
#    não está na lista de permitidos e só dá invalid choice. O XLeRobot usa os scripts de examples/.
```

Detalhes em [xlerobot/](../xlerobot/01-Operation.md).

### B · Um braço SO-101 / LeKiwi (linha de comando `lerobot-*`)

```bash
# Encontrar os dispositivos
lerobot-find-port
lerobot-find-cameras opencv

# Gravar ID em servos novos (só para braços recém-montados)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# Calibrar
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# Teleoperar (teclado; não precisa de braço mestre)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# Gravar conjunto de dados
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=seu-usuário/meu-dataset --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# Conferir com replay
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=seu-usuário/meu-dataset --dataset.episode=0

# Implantar a política treinada (⚠️ não é o lerobot-eval, aquele é para simulação)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=seu-usuário/meu-modelo --strategy.type=base
```

Detalhes em [lerobot/](../lerobot/01-Operation.md).

### Consulta rápida de teclas

| Parte | Tecla | Função |
|---|---|---|
| Chassi | `i` `k` `j` `l` | Frente / trás / esquerda / direita |
| Chassi | `u` `o` `n` `m` | Virar à esquerda / à direita / acelerar / desacelerar |
| Chassi | `b` | Sair |
| Braço esquerdo | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| Braço esquerdo | `r/f` `t/g` `c` `y` | wrist / garra / posição zero / trajetória retangular |
| Braço esquerdo | `<` `>` `,` `.` | servos da cabeça 1 / 2 |
| Braço direito | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| Braço direito | `/` `*` `+` `-` `0` | wrist / garra / posição zero |
| Braço direito | `Y` (**maiúsculo**) | trajetória retangular |
| Outros | `?` | cabeça à posição zero |

A explicação completa está em [xlerobot/](../xlerobot/01-Operation.md) seção 4.

---

## Apêndice: por que as coisas mencionadas neste tutorial são assim

| Decisão | Motivo |
|---|---|
| Obrigatório usar Python 3.12 | O lerobot 0.6.2 usa sintaxe do PEP 695 (`type X = ...`, `class Foo[T]:`); no 3.10/3.11 nem a compilação passa |
| Na China continental, é obrigatório configurar aceleradores de imagem | O acesso direto ao Docker Hub dá timeout; medido: `context deadline exceeded` |
| É obrigatório configurar o HF_ENDPOINT | O `huggingface.co` é totalmente inacessível a partir da China continental; o `hf-mirror.com` funciona |
| Usar CDI em vez de `--runtime nvidia` no Jetson | Em ambientes cgroup v2 do JetPack 6/7, o `--runtime nvidia` não injeta os nós de dispositivo |
| Não instalar a biblioteca de cinemática placo | Ela não tem wheels para cp312/aarch64; o XLeRobot usa a própria IK analítica e não depende dela |

Mais detalhes técnicos em developer/01-Jetson-Environment.md.

---

## Links relacionados

- [Projeto XLeRobot](https://github.com/Vector-Wangel/XLeRobot)
- [Documentação oficial do LeRobot](https://huggingface.co/docs/lerobot)
- [Uso e limites do Docker Hub](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **Voltar ao início:** [01-Overview](../deployment/01-Overview.md)
> **O outro caminho:** [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
