---
title: 01 · Visão geral
---

# 01 · Visão geral

> **Anterior:** Nenhum — esta é a primeira página
> **Seguinte:** [02-Environment-Setup](02-Environment-Setup.md)

Esta página explica, de forma clara: **qual é o fluxo de trabalho completo do XLeRobot, de que hardware precisa e se a sua máquina é compatível.**

---

## Fluxo de trabalho

O fluxo completo do XLeRobot tem quatro etapas:

```
① Calibrar o robô  →  ② Teleoperar e recolher dados  →  ③ Treinar o modelo  →  ④ Implementar o modelo para correr de forma autónoma
   calibrate        record              train           eval / rollout
```

A imagem Docker traz já instalado todo o **ambiente de software** exigido por
estas quatro etapas — Python, PyTorch, LeRobot, o código de robô do XLeRobot e
os controladores de servo e câmara. Já não precisa de se preocupar com
conflitos de versões.

**O que precisa de preparar por si próprio** é apenas isto: um robô
(ou pôr o software a correr primeiro), um computador e um cabo USB.

---

## Suporte de hardware

| Plataforma | Suporte |
|---|---|
| **Jetson série Orin** (JetPack 7.2) | ✅ **A única plataforma suportada**, com aceleração por GPU |
| Qualquer outra coisa | ❌ Não suportado |

> ⚠️ **Esta imagem é feita apenas para Jetson + JetPack 7.2.** Raspberry Pi, PC x86
> comuns, Windows, macOS e placas Jetson que não sejam Orin não a conseguem usar.
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**: requerem **JetPack 7.2**
>   (L4T 39.2 / CUDA 13.2). O AGX Orin 64GB também só é totalmente suportado no 7.2.
> - **Jetson Nano (2019, original)**: ❌ nunca vai funcionar. É da arquitetura Maxwell (compute 5.3),
>   e o CUDA 13 eliminou por completo o suporte a Maxwell; o torch também exige no mínimo sm_80.
>
> Recomenda-se mais de 4 GB de memória. Os 3.4 GB do Jetson Orin Nano também
> chegam para a teleoperação, mas o treino vai penar.

### Requisitos do sistema

- **JetPack 7.2** (L4T r39 / Ubuntu 24.04)
- Arquitetura: `arm64`
- Kernel com suporte para porta serial USB (a maioria já tem)

### Verifique a sua versão do JetPack

```bash
cat /etc/nv_tegra_release
```

Ver **R39** significa que está tudo bem. Qualquer outro valor significa que tem de atualizar primeiro o JetPack; a imagem foi compilada para ele.

---

## As pastas que precisa de ler

| # | Pasta | Conteúdo | Quando ler |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md) (é aqui) | **Descarregar a imagem, executar a imagem** | Primeira utilização; leia pela ordem `01` → `02` → `03` |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **Comandos de operação do XLeRobot completo** | Quando tem o robô completo (dois braços + chassis) |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **Comandos de operação do LeRobot original** | Quando tem apenas um braço SO-101 / SO-100 ou um LeKiwi |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | Perguntas frequentes e referência rápida | Quando algo correr mal |

> ⚠️ **As pastas 2 e 3 são alternativas** — escolha uma delas, de acordo com o seu hardware:
> - **XLeRobot completo** (dois braços + chassis) → entre em `xlerobot/`
> - **Um único braço SO-101 / SO-100**, **LeKiwi** → entre em `lerobot/`
>
> A imagem é o mesmo ambiente; é possível alternar entre os dois caminhos a
> qualquer momento, sem reinstalar nada.

---

## Caminho mais curto (apenas para pôr tudo a correr primeiro)

**No Jetson (JetPack 7.2)**: alguns comandos para ver primeiro o robô a mexer-se e só depois voltar atrás para ler os detalhes:

```bash
# 1. Instalar o Docker (salte se já tiver instalado)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. Abrir o canal da GPU para o contendor (específico do Jetson, só é necessário fazer uma vez)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. Descarregar a imagem (aprox. 3.6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. Iniciar o contendor
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. Executar a teleoperação dentro do contendor (na primeira vez, entra automaticamente na calibração guiada)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ O caminho rápido salta duas coisas que **mais tarde ou mais cedo** terão de
> ser feitas; se ficar preso, volte à secção correspondente:
> - **Aceleradores de imagem para a China continental** (o passo 3 pode encravar) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **Não pode omitir o `--disable-hook enable-cuda-compat`** (este hook tem
>   um bug no JetPack 7.2 e impede o contendor de arrancar) → [03-Deployment §4](03-Deployment.md)
>
> O passo 5 acima executa o exemplo do **XLeRobot completo**. Se tiver apenas um
> braço SO-101, utilize a linha de comando `lerobot-*`; ver
> [lerobot/](../lerobot/01-Operation.md).

---

> **Seguinte:** [02-Environment-Setup](02-Environment-Setup.md) — Instalar o Docker, configurar a aceleração na China continental, ligar o hardware
