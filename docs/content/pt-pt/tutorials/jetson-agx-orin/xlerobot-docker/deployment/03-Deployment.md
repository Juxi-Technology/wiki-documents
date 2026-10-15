---
title: 03 · Implementação
---

# 03 · Implementação

> **Anterior:** [02-Environment-Setup](02-Environment-Setup.md)
> **Agora escolha um dos dois caminhos:** [xlerobot/](../xlerobot/01-Operation.md) (robô completo)
> ou [lerobot/](../lerobot/01-Operation.md) (braço único / LeKiwi)

Descarregue a imagem para a máquina e inicie o contendor. No fim desta página, estará num shell com todo o ambiente pronto.

---

## 1. Obter a imagem

Existe exatamente uma imagem:

```bash
docker pull chenyang310/xlerobot:jetson
```

| | |
|---|---|
| Arquitetura | `arm64` |
| Corre em | Jetson + JetPack 7.2 |
| Transferência | Aprox. 3.6 GB (maior depois de descompactar — deixe 20 GB livres) |
| Inclui | Teleoperação, calibração, gravação de dados, treino e inferência, **com aceleração por GPU** |

Confirme que chegou:

```bash
docker images | grep xlerobot
```

Deve ver `chenyang310/xlerobot` com a etiqueta `jetson`.

> **China continental**: esta transferência funciona tal como está — não precisa
> de acelerador de espelhos. Se estiver lenta, ver a secção 2 de
> [02-Environment-Setup](02-Environment-Setup.md).

### Compilar por si próprio (mantenedores)

Para quando precisar de fazer alterações ou quiser compilar a partir do
código-fonte mais recente.

```bash
git clone <repository-url> xlerobot-docker
cd xlerobot-docker

bash scripts/build.sh jetson
```

O script de build já vem configurado com espelhos para a China continental
(PyPI da Alibaba Cloud, fontes Ubuntu da Alibaba Cloud); **é possível compilar a
partir da rede da China continental sem qualquer configuração adicional**.

> A primeira compilação descarrega cerca de 2 GB de dependências; numa rede
> lenta, demora uma a duas horas.
> Com o `scripts/sync.sh` + a cache `wheels/` da placa, é possível reutilizar os
> pacotes já descarregados.

---

## 2. O que a imagem inclui

Uma só imagem, com tudo incluído:

- **Teleoperação e calibração** — mova o robô com a mão e guarde a respetiva calibração
- **Gravação e reprodução de dados**
- **Treino** — ACT, Diffusion Policy, SmolVLA, π₀, π₀.₅, Wall-OSS
- **Inferência** — execute uma política treinada no robô, **com aceleração por GPU**

---

## 3. Iniciar o contendor

### 3.1 Iniciar com o script (recomendado)

Se clonou o repositório:

```bash
bash scripts/run.sh jetson
```

O script já traz isto configurado:

- **GPU** — `--device nvidia.com/gpu=all` (CDI)
- **Passagem de dispositivos** — porta serial, câmaras, USB
- **Rede** — `--network host`, necessário para a teleoperação em VR e o controlo via web
- **Montagem do código-fonte** — alterar o código não obriga a reconstruir a imagem
- **Montagem da cache** — ficheiros de calibração e modelos descarregados são preservados

### 3.2 Iniciar manualmente

Se não usar o script, este é o comando mínimo funcional:

```bash
docker run -it --rm \
  --name xlerobot \
  --device nvidia.com/gpu=all \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson
```

**A função de cada parâmetro:**

| Parâmetro | Porque é que é necessário |
|---|---|
| `--device nvidia.com/gpu=all` | **Atribui a GPU ao contendor** (via CDI). Sem isto, não há GPU nenhuma |
| `--privileged` + `-v /dev:/dev` | Passagem da porta serial (servos SO-101), da câmara e do USB |
| `--network host` | Comunicação entre os dois processos host/client (ZMQ) e controlo por VR |
| `-v ~/.cache/huggingface` | **Ficheiros de calibração** e cache de modelos. Sem esta montagem, terá de recalibrar sempre que reabrir o contendor |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | Para quando precisar de usar a visualização (abrir a janela do rerun) |
| `-e HF_ENDPOINT` | O `huggingface.co` é completamente inacessível a partir da China continental; é obrigatório usar o espelho |

