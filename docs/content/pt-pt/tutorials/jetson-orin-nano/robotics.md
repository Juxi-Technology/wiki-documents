---
title: Robótica no JetPack 7.2 — o que funciona no Orin Nano
sidebar_label: Robótica (ponto de situação)
slug: /tutorials/robotics
description: >-
  Uma página de estado honesta para a robótica no kit de desenvolvedor Jetson
  Orin Nano Super (8GB) com o JetPack 7.2.1 — ROS 2, Isaac ROS, Isaac Sim,
  stacks ao estilo do LeRobot e o que evitar planear já.
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

O JetPack 7.2 colocou este kit numa nova geração de plataforma: Ubuntu 24.04,
CUDA 13 e o limite de memória de 8 GB que molda todas as cargas de trabalho de
IA. O ecossistema de robótica ainda está a recuperar o atraso em relação a essa
mudança. Há peças que funcionam hoje. Outras não. E outras que ainda não podem
ser verificadas em nenhuma página oficial.

Esta página é uma página de estado, não um tutorial. Tudo aqui é apenas
verificado em documentação — a Juxi não testou estas stacks em hardware.
Verifique a data de qualquer página de robótica que leia: várias partes deste
ecossistema mudaram em agosto e setembro de 2026. No diagrama abaixo, o grande
bloco à direita é executado no kit; o Isaac Sim e o Isaac Lab ficam no bloco
Omniverse à esquerda, que é um host separado.

