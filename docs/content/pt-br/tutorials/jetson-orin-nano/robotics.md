---
title: Robótica no JetPack 7.2 — o que funciona no Orin Nano
sidebar_label: Robótica (situação atual)
slug: /tutorials/robotics
description: >-
  Uma página de status honesta para a robótica no Kit de Desenvolvedor Jetson
  Orin Nano Super (8GB) com o JetPack 7.2.1 — ROS 2, Isaac ROS, Isaac Sim,
  stacks no estilo LeRobot e o que evitar no planejamento por enquanto.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# Robótica no JetPack 7.2 — o que funciona no Orin Nano

O JetPack 7.2 levou este kit a uma nova geração de plataforma: Ubuntu 24.04,
CUDA 13 e o teto de memória de 8 GB que molda toda carga de trabalho de IA. O
ecossistema de robótica ainda está correndo atrás dessa mudança. Algumas peças
funcionam hoje. Outras não. Outras ainda não podem ser verificadas em nenhuma
página oficial.

Esta página é uma página de status, não um tutorial. Tudo aqui é verificado
apenas em documentação — a Juxi não testou essas stacks em hardware. Confira a
data em qualquer página de robótica que você ler: várias partes deste
ecossistema mudaram em agosto e setembro de 2026. No diagrama abaixo, o bloco
grande à direita roda no kit; o Isaac Sim e o Isaac Lab ficam no bloco
Omniverse à esquerda, que é um host separado.

