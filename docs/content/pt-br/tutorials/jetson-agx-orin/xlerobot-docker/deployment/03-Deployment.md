---
title: 03 · Implantação
---

# 03 · Implantação

> **Anterior:** [02-Environment-Setup](02-Environment-Setup.md)
> **Agora escolha um dos dois caminhos:** [xlerobot/](../xlerobot/01-Operation.md) (robô completo)
> ou [lerobot/](../lerobot/01-Operation.md) (braço único / LeKiwi)

Baixe a imagem para a sua máquina e inicie o contêiner. Ao terminar esta página, você estará em um shell com todo o ambiente pronto.

---

## 1. Obter a imagem

### Método A: baixar diretamente (recomendado)

```bash
docker pull chenyang310/xlerobot:cpu-slim
```

O `cpu-slim` é a versão enxuta (cerca de 660 MB de download) e inclui tudo o que é necessário para teleoperação, calibração e gravação de dados.

Se você quiser a versão completa (com visualização, treinamento e políticas Diffusion):

```bash
docker pull chenyang310/xlerobot:cpu
```

### Método B: construir você mesmo

Indicado para quando você precisa fazer alterações ou quer usar o código-fonte mais recente.

```bash
git clone <URL deste repositório> xlerobot-docker
cd xlerobot-docker

# Versão CPU genérica
bash scripts/build.sh cpu

# Versão GPU para Jetson (executar no Jetson)
bash scripts/build.sh jetson
```

O script de build já vem com espelhos da China continental configurados (PyPI da
Alibaba Cloud, repositórios Ubuntu da Alibaba Cloud); **você consegue compilar na
rede da China continental sem nenhuma configuração adicional**.

> A primeira compilação baixa cerca de 2 GB de dependências; em uma rede lenta,
> leva uma ou duas horas.
> Com o `scripts/sync.sh` + o cache `wheels/` da placa, dá para reaproveitar os
> pacotes já baixados.

---

## 2. Diferenças entre as versões

| Imagem | Tamanho | Inclui | Indicada para |
|---|---|---|---|
| `cpu-slim` | Aprox. 660 MB | Teleoperação, calibração, inferência com a política ACT | Só rodar o robô |
| `cpu` | Aprox. 1 GB | Tudo o que acima + visualização, gravação de dados, treinamento, Diffusion | Fazer o fluxo completo |
| `jetson` | Aprox. 3.6 GB | Versão CPU + **aceleração CUDA** | Jetson, com inferência por GPU |

---

## 3. Iniciar o contêiner

### 3.1 Iniciar com o script (recomendado)

Se você clonou o repositório:

```bash
# Versão genérica
bash scripts/run.sh cpu

# Versão Jetson (adiciona os parâmetros de GPU automaticamente)
bash scripts/run.sh jetson
```

O script já configura tudo isto:

- **Repasse de dispositivos** — porta serial, câmeras, USB
- **Rede** — `--network host`, necessário para teleoperação em VR e controle via web
- **Montagem do código-fonte** — alterar o código não exige reconstruir a imagem
- **Montagem do cache** — arquivos de calibração e modelos baixados são preservados

### 3.2 Iniciar manualmente

Sem o script, este é o comando mínimo que funciona:

```bash
docker run -it --rm \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:cpu-slim
```

**O que cada parâmetro faz:**

| Parâmetro | Por que é necessário |
|---|---|
| `--privileged` + `-v /dev:/dev` | Repasse da porta serial (servos SO-101), da câmera e do USB |
| `--network host` | Comunicação entre os dois processos host/client (ZMQ) e controle por VR |
| `-v ~/.cache/huggingface` | **Arquivos de calibração** e cache de modelos. Sem essa montagem, você terá de recalibrar toda vez que reabrir o contêiner |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | Para quando precisar rodar a visualização (abrir a janela do rerun) |
| `-e HF_ENDPOINT` | O `huggingface.co` é totalmente inacessível a partir da China continental; é obrigatório usar o espelho |

Depois de entrar, você cai em um bash cujo diretório de trabalho é `/opt/xlerobot`.

---

## 4. Parâmetros de GPU no Jetson ⚠️ Diferente de outras plataformas

A versão para Jetson **precisa** fornecer a GPU via CDI e **não pode usar `--runtime nvidia`**:

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