![Stack de software NVIDIA Jetson, com os hosts DGX e Omniverse à esquerda](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## Tabela de estado (verificada em 2026-09-26)

| O que precisa | Estado no JetPack 7.2.1 / Orin Nano (8GB) | Notas |
|---|---|---|
| **ROS 2 (núcleo)** | ✅ Funciona | O JetPack não instala nem exige nenhuma distribuição ROS. O ROS 2 **Jazzy** tem pacotes oficiais arm64 para Ubuntu 24.04. Uma resposta de um funcionário da NVIDIA no fórum (2026-09-07) designa o Jazzy como «a distribuição ROS recomendada para o JetPack 7.2.1». As respostas do fórum não são documentação oficial. Passos de instalação abaixo. |
| **Isaac ROS** (ROS 2 acelerado por hardware) | ⚠️ Lançado em agosto de 2026 — com lacunas reais | Notas de versão do Isaac ROS 4.6.0: «Adicionado suporte para Jetson Orin» e «Adicionado suporte para JetPack 7.2». O Orin Nano Super 8GB aparece na tabela oficial de benchmarks da NVIDIA. Mas os tutoriais não têm secção do Orin Nano, a tabela de suporte pressupõe um SSD NVMe, e a página JetPack da NVIDIA ainda diz «brevemente». Detalhes abaixo. |
| **Isaac Sim / Isaac Lab** (simulação) | ⛔ Não é executado neste kit | Requer um host x86_64 com uma GPU RTX (mínimo GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM). GPUs sem RT cores não são suportadas. Existem compilações aarch64 apenas para DGX Spark. Nos fluxos de trabalho de simulação, o simulador é executado na máquina x86_64, não no Jetson. |
| **GR00T (modelos fundacionais humanoides)** | ⛔ Não neste kit | O pós-treino do GR00T 1.7 requer uma GPU com pelo menos 48 GB de VRAM. O fluxo de trabalho de referência da NVIDIA utiliza um Jetson AGX Thor como computador de borda do robô real. O mesmo fluxo de trabalho converte dados de demonstração para o formato LeRobot — a direção do software coincide, mas o poder de computação não vive aqui. |
| **Stacks Python ao estilo do LeRobot** (SO-ARM101, LeKiwi, vision kit) | ⚠️ Requer verificação | O limiar da versão de Python está cumprido (o Ubuntu 24.04 traz o Python 3.12.3; o LeRobot exige 3.12 ou mais recente). Mas o upstream não tem um percurso oficial para o JetPack 7.2, e a rota documentada para Jetson é mantida pela comunidade para o JetPack 6.2. Teste a sua stack exata antes de assumir um compromisso. |
| **DeepStream** | — Não verificado nesta revisão | Abordado na sua própria página — consulte [Análise de vídeo com DeepStream](/pt-pt/tutorials/jetson-orin-nano/deepstream). Esta revisão de robótica não voltou a verificar a matriz de suporte do DeepStream. |
| **TensorRT Edge-LLM** | — Não verificado nesta revisão | Abordado na sua própria página — consulte [Inferência local de LLM](/pt-pt/tutorials/jetson-orin-nano/local-llm). Relevante para a robótica sobretudo através de modelos ao estilo VLA. |
| **NemoClaw (stack agêntica)** | ⚠️ Funciona, suporte de facto | O instalador deteta automaticamente o Jetson (Orin e Thor), e o site da NVIDIA anuncia "Install OpenClaw on Your NVIDIA Jetson Orin Nano™". Mas a matriz oficial de plataformas não tem linha Jetson, e o projeto está em alfa / "Early preview". 8 GB é o mínimo de RAM indicado (16 GB recomendado), com um risco documentado de falta de memória. Consulte [IA agêntica](/pt-pt/tutorials/jetson-orin-nano/agentic-ai). |

## Isaac ROS no JetPack 7.2 — o que dizem hoje as páginas oficiais

**As páginas da NVIDIA contradizem-se entre si.** A página de transferências do
JetPack 7.2.1 ainda lista «NVIDIA Isaac™ ROS — brevemente». As páginas do
projeto Isaac ROS dizem que o suporte já foi lançado. Para o próprio Isaac ROS,
as páginas do projeto são a fonte mais específica e são mais recentes:

- **Isaac ROS 4.6.0 (2026-08-18)** — notas de versão: «Adicionado suporte para
  Jetson Orin» e «Adicionado suporte para JetPack 7.2». Primeira versão 4.x
  com essa combinação.
- **Plataformas suportadas:** «As plataformas definidas nesta tabela são as
  únicas combinações de hardware e software que o Isaac ROS testa e suporta
  oficialmente.» A linha do Jetson: "Jetson Thor (T5000 and T4000) and Jetson
  Orin", JetPack 7.2, armazenamento "128+ GB NVMe SSD". A tabela diz "Jetson
  Orin" (a família), não "Orin Nano".
- **Benchmarks:** a tabela de desempenho tem uma coluna dedicada "Orin Nano
  Super 8GB" com entradas reais — por exemplo, o AprilTag Node a 720p,
  104 fps, e o grafo Mobile SAM a 720p, 4.80 fps. Estes são números publicados
  pela NVIDIA para este dispositivo, não medições da Juxi. As cargas de
  trabalho mais pesadas mostram um traço ("–"): FoundationPose, Grounding
  DINO e o SAM completo não estão listados como executáveis.
- **Isaac ROS 5.0.0 (2026-09-21)** passou para ROS 2 Lyrical Luth. O
  repositório apt público do ROS 2 não fornece pacotes ROS 2 Lyrical para
  Ubuntu 24.04; a NVIDIA publica-os no seu próprio Isaac ROS Buildfarm CDN. O
  Isaac ROS 4.6 mantém-se no ROS 2 Jazzy. Escolha o 4.6 para a stack Jazzy
  convencional.

**Lacunas a conhecer antes de assumir um compromisso:**

- **Sem secção de configuração do Orin Nano.** Os tutoriais para Jetson
  abrangem apenas o Jetson AGX Thor e o Jetson AGX Orin; a única ligação
  relevante para o Orin Nano é o guia de definições de alimentação.
- **Pressupõe-se um SSD NVMe.** A coluna de armazenamento diz "128+ GB NVMe
  SSD". Este kit é expedido sem qualquer armazenamento, pelo que uma
  configuração apenas com microSD fica fora da expectativa declarada (consulte
  [Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)).
- **Desfasamento de versões.** As páginas de configuração do 4.6 pedem que
  confirme "R39 (release), REVISION: 2.0" (L4T r39.2.0) a partir de
  `cat /etc/nv_tegra_release`; este kit é expedido com JetPack 7.2.1 = L4T
  r39.2.1. Valide no Docker antes de migrar um robô de produção.
- **Câmaras e OpenCV.** As câmaras Intel RealSense são «suportadas apenas em
  modo Docker. Os modos Virtual Environment e Bare Metal não são suportados.»
  O JetPack 7.2 também instala o OpenCV 4.8.0, enquanto o Isaac ROS é testado
  com o 4.6.0 — a correção está nos passos de instalação abaixo.
- **Uma regressão na versão 5.0.** No Isaac ROS 5.0, o codificador de imagem
  DNN pode ter um débito inferior ao da versão 4.6. Se esse nó for importante,
  considere o 4.6.

> **Importante**: se o Isaac ROS está no seu caminho crítico, pondere o
> momento. O suporte no JetPack 7.2 é real, mas recente (agosto de 2026), e a
> documentação para o Orin Nano é escassa. Este kit já era um alvo suportado
> do Isaac ROS na era JetPack 6.2 (Isaac ROS 3.2 Update 1, janeiro de 2025).
> Uma equipa que precise da combinação mais estabelecida e não possa absorver
> a agitação de uma primeira versão tem argumentos sólidos para se manter numa
> configuração da era JetPack 6.2. Todos os outros: avancem para o 7.2.1, mas
> validem o vosso pipeline exato no Docker neste kit antes de assumir o
> compromisso.

## Simulação e treino — uma máquina diferente

O Isaac Sim 6.0 não é executável neste kit. Mínimos publicados para o percurso
Linux x86_64: GeForce RTX 4080, 16 GB de VRAM, 32 GB de RAM, 50 GB de SSD.
«GPUs sem RT Cores (A100, H100) não são suportadas.» A compilação aarch64 «é
atualmente suportada apenas em sistemas DGX Spark». Nos fluxos de trabalho de
simulação do Isaac ROS, «o Isaac Sim é executado numa máquina x86_64 que
fornece dados de sensores e informação do mundo» — o Jetson é o alvo de
implementação.

No extremo mais exigente do robot learning, a divisão é a mesma: o pós-treino
do GR00T 1.7 precisa de pelo menos 48 GB de VRAM, e o fluxo de trabalho de
referência da NVIDIA usa um Jetson AGX Thor como computador de borda do robô
real. A regra: simule e treine num PC, implemente e execute a inferência no
kit. Se o Isaac Sim era o motivo para considerar um Orin Nano, é a máquina
errada para essa tarefa.

## LeRobot e stacks de robôs em Python — a questão da compatibilidade

1. **A questão da versão de Python tem uma resposta clara: a 3.12 serve.** O
   Python de sistema do Ubuntu 24.04 é o 3.12.3, e o LeRobot (0.6.2) exige
   Python 3.12 ou mais recente. A atualização não bloqueia o LeRobot por
   razões de versão de Python.
2. **Mas o upstream não tem percurso para o JetPack 7.2.** A página oficial de
   instalação do LeRobot indica que, no Jetson, não existe descodificação de
   vídeo acelerada por GPU por predefinição (a biblioteca recorre ao pyav),
   que as wheels torchcodec aarch64 requerem PyTorch 2.11 ou mais recente, e
   que a sua compilação Docker para Jetson se destina ao **JetPack 6.2** e é
   mantida pela comunidade. Nenhuma declaração oficial indica que o LeRobot
   atual tenha wheels CUDA aarch64 prontas para o CUDA 13 do JetPack 7.2.
3. **Portanto: «requer verificação» — nem «suportado», nem «avariado».**
   Antes de desenhar em torno do LeRobot neste kit, teste a sua stack exata:
   instale-a, execute uma política pequena e confirme que a inferência utiliza
   a GPU.

> **Nota da Juxi:** os nossos kits de robô (SO-ARM101, LeKiwi, vision kit)
> baseiam-se no LeRobot. Neste kit com o JetPack 7.2.1, ainda não existe um
> percurso testado, nem do upstream nem da Juxi. O JetPack 6.2 é a plataforma
> de referência para a rota mantida pela comunidade. Confirme com o apoio da
> Juxi (consulte [Downloads](/pt-pt/tutorials/jetson-orin-nano/downloads))
> antes de comprometer um calendário de projeto com o LeRobot neste kit.

## O que funciona hoje

### ROS 2 Jazzy — a base

O JetPack não inclui o ROS. O percurso funcional é a instalação oficial do
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

### Isaac ROS 4.6 — quando precisa de perceção acelerada

Instale a partir do repositório apt da NVIDIA (a página oficial lista os
comandos exatos do keyring): repositório
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, canal
`noble-jetpack`; espelho para a China `isaac.download.nvidia.cn`. Depois:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

Remova uma vez o OpenCV 4.8.0 pré-instalado (ver a lista de lacunas acima); o
Isaac ROS instala então automaticamente a sua versão fixada OpenCV 4.6.0:

```bash
sudo apt-get remove -y libopencv* opencv*
```

A NVIDIA recomenda o Docker: «O Docker é a opção recomendada para a maioria
dos utilizadores. Proporciona o mais alto nível de isolamento em relação ao
seu sistema anfitrião.» Isto também corresponde ao requisito das câmaras
RealSense (apenas Docker).

### NemoClaw e a stack agêntica

O instalador deteta automaticamente dispositivos NVIDIA Jetson (Orin e Thor) e
aplica a configuração de host específica do JetPack. Duas ressalvas: o projeto
está em alfa ("Early preview") e a sua matriz oficial de plataformas não tem
linha Jetson, pelo que o suporte é de facto, não uma afirmação oficial. 8 GB é
o mínimo de RAM indicado (16 GB recomendado), com um risco documentado de
falta de memória em torno da imagem de sandbox de cerca de 2.4 GB. Consulte
[IA agêntica](/pt-pt/tutorials/jetson-orin-nano/agentic-ai).

## Recomendação

- **Apenas ROS 2:** construa hoje sobre o JetPack 7.2.1 com o ROS 2 Jazzy.
  Isto funciona.
- **Isaac ROS no caminho crítico:** suportado desde agosto de 2026, mas
  recente, com documentação escassa para o Orin Nano. Valide no Docker;
  planeie um NVMe. Se precisar da combinação mais estabelecida, uma
  configuração da era JetPack 6.2 continua defensável — consulte o [guia de
  migração](/pt-pt/tutorials/jetson-orin-nano/jetpack-6-to-7) para os custos
  de reconstrução em qualquer dos casos.
- **Precisa de simulação ou treino:** preveja um PC RTX separado (Isaac Sim) e
  um dispositivo da classe Thor para trabalho da classe GR00T. Este kit não
  consegue fazer nenhuma dessas tarefas.
- **Baseado no LeRobot:** requer verificação. Teste primeiro; o JetPack 6.2 é
  a referência para a rota documentada.
- **Não compre este kit para:** Isaac Sim, pós-treino do GR00T ou cargas de
  trabalho em tempo real da classe SAM completo / Grounding DINO /
  FoundationPose — as três últimas não estão listadas como executáveis na
  tabela de benchmarks da NVIDIA para este dispositivo.

## Ainda por esclarecer

- **micro-ROS:** não foi encontrada nenhuma página oficial específica para
  Jetson (dois URLs oficiais de micro.ros.org devolvem 404 atualmente).
  Considere a combinação como não verificada.
- **Distribuição ROS após o Isaac ROS 5.0:** a resposta do fórum que recomenda
  o Jazzy é anterior ao 5.0 (2026-09-21); não foi encontrada nenhuma
  declaração posterior ao 5.0.
- **LeRobot no JetPack 7.2:** nenhuma declaração oficial; verifique a
  disponibilidade de wheels aarch64 do PyTorch para CUDA 13 antes de assumir
  um compromisso.
- **Configurações apenas com microSD com o Isaac ROS:** a tabela de suporte
  diz NVMe, mas isto não é repetido especificamente para o Orin Nano.
- **"Jetson Orin" vs. "Orin Nano":** a tabela de plataformas usa o nome da
  família; "Orin Nano Super 8GB" aparece apenas na tabela de benchmarks. Não
  está esclarecido se a NVIDIA trata estes casos como afirmações de suporte
  distintas.
- **DeepStream e TensorRT Edge-LLM:** não re-verificados nesta revisão de
  robótica — consulte as suas próprias páginas.

## Fontes

- [Isaac ROS — Introdução](https://nvidia-isaac-ros.github.io/getting_started/index.html) (plataformas suportadas, Docker, ROS 2 Lyrical; verificado em 2026-09-26)
- [Isaac ROS 4.6 — Introdução](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (emparelhamento com Jazzy, instalação apt, nota sobre o OpenCV; verificado em 2026-09-26)
- [Isaac ROS 5.0 — Introdução](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (Isaac Sim em x86_64; verificado em 2026-09-26)
- [Isaac ROS — Lançamentos](https://nvidia-isaac-ros.github.io/releases/index.html) (notas 4.6.0 e 5.0.0; limitações das câmaras RealSense e do codificador DNN; verificado em 2026-09-26)
- [Isaac ROS — Desempenho](https://nvidia-isaac-ros.github.io/performance/index.html) (coluna de benchmarks do Orin Nano Super 8GB; verificado em 2026-09-26)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (pacotes ROS 2 Lyrical para Ubuntu 24.04; verificado em 2026-09-26)
- [Requisitos de instalação do Isaac Sim 6.0](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (verificado em 2026-09-26)
- [Fluxo de trabalho ponta a ponta do GR00T — pré-requisitos](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (verificado em 2026-09-26)
- [Fórum de desenvolvedores da NVIDIA — "Is ROS2 Jazzy the correct version..." (resposta de um funcionário; fórum, não documentação oficial)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (verificado em 2026-09-26)
- [Instalação do ROS 2 Jazzy — pacotes deb (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (verificado em 2026-09-26)
- [Instalação do ROS 2 Jazzy — repositórios apt (upstream)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (verificado em 2026-09-26)
- [Guia de instalação do LeRobot (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (verificado em 2026-09-26)
- [LeRobot pyproject.toml (upstream)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (restrições de versões de Python e torchcodec; verificado em 2026-09-26)
- [Ubuntu Noble — pacote python3](https://packages.ubuntu.com/noble/python3) (Python 3.12.3; verificado em 2026-09-26)
- [NemoClaw — pré-requisitos](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (verificado em 2026-09-26)
- [NemoClaw — matriz de suporte de plataformas](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (fase alfa; sem linha Jetson; verificado em 2026-09-26)
- [NemoClaw — resolução de problemas do instalador (deteção automática de Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (verificado em 2026-09-26)
- [NVIDIA — Build a Claw ("Install OpenClaw on Your NVIDIA Jetson Orin Nano™")](https://www.nvidia.com/en-us/ai/build-a-claw/) (verificado em 2026-09-26)
- [Página de transferências do JetPack 7.2.1 (a matriz de componentes lista o Isaac ROS como «brevemente»)](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)

*Estado: revisado em 2026-10-11. A disponibilidade do
ecossistema muda rapidamente — volte a verificar as páginas da NVIDIA e do
upstream indicadas antes de confiar nesta tabela. Ainda não verificado em
hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