![Stack de software do NVIDIA Jetson, com os hosts DGX e Omniverse à esquerda](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## Tabela de status (verificada em 2026-09-26)

| O que você precisa | Status no JetPack 7.2.1 / Orin Nano (8GB) | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | O JetPack não instala nem exige nenhuma distribuição ROS. O ROS 2 **Jazzy** tem pacotes arm64 oficiais para Ubuntu 24.04. Uma resposta de funcionário da NVIDIA no fórum (2026-09-07) chama o Jazzy de "a distribuição ROS recomendada para o JetPack 7.2.1". Respostas de fórum não são documentação oficial. Passos de instalação abaixo. |
| **Isaac ROS** (ROS 2 acelerado por hardware) | ⚠️ Lançado em agosto de 2026 — com lacunas reais | Notas de versão do Isaac ROS 4.6.0: "Adicionado suporte para Jetson Orin" e "Adicionado suporte para JetPack 7.2". O Orin Nano Super 8GB aparece na tabela oficial de benchmarks da NVIDIA. Mas os walkthroughs não têm seção do Orin Nano, a tabela de suporte espera um SSD NVMe, e a página do JetPack da NVIDIA ainda diz "em breve". Detalhes abaixo. |
| **Isaac Sim / Isaac Lab** (simulação) | ⛔ Não roda neste kit | Exige um host x86_64 com uma GPU RTX (mínimo GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM). GPUs sem núcleos RT não são suportadas. Builds aarch64 existem apenas para o DGX Spark. Em fluxos de simulação, o simulador roda na máquina x86_64, não no Jetson. |
| **GR00T (modelos de fundação para humanoides)** | ⛔ Não neste kit | O pós-treinamento do GR00T 1.7 exige uma GPU com pelo menos 48 GB de VRAM. O fluxo de referência da NVIDIA usa um Jetson AGX Thor como computador de borda do robô real. O mesmo fluxo converte dados de demonstração para o formato LeRobot — a direção do software bate, mas a computação não mora aqui. |
| **Stacks Python no estilo LeRobot** (SO-ARM101, LeKiwi, vision kit) | ⚠️ Precisa de verificação | O piso de versão do Python é atendido (o Ubuntu 24.04 traz Python 3.12.3; o LeRobot exige 3.12 ou mais recente). Mas o upstream não tem caminho oficial para o JetPack 7.2, e a rota documentada para Jetson é mantida pela comunidade para o JetPack 6.2. Teste a sua stack exata antes de se comprometer. |
| **DeepStream** | — Não verificado nesta revisão | Coberto pela própria página — veja [Análise de vídeo com DeepStream](/pt-br/tutorials/jetson-orin-nano/deepstream). Esta revisão de robótica não reverificou a matriz de compatibilidade do DeepStream. |
| **TensorRT Edge-LLM** | — Não verificado nesta revisão | Coberto pela própria página — veja [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm). Relevante para robótica principalmente por modelos no estilo VLA. |
| **NemoClaw (stack agêntica)** | ⚠️ Funciona, suporte de fato | O instalador detecta automaticamente dispositivos Jetson (Orin e Thor), e o site da NVIDIA anuncia "Instale o OpenClaw no seu NVIDIA Jetson Orin Nano™". Mas a matriz oficial de plataformas não tem linha do Jetson, e o projeto é alpha / "Early preview". 8 GB é o mínimo declarado de RAM (16 GB recomendado), com risco documentado de falta de memória. Veja [IA agêntica](/pt-br/tutorials/jetson-orin-nano/agentic-ai). |

## Isaac ROS no JetPack 7.2 — o que as páginas oficiais dizem hoje

**As páginas da NVIDIA discordam entre si.** A página de downloads do JetPack
7.2.1 ainda lista "NVIDIA Isaac™ ROS — em breve". As páginas do projeto
Isaac ROS dizem que o suporte já foi lançado. Para o próprio Isaac ROS, as
páginas do projeto são a fonte mais específica, e são mais recentes:

- **Isaac ROS 4.6.0 (2026-08-18)** — notas de versão: "Adicionado suporte para
  Jetson Orin" e "Adicionado suporte para JetPack 7.2". Primeira versão 4.x com
  essa combinação.
- **Plataformas suportadas:** "As plataformas definidas nesta tabela são as
  únicas combinações de hardware e software que o Isaac ROS testa e suporta
  oficialmente." A linha do Jetson: "Jetson Thor (T5000 e T4000) e Jetson
  Orin", JetPack 7.2, armazenamento "SSD NVMe de 128+ GB". A tabela diz
  "Jetson Orin" (a família), não "Orin Nano".
- **Benchmarks:** a tabela de desempenho tem uma coluna dedicada "Orin Nano
  Super 8GB" com entradas reais — por exemplo, AprilTag Node a 720p, 104 fps,
  e o grafo do Mobile SAM a 720p, 4,80 fps. Esses são números publicados pela
  NVIDIA para este dispositivo, não medições da Juxi. Cargas de trabalho mais
  pesadas mostram um traço ("–"): FoundationPose, Grounding DINO e o SAM
  completo não estão listados como executáveis.
- **Isaac ROS 5.0.0 (2026-09-21)** passou para o ROS 2 Lyrical Luth. O
  repositório apt público do ROS 2 não fornece pacotes do ROS 2 Lyrical para o
  Ubuntu 24.04; a NVIDIA os publica em seu próprio CDN do Isaac ROS Buildfarm.
  O Isaac ROS 4.6 permanece no ROS 2 Jazzy. Escolha o 4.6 para a stack Jazzy
  mainstream.

**Lacunas a conhecer antes de se comprometer:**

- **Nenhuma seção de configuração do Orin Nano.** Os walkthroughs do Jetson
  cobrem apenas o Jetson AGX Thor e o Jetson AGX Orin; o único link relevante
  para o Orin Nano é o guia de configurações de energia.
- **Espera-se um SSD NVMe.** A coluna de armazenamento diz "SSD NVMe de
  128+ GB". Este kit vem sem nenhum armazenamento, então uma configuração
  somente com microSD fica fora da expectativa declarada (veja
  [Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)).
- **Defasagem de versões.** As páginas de configuração da 4.6 pedem para
  confirmar "R39 (release), REVISION: 2.0" (L4T r39.2.0) em
  `cat /etc/nv_tegra_release`; este kit vem com JetPack 7.2.1 = L4T r39.2.1.
  Valide no Docker antes de migrar um robô de produção.
- **Câmeras e OpenCV.** As câmeras Intel RealSense são "suportadas apenas no
  modo Docker. Os modos Virtual Environment e Bare Metal não são suportados."
  O JetPack 7.2 também instala a OpenCV 4.8.0, enquanto o Isaac ROS é testado
  com a 4.6.0 — a correção está nos passos de instalação abaixo.
- **Uma regressão na 5.0.** No Isaac ROS 5.0, o codificador de imagem DNN pode
  ter throughput menor que na 4.6. Se esse nó importa, considere a 4.6.

> **Importante**: se o Isaac ROS está no seu caminho crítico, pese o momento.
> O suporte no JetPack 7.2 é real, mas novo (agosto de 2026), e a documentação
> do Orin Nano é escassa. Este kit já era um alvo suportado do Isaac ROS na
> era JetPack 6.2 (Isaac ROS 3.2 Update 1, janeiro de 2025). Uma equipe que
> precisa da combinação mais estabelecida, e não consegue absorver a
> instabilidade de primeiros lançamentos, tem um argumento defensável para
> ficar em uma configuração da era JetPack 6.2. Todo o resto: migre para o
> 7.2.1, mas valide o seu pipeline exato no Docker neste kit antes de se
> comprometer.

## Simulação e treinamento — outra máquina

O Isaac Sim 6.0 não consegue rodar neste kit. Mínimos publicados para o caminho
Linux x86_64: GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM, 50 GB de SSD.
"GPUs sem núcleos RT (A100, H100) não são suportadas." O build aarch64
"atualmente só é suportado em sistema DGX Spark". Em fluxos de simulação do
Isaac ROS, "o Isaac Sim roda em uma máquina x86_64 fornecendo dados de
sensores e informações do mundo" — o Jetson é o alvo de implantação.

No extremo mais pesado do aprendizado de robôs, a divisão é a mesma: o
pós-treinamento do GR00T 1.7 exige pelo menos 48 GB de VRAM, e o fluxo de
referência da NVIDIA usa um Jetson AGX Thor como computador de borda do robô
real. A regra: simule e treine em um PC, implante e execute a inferência no
kit. Se o Isaac Sim era o seu motivo para considerar um Orin Nano, ele é a
máquina errada para essa tarefa.

## LeRobot e stacks de robô em Python — a questão de compatibilidade

1. **A questão da versão do Python tem resposta clara: a 3.12 serve.** O
   Python de sistema do Ubuntu 24.04 é o 3.12.3, e o LeRobot (0.6.2) exige
   Python 3.12 ou mais recente. A atualização não bloqueia o LeRobot por
   questão de versão do Python.
2. **Mas o upstream não tem caminho para o JetPack 7.2.** A página oficial de
   instalação do LeRobot afirma que, no Jetson, não há decodificação de vídeo
   acelerada por GPU por padrão (a biblioteca recorre ao pyav), que wheels
   aarch64 do torchcodec precisam do PyTorch 2.11 ou mais recente, e que o
   build Docker para Jetson tem como alvo o **JetPack 6.2** e é mantido pela
   comunidade. Nenhuma declaração oficial diz que o LeRobot atual tem wheels
   CUDA aarch64 prontos para o CUDA 13 do JetPack 7.2.
3. **Portanto: "precisa de verificação" — nem "suportado", nem "quebrado".**
   Antes de projetar em cima do LeRobot neste kit, teste a sua stack exata:
   instale-a, execute uma política pequena e confirme que a inferência usa a
   GPU.

> **Nota da Juxi:** nossos kits de robô (SO-ARM101, LeKiwi, vision kit) são
> construídos sobre o LeRobot. Neste kit com o JetPack 7.2.1, ainda não existe
> um caminho testado, nem do upstream nem da Juxi. O JetPack 6.2 é a
> plataforma de referência para a rota mantida pela comunidade. Verifique com
> o suporte da Juxi (veja
> [Downloads](/pt-br/tutorials/jetson-orin-nano/downloads)) antes de comprometer o cronograma de um
> projeto com o LeRobot neste kit.

## O que funciona hoje

### ROS 2 Jazzy — a base

O JetPack não inclui ROS. O caminho que funciona é a instalação oficial do
ROS 2 Jazzy via deb para Ubuntu 24.04 (arm64), resumida da documentação do
ROS 2:

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6 — quando você precisa de percepção acelerada

Instale a partir do repositório apt da NVIDIA (a página oficial lista os
comandos exatos de keyring): repositório
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, canal
`noble-jetpack`; espelho na China `isaac.download.nvidia.cn`. Depois:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

Remova uma vez a OpenCV 4.8.0 pré-instalada (veja a lista de lacunas acima); o
Isaac ROS então instala automaticamente a sua OpenCV 4.6.0 fixada:

```bash
sudo apt-get remove -y libopencv* opencv*
```

A NVIDIA recomenda o Docker: "O Docker é a opção recomendada para a maioria
dos usuários. Ele oferece o maior nível de isolamento do seu sistema host."
Isso também atende ao requisito das câmeras RealSense (somente Docker).

### NemoClaw e a stack agêntica

O instalador detecta automaticamente dispositivos NVIDIA Jetson (Orin e Thor)
e aplica a configuração de host específica do JetPack. Duas ressalvas: o
projeto é alpha ("Early preview"), e a matriz oficial de plataformas não tem
linha do Jetson, então o suporte é de fato, não uma alegação oficial. 8 GB é o
mínimo declarado de RAM (16 GB recomendado), com risco documentado de falta de
memória em torno da imagem de sandbox de cerca de 2,4 GB. Veja
[IA agêntica](/pt-br/tutorials/jetson-orin-nano/agentic-ai).

## Recomendação

- **Somente ROS 2:** construa sobre o JetPack 7.2.1 com o ROS 2 Jazzy hoje.
  Isso funciona.
- **Crítico dependente do Isaac ROS:** suportado desde agosto de 2026, mas
  novo, com documentação escassa do Orin Nano. Valide no Docker; planeje um
  NVMe. Se você precisa da combinação mais estabelecida, uma configuração da
  era JetPack 6.2 continua defensável — veja o
  [guia de migração](/pt-br/tutorials/jetson-orin-nano/jetpack-6-to-7) para os custos de reconstrução
  em qualquer um dos casos.
- **Precisa de simulação ou treinamento:** reserve um PC RTX separado (Isaac
  Sim) e um dispositivo da classe Thor para trabalho da classe GR00T. Este kit
  não consegue fazer nenhum dos dois.
- **Construído sobre LeRobot:** precisa de verificação. Teste primeiro; o
  JetPack 6.2 é a referência para a rota documentada.
- **Não compre este kit para:** Isaac Sim, pós-treinamento do GR00T ou cargas
  de trabalho da classe SAM completo / Grounding DINO / FoundationPose em
  tempo real — as três últimas não estão listadas como executáveis na tabela
  de benchmarks da NVIDIA para este dispositivo.

## Ainda em aberto

- **micro-ROS:** nenhuma página oficial específica para Jetson foi encontrada
  (duas URLs oficiais do micro.ros.org retornam 404 hoje). Trate o pareamento
  como não verificado.
- **Distribuição ROS após o Isaac ROS 5.0:** a resposta do fórum recomendando
  o Jazzy é anterior à 5.0 (2026-09-21); nenhuma declaração pós-5.0 foi
  encontrada.
- **LeRobot no JetPack 7.2:** nenhuma declaração oficial; verifique a
  disponibilidade de wheels aarch64 do PyTorch para CUDA 13 antes de se
  comprometer.
- **Configurações somente com microSD com Isaac ROS:** a tabela de suporte diz
  NVMe, mas isso não é reafirmado especificamente para o Orin Nano.
- **"Jetson Orin" vs. "Orin Nano":** a tabela de plataformas usa o nome da
  família; "Orin Nano Super 8GB" aparece apenas na tabela de benchmarks. Não
  está resolvido se a NVIDIA trata esses como alegações de suporte separadas.
- **DeepStream e TensorRT Edge-LLM:** não reverificados nesta revisão de
  robótica — veja as páginas próprias.

## Fontes

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) (plataformas suportadas, Docker, ROS 2 Lyrical; verificado em 2026-09-26)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (pareamento com Jazzy, instalação via apt, nota sobre OpenCV; verificado em 2026-09-26)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (Isaac Sim em x86_64; verificado em 2026-09-26)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html) (notas da 4.6.0 e da 5.0.0; limitações do RealSense e do codificador DNN; verificado em 2026-09-26)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html) (coluna de benchmark do Orin Nano Super 8GB; verificado em 2026-09-26)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (pacotes do ROS 2 Lyrical para Ubuntu 24.04; verificado em 2026-09-26)
- [Requisitos de instalação do Isaac Sim 6.0](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (verificado em 2026-09-26)
- [Fluxo completo do GR00T — pré-requisitos](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (verificado em 2026-09-26)
- [Fórum de desenvolvedores NVIDIA — "Is ROS2 Jazzy the correct version..." (resposta de funcionário; fórum, não documentação oficial)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (verificado em 2026-09-26)
- [Instalação do ROS 2 Jazzy — pacotes deb (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (verificado em 2026-09-26)
- [Instalação do ROS 2 Jazzy — repositórios apt (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (verificado em 2026-09-26)
- [Guia de instalação do LeRobot (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (verificado em 2026-09-26)
- [LeRobot pyproject.toml (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (versões fixadas de Python e torchcodec; verificado em 2026-09-26)
- [Ubuntu Noble — pacote python3](https://packages.ubuntu.com/noble/python3) (Python 3.12.3; verificado em 2026-09-26)
- [NemoClaw — pré-requisitos](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (verificado em 2026-09-26)
- [NemoClaw — matriz de suporte de plataformas](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (estágio alpha; sem linha do Jetson; verificado em 2026-09-26)
- [NemoClaw — solução de problemas do instalador (detecção automática do Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (verificado em 2026-09-26)
- [NVIDIA — Build a Claw ("Install OpenClaw on Your NVIDIA Jetson Orin Nano™")](https://www.nvidia.com/en-us/ai/build-a-claw/) (verificado em 2026-09-26)
- [Página de downloads do JetPack 7.2.1 (a matriz de componentes lista o Isaac ROS como "em breve")](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)

*Status: revisado em 2026-10-11. A disponibilidade do
ecossistema muda rapidamente — verifique novamente as páginas vinculadas da
NVIDIA e do upstream antes de confiar nesta tabela. Ainda não verificado em
hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
