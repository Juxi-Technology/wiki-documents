---
title: 01 · Visão geral
---

# 01 · Visão geral

> **Anterior:** Nenhum — esta é a primeira página
> **Próximo:** [02-Environment-Setup](02-Environment-Setup.md)

Esta página explica claramente: **qual é o fluxo de trabalho completo do XLeRobot, de que hardware você precisa e se a sua máquina é compatível.**

---

## Fluxo de trabalho

O fluxo completo do XLeRobot tem quatro etapas:

```
① Calibrar o robô  →  ② Teleoperar e coletar dados  →  ③ Treinar o modelo  →  ④ Implantar o modelo para rodar de forma autônoma
   calibrate        record              train           eval / rollout
```

A imagem Docker já traz pronto todo o **ambiente de software** exigido por essas
quatro etapas — Python, PyTorch, LeRobot, o código de robô do XLeRobot e os
drivers de servo e câmera. Você não precisa mais brigar com conflitos de versão.

**O que você precisa providenciar por conta própria** é só isto: um robô
(ou colocar o software para rodar primeiro), um computador e um cabo USB.

---

## Suporte de hardware

| Plataforma | Suporte |
|---|---|
| **Jetson série Orin** (JetPack 7.2) | ✅ **Plataforma oficialmente suportada no momento**, com aceleração por GPU |
| Jetson Nano (2019, original) | ❌ Sem suporte — poder de processamento baixo demais; veja abaixo |
| Raspberry Pi / Ubuntu comum / PC x86 | ⏳ **Ainda não suportado**, veja abaixo |
| Windows / macOS | ❌ Sem suporte (o repasse da porta serial e da câmera só funciona bem no Linux) |

> 💡 **No momento, esta imagem é destinada apenas a dispositivos Jetson Orin.**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**: exigem **JetPack 7.2**
>   (L4T 39.2 / CUDA 13.2). O AGX Orin 64GB também só é totalmente suportado no 7.2.
> - **Jetson Nano (2019, original)**: ❌ nunca vai funcionar. É da arquitetura Maxwell (compute 5.3),
>   e o CUDA 13 removeu por completo o suporte a Maxwell; o torch também exige no mínimo sm_80.
> - **Raspberry Pi / PC x86**: em termos de projeto, a imagem suporta (a versão CPU genérica é baseada em
>   `python:3.12-slim`, e essa imagem base tem versões oficiais para amd64 e arm64),
>   mas **a versão CPU publicada até agora ainda não foi feita como multiarquitetura**,
>   então o que for baixado pode ter só amd64 ou só arm64. Só será liberado depois que a build multiarquitetura for feita.
>
> Recomenda-se mais de 4 GB de memória. Os 3.4 GB do Jetson Orin Nano também
> dão conta da teleoperação, mas o treinamento vai sofrer.

### Requisitos do sistema

- Ubuntu 20.04 / 22.04 / 24.04, ou Debian 12+
- Raspberry Pi: exige sistema de 64 bits (`uname -m` mostra `aarch64`)
- Kernel com suporte a porta serial USB (a maioria já tem)

### Verifique sua arquitetura

```bash
uname -m
```

- `aarch64` → Raspberry Pi, Jetson (use a imagem arm64)
- `x86_64` → computador comum (use a imagem amd64)

---

## As pastas que você precisa ler

| # | Pasta | Conteúdo | Quando ler |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md) (é aqui) | **Baixar a imagem, rodar a imagem** | Primeira vez; leia na ordem `01` → `02` → `03` |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **Comandos de operação do XLeRobot completo** | Quando você tem o robô completo (braços duplos + chassi) |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **Comandos de operação do LeRobot original** | Quando você tem apenas um braço SO-101 / SO-100 ou um LeKiwi |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | Perguntas frequentes e consulta rápida | Quando algo der errado |

> ⚠️ **As pastas 2 e 3 são alternativas** — escolha uma delas conforme o seu hardware:
> - **XLeRobot completo** (braços duplos + chassi) → entre em `xlerobot/`
> - **Um braço SO-101 / SO-100**, **LeKiwi** → entre em `lerobot/`
>
> A imagem é o mesmo ambiente; dá para alternar entre os dois caminhos a
> qualquer momento, sem reinstalar nada.

---

## Caminho mais curto (só para colocar tudo para rodar primeiro)

**No Jetson (JetPack 7.2)**: alguns comandos para ver o robô se mexer primeiro e depois voltar para ler os detalhes:

```bash
# 1. Instalar o Docker (pule se já estiver instalado)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. Abrir o canal da GPU para o contêiner (específico do Jetson, só precisa fazer uma vez)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. Baixar a imagem (aprox. 3.6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. Iniciar o contêiner
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. Rodar a teleoperação dentro do contêiner (na primeira vez, entra automaticamente na calibração guiada)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ O caminho rápido pula duas coisas que **mais cedo ou mais tarde** terão de
> ser feitas; se travar, volte à seção correspondente:
> - **Aceleradores de imagem para a China continental** (o passo 3 pode travar) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **O `--disable-hook enable-cuda-compat` não pode ser omitido** (este hook tem
>   um bug no JetPack 7.2 e impede o contêiner de subir) → [03-Deployment §4](03-Deployment.md)
>
> O passo 5 acima roda o exemplo do **XLeRobot completo**. Se você tem apenas
> um braço SO-101, use a linha de comando `lerobot-*`; veja
> [lerobot/](../lerobot/01-Operation.md).

---

> **Próximo:** [02-Environment-Setup](02-Environment-Setup.md) — Instalar o Docker, configurar a aceleração na China continental, conectar o hardware