Antes do primeiro uso, é preciso gerar a especificação CDI na **máquina host**:

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **Problema que já enfrentamos**: no JetPack 7.2, o hook
> `enable-cuda-compat` do `nvidia-container-toolkit 1.19.1` trava
> (`slice bounds out of range`), e o contêiner simplesmente não sobe.
> Basta adicionar o parâmetro abaixo para desativá-lo:
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> Quando a versão de CUDA do contêiner é a mesma da máquina host, esse hook não é necessário.

### Verificar se a GPU está disponível

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. Especificidades por plataforma

### Série Jetson Orin —— ✅ Suportada atualmente

| Modelo | Requisito | Observações |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | A placa que testamos na prática (3.4 GB de memória também dão conta da teleoperação) |
| **Orin NX** | JetPack **7.2** | O mesmo acima |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ O 7.0 / 7.1 **não suporta** o AGX Orin 64GB; é obrigatório o 7.2 |

**O único requisito obrigatório é a versão do JetPack**: o torch na imagem foi
compilado com CUDA 13.0, e o CUDA 13.x exige um driver **≥ 580**.

| JetPack | L4T | CUDA | Driver | Funciona? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ Driver antigo demais |
| **7.2** | 39.2 | 13.2 | Série 595 | ✅ |

Para ver a sua versão:

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ Atualizar do JetPack 6.x para o 7.x **não pode ser feito com `apt upgrade` / OTA**
> (o OTA só funciona dentro da mesma versão principal do L4T); é obrigatório
> regravar a placa inteira.

### Jetson Nano (2019, original) —— ❌ Nunca suportado

Três motivos independentes, todos becos sem saída:

1. **O CUDA 13 removeu a arquitetura Maxwell por completo**. O driver R580 é o último
   ramo com suporte a Maxwell / Pascal / Volta, e o CUDA 13 exige exatamente 580+.
   O Jetson Nano chega, no máximo, ao JetPack 4.6.6 / CUDA 10.2.
2. **O compute 5.3 fica abaixo do mínimo suportado pelo torch**. Nesta imagem, as
   arquiteturas para as quais o torch foi compilado são
   `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` — o mínimo é sm_80,
   e o Jetson Nano é sm_53: não há kernel nativo, e a compilação JIT de PTX também não o alcança.
3. **A plataforma está EOL** (o JetPack 4 deixou de ser mantido em novembro de 2024).

### Raspberry Pi / Ubuntu comum / PC x86 —— ⏳ Ainda não suportado

A imagem, **por design**, suporta — a versão CPU genérica é baseada em `python:3.12-slim`,
e essa imagem base é publicada oficialmente em duas versões: amd64 e arm64.

Mas **a versão CPU publicada até agora ainda não é multiarquitetura** (o script de build
é um `docker build` comum, que produz apenas a arquitetura da máquina de build). Então,
no momento, o que for baixado pode ter só amd64 ou só arm64, e a outra metade das plataformas não funciona.

Quando a build multiarquitetura (`docker buildx build --platform linux/amd64,linux/arm64`)
for feita, esta parte será liberada; até lá, **use apenas no Jetson Orin**.

> Se não tiver certeza de que a sua imagem funciona: <code v-pre>docker image inspect &lt;imagem&gt; --format '{{.Architecture}}'</code>,
> e compare com `uname -m`.

---

## Depois de entrar no contêiner

Faça primeiro uma autoverificação:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Saída esperada:

```
torch 2.11.0+cu130     ← versão Jetson; na versão CPU aparece +cpu
lerobot 0.6.2
```

> ⚠️ **O `xlerobot` e o `xlerobot_mecanum` não podem ficar no mesmo processo** —
> os dois se registram como `"xlerobot"` no código-fonte (bug do upstream do
> XLeRobot), e o erro exibido é
> `Cannot register ... as xlerobot because ... already registered`.
>
> As outras combinações não têm problema: **os robôs do LeRobot original e o
> XLeRobot podem coexistir no mesmo processo** (8 tipos registrados
> simultaneamente em teste), e o `xlerobot_2wheels` também não conflita.
> Cada robô usa apenas uma variante; o uso normal não é afetado.

---

> **Agora escolha um dos dois caminhos:** [xlerobot/](../xlerobot/01-Operation.md) robô completo ·
> [lerobot/](../lerobot/01-Operation.md) braço único / LeKiwi