> O `/home/jetson` do caminho de montagem é o diretório do utilizador **dentro
> da imagem** — fixá-lo assim está correto, porque o utilizador dessa imagem
> chama-se `jetson`.

Depois de entrar, fica dentro de um bash com o diretório de trabalho `/opt/xlerobot`.

---

## 4. Parâmetros da GPU — o método CDI

A imagem **tem obrigatoriamente de** receber a GPU via CDI — **não pode usar `--runtime nvidia`**:

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

Antes da primeira utilização, é necessário gerar a especificação CDI na **máquina anfitriã**:

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **Problema com que já nos deparámos**: no JetPack 7.2, o hook
> `enable-cuda-compat` do `nvidia-container-toolkit 1.19.1` vai abaixo
> (`slice bounds out of range`), e o contendor não arranca de todo.
> Basta acrescentar o parâmetro abaixo para o desativar:
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> Quando a versão de CUDA do contendor coincide com a da máquina anfitriã, este hook não é necessário.

### Verificar se a GPU está disponível

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. Especificidades de cada plataforma

### Série Jetson Orin —— ✅ atualmente suportada

| Modelo | Requisito | Notas |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | A placa que testámos na prática (3.4 GB de memória também chegam para a teleoperação) |
| **Orin NX** | JetPack **7.2** | O mesmo que acima |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ O 7.0 / 7.1 **não suporta** o AGX Orin 64GB; é obrigatório o 7.2 |

**O único requisito obrigatório é a versão do JetPack**: o torch na imagem foi
compilado com CUDA 13.0, e o CUDA 13.x exige um controlador **≥ 580**.

| JetPack | L4T | CUDA | Controlador | Funciona? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ Controlador demasiado antigo |
| **7.2** | 39.2 | 13.2 | Série 595 | ✅ |

Para consultar a sua versão:

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ Atualizar do JetPack 6.x para o 7.x **não pode ser feito com `apt upgrade` / OTA**
> (o OTA só funciona dentro da mesma versão principal do L4T); é obrigatório
> regravar a placa completa.

### Jetson Nano (2019, original) —— ❌ Nunca suportado

Três razões independentes, todas becos sem saída:

1. **O CUDA 13 eliminou por completo a arquitetura Maxwell**. O controlador R580 é o último
   ramo com suporte a Maxwell / Pascal / Volta, e o CUDA 13 exige precisamente 580+.
   O Jetson Nano fica, no máximo, no JetPack 4.6.6 / CUDA 10.2.
2. **O compute 5.3 fica abaixo do mínimo suportado pelo torch**. Nesta imagem, as
   arquiteturas para as quais o torch foi compilado são
   `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` — o mínimo é sm_80,
   e o Jetson Nano é sm_53: não há kernel nativo, e a compilação JIT de PTX também não o alcança.
3. **A plataforma está EOL** (o JetPack 4 deixou de ser mantido em novembro de 2024).

### Qualquer outra plataforma —— ❌ Não suportado

Raspberry Pi, PC x86 comuns, Windows e macOS **não conseguem executar esta
imagem**. Foi compilada contra a pilha CUDA do JetPack 7.2 e é distribuída
apenas como `arm64`, pelo que não existe nenhuma edição CPU para a qual
recorrer. Utilize uma placa Jetson Orin.

> Verifique o que tem: `uname -m` deve mostrar `aarch64`, e
> `cat /etc/nv_tegra_release` deve indicar **R39**.

---

## Depois de entrar no contendor

Faça primeiro uma verificação rápida:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Saída esperada:

```
torch 2.11.0+cu130
lerobot 0.6.2
```

> ⚠️ **O `xlerobot` e o `xlerobot_mecanum` não podem estar no mesmo processo** —
> ambos se registam como `"xlerobot"` no código-fonte (bug do upstream do
> XLeRobot), e surge o erro
> `Cannot register ... as xlerobot because ... already registered`.
>
> As restantes combinações não têm problema: **os robôs do LeRobot original e o
> XLeRobot podem coexistir no mesmo processo** (8 tipos registados em simultâneo
> nos testes), e o `xlerobot_2wheels` também não conflita.
> Cada robô utiliza apenas uma variante; a utilização normal não é afetada.

---

> **Agora escolha um dos dois caminhos:** [xlerobot/](../xlerobot/01-Operation.md) robô completo ·
> [lerobot/](../lerobot/01-Operation.md) braço único / LeKiwi
